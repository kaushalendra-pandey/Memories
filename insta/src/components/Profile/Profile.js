import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from '../../App'
import {useHistory} from 'react-router-dom'
// import './Profile.css'


const Profile = () => {

    const history = useHistory()
    if(localStorage.getItem("jwt") === null){
        history.push('/login')
    }

    const {state,dispatch} = useContext(UserContext)
    const [data,setData] = useState([])
    const [username,setUsername] = useState('')
    const [caption,setCaption] = useState('')
    const fetchPost = async () => {
        try {

            const res = await fetch('http://localhost:7088/myPosts',{
                headers: {
                    "Authorization":"Bearer "+localStorage.getItem("jwt")
                }
            })
            const res2 = await res.json()
            console.log(res2.posts[0]);
            setData(res2.posts)
            setUsername(res2.posts[0].postedBy.name)
            setCaption(res2.posts[0].body)
            // console.log(state);
            
            
        } catch (error) {
            console.log(error);
        }
       
       

    }



    useEffect(() => {
        fetchPost()
    }, [])
    return (

        <div className="main">
            
            <div className="sec">
                <div>
                    <img 
                    src={state?state.pic:"loading"}/>
                </div>
                <div>
                    <h4> {state?state.name:'loading'} </h4>
                    <h5>{state?state.email:'loading'}</h5>

                    <p> This is for bio</p>

                    <div className="user-details">
                        <h6> {data.length} posts </h6>
                        <h6> {state?state.followers.length:0} followers </h6>
                        <h6> {state?state.following.length:0} following </h6>
                    </div>
                </div>
            </div>
            
            <div className="gallery">
                {
                    data.length===0?<h1> No posts to show</h1>:
                        data.map(item=>{
                            return(
                                <img style={{height:"175px"}} className="item" src={item.photo} alt={item.tite}/>
                            )
                        })
                    
                }
               
                
            </div>

        </div>
    )
}

export default Profile
