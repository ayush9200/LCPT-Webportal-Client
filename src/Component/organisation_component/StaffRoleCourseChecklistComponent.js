import './organisation.css';
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Form from 'react-bootstrap/Form';
import ToastHeader from 'react-bootstrap/ToastHeader'
import Toast from 'react-bootstrap/Toast'
import ToastContainer from 'react-bootstrap/ToastContainer'
import ToastBody from 'react-bootstrap/ToastBody'
import Spinner from 'react-bootstrap/Spinner'
import { BASE_API_URL } from '../Url-config';
import { BASE_URL_FRONTEND } from '../Url-config';
import { Tabs, Tab } from 'react-bootstrap'

export default function StaffRoleCourseChecklistComponent() {


    const [showSpinner, setshowSpinner] = useState(false);
    const { userId, homeId } = useParams();
    const [staffRoleDetails, setStaffRoleDetails] = useState([]);
    const [courseListDetails, setCourseListDetails] = useState([]);
    const [showTemplate, setShowTemplate] = useState({});
    const [showTemplateDetails, setShowTemplateDetails] = useState(false)
    //const [homeId, sethomeId] = useState({});
    //const [userId, setuserId] = useState({});
    const [orgId, setorgId] = useState({});
    // const [showNotification, setshowNotification] = useState(false);
    // const toggleshowNotification = () => setshowNotification(!showNotification);
    // var [notificationText, setNotificationText] = useState("");
    const [newStaffRole, setNewStaffRole] = useState("");

    useEffect(() => {
        if (sessionStorage.getItem("userType") != 'organization' && sessionStorage.getItem("userType") != 'admin' && sessionStorage.getItem("userType") != 'home') {
            alert("Sorry.Access Not Permitted")
            return window.location.href = BASE_URL_FRONTEND;

        }
        // console.log(JSON.parse(sessionStorage.getItem("OtherOrgId")))
        if (sessionStorage.getItem("userType") === 'organization') {

            var flag = false;
            for (var i = 0; i < JSON.parse(sessionStorage.getItem("OtherHomeId")).length; i++) {
                if (String(homeId) == JSON.parse(sessionStorage.getItem("OtherHomeId"))[i]) {
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

            var flag = false;
            for (var i = 0; i < JSON.parse(sessionStorage.getItem("OtherHomeId")).length; i++) {
                if (String(homeId) == JSON.parse(sessionStorage.getItem("OtherHomeId"))[i]) {
                    console.log("found", String(homeId), JSON.parse(sessionStorage.getItem("OtherHomeId"))[i])
                    flag = true;
                    break;
                }
            }
            if (!flag) {
                alert("Sorry.Access Not Permitted")
                return window.location.href = BASE_URL_FRONTEND;
            }
        }
        if(sessionStorage.getItem("userType")==='organization'){           
             var flag=false;
             for(var i = 0;i<JSON.parse(sessionStorage.getItem("OtherHomeId")).length;i++){
                 if(String(homeId)==JSON.parse(sessionStorage.getItem("OtherHomeId"))[i]){
                     flag=true;
                     break;
                 }
             }
             if(!flag){
                alert("Sorry.Access Not Permitted")
                 return window.location.href = BASE_URL_FRONTEND;
             }
           }
        getStaffRoleData();
        // getCourseListByUser();



    }, [])

    function getStaffRoleData() {
        setshowSpinner(true)

        // console.log(params)
        const getStaffCourseRoleCheckListUrl = BASE_API_URL + "orgnization/getStaffCourseRoleCheckList/" + userId + "/" + homeId

        axios.get(getStaffCourseRoleCheckListUrl)
            .then(res => {
                console.log(res)

                // setStaffRoleDetails(data=>([...data,...res.data]))
                setStaffRoleDetails(res.data)

                console.log(staffRoleDetails);
                if (staffRoleDetails)
                    setshowSpinner(false)
                //sethomeId(res.data[0].home_id)
                //  setorgId(res.data[0].org_id)
                //setuserId(String(res.data.length + 1))
            })
            .catch(err => {
                console.log(err);
            })
        // var arr = []
        // const courseListUrl = BASE_API_URL + "orgnization/userCompletedCourses/" + userId
        // axios.get(courseListUrl)
        //     .then(res => {
        //         if (res != 'Something went wrong!' || res != 'No Role Found!') {
        //             //setshowSpinner(false)
        //             // setCourseListDetails(data=>([...data,...res.data]))
        //             setCourseListDetails(res.data)

        //             if (courseListDetails)
        //                 setshowSpinner(false)
        //             arr = res.data
        //             console.log(res.data, courseListDetails, staffRoleDetails);
        //         }

        //     })
        //     .catch(err => {
        //         console.log(err);
        //     })
        if (staffRoleDetails != [] ) {
            setTimeout(setShowTemplateDetails(true), 1000)


        }
    }
    function getCourseListByUser() {

    }
    function setArhiveStatus(role_id,id){
console.log(role_id,id)
axios.put(BASE_API_URL + "orgnization/setArchiveStatus/" ,{home_id:homeId,user_id:userId,role_id:role_id,id:id})
.then(res => {
    console.log(res)
    
})
.catch(err => {
    console.log(err);
})
    }

    return (
        <div className='org-container'>
            {showSpinner ? <div style={{ paddingLeft: "50%", paddingTop: "10%", position: "absolute" }}>
                <Spinner show={showSpinner} animation="border" size="lg" variant='primary' />

            </div> : <div></div>}
            {!showTemplateDetails ? (
                <div></div>
            ) : (

                <div style={{ width: "100%" }}>
                    <h1>Course Requirments for roles of user : {userId}</h1>
                    <div>
                        <Tabs  id="uncontrolled-tab-example" className="mb-3" fill>
                        {staffRoleDetails.map((data, id) => {
                            return (
                                
                                    <Tab eventKey={data.role_id} title={data.role_name} key={id}>
                                    <h2>Courses completion Status: {data.course_status}</h2>
                                    {/* <h2>Role Status: {data.emp_status}</h2> */}

                                    <Table style={{width:"80%"}} id={id}>
                                        <thead>
                                            <th>Course ID</th>
                                            <th>Course Title</th>
                                            <th style={{ textAlign: "center" }}>{data.role_name}</th>
                                        </thead>

                                        {data.course_details.map((item, _id) => {
                                            return (
                                                <tr>
                                                    <td>{item.id}</td>
                                                    <td>{item.details}</td>
                                                    <td> <input
                                                        type="checkbox" style={{ transform: "scale(1.5)", marginLeft: "50%" }}
                                                        defaultChecked={item.isComp} disabled
                                                    /></td>
                                                </tr>
                                            )

                                        })
                                        }


                                    </Table>
                                     <ReactHTMLTableToExcel
                                        id="test-table-xls-button"
                                        className="download-table-xls-button btn btn-dark mb-3"
                                        table={id}
                                        filename="tablexls"
                                        sheet="tablexls"
                                        buttonText="Download In Excel" />

                                        <Button style={{marginTop:"-1%",marginLeft:"3%"}} variant='warning' onClick= {(e) => {
                                            {setArhiveStatus(data.role_id,id)}
                                        }}
                                        >Archive Role</Button>
                                    </Tab>
                                   
                                


                            )


                        })
                        }
                        </Tabs>
                    </div>
                </div>
            )
            }



        </div>);
}

