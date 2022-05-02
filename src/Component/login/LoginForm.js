import React, { useState, useEffect } from "react";
import {
	Container,
	Row,
	Col,
	Form,
	Button,
} from "react-bootstrap";
import axios from 'axios';
import "./login.css";



function LoginForm(){

    const BASE_URL_USER = "https://lcpt-webportal-backend.herokuapp.com/user/";
    const BASE_URL_USER_FRONT_END = "http://localhost:3000/user/";
    const [username, setUsername] = useState('amail@gmail.com');
	const [password, setPassword] = useState('abcD@1234');
    //const [data, setData] = useState('');
    //const [moveToForm, setMoveToForm] = useState(false);

    //useEffect(() => {}, email, password);
	const handleOnChange = e => {
		const { name, value } = e.target;

		switch (name) {
			case "username":
				setUsername(value);
				break;

			case "password":
				setPassword(value);
				break;

			default:
				break;
		}
	};

	const handleOnSubmit = async e => {
		e.preventDefault();
		if (!username || !password) {
			return alert("Fill up all the form!");
		}
        try {
            const json = JSON.stringify({ email: username, password: password });
            const res = await axios.post(BASE_URL_USER+'validateUser', json, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            //console.log(res);
            //console.log(res.data.data);
            const resJson = res.data.data;
              if(resJson!==undefined){
                  //alert(resJson.userId);
                return window.location.href = BASE_URL_USER_FRONT_END+resJson.userId;
              }else{
                return alert("Invalid Credentials. Please try again.");
              }

        }catch (error) {
            console.log(error);
           //userRegistration
        }
	};
    return(
        <html>
            <body className="login-body">
        <Container className="Login" style={{marginTop:"10pc",marginBottom:"8pc"}}>
        <Row>
            <Col>
                <h1 className="text-center">LCPT Login</h1>
                <hr />
                <Form autoComplete="off" onSubmit={handleOnSubmit}>
                    <Form.Group>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            value={username}
                            onChange={handleOnChange}
                            placeholder="Enter username"
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            onChange={handleOnChange}
                            value={password}
                            placeholder="password"
                            required
                        />
                    </Form.Group>
                    <br></br>
                    <Button type="submit">Login</Button>
                </Form>
                <hr />
            </Col>
        </Row>

        <Row>
            <Col>
                <a href="/password-reset">Forget Password?</a>
            </Col>
        </Row>
        <Row className="py-4">
            <Col>
                Are you new here? <a href="/userRegistration">Register Now</a>
            </Col>
        </Row>
    </Container>
    
    </body>
    </html>
    )
}

export default LoginForm;
