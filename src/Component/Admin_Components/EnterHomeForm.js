import React from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'

function EnterHomeForm() {
    var mainDivStyling = {
        width: "80vw",
        margin: "auto"
    }

    return (
        <div style={mainDivStyling}>
            <Form>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Home Number</Form.Label>
                        <Form.Control type="name" placeholder="Enter Home Number" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Admin Password</Form.Label>
                        <Form.Control type="password" placeholder="*****" />
                    </Form.Group>
                </Row>


                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form></div>
    )
}

export default EnterHomeForm