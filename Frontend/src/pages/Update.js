import React, { useContext, useEffect, useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import userContext from '../context/userContext'
import { loadPost, updatePostContent } from '../services/post-service'
import { toast } from 'react-toastify'
import { Button, Card, CardBody, Container, Form, Input, Label } from 'reactstrap'
import { loadAllCategories } from '../services/category-service'

const Update = () => {

    const [categories,setCategories] = useState([])
    const {postId} = useParams()
    const object = useContext(userContext)
    const navigate=useNavigate()
    const [post,setPost] = useState(null)

    useEffect(()=>{

        loadAllCategories().then((data)=>{
            // console.log(data)
            setCategories(data)
          }).catch(error=>{
            console.error()
          })

        //load post from database
        loadPost(postId).then(data=>{
            setPost({...data,categoryId:data.category.categoryId})
        }).catch(error=>{
            console.log(error)
            toast.error("error in loading the post")
        })
    },[])

    const handleChange=(event,feildName)=>{
        setPost({
            ...post,
            [feildName]:event.target.value
        })
    }

    const handleContentChange = (event) => {
        const newContent = event.target.value;
        setPost({ ...post, postContent: newContent });
      };
      

    const updatePostBySubmit=(event)=>{
        event.preventDefault()
        updatePostContent({...post,category: {categoryId: post.categoryId}},post.postId).then(response=>{
            toast.success("Post updated")
        }).catch(error=>{
            console.log(error)
            toast.error("Post not updated")
        })
    }

    const updatePost=()=>{
        return(
            <div>
            <Card className='shadow mt-5' style={{ width: '70%', margin: '0 auto', padding: '20px', height: 'auto' }}>
                <CardBody>
                    <h3>Update Post</h3>
                    <Form onSubmit={updatePostBySubmit}>
                        <div className='my-3'>
                            <Label for="title">Title</Label>
                            <Input type='text'id='title' className='rounded-0' onChange={(event)=>handleChange(event,'title')} name='title' value={post.title}/>
                        </div>

                        <div className='my-3'>
                            <Label for="postContent">Content</Label>
                            <Input type='textarea'id='postContent' value={post.postContent} className='rounded-0' style={{height:'15rem'}} name='postContent' onChange={handleContentChange}/>
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
                        <Input id='image' type='file' onChange={''}/>
                        </div>

                        <div className='my-3'>
                            <Label for="categoryId">Current Feild</Label>
                            <Input  type='select'id='categoryId' className='rounded-0' placeholder='Choose your feild' name='categoryId' value={post.categoryId} onChange={(event)=>handleChange(event,'categoryId')} defaultValue={0} >
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
                        <Button color='warning' type='submit' >Update</Button>
                        </Container>

                    </Form>
                </CardBody>
            </Card>
    </div>
        )
    }

  return (
    <Container>
        {post && updatePost()}
    </Container>
    
  )
}

export default Update
