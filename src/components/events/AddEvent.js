import React, { useState } from 'react';
import axios from 'axios';
import './AddEvent.css';

function AddEvent({ onEventAdded }) {
    const [eventData, setEventData] = useState({
        idServiceAdmin: '',
        idCalendrier: '',
        idServiceAdminSupprimer: '',
        idServiceAdminModifier: '',
        dateDebut: '',
        dateFin: '',
        lieu: '',
        description: '',
        heureDebut: '',
        heureFin: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventData({ ...eventData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8085/evenements', eventData);
            
            setEventData({
                idServiceAdmin: '',
                idCalendrier: '',
                idServiceAdminSupprimer: '',
                idServiceAdminModifier: '',
                dateDebut: '',
                dateFin: '',
                lieu: '',
                description: '',
                heureDebut: '',
                heureFin: ''
            });
            alert('Event created successfully!');
            window.location.reload();

        } catch (error) {
            console.error('Error adding event:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <input type="text" name="description" value={eventData.description} onChange={handleChange} placeholder="Title" className="form-input" />
            <input type="text" name="idServiceAdmin" value={eventData.idServiceAdmin} onChange={handleChange} placeholder="ID Service Admin" className="form-input" />
            <input type="text" name="idCalendrier" value={eventData.idCalendrier} onChange={handleChange} placeholder="ID Calendrier" className="form-input" />
            <input type="text" name="idServiceAdminSupprimer" value={eventData.idServiceAdminSupprimer} onChange={handleChange} placeholder="ID Service Admin Supprimer" className="form-input" />
            <input type="text" name="idServiceAdminModifier" value={eventData.idServiceAdminModifier} onChange={handleChange} placeholder="ID Service Admin Modifier" className="form-input" />
            <input type="date" name="dateDebut" value={eventData.dateDebut} onChange={handleChange} placeholder="Date de Début" className="form-input" />
            <input type="date" name="dateFin" value={eventData.dateFin} onChange={handleChange} placeholder="Date de Fin" className="form-input" />
            <input type="text" name="lieu" value={eventData.lieu} onChange={handleChange} placeholder="Lieu" className="form-input" />
            
            <input type="time" name="heureDebut" value={eventData.heureDebut} onChange={handleChange} placeholder="Heure de Début" className="form-input" />
            <input type="time" name="heureFin" value={eventData.heureFin} onChange={handleChange} placeholder="Heure de Fin" className="form-input" />
            <br></br>
            <button type="submit">Ajouter l'événement</button>
        </form>
    );
}

export default AddEvent;
