import React from 'react'
import { Form, Row, Col, Button, Table, Container } from 'react-bootstrap'



function UserEmployment() {

   
     function openCourseDetailedView(Code){
        //alert("Hello");
    }

    return (
        <div>
                <Container>
            <Row>
            <Col xs={6} md={4}>
            <h2 style={{ textAlign: "left" }}>Employer Details</h2>
                <Form style={{minHeight: '15pc'}}>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridHome">
                            <Form.Label>Home</Form.Label>
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
                    <br></br>
                    <Row>
                        <Form.Group as={Col} controlId="formGridCheckbox">
                            <Form.Check type="checkbox" label="Share with employer" />
                        </Form.Group>
                    </Row>
                    <br></br>
                    <Row>
                        <Button variant="primary" type="submit">Proceed</Button>
                    </Row>
                </Form>
            </Col>
            <Col xs={12} md={8}>
            <h2>Enrolled Courses</h2>
            <Table striped bordered hover style={{minHeight: '25pc', maxHeight: '35pc'}}>
                <thead>
                    <tr>
                    <th>Code</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>External Document</th>
                    <th>Shared with Employer</th>
                    <th>Status</th>
                    <th>View</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td>@mdo</td>
                    <td>@mdo</td>
                    <td><Button variant="primary" type="submit">View Details</Button></td>
                    </tr>
                    <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                    <td>@mdo</td>
                    <td>@mdo</td>
                    <td><Button variant="primary" type="submit">View Details</Button></td>
                    </tr>
                    <tr>
                    <td>3</td>
                    <td>Larry the Bird</td>
                    <td>@twitter</td>
                    <td>@mdo</td>
                    <td>@mdo</td>
                    <td>@mdo</td>
                    <td><Button variant="primary" type="submit">View Details</Button></td>
                    </tr>
                    <tr>
                    <td>4</td>
                    <td>Larry the Bird</td>
                    <td>@twitter</td>
                    <td>@mdo</td>
                    <td>@mdo</td>
                    <td>@mdo</td>
                    <td><Button variant="primary" onClick={openCourseDetailedView(1)} type="submit">View Details</Button></td>
                    </tr>
                </tbody>
            </Table>
            </Col>
            </Row>
            <br></br>
            <br></br>
            <hr></hr>
            <br></br>
            <br></br>
            <Row>
                <h2>Pending Courses</h2>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>Code</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>External Document</th>
                        <th>Shared with Employer</th>
                        <th>Status</th>
                        <th>View</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                        <td><Button variant="primary" type="submit">View Details</Button></td>
                        </tr>
                        <tr>
                        <td>2</td>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                        <td><Button variant="primary" type="submit">View Details</Button></td>
                        </tr>
                        <tr>
                        <td>3</td>
                        <td>Larry the Bird</td>
                        <td>@twitter</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                        <td><Button variant="primary" type="submit">View Details</Button></td>
                        </tr>
                        <tr>
                        <td>4</td>
                        <td>Larry the Bird</td>
                        <td>@twitter</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                        <td><Button variant="primary" type="submit">View Details</Button></td>
                        </tr>
                    </tbody>
                </Table>
            </Row>
            <Row>
                <Col xs={12} style={{alignContent: 'center'}}>
                    <div>
                        <br></br>
                        <br></br>
                    <h4>Print all courses with details</h4> <Button variant="primary" type="submit">Print</Button>
                    </div>
                    <br></br>
                </Col>
            </Row>
            </Container>
        </div>
    )
}

export default UserEmployment;



