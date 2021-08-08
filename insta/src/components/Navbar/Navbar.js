import React,{useContext} from 'react'
import {UserContext} from '../../App'
import {useHistory} from "react-router-dom"
import M from 'materialize-css'

const Navbar = () => {
    const history = useHistory()
    const {state,dispatch} = useContext(UserContext)
    const renderList = () => {
        if(state){
            return [
                <li><a href="/profile">Profile</a></li>,
                <li><a href="/create">New Post</a></li>,
                <button class="btn waves-effect waves-light red lighten-2" 
                onClick={() =>{
                    localStorage.clear()
                    dispatch({type:"CLEAR"})
                    M.toast({html:"You are succesfully logged out", classes: 'rounded success-toast'});
                    history.push('/login')
                }}>
                        Logout
                </button>
                
            ]
        }else{
            return [
                <li><a href="/signup">SignUp</a></li>,
                <li><a href="/login">Login</a></li>
            ]
        }
    }
    return (
        <div>
            <nav>
                <div class="nav-wrapper white" >
                <a href="/" class="brand-logo insta-font">Memories</a>
                <ul id="nav-mobile" class="right hide-on-med-and-down">
                    {renderList()}
                </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
