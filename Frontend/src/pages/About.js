import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import './AboutPage.css'; 

const About = () => {
  return (
    
    <div className="about-page">
    <Container>
      <Row>
        <Col className="text-center">
          <h1 className="about-title" >About StudentBridge</h1>
          <div className="about-content">
            <p>
              Welcome to StudentBridge, where connections shape futures! Our platform is dedicated to bridging the gap between students and alumni, creating a vibrant community of learners, mentors, and industry experts.
            </p>
            <p>
              At StudentBridge, we believe in the power of mentorship and knowledge sharing. Our mission is to empower students by providing them with access to real-world insights, career guidance, and networking opportunities. Whether you're a recent graduate seeking advice or a seasoned professional looking to give back, StudentBridge is your platform to make meaningful connections and shape the future of education.
            </p>
            <p>
              While our frontend is continuously evolving to offer the best user experience, our primary focus has always been our robust backend, powered by Java Spring Boot. We're dedicated to providing a seamless, secure, and interactive environment for our users.
            </p>
            <p>
              Join us on this exciting journey as we transform education into success. Let's connect, learn, and grow together!
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  </div>
    
  )
}

export default About
