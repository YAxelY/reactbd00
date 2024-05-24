import React from 'react';
import image4 from './images/contact.jpg'
import './Conctact.css'


const Contact = () => {
    return (
        <div className='Contact'>
            <div className='row'>
               

                <div className='col-1'>
                    
                </div>
                <div className='col-9 test' >
                   
                        <div className="row py-5 g-3">
                            <div className="col-md-6 first_col">
                                <h1 className="text-center mt-3">Contact Us</h1>
                                <form className="p-4 mt-5">
                                    <div className="mb-3">
                                        <label htmlFor="exampleFormControlInput1" className="form-label">Entrez votre</label>
                                        <input type="text" className="form-control" id="exampleFormControlInput1" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleFormControlInput2" className="form-label">Email ID</label>
                                        <input type="text" className="form-control" id="exampleFormControlInput2" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Entrez votre message</label>
                                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <button type="button" className="btn btn-primary">Send Now</button>
                                    </div>
                                </form>
                            </div>
                            <div className="col-md-6 sec_col">
                                <img src={image4} alt="Contact Us" className="img-fluid" />
                            </div>
                        </div>
                        
                    
                </div>
            </div>
           
        </div>
    );
};

export default Contact;
