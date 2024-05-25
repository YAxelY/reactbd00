import React, { useState } from 'react';
import './Gerer.css';
import axios from 'axios';
import AddEvent from '../components/events/AddEvent';
import UpdateEventForm from './UpdateEventForm';
import UpdateEvent from '../components/events/UpdateEvent' // Import the UpdateEvent component
import DeleteEvent from '../components/events/DeleteEvent'; // Import the DeleteEvent component

function Gerer() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [events, setEvents] = useState({
        "2024-12-12": [
            {
                id: 1,
                title: "Rendez-vous chez le médecin",
                dateDebut: "2024-12-12",
                dateFin: "2024-12-12",
                heureDebut: "10:00",
                heureFin: "11:00",
                lieu: "Clinique du Centre"
            },
            {
                id: 2,
                title: "Dîner avec des amis",
                dateDebut: "2024-12-12",
                dateFin: "2024-12-12",
                heureDebut: "19:00",
                heureFin: "21:00",
                lieu: "Restaurant Le Petit Paris"
            }
        ]
    });

    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [Event, setEvent] = useState([]);


    const addMonths = (numMonths) => {
        const newDate = new Date(currentDate.setMonth(currentDate.getMonth() + numMonths));
        setCurrentDate(new Date(newDate));
    };

    const daysInMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const firstDayOfMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const dayLabels = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

    const renderDayLabels = () => {
        return dayLabels.map((day, index) => (
            <div key={index} className="day-label">{day}</div>
        ));
    };

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

 const handleDayClick = async (day) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(date);
    const formattedDate = formatDate(date);
    console.log(formattedDate);
    try {
        const response = await axios.get(`http://localhost:8085/events/${formattedDate}`); // Make API request
        const eventData = response.data.map(event => ({
            id: event.id,
            title: event.description,
            dateDebut: event.dateDebut || '-',
            dateFin: event.dateFin || '-',
            heureDebut: event.heureDebut || '-',
            heureFin: event.heureFin || '-',
            lieu: event.lieu || '-'
        }));
        setEvents({ ...events, [formattedDate]: eventData }); // Update events state with fetched data
        console.log('Events:', events); // Log the updated events state
        console.log(response.data);
    } catch (error) {
        console.error('Error fetching events:', error);
    }
};


const handleUpdate = (event) => {
    setEvent(event);
    setShowUpdateForm(true);
   
};

const handleDelete = async (eventId) => {
    try {
        await axios.delete(`http://localhost:8085/${eventId}`);
        window.location.reload();
        // Update events state or any UI as needed after successful deletion
    } catch (error) {
        console.error('Error deleting event:', error);
    }
};

    const renderCalendar = () => {
        const days = [];
        const date = new Date(currentDate);
        const daysCount = daysInMonth(date);
        const firstDay = firstDayOfMonth(date);

        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="empty"></div>);
        }

        for (let day = 1; day <= daysCount; day++) {
            days.push(
                <div key={day} className={`day ${selectedDate && selectedDate.getDate() === day && selectedDate.getMonth() === currentDate.getMonth() && selectedDate.getFullYear() === currentDate.getFullYear() ? 'selected' : ''}`} 
                     onClick={() => handleDayClick(day)}>
                    {day}
                </div>
            );
        }

        return days;
    };

    const renderSelectedDate = () => {
        if (!selectedDate) return <div className="event-details">Aucun jour sélectionné</div>;
    
        const formattedDate = formatDate(selectedDate);
        const dayEvents = events[formattedDate] || [];
        return (
            <div className="event-details">
                <h2>Événements du {selectedDate.toLocaleDateString()}</h2>
                {dayEvents.length > 0 ? (
                    <ul>
                        {dayEvents.map((event, index) => (
                            <li key={index} className="event-item">
                                <p><strong>Titre: </strong>{event.title}</p>
                                <p><strong>Date de début: </strong>{event.dateDebut}</p>
                                <p><strong>Date de fin: </strong>{event.dateFin}</p>
                                <p><strong>Heure de début: </strong>{event.heureDebut}</p>
                                <p><strong>Heure de fin: </strong>{event.heureFin}</p>
                                <p><strong>Lieu: </strong>{event.lieu}</p>
                                {/* Update button */}
                                <button onClick={() => handleUpdate(event)}>Modifier</button>
                                {/* Delete button */}
                                <button onClick={() => handleDelete(event.id)}>Supprimer</button>
                            </li>
                        ))}
                    </ul>
                ) : <p>Aucun événement prévu pour cette journée.</p>}
            </div>
        );
    };
    
    
    return (
        <div className='row'>
            <div className='col-8'>
                <div className="calendar-container">
                    <div className="calendar">
                        <div className="header">
                            <button className="nav-button" onClick={() => addMonths(-1)}>&lt;</button>
                            <span className="month-year">
                                {currentDate.toLocaleString('fr', { month: 'long', year: 'numeric' })}
                            </span>
                            <button className="nav-button" onClick={() => addMonths(1)}>&gt;</button>
                        </div>
                        <div className="day-labels">
                            {renderDayLabels()}
                        </div>
                        <div className="days">
                            {renderCalendar()}
                        </div>
                    </div>

                    {showUpdateForm && <UpdateEventForm event={Event} onUpdate={() => setShowUpdateForm(false)} />}
                    {renderSelectedDate()}
                    <AddEvent />
                </div>
            </div>
        </div>
    );
}

export default Gerer;
