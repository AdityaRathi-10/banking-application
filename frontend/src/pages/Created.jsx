import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

function Created() {

  const [account, setAccount] = useState({transactionHistory: []})

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("http://localhost:8000/user/get-account", {
          withCredentials: true,
        });
        setAccount(res.data);
      } catch (error) {
        console.error("Error fetching account:", error);
      }
    })();
  }, []);

  if (!account) return <div>Loading...</div>
  
  return (
    <div>
      <h1 className='text-success m-2 mt-4'>Congratulations!! Account Created Successfully.</h1>
      <table className="table table-dark mt-4 w-100">
        <tbody>
          <tr>
            <th scope="row">Account Number</th>
            <td><b>{account.accountNumber}</b></td>
          </tr>
          <tr>
            <th scope="row">Total Balance</th>
            <td>{account.totalBalance}</td>
          </tr>
          <tr>
            <th scope="row">Total Transactions</th>
            <td>{account.transactionHistory.length}</td>
          </tr>
        </tbody>
      </table>
      <div className='m-4'>
      <h3>Enter your account to perform Transactions </h3>
      <Link to="/enter"><button type="button" class="btn btn-success m-1">Enter Account</button></Link>
      </div>
    </div>
  )
}

export default Created