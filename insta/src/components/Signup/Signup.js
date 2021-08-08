import React from 'react'
import {useState,useEffect} from 'react'
import M from 'materialize-css'
import {useHistory} from "react-router-dom"

const Signup = () => {
    const history = useHistory()
    const [name,setName] = useState('')
    const [password,setPassword] = useState('')
    const [email,setEmail] = useState('')
    const [image,setImage] = useState('')
    const [url,setUrl] = useState(undefined)
    const [loading,setLoading] = useState(false)


    useEffect(() => {
        if(url){
            postFields()
        }
      
    }, [url])

    const uploadImage = async () => {
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
        setUrl(res2.url)
        console.log(res2.url);

        // serverRequest()
            
        } catch (error) {
            console.log("here");
            console.log(error);
        }
        
        
    }
    

    const postFields = async () => {

        try {
            setLoading(true)
            const data = await fetch("http://localhost:7088/signup",{
                method: 'POST',
                headers: {
                    "Content-type":"application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    pic:url
                })
            })
            setLoading(false)
            const res2 = await data.json()

           if (res2.error){
            M.toast({html: res2.error, classes: 'rounded alert-toast'});
           } else{
            M.toast({html:res2.message, classes: 'rounded success-toast'});
            history.push("/login")
           }

            setName('')
            setEmail('')
            setPassword('')
            
        } catch (error) {
            console.log(error)
        }

       

    }

    const postData = async () =>{
        if(image){
            uploadImage()
        }else{
            postFields()
        }
    }

    return (
        <>
        {loading==true &&
        <div class="progress" style={{background:'pink'}}>
            <div class="indeterminate" ></div>
        </div>
        }  
        <div class="myCard">
            <div className="bg-gradient-to-r from-gray-200 to-gray-500 container max-w-xl mx-auto border-black rounded-xl">
                <div className="text-4xl text-center" >
                     <span className="text-purple-700 text-opacity-100 font-extrabold"> Signup </span>
                </div>
                    {/* name  */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-xl font-bold mb-1" for="username">
                            Username
                        </label>
                        <input 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                        />
                    </div>
                    {/* email  */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-xl font-bold mb-1" for="username">
                            Email
                        </label>
                        <input 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                        />
                    </div>
                    {/* Password */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-xl font-bold mb-1" for="username">
                            Password
                        </label>
                        <input 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                    </div>
                    
                    {/* File Input     */}

                    <div className="mb-4">
                        <label
                        className="w-32 mx-auto flex flex-col items-center px-2 py-2 bg-blue-700 rounded-md shadow-md tracking-wide uppercase border border-blue cursor-pointer hover:bg-purple-600 hover:text-white text-purple-600 ease-linear transition-all duration-150">
                            <i className="fas fa-cloud-upload-alt fa-3x"></i>
                            <span className="mt-2 text-white leading-normal">Profile Photo</span>
                            <input 
                            type='file' 
                            className="hidden"
                            onChange={(e)=> setImage(e.target.files[0])}
                            />
                        </label>
                        
                    </div>
                    {/* signup button  */}
                    <div className="text-center">
                        <button className="p-4 bg-pink-300 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 rounded-lg"
                        onClick={postData}>    
                            Sign Up
                        </button>
                    </div>
                    
                    <div className="text-center my-2 mb-2 text-black-600 font-semibold"> Already have an account? <a className="hover:underline" href='/login'>Login</a></div>
            </div>
        </div>
        </>
                
    )
}

export default Signup
