import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios";
import Pin from "./Pin";

function EnterAccount() {

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
    }, [])

    if(!account.pin) {
      return <Pin/>
    }

    if(!account) {
      return (
        <div className="m-3">
          <h2>You don't have an account. First create it.</h2>
          <Link to="/create"><button type="button" class="btn btn-primary m-2">Create Account</button></Link>
        </div>
      )
    }

    return(
    <div>
        <h2 className="m-2 mt-3">Account details</h2>
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
      <div className='mt-4 m-2'>
      <Link to="/deposit"><button type="button" class="btn btn-success m-1">Deposit Money</button></Link>
      <Link to="/withdraw"><button type="button" class="btn btn-danger m-1">Withdraw Money</button></Link>
      <Link to="/history"><button type="button" class="btn btn-primary m-1">Check Transaction History</button></Link>
      <Link to="/transfer"><button type="button" class="btn btn-warning m-1">Transfer Money</button></Link>
      </div>
    </div>
    )
}

export default EnterAccount