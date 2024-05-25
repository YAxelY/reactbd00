import React from 'react';
import image1 from './public/images/1.jpg';
import image2 from './public/images/2.jpg';
import image3 from './public/images/3.jpg';
import './public/Home.css'
import { Link } from 'react-router-dom';
import calendarIco from './public/images/calendarIcon.svg'
import studentIco from './public/images/studentIco.svg'
import parentIco from './public/images/parentIco.svg'


const Home = () => {
    return (
        <div className='Home'>
            <div className='row txt'>
                
                <div className=' taille txt'>
                <div id="carouselExampleCaptions" className="carousel slide " data-bs-ride="carousel">
                        <div className="carousel-indicators ">
                            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        </div>
                        <div className="carousel-inner">
                            <div className="carousel-item   active">
                                <img src={image3} className="d-block w-1" alt="First slide"/>
                                <div className="carousel-caption d-none d-md-block">
                                   
                                </div>
                            </div>
                            <div className="carousel-item">
                                <img src={image1} className="d-block w-1" alt="Second slide"/>
                                <div className="carousel-caption d-none d-md-block">
                                    
                                </div>
                            </div>
                            <div className="carousel-item">
                                <img src={image2} className="d-block w-1" alt="Third slide"/>
                                <div className="carousel-caption d-none d-md-block">
                                    
                                </div>
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>

                </div>

            </div>

            <div className='presentation'>
                    <h1 className='title'>Bienvenu sur MyCalendar</h1>
                    <h3 className='description'>Nous sommes ravis de vous accompagner dans la gestion de votre emploi du temps et espérons que notre calendrier deviendra un outil incontournable dans votre quotidien. Bienvenue et bonne organisation !</h3>
            </div>

            <div className='aPropos'>
                <h1>A propos de MyCalendar</h1>
                
                <div className='list_box'>
                    <div className="box">
                        <img src={calendarIco}/>
                        <h2>Calendrier</h2>
                        <p>Vous avez la possibiliter de d'ajouter des evements qui seronts visibles par les membres de votre établissement scolaire.</p>
                    </div>
                    <div className="box">
                        <img src={studentIco}/>
                        <h2>Eleves</h2>
                        <p>Les éleves pourront de consulter les evenements à venir qui se dérouleront dans votre établissement.</p>
                    </div>
                    <div className="box">
                        <img src={parentIco}/>
                        <h2>Parents</h2>
                        <p>Les parents également peuvent y avoir accès pour être courant des évenements.</p>
                    </div>
                </div>

            </div>

            <div className='calendarLink'>
            <h4>Cliquez sur ce button pour acceder au calendrier scolaire</h4>
            <Link className='calendar' to='/Calendrier'>Cliquez ici</Link>
            </div>
        </div>
            
       
        
    );
};

export default Home;
