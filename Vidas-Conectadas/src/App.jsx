import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Register from './assets/pages/Register'
import Home from './assets/pages/Home'



function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/Register' element={<Register/>}></Route>
      </Routes>
    </BrowserRouter>
  )

}

export default App
