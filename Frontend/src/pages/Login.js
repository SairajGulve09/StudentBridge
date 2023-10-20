import React, {  useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import {  loginUser } from '../services/user-service'
import { doLogin } from '../Auth/Auth'
import { useNavigate } from 'react-router-dom'
 import userContext from '../context/userContext'

const Login = () => {

   const userContextData=useContext(userContext)

  const navigate = useNavigate();

const [loginDetails,setLoginDetails] = useState({
  email:'',
  password:''
});

const handleChange=(event,property)=>{
  const actualValue=event.target.value
  setLoginDetails({
    ...loginDetails,
    [property]:actualValue
  })
}

const handleFormSubmit=(event)=>{
  event.preventDefault();
  console.log(loginDetails);

  //validation
  if(loginDetails.email.trim()==='' || loginDetails.password.trim()==='')
  {
    toast.error("Enter the email or password")
    return;
  }


  //submit data to server
  
  console.log("Request data:", loginDetails);
  loginUser(loginDetails).then((data) => {
    console.log("Response data:", data);

    //save data to local storage
    doLogin(data,()=>{
      console.log("login details are saved to local storage")

      userContextData.setUser(
        {
          data: data.user,
        login:true
      }
      )

      navigate("/user/dashboard")
    })

    toast.success("Login Successful");
  })
  .catch((error) => {
    console.log("Error",error);
    if (error.response && error.response.status === 404) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Something went wrong");
    }
  });
  


}


const resetData=()=>{
  setLoginDetails({
      email:'',
    password:''
  })
}

  return (
    <div>
      <Container style={{ marginTop: '2rem', width: '80%', maxWidth: '500px' }}>
        <Row className="justify-content-center">
            <Col md="12">
            
            <Card color="dark" outline>
            <CardHeader className='text-center'><h2>Login</h2></CardHeader>
            <CardBody>
                <Form onSubmit={handleFormSubmit}>
                    <FormGroup>
                        <Label for="name">Email</Label>
                        <Input type='email' placeholder='Enter email' id='email' 
                         value={loginDetails.email}
                         onChange={(e)=> handleChange(e,'email')}/>

                    </FormGroup>

                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input type='password' placeholder='Enter password' id='password'
                        value={loginDetails.password}
                        onChange={(e)=> handleChange(e,'password')}/>

                    </FormGroup>


                    <Container className='text-center'>
                        <Button color='warning'>Login</Button>
                        <Button className='ms-2' type='reset' onClick={resetData}>Reset</Button>
                    </Container>
                </Form>
            </CardBody>
        </Card>


            </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Login
