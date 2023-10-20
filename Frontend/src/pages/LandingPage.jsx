import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'reactstrap';
import { useSpring, animated } from 'react-spring';
import './LandingPage.css';

const LandingPage = () => {
  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1000 },
  });

  return (
    <animated.div className="landing-page" style={fadeIn}>
      <Container>
        <Row>
          <Col md={{ size: 6, offset: 3 }}>
            <h1>Welcome to <span className='title'>StudentBridge</span></h1>
            <p style={{color:"white"}}>Empowering students to bridge the gap between knowledge and success.</p>
            <Link to="/signup">
              <Button color="primary" style={{ marginRight: '10px' }}>
                Sign Up
              </Button>
            </Link>
            <Link to="/login">
              <Button color="secondary">Log In</Button>
            </Link>
          </Col>
        </Row>
        <Row className="features mt-5">
          <Col md={4}>
            <h2>Find Tutors</h2>
            <p>Connect with experienced tutors in various subjects and boost your learning.</p>
          </Col>
          <Col md={4}>
            <h2>Collaborate</h2>
            <p>Collaborate with classmates, share study materials, and work together on projects.</p>
          </Col>
          <Col md={4}>
            <h2>Explore Resources</h2>
            <p>Access a vast library of educational resources, articles, and interactive quizzes.</p>
          </Col>
        </Row>
      </Container>
    </animated.div>
  );
};

export default LandingPage;
