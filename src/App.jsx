import { useState } from "react"
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom"
import Home from './Pages/Home.jsx'
import HomeDetail from "./Pages/HomeDetail.jsx"
import Favorites from "./Pages/Favorites.jsx"
import Genres from "./assets/Genres.jsx"
import './App.css'

function App() {

      //mounts favorites (memory) content when rendered. global rendering
      const [favorites, setFavorites] = useState( ()=>{
        const savedFavorites = localStorage.getItem('Favorites')
        return savedFavorites ? JSON.parse(savedFavorites) : []
      })

  return (
    <BrowserRouter>
      <nav>
        <Link to="/"> Home </Link>
        <Link to="/favorites">Favorites</Link>
      </nav>
      <Routes>
        <Route path="/" element={< Home/>} />
        <Route path="/:id" element={< HomeDetail favorites={favorites} setFavorites={setFavorites} /> } />
        <Route path="/favorites" element={< Favorites favorites={favorites} setFavorites={setFavorites} />} />
        <Route path="/genre/:id" element={< Genres />} />
      </Routes>
      {/*<AudioPlayer />*/}
    </BrowserRouter>
  )
}

export default App
