import React, { useState } from 'react';
import { FaPen, FaTimes } from 'react-icons/fa';
import './Gerer.css';

function Gerer() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [eventForm, setEventForm] = useState({
        eventName: '',
        eventTime: '',
        eventDescription: ''
    });
    const [events, setEvents] = useState({});

    const addMonths = (numMonths) => {
        const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + numMonths, 1);
        setCurrentDate(newDate);
        setSelectedDate(null);
    };

    const daysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const dayLabels = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

    const handleDayClick = (day) => {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        setSelectedDate(date);
        setEventForm({
            eventName: '',
            eventTime: '',
            eventDescription: ''
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEventForm(prevForm => ({
            ...prevForm,
            [name]: value
        }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (!selectedDate) return;

        const { eventName, eventTime, eventDescription } = eventForm;
        const formattedDate = selectedDate.toISOString().slice(0, 10);

        setEvents(prevEvents => ({
            ...prevEvents,
            [formattedDate]: [...(prevEvents[formattedDate] || []), { name: eventName, time: eventTime, description: eventDescription }]
        }));

        setSelectedDate(null);
        setEventForm({
            eventName: '',
            eventTime: '',
            eventDescription: ''
        });
    };

    const handleEventEdit = (date, index) => {
        const eventToEdit = events[date][index];
        setEventForm({
            eventName: eventToEdit.name,
            eventTime: eventToEdit.time,
            eventDescription: eventToEdit.description
        });
        setSelectedDate(new Date(date));
    };

    const handleEventDelete = (date, index) => {
        const updatedEvents = { ...events };
        updatedEvents[date].splice(index, 1);
        if (updatedEvents[date].length === 0) delete updatedEvents[date];
        setEvents(updatedEvents);
    };

    const renderCalendar = () => {
        const days = [];
        const daysCount = daysInMonth(currentDate);
        const firstDay = firstDayOfMonth(currentDate);

        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="empty"></div>);
        }

        for (let day = 1; day <= daysCount; day++) {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
            const formattedDate = date.toISOString().slice(0, 10);
            const hasEvents = events[formattedDate] && events[formattedDate].length > 0;

            days.push(
                <div 
                    key={day} 
                    className={`day ${selectedDate && selectedDate.getDate() === day && selectedDate.getMonth() === currentDate.getMonth() && selectedDate.getFullYear() === currentDate.getFullYear() ? 'selected' : ''}`} 
                    onClick={() => handleDayClick(day)}
                >
                    {day}
                    {hasEvents && <div className="event-marker"></div>}
                </div>
            );
        }

        return days;
    };

    const renderSelectedDate = () => {
        if (!selectedDate) return <div className="event-details">Aucun jour sélectionné</div>;

        const formattedDate = selectedDate.toISOString().slice(0, 10);
        const dayEvents = events[formattedDate] || [];
        return (
            <div className="event-details">
                <h2>Événements du {selectedDate.toLocaleDateString()}</h2>
                {dayEvents.length > 0 ? (
                    <ul>
                        {dayEvents.map((event, index) => (
                            <li key={index}>
                                <strong>{event.name}</strong> à {event.time}<br/>
                                <span>{event.description}</span>
                                <div className="event-actions">
                                    <button onClick={() => handleEventEdit(formattedDate, index)}><FaPen /></button>
                                    <button onClick={() => handleEventDelete(formattedDate, index)}><FaTimes /></button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : <p>Aucun événement prévu pour cette journée.</p>}
            </div>
        );
    };

    const renderForm = () => {
        if (!selectedDate) return null;
        return (
            <div className="event-form-container">
                <form onSubmit={handleFormSubmit}>
                    <h2>Ajouter un événement pour le {selectedDate.toLocaleDateString()}</h2>
                    <label>Nom de l'événement:</label>
                    <input type="text" name="eventName" value={eventForm.eventName} onChange={handleInputChange} required autoSave='false' />

                    <label>Heure de l'événement:</label>
                    <input type="time" name="eventTime" value={eventForm.eventTime} onChange={handleInputChange} required />

                    <label>Description de l'événement:</label>
                    <textarea name="eventDescription" value={eventForm.eventDescription} onChange={handleInputChange} required />

                    <button type="submit">Valider</button>
                </form>
            </div>
        );
    };

    return (
        <div className='container'>
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
                        {dayLabels.map((day, index) => (
                            <div key={index} className="day-label">{day}</div>
                        ))}
                    </div>
                    <div className="days">
                        {renderCalendar()}
                    </div>
                </div>
                {renderSelectedDate()}
            </div>
            {renderForm()}
        </div>
    );
}

export default Gerer;
