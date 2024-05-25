import React from 'react';
import image4 from './images/contact.jpg'
import './Conctact.css'


const Contact = () => {
    return (
        <div className='Contact'>

            
           {}
            <div className='contactForm'>
                    <h1>Nous contacter</h1>
                <form className='contactUs'>             
                    <input type='text' placeholder='Votre nom'  />
                    <input type = 'text' placeholder='Email Id'/>
                    <textarea rows='3' placeholder='Entrez votre message'></textarea>
                    <input type='submit' className='sndContact' value='Envoyer'/>
                </form>

            </div>
            <div className='col-3'></div>
            <div className="bgContact">
                    <img src={image4} alt="Contact Us" className="img-fluid"/>
            </div>
        </div>
    );
};

export default Contact;
