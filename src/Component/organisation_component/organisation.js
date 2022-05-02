
import './organisation.css';
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Tabs, Tab } from 'react-bootstrap'
import HomeCheckListComponent from "./HomeCheckListComponent";
// import AuditReportComponent from "./AuditReportComponent";
import OrganisationListComponent from "./OrganisationListComponent";
import TrainStandardComponent from "./TrainStandardComponent";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner'
import OrganizationAuditTabs from '../Audit_Report_Components/organizationAuditTabs';

export default function Organisation() {
    const params = useParams().id;
    const id = useParams.id;
    const [homeDetails, setHomeDetails] = useState({ id: params });
    const [showSpinner, setshowSpinner] = useState(false);
    const toggleshowSpinner = () => setshowSpinner(!showSpinner);

    useEffect(() => {
        // toggleshowSpinner()
        setshowSpinner(true)
        const gethomeDetailsUrl = "http://localhost:5000/orgnization/getOrganisationDetails/" + params
        axios.get(gethomeDetailsUrl)
            .then(res => {
                console.log(res.data[0]);
                setHomeDetails(res.data[0])
                setshowSpinner(false)
                // toggleshowSpinner()
            })
            .catch(err => {
                console.log(err);
            })
    }, [])


    function changeOrgText(event, id) {
        let newHomeDetailObj = {};
        newHomeDetailObj = { ...homeDetails };
        if (id === 'det1')
            newHomeDetailObj.org_name = event.target.value;
        else if (id === 'det2')
            newHomeDetailObj.contact_firstName = event.target.value;
        else if (id === 'det3')
            newHomeDetailObj.contact_lastName = event.target.value;
        else if (id === 'det4')
            newHomeDetailObj.phone_no = event.target.value;
        else if (id === 'det5')
            newHomeDetailObj.email_id = event.target.value;
        setHomeDetails(homeDetails => ({
            ...homeDetails, ...newHomeDetailObj
        }));

        setHomeDetails(newHomeDetailObj);
        console.log("home details:", homeDetails)

    }
    function saveOrgText(event, id) {
        console.log("In saveText")
        console.log(homeDetails)
        toggleshowSpinner()
        axios.put("http://localhost:5000/orgnization/editOrgDetails", homeDetails)
            .then(res => {
                console.log(res);
                setshowSpinner(false)
            })
            .catch(err => {
                console.log(err);
            })
    }


    return (

        <div style={{ marginTop: "8vh" }} >
            <h1>Organisation : {params} </h1>
            <Tabs defaultActiveKey="OrgDetails" id="uncontrolled-tab-example" className="mb-3" fill>
                <Tab eventKey="OrgDetails" title="Organisation Details">
                    <div className='org-container'>
                        {showSpinner ? <div style={{ paddingLeft: "50%", paddingTop: "10%", position: "absolute" }}>
                            <Spinner show={showSpinner} animation="border" size="lg" variant='primary' />

                        </div> : <div></div>}

                        <Form>
                            <Form.Group className="mb-2 col-xs-6" controlId="formBasicEmail">
                                <Form.Label>Organisation Name</Form.Label>
                                <Form.Control type="text" value={homeDetails.org_name} onChange={(e) => {
                                    changeOrgText(e, 'det1');
                                }} />
                            </Form.Group>
                            <Form.Group className="mb-3 col-xs-6" controlId="formBasicEmail">
                                <Form.Label>Organisation ID</Form.Label>
                                <Form.Control type="text" value={homeDetails.org_id} disabled />
                            </Form.Group>
                            <Form.Group className="mb-3 col-xs-6" controlId="formBasicEmail">
                                <Form.Label>Contact First-Name</Form.Label>
                                <Form.Control type="text" value={homeDetails.contact_firstName} onChange={(e) => {
                                    changeOrgText(e, 'det2');
                                }} />
                            </Form.Group>

                            <Form.Group className="mb-3 col-xs-6" controlId="formBasicEmail">
                                <Form.Label>Contact Last-Name</Form.Label>
                                <Form.Control type="text" value={homeDetails.contact_lastName} onChange={(e) => {
                                    changeOrgText(e, 'det3');
                                }} />
                            </Form.Group>
                            <Form.Group className="mb-3 col-xs-6" controlId="formBasicEmail">
                                <Form.Label>Contact Number</Form.Label>
                                <Form.Control type="text" value={homeDetails.phone_no} onChange={(e) => {
                                    changeOrgText(e, 'det4');
                                }} />
                            </Form.Group>
                            <Form.Group className="mb-3 col-xs-6" controlId="formBasicEmail">
                                <Form.Label>Contact Email</Form.Label>
                                <Form.Control type="text" value={homeDetails.email_id} onChange={(e) => {
                                    changeOrgText(e, 'det5');
                                }} />
                            </Form.Group>
                            <Button onClick={(e) => {
                                saveOrgText(e, 'det1');
                            }} variant="warning" >
                                Save Changes
                            </Button>
                        </Form>
                    </div>
                </Tab>
                <Tab eventKey="trainStandard" title="Training Standard">
                    <TrainStandardComponent />

                </Tab>
                <Tab eventKey="organistionList" title="Homes List" >
                    <OrganisationListComponent />
                </Tab>
                {/* <Tab eventKey="homeCheckList" title="Home CheckList Component" >
                    <HomeCheckListComponent />
                </Tab> */}

                <Tab eventKey="auditReport" title="Audit Report" >
                    <OrganizationAuditTabs organizationID={id} />
                </Tab>
            </Tabs></div>)

}