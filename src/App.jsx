import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom"
import Home from './Pages/Home.jsx'
import HomeDetail from "./Pages/HomeDetail.jsx"
import Favorites from "./Pages/Favourites.jsx"
import Genres from "./assets/Genres.jsx"
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <nav>
        <Link to="/"> Home </Link>
        <Link to="/favorites">Favorites</Link>
      </nav>
      <Routes>
        <Route path="/" element={< Home/>} />
        <Route path="/:id" element={< HomeDetail/>} />
        <Route path="/favorites" element={< Favorites />} />
        <Route path="/genre/:id" element={< Genres />} />
      </Routes>
      {/*<AudioPlayer />*/}
    </BrowserRouter>
  )
}

export default App
