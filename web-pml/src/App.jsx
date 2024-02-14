import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './assets/screens/Login'
import Layout from './assets/Layout/Layout'
import Dashboard from './assets/screens/Dashboard'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { TimProvider } from './context/TimContext'
import Team from './assets/screens/Team'

function App() {

  return (
    <>
      <TimProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="/team" element={<Team />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TimProvider>
    </>
  )
}

export default App
