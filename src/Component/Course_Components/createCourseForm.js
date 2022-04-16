import React from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'

function CreateCourseForm() {

    var mainDivStyling = {
        width: "80vw",
        margin: "auto"
    }
    return (
        <div style={mainDivStyling}>
            <Form>
                <Row>
                    <Form.Group as={Col} controlId="formGridCourseId">
                        <Form.Label>Course ID</Form.Label>
                        <Form.Control placeholder="Enter Course ID" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control placeholder="Enter Title" />
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} controlId="formGridDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control placeholder="Enter Description" />
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} controlId="formGridTrainingDuration">
                        <Form.Label>Traning Duration</Form.Label>
                        <Form.Control placeholder="Enter Total Training in Days" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridValidityDuration">
                        <Form.Label>ValidityDuration</Form.Label>
                        <Form.Control placeholder="Enter Total Validity in Days" />
                    </Form.Group>

                </Row>



                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div >
    )
}

export default CreateCourseForm