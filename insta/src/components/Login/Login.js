import React from 'react'
import {useState,useContext} from 'react'
import M from 'materialize-css'
import {useHistory} from 'react-router-dom'
import {UserContext} from '../../App'

const Login = () => {
    const {state,dispatch} = useContext(UserContext)
    const history = useHistory()
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [loading,setLoading] = useState(false)

    const login = async () => {

        try {
            setLoading(true)
            const data = await fetch("http://localhost:7088/signin",{
                method: 'POST',
                headers:{
                    "Content-Type": 'application/json',
                    
                },
                body: JSON.stringify({
                    email,
                    password
                })
                
            })
            setLoading(false)
            const res2 = await data.json();
            console.log(res2);
            if (res2.message){
                
                localStorage.setItem("jwt",res2.token)
                localStorage.setItem("user",JSON.stringify(res2.user))
                dispatch({type:"USER",payload:res2.user})

                M.toast({html: res2.message, classes: 'rounded success-toast'});
                history.push('/')
            }else{
                M.toast({html: res2.error, classes: 'rounded alert-toast'});
            }

            
        } catch (error) {
            console.log(error)
        }

       


    }

    return (
        <>
        {loading==true &&
        <div class="progress" style={{background:'pink'}}>
            <div class="indeterminate" ></div>
        </div>
        }  
        <div className="myCard">
            <div className="card auth-card input-field">
                <h2 className="insta-font"> Memories </h2>
                <input
                    type="text"
                    placeholder="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />
                <button class="btn waves-effect waves-light pink lighten-2" onClick={login}>
                    Login
                </button>
                <h6> Dont have an account? <a href='/signup'>Signup</a></h6>
            </div>
        </div>
        </>
    )
}

export default Login
