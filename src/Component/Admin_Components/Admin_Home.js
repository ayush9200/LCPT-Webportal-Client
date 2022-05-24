import React, { useState, useEffect } from 'react'
import { Form, Row, Col, Button, Container, Tabs, Tab, } from 'react-bootstrap'
import Config from '../config.json'
import CreateUserForm from './CreateUserForm';
import { Link } from 'react-router-dom'
import axios from 'axios';
import Modal from 'react-bootstrap/Modal'
import EnterOrganizationForm from './EnterOrganizationForm';
import EnterIndividualForm from './EnterIndividualForm';
import EnterHomeForm from './EnterHomeForm';
import MicroCredsDashboard from './MicroCredsDashboard';
import Organisation from '../organisation_component/organisation';
import HomeDetailComponent from '../organisation_component/HomeDetailComponent';
import AdminUserEditor from './AdminUserEditor';
function Admin_Home() {
    console.log(Config)
    var backendPortUrl = Config.back_end_port + '/';

    const [orgIdForAdmin, setOrgIdForAdmin] = useState("1");
    const [homeIdForAdmin, setomeIdForAdmin] = useState("1");
    const [homeDetails, setHomeDetails] = useState([]);
    const [OrgDetails, setOrgDetails] = useState({});
    const [showOrg, setOrgShow] = useState(false);
    const handleCloseOrg = () => setOrgShow(false);
    const handleShowOrg = () => setOrgShow(true);
    useEffect(() => {
        var organizationID = "1";
        var gethomeDetailsUrl = backendPortUrl + "orgnization/getHomesList/" + organizationID;
        axios.get(gethomeDetailsUrl)
            .then(res => {

                console.log(res.data);
                setHomeDetails(res.data)
                // toggleshowSpinner()
            })
            .catch(err => {
                console.log(err);
            })



    }, [])

    var createOrganizationIdList = () => {

    }
    var createHomeIDSelectItems = () => {
        let items = [];
        // items.push(<option value="">All</option>)
        console.log(homeDetails)

        for (var i in homeDetails) {
            console.log(homeDetails[i]);
            items.push(<option value={homeDetails[i].home_id}> {homeDetails[i].home_id} </option>);
        }
        return items;
    }
    function addOrgText(event, id) {
        let newOrgDetailObj = {};
        newOrgDetailObj = { ...OrgDetails };
        if (id === 'org1')
            newOrgDetailObj.org_name = event.target.value;
        else if (id === 'org2')
            newOrgDetailObj.contact_firstName = event.target.value;
        else if (id === 'org3')
            newOrgDetailObj.contact_lastName = event.target.value;
        else if (id === 'org4')
            newOrgDetailObj.phone_no = event.target.value;
        else if (id === 'org5')
            newOrgDetailObj.email_id = event.target.value;
        newOrgDetailObj.org_id = "2";
        newOrgDetailObj.train_standards = [];
       // newOrgDetailObj.Org_id = newOrgId;
        setOrgDetails(OrgDetails => ({
            ...OrgDetails, ...newOrgDetailObj
        }));

        //   setOrgDetail(newOrgDetailObj);
        console.log("Org details:", OrgDetails)


    }
    function saveNewOrgText() {
        console.log(OrgDetails)
        const saveOrgUrl = "http://localhost:5000/orgnization/addNewOrg"
        axios.post(saveOrgUrl, OrgDetails)
            .then(res => {
                console.log(res);
                handleCloseOrg()
               // getOrgData()
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div style={{ marginTop: "7vh" }}>
            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3" fill>
                <Tab eventKey="profile" title="Profile">
                    <h1 style={{ textAlign: "center" }}>Profile</h1>
                </Tab>
                <Tab eventKey="createUser" title="Create User">
                    <CreateUserForm />

                </Tab>
                <Tab eventKey="microCardDash" title="Micro-cred Dashboard" >
                    <MicroCredsDashboard />
                </Tab>
                <Tab eventKey="verifyCredentials" title="Verify Credentials" >
                    {/* <h1 style={{ textAlign: "center" }}>Verify Credentials</h1> */}
                    <AdminUserEditor />
                </Tab>

                <Tab eventKey="organizationView" title="Organizations" >
                    <Row style={{ width: "50%", marginRight: "auto", marginLeft: "auto" }}>
                        <Col>
                            <h2 >Organisation ID:  </h2>

                        </Col>
                        <Col>

                            <Form.Select as={Col} onChange={(e) => {
                                var orgID = e.target.value;
                                setOrgIdForAdmin(orgID);
                                console.log(orgID);

                            }}>
                                {/* {createOrganizationIdList()} */}
                                <option value="1">1</option>
                            </Form.Select>
                        </Col>


                    </Row>
                <Button style={{ float: "right", marginRight: "1%", marginBottom: "1%" }} variant="warning" onClick={handleShowOrg} >Add New Organisation</Button>
            <Modal show={showOrg} onHide={handleCloseOrg}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Organisation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-2 col-xs-6" controlId="formBasicEmail">
                            <Form.Label>Enter the Organisation Name</Form.Label>
                            <Form.Control type="text"
                                onChange={(e) => {
                                    addOrgText(e, 'org1');
                                }}
                            />
                            
                            <Form.Label>Enter the Contact First Name</Form.Label>
                            <Form.Control type="text"
                                onChange={(e) => {
                                    addOrgText(e, 'org2');
                                }}
                            />
                            <Form.Label>Enter the Contact Last Name</Form.Label>
                            <Form.Control type="text"
                                onChange={(e) => {
                                    addOrgText(e, 'org3');
                                }}
                            />
                            <Form.Label>Enter the Phone Number</Form.Label>

                            <Form.Control type="text"
                                onChange={(e) => {
                                    addOrgText(e, 'org4');
                                }}
                            />
                            <Form.Label>Enter the Email ID</Form.Label>

                            <Form.Control type="text"
                                onChange={(e) => {
                                    addOrgText(e, 'org5');
                                }}
                            />
                        </Form.Group>

                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" >
                        Close
                    </Button>
                    <Button variant="primary" onClick={saveNewOrgText} >
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
                    <Organisation orgIdForAdmin={orgIdForAdmin} />
                    {/* <EnterOrganizationForm /> */}
                </Tab>
                <Tab eventKey="homeView" title="Homes" >
                    {/* <EnterHomeForm /> */}

                    <div style={{ display: "flex", marginLeft: "10%" }}>
                        <h2>Organisation ID:  </h2>
                        <Form.Select size="lg" style={{ width: "30%" }} onChange={(e) => {
                            var homeID = e.target.value;
                            console.log(homeID);

                        }}>
                            <option value="1">1</option>

                        </Form.Select>
                        <h2>HOME ID:  </h2>
                        <Form.Select size="lg" style={{ width: "30%" }} onChange={(e) => {
                            var homeID = e.target.value;
                            setomeIdForAdmin(homeID);
                            console.log(homeID);

                        }}>
                            {createHomeIDSelectItems()}

                        </Form.Select>

                    </div>
                    <HomeDetailComponent homeIdFprAdmin={homeIdForAdmin} />
                </Tab>
                <Tab eventKey="individualView" title="Users" >
                    <EnterIndividualForm />
                </Tab>
            </Tabs>
        </div>)
}

export default Admin_Home