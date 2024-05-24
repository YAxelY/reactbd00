import React, { useRef, useState, useEffect } from 'react';
import cloche from './images/cloche.svg';
import burgerMenu from './images/list.svg';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const navLinksRef = useRef(null);
    const notifRef = useRef(null);
    const [notifications, setNotifications] = useState([
        { id: 1, title: 'Nouvel événement', message: 'Cours de SVT le 15/20/2024 à 14:00' },
        { id: 2, title: 'Nouvel événement', message: 'Évaluation de SVT le 17/20/2024 à 12:00' },
        { id: 3, title: 'Nouvel événement', message: 'Cours de SVT le 15/20/2024 à 14:00' },
        { id: 4, title: 'Nouvel événement', message: 'Cours de SVT le 15/20/2024 à 14:00' },
        { id: 5, title: 'Nouvel événement', message: 'Rassemblement à la cour le 21/06/2024 à 7:20' },
        { id: 6, title: 'Nouvel événement', message: 'Rassemblement à la cour le 21/06/2024 à 7:20' },
        { id: 7, title: 'Nouvel événement', message: 'Rassemblement à la cour le 21/06/2024 à 7:20' },
        { id: 8, title: 'Nouvel événement', message: 'Rassemblement à la cour le 21/06/2024 à 7:20' },
        { id: 9, title: 'Nouvel événement', message: 'Affichage des resulatats du premier semestre le 21/06/2024 à 12:00' },
   
    ]);

    const slideMenu = () => {
        if (navLinksRef.current) {
            navLinksRef.current.classList.toggle('showMenu');
        }
    };

    const showNotif = () => {
        if (notifRef.current) {
            notifRef.current.classList.toggle('showNotif');
        }
    };

    const closeNotif = () => {
        if (notifRef.current) {
            notifRef.current.classList.remove('showNotif');
        }
    };

    const removeNotification = (id) => {
        setNotifications(notifications.filter(notification => notification.id !== id));
    };

    return (
        <>
            <nav className="navigation-bar">
                <h1 className='logo'>MyCalendar</h1>
                <ul className='NavLinks' ref={navLinksRef}>
                    <li><Link to='/' className='navigation-links'>Accueil</Link></li>
                    <li><Link to='/Calendrier' className='navigation-links'>Calendrier</Link></li>
                    <li><Link to='/Gerer' className='navigation-links'>Gérer</Link></li>
                    <li><Link to='/Contact' className='navigation-links'>Contact</Link></li>
                </ul>
                <div className='notif'>
                    <button className='clocheNotif' onClick={showNotif}>
                        <img src={cloche} alt='Cloche notification' />
                        <span className='nbNotif'>{notifications.length}</span>
                    </button>
                </div>
                <Link className='login'>
                    <FaUser className='fa-user' />
                    <span>Se connecter</span>
                </Link>
                <img src={burgerMenu} alt='menu déroulant' className='barMenu' onClick={slideMenu} />
            </nav>

            <div className='NotificationList ' ref={notifRef}>

                
                <span className='closeNotifContent' onClick={closeNotif}>X</span>
               

               
                {notifications.length === 0 ? (
                    <div className='notNotification'>
                        <h3>Aucune Notification</h3>
                    </div>
                ) : (
                    <div className='notifContent'>
                        {notifications.map(notification => (
                            <div className='Notification' key={notification.id}>
                                <h4>{notification.title}</h4>
                                <p>{notification.message}</p>
                                <span className='closeNotif' onClick={() => removeNotification(notification.id)}>X</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default Header;
