import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

function Transfer() {

  const [details, setDetails] = useState({ accountNumber: "", amount: "", pin: "", comment: "", transactionType:"" })
  const [err, setErr] = useState(false)
  const [res, setRes] = useState(null)
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  const handleTransfer = (e) => {
    const { name, value } = e.target
    setDetails({ ...details, [name]: value })
  }

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        navigate("/enter");
      }, 1500);
    }
  }, [success, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErr(false)
    setSuccess(false)
    try {
      const response = await axios.post("http://localhost:8000/account/transfer", details, {
        withCredentials: true
      })
      console.log("sdjhfdks", response)
      setRes(response)
      if(response.status === 201) {
        setSuccess(true)
      }
      else {
        setErr(true)
        setRes(response)
      }
    } catch (error) {
      setErr(true)
      setRes(error.response)  
    }
  }

  return (
    <div className='m-2 mt-3'>
      <h1 className='text-success m-2'>Transfer Money</h1>
      <form className="row g-3 m-2" style={{width: "530px"}} onSubmit={handleSubmit}>
        <div className="col-md-8">
          <label for="inputName" className="form-label">Account Number</label>
          <input type="text" className="form-control" id="inputName" name="accountNumber" maxLength={12} minLength={11} onChange={handleTransfer} required />
        </div>
        <div className="col-md-8">
          <label for="inputAmount" className="form-label">Amount</label>
          <input type="number" className="form-control" id="inputAmount" name="amount" onChange={handleTransfer}  required/>
        </div>
        <div className="col-md-8">
          <label for="input" className="form-label">Pin</label>
          <input type="text" className="form-control" minLength={6} maxLength={6} id="inputAmount" name="pin" onChange={handleTransfer} required />
        </div>
        <div className="col-md-8">
          <label for="input" className="form-label">Message</label>
          <textarea type="text" placeholder="Enter message" className="form-control" id="inputAmount" name="comment" onChange={handleTransfer} />
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
            Transfer successful! Redirecting to account page...<span className="spinner-border" role="status">
              <span className="visually-hidden" >Loading...</span>
            </span>
          </div>
        }
        {
          success ? "" :
        <button type="suxbmit"  className='btn btn-success' style={{width: 170, marginTop: "20px", marginLeft: "10px"}}>Transfer</button>
        }
      </form>
    </div>
  )
}

export default Transfer