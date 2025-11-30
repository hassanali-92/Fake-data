import React from 'react'
import Home from './componente/home'
import { Route, Routes } from 'react-router-dom'
import Create from './componente/Create'
import Update from './componente/Update'

const App = () => {
  return (
  
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/create" element={<Create/>}/>
        <Route path="/update/:id" element={<Update/>}/>
      
      </Routes>
      
  
  )
}

export default App
