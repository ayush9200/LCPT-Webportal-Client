import React, { useState } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import axios from 'axios';

function CreateCourseForm() {
    // const [courseFormDetails, setCourseFormDetails] = useState({});
    var mainDivStyling = {
        width: "80vw",
        margin: "auto"
    }

    var submitCourseForm = function (e) {
        e.preventDefault();
        var crsIdText = document.getElementById("formGridCourseId");
        var titleText = document.getElementById("formGridTitle");
        var descText = document.getElementById("formGridDescription");
        var trDurText = document.getElementById("formGridTrainingDuration");
        var vlDurText = document.getElementById("formGridValidityDuration");
        if (crsIdText.value == "" || titleText.value == "" || descText.value == "" || trDurText.value == "" || vlDurText.value == "") {
            var emptyFieldMsg = document.getElementById("emptyFieldMsg");
            emptyFieldMsg.style.display = "block";

        } else {
            var courseFormDetails = {
                "courseID": crsIdText.value,
                "title": titleText.value,
                "description": descText.value,
                "training_duration": trDurText.value,
                "validity_duration": vlDurText.value
            }

            axios.post("http://localhost:5000/course/create-course", { courseFormDetails })
                .then(res => {
                    console.log(res.data);

                    var successMesage = document.getElementById("successMesage");
                    successMesage.style.display = "block";
                })
                .catch(err => {
                    console.log(err);
                })

        }

    }
    return (
        <div style={mainDivStyling}>
            <h3 id='emptyFieldMsg' style={{ "textAlign": 'center', "color": "red", "display": "none" }}>Field is Empty</h3>
            <h3 id='successMesage' style={{ "textAlign": 'center', "color": "green", "display": "none" }}>Your entry was saved</h3>
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



                <Button variant="primary" type="submit" onClick={submitCourseForm}>
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default CreateCourseForm