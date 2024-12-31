import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './style.css'

function History() {
  
  const [history, setHistory] = useState({ transactionHistory: [] })

  useEffect(() => {
    try {
      (async () => {
        const response = await axios.get("http://localhost:8000/account/history", {
          withCredentials: true
        })
        if(response.status === 250) {
          setHistory(null)
        }
        else {
          setHistory(response.data)
        }
      })() 
    } catch (error) {
      console.log("error", error)
    }
  }, [])

  useEffect(() => {
    try {
      (async () => {
        const response = await axios.get("http://localhost:8000/user/get-account", {
          withCredentials: true
        })
      })() 
    } catch (error) {
      console.log("error", error)
    }
  }, [])

  if(!history) return (
    <div className="m-3">
      <h2>You don't have an account. First create it.</h2>
      <Link to="/create"><button type="button" class="btn btn-primary m-2">Create Account</button></Link>
    </div>
  )

  return (
    <div className='m-3'>
      <h2 className='text-warning'>Transaction History</h2>
      <p style={{fontSize: "20px", marginTop: "25px"}}>Total Transactions: <b>{history.transactionHistory.length}</b></p>
      <p style={{fontSize: "20px"}}>Net Balance: <b>{history.totalBalance}</b></p>     
      { history.transactionHistory.length == 0 ? <h3 className='text-warning'>You dont have any transactions yet!</h3> :
        <table className='table table-dark mt-4 w-100'>
          <thead className='table-active'>
            <th>TransactionID</th>
            <th>Duration</th>
            <th>Transaction Type</th>
            <th>Amount</th>
            <th>Current Balance</th>
            <th>Comments</th>
          </thead>
          <tbody>
            {
              history.transactionHistory.map((transaction) => (
                <tr key={transaction.transactionID}>
                  <td style={transaction.transactionType === "SENT" || transaction.transactionType === "RECEIVED" ? { color: "#ff9900" } : {}}>
                    {
                      transaction.transactionID 
                    }
                    {
                      transaction.transactionType === "SENT" || transaction.transactionType === "RECEIVED" ?
                      <p style={{ borderRadius: "10px", backgroundColor: "rgb(75, 75, 75)", width: "max-content", color: "white", margin: "3px", padding: "2px 15px" }}>{transaction.transactionBetween[0].name}, {transaction.transactionBetween[0].account}</p> 
                      : ""
                    }
                  </td>
                  <td>{transaction.time}</td>
                  <td>{transaction.transactionType}</td>
                  <td style={{ fontSize: "17px", ...(transaction.transactionType === "SENT" || transaction.transactionType === "RECEIVED" ? { color: "#ff9900" } : transaction.transactionType === "DEPOSIT" ? {color: "#00ff00"}: {color: "#ff4343"} ) }}>{transaction.transactionType === "SENT" ? `-${transaction.amount}` : transaction.transactionType === "RECEIVED" ? `+${transaction.amount}` : transaction.transactionType === "DEPOSIT" ? `+${transaction.amount}` : `-${transaction.amount}`}</td>
                  <td style={{fontSize: "17px"}}>{transaction.currentBalance}</td>
                  <td style={{width: "300px"}}>{transaction.comment ? transaction.comment : "-"}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      }
      <Link to="/enter"><button className='btn btn-primary m-3'>Go back</button></Link>
    </div>
    
  )
}

export default History