
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Gerer from './pages/Gerer';
import Calendrier from './pages/Calendrier';
import Home from './components/Home';
import Contact from './components/public/Contact';
import Header from './components/public/Header';
import Footer from './components/public/Footer';

function App() {

  
  return (
    <div className="App">
     <BrowserRouter>
       <Header/>
       <Routes>
         <Route path='/Calendrier' element={<Calendrier/>} />
         <Route path='/Gerer' element={<Gerer/>} />
         <Route path='/' element={<Home/>} />
         <Route path='/Contact' element={<Contact/>} />

       </Routes>
       <Footer/>
     </BrowserRouter> 
      
      
    </div>
  );
}

export default App;
