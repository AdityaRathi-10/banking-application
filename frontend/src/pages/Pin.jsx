import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Pin() {
    const [pin, setPin] = useState({pin: ""})
    const [account, setAccount] = useState({accountNumber: ""})
    const [res, setRes] = useState({})
    const [err, setErr] = useState(false)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
    (async () => {
        try {
        const res = await axios.get("http://localhost:8000/user/get-account", {
            withCredentials: true,
        });
        setAccount(res.data);
        } catch (error) {
            console.error("Error fetching account:", error);
        } finally {
            setLoading(false)
        }
    })();
    }, []);

    if(!account) {
        return (
            <div className="m-3">
              <h2>You don't have an account. First create it.</h2>
              <Link to="/create"><button type="button" class="btn btn-primary m-2">Create Account</button></Link>
            </div>
        )
    }

    if(loading) {
        return (
            <div className="m-3">
                <h2>Making account number for you!</h2>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }

    const handlePin = (e) => {
        const {name, value} = e.target
        setPin({...pin, [name]: value})
    }

    const dataToSend = {
        pin: pin.pin,
        accountNumber: account.accountNumber,
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post("http://localhost:8000/account/create/setpin", dataToSend, {
                withCredentials: true
            })
            console.log(response)
            if(response.status == 201) {
                setPin({pin: ""})
                navigate("/created")
            }
            else {
                setErr(true)
                setRes(response)
            }
        } catch (error) {
            setRes(error.response)
            setErr(true)
        }
    }

    if (!account) return <div>Loading...</div>
  return (
    <div className='m-2'>
        <h2 className='text-warning'>Generate pin for transactions</h2>
        <table className="table table-dark mt-4 w-100">
            <tbody>
            <tr>
                <th style={{fontSize: "20px"}} scope="row">Account Number</th>
                <td style={{fontSize: "20px"}}><b>{account.accountNumber}</b></td>
            </tr>
            </tbody>
        </table>
        <form className="row g-3 m-1" onSubmit={handleSubmit}>
        <div className="col-md-6">
            <label for="inputName" className="form-label">Pin: 6 digits</label>
            <input type="text" className="form-control" id="inputName" name="pin" pattern="\d{6}" minLength={6} maxLength={6} onChange={handlePin} required />
            {
                err &&
                (
                <div className="alert alert-danger mt-4" role="alert">
                    {res.data.message}
                </div>
                )
            }
            <button type='submit' className="btn btn-primary m-2 mt-3" style={{width: "150px"}}>Create</button>
        </div>
        </form>
    </div>
  )
}

export default Pin