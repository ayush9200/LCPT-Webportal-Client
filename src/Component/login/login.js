import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Axios from 'axios';


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    setEmail(email.value);
    setPassword(password.value);
    /** 
   / useEffect (()=> {
      Axios.get("http://localhost:3001/validateUser").then((response) => {
        //code pending
    })  
    }, []);
    **/
  }

  return (
    <div className="Login">
      
       <div class="container"  style={{marginTop:"5pc"}}>
      <div class="row">
        <div class="col-md">
              <Form onSubmit={handleSubmit}>
              <Form.Group size="lg" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control autoFocus type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
              </Form.Group>

              <Form.Group size="lg" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
              </Form.Group>

              <Button size="lg" type="submit" disabled={!validateForm()}>Login</Button>
            </Form>
        </div>
      </div>
    </div>
    </div>
  );

}