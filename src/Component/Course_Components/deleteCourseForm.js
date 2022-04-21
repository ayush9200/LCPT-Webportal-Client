import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Form, Row, Col, Button, Container } from 'react-bootstrap'

function DeleteCourseForm() {
    const [allCourses, setAllCourses] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/course/view-all-courses")
            .then(res => {
                console.log(res.data);
                setAllCourses(res.data);
                console.log("del cr")

            })
            .catch(err => {
                console.log(err);
            })
    }, [])


    return (
        <div>
            <Container>
                <Form>
                    <Row>
                        <Form.Group as={Col} controlId="formGridCourseSelect">
                            <Form.Label>Select Course</Form.Label>
                            <Form.Select  >
                                {allCourses.map((o) => {
                                    const { title, courseID } = o;
                                    return (<option value={courseID}>{title} ({courseID})</option>);
                                })}
                            </Form.Select>
                        </Form.Group>
                    </Row>
                    <Button variant="primary" type="submit" >
                        Submit
                    </Button>

                </Form>

                <br></br>
            </Container>
        </div>
    )
}

export default DeleteCourseForm