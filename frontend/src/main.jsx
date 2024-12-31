import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
// import App from './App.jsx'
import Navbar from './pages/Navbar.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Home from './pages/Home.jsx'
import CreateAccount from './pages/CreateAccount.jsx'
import EnterAccount from './pages/EnterAccount.jsx'
import Created from './pages/Created.jsx'
import Deposit from './pages/Deposit.jsx'
import Withdraw from './pages/Withdraw.jsx'
import History from './pages/History.jsx'
import Pin from './pages/Pin.jsx'
import Transfer from './pages/Transfer.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
        <Routes>
          <Route path='/' element={<Navbar/>} />
          <Route path="/home" element={<Home/>} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/create' element={<CreateAccount/>}/>
          <Route path='/enter' element={<EnterAccount/>}/>
          <Route path='/created' element={<Created />}/>
          <Route path='/deposit' element={<Deposit />}/>
          <Route path='/withdraw' element={<Withdraw />}/>
          <Route path='/history' element={<History />}/>
          <Route path='/pin' element={<Pin />}/>
          <Route path='/transfer' element={<Transfer />}/>
        </Routes>
    </Router>
  </StrictMode>
)
