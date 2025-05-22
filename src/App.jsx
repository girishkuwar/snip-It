import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'


import Home from './pages/home/Home.jsx'
import AddSnip from './pages/addsnippet/AddSnip.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='addsnip' element={<AddSnip />} />
          </Route>
        </Routes>

      </BrowserRouter>

    </>
  )
}

export default App
