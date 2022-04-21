import React, {useState,useEffect} from 'react';
import { Form, Row, Col, Button, Container, FormText } from 'react-bootstrap';
import axios from 'axios';


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

const passVerificationError ={
    isLengthy: false,
    hasUpper: false,
    hasLower: false,
    hasNumber: false,
    hasSpecChar: false,
    confirmPassword : false
}

const data = {
        countries: [
            {
            name: "Germany",
            states: [
                {
                name: "A",
                cities: ["Duesseldorf", "Leinfelden-Echterdingen", "Eschborn"]
                }
            ]
            },
            { name: "Spain", states: [{ name: "B", cities: ["Barcelona"] }] },

            { name: "USA", states: [{ name: "C", cities: ["Downers Grove"] }] },
            {
            name: "Mexico",
            states: [{ name: ["D", "F", "H"], cities: ["Puebla"] }]
            },
            {
            name: "India",
            states: [
                { name: "E", cities: ["Delhi", "Kolkata", "Mumbai", "Bangalore"] }
            ]
            }
        ]
};

function UserRegistration() {
    const BASE_URL_USER_SAVE = "http://localhost:5000/user/save/";
    const BASE_URL_USER = "http://localhost:5000/user/getUser/";
    const BASE_URL_USER_FRONT_END = "http://localhost:3000/user/";
    const [newUser, setNewUser] = useState(intialState)
    const [passwordError, setPasswordError] = useState(passVerificationError);
    const [selectedCountry, setSelectedCountry] = React.useState();
    const [selectedState, setSelectedState] = React.useState(); 
    const [selectedCity, setSelectedCity] = React.useState();

    const availableState = data.countries.find((c) => c.name === selectedCountry);
    const availableCities = availableState?.states?.find(
        (s) => s.name === selectedState
    );

    useEffect(() => {
        const getUserData = BASE_URL_USER 
        axios.get(getUserData)
            .then(res => {
                console.log(res.data.data);
                if(res.data !== undefined){
                    setNewUser(res.data.data)
                   // setNewUser({...newUser, isLengthy, hasLower, hasUpper, hasNumber, hasSpecChar});
                }else{
                    setNewUser(intialState)
                }
            })
            .catch(err => {
                console.log(err);
            })
    }, [newUser]);

    const handleOnChange = e => {
        const{name, value} = e.target
            setNewUser({...newUser, [name]: value});

            if(name === 'country'){
                setSelectedCountry(value);
            }

            if(name === 'city'){
                setSelectedCity(value);
            }

            if(name === 'state'){
                setSelectedState(value);
            }
            if(name === 'confirmPassword'){
                setPasswordError({...passwordError, confirmPassword : newUser.password === value});
            }
            if(name === "password"){
                const isLengthy = value.length > 8;
                const hasUpper = /[A-Z]/.test(value);
                const hasLower = /[a-z]/.test(value);
                const hasNumber = /[0-9]/.test(value);
                const hasSpecChar = /[@,#,$,%,&,*]/.test(value);

                setPasswordError({...passwordError, isLengthy, hasLower, hasUpper, hasNumber, hasSpecChar});
            }
    };
    

    const handleOnSubmit = async e => {
        try{
            const json = JSON.stringify(newUser);
            const res = await axios.post(BASE_URL_USER_SAVE, json, {
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
               //userRegistration
            }
        /*axios.post(BASE_URL_USER_SAVE,{newUser})
        .then(res => {
            console.log(res);
            alert(res.data.data);
        })
        .catch(err => {
            console.log(err);
        })*/
        
    }
    return (
        <div style={{marginTop:"6pc",marginBottom:"2pc"}}>
           <Container >
                <Row>
               <h3 className='text-center' style={{color:"#0f6fc5"}}>Please fill out details</h3>
                <Form onSubmit={handleOnSubmit}>
                    <Form.Group controlId="formGridName">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control type="text" name="fullName" onChange={handleOnChange} value={newUser.fullName} placeholder="Enter your name" />
                    </Form.Group>
                    <br></br>
                    <Row>
                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Passowrd</Form.Label>
                            <Form.Control type="password" name="password" onChange={handleOnChange} value={newUser.password} placeholder="Enter your password" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridConfirmPassword">
                            <Form.Label>Confirm Passowrd</Form.Label>
                            <Form.Control type="password" name="confirmPassword" onChange={handleOnChange} value={newUser.confirmPassword} placeholder="Confirm your password" />
                        </Form.Group>
                    </Row>
                    <FormText>
                        {!passwordError.confirmPassword && (
                            <div className='text-danger mb-3'> Password doesn't match! </div>
                        )}
                    </FormText>

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
                        <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Country</Form.Label>
                                <Form.Select name="country" value={newUser.state} onChange={handleOnChange} defaultValue="-- Please Select -- ">
                                    <option>Choose Country...</option>
                                    {data.countries.map((e, key) => {
                                        return (
                                            <option value={e.name} key={key}>
                                            {e.name}
                                          </option>
                                        );
                                    })}
                                </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>State</Form.Label>
                                <Form.Select name="state" value={newUser.state} onChange={handleOnChange} defaultValue="-- Please Select -- ">
                                <option>--Choose State--</option>
                                {availableState?.states.map((e, key) => {
                                    return (
                                    <option value={e.name} key={key}>
                                        {e.name}
                                    </option>
                                    );
                                })}
                        </Form.Select>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label>City</Form.Label>
                                <Form.Select name="city" value={newUser.city} onChange={handleOnChange} defaultValue=" -- Please Select -- ">
                                <option>--Choose City--</option>
                                {availableCities?.cities.map((e, key) => {
                                    return (
                                    <option value={e.name} key={key}>
                                        {e}
                                    </option>
                                    );
                                })}
                                </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridZip">
                            <Form.Label>Postal Code</Form.Label>
                            <Form.Control type="text" value={newUser.postalCode} onChange={handleOnChange} name="postalCode" placeholder="Postal code" />
                        </Form.Group>
                     <Row>
                    <ul className='mb-4'>
                        <li className={passwordError.isLengthy ? "text-success" : "text-danger"}>Min 8 characters </li>
                        <li className={passwordError.hasLower ? "text-success" : "text-danger"}>At least one lower case </li>
                        <li className={passwordError.hasUpper ? "text-success" : "text-danger"}>At least one upper case </li>
                        <li className={passwordError.hasNumber ? "text-success" : "text-danger"}>At least one number </li>
                        <li className={passwordError.hasSpecChar ? "text-success" : "text-danger"}>At least one special character </li>
                    </ul>
                    </Row>
                    </Row>
                        <Button variant="primary" type="submit" disabled={Object.values(passwordError).includes(false)}>
                            Submit
                        </Button>
                
                </Form>
            </Row>
            <br></br>
            <Row>
                <Col>
                Already have an account  <a href="/login">Login Now</a>
                </Col>
            </Row>
            <br></br>
            </Container>
        </div>
    )
}

export default UserRegistration;



