import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Feed from '../components/Feed'
import { Col, Container, Row } from 'reactstrap'
import Category from '../components/Category'
import { loadPostCategoryWise } from '../services/post-service'
import { toast } from 'react-toastify'
import Post from '../components/Post'
import PostCard from '../components/PostCard'
//import Post from '../components/Post'


const Categories = () => {

    const [post,setPost] = useState([])

    const {categoryId} = useParams()
    useEffect(()=>{
        console.log(categoryId)

        loadPostCategoryWise(categoryId).then(data=>{
            setPost([...data])
        }).catch (error=>{
            console.log(error)
            toast.error("error in loading post")
        })
    },[categoryId])

  return (
    <Container className='mt-3 ' >
        <Row>
          <Col md={2} className='mt-3'>
          <Category/>
          </Col>

          <Col md={10} >
                {
                    post && post.map((post,index)=>{
                        return(
                            <PostCard key={index} post={post}/>
                        )
                    })
                }
          </Col>
        </Row>
      </Container>
  )
}

export default Categories
