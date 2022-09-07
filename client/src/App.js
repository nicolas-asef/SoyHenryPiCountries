import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Nav from './components/Nav/Nav';
import Details from './pages/Details/Details';
import Activity from './pages/Activity/Activity';
import Landing from './pages/Landing/Landig';

function App() {
  return (
    <div className="App">
      <Nav/>
      <Routes>
        <Route path='/' element={<Landing/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/detalle/:id' element={<Details/>} />
        <Route path='/actividad' element={<Activity/> } />
      </Routes>
    </div>
  );
}

export default App;
