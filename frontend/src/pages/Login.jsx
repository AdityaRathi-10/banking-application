import { useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios"

function Login() {
    const [user, setUser] = useState({ email: '', password: '' });
    const [err, setErr] = useState(false)
    const [res, setRes] = useState(null)
    const navigate = useNavigate()

    const handleLogin = (e) => {
        const {name, value} = e.target
        setUser({ ...user, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/user/login", user, {
                withCredentials: true
            })

            if(response.status === 200) {
                setUser({ email: '', password: '' })
                navigate("/home")
            }
        } catch (error) {
            setErr(true)
            setRes(error)
            console.log("Error", error)
        }
    };

    return (
      <>
      <div className="p-4">
        <form onSubmit={handleSubmit}>
            <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Email address</label>
            <input type="email" class="form-control" name="email" id="exampleFormControlInput1" onChange={handleLogin} required/>
            </div>
            <div class="mb-3">
            <label for="exampleFormControlInput2" class="form-label">Password</label>
            <input type="password" class="form-control" name="password" id="exampleFormControlInput2" onChange={handleLogin} required/>
            </div>
            {
                err &&
                (
                    <div className="alert alert-danger" role="alert">
                        {res.response.data.message}
                    </div>
                )
            }
            <button type="submit" class="btn btn-primary">Login</button>
        </form>
        </div>
      </>
    )
  }
  
  export default Login
  