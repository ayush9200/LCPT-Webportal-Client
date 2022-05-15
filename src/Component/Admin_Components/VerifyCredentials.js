import React from 'react'
import { Form, Row, Col, Button, Container } from 'react-bootstrap'

function VerifyCredentials(props) {
    console.log(props)
    var userCrsRowData = props.userCrsRowData;
    var editUsrCrsForm = (e) => {

    }

    return (
        <div>
            <Container>
                <Form>
                    <Row>
                        {/* <Form.Group as={Col} controlId="formGridCourseSelectEdit">
                            <Form.Label>Mongo DB Object ID: {userCrsRowData.mongoID}</Form.Label>

                        </Form.Group> */}
                        <Form.Group as={Col} controlId="userCrsUserID">
                            <Form.Label>User ID: {userCrsRowData.userId}</Form.Label>

                        </Form.Group>
                        <Form.Group as={Col} controlId="userCrsCourseID">
                            <Form.Label>Course ID: {userCrsRowData.courseId}</Form.Label>

                        </Form.Group>
                    </Row>
                    <Row style={{ margin: '0 auto', textAlign: 'center', borderTop: '.1em solid', borderBottom: '.1em solid' }}>

                        <Form.Group controlId="userCrsURL">
                            <Form.Label>Badge URL: {userCrsRowData.url}</Form.Label>

                        </Form.Group>
                    </Row>

                    <Row>
                        <Form.Group as={Col} controlId="userCrsValDate">
                            <Form.Label>Validity Date</Form.Label>
                            <Form.Control defaultValue={userCrsRowData.validityDate} type='date' />
                        </Form.Group>
                        <Form.Group as={Col} controlId="userCrsIsURLValid">
                            <Form.Label>Is URL Valid?</Form.Label>

                            <Form.Check
                                type="switch"
                            // id="custom-switch"
                            />
                        </Form.Group>

                    </Row>



                    <Button variant="primary" type="submit" onClick={editUsrCrsForm}>
                        Submit
                    </Button>
                </Form>

                <br></br>
            </Container>
        </div>
    )
}

export default VerifyCredentials