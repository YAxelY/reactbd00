import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UpdateEvent({ eventId, onEventUpdated }) {
    const [eventData, setEventData] = useState(null);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await axios.get(`http://localhost:8085/events/${eventId}`);
                setEventData(response.data);
            } catch (error) {
                console.error('Error fetching event:', error);
            }
        };
        fetchEvent();
    }, [eventId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventData({ ...eventData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8085/${eventId}`, eventData);
            onEventUpdated(response.data);
        } catch (error) {
            console.error('Error updating event:', error);
        }
    };

    if (!eventData) return <p>Chargement...</p>;

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="idServiceAdmin" value={eventData.idServiceAdmin} onChange={handleChange} placeholder="ID Service Admin" />
            <input type="text" name="idCalendrier" value={eventData.idCalendrier} onChange={handleChange} placeholder="ID Calendrier" />
            <input type="text" name="idServiceAdminSupprimer" value={eventData.idServiceAdminSupprimer} onChange={handleChange} placeholder="ID Service Admin Supprimer" />
            <input type="text" name="idServiceAdminModifier" value={eventData.idServiceAdminModifier} onChange={handleChange} placeholder="ID Service Admin Modifier" />
            <input type="date" name="dateDebut" value={eventData.dateDebut} onChange={handleChange} placeholder="Date de Début" />
            <input type="date" name="dateFin" value={eventData.dateFin} onChange={handleChange} placeholder="Date de Fin" />
            <input type="text" name="lieu" value={eventData.lieu} onChange={handleChange} placeholder="Lieu" />
            <input type="text" name="description" value={eventData.description} onChange={handleChange} placeholder="Description" />
            <input type="time" name="heureDebut" value={eventData.heureDebut} onChange={handleChange} placeholder="Heure de Début" />
            <input type="time" name="heureFin" value={eventData.heureFin} onChange={handleChange} placeholder="Heure de Fin" />
            <button type="submit">Mettre à jour l'événement</button>
        </form>
    );
}

export default UpdateEvent;
