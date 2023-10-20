//isLoggedIn

export const isLoggedIn=()=>{
    let data = localStorage.getItem("data")
    if(data === null)
    {
        return false;
    }
    else
    {
        return true;
    }

};

//doLgin -> data=> set to local storage

export const doLogin=(data,next)=>{
    localStorage.setItem("data",JSON.stringify(data))
    next()
}

//logout => remove data from local storage

export const doLogout=(next)=>{
    localStorage.removeItem("data")
    next()
}

//current user

export const getCurrUser=()=>{
    if(isLoggedIn())
    {
        return JSON.parse(localStorage.getItem("data")).user;
    }
    else{
        return undefined;
    }
}

export const getToken=()=>{
    if(isLoggedIn()){
       // console.log(JSON.parse(localStorage.getItem("data")).token)
        return JSON.parse(localStorage.getItem("data")).token
    }
    else{
        //console.log("Local storage empty")
        return null
    }
}