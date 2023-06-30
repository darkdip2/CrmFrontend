import {useState} from 'react'
import { Dropdown, DropdownButton } from 'react-bootstrap'
import {userLogin, userSignUp} from '../api/auth'
import { useNavigate } from "react-router-dom";

function Login(){

    const [userId, setUserId] = useState("")
    const [password, setPassword] = useState("")
    const [userName, setUserName] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [userType, setUserType] = useState("CUSTOMER")
    const [showSignUp, setShowSignUp] = useState(false)
    const [message, setMessage] = useState("")
    const navigate = useNavigate();

    const loginFn = (e) => {
        e.preventDefault()
        const data = {
            userId: userId,
            password: password,
        }

        userLogin(data).then((response) => {
            localStorage.setItem("name", response.data.name);
            localStorage.setItem("userId", response.data.userId);
            localStorage.setItem("email", response.data.email);
            localStorage.setItem("userType", response.data.userType);
            localStorage.setItem("userStatus", response.data.userStatus);
            localStorage.setItem("token", response.data.accessToken);
            if (response.data.userType === "CUSTOMER"||response.data.userType==="ADMIN") navigate("/customer");
            else if (response.data.userType=== "ENGINEER") navigate("/engineer");
            else if (response.data.userType === "ADMIN") navigate("/admin");
            else navigate("/");
            if(response.status!=200)navigate("/error");
            console.log("Login data is " + JSON.stringify(response.data));
            console.log("Login is successful");
            setMessage("Login is successful");
        }).catch((error) => {
            console.log("Error occured during login " + JSON.stringify(error));
            setMessage(JSON.stringify(error.message));
            navigate("/error");
        })

        console.log("Login data is " + JSON.stringify(data));
    }

    const signUpFn = (e) => {
        e.preventDefault()
        const data = {
            userId: userId,
            password: password,
            name: userName,
            email: userEmail,
            userType: userType,
            userStatus: "APPROVED"
        }

        userSignUp(data).then((res) => {
            if(res.status!=200)navigate("/error");
            console.log("Sign up successful");
            setMessage("Signup is succesful");
        }).catch((error) => {
            console.log("Error occured during signup " +  JSON.stringify(error));
            setMessage(error.message);
            navigate("/error");
        })

        console.log("Signup data is " + JSON.stringify(data));
    }

    return (
        
        <div>
            <div className="bg-danger d-flex justify-content-center align-items-center vh-100">
                <div className="card card-signin m-5 p-5 shadow-lg rounded-4">
                    <div className="row m-2">
                        <div>
                            <h4 className="text-center">{showSignUp ? "Sign Up" : "Login"}</h4>
                            <form onSubmit={showSignUp ? signUpFn : loginFn}>
                                <div className="input-group m-1">
                                    <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="User Id"
                                    id="userId"
                                    value={userId}
                                    onChange={(e) => setUserId(e.target.value)}
                                    required
                                    autoFocus
                                    />
                                </div>
                                <div>
                                    <input
                                    type="password"
                                    className="form-control m-1"
                                    placeholder="Password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    />
                                </div>
                                {
                                    showSignUp && (
                                    <>
                                        <div className='input-group m-1'>
                                            <input
                                                type='text'
                                                className='form-control'
                                                placeholder='Email'
                                                id='email'
                                                value={userEmail}
                                                onChange={(e) => setUserEmail(e.target.value)} 
                                                required
                                                />
                                        </div>
                                        <div className='input-group m-1'>
                                            <input 
                                            type='text'
                                            className='form-control'
                                            placeholder='User Name'
                                            value={userName}
                                            onChange={(e) => setUserName(e.target.value)}
                                            required
                                            />
                                        </div>
                                        <div className='row input-group'>

                                            <div className='col py-2'>
                                                <span className='mx-1 my-1'>User Type</span>
                                            </div>

                                            <div className='col'>
                                            <DropdownButton align='end' title={userType} id='userType' onSelect={(e) => setUserType(e)} variant='light'>
                                                <Dropdown.Item eventKey="CUSTOMER">CUSTOMER</Dropdown.Item>
                                                <Dropdown.Item eventKey="ENGINEER">ENGINEER</Dropdown.Item>
                                            </DropdownButton>
                                        </div>
                                        </div>
                                    </>
                                    )
                                }
                                <div className='input-group m-1'>
                                    <input 
                                    type="submit"
                                    className="form-control btn btn-primary"
                                    value={showSignUp ? "Sign Up" : "Login"}     
                                    />
                                </div>
                                <div onClick={(e) => setShowSignUp(!showSignUp)}>
                                    {showSignUp? "Already have an account? Login": "Don't have an account? Signup"}
                                </div>
                                <div className='text-success text-center'>
                                    {message}
                                </div>
                            </form>
                        </div>
                    </div>  
                </div>
            </div>
        </div> 
    )
}

export default Login