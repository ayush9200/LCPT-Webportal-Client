import React, {useState,useEffect} from 'react'
import { Form, Row, Col, Button, Container, FormText } from 'react-bootstrap'
import axios from 'axios';
import { useParams } from "react-router-dom";


const intialState = {
    fullName:'',
    password:'',
    confirmPassword:'',
    dob:'',
    email:'',
    number:'',
    address:'',
    city:'',
    state:'',
    postalCode:''

}


function UserProfile() {
    const BASE_URL_USER = "http://localhost:5000/user/getUser/";
    const BASE_URL_USER_UPDATE = "http://localhost:5000/user/update/";
    const BASE_URL_USER_FRONT_END = "http://localhost:3000/user/";
    const [newUser, setNewUser] = useState(intialState)
    const params = useParams().id;

    useEffect(() => {
        const getUserData = BASE_URL_USER + params
        axios.get(getUserData)
            .then(res => {
                console.log(res.data.data);
                if(res.data !== undefined){
                    setNewUser(res.data.data)
                }else{
                    setNewUser(intialState)
                }
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    const handleOnChange = e => {
        const{name, value} = e.target
            setNewUser({...newUser, [name]: value});
    };
    

    const handleOnSubmit = async e =>{
        try{
            const json = JSON.stringify(newUser);
            const res = await axios.post(BASE_URL_USER_UPDATE+params, json, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const resJson = res.data.data;
              if(resJson!==undefined){
                return window.location.href = BASE_URL_USER_FRONT_END+resJson.userId;
              }else{
                return alert("Something went wrong! Please try again.");
              }
            }catch (error) {
                console.log(error);
            }
    }

    return (
        <div>
            <Container>
                <Row>
                    <Form onSubmit={handleOnSubmit}>
                            <Form.Group as={Col} controlId="formGridName">
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control type="text" name="fullName" onChange={handleOnChange} value={newUser.fullName} placeholder="Enter your name" />
                            </Form.Group>
                            <br></br>
                            <Form.Group as={Col} controlId="formGridDOB">
                                <Form.Label>Date of Birth</Form.Label>
                                <Form.Control type="date" name="dob" onChange={handleOnChange} value={newUser.dob} placeholder="MM/dd/yyyy" />
                            </Form.Group>
                            <br></br>
                        <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" name="email" onChange={handleOnChange} value={newUser.email} placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPhoneNo">
                                <Form.Label>Contact Number</Form.Label>
                                <Form.Control type="number" name="number" onChange={handleOnChange} value={newUser.number} placeholder="Enter number" />
                            </Form.Group>
                        </Row>

                        <Form.Group className="mb-3" controlId="formGridAddress1">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" name="address" onChange={handleOnChange} value={newUser.address} placeholder="1234 Main St.." />
                        </Form.Group>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label>City</Form.Label>
                                <Form.Select name="city" value={newUser.city} onChange={handleOnChange} defaultValue=" -- Please Select -- ">
                                    <option>Choose...</option>
                                    <option>Toronto</option>
                                    <option>Montreal</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>State</Form.Label>
                                <Form.Select name="state" value={newUser.state} onChange={handleOnChange} defaultValue="-- Please Select -- ">
                                    <option>Choose...</option>
                                    <option>Ontario</option>
                                    <option>Quebec</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label>Postal Code</Form.Label>
                                <Form.Control type="text" value={newUser.postalCode} onChange={handleOnChange} name="postalCode" placeholder="Postal code" />
                            </Form.Group>
                        </Row>
                       <br></br>
                        <Button variant="primary" type="submit">
                            Update
                        </Button>
                        
                    </Form>
            </Row>
            <br></br>
            <br></br>
            </Container>
        </div>
    )
}

export default UserProfile;



