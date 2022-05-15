
import './organisation.css';
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Link } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form';

export default function OrganisationListComponent() {
    const handleCloseHome = () => setHomeShow(false);
    const handleShowHome = () => setHomeShow(true);
    const [showHome, setHomeShow] = useState(false);
    const [newHomeId, setNewHomeId] = useState('');
    const [HomeDetails, setHomeDetails] = useState({});
    const [homeListArray, setHomeListArray] = useState([]);
    const params = useParams().id;
    useEffect(() => {
        getHomeData();
        
    }, [])
    function getHomeData(){
        const homeListUrl = "https://lcpt-webportal-backend.herokuapp.com/orgnization/getHomesList/" + params
        axios.get(homeListUrl)
            .then(res => {
                console.log(res);
                setHomeListArray(res.data)
                setNewHomeId(String(res.data.length+1))
            })
            .catch(err => {
                console.log(err);
            })
    }

    function addHomeText(event, id) {
        let newHomeDetailObj = {};
        newHomeDetailObj = { ...HomeDetails };
        if (id === 'hm1')
            newHomeDetailObj.name = event.target.value;
        else if (id === 'hm2')
            newHomeDetailObj.address = event.target.value;
        else if (id === 'hm3')
            newHomeDetailObj.contact_firstName = event.target.value;
        else if (id === 'hm4')
            newHomeDetailObj.contact_lastName = event.target.value;
        else if (id === 'hm5')
            newHomeDetailObj.phone_no = event.target.value;
        else if (id === 'hm6')
        newHomeDetailObj.email_id = event.target.value;
        newHomeDetailObj.org_id = params;
        newHomeDetailObj.home_id = newHomeId;
        setHomeDetails(HomeDetails => ({
            ...HomeDetails, ...newHomeDetailObj
        }));

     //   setHomeDetail(newHomeDetailObj);
         console.log("Home details:",HomeDetails)


    }
    function saveNewHomeText(){
        console.log(HomeDetails)
        const saveHomeUrl = "https://lcpt-webportal-backend.herokuapp.com/orgnization/addNewHome"
        axios.post(saveHomeUrl, HomeDetails)
            .then(res => {
                console.log(res);
                //setStaffList(res.data)
                handleCloseHome()
                getHomeData()
                
              //  setNotificationText("New Staff Member was added");
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div className='org-container'>
            <h1> List of Homes in the Organisation</h1>
            <Button style={{ float: "right", marginRight: "1%", marginBottom: "1%" }} variant="warning" onClick={handleShowHome} >Add New Home</Button>
            <Modal show={showHome} onHide={handleCloseHome}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Home in Organisation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-2 col-xs-6" controlId="formBasicEmail">
                            <Form.Label>Enter the Home Name</Form.Label>
                            <Form.Control type="text"
                                onChange={(e) => {
                                    addHomeText(e, 'hm1');
                                }}
                            />
                            <Form.Label>Enter the Home Address</Form.Label>
                            <Form.Control type="text"
                                onChange={(e) => {
                                    addHomeText(e, 'hm2');
                                }}
                            />
                            <Form.Label>Enter the Contact First Name</Form.Label>
                            <Form.Control type="text"
                                onChange={(e) => {
                                    addHomeText(e, 'hm3');
                                }}
                            />
                            <Form.Label>Enter the Contact Last Name</Form.Label>
                            <Form.Control type="text"
                                onChange={(e) => {
                                    addHomeText(e, 'hm4');
                                }}
                            />
                            <Form.Label>Enter the Phone Number</Form.Label>

                            <Form.Control type="text"
                                onChange={(e) => {
                                    addHomeText(e, 'hm5');
                                }}
                            />
                            <Form.Label>Enter the Email ID</Form.Label>

                            <Form.Control type="text"
                                onChange={(e) => {
                                    addHomeText(e, 'hm6');
                                }}
                            />
                        </Form.Group>

                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" >
                        Close
                    </Button>
                    <Button variant="primary" onClick={saveNewHomeText} >
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Home ID</th>
                        <th>Home Name</th>
                        <th>Action</th>
                        <th>Manage Staff</th>
                        <th>CheckList Component</th>
                    </tr>
                </thead>



                {homeListArray.map((data, id) => {
                    return <tbody key={id}>
                        <tr >
                            <td>{data.home_id}</td>
                            <td>{data.name}</td>
                            <td> <Button variant="warning"><Link to={`/home/${data.home_id}`}>View Home Details</Link></Button></td>
                            <td><Button variant="warning"
                            ><Link to={`/showStaff/${data.home_id}`}>View Staff Members</Link></Button></td>
                            <td><Button variant="warning"
                            ><Link to={`/checkList/${data.home_id}`}>View CheckList Component</Link></Button></td>
                        </tr>

                    </tbody>
                })}

            </Table>
        </div>);
}