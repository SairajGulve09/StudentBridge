import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormFeedback, FormGroup, Input, Label, Row } from 'reactstrap'
import { signUp } from '../services/user-service'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
const Signup = () => {

    const navigate = useNavigate()

    const [data,setData]=useState({
        name:'',
        email:'',
        password:'',
        about:''
    })

    const [error,setError] = useState({
        errors:{},
        isError:false
    })

    useEffect(()=>{
        // console.log(data);
    },[data])

    //handle change

    const handleChange=(event,property)=>{

        //dynamically setting the values
        setData({...data,[property]:event.target.value} )
    }

    //reset data
    const resetData=()=>{
        setData({
            name:'',
        email:'',
        password:'',
        about:''
        })
    }

    const submitForm=(event)=>{
        event.preventDefault()
       
        // if(error.isError)
        // {
        //     toast.error("Form deta is invalid")
        //     setError({...error,isError:false})
        //     return;
        // }


        //data validation
        console.log(data);
        //call server api for sending dat
        signUp(data).then((resp)=>{
            console.log(resp)
            console.log("success log");
            toast.success("User registerd successfully")
            setData({
                name:'',
                email:'',
                password:'',
                about:''
            });
        }).catch((error)=>{
            console.log(error)
            console.log("Error log")

            if (error.response && error.response.status === 401) {
                toast.error("User already exists");
                navigate("/login")
                toast.error("Please login");
              }

            //handle errors
            setError({
                errors:error,
                isError:true
            })
        })
    }

  return (
    <div >
      <Container style={{ marginTop: '2rem', width: '80%', maxWidth: '500px' }}>
        <Row className="justify-content-center">
            <Col md="12">
            
            <Card color="dark" outline style={{ width: '100%', minHeight: '500px' }}>
            <CardHeader className='text-center'><h2>REGISTER</h2></CardHeader>
            <CardBody>
                <Form onSubmit={submitForm}>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input type='text' placeholder='Enter name' id='name' onChange={(e)=>handleChange(e,'name')} value={data.name}
                        invalid={error.errors?.response?.data?.name ? true : false}/>

                        <FormFeedback>
                            { error.errors?.response?.data?.name }
                        </FormFeedback>
                    </FormGroup>

                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type='email' placeholder='Enter email' id='email' onChange={(e)=>handleChange(e,'email')} value={data.email}
                        invalid={error.errors?.response?.data?.email ? true : false}/>

                        <FormFeedback>
                            { error.errors?.response?.data?.email }
                        </FormFeedback>

                    </FormGroup>

                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input type='password' placeholder='Enter strong password' id='password' onChange={(e)=>handleChange(e,'password')} value={data.password}
                        invalid={error.errors?.response?.data?.password ? true : false}/>

                        <FormFeedback>
                            { error.errors?.response?.data?.password }
                        </FormFeedback>

                    </FormGroup>

                    <FormGroup>
                        <Label for="about">About</Label>
                        <Input type='textarea' placeholder='Enter about' id='about' style={{height:"250px"}} onChange={(e)=>handleChange(e,'about')} value={data.about}
                        invalid={error.errors?.response?.data?.about ? true : false}/>

                        <FormFeedback>
                            { error.errors?.response?.data?.about }
                        </FormFeedback>

                    </FormGroup>

                    <Container className='text-center'>
                        <Button color='warning'>Register</Button>
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

export default Signup
