import React from 'react'
import { Form, Row, Col, Button, Container, Table } from 'react-bootstrap'

function UserAuditReport() {

    return (
        <div>
            <br></br>
            <Container style={{minHeight:'20pc'}}>
            <Row>
            <Col xs={12} md={6}>
            <Form>
                <Row className="mb-3">
                <Form.Group className="mb-3" id="formGridCheckbox">
                    <Form.Check type="checkbox" label="Verify and send all data to Employer" />
                    <Button variant="primary" type="submit">
                    Submit
                </Button>
                </Form.Group>
                </Row>
            </Form>
            </Col>
            <Col sm={6} md={6}>
                    <Form.Group as={Col} controlId="formGridHome">
                            <Form.Label>Please select format to download Audit Report</Form.Label>
                            <Form.Select defaultValue="Choose...">
                                <option>Choose...</option>
                                <option>Xlsx</option>
                                <option>Pdf</option>
                            </Form.Select>
                        </Form.Group>
            </Col>
            </Row>
            <br></br>
            <br></br>
            <Row>
                <h3 style={{textalign:'center'}}>User Report</h3>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Course Code</th>
                            <th>Title</th>
                            <th>Status</th>
                            <th>Description</th>
                            <th>Expiry Date</th>
                            <th>Badge URL</th>
                            <th>Shared with Employer</th>
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
                            <td>@mdo</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            </tr>
                            <tr>
                            <td>2</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            
                            </tr>
                            <tr>
                            <td>3</td>
                            <td>Larry the Bird</td>
                            <td>@twitter</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            
                            </tr>
                            <tr>
                            <td>4</td>
                            <td>Larry the Bird</td>
                            <td>@twitter</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            
                            </tr>
                        </tbody>
                    </Table>
                   
            </Row>
            </Container>
            <br>
                    </br>
                    <br></br>
                    <br>
                    </br>
                    <br></br>
                    <br>
                    </br>
                    <br></br>
                    <br>
                    </br>
                    <br></br>
        </div>
    )
}

export default UserAuditReport;



