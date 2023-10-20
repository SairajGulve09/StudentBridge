import React from 'react'
import Feed from '../components/Feed'
import { Col, Container, Row } from 'reactstrap'
import Category from '../components/Category'

const Home = () => {

 

  return (
    <div>
       
      

      <Container className='mt-3 ' >
        <Row>
          <Col md={2} className='mt-3'>
          <Category/>
          </Col>

          <Col md={10} >
          <Feed/>
          </Col>
        </Row>
      </Container>
      
    </div>
  )
}

export default Home
