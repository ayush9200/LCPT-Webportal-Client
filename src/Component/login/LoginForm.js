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
            console.log("Res")
              if(res!=='No User Found!'){
                  sessionStorage.setItem("userType",res.data.res[0].type);

                  if( res.data.res[0].home_id){
                    sessionStorage.setItem("homeId",res.data.res[0].home_id);
                    var homeArray = []
                    for(var i=0;i<res.data.res.length;i++){
                        homeArray.push((res.data.res[i].home_id))
                    }
                    sessionStorage.setItem("OtherHomeId",JSON.stringify(homeArray));
                  }
                  if(res.data.res[0].org_id){
                    sessionStorage.setItem("orgId",res.data.res[0].org_id);
                    var orgArray = []
                    for(var i=0;i<res.data.res.length;i++){
                        orgArray.push(res.data.res[i].org_id)
                    }
                    sessionStorage.setItem("OtherOrgId",JSON.stringify(orgArray));
                    const homeListUrl = BASE_API_URL+"orgnization/getHomesList/" + res.data.res[0].org_id
                    axios.get(homeListUrl)
                        .then(new_res => {
                            console.log("newRes",new_res)
                            if(new_res != 'Something went wrong!'||new_res != 'No Home Found!'){
                                var homeArray = []
                                for(var i=0;i<new_res.data.length;i++){
                                    homeArray.push((new_res.data[i].home_id))
                                }
                                sessionStorage.setItem("OtherHomeId",JSON.stringify(homeArray)); 
                                return window.location.href = BASE_URL_FRONTEND+"organisation/"+res.data.res[0].org_id;
                            }
                            else{
                                return window.location.href = BASE_URL_FRONTEND+"organisation/"+res.data.res[0].org_id;
                            }

                        })
                  }
                  if(res.data.res[0].type=== "user"){
                    return window.location.href = BASE_URL_FRONTEND+"user/validateUser";  
                  }
                //   else if(res.data.res[0].type === "organization"){
                //     return window.location.href = BASE_URL_FRONTEND+"organisation/"+res.data.res[0].org_id;

                //   }
                  else if(res.data.res[0].type === "home"){
                    return window.location.href = BASE_URL_FRONTEND+"home/"+res.data.res[0].home_id;

                  }
                  else if(res.data.res[0].type === "admin")
                  return window.location.href = BASE_URL_FRONTEND+"admin_home/";
               }
            else{
                return alert("Invalid Credentials. Please try again.");
              }

        }catch (error) {
            console.log(error);
            return alert("Invalid Credentials. Please try again.");

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
