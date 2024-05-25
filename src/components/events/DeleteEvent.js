import React from 'react';
import axios from 'axios';

function EventList({ events, onEventDeleted }) {
    const handleDelete = async (eventId) => {
        try {
            await axios.delete(`http://localhost:8085/${eventId}`);
            onEventDeleted(eventId);
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    return (
        <div>
            {events.map(event => (
                <div key={event.id} className="event-item">
                    <p><strong>Titre: </strong>{event.description}</p>
                    <p><strong>Date de début: </strong>{event.dateDebut}</p>
                    <p><strong>Date de fin: </strong>{event.dateFin}</p>
                    <p><strong>Heure de début: </strong>{event.heureDebut}</p>
                    <p><strong>Heure de fin: </strong>{event.heureFin}</p>
                    <p><strong>Lieu: </strong>{event.lieu}</p>
                    <button onClick={() => handleDelete(event.id)}>Supprimer</button>
                </div>
            ))}
        </div>
    );
}

export default EventList;
