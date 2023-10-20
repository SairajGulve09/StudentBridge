import { privateAxios } from "./helper";
import { myAxios } from "./helper";

export const createPost = (postData)=>{
    // console.log(postData)
    return privateAxios.post(`/api/user/${postData.userId}/category/${postData.categoryId}/posts`,postData).then((response)=> response.data)
}

//get all posts
export const getAllPosts = (pageNumber,pageSize) =>{
    return myAxios.get(`/api/posts?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=addedDate&sortDir=desc`).then(response=>response.data)
}

//load single post
export const loadPost=(postId)=>{
    return myAxios.get("/api/posts/" + postId).then((response) => response.data)
}

//create comment
export const createComment=(comment,postId)=>{
    return privateAxios.post(`/api/post/${postId}/comments`,comment)
}

//upload image
export const uploadPostImage=(image,postId)=>{
    let formData = new FormData()
    formData.append("image",image)

    return privateAxios.post(`/api/post/image/upload/${postId}`,formData).then((response)=>response.data)
}


//get category wise post
export const loadPostCategoryWise=(categoryId)=>{

    return privateAxios.get(`/api/category/${categoryId}/posts`).then(response=>response.data)
}

//load post user wise
export const loadPostUserWise=(userId)=>{
    return privateAxios.get(`/api/user/${userId}/posts`).then(response=>response.data)
}

//delete post
export const deletePostService=(postId)=>{
    return privateAxios.delete(`/api/posts/${postId}`).then(response=>response.data)
}

//update post
export const updatePostContent=(post,postId)=>{
    return privateAxios.put(`/api/posts/${postId}`,post).then(response=>response.data)
}