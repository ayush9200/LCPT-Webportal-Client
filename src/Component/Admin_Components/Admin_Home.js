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
import HomeMainComponent from '../organisation_component/HomeMainComponent';
import AdminUserEditor from './AdminUserEditor';
import { useParams } from "react-router-dom";
import { BASE_API_URL } from '../Url-config';
import { BASE_URL_FRONTEND } from '../Url-config';
function Admin_Home() {
    console.log(Config)

    var backendPortUrl = Config.back_end_port + '/';
    const params = useParams().id;
    const [orgIdForAdmin, setOrgIdForAdmin] = useState("1");
    const [orgIdForHomeAdmin, setOrgIdForHomeAdmin] = useState("1");
    const [homeIdForAdmin, setomeIdForAdmin] = useState("");
    const [homeDetails, setHomeDetails] = useState([]);
    const [orgDet4DrpDwn, setOrgDet4DrpDwn] = useState([]);
    const [OrgDetails, setOrgDetails] = useState({});
    const [orgCount, setOrgCount] = useState('1');

    const [showOrg, setOrgShow] = useState(false);
    const handleCloseOrg = () => setOrgShow(false);
    const handleShowOrg = () => setOrgShow(true);

    function returnBack() {
        return window.location.href = BASE_URL_FRONTEND;

    }
    useEffect(() => {
        if (sessionStorage.getItem("userType") != 'admin') {
            alert("Sorry.Access Not Permitted")
            return window.location.href = BASE_URL_FRONTEND;
            // setTimeout(returnBack(), 3000);

        }
        else {
            // var organizationID = params;
            var gethomeDetailsUrl = BASE_API_URL + "orgnization/getHomesList/" + orgIdForHomeAdmin;
            axios.get(gethomeDetailsUrl)
                .then(res => {

                    console.log(res.data);
                    setHomeDetails(res.data)
                    // toggleshowSpinner()
                })
                .catch(err => {
                    console.log(err);
                })


            var getOrganizationUrl = BASE_API_URL + "orgnization/getOrganizationList";
            axios.get(getOrganizationUrl)
                .then(res => {

                    console.log(res.data);
                    setOrgDet4DrpDwn(res.data)


                })
                .catch(err => {
                    console.log(err);
                })

            axios.get(BASE_API_URL + "orgnization/getOrgCount")
                .then(res => {
                    console.log(res.data);
                    setOrgCount(String(res.data + 1))
                    // toggleshowSpinner()
                })
                .catch(err => {
                    console.log(err);
                })
        }

    }, [orgIdForHomeAdmin, homeIdForAdmin])

    var createOrganizationIdList = () => {
        let items = [];
        // items.push(<option value="">All</option>)

        for (var i in orgDet4DrpDwn) {
            console.log(orgDet4DrpDwn[i]);

            items.push(<option value={orgDet4DrpDwn[i].org_id}> {orgDet4DrpDwn[i].org_id} </option>);
        }
        return items;
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
        newOrgDetailObj.org_id = orgCount;
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
        const saveOrgUrl = BASE_API_URL + "orgnization/addNewOrg"
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
                {/* <Tab eventKey="createUser" title="Create User">
                    <CreateUserForm />

                </Tab> */}
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
                            <Form.Select size="lg" style={{ width: "30%" }} onChange={(e) => {
                                // var homeID = e.target.value;
                                // console.log(homeID);
                                setOrgIdForAdmin(e.target.value);


                            }}>
                                {createOrganizationIdList()}
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
                            // var homeID = e.target.value;
                            // console.log(homeID);
                            setOrgIdForHomeAdmin(e.target.value);
                            setomeIdForAdmin("");
                            document.getElementById("homeDropDown").value = "";


                        }}>
                            {createOrganizationIdList()}
                        </Form.Select>
                        <h2>HOME ID:  </h2>
                        <Form.Select size="lg" style={{ width: "30%" }} id="homeDropDown" onChange={(e) => {
                            var homeID = e.target.value;
                            setomeIdForAdmin(homeID);
                            console.log(homeID);

                        }}>
                            <option value="">Select one Home</option>
                            {createHomeIDSelectItems()}

                        </Form.Select>

                    </div>
                    {(homeIdForAdmin == "") ? <h1>choose home</h1> :
                        <HomeMainComponent homeIdFprAdmin={homeIdForAdmin} orgId={orgIdForHomeAdmin} />

                    }

                </Tab>
                <Tab eventKey="individualView" title="Users" >
                    <EnterIndividualForm />
                </Tab>
            </Tabs>
        </div>)
}

export default Admin_Home