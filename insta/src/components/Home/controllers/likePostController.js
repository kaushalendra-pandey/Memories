export const likePostController = async (id,data) =>{
    console.log(data);
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
        console.log(newData);
        return newData
    
        
    } catch (error) {
        console.log(error);
        
    }

   
}

