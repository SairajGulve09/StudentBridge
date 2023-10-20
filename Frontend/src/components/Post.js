import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, Container, Form, Input, Label } from 'reactstrap'
import { loadAllCategories } from '../services/category-service'
// import JoditEditor from 'jodit-react';
 import {  createPost as doCreatePost, uploadPostImage } from '../services/post-service'
import { getCurrUser } from '../Auth/Auth'
import { toast } from 'react-toastify'

const Post = () => {

  // const editor = useRef(null);
	// const [content, setContent] = useState('');

  const [post,setPost] = useState({
    title:'',
    postContent:'',
    categoryId:''
  })

  const [categories,setCategories] = useState([])
  const [user,setUser] = useState(undefined)

  const [image,setImage] = useState(null)

  useEffect(
    ()=>{
      setUser(getCurrUser())
      loadAllCategories().then((data)=>{
        // console.log(data)
        setCategories(data)
      }).catch(error=>{
        console.error()
      })
    },[]
  )

  //feild changed
  const feildChanged=(event,property)=>{
    const getValue = event.target.value
    //  console.log(event.target.value)
    setPost({...post,[property]:getValue})
  }

  //submit function
  const createPost =(event)=>{
    event.preventDefault()
    // console.log(post)
    if(post.title.trim()==='')
    {
      alert("Add title to your post")
      return
    }
    if(post.postContent.trim()==='')
    {
      alert("Please fill the content")
      return
    }
    if(post.categoryId==='')
    {
      alert("select category")
      return
    }

    //submit form
    post['userId'] = user.id

    console.log(user.id)
    doCreatePost(post).then(data=>{

      uploadPostImage(image,data.postId).then(data=>{
        toast.success("Image uploaded")
      }).catch(error=>{
        toast.error("Error in uploading image")
        console.log("hello")
        console.log(error)
      })

      toast.success("Post Created ")
      console.log(post)
      
    }).catch((error)=>{
      alert("error1")
      console.log(error)
    })


  }


//handling file change

const handleFileChange=(event)=>{
  console.log(event.target.files[0])
  setImage(event.target.files[0])
}


  return (
    <div >
      <Card className='shadow mt-5' style={{ width: '70%', margin: '0 auto', padding: '20px', height: 'auto' }}>
        <CardBody>
            <h3 className='text-center'><b>Create Post</b></h3>
            <Form onSubmit={createPost}>
                <div className='my-3'>
                    <Label for="title">Title</Label>
                    <Input type='text'id='title' className='rounded-0' onChange={(e)=>feildChanged(e,'title')} name='title'/>
                </div>

                <div className='my-3'>
                    <Label for="postContent">Content</Label>
                    <Input type='textarea'id='postContent' className='rounded-0' style={{height:'15rem'}} name='postContent' onChange={(e)=>feildChanged(e,'postContent')}/>
                    {/* <JoditEditor
                      ref={editor}
                      value={content}
                      // config={config}
                      tabIndex={1} // tabIndex of textarea
                      onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                      onChange={newContent => {}}
                    /> */}
                 </div>

                 <div className="mt-3">
                  <label for="image">Add Media</label>
                  <Input id='image' type='file' onChange={handleFileChange}/>
                 </div>

                <div className='my-3'>
                    <Label for="categoryId">Current Feild</Label>
                    <Input type='select'id='categoryId' className='rounded-0' placeholder='Choose your feild' name='categoryId' onChange={(e)=>feildChanged(e,'categoryId')} defaultValue={0}>
                      <option disabled value={0}>--select feild--</option>
                      {
                          categories.map((category)=>(
                            <option value={category.categoryId} key={category.categoryId}>
                              {category.categoryName}
                            </option>
                          ))
                      }
                    </Input>
                </div>

                <Container className='text-center'>
                  <Button color='warning' type='submit' >Post</Button>
                </Container>

            </Form>
        </CardBody>
      </Card>
    </div>
  )
}

export default Post
