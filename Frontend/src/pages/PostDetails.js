import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Row,Col, Container, Card, CardBody, CardText, Input, Button } from 'reactstrap'
import { createComment, loadPost } from '../services/post-service'
// import { loadPost } from '../services/post-service'
import { toast } from 'react-toastify'
import { BASE_URL } from '../services/helper'
import { isLoggedIn } from '../Auth/Auth'

const PostDetails = () => {

    const {postId} = useParams()
    const [post,setPost] = useState(null)
    const [comment,setComment] = useState({
        content:''
    })
    

    useEffect(()=>{
        loadPost(postId).then(data=>{
            console.log(data)
            setPost(data)
        }).catch((error)=>{
            toast.error("Error in displaing single post")
        })
    },[postId])

    const printElapsedTime = (uploadDate) => {
        const currentDate = new Date();
        const timeDifference = currentDate - new Date(uploadDate);
    
        // Convert time difference to seconds
        const secondsDifference = Math.floor(timeDifference / 1000);
    
        // Define time intervals for formatting
        const intervals = [
            { label: 'y', seconds: 31536000 },
            { label: 'm', seconds: 2592000 },
            { label: 'd', seconds: 86400 },
            { label: 'hr', seconds: 3600 },
            { label: 'min', seconds: 60 },
            { label: 'sec', seconds: 1 },
        ];
    
        // Find the appropriate interval
        for (let i = 0; i < intervals.length; i++) {
            const interval = intervals[i];
            const intervalInSeconds = interval.seconds;
    
            if (secondsDifference >= intervalInSeconds) {
                const count = Math.floor(secondsDifference / intervalInSeconds);
                return `${count}${interval.label}.`;
            }
        }
    
        return 'Just now';
    };
    
    //comment
  const submitPost=()=>{

    if(!isLoggedIn())
    {
        toast.error("User not login...")
    }

    if(comment.content.trim()==='')
    {
        return
    }

    createComment(comment,post.postId)
    .then(data=>{
      console.log(data)
      toast.success("comment added")
      setPost({
        ...post,
        comments:[...post.comments,data.data]
      })
    }).catch(error=>{
      console.log(error)
    })
  }
    

  return (
    <Container className='mt-4'>
        {/* <Link to="/">Home</Link>  */}

        <Row>
            <Col md={{
                size:12
            }}>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '90vh' }}>
            
                <Card style={{ maxWidth: '600px', width: '90%', padding: '20px' }}>
                    {
                        (post) && (
                            <CardBody>
                                <CardText style={{ marginBottom: '5px'}}> Posted By <b>{post.user.name}</b>  <b>{printElapsedTime(post.addedDate)}</b> </CardText>
                                {/* <CardText cl>  <b>{printElapsedTime(post.addedDate)}</b> </CardText> */}
                                <CardText style={{ marginBottom: '5px' }}>
                                    <span className='text-muted'>{post.category.categoryName}</span>
                                </CardText>
                                <div className="mt-2"> {/* Use a div container here */}
                                <h3>{post.title}</h3>
                                <hr /> {/* Divider after Title */}
                                </div>

                                    <CardText>
                                        <div className="image-container mt-4 shadow" >
                                            <img className='img-fluid' src={BASE_URL+'/api/post/image/' + post.imageName} alt='' style={{ maxWidth: '100%', maxHeight: '400px', width: '100%' , objectFit: 'contain' }}/>
                                        </div>
                                        <CardText className='mt-3' style={{ marginBottom: '5px' }}>
                                            {post.postContent}
                                        </CardText>
                                    </CardText>
                                </CardBody>
                        )
                    }
                </Card>
                </div>
                
            </Col>
        </Row>

        <Row>
            <Col md={
                {size:12,
                }
            }>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h3>Comments ({post ? post.comments.length : 0})</h3>

                    {
                        post && post.comments.map((c,index)=>(
                            <Card className='mt-2 border-0' style={{ maxWidth: '600px', width: '90%' }} key={index}>
                                <CardBody>
                                    <CardText>
                                        {c.content}
                                    </CardText>
                                </CardBody>
                            </Card>
                        ))
                    }

                            <Card className='mt-2 border-0' style={{ maxWidth: '600px', width: '90%' }} >
                                <CardBody>
                                    <Input value={comment.content} type='textarea' placeholder='comment here...' onChange={(event)=>setComment({content: event.target.value})}></Input>
                                    <Button onClick={submitPost} className='mt-2' color='warning'>Comment</Button>


                                    
                                </CardBody>
                            </Card>
                            </div>
            </Col>
        </Row>


    </Container>
  )
}

export default PostDetails

    

