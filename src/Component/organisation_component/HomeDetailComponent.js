
import './organisation.css';
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { BASE_API_URL } from '../Url-config';
import { BASE_URL_FRONTEND } from '../Url-config';
export default function HomeDetailComponent(props) {
    // const params = useParams().id;
    var paramId = useParams().id
    var propsId = props.homeIdFprAdmin
    var params = propsId;
    if (!propsId) {

        params = paramId;
    }
    const [homeDetails, setHomeDetails] = useState({ id: params });


    useEffect(() => {
        if(sessionStorage.getItem("userType")!='organization' && sessionStorage.getItem("userType")!='admin' && sessionStorage.getItem("userType")!='home' && sessionStorage.getItem("homeId")!=params)
        {
            return window.location.href = BASE_URL_FRONTEND;  
        
        }

        const gethomeDetailsUrl = BASE_API_URL+"orgnization/getHomeDetails/" + params
        axios.get(gethomeDetailsUrl)
            .then(res => {
                if (res == 'Something went wrong!'||res == 'No Home Found!')
                    console.log("No data")
                else {
                    console.log(res.data[0]);
                    setHomeDetails(res.data[0])
                }

            })
            .catch(err => {
                console.log(err);
            })
    }, [params])


    function changeHomeText(event, id) {
        let newHomeDetailObj = {};
        newHomeDetailObj = { ...homeDetails };
        if (id === 'det1')
            newHomeDetailObj.name = event.target.value;
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
    function saveHomeText() {
        console.log("In saveText")
        console.log(homeDetails)
        axios.put(BASE_API_URL+"orgnization/editHomeDetails", { homeDetails })
            .then(res => {
                console.log(res);

            })
            .catch(err => {
                console.log(err);
            })
    }


    return (

        <div style={{ marginTop: "8vh" }} >
            {/* <h1>Home : {params} </h1> */}
            <div style={{ textAlign: "center", marginRight: "5%" }}>
                <Button variant="warning" style={{ marginRight: "1%" }}
                ><Link to={`/showStaff/${params}`}>View Staff Members</Link></Button>
                <Button variant="warning"
                ><Link to={`/checkList/${params}`}>View CheckList Component</Link></Button></div>
            <div className='org-container'>
                <Form>
                    <Form.Group className="mb-2 col-xs-6" controlId="formBasicEmail">
                        <Form.Label>Home Name</Form.Label>
                        <Form.Control type="text"
                            defaultValue={homeDetails.name} onChange={(e) => {
                                changeHomeText(e, 'det1');
                            }}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3 col-xs-6" controlId="formBasicEmail">
                        <Form.Label>Home ID</Form.Label>
                        <Form.Control type="text"
                            defaultValue={homeDetails.home_id} disabled
                        />
                    </Form.Group>
                    <Form.Group className="mb-3 col-xs-6" controlId="formBasicEmail">
                        <Form.Label>Contact First-Name</Form.Label>
                        <Form.Control type="text"
                            defaultValue={homeDetails.contact_firstName} onChange={(e) => {
                                changeHomeText(e, 'det2');
                            }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3 col-xs-6" controlId="formBasicEmail">
                        <Form.Label>Contact Last-Name</Form.Label>
                        <Form.Control type="text"
                            defaultValue={homeDetails.contact_lastName} onChange={(e) => {
                                changeHomeText(e, 'det3');
                            }}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3 col-xs-6" controlId="formBasicEmail">
                        <Form.Label>Contact Number</Form.Label>
                        <Form.Control type="text"
                            defaultValue={homeDetails.phone_no} onChange={(e) => {
                                changeHomeText(e, 'det4');
                            }}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3 col-xs-6" controlId="formBasicEmail">
                        <Form.Label>Contact Email</Form.Label>
                        <Form.Control type="text"
                            defaultValue={homeDetails.email_id} onChange={(e) => {
                                changeHomeText(e, 'det5');
                            }}
                        />
                    </Form.Group>
                    <Button
                        onClick={saveHomeText}
                        variant="warning"  >
                        Save Changes
                    </Button>
                </Form>
            </div>
        </div>)

}