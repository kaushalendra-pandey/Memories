import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from '../../App'
import {useParams} from 'react-router-dom'
import './UserProfile.css'


const UserProfile = () => {
    const [userProfile,setProfile] = useState(null)
    const {state,dispatch} = useContext(UserContext)
    const {userId} = useParams()
    const [showfollow,setShowFollow] = useState(true)
    console.log(userId);

    useEffect(() => {
        setShowFollow(state && !state.following.includes(userId))
    }, [state])
  
    const fetchPost = async () => {
   
    
        try {

            const res = await fetch(`http://localhost:7088/profile/${userId}`,{
                headers: {
                    "Authorization":"Bearer "+localStorage.getItem("jwt")
                }
            })
            const res2 = await res.json()
            console.log(res2);
            setProfile(res2)
            
        } catch (error) {
            console.log(error);

        }
       
       

    }

    const followUser = ()=>{
        fetch('http://localhost:7088/follow',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                followId:userId
            })
        }).then(res=>res.json())
        .then(data=>{
            dispatch({type:"UPDATE",payload:{following:data.result.following,followers:data.result.followers}})
             localStorage.setItem("user",JSON.stringify(data.result))
             setProfile((prevState)=>{
                 return {
                     ...prevState,
                     user:{
                         ...prevState.user,
                         followers:[...prevState.user.followers,data._id]
                        }
                 }
             })
             setShowFollow(false)
        })
    }

    const unfollowUser = ()=>{
        fetch('http://localhost:7088/unfollow',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                unfollowId:userId
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data);
            dispatch({type:"UPDATE",payload:{following:data.result.following,followers:data.result.followers}})
             localStorage.setItem("user",JSON.stringify(data.result))
            
             setProfile((prevState)=>{
                const newFollower = prevState.user.followers.filter(item=>item != data._id )
                 return {
                     ...prevState,
                     user:{
                         ...prevState.user,
                         followers:newFollower
                        }
                 }
             })
             setShowFollow(true)
             
        })
    }

    useEffect(() => {
        fetchPost()
    }, [])
    return (

        <>
        {userProfile ? <div className="main" style={{maxWidth:"550px",margin:"0px auto"}} >
            
            <div className="sec" style={{
                display: 'flex',
                justifyContent:'space-around',
                margin:'18px 0px',
                borderBottom:'1px solid grey'
            }}>
                <div>
                    <img style={{width:"160px",height:"160px",borderRadius:"80px"}}
                    src={userProfile.user.pic}/>
                </div>
                <div>
                    <h4> {userProfile.user.name} </h4>
                    <h5> {userProfile.user.email} </h5>

                    <p> This is for bio</p>

                    <div className="user-deatils"
                    style={{display: 'flex',
                        justifyContent:'space-between',
                        width:'108%',
                        }}>
                        <h6> {userProfile.post.length} posts </h6>
                        <h6> {userProfile.user.followers.length} followers </h6>
                        <h6> {userProfile.user.following.length} following </h6>
                    </div>

                    {showfollow?
                   <button style={{
                       margin:"10px"
                   }} className="btn waves-effect waves-light #64b5f6 blue darken-1"
                    onClick={()=>followUser()}
                    >
                        Follow
                    </button>
                    : 
                    <button
                    style={{
                        margin:"10px"
                    }}
                    className="btn waves-effect waves-light #64b5f6 blue darken-1"
                    onClick={()=>unfollowUser()}
                    >
                        UnFollow
                    </button>
                    }

                </div>
            </div>
            
            <div className="gallery">
               {
                   userProfile.post.map(item=>{
                       return(
                           <img className="item" src={item.photo} alt={item.tite}/>
                       )
                   })
               }
                
            </div>

        </div> : <h2 className="brand-logo"> Loading.. </h2> 
    
    }
        
        </>
    )
}

export default UserProfile
