import React from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'

function CreateUserForm() {

    var mainDivStyling = {
        width: "80vw",
        margin: "auto"
    }


    return (
        <div style={mainDivStyling}>
            <Form>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridUserId">
                        <Form.Label>User ID</Form.Label>
                        <Form.Control placeholder="Enter User ID" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridDOB">
                        <Form.Label>Date of Birth</Form.Label>
                        <Form.Control type="date" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control placeholder="Enter Name" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridOrganization">
                        <Form.Label>Organization</Form.Label>
                        <Form.Select defaultValue="Choose...">
                            <option>Choose...</option>
                            <option>...</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridRole">
                        <Form.Label>Role</Form.Label>
                        <Form.Select defaultValue="Choose...">
                            <option>Choose...</option>
                            <option>...</option>
                        </Form.Select>
                    </Form.Group>

                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridAddress1">
                        <Form.Label>Address</Form.Label>
                        <Form.Control placeholder="1234 Main St" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="formGridAddress2">
                    <Form.Label>Badge URL</Form.Label>
                    <Form.Control placeholder="https://yourURL.ca" />
                </Form.Group>



                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default CreateUserForm



