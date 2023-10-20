import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Card, CardText, CardBody, CardTitle, Col, Button } from 'reactstrap';
import { getCurrUser, isLoggedIn } from '../Auth/Auth';
 import userContext from '../context/userContext';
 import './PostCard.css'; 

const PostCard = ({isDashboard ,post={title:'This is default title', content:'This is default content'},deletePost  }) => {
   const userContextData=useContext(userContext)
  const [user,setUser] = useState(null)
  const [login,setLogin] = useState(null)
  useEffect(()=>{
    setUser(getCurrUser())
    setLogin(isLoggedIn())
  },[])

  return (
    <div className="post-card">
    <Col sm="12" md={{ size: 8, offset: 2 }} lg={{ size: 8, offset: 2 }}>
    <Card className='mt-3'>
      <CardBody>
        <CardTitle tag="h2">{post.title}</CardTitle>
        <CardText>{post.postContent.substring(0,30)}...</CardText>
        <div>
          <Link className='btn btn-warning' to={"/posts/"+ post.postId}>Read More</Link>
          {userContextData.user.login && isDashboard && (user && user.id===post.user.id ? <Button onClick={()=>deletePost(post)} className='ms-2'>Delete</Button> : '')
          }

          {userContextData.user.login && isDashboard && (user && user.id===post.user.id ? <Button tag={Link} to={`/user/update/${post.postId}`} className='ms-2'>Update</Button> : '')
          }
        </div>
      </CardBody>
    </Card>
    </Col>
    </div>
  )
}

export default PostCard
