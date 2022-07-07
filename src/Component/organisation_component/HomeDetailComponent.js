
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
    var propsOrgId = props.orgId;
    var paramId = useParams().id
    var propsId = props.homeIdFprAdmin
    var params = propsId;
    if (!propsId) {

        params = paramId;
    }
    const [homeDetails, setHomeDetails] = useState({ id: params });
    const [homeList, setHomeList] = useState([])
    const [errors, setErrors] = useState(false)


    useEffect(() => {
        if (sessionStorage.getItem("userType") != 'organization' && sessionStorage.getItem("userType") != 'admin' && sessionStorage.getItem("userType") != 'home' && sessionStorage.getItem("homeId") != params) {
            alert("Sorry.Access Not Permitted")
            return window.location.href = BASE_URL_FRONTEND;
            //alert("Sorry.Access Not Permitted")

        }
        if (sessionStorage.getItem("userType") === 'organization') {

            // console.log(JSON.parse(sessionStorage.getItem("OtherOrgId")))
            var flag = false;
            for (var i = 0; i < JSON.parse(sessionStorage.getItem("OtherHomeId")).length; i++) {
                if (String(paramId) == JSON.parse(sessionStorage.getItem("OtherHomeId"))[i]) {
                    console.log("found", String(paramId), JSON.parse(sessionStorage.getItem("OtherHomeId"))[i])
                    flag = true;
                    break;
                }
            }
            if (!flag) {
                alert("Sorry.Access Not Permitted")
                return window.location.href = BASE_URL_FRONTEND;
            }
        }
        if (sessionStorage.getItem("userType") === 'home') {

            // console.log(JSON.parse(sessionStorage.getItem("OtherOrgId")))
            var flag = false;
            for (var i = 0; i < JSON.parse(sessionStorage.getItem("OtherHomeId")).length; i++) {
                if (String(paramId) == JSON.parse(sessionStorage.getItem("OtherHomeId"))[i]) {
                    console.log("found", String(paramId), JSON.parse(sessionStorage.getItem("OtherHomeId"))[i])
                    flag = true;
                    break;
                }
            }
            if (!flag) {
                alert("Sorry.Access Not Permitted")
                return window.location.href = BASE_URL_FRONTEND;
            }
        }

        if (sessionStorage.getItem("userType") === 'admin') {
            setHomeList(["admin"], ...homeList)
        }
        else {
            setHomeList(JSON.parse(sessionStorage.getItem("OtherHomeId")), ...homeList)
        }
        console.log("home list", homeList)

        const gethomeDetailsUrl = BASE_API_URL + "orgnization/getHomeDetails/" + params
        axios.get(gethomeDetailsUrl)
            .then(res => {
                if (res == 'Something went wrong!' || res == 'No Home Found!')
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
        console.log(event.target.value)
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
        if (homeDetails.name && homeDetails.contact_firstName && homeDetails.contact_lastName && homeDetails.phone_no && homeDetails.email_id) {

            axios.put(BASE_API_URL + "orgnization/editHomeDetails", { homeDetails })
                .then(res => {
                    console.log(res);

                })
                .catch(err => {
                    console.log(err);
                })
        }
        else {
            setErrors(true);
        }
    }
    function changeHome(event) {
        console.log(event.target.value)
        return window.location.href = BASE_URL_FRONTEND + "home/" + String(event.target.value);
    }

    return (

        <div style={{ marginTop: "10vh" }} >
            {/* <h1>Home : {params} </h1> */}
            <div>
                {homeList[0] === 'admin' ? (
                    <div></div>
                ) : (
                    <Form>
                        <Form.Group className="mb-2 col-xs-6" controlId="formBasicEmail">
                            <Form.Label>Select a Home</Form.Label>
                            <Form.Select style={{ width: "25%" }} aria-label="Default select example" onChange={(e) => {
                                changeHome(e);
                            }} >
                                <option>Select</option>
                                {homeList.map((item, _id) => {
                                    return <option value={item}>
                                        {item}
                                    </option>
                                })}
                            </Form.Select>
                        </Form.Group>
                    </Form>
                )}
            </div>

            <div style={{ textAlign: "center", marginRight: "5%" }}>
                <Link style={{ marginRight: "1%" }} to={`/showStaff/${params}`}><Button variant="warning">View Staff Members</Button></Link>
                <Link to={`/checkList/${params}`}><Button variant="warning">View CheckList Component</Button></Link></div>
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
                    <div>
                        {errors ? (
                            <p className="text-danger">*All fields are mandatory</p>

                        ) : (
                            <p className="text-danger"></p>

                        )}
                    </div>
                    <Button
                        onClick={saveHomeText}
                        variant="warning"  >
                        Save Changes
                    </Button>
                </Form>
            </div>
        </div>)

}