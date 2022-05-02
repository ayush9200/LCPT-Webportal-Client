
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

    const radios = [
        { name: 'True', value: '1' },
        { name: 'False', value: '2' },

    ];
    useEffect(() => {
        getInitialData()
     
          
    }, [])
    function getInitialData(){
        const getCoursesUrl = "http://localhost:5000/orgnization/getCourseList/"
        axios.get(getCoursesUrl)
            .then(res => {
                setCourseList(res.data)
                console.log(courseList);
            })
            .catch(err => {
                console.log(err);
            })
        const getCheckListUrl = "http://localhost:5000/orgnization/showHomeCheckList/" + params
        axios.get(getCheckListUrl)
            .then(res => {
                console.log(res.data)
                setRoleDetails(res.data)
               
                console.log(roleDetails);
               
        
            })
            .catch(err => {
                console.log(err);
            })
    }

    function handleCheckOnChange(event,courseDetail,roleDetail,id){
        console.log(event.target.checked,courseDetail,roleDetail,id)
        var tempArray = roleDetails;
        if(event.target.checked)
        tempArray[id].course_details.push({"id":courseDetail.courseID,"details":courseDetail.title})
        else
        tempArray[id].course_details = tempArray[id].course_details.filter(function(el) { return el.id != courseDetail.courseID; }); 
        setRoleDetails(tempArray)
        console.log(roleDetails)
        const editCourseDetails = "http://localhost:5000/orgnization/editCourseDetails/" 

        axios.put(editCourseDetails,roleDetail)
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
    function createRole(event,roleDetailObj){
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
    function changeArchiveStatus(event, id) {
        console.log("id: ", id, " ", event.target.value)
    }
    function getMicrodetails(event, val) {
       // console.log(roleDetails[id].course_details[_id])
        setDispMicroCred(val);
        handleshowMicroCred()

    }
    function changeArchiveStatus(event, role_id) {
        console.log(role_id, " roleid")
        const archiveStatusUrl = "http://localhost:5000/orgnization/editRoleArchiveStatus"
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
    function getNewRole(event,data){

        handleCloseOption()
        console.log(globalRole)
        const addNewRoleUrl = "http://localhost:5000/orgnization/addCheckListRole/" 
        axios.put(addNewRoleUrl,globalRole)
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
    function addRoleText(event,id){
        var tempObj = globalRole;
        tempObj.role_name = event.target.value;
        tempObj.role_id = String(roleDetails.length+3);
        delete tempObj._id;

        setGlobalRole(tempObj)

    }

    return (
        <div style={{ marginTop: "10vh" }}>
            <h1>Home CheckList Component Details</h1>
            <Table striped bordered hover>
                <thead>
                    <th></th>
                    {roleDetails.map((data, id) => {
                        return <th key={id}>
                            
                            <Button variant="warning" style={{marginTop:"2%"}} onClick={(e) => {
                                            createRole(e, data);
                                        }}>Create Role</Button>
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
                            {/* <Button variant="warning" style={{marginTop:"2%"}} onClick={(e) => {
                                            getMoreOptions(e, data);
                                        }}>More Options</Button> */}
                            <Button variant="warning"><Link to={`/roleTemplate/${data.home_id}/${data.role_id}`}>View Role</Link></Button>
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
                                <p><b>{data.role_name}</b></p>
                            
                                
                        </th>
                    })
                    }


                </thead>

                {courseList.map((courses, id) => {
                    return <tr key={id}>
                        <td><b>{courses.title}</b><div><Button style={{ marginBottom: "5px" }} variant="warning" onClick={(e) => {
                                    getMicrodetails(e, courses.title);
                                }} >View MicroCred Details</Button>
                                    <Modal show={MicroCredShow} onHide={handleCloseMicroCred}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>View MicroCred Details</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            This will contain MicroCred Details for {dispMicroCred}

                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" >
                                                Close
                                            </Button>
                                            <Button variant="primary" >
                                                Save Changes
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                </div></td>
                        {roleDetails.map((data, _id) => {
                            return <td key={_id}>
                                <input
                                    type="checkbox" style={{transform: "scale(2)",marginLeft:"20%"}}
                                  
                                defaultChecked={(roleDetails[_id].course_details.find(item=>
                                    item.id == courseList[id].courseID
                                )!=undefined)}
                                onChange={(e) => {
                                    handleCheckOnChange(e, courses,data,_id);
                                }}
                                  
                                />

                                
                            </td>


                        })
                        }
                    </tr>
                })}

                {/* </thead> */}

                {/* <thead>
                    <tr>
                        <th>S.R.</th>
                        <th>Position Title</th>
                        <th>Archive Status</th>
                        <th>Role Template</th>
                        <th>Courses Mandatory</th>
                        <th>Action</th>
                        

                    </tr>
                </thead>



                {roleDetails.map((data, id) => {
                    return <tbody key={id}>
                        <tr >
                            <td>{id + 1}</td>
                            <td>{data.role_name}</td>
                            <td>
                               
                                <Form>
                                    <Form.Group className="mb-2 col-xs-6" controlId="formBasicEmail">
                                        <Form.Select aria-label="Default select example" defaultValue={data.archived} onChange={(e) => {
                                            changeArchiveStatus(e, data.role_id);
                                        }}>
                                            <option value="True" >True</option>
                                            <option value="False"> False</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Form>
                            </td>
                            <td><Link to={`/roleTemplate/${data.home_id}/${data.role_id}`}><Button style={{ marginBottom: "5px" }} variant="warning" >View Template</Button></Link></td>


                            <td>{data.course_details.map((courseData, _id) => { return <li style={{ marginBottom: "15px", marginTop: "10px" }} >{courseData.details}</li> })}</td>
                            <td>{data.course_details.map((courseData, _id) => {
                                return <div><Button style={{ marginBottom: "5px" }} variant="warning" onClick={(e) => {
                                    getMicrodetails(e, courseData, _id, id);
                                }} >View MicroCred Details</Button>
                                    <Modal show={MicroCredShow} onHide={handleCloseMicroCred}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>View MicroCred Details</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            This will contain MicroCred Details for {dispMicroCred.details}

                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" >
                                                Close
                                            </Button>
                                            <Button variant="primary" >
                                                Save Changes
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                </div>
                            })}</td>

                        </tr>
                    </tbody>
                })} */}

            </Table>
            {/* )} */}
        </div>);
}