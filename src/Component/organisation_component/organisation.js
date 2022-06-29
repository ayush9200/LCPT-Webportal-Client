
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
import { BASE_API_URL } from '../Url-config';
import { BASE_URL_FRONTEND } from '../Url-config';
import Toast from 'react-bootstrap/Toast'
import ToastContainer from 'react-bootstrap/ToastContainer'
export default function Organisation(props) {
    const [errors, setErrors] = useState(false)
    const [orgList, setOrgList] = useState([])

    var paramId = useParams().id
    var propsId = props.orgIdForAdmin
    var id = propsId;
    if (!propsId) {

        id = paramId;
    }
    // id = useParams().id;
    const [homeDetails, setHomeDetails] = useState({ id: id });
    const [showSpinner, setshowSpinner] = useState(false);
    const toggleshowSpinner = () => setshowSpinner(!showSpinner);

    useEffect(() => {
        // toggleshowSpinner()
        // if(sessionStorage.getItem("userType")==='organization'){
        //     if(JSON.parse(sessionStorage.getItem("OtherOrgId")).findIndex(String(paramId))==-1){
        //       return window.location.href = BASE_URL_FRONTEND;  
        //     }
        //   }
        if (sessionStorage.getItem("userType") != 'organization' && sessionStorage.getItem("userType") != 'admin') {
            alert("Sorry.Access Not Permitted")
            return window.location.href = BASE_URL_FRONTEND;

        }

        else {
            if (sessionStorage.getItem("userType") === 'organization') {
                let tempArr = (JSON.parse(sessionStorage.getItem("OtherOrgId")))
                let flag = 0
                for (var i = 0; i < tempArr.length; i++) {
                    if (tempArr[i] == String(paramId)) {
                        flag = 1
                        break
                    }

                }
                if (flag == 0)
                    return window.location.href = BASE_URL_FRONTEND;

            }
            console.log(JSON.parse(sessionStorage.getItem("OtherOrgId")))

            if (sessionStorage.getItem("userType") === 'admin') {
                setOrgList(["admin"], ...orgList)
            }
            else {
                setOrgList(JSON.parse(sessionStorage.getItem("OtherOrgId")), ...orgList)
            }
            console.log(orgList)
            setshowSpinner(true)
            const gethomeDetailsUrl = BASE_API_URL + "orgnization/getOrganisationDetails/" + id
            axios.get(gethomeDetailsUrl)
                .then(res => {
                    //console.log(res.data[0]);
                    if (res != 'Something went wrong!' || res != 'No Home Found!')
                        setHomeDetails(res.data[0])
                    else
                        setHomeDetails([])
                    setshowSpinner(false)
                    // toggleshowSpinner()
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }, [id])


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
        if (homeDetails.org_name && homeDetails.contact_firstName && homeDetails.contact_lastName && homeDetails.phone_no && homeDetails.email_id) {
            toggleshowSpinner()
            setErrors(false)
            axios.put(BASE_API_URL + "orgnization/editOrgDetails", homeDetails)
                .then(res => {
                    console.log(res);
                    setshowSpinner(false)
                })
                .catch(err => {
                    console.log(err);
                })
        }
        else {
            setErrors(true);
        }

    }

    function changeOrganisation(event) {
        console.log(event.target.value)
        return window.location.href = BASE_URL_FRONTEND + "organisation/" + String(event.target.value);
    }


    return (

        <div style={{ marginTop: "10vh" }} >
            <div>
                {orgList[0] === 'admin' ? (
                    <div></div>
                ) : (
                    <Form>
                        <Form.Group className="mb-2 col-xs-6" controlId="formBasicEmail">
                            <Form.Label>Select an Organisation</Form.Label>
                            <Form.Select style={{ width: "25%" }} aria-label="Default select example" onChange={(e) => {
                                changeOrganisation(e);
                            }} >
                                <option>Select</option>
                                {orgList.map((item, _id) => {
                                    return <option value={item}>
                                        {item}
                                    </option>
                                })}
                            </Form.Select>
                        </Form.Group>
                    </Form>
                )}
            </div>


            {/* <h1>Organisation : {id} </h1> */}
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
                            <div>
                                {errors ? (
                                    <p className="text-danger">*All fields are mandatory</p>

                                ) : (
                                    <p className="text-danger"></p>

                                )}
                            </div>
                            <Button onClick={(e) => {
                                saveOrgText(e, 'det1');
                            }} variant="warning" >
                                Save Changes
                            </Button>
                        </Form>
                    </div>


                </Tab>
                <Tab eventKey="trainStandard" title="Training Standard">
                    <TrainStandardComponent id={id} />

                </Tab>
                <Tab eventKey="organistionList" title="Homes List" >
                    <OrganisationListComponent id={id} />
                </Tab>
                {/* <Tab eventKey="homeCheckList" title="Home CheckList Component" >
                    <HomeCheckListComponent />
                </Tab> */}

                <Tab eventKey="auditReport" title="Audit Report" >
                    <OrganizationAuditTabs organizationID={id} />
                </Tab>
            </Tabs></div>)

}