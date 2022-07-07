
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
import Spinner from 'react-bootstrap/Spinner'

export default function TrainStandardComponent(props) {

    const [courseList, setCourseList] = useState([]);
    const [trainStandards, setTrainStandards] = useState([]);
    const [show, setShow] = useState(false);
    const [newStandard, setNewStandard] = useState('');
    const [errors, setErrors] = useState(false)
    const [roleDetails, setRoleDetails] = useState([]);
    const [MicroCredShow, setMicroCredShow] = useState(false);
    const [dispRoleDetail, setDispRoleDetail] = useState('');
    const handleCloseMicroCred = () => setMicroCredShow(false);
    const handleshowMicroCred = () => setMicroCredShow(true);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [roleDetailshow, setRoleDetailShow] = useState(false);
    const handleroleDetailClose = () => setRoleDetailShow(false);
    const handleroleDetailShow = () => setRoleDetailShow(true);
    const [dispMicroCred, setDispMicroCred] = useState('');
    const [showSpinner, setshowSpinner] = useState(false);
    const toggleshowSpinner = () => setshowSpinner(!showSpinner);
    // const params = useParams().id;
    const params = props.id;

    useEffect(() => {
        if (sessionStorage.getItem("userType") != 'organization' && sessionStorage.getItem("userType") != 'admin') {
            // alert("Sorry.Access Not Permitted")
            return window.location.href = BASE_URL_FRONTEND;
        }
        // if(sessionStorage.getItem("userType")==='organization'){
        //   if(JSON.parse(sessionStorage.getItem("OtherOrgId")).findIndex(String(params))==-1){
        //     return window.location.href = BASE_URL_FRONTEND;  
        //   }
        // }
        getTrainingData();

    }, [params])

    function getTrainingData() {
        const trainStandardsUrl = BASE_API_URL + "orgnization/getOrganisationDetails/" + params
        axios.get(trainStandardsUrl)
            .then(res => {
                // console.log(res);
                if (res != 'Something went wrong!' || res != 'No Standards Found!');
                setTrainStandards(res.data[0].train_standards)
            })
            .catch(err => {
                console.log(err);
            })
        const getCoursesUrl = BASE_API_URL + "orgnization/getCourseList/"
        axios.get(getCoursesUrl)
            .then(res => {
                if (res != 'Something went wrong!' || res != 'No Course Found!') {
                    //setshowSpinner(false)
                    setCourseList(res.data)
                    // console.log(courseList);
                }

            })
            .catch(err => {
                console.log(err);
            })
        const getOrgRoleUrl = BASE_API_URL + "orgnization/getOrgRoleList/" + params;
        axios.get(getOrgRoleUrl)
            .then(res => {
                if (res != 'Something went wrong!' || res != 'No Role Found!') {
                    //setshowSpinner(false)roleDetails
                    setRoleDetails(res.data);
                    //console.log(res.data);
                }

            })
            .catch(err => {
                console.log(err);
            })
        setshowSpinner(false)

    }
    function getMicrodetails(event, val) {
        // console.log(roleDetails[id].course_details[_id])
        if (val.description)
            setDispMicroCred(val.description);
        else
            setDispMicroCred(val.title)
        handleshowMicroCred()

    }
    function changeText(event, id) {

        trainStandards[id] = event.target.value
        console.log(event.target.value)
        console.log(trainStandards[id])
        trainStandards[id] = event.target.value
        if (event.target.value) {
            setErrors(false)
            let newtrainStandards = [...trainStandards];
            newtrainStandards[id] = event.target.value;
            console.log(newtrainStandards)
            setTrainStandards(newtrainStandards);
        }
        else {
            setErrors(true)
        }

    }
    var trainObj = {}
    function addTrainingText(event, id) {

        if (id == 'tran1') {
            trainObj.role_name = event.target.value

        }
        else {
            trainObj.role_details = event.target.value
        }
        //setNewStandard(trainObj)
        //trainObj = {}
    }
    function changeArchiveStatus(event, role_id) {
        console.log(role_id, " roleid")
        const archiveStatusUrl = BASE_API_URL + "orgnization/editRoleArchiveStatus"
        //var status = ""+event.target.value
        axios.put(archiveStatusUrl, { "role_id": String(role_id), "archived": String(event.target.value), "org_id": String(params) })
            .then(res => {
                console.log(res);
                // getStaffData();
                // setNotificationText("Staff Status was changed");
                // toggleshowNotification()
            })
            .catch(err => {
                console.log(err);
            })
    }

    function saveNewStandard() {
        setshowSpinner(true)

        console.log(newStandard);
        var tempStandard = {};
        // tempStandard.role_name = newStandard.role_name
        // tempStandard.role_details = newStandard.role_details
        tempStandard.role_name = trainObj.role_name
        tempStandard.role_details = trainObj.role_details
        axios.get(BASE_API_URL + "orgnization/getRoleLength/")
            .then(res => {
                //  console.log(res);
                if (res) {
                    tempStandard.role_id = String(res.data + 1);
                    setNewStandard(...newStandard, tempStandard)
                    if (tempStandard.role_name && tempStandard.role_details && tempStandard.role_id) {
                        // setErrors(false);
                        handleClose();
                        let newtrainStandards = [...trainStandards];
                        newtrainStandards.push(tempStandard);
                        console.log(newtrainStandards)
                        setTrainStandards(newtrainStandards);
                        let trainStandardsUrl = BASE_API_URL + "orgnization/addNewStandard/"
                        axios.post(trainStandardsUrl, { id: params, trainStandards: newtrainStandards, newStandard: tempStandard })
                            .then(res => {
                                console.log(res);
                                if (res)
                                    getTrainingData();
                                //setTrainStandards(res.data[0].train_standards)
                            })
                            .catch(err => {
                                console.log(err);
                            })
                    }
                    trainObj = {}
                }
            })
            .catch(err => {
                console.log(err);
            })

        // else{
        //     setErrors(true);

        // }

    }
    function saveText(event) {
        if (!errors) {
            console.log("saveText")
            axios.put(BASE_API_URL + "orgnization/editTrainingStandards", { id: params, trainStandards: trainStandards })
                .then(res => {
                    console.log(res);

                })
                .catch(err => {
                    console.log(err);
                })
        }

    }
    function handleCheckOnChange(event, courseDetail, roleDetail, id) {
        setshowSpinner(true)

        console.log(event.target.checked, courseDetail, roleDetail, id)
        var tempArray = roleDetails;
        if (event.target.checked)
            tempArray[id].course_details.push({ "id": courseDetail.courseID, "details": courseDetail.title })
        else
            tempArray[id].course_details = tempArray[id].course_details.filter(function (el) { return el.id != courseDetail.courseID; });
        setRoleDetails(tempArray)
        //console.log(roleDetails)
        const editOrgCourseDetails = BASE_API_URL + "orgnization/editOrgCourseDetails/"

        axios.put(editOrgCourseDetails, roleDetail)
            .then(res => {
                // setshowSpinner(false)

                //console.log(res.data)
                getTrainingData()

            })
            .catch(err => {
                console.log(err);
            })

    }

    function removeStandard(event, id) {

        let newtrainStandards = [...trainStandards];

        newtrainStandards.splice(id, 1);
        console.log(newtrainStandards)
        axios.put(BASE_API_URL + "orgnization/editTrainingStandards", { id: params, trainStandards: newtrainStandards })
            .then(res => {
                getTrainingData();
            })
            .catch(err => {
                console.log(err);
            })
    }

    function openDispRoleDetail(event, data) {
        console.log(event.target.value)
        setDispRoleDetail(data.role_details)
        handleroleDetailShow()
    }

    return (
        <div className='org-container'>
            <h1>Set Training Standards for Organisation: {params}</h1>
            <Button style={{ float: "right", marginRight: "1%", marginBottom: "1%" }} variant="warning" onClick={handleShow}>Add New Standard</Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New HR Training Standard</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-2 col-xs-6" controlId="formBasicEmail">
                            <Form.Label>Enter the Role Name</Form.Label>
                            <Form.Control type="text"
                                defaultValue={newStandard} onChange={(e) => {
                                    addTrainingText(e, 'tran1');
                                }}
                            />
                            <Form.Label>Enter the Role Details</Form.Label>
                            <Form.Control type="text"
                                defaultValue={newStandard} onChange={(e) => {
                                    addTrainingText(e, 'tran2');
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
            {/* <Button style={{ float: "right", marginRight: "1%", marginBottom: "1%" }} onClick={saveText} variant="warning">Save</Button> */}
            {/* <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>S.N.</th>
                        <th>HR Training Standards</th>
                     

                    </tr>
                </thead>



                {trainStandards.map((data, id) => {
                    return <tbody key={id}>
                        <tr >
                            <td>{id + 1}</td>
                         
                            <td><div style={{ width: "100%", display: "flex" }}><b>{data.role_name}</b></div>
                            <div style={{ width: "100%", display: "flex" }}>{data.role_details}</div>
                            </td>
                           
                        </tr>
                    </tbody>
                })}

            </Table> */}
            {showSpinner ? <div style={{ paddingLeft: "40%", top: "50%", position: "fixed" }}>
                <Spinner show={showSpinner} animation="border" size="lg" variant='primary' />

            </div> : <div></div>}
            <Table striped bordered hover id="table-id" >

                <thead >
                    <th style={{ width: "25vh" }}></th>
                    {roleDetails.map((data, id) => {
                        return (<th key={id} style={{ width: "25vh" }}>
                            {/* 
                                <Button variant="warning" onClick={(e) => {
                                    createRole(e, data);
                                }} style={{ marginTop: "2%", marginRight:"3%",marginLeft:"3%", backgroundColor:"#ffc107" }} >Create Role</Button> */}
                            {/* <Modal show={showOption} onHide={handleCloseOption}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Enter Role Name</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form>
                                            <Form.Group className="mb-2 col-xs-6" controlId="formBasicEmail">
                                                <Form.Label>Enter the Role Name</Form.Label>
                                                <Form.Control type="text"
                                                    onChange={(e) => {
                                                        addRoleText(e, 'hm1');
                                                    }}
                                                />

                                            </Form.Group>

                                        </Form>

                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleCloseOption} >
                                            Close
                                        </Button>
                                        <Button variant="primary" onClick={getNewRole} >
                                            Save Changes
                                        </Button>
                                    </Modal.Footer>
                                </Modal> */}

                            {/* <Link  to={`/roleTemplate/${data.home_id}/${data.role_id}`}><Button style={{marginTop:"2%"}} variant="warning">View Role</Button></Link> */}
                            <p>
                                <Form>
                                    <Form.Group className="mb-2 col-xs-6" controlId="formBasicEmail">
                                        <Form.Label>Role Archive Status</Form.Label>

                                        <Form.Select aria-label="Default select example" defaultValue={data.archived} onChange={(e) => {
                                            changeArchiveStatus(e, data.role_id);
                                        }}>
                                            <option value="True" >True</option>
                                            <option value="False"> False</option>
                                        </Form.Select>


                                    </Form.Group>
                                </Form>
                            </p>
                            <p style={{ textAlign: "center" }}><b>{data.role_name}</b></p>
                            <p>            <Button onClick={(e) => { openDispRoleDetail(e, data); }}
                                variant="warning">Show Detail</Button>
                                <Modal show={roleDetailshow} onHide={handleroleDetailClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Role Details</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        {dispRoleDetail}

                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleroleDetailClose} >
                                            Close
                                        </Button>
                                    </Modal.Footer>
                                </Modal></p>
                            {/* <p>
                                    <Form>
                                    <Form.Group className="mb-2 col-xs-6" controlId="formBasicEmail">
                                        <Form.Label>Role Archive Status</Form.Label>
                                        <Form.Select aria-label="Default select example" defaultValue={data.archived} onChange={(e) => {
                                            changeArchiveStatus(e, data.role_id);
                                        }}>
                                            <option value="True" >True</option>
                                            <option value="False"> False</option>
                                        </Form.Select>

                                    </Form.Group>
                                </Form>
                                </p> */}


                        </th>)
                    })
                    }


                </thead>

                {courseList.map((courses, id) => {
                    return (<tr key={id} >
                        <td style={{ width: "25vh" }}><b>{courses.title}</b><div><Button style={{ marginBottom: "5px" }} variant="warning" onClick={(e) => {
                            getMicrodetails(e, courses);
                        }} >View MicroCred Details</Button>
                            <Modal show={MicroCredShow} onHide={handleCloseMicroCred}>
                                <Modal.Header closeButton>
                                    <Modal.Title>View MicroCred Details</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    {/* This will contain MicroCred Details for */}
                                    {dispMicroCred}

                                </Modal.Body>
                                <Modal.Footer>
                                    {/* <Button variant="secondary" >
                                            Close
                                        </Button>
                                        <Button variant="primary" >
                                            Save Changes
                                        </Button> */}
                                </Modal.Footer>
                            </Modal>
                        </div></td>
                        {roleDetails.map((data, _id) => {
                            return (<td key={_id} style={{ borderRight: "1px solid #000", borderLeft: "1px solid #000", width: "25vh" }}>
                                <input
                                    type="checkbox" style={{ transform: "scale(2)", marginLeft: "50%" }}

                                    defaultChecked={(roleDetails[_id].course_details.find(item =>
                                        item.id == courseList[id].courseID
                                    ) != undefined)}
                                    onChange={(e) => {
                                        handleCheckOnChange(e, courses, data, _id);
                                    }}

                                />

                            </td>)
                        })
                        }
                    </tr>)
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