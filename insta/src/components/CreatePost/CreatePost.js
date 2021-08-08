import React from 'react'
import {useState,useEffect} from 'react'
import M from 'materialize-css'
import {useHistory} from 'react-router-dom'
import './CreatePost.css'


const CreatePost = () => {


    const history = useHistory()
    if(localStorage.getItem("jwt") === null){
        history.push('/login')
    }
    const [body,setBody] = useState("")
    const [title,setTitle] = useState('')
    const [image,setImage] = useState('')
    const [picUrl,setPicUrl] = useState('')
    const [isLoading,setLoading] = useState(false)


    // Request for creating post to the server
    const serverRequest = async () => {

        try {

            console.log(localStorage.getItem("jwt"))
            setLoading(true)
            const res = await fetch("http://localhost:7088/createpost",{
              
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization":"Bearer "+localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    body,
                    title,
                    photo:picUrl
                    
                })
                
               
    
                
            })
            setLoading(false)
            const res2 = await res.json()
            if(!res2){

            }
            if(res2.error){
                M.toast({html: res2.error, classes: 'rounded alert-toast'});
            }else{
                M.toast({html: res2.message, classes: 'rounded success-toast'});
                history.push('/home')
            }

        } catch (error) {
            console.log("in");
            console.log(error);
        }
       
    }




    useEffect(() => {
        if(picUrl){
            serverRequest()
        }
        
    }, [picUrl])



    const postImage = async () => {
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset",'instagramClone')
        data.append("cloud_name","Maharaja Surajmal Institute of Technology")
        
        try {
            setLoading(true)
            const res = await fetch("https://api.cloudinary.com/v1_1/test-cloud-by-kaush/image/upload",{
            method: "POST",
            body:data
        })
        setLoading(false)
        const res2 = await res.json();
        setPicUrl(res2.url)
        console.log(res2.url);

        // serverRequest()
            
        } catch (error) {
            console.log("here");
            console.log(error);
        }
        
        
    }

    

    return (
        <>
        {isLoading==true &&
        <div class="progress" style={{background:'pink'}}>
            <div class="indeterminate" ></div>
        </div>
        }   
        
        <div className="card inupt-field">
            <input 
            type="text" 
            placeholder="title"
            value={title}
            onChange={(e)=>{setTitle(e.target.value)}}
            />
            <input type="text"
             placeholder="caption"
             value={body}
             onChange={(e)=>{setBody(e.target.value)}}
             />
            <div class="file-field input-field">
                <div className="btn pink lighten-2">
                    <span>File</span>
                    <input
                    type="file"
                    onChange={(e)=> setImage(e.target.files[0])}
                    />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text"/>
                </div>
            </div>
            <button class="btn waves-effect waves-light pink lighten-2" onClick={postImage}>
                    Post
            </button>
            

    </div>
    </>

            
    )
}

export default CreatePost
