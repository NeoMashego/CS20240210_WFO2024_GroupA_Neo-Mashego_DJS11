import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom"
import Home from './Pages/Home.jsx'
import HomeDetail from "./assets/HomeDetail.jsx"
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <nav>
        <Link to="/"> Home </Link>
      </nav>
      <Routes>
        <Route path="/" element={< Home/>} />
        <Route path="/:id" element={< HomeDetail/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
