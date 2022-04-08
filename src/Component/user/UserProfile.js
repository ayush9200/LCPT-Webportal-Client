import React from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'

function UserProfile() {

    var mainDivStyling = {
        width: "80vw",
        margin: "auto"
    }


    return (
        <div style={mainDivStyling}>
            <Form>
                    <Form.Group as={Col} controlId="formGridName">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter your name" />
                    </Form.Group>
                    <br></br>
                    <Form.Group as={Col} controlId="formGridDOB">
                        <Form.Label>Date of Birth</Form.Label>
                        <Form.Control type="date" placeholder="MM/dd/yyyy" />
                    </Form.Group>
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

                <Button variant="primary" type="submit">
                    Submit
                </Button>
                
            </Form>
            <br></br>
        </div>
    )
}

export default UserProfile;



