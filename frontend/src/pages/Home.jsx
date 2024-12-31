import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"

function Home() {

    const [accNum, setAccNum] = useState("")
    
    useEffect(() => {
        (async () => {
        const res = await axios.get("http://localhost:8000/user/get-account", {
            withCredentials: true 
        })
        setAccNum(res.data.accountNumber)    
      })()
    }, [])

    return (
        <div className="m-3">
            <h1 className="mb-3 p-2">Welcome to Mera Bank</h1>
            {
                accNum ? (
                        <Link to="/enter"><button type="button" className="btn btn-info m-1">Enter Account</button></Link>
                  ) : (
                    <>
                        <Link to="/create"><button type="button" className="btn btn-warning m-1">Create Account</button></Link>
                        <Link to="/enter"><button type="button" className="btn btn-info m-1">Enter Account</button></Link>
                    </>
                )
            }
            
        </div>
    )
}

export default Home