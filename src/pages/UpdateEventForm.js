import React, { useState } from 'react';
import axios from 'axios';
import './UpdateEventForm.css';

const UpdateEventForm = ({ event, onUpdate }) => {
    console.log(event)
    const [updatedEventDetails, setUpdatedEventDetails] = useState({
        id: event.id || '',
        dateDebut: event.dateDebut || '',
        dateFin: event.dateFin || '',
        lieu: event.lieu || '',
        description: event.title || '',
        heureDebut: event.heureDebut || '',
        heureFin: event.heureFin || ''
    });
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedEventDetails({ ...updatedEventDetails, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Filter out attributes with empty values
            const updatedAttributes = Object.keys(updatedEventDetails).reduce((acc, key) => {
                if (updatedEventDetails[key] !== '') {
                    acc[key] = updatedEventDetails[key];
                }
                return acc;
            }, {});
    
            await axios.post(`http://localhost:8085/${updatedEventDetails.id}`, updatedAttributes);
            onUpdate(); // Notify parent component of successful update
        } catch (error) {
            console.error('Error updating event:', error);
        }
    };
    

    return (
        <form onSubmit={handleSubmit} className="update-event-form">
            {/* Input fields for updated event details */}
            <input type="text" name="id" hidden value={updatedEventDetails.title} onChange={handleChange} placeholder="id" />
            <input type="text" name="title" value={updatedEventDetails.title} onChange={handleChange} placeholder="Titre" />
            <input type="date" name="dateDebut" value={updatedEventDetails.dateDebut} onChange={handleChange} placeholder="Date de début" />
            <input type="date" name="dateFin" value={updatedEventDetails.dateFin} onChange={handleChange} placeholder="Date de fin" />
            <input type="time" name="heureDebut" value={updatedEventDetails.heureDebut} onChange={handleChange} placeholder="Heure de début" />
            <input type="time" name="heureFin" value={updatedEventDetails.heureFin} onChange={handleChange} placeholder="Heure de fin" />
            <input type="text" name="lieu" value={updatedEventDetails.lieu} onChange={handleChange} placeholder="Lieu" />

            {/* Add more input fields for other attributes as needed */}
     
      
            <button type="submit">Update</button>
        </form>
    );
};

export default UpdateEventForm;
