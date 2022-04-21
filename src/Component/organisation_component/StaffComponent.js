import './organisation.css';
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form';
import Toast from 'react-bootstrap/Toast'
import ToastHeader from 'react-bootstrap/ToastHeader'   
import ToastContainer from 'react-bootstrap/ToastContainer'
import ToastBody from 'react-bootstrap/ToastBody'
export default function StaffComponent() {

    const params = useParams().id;
    const handleCloseStaff = () => setStaffShow(false);
    const handleShowStaff = () => setStaffShow(true);
    const handleClosePosition = () => setPositionShow(false);
    const handleShowPosition = () => setPositionShow(true);
    const [staffList, setStaffList] = useState([]);
    const [showStaff, setStaffShow] = useState(false);
    const [showPosition, setPositionShow] = useState(false);
    const [staffDetail, setStaffDetail] = useState({});
    const [homeId, sethomeId] = useState({});
    const [userId, setuserId] = useState({});
    const [orgId, setorgId] = useState({});
    const [showNotification, setshowNotification] = useState(false);
    const toggleshowNotification = () => setshowNotification(!showNotification);
    var [notificationText, setNotificationText] = useState("");

    useEffect(() => {
        getStaffData();

    }, [])

    function getStaffData() {
        const staffListUrl = "http://localhost:5000/orgnization/getStaffList/" + params
        axios.get(staffListUrl)
            .then(res => {
                console.log(res);
                setStaffList(res.data)
                sethomeId(res.data[0].home_id)
                setorgId(res.data[0].org_id)
                setuserId(String(res.data.length + 1))
            })
            .catch(err => {
                console.log(err);
            })
    }

    function addStaffText(event, id) {
        let newStaffDetailObj = {};
        newStaffDetailObj = { ...staffDetail };
        if (id === 'st1')
            newStaffDetailObj.user_name = event.target.value;
        else if (id === 'st2')
            newStaffDetailObj.role_id = event.target.value;
        else if (id === 'st3')
            newStaffDetailObj.dob = event.target.value;
        else if (id === 'st4')
            newStaffDetailObj.emp_status = event.target.value;
        else if (id === 'st5')
            newStaffDetailObj.user_email = event.target.value;
        newStaffDetailObj.org_id = orgId;
        newStaffDetailObj.user_id = userId;
        newStaffDetailObj.home_id = homeId;
        setStaffDetail(staffDetails => ({
            ...staffDetails, ...newStaffDetailObj
        }));

        setStaffDetail(newStaffDetailObj);
        // console.log("staff details:",staffDetail)


    }
    function saveStaffDetail() {

        console.log("staff details:", staffDetail)
        const staffListUrl = "http://localhost:5000/orgnization/addNewStaff"
        axios.post(staffListUrl, staffDetail)
            .then(res => {
                console.log(res);
                //setStaffList(res.data)
                handleClosePosition()
                getStaffData()
                
                setNotificationText("New Staff Member was added");
            })
            .catch(err => {
                console.log(err);
            })
    }

    function changeEmpStatus(event, id) {
        //console.log(event.target.value," for ",id)
        const staffStatusUrl = "http://localhost:5000/orgnization/editStaffStatus"
        //var status = ""+event.target.value
        axios.put(staffStatusUrl, { "id": id+1, "emp_status": String(event.target.value) })
            .then(res => {
                console.log(res);
                getStaffData();
                setNotificationText("Staff Status was changed");
                toggleshowNotification()
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div className='org-container'>


<div md={6} className="mb-2">
        {/* <Button onClick={toggleshowNotification} className="mb-2">
          Toggle Toast <strong>with</strong> Animation
        </Button> */}
        <ToastContainer className="p-3" position={'middle-end'}>
        <Toast show={showNotification} onClose={toggleshowNotification} >
          <Toast.Header>
            <strong className="me-auto">LCPT Notification</strong>
            
          </Toast.Header>
          <Toast.Body>{notificationText}</Toast.Body>
        </Toast>
        </ToastContainer>
      </div>

            <h1>Staff Members for Home : {params}</h1>
            <Button style={{ float: "right", marginRight: "1%", marginBottom: "1%" }} variant="warning" onClick={handleShowPosition}>Add Position</Button>

            <Button style={{ float: "right", marginRight: "1%", marginBottom: "1%" }} variant="warning" onClick={handleShowStaff}>Add Staff</Button>
            <Modal show={showPosition} onHide={handleClosePosition}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Position</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-2 col-xs-6" controlId="formBasicEmail">
                            <Form.Label>Enter the Position Name</Form.Label>
                            <Form.Control type="text"
                            // defaultValue={newStandard} onChange={(e) => {
                            //     addStaffText(e, 'tran1');
                            // }}
                            />
                            <Form.Label>Enter the Position ID</Form.Label>
                            <Form.Control type="text"
                            // defaultValue={newStandard} onChange={(e) => {
                            //     addStaffText(e, 'tran1');
                            // }}
                            />
                            <Form.Label>Enter the Designation</Form.Label>
                            <Form.Control type="text"
                            // defaultValue={newStandard} onChange={(e) => {
                            //     addStaffText(e, 'tran1');
                            // }}
                            />
                            <Form.Label>Enter the Position Description</Form.Label>
                            <Form.Control type="text"
                            // defaultValue={newStandard} onChange={(e) => {
                            //     addStaffText(e, 'tran1');
                            // }}
                            />

                        </Form.Group>

                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseStaff}>
                        Close
                    </Button>
                    <Button variant="primary" >
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showStaff} onHide={handleCloseStaff}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Staff Member</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-2 col-xs-6" controlId="formBasicEmail">
                            <Form.Label>Enter the Employee Name</Form.Label>
                            <Form.Control type="text"
                                onChange={(e) => {
                                    addStaffText(e, 'st1');
                                }}
                            />
                            <Form.Label>Enter the Employee Role</Form.Label>
                            <Form.Control type="text"
                                onChange={(e) => {
                                    addStaffText(e, 'st2');
                                }}
                            />
                            <Form.Label>Enter the Date of Birth</Form.Label>
                            <Form.Control type="text"
                                onChange={(e) => {
                                    addStaffText(e, 'st3');
                                }}
                            />
                            <Form.Label>Enter the Email-ID</Form.Label>
                            <Form.Control type="text"
                                onChange={(e) => {
                                    addStaffText(e, 'st5');
                                }}
                            />
                            <Form.Label>Enter the Employment Status</Form.Label>

                            <Form.Select aria-label="Default select example" onChange={(e) => {
                                addStaffText(e, 'st4');
                            }} >
                                <option>Select From Below Option</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                                <option value="Pending">Pending</option>
                            </Form.Select>
                        </Form.Group>

                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseStaff}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={saveStaffDetail} >
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>S.N.</th>
                        <th>Employee Name</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Date of Birth</th>

                    </tr>
                </thead>



                {staffList.map((data, id) => {
                    return <tbody key={id}>
                        <tr >
                            <td>{id + 1}</td>
                            <td>{data.user_name}</td>
                            <td>{data.role_detail[0].role_name}</td>

                            <Form.Select aria-label="Default select example" onChange={(e) => {
                                changeEmpStatus(e, id);
                            }}>
                                <option>{data.emp_status}</option>
                                <option value="Active" >Active</option>
                                <option value="Inactive"> Inactive</option>
                                <option value="Pending"> Pending</option>
                            </Form.Select>
                            <td>{data.dob}</td>
                        </tr>
                    </tbody>
                })}

            </Table>
        </div>);
}

