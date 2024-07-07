import { Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './components/Home'
import Navbar from './components/Navbar';
import About from './components/About';
import LoginForm from './components/LoginForm';
import DeckForm from './components/DeckForm';
import NotecardForm from './components/NotecardForm';
import SignUpForm from './components/SignUpForm';
import DeckList from './components/DeckList';
import DeckPage from './components/DeckPage';
import DeckListWrapper from './components/DeckListWrapper';
import NotecardSlide from './components/NotecardSlide';

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/notecards" element={<DeckList username={""}/>} />
        
        <Route path="/notecards/:username" element={<DeckListWrapper />} />
        <Route path="/notecards/:username/:deckTitle" element={<DeckPage />} />

        <Route path="/notecards/:username/create" element={<DeckForm />} />
        <Route path="/notecards/:username/create/:deckName" element={<NotecardForm />} />

        <Route path="/login" element={<LoginForm />} />
        <Route path="/login/new" element={<SignUpForm />} />
        
      </Routes>
    </>
    
  )
  
}

export default App
