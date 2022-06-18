import React from 'react'
import { Form, Row, Col, Button, Container } from 'react-bootstrap'

function VerifyCredentials(props) {
    console.log(props)
    var userCrsRowData = props.userCrsRowData;
    var validityDate = new Date(userCrsRowData.validityDate);

    var month = '' + (validityDate.getMonth() + 1);
    var day = '' + validityDate.getDate();
    var year = validityDate.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    validityDate = [year, month, day].join('-');

    console.log(userCrsRowData.status)
    var editUsrCrsForm = (e) => {

    }
    var handleInputChange = function (e) {
        this.setState({ value: e.target.value });
    }
    // userCrsRowData.validityDate
    return (
        <div id='crsValidEditForm'>
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

                    <Row >
                        <Form.Group as={Col} controlId="userCrsValDate">
                            <Form.Label>Validity Date</Form.Label>
                            <Form.Control type='date' onChange={handleInputChange}
                                defaultValue={validityDate || ''} />
                        </Form.Group>
                        <Form.Group as={Col} controlId="userCrsIsURLValid">
                            <Form.Label>Is URL Valid?</Form.Label>
                            <Form.Select aria-label="Default select example" onChange={handleInputChange}
                                defaultValue={userCrsRowData.status || ''} >
                                <option value='false'>NOT VALID</option>
                                <option value='true' >IS VALID</option>
                            </Form.Select>

                            {/* <Form.Check type="switch" onChange={(e) => {
                                console.log(e.target.value);
                            }} /> */}
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