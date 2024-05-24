import React, { useState } from 'react';
import './Calendrier.css';

function Gerer() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [events] = useState({
        "2024-12-12": ["Rendez-vous chez le médecin", "Dîner avec des amis"]
    });

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

    const handleDayClick = (day) => {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        setSelectedDate(date);
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

        const formattedDate = selectedDate.toISOString().slice(0, 10);
        const dayEvents = events[formattedDate] || [];
        return (
            <div className="event-details">
                <h2>Événements du {selectedDate.toLocaleDateString()}</h2>
                {dayEvents.length > 0 ? (
                    <ul>
                        {dayEvents.map((event, index) => <li key={index}>{event}</li>)}
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
                    {renderSelectedDate()}
                </div>
            </div>
        </div>
    );
}

export default Gerer;
