import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Form, Row, Col, Button, Container } from 'react-bootstrap'
import Config from '../config.json'
function EditCourseForm() {
    const [allCourses, setAllCourses] = useState([]);
    const [selectedCourseIndx, setSelectedCourseIndx] = useState(0);

    useEffect(() => {
        console.log(Config)
        axios.get("https://lcpt-webportal-backend.herokuapp.com/course/view-all-courses")
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
        var formGridCourseSelect = document.getElementById("formGridCourseSelectEdit");
        var titleText = document.getElementById("formGridTitleEdit");
        var descText = document.getElementById("formGridDescriptionEdit");
        var trDurText = document.getElementById("formGridTrainingDurationEdit");
        var vlDurText = document.getElementById("formGridValidityDurationEdit");
        if (formGridCourseSelect.value == "" || titleText.value == "" || descText.value == "" || trDurText.value == "" || vlDurText.value == "") {
            var emptyFieldMsg = document.getElementById("emptyFieldMsgEdit");
            emptyFieldMsg.style.display = "block";

        } else {
            var courseFormDetails = {
                "title": titleText.value,
                "description": descText.value,
                "training_duration": trDurText.value,
                "validity_duration": vlDurText.value
            }
            var crsId = formGridCourseSelect.value;

            axios.put("https://lcpt-webportal-backend.herokuapp.com/course/update-course", { courseFormDetails, crsId })
                .then(res => {
                    console.log(res.data);

                    var successMesage = document.getElementById("successMesageEdit");
                    successMesage.style.display = "block";
                })
                .catch(err => {
                    console.log(err);
                })

        }

    }


    return (
        <div>
            <h3 id='emptyFieldMsgEdit' style={{ "textAlign": 'center', "color": "red", "display": "none" }}>Field is Empty</h3>
            <h3 id='successMesageEdit' style={{ "textAlign": 'center', "color": "green", "display": "none" }}>Your entry was saved</h3>
            <Container>
                <Form>
                    <Row>
                        <Form.Group as={Col} controlId="formGridCourseSelectEdit">
                            <Form.Label>Select Course</Form.Label>
                            <Form.Select onChange={courseEditSelectChanged}>
                                {allCourses.map((o) => {
                                    const { title, courseID } = o;
                                    return (<option value={courseID}>{title} ({courseID})</option>);
                                })}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridTitleEdit">
                            <Form.Label>Title</Form.Label>
                            <Form.Control placeholder="Enter Title" defaultValue={(allCourses.length > 0) ? allCourses[selectedCourseIndx].title : ""} />

                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} controlId="formGridDescriptionEdit">
                            <Form.Label>Description</Form.Label>
                            <Form.Control placeholder="Enter Description" defaultValue={(allCourses.length > 0) ? allCourses[selectedCourseIndx].description : ""} />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} controlId="formGridTrainingDurationEdit">
                            <Form.Label>Traning Duration</Form.Label>
                            <Form.Control placeholder="Enter Total Training in Days" defaultValue={(allCourses.length > 0) ? allCourses[selectedCourseIndx].training_duration : ""} />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridValidityDurationEdit">
                            <Form.Label>ValidityDuration</Form.Label>
                            <Form.Control placeholder="Enter Total Validity in Days" defaultValue={(allCourses.length > 0) ? allCourses[selectedCourseIndx].validity_duration : ""} />
                        </Form.Group>

                    </Row>



                    <Button variant="primary" type="submit" onClick={editCourseSubmitted}>
                        Submit
                    </Button>
                </Form>

                <br></br>
            </Container>
        </div>
    )
}

export default EditCourseForm