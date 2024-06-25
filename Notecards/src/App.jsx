import { Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './components/Home'
import Navbar from './components/Navbar';
import About from './components/About';
import LoginForm from './components/LoginForm';
import NotecardList from './components/NotecardList';
import DeckForm from './components/DeckForm';
import NotecardForm from './components/NotecardForm';
import SignUpForm from './components/SignUpForm';

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/notecards" element={<NotecardList />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="login/new" element={<SignUpForm />} />
        <Route path="/create" element={<DeckForm />} />
        <Route path="/create/:deckName" element={<NotecardForm />} />
      </Routes>
    </>
    
  )
  
}

export default App
