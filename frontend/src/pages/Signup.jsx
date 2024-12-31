import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"

function Signup() {
    const [user, setUser] = useState({ fullName: '', email: '', password: '' });
    const [err, setErr] = useState(false)
    const [res, setRes] = useState(null)
    const navigate = useNavigate()

    const handleSignup = (e) => {
        const {name, value} = e.target
        setUser({ ...user, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/user/signup", user)
            setErr(true)
            setRes(response)

            if(response.status === 201) {
                setUser({ fullName: '', email: '', password: '' })
                navigate("/login")
            }
        } catch (error) {
            console.log("Error", error)
        }
    };

    return (
      <>
      <div className="p-4">
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Username</label>
            <input type="text" className="form-control" id="exampleFormControlInput1" name="fullName" onChange={handleSignup} required/>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput2" className="form-label">Email address</label>
            <input type="email" className="form-control" name="email" id="exampleFormControlInput2" onChange={handleSignup} required/>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput3" className="form-label">Password</label>
            <input type="password" className="form-control" name="password" id="exampleFormControlInput3" onChange={handleSignup} required/>
            </div>
            {
                err &&
                (
                    <div className="alert alert-danger" role="alert">
                        {res.data.message}
                    </div>
                )
            }
            <button type="submit" className="btn btn-primary m-1">Signup</button>
            {
                err &&
                (
                    <button type="submit" className="btn btn-success m-1" onClick={() => navigate("/login")}>Login</button>
                )
            }
        </form>
        </div>
      </>
    )
  }
  
  export default Signup
  