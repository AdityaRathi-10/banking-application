import { Link } from "react-router-dom"
import axios from 'axios'
import { useState, useEffect } from "react"
import MeraBank from "./MeraBank"

function Navbar() {

  const [email, setEmail] = useState("")

  useEffect(() => {
    (async () => {
    const res = await axios.get("http://localhost:8000/user/get-email", {
        withCredentials: true 
    })
    setEmail(res.data)    
  })()
  }, [])

    return(
      <>
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <h1 class="navbar-brand text-primary">Mera Bank</h1>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            </ul>
            <form class="d-flex" role="search">
              {
                email ? (
                  <Link to="/login"><button class="btn btn-outline-danger m-1" type="submit">Login</button></Link>
                ) : (
                  <>
                    <Link to="/signup"><button class="btn btn-outline-primary m-1" type="submit">Signup</button></Link>
                    <Link to="/login"><button class="btn btn-outline-danger m-1" type="submit">Login</button></Link>
                  </>
                )
              }
            </form>
          </div>
        </div>
      </nav>
      <div className="m-3">
        <MeraBank />
      </div>
    </>
  )
}

export default Navbar