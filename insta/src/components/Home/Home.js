import React,{useState,useEffect,useContext} from 'react'
import {UserContext} from '../../App'
import {useHistory,Link} from 'react-router-dom'
import {likePost, likePostController} from './controllers/likePostController'
import './Home.css'


const Home = () => {
    const history = useHistory()
    if(localStorage.getItem("jwt") === null){
        history.push('/login')
    }

    const [data,setData] = useState([])
    const {state,dispatch} = useContext(UserContext)


    const fetchData = async () =>{
        const res = await fetch('http://localhost:7088/getPosts')
        const res2 = await res.json()
        console.log(res2);
        setData(res2.posts)
    }

    const likePost = async (id) =>{

        try {

            const res = await fetch('http://localhost:7088/like',{
                method: 'PUT',
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+localStorage.getItem("jwt")
                },
                body:JSON.stringify({
                    postId:id
                })
            })
            const res2 = await res.json()
            const newData = data.map(item=>{
                if(res2.result._id === item._id){
                    return res2.result;

                }else{
                    return item
                }
                
            })
            setData(newData)
        
            
        } catch (error) {
            console.log(error);
            
        }

       
    }

    // const likePost = (id) => {
    //     const newData = likePostController(id,data)
    //     setData(newData)
    // }

    const dislikePost = async (id) => {
        try {
            const res = await fetch("http://localhost:7088/dislike",{
                method:"put",
                headers: {
                    "Content-Type":'application/json',
                    "Authorization":"Bearer "+localStorage.getItem("jwt")
                },
                body:JSON.stringify({
                    postId:id
                })
            })
            const res2 = await res.json()
            console.log(res2.result);
            const newData = data.map(item =>{
                if(item._id==res2.result._id){
                    return res2.result;
                }else{
                    return item
                }
                
            })
            
            setData(newData)
            
        } catch (error) {
            
            console.log(error);
        }
    }

    const makeComment = async (text,postId) => {

        try {
            
            const post = await fetch('http://localhost:7088/comment',{
                method:'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization":"Bearer "+localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    postId,
                    text
                })
            })
            const res2 = await post.json()
            const newData = data.map(item=>{
                if(item._id==res2.result._id){
                    return res2.result
                }else{
                    return item
                }
             })
            setData(newData)
            


        } catch (error) {
            console.log(error);
        }

    }

    const tester = () => {
        console.log("clicked");
    }

    const deletePost = async (postid) => {
        try {
            const res = await fetch(`http://localhost:7088/deletepost/${postid}`,{
            method:"delete",
            headers:{
                Authorization:"Bearer "+localStorage.getItem("jwt")
            }
        })
        const res2 = await res.json()
        const newData = data.filter(item => {
            return item._id !== res2._id
        })
        setData(newData)
            
        } catch (error) {
            console.log(error);
        }
        
    }
  


    useEffect(() => {
        fetchData()
        
    }, [])
    
    return (
        <div className="home">

            {
                data.map(item=>{
                    console.log(item.postedBy._id);
                    return(

                        <div className="card home-card">
                           <h5 style={{textAlign:"left"}}><Link to={item.postedBy._id !== state._id?"/profile/"+item.postedBy._id :"/profile"  }>{item.postedBy.name}</Link></h5>

                            {item.postedBy._id == state._id 
                            && <a class="btn-floating btn-large waves-effect waves-light pink lighten-2"
                            onClick={()=>deletePost(item._id)}
                            style={{float:"right",marginBottom:"3px"}}  >
                          <i class="large material-icons">delete</i></a>
                           
                        }
                        
                           

                            <div className="card-image"> 
                                <img
                                style={{height:"400px"}} 
                                src={item.photo}/>
                            </div>
                            <div className="card-content">
                                <h4> {item.title} </h4>
                                <p> {item.body} </p>
                                

                                {item.likes.includes(state._id)
                            ? 
                             <i className="material-icons"
                                    onClick={()=>{dislikePost(item._id)}}
                              >thumb_down</i>
                            : 
                            <i className="material-icons"
                            onClick={()=>{likePost(item._id)}}
                            >thumb_up</i>
                            }

                            <div className="comment-section" style={{maxHeight:"60px",overflow:'scroll'}}>
                            {
                            item.comment.map(record=>{
                                 return(
                                    <h6 key={record._id}><span style={{fontWeight:"500"}}>{record.postedBy.name}</span> {record.text}</h6>
                                    )
                                })
                            }
                            </div>

                                <h6>{item.likes.length} likes</h6>
                                <form onSubmit={(e)=>{
                                    e.preventDefault()
                                    makeComment(e.target[0].value,item._id);
                                    e.target[0].value=''
                                }}>
                                <input type="text" placeholder="comment"></input>
                                </form>
                                
                            </div>
                        </div>

                    )
                })
            }

            
            
        </div>
    )
}

export default Home
