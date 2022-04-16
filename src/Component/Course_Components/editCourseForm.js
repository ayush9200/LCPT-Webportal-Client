import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Form, Row, Col, Button, Container } from 'react-bootstrap'

function EditCourseForm() {
    const [allCourses, setAllCourses] = useState([]);
    const [selectedCourseIndx, setSelectedCourseIndx] = useState(0);

    useEffect(() => {
        axios.get("http://localhost:5000/course/view-all-courses")
            .then(res => {
                console.log(res.data);
                setAllCourses(res.data);


            })
            .catch(err => {
                console.log(err);
            })





        // if (allCourses.length > 0) {
        //     console.log("----------------")
        //     document.getElementById("formGridTitle").value = allCourses[0].title;
        //     document.getElementById("formGridDescription").value = allCourses[0].description;
        //     document.getElementById("formGridTrainingDuration").value = allCourses[0].training_duration;
        //     document.getElementById("formGridValidityDuration").value = allCourses[0].validity_duration;


        // }

    }, [])

    var courseEditSelectChanged = (e) => {
        var selectedCourse = e.target.value;
        for (let i = 0; i < allCourses.length; i++) {
            console.log(allCourses[i].courseID)
            console.log(selectedCourse)
            console.log(allCourses[i].courseID == selectedCourse)
            if (allCourses[i].courseID == selectedCourse) {
                setSelectedCourseIndx(i)
            }
        }
    }

    var editCourseSubmitted = function (e) {
        e.preventDefault();
        var formGridCourseSelect = document.getElementById("formGridCourseSelect");
        var titleText = document.getElementById("formGridTitle");
        var descText = document.getElementById("formGridDescription");
        var trDurText = document.getElementById("formGridTrainingDuration");
        var vlDurText = document.getElementById("formGridValidityDuration");
        if (formGridCourseSelect.value == "" || titleText.value == "" || descText.value == "" || trDurText.value == "" || vlDurText.value == "") {
            var emptyFieldMsg = document.getElementById("emptyFieldMsg");
            emptyFieldMsg.style.display = "block";

        } else {
            var courseFormDetails = {
                "title": titleText.value,
                "description": descText.value,
                "training_duration": trDurText.value,
                "validity_duration": vlDurText.value
            }
            var crsId = formGridCourseSelect.value;

            // axios.post("http://localhost:5000/course/create-course", { courseFormDetails, crsId })
            //     .then(res => {
            //         console.log(res.data);

            //         var successMesage = document.getElementById("successMesage");
            //         successMesage.style.display = "block";
            //     })
            //     .catch(err => {
            //         console.log(err);
            //     })

        }

    }


    return (
        <div>
            <h3 id='emptyFieldMsg' style={{ "textAlign": 'center', "color": "red", "display": "none" }}>Field is Empty</h3>
            <h3 id='successMesage' style={{ "textAlign": 'center', "color": "green", "display": "none" }}>Your entry was saved</h3>
            <Container>
                <Form>
                    <Row>
                        <Form.Group as={Col} controlId="formGridCourseSelect">
                            <Form.Label>Select Course</Form.Label>
                            <Form.Select onChange={courseEditSelectChanged}>
                                {allCourses.map((o) => {
                                    const { title, courseID } = o;
                                    return (<option value={courseID}>{title} ({courseID})</option>);
                                })}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control placeholder="Enter Title" value={(allCourses.length > 0) ? allCourses[selectedCourseIndx].title : ""} />

                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} controlId="formGridDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control placeholder="Enter Description" value={(allCourses.length > 0) ? allCourses[selectedCourseIndx].description : ""} />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} controlId="formGridTrainingDuration">
                            <Form.Label>Traning Duration</Form.Label>
                            <Form.Control placeholder="Enter Total Training in Days" value={(allCourses.length > 0) ? allCourses[selectedCourseIndx].training_duration : ""} />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridValidityDuration">
                            <Form.Label>ValidityDuration</Form.Label>
                            <Form.Control placeholder="Enter Total Validity in Days" value={(allCourses.length > 0) ? allCourses[selectedCourseIndx].validity_duration : ""} />
                        </Form.Group>

                    </Row>



                    <Button variant="primary" type="submit" onSubmit={editCourseSubmitted} >
                        Submit
                    </Button>
                </Form>

                <br></br>
            </Container>
        </div>
    )
}

export default EditCourseForm