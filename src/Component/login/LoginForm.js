import React, { useState } from "react";
import {
	Container,
	Row,
	Col,
	Form,
	Button,
} from "react-bootstrap";
import axios from 'axios';
import "./login.css";
//import { setData } from '../Redux/DataSlice';
//import { useDispatch } from 'react-redux';
import { BASE_API_URL } from '../Url-config';
import { BASE_URL_FRONTEND } from '../Url-config';

function LoginForm(){

    const BASE_URL_USER = "https://lcpt-webportal-backend.herokuapp.com/user/";
    //const BASE_URL_USER_FRONT_END = "http://localhost:3000/user/";
    const BASE_URL_USER_FRONT_END = "https://lcpt-webportal.herokuapp.com/user/";
    const [username, setUsername] = useState('org1');
	const [password, setPassword] = useState('12345');
    //const [data, setData] = useState('');
    //const [moveToForm, setMoveToForm] = useState(false);

    //useEffect(() => {}, email, password);
	const handleOnChange = e => {
      //  console.log(e)
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
        console.log(e)
		e.preventDefault();
		if (!username || !password) {
			return alert("Fill up all the form!");
		}
        try {//BASE_URL_USER
            const json = JSON.stringify({ login_id: username, password: password });

            const res = await axios.post(BASE_API_URL+'login/', json, {
            headers: {
                    'Content-Type': 'application/json'
                }
            });
            //console.log(res);
            console.log(res);
            //const resJson = res.data.data;
              if(res!=='No User Found!'){
                  sessionStorage.setItem("userType",res.data.type);
                  if(res.data.home_id){
                    sessionStorage.setItem("homeId",res.data.home_id);
                  }
                  if(res.data.org_id){
                    sessionStorage.setItem("orgId",res.data.org_id);
                  }
                  if(res.data.type=== "user"){
                    return window.location.href = BASE_URL_FRONTEND+"user/"+res.data.user_id;  
                  }
                  else if(res.data.type === "organization")
                  return window.location.href = BASE_URL_FRONTEND+"organisation/"+res.data.org_id;
                  else if(res.data.type === "home")
                  return window.location.href = BASE_URL_FRONTEND+"home/"+res.data.home_id;
                  else if(res.data.type === "admin")
                  return window.location.href = BASE_URL_FRONTEND+"admin_home/";
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
        <Container className="Login" style={{marginTop:"4pc",marginBottom:"3pc"}}>
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
