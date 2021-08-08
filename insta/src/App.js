import React,{createContext,useReducer} from 'react'
import './App.css'
import {BrowserRouter,Route,useHistory,Switch} from 'react-router-dom'
import Navbar from "./components/Navbar/Navbar"
import Signup from "./components/Signup/Signup"
import Login from "./components/Login/Login"
import Profile from "./components/Profile/Profile"
import Home from './components/Home/Home';
import CreatePost from './components/CreatePost/CreatePost';
import UserProfile from './components/UserProfile/UserProfile';
import LandinPage from './components/LandinPage/LandingPage'
import {useEffect,useContext} from 'react'
import {reducer,initialState} from './Reducer/userReducer'

export const UserContext = createContext()


const Routing = ()=>{
  const history = useHistory()
  const {state,dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
    }else{
      if(!history.location.pathname.startsWith('/reset'))
          //  history.push('/login')
          console.log("logged out");
    }
  },[])
  return(
    <Switch>
      <Route exact path="/" >
      <Home />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route exact path="/profile">
        <Profile />
      </Route>
      <Route path="/create">
        <CreatePost/>
      </Route>
      <Route path="/profile/:userId">
        <UserProfile/>
      </Route>
      
      
    </Switch>
  )
}


function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
      <Navbar />
      <Routing />
      
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
