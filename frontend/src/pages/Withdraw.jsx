import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Withdraw() {
    const [accNum, setAccNum] = useState("")
    const [withdraw, setWithdraw] = useState({ accountNumber: "", amount: "", pin: "", comment: "", transactionType: "WITHDRAW" })
    const [res, setRes] = useState(null)
    const [err, setErr] = useState(false)
    const [success, setSuccess] = useState(false)
    const [message, setMessage] = useState("Go back")

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

    const handleWithdraw = (e) => {
      const {name, value} = e.target
      setWithdraw({...withdraw, [name]: value})
    }

    const handleAccount = (e) => {
      setWithdraw({...withdraw, accountNumber: accNum})
    }

    const handleSubmit = async (e) => {
      e.preventDefault()

      try {
        const response = await axios.post("http://localhost:8000/account/deposit", withdraw, {
          withCredentials: true
        })

        if(response.status === 201) {
          setMessage("Enter Account")
          setSuccess(true)
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
      <h1 className='text-danger m-2'>Withdraw</h1>
      <form className="row g-3 m-2" onSubmit={handleSubmit} style={{width: "530px"}}>
        <div className="col-md-8">
          <label for="inputName" className="form-label">Account Number</label>
          <input type="text" className="form-control" id="inputName" name="accountNumber" value={accNum} readOnly />
        </div>
        <div className="col-md-8">
          <label for="inputAmount" className="form-label">Amount</label>
          <input type="number" className="form-control" id="inputAmount" name="amount" onChange={handleWithdraw} required/>
        </div>
        <div className="col-md-8">
          <label for="input" className="form-label">Pin</label>
          <input type="text" className="form-control" minLength={6} maxLength={6} id="inputAmount" name="pin" onChange={handleWithdraw} required />
        </div>
        <div className="col-md-8">
          <label for="input" className="form-label">Comment</label>
          <textarea type="text" placeholder='Enter comment...' className="form-control" id="inputAmount" name="comment" onChange={handleWithdraw} />
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
          Amount Withdrawn Successfully ! Redirecting to account page...<span className="spinner-border" role="status">
            <span className="visually-hidden" >Loading...</span>
          </span>
        </div>
        }
        {
          success ? "" : 
          <button type="submit" onClick={handleAccount} className='btn btn-danger' style={{width: 170, marginTop: "20px", marginLeft: "10px"}}>Withdraw</button>
        }
        <Link to="/enter" style={{width: "170px"}}><button type="submit" onClick={handleAccount} className='btn btn-primary' style={{width: 170, marginTop: "5px", marginLeft: "10px"}}>{message}</button></Link>
        
      </form>
    </div>
  )
}

export default Withdraw