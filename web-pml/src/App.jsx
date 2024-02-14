import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './assets/screens/Login'
import Layout from './assets/Layout/Layout'
import Dashboard from './assets/screens/Dashboard'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          {/* <Route path='/register' element={<Register />} />
          <Route path='/file/:filename/:extension' element={<FilePage />} />
          <Route path='/fileChat/:filename/:extension' element={<FileChat />} />
          <Route path="/logout" element={<Logout />} />
          <Route path='/reset-password/:email/:token' element={<ResetPasswordForm />} /> */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            {/* <Route path="/beranda" element={<Beranda />} /> */}
          </Route>
          {/* <Route path='/email-verification/:id' element={<VerificationEmail />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
