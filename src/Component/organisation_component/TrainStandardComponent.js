
import './organisation.css';
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form';
import { BASE_API_URL } from '../Url-config';
import { BASE_URL_FRONTEND } from '../Url-config';
export default function TrainStandardComponent(props) {

    const [trainStandards, setTrainStandards] = useState([]);
    const [show, setShow] = useState(false);
    const [newStandard, setNewStandard] = useState('');
    const [errors, setErrors] = useState(false)


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // const params = useParams().id;
    const params = props.id;

    useEffect(() => {
        if(sessionStorage.getItem("userType")!='organization' && sessionStorage.getItem("userType")!='admin')
        {
            return window.location.href = BASE_URL_FRONTEND;  
        
        }
        getTrainingData();

    }, [])

    function getTrainingData() {
        const trainStandardsUrl = BASE_API_URL+"orgnization/getOrganisationDetails/" + params
        axios.get(trainStandardsUrl)
            .then(res => {
                console.log(res);
                if(res!='Something went wrong!' || res!='No Standards Found!');
                setTrainStandards(res.data[0].train_standards)
            })
            .catch(err => {
                console.log(err);
            })
    }
    function changeText(event, id) {
        
            trainStandards[id] = event.target.value
            console.log(event.target.value)
            console.log(trainStandards[id])
            trainStandards[id] = event.target.value
            if(event.target.value){
                setErrors(false)
            let newtrainStandards = [...trainStandards];
            newtrainStandards[id] = event.target.value;
            console.log(newtrainStandards)
            setTrainStandards(newtrainStandards);
        }
        else{
            setErrors(true)
        }
        
    }

    function addTrainingText(event, id) {
        setNewStandard(event.target.value)
    }

    function saveNewStandard() {
        console.log(newStandard);
        if (newStandard) {
           // setErrors(false);
            handleClose();
            let newtrainStandards = [...trainStandards];
            newtrainStandards.push(newStandard);
            console.log(newtrainStandards)
            setTrainStandards(newtrainStandards);
            let trainStandardsUrl = BASE_API_URL+"orgnization/addNewStandard/"
            axios.post(trainStandardsUrl, { id: params, trainStandards: newtrainStandards })
                .then(res => {
                    console.log(res);
                    if(res)
                    setTrainStandards(res.data[0].train_standards)
                })
                .catch(err => {
                    console.log(err);
                })
        }
        // else{
        //     setErrors(true);

        // }

    }
    function saveText(event) {
        if(!errors){
            console.log("saveText")
            axios.put(BASE_API_URL+"orgnization/editTrainingStandards", { id: params, trainStandards: trainStandards })
                .then(res => {
                    console.log(res);
    
                })
                .catch(err => {
                    console.log(err);
                })
        }
      
    }
    function removeStandard(event, id) {

        let newtrainStandards = [...trainStandards];

        newtrainStandards.splice(id, 1);
        console.log(newtrainStandards)
        axios.put(BASE_API_URL+"orgnization/editTrainingStandards", { id: params, trainStandards: newtrainStandards })
            .then(res => {
                getTrainingData();
            })
            .catch(err => {
                console.log(err);
            })
    }


    return (
        <div className='org-container'>
            <h1>Set Training Standards for Organisation</h1>
            <Button style={{ float: "right", marginRight: "1%", marginBottom: "1%" }} variant="warning" onClick={handleShow}>Add New Standard</Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New HR Training Standard</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-2 col-xs-6" controlId="formBasicEmail">
                            <Form.Label>Enter the Training Standard</Form.Label>
                            <Form.Control type="text"
                                defaultValue={newStandard} onChange={(e) => {
                                    addTrainingText(e, 'tran1');
                                }}
                            />
                        </Form.Group>

                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={saveNewStandard}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            <Button style={{ float: "right", marginRight: "1%", marginBottom: "1%" }} onClick={saveText} variant="warning">Save</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>S.N.</th>
                        <th>HR Training Standards</th>
                        <th>Action</th>

                    </tr>
                </thead>



                {trainStandards.map((data, id) => {
                    return <tbody key={id}>
                        <tr >
                            <td>{id + 1}</td>
                            <td><div style={{ width: "100%", display: "flex" }}> <input style={{ flex: 1 }} value={data} onChange={(e) => {
                                changeText(e, id);
                            }}></input></div>
                            </td>
                            <td>
                                <Button variant="link" onClick={(e) => {
                                    removeStandard(e, id);
                                }} >Delete</Button></td>
                        </tr>
                    </tbody>
                })}

            </Table>
            <div>
                        {errors ? (
                            <p className="text-danger">*Field Cannot be empty</p>

                        ) : (
                            <p className="text-danger"></p>

                        )}
                    </div>
        </div>);
}