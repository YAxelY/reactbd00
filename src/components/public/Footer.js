import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter ,FaInstagram } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h1 className='logo'>MyCalendar</h1>
                    <p>© 2024 MyCalendar. Tous droits réservés.</p>
                </div>
                <div className="footer-section">
                    <h4>Navigation</h4>
                    <ul>
                    <li><Link to='/' className='navigation-links'>Accueil</Link></li>
                    <li><Link to='/Calendrier' className='navigation-links'>Calendrier</Link></li>
                    <li><Link to='/Gerer' className='navigation-links'>Gérer</Link></li>
                    <li><Link to='/Contact' className='navigation-links'>Contact</Link></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Suivez-nous</h4>
                    <ul className="social-links">
                        <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className=' faceLk'><FaFacebook/></a></li>
                        <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className=' twLk'><FaTwitter/></a></li>
                        <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className=' igLk'><FaInstagram/></a></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
