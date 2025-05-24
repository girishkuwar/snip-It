import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'


import Home from './pages/home/Home.jsx'
import AddSnip from './pages/addsnippet/AddSnip.jsx'
import ShowRoom from './pages/showroom/ShowRoom.jsx'
import Fullcode from './pages/fullcodeviewer/Fullcode.jsx'
import AddShowRoom from './pages/addToShowroom/AddShowRoom.jsx'

function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='addsnip' element={<AddSnip />} />
            <Route path='showroom' element={<ShowRoom/>} />
            <Route path='showroom/:id'  element={<Fullcode/>} />
            <Route path='addtoshowroom' element={<AddShowRoom/>} />
          </Route>
        </Routes>

      </BrowserRouter>

    </>
  )
}

export default App
