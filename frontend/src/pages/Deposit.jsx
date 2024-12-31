import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Deposit() {
    const [accNum, setAccNum] = useState("")
    const [deposit, setDeposit] = useState({ accountNumber: "", amount: "", pin: "", comment: "", transactionType: "DEPOSIT" })
    const [res, setRes] = useState(null)
    const [err, setErr] = useState(false)
    const [success, setSuccess] = useState(false)
    const [message, setMessage] = useState("Go back")
    const [time, setTime] = useState(false)

    useEffect(() => {
      (async () => {
        try {
          const response = await axios.get("http://localhost:8000/user/get-account", {
            withCredentials: true,
          });
          setAccNum(response.data.accountNumber);
        } catch (error) {
          setRes(error.response)
          setErr(true)
        }
      })();
    }, [])
  
  const navigate = useNavigate()
  
  useEffect(() => {
    if (success) {
      setTimeout(() => {
        navigate("/enter")
      }, 1500);
   }
  }, [success, navigate])

    if(!accNum) {
      return (
        <div className="m-3">
          <h2>You don't have an account. First create it.</h2>
          <Link to="/create"><button type="button" class="btn btn-primary m-2">Create Account</button></Link>
        </div>
      )
    }
    const handleDeposit = (e) => {
      const {name, value} = e.target
      setDeposit({...deposit, [name]: value})
    }

    const handleAccount = (e) => {
      setDeposit({...deposit, accountNumber: accNum})
    }
 
    const handleSubmit = async (e) => {
      e.preventDefault()

      try {
        const response = await axios.post("http://localhost:8000/account/deposit", deposit, {
          withCredentials: true
        })

        if(response.status === 201) {
          setSuccess(true)
          setMessage("Enter Account")
        }
        else {
          setRes(response)
          setErr(true)
        }
      } catch (error) {
        setRes(error.response)
        setErr(true)
      }
    }

  return (
    <div>
      <h1 className='text-success m-2'>Deposit</h1>
      <form className="row g-3 m-2" onSubmit={handleSubmit} style={{width: "530px"}}>
        <div className="col-md-8">
          <label for="inputName" className="form-label">Account Number</label>
          <input type="text" className="form-control" id="inputName" name="accountNumber" value={accNum} readOnly />
        </div>
        <div className="col-md-8">
          <label for="inputAmount" className="form-label">Amount</label>
          <input type="number" className="form-control" id="inputAmount" name="amount" onChange={handleDeposit} required/>
        </div>
        <div className="col-md-8">
          <label for="input" className="form-label">Pin</label>
          <input type="text" className="form-control" minLength={6} maxLength={6} id="inputAmount" name="pin" onChange={handleDeposit} required />
        </div>
        <div className="col-md-8">
          <label for="input" className="form-label">Comment</label>
          <textarea type="text" placeholder='Enter comment...' className="form-control" id="inputAmount" name="comment" onChange={handleDeposit} />
        </div>
        {
          err && res &&
            <div className="alert alert-danger mt-4" role="alert">
              {res.data.message ? res.data.message : "An error occurred"}
            </div>
        }
        {
          success &&
          <div className="alert alert-success mt-4" role="alert">
          Amount Deposited Successfully ! Redirecting to account page...<span className="spinner-border" role="status">
            <span className="visually-hidden" >Loading...</span>
          </span>
        </div>
        }
        {
          success ? "" : 
        <button type="submit" onClick={handleAccount} className='btn btn-success' style={{width: 170, marginTop: "20px", marginLeft: "10px"}}>Deposit</button>
        }
        <Link to="/enter" style={{width: "170px"}}><button type="submit" onClick={handleAccount} className='btn btn-primary' style={{width: 170, marginTop: "5px", marginLeft: "10px"}}>{message}</button></Link>
      
      </form>
    </div>
  )
}

export default Deposit