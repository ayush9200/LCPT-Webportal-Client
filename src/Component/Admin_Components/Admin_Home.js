import React, { useState, useEffect } from 'react'
import { Form, Row, Col, Button, Container, Tabs, Tab, } from 'react-bootstrap'
import axios from 'axios';

import CreateUserForm from './CreateUserForm';
import EnterOrganizationForm from './EnterOrganizationForm';
import EnterIndividualForm from './EnterIndividualForm';
import EnterHomeForm from './EnterHomeForm';
import MicroCredsDashboard from './MicroCredsDashboard';
import Organisation from '../organisation_component/organisation';
import HomeDetailComponent from '../organisation_component/HomeDetailComponent';
import AdminUserEditor from './AdminUserEditor';
function Admin_Home() {

    const [orgIdForAdmin, setOrgIdForAdmin] = useState("1");
    const [homeIdForAdmin, setomeIdForAdmin] = useState("1");
    const [homeDetails, setHomeDetails] = useState([]);
    useEffect(() => {
        var organizationID = "1";
        var gethomeDetailsUrl = "https://lcpt-webportal-backend.herokuapp.com/orgnization/getHomesList/" + organizationID;
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
                <Tab eventKey="verifyCredentials" title="User Editor" >
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