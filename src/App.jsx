import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom"
import Home from './Pages/Home.jsx'
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <nav>
        <Link to="/"> Home </Link>
      </nav>
      <Routes>
        <Route path="/" element={< Home/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
