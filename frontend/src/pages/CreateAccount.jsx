import { useEffect, useState } from "react"
import states from "../assets/states"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"

function CreateAccount() {
    const [state, setState] = useState([])
    const [email, setEmail] = useState("")
    const [err, setErr] = useState(false)
    const [res, setRes] = useState(null)
    const [account, setAccount] = useState({ owner: '', email: '', aadharNumber: '', address: '', state: '', zip: '' })
    const [selectedState, setSelectedState] = useState(null)
    const navigate = useNavigate()

    const handleAccountCreation = (e) => {
        const {name, value} = e.target
        setAccount({ ...account, [name]: value })
    }

    const handleState = (e) => {
      const selectedValue = e.target.value;
      setSelectedState(selectedValue);
      setAccount({ ...account, state: selectedValue, email: email });
    };

    useEffect(() => {
        (async () => {
          setState(states)
        const res = await axios.get("http://localhost:8000/user/get-email", {
            withCredentials: true 
        })
        setEmail(res.data)    
      })()
      }, [])

      if(!email) return <h1>Loading...</h1>

    const handleSubmit = async (e) =>{
        e.preventDefault();
   
        try {
          const response = await axios.post("http://localhost:8000/account/create", account, {
            withCredentials: true
          })

          console.log("response from sercsf", response)
          
          if(response.status === 201) {
            setAccount({ owner: '', email: '', aadharNumber: '', address: '', state: '', zip: '' })
            navigate("/pin")
          }
          else if(response.status == 202) {
            setErr(true)
            setRes(response)
          }
        } catch (error) {
          setErr(true)
          setRes(error.response);
        }
      }

    return(
    <form className="row g-3 m-2" onSubmit={handleSubmit}>
    <div className="col-md-6">
    <label for="inputName" className="form-label">Name</label>
    <input type="text" className="form-control" id="inputName" name="owner" onChange={handleAccountCreation} required />
  </div>
  <div className="col-md-6">
    <label for="inputEmail4" className="form-label">Email</label>
    <input type="email" className="form-control" id="inputEmail4" value={email} name="email" readOnly />
  </div>
  <div className="col-md-6">
    <label for="inputPassword4" className="form-label">Aadhar Card Number</label>
    <input type="text" className="form-control" id="inputPassword4" minLength={12} maxLength={12} name="aadharNumber" onChange={handleAccountCreation} required/>
  </div>
  <div className="col-12">
    <label for="inputAddress" className="form-label">Address</label>
    <input type="text" className="form-control" id="inputAddress" name="address" onChange={handleAccountCreation} required/>
  </div>
  <div className="col-md-6">
    <label for="inputCity" className="form-label">City</label>
    <input type="text" className="form-control" id="inputCity" name="city" onChange={handleAccountCreation} required/>
  </div>
  <div className="col-md-4">
    <label for="inputState" className="form-label">State</label>
    <select id="inputState" className="form-select" name="state" onChange={handleState} required>
    <option value="">Select a state</option>
      {
        state.map((state, index) => (
            <option value={state} key={index}>{state}</option>
        ))
      }
    </select>
  </div>
  <div className="col-md-2">
    <label for="inputZip" className="form-label">Zip</label>
    <input type="text" className="form-control" id="inputZip" minLength={6} maxLength={6} name="zip" onChange={handleAccountCreation} required/>
  </div>
  {
    err &&
    (
        <div className="alert alert-danger mt-4" role="alert">
            {res.data.message ? res.data.message : "An error occurred"}
        </div>
    )
  }
  <div className="col-12">
    <button type="submit" className="btn btn-primary m-1">Create Account</button>
    {
      err &&
      (
        <Link to="/enter"><button type="submit" className="btn btn-warning m-2">Enter Account</button></Link>
      )
    }
  </div>
</form>
    )
}

export default CreateAccount