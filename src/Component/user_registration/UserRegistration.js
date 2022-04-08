import React from 'react'
import { Form, Row, Col, Button, Container } from 'react-bootstrap'

function UserRegistration() {

    return (
        <div  style={{ marginTop: "4pc" }}>
            <Container>
                
                <Form>
                <Row>
                    <Form.Group as={Col} controlId="formGridName">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter your name" />
                    </Form.Group>
                    </Row>
                    <br></br>
                    <Row>
                    <Form.Group as={Col} controlId="formGridDOB">
                        <Form.Label>Date of Birth</Form.Label>
                        <Form.Control type="date" placeholder="MM/dd/yyyy" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formSIN">
                        <Form.Label>SIN Number</Form.Label>
                        <Form.Control type="number" placeholder="SIN number" />
                    </Form.Group>
                    </Row>
                    <br></br>
                <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPhoneNo">
                        <Form.Label>Contact Number</Form.Label>
                        <Form.Control type="number" placeholder="Enter number" />
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="formGridAddress1">
                    <Form.Label>Address</Form.Label>
                    <Form.Control placeholder="1234 Main St" />
                </Form.Group>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>City</Form.Label>
                        <Form.Select defaultValue="Choose...">
                            <option>Choose...</option>
                            <option>Toronto</option>
                            <option>Montreal</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>State</Form.Label>
                        <Form.Select defaultValue="Choose...">
                            <option>Choose...</option>
                            <option>Ontario</option>
                            <option>Quebec</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>Zip</Form.Label>
                        <Form.Control />
                    </Form.Group>
                </Row>

               
                <br></br>
                <hr>
               </hr>
                <br></br>
                <Row>
                    <Col xs={12} md={6}>
                    <Form.Group as={Col} controlId="formEmployer">
                    <Form.Label>Please select your employer</Form.Label>
                        <Form.Select defaultValue="Choose...">
                            <option>Choose...</option>
                            <option>KPMG</option>
                            <option>PWC</option>
                        </Form.Select>
                    </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                    <Form.Group as={Col} controlId="formRole">
                    <Form.Label>Role</Form.Label>
                        <Form.Select defaultValue="Choose...">
                            <option>Choose...</option>
                            <option>Project Manager</option>
                            <option>Software Developer</option>
                        </Form.Select>
                    </Form.Group>
                    </Col>
                </Row>
                <br></br>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            <br></br>
            </Container>
        </div>
    )
}

export default UserRegistration;



