
import './organisation.css';
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Link } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form';
import { BASE_API_URL } from '../Url-config';
import { BASE_URL_FRONTEND } from '../Url-config';
export default function OrganisationListComponent(props) {
    const handleCloseHome = () => setHomeShow(false);
    const handleShowHome = () => setHomeShow(true);
    const [showHome, setHomeShow] = useState(false);
    const [newHomeId, setNewHomeId] = useState('');
    const [HomeDetails, setHomeDetails] = useState({});
    const [homeListArray, setHomeListArray] = useState([]);
    const [errors, setErrors] = useState(false)

    // const params = useParams().id;
    const params = props.id;

    useEffect(() => {
        if (sessionStorage.getItem("userType") != 'organization' && sessionStorage.getItem("userType") != 'admin') {
            return window.location.href = BASE_URL_FRONTEND;
            //alert("Sorry.Access Not Permitted")
        }
        getHomeData();

    }, [params])
    function getHomeData() {
        const homeListUrl = BASE_API_URL + "orgnization/getHomesList/" + params
        axios.get(homeListUrl)
            .then(res => {
                axios.get(BASE_API_URL + "orgnization/getAllHomesCount/").then(newRes => {
                    setNewHomeId(String(newRes.data + 1))
                })
                console.log(res.data)
                if (res.data != 'Something went wrong!' && res.data != 'No Home Found!') {
                    setHomeListArray(res.data)

                }
                else {

                    setHomeListArray([])
                    // setNewHomeId(String(1))
                }
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
        console.log("Home details:", HomeDetails)


    }
    function saveNewHomeText() {
        if (HomeDetails.name && HomeDetails.address && HomeDetails.contact_firstName && HomeDetails.contact_lastName && HomeDetails.phone_no && HomeDetails.email_id) {
            console.log(HomeDetails)
            setErrors(false);
            const saveHomeUrl = BASE_API_URL + "orgnization/addNewHome"
            axios.post(saveHomeUrl, HomeDetails)
                .then(res => {
                    console.log(res);
                    handleCloseHome()
                    getHomeData()

                    //  setNotificationText("New Staff Member was added");
                })
                .catch(err => {
                    console.log(err);
                })
        }
        else {
            setErrors(true);
        }

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
                        <div>
                            {errors ? (
                                <p className="text-danger">*All fields are mandatory</p>

                            ) : (
                                <p className="text-danger"></p>

                            )}
                        </div>
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
                            <td> <Link to={`/home/${data.home_id}`}><Button variant="warning">View Home Details</Button></Link></td>
                            <td><Link to={`/showStaff/${data.home_id}`}><Button variant="warning">View Staff Members</Button></Link></td>
                            <td><Link to={`/checkList/${data.home_id}`}><Button variant="warning">View CheckList Component</Button></Link></td>
                        </tr>

                    </tbody>
                })}

            </Table>
        </div>);
}