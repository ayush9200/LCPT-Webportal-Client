
import './organisation.css';
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner'
import { BASE_API_URL } from '../Url-config';
import { BASE_URL_FRONTEND } from '../Url-config';
export default function HomeCheckListComponent() {
    const [MicroCredShow, setMicroCredShow] = useState(false);
    const handleCloseMicroCred = () => setMicroCredShow(false);
    const handleshowMicroCred = () => setMicroCredShow(true);
    const [showOption, setShowOption] = useState(false);
    const handleCloseOption = () => setShowOption(false);
    const handleShowOption = () => setShowOption(true);
    const params = useParams().id;
    const [roleDetails, setRoleDetails] = useState([]);
    const [radioValue, setRadioButtonValue] = useState([]);
    const [dispMicroCred, setDispMicroCred] = useState('');
    const [courseList, setCourseList] = useState([]);
    const [radio2Value, setRadio2Value] = useState([]);
    const [counter, setCounter] = useState(0);
    const [globalRole, setGlobalRole] = useState({});
    const [loading, setLoading] = useState(false);
    const [showSpinner, setshowSpinner] = useState(false);
    const toggleshowSpinner = () => setshowSpinner(!showSpinner);

    const radios = [
        { name: 'True', value: '1' },
        { name: 'False', value: '2' },

    ];
    useEffect(() => {
        if(sessionStorage.getItem("userType")!='organization' && sessionStorage.getItem("userType")!='admin' && sessionStorage.getItem("userType")!='home' && sessionStorage.getItem("homeId")!=params)
        {
            alert("Sorry.Access Not Permitted")
            return window.location.href = BASE_URL_FRONTEND;  
        
        }
        if(sessionStorage.getItem("userType")==='organization'){
           
            // console.log(JSON.parse(sessionStorage.getItem("OtherOrgId")))
             var flag=false;
             for(var i = 0;i<JSON.parse(sessionStorage.getItem("OtherHomeId")).length;i++){
                 if(String(params)==JSON.parse(sessionStorage.getItem("OtherHomeId"))[i]){
                     flag=true;
                     break;
                 }
             }
             if(!flag){
                 return window.location.href = BASE_URL_FRONTEND;
             }
           }
           if(sessionStorage.getItem("userType")==='home'){
           
            // console.log(JSON.parse(sessionStorage.getItem("OtherOrgId")))
             var flag=false;
             for(var i = 0;i<JSON.parse(sessionStorage.getItem("OtherHomeId")).length;i++){
                 if(String(params)==JSON.parse(sessionStorage.getItem("OtherHomeId"))[i]){
                     console.log("found",String(params),JSON.parse(sessionStorage.getItem("OtherHomeId"))[i])
                     flag=true;
                     break;
                 }
             }
             if(!flag){
                 return window.location.href = BASE_URL_FRONTEND;
             }
           }
        
            getInitialData()
        


    }, [])
    function getInitialData() {
        setshowSpinner(true)
        const getCoursesUrl = BASE_API_URL+"orgnization/getCourseList/"
        axios.get(getCoursesUrl)
            .then(res => {
                if(res!='Something went wrong!'||res!='No Course Found!'){
                    setshowSpinner(false)
                    setCourseList(res.data)
                    console.log(courseList);
                }
               
            })
            .catch(err => {
                console.log(err);
            })
        const getCheckListUrl = BASE_API_URL+"orgnization/showHomeCheckList/" + params
        axios.get(getCheckListUrl)
            .then(res => {
                
                console.log(res.data)
                if(res!='Something went wrong!'||res!='No Role Found!'){
                    setRoleDetails(res.data)
                    setshowSpinner(false)

                    // var tableElement = document.getElementById('table-id');
                    // if(res.data.length>3){
                        
                    // }

                }

                console.log(roleDetails);


            })
            .catch(err => {
                console.log(err);
            })
    }

    function handleCheckOnChange(event, courseDetail, roleDetail, id) {
        console.log(event.target.checked, courseDetail, roleDetail, id)
        var tempArray = roleDetails;
        if (event.target.checked)
            tempArray[id].course_details.push({ "id": courseDetail.courseID, "details": courseDetail.title,"description":courseDetail.description })
        else
            tempArray[id].course_details = tempArray[id].course_details.filter(function (el) { return el.id != courseDetail.courseID; });
        setRoleDetails(tempArray)
        console.log(roleDetails)
        const editCourseDetails = BASE_API_URL+"orgnization/editCourseDetails/"

        axios.put(editCourseDetails, roleDetail)
            .then(res => {
                console.log(res.data)
                // setRoleDetails(res.data)

                // console.log(roleDetails);
                getInitialData()

            })
            .catch(err => {
                console.log(err);
            })

    }
    function createRole(event, roleDetailObj) {
        console.log(roleDetailObj)
        setGlobalRole(roleDetailObj)
        handleShowOption()

    }
    function setRadioValue(event, id) {
        console.log(event.target.value, "  ", id)
        var tempArray = [...radioValue];
        tempArray[id].value = event.target.value;
        setRadioButtonValue(tempArray)
        console.log(radioValue)

    }
    // function changeArchiveStatus(event, id) {
    //     console.log("id: ", id, " ", event.target.value)
    // }
    function getMicrodetails(event, val) {
        // console.log(roleDetails[id].course_details[_id])
        if(val.description)
        setDispMicroCred(val.description);
        else
        setDispMicroCred(val.title) 
        handleshowMicroCred()

    }
    function changeArchiveStatus(event, role_id) {
        console.log(role_id, " roleid")
        const archiveStatusUrl = BASE_API_URL+"orgnization/editRoleArchiveStatus"
        //var status = ""+event.target.value
        axios.put(archiveStatusUrl, { "role_id": String(role_id), "archived": String(event.target.value), "home_id": String(params) })
            .then(res => {
                console.log(res);
                // getStaffData();
                // setNotificationText("Staff Status was changed");
                // toggleshowNotification()
            })
            .catch(err => {
                console.log(err);
            })
    }
    function getNewRole(event, data) {

        handleCloseOption()
        console.log(globalRole)
        const addNewRoleUrl = BASE_API_URL+"orgnization/addCheckListRole/"
        axios.put(addNewRoleUrl, globalRole)
            .then(res => {
                // console.log(res.data)
                // setRoleDetails(res.data)

                // console.log(roleDetails);
                getInitialData()

            })
            .catch(err => {
                console.log(err);
            })

    }
    function addRoleText(event, id) {
        var tempObj = globalRole;
        tempObj.role_name = event.target.value;
        tempObj.role_id = String(roleDetails.length + 1);
        delete tempObj._id;

        setGlobalRole(tempObj)

    }

    return (
        <div style={{ marginTop: "10vh" }}>
            <h1>Home CheckList Component Details</h1>
            <div style={{overflowX:"scroll"}}>
            {showSpinner ? <div style={{ paddingLeft: "50%", paddingTop: "10%", position: "absolute" }}>
                            <Spinner show={showSpinner} animation="border" size="lg" variant='primary' />

                        </div> : <div></div>}


                <Table striped bordered hover style={{width:"300vh",height:"80vh",tableLayout:"fixed"}} id="table-id" className='table-responsive'>
                    <thead >
                        <th style={{width:"25vh"}}></th>
                        {roleDetails.map((data, id) => {
                            return <th key={id} style={{width:"25vh"}}>

                                <Button variant="warning" onClick={(e) => {
                                    createRole(e, data);
                                }} style={{ marginTop: "2%", marginRight:"3%",marginLeft:"3%", backgroundColor:"#ffc107" }} >Create Role</Button>
                                <Modal show={showOption} onHide={handleCloseOption}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Enter Role Name</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form>
                                            <Form.Group className="mb-2 col-xs-6" controlId="formBasicEmail">
                                                <Form.Label>Enter the Role Name</Form.Label>
                                                <Form.Control type="text"
                                                    onChange={(e) => {
                                                        addRoleText(e, 'hm1');
                                                    }}
                                                />

                                            </Form.Group>

                                        </Form>

                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleCloseOption} >
                                            Close
                                        </Button>
                                        <Button variant="primary" onClick={getNewRole} >
                                            Save Changes
                                        </Button>
                                    </Modal.Footer>
                                </Modal>

                                <Link  to={`/roleTemplate/${data.home_id}/${data.role_id}`}><Button style={{marginTop:"2%"}} variant="warning">View Role</Button></Link>
                                <p><Form>
                                    <Form.Group className="mb-2 col-xs-6" controlId="formBasicEmail">
                                        <Form.Label>Role Archive Status</Form.Label>
                                        {/* <p>Role Archive Status</p> */}
                                        <Form.Select aria-label="Default select example" defaultValue={data.archived} onChange={(e) => {
                                            changeArchiveStatus(e, data.role_id);
                                        }}>
                                            <option value="True" >True</option>
                                            <option value="False"> False</option>
                                        </Form.Select>

                                    </Form.Group>
                                </Form></p>
                                <p style={{textAlign:"center"}}><b>{data.role_name}</b></p>


                            </th>
                        })
                        }


                    </thead>

                    {courseList.map((courses, id) => {
                        return <tr key={id} >
                            <td style={{width:"25vh"}}><b>{courses.title}</b><div><Button style={{ marginBottom: "5px" }} variant="warning" onClick={(e) => {
                                getMicrodetails(e, courses);
                            }} >View MicroCred Details</Button>
                                <Modal show={MicroCredShow} onHide={handleCloseMicroCred}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>View MicroCred Details</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        {/* This will contain MicroCred Details for  */}
                                        {dispMicroCred}
                                    </Modal.Body>
                                    <Modal.Footer>
                                        {/* <Button variant="secondary" >
                                            Close
                                        </Button>
                                        <Button variant="primary" >
                                            Save Changes
                                        </Button> */}
                                    </Modal.Footer>
                                </Modal>
                            </div></td>
                            {roleDetails.map((data, _id) => {
                                return <td key={_id} style={{borderRight: "1px solid #000",borderLeft: "1px solid #000",width:"25vh"}}>
                                    <input
                                        type="checkbox" style={{ transform: "scale(2)", marginLeft: "50%" }}

                                        defaultChecked={(roleDetails[_id].course_details.find(item =>
                                            item.id == courseList[id].courseID
                                        ) != undefined)}
                                        onChange={(e) => {
                                            handleCheckOnChange(e, courses, data, _id);
                                        }}

                                    />

                                </td>
                            })
                            }
                        </tr>
                    })}
                </Table>
            </div>
        </div>);
}