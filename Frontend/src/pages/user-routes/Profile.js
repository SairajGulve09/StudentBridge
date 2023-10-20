import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getUserDetails } from '../../services/user-service'
import { Container, Row, Col, Image } from 'reactstrap';
import './Profile.css';
const Profile = () => {

  const [user,setUser] = useState(null)

  const {userId} =useParams()

  useEffect(()=>{
    getUserDetails(userId).then(data=>{
      console.log(data)
      setUser({...data})
    })
  },[])

  return (
    <Container className="profile-container">
      <Row className="justify-content-center">
        <Col xs={12} sm={6} md={4} className="profile-card">
        <h1 className="profile-title" >Profile</h1>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png" alt="Profile Avatar" className="profile-avatar img-fluid rounded-circle" />
          <h2 className="profile-name">{user && user.name}</h2>
          <p className="profile-mail">{user && user.email}</p>
          <p className="profile-location">India, IN</p>
          <hr className="profile-hr" color='warning' />
          <p className="profile-about">
          {user && user.about}
          </p>
        </Col>
      </Row>
    </Container>
  )
}

export default Profile
