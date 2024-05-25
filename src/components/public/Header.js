import React, { useRef, useState } from 'react';
import cloche from './images/cloche.svg';
import burgerMenu from './images/list.svg';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const navLinksRef = useRef(null);
    const notifRef = useRef(null);
    const [notifications, setNotifications] = useState([
        { id: 1, title: '', message: 'Cours de SVT le 15/06/2024 à 14:00' },
        { id: 2, title: '', message: 'Évaluation de SVT le 17/06/2024 à 12:00' },
        { id: 3, title: '', message: 'Cours de SVT le 15/06/2024 à 14:00' },
        { id: 5, title: '', message: 'Rassemblement à la cour le 21/06/2024 à 7:20' },
        { id: 4, title: '', message: 'Cours de SVT le 15/06/2024 à 14:00' },
        { id: 6, title: '', message: 'Rassemblement à la cour le 21/06/2024 à 7:20' },
        { id: 7, title: '', message: 'Rassemblement à la cour le 21/06/2024 à 7:20' },
        { id: 8, title: '', message: 'Rassemblement à la cour le 21/06/2024 à 7:20' },
        { id: 9, title: '', message: 'Affichage des résultats du premier semestre le 21/06/2024 à 12:00' },
    ]);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

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

    const handleLoginClick = () => {
        setShowLogin(true);
    };

    const handleCancelClick = () => {
        setShowLogin(false);
        setId('');
        setPassword('');
    };

    const handleLogoutClick = () => {
        setIsLoggedIn(false);
        setShowLogin(false);
        setId('');
        setPassword('');
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        if (id === 'admin' && password === 'admin') {
            setIsLoggedIn(true);
            setShowLogin(false);
        } else {
            alert('Identifiant ou mot de passe incorrect');
        }
    };

    return (
        <>
            <nav className="navigation-bar">
                <h1 className='logo'>MyCalendar</h1>
                <ul className='NavLinks' ref={navLinksRef}>
                    {!isLoggedIn && <li><Link to='/' className='navigation-links'>Accueil</Link></li>}
                    <li><Link to='/Calendrier' className='navigation-links'>Calendrier</Link></li>
                    {isLoggedIn && <li><Link to='/Gerer' className='navigation-links'>Gérer</Link></li>}
                    {!isLoggedIn && <li><Link to='/Contact' className='navigation-links'>Contact</Link></li>}
                </ul>
                <div className='notif'>
                    <button className='clocheNotif' onClick={showNotif}>
                        <img src={cloche} alt='Cloche notification' />
                        <span className='nbNotif'>{notifications.length}</span>
                    </button>
                </div>
                {isLoggedIn ? (
                    <button className='login' onClick={handleLogoutClick}>
                        <FaUser className='fa-user' />
                        <span>Déconnecter</span>
                    </button>
                ) : (
                    <button className='login' onClick={handleLoginClick}>
                        <FaUser className='fa-user' />
                        <span>Se connecter</span>
                    </button>
                )}
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

            {showLogin && (
                <div className='loginModal'>
                    <form className='loginForm' onSubmit={handleLoginSubmit}>
                        <label>
                            ID:
                            <input type='text' value={id} onChange={(e) => setId(e.target.value)} />
                        </label>
                        <label>
                            Mot de passe:
                            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        </label>
                        <div className='loginButtons'>
                            <button type='submit'>Se connecter</button>
                            <button type='button' onClick={handleCancelClick}>Annuler</button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
};

export default Header;
