import './organisation.css';
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form';
import ToastHeader from 'react-bootstrap/ToastHeader'
import Toast from 'react-bootstrap/Toast'
import ToastContainer from 'react-bootstrap/ToastContainer'
import ToastBody from 'react-bootstrap/ToastBody'
import { BASE_API_URL } from '../Url-config';
import { BASE_URL_FRONTEND } from '../Url-config';
export default function StaffComponent() {

    const params = useParams().id;
    const handleCloseStaff = () => setStaffShow(false);
    const handleShowStaff = () => setStaffShow(true);
    const handleClosePosition = () => setPositionShow(false);
    const handleShowPosition = () => setPositionShow(true);
    const [staffList, setStaffList] = useState([]);
    const [showStaff, setStaffShow] = useState(false);
    const [showAssignRole, setShowAssignRole] = useState(false);
    const handleCloseAssignRole = () => setShowAssignRole(false);
    const handleShowAssignRole = () => setShowAssignRole(true);
    const [staffDetail, setStaffDetail] = useState({});
    const [positionDetail, setPositionDetail] = useState({});
    const [assignRoleDetail, setAssignRoleDetail] = useState({});
    const [showPosition, setPositionShow] = useState(false);
    const [roleDetails, setRoleDetails] = useState([]);
    const [homeId, sethomeId] = useState({});
    const [userId, setuserId] = useState({});
    const [orgId, setorgId] = useState({});
    const [showNotification, setshowNotification] = useState(false);
    const toggleshowNotification = () => setshowNotification(!showNotification);
    var [notificationText, setNotificationText] = useState("");
    const [newStaffRole, setNewStaffRole] = useState("");

    useEffect(() => {
        if(sessionStorage.getItem("userType")!='organization' && sessionStorage.getItem("userType")!='admin' && sessionStorage.getItem("userType")!='home' && sessionStorage.getItem("homeId")!=params)
        {
            //setNotificationText("Sorry.Access Not Permitted")
            alert("Sorry.Access Not Permitted")
            return window.location.href = BASE_URL_FRONTEND;  
         
        }
        console.log(JSON.parse(sessionStorage.getItem("OtherOrgId")))
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
                alert("Sorry.Access Not Permitted")
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
                alert("Sorry.Access Not Permitted")
                 return window.location.href = BASE_URL_FRONTEND;
             }
           }
        // if(sessionStorage.getItem("userType")==='organization'){
        //     if(JSON.parse(sessionStorage.getItem("OtherOrgId")).findIndex(String(params))==-1){
        //       return window.location.href = BASE_URL_FRONTEND;  
        //     }
        //   }
        getStaffData();
        getRoleDetailByHome();

    }, [])

    function getStaffData() {
        console.log(params)
        const staffListUrl = BASE_API_URL+"orgnization/getStaffList/" + params
       
        axios.get(staffListUrl)
            .then(res => {
                console.log(res);
                setStaffList(res.data)
                sethomeId(res.data[0].home_id)
                //  setorgId(res.data[0].org_id)
                setuserId(String(res.data.length + 1))
            })
            .catch(err => {
                console.log(err);
            })
    }
    function getRoleDetailByHome() {
        const getCheckListUrl = BASE_API_URL+"orgnization/showHomeCheckList/" + params
        axios.get(getCheckListUrl)
            .then(res => {
                if(res != 'Something went wrong!'||res != 'No Role Found!')
                setRoleDetails(res.data)
                console.log(roleDetails);
            })
            .catch(err => {
                console.log(err);
            })
    }

    function addPositionText(event, id) {
        let newPositionDetailObj = {};
        newPositionDetailObj = { ...positionDetail };
        if (id === 'pos1')
            newPositionDetailObj.role_name = event.target.value;
        else if (id === 'pos2')
            newPositionDetailObj.role_id = event.target.value;
        newPositionDetailObj.home_id = homeId;

        setPositionDetail(newPositionDetailObj);
        console.log("position details:", positionDetail)


    }
    function savePositionDetail() {

        console.log("position details:", positionDetail)
        const savePositionUrl = BASE_API_URL+"orgnization/addNewPosition"
        axios.post(savePositionUrl, positionDetail)
            .then(res => {
                console.log(res);
                //setStaffList(res.data)
                handleClosePosition()
                getStaffData()

                setNotificationText("New Role was added");
            })
            .catch(err => {
                console.log(err);
            })
    }

    function addStaffText(event, id) {
    
        var newStaffDetailObj = {} 
        if (id === 'st1')
            newStaffDetailObj.user_id = event.target.value;
        else if (id === 'st2')
            newStaffDetailObj.user_name = (event.target.value)
        else if (id === 'st3')
            newStaffDetailObj.dob = event.target.value;
        else if (id === 'st4'){
             newStaffDetailObj.role_id = (roleDetails.find(item => item.role_name === event.target.value)).role_id;
            newStaffDetailObj.role_name = event.target.value;

        }
       

        newStaffDetailObj.emp_status = 'Active'
        newStaffDetailObj.home_id = (String(params));
        setStaffDetail(staffDetail => ({
            ...staffDetail, ...newStaffDetailObj
        }));

        //setStaffDetail(...staffDetail,newStaffDetailObj);
        console.log("staff details:", staffDetail)


    }
    function saveStaffDetail() {
        console.log(staffDetail)
        if(staffDetail.user_id && staffDetail.role_name && staffDetail.dob && staffDetail.user_name){
            const staffListUrl = BASE_API_URL+"orgnization/addNewStaff"
            console.log(staffDetail)
            axios.post(staffListUrl, staffDetail)
                .then(res => {
                    console.log(res);
                    //setStaffList(res.data)
                    handleCloseStaff()
                    getStaffData()
    
                    setNotificationText("New Staff Member was added");
                })
                .catch(err => {
                    console.log(err);
                })
            }
    }

    function changeEmpStatus(event,userId,data, id) {
        //console.log(event.target.value," for ",id)
        console.log("event log",event.target.value,userId,data,id)
        var role_array  = data.role_arr
        role_array[id].emp_status = event.target.value
        const staffStatusUrl = BASE_API_URL+"orgnization/editStaffStatus"
        //var status = ""+event.target.value
        axios.put(staffStatusUrl, { "role_arr": role_array, user_id:String(userId), home_id:String(params) })
            .then(res => {
                console.log(res);
                getStaffData();
                setNotificationText("Staff Status was changed");
                toggleshowNotification()
            })
            .catch(err => {
                console.log(err);
            })
    }
    function addAssignRoleText(event,user_id,home_id,staffId) { 
        if(event.target.value!=-1){
            var newAssignRoleObj = {};
            newAssignRoleObj.home_id = home_id
            newAssignRoleObj.user_id = user_id
    
            newAssignRoleObj.role_arr = staffList[staffId].role_arr
            console.log(newAssignRoleObj.role_arr)
            var temp_role_id = roleDetails[event.target.value].role_id
            var temp_role_name = roleDetails[event.target.value].role_name
    
            if (newAssignRoleObj.role_arr.findIndex((item) => item.role_id === temp_role_id) === -1) {
                newAssignRoleObj.role_arr.push({ "role_id": temp_role_id, "role_name": temp_role_name })
            }
            var temp_roleArray = newAssignRoleObj.role_arr
            temp_roleArray.filter((v, i, a) => a.findIndex(v2 => (v2.role_name === v.role_name)) === i)
    
            saveAssignRoleDetail(newAssignRoleObj)
    
        }
       
    }
    function saveAssignRoleDetail() {
        if(positionDetail){
            const staffListUrl = BASE_API_URL+"orgnization/addNewStaff"
            console.log(positionDetail)
            axios.post(staffListUrl, positionDetail)
                .then(res => {
                    console.log(res);
                    //setStaffList(res.data)
                    setShowAssignRole(false)
                    getStaffData()
    
                    setNotificationText("New Role was assigned");
                })
                .catch(err => {
                    console.log(err);
                })
            }
    }
    function addStaffRole(event,user_id,home_id,dob){
        console.log(roleDetails[event.target.value],user_id,home_id,dob)
        let newPositionDetailObj = {};
        newPositionDetailObj = { ...positionDetail };
        newPositionDetailObj.role_id = roleDetails[event.target.value].role_id
        newPositionDetailObj.role_name = roleDetails[event.target.value].role_name
        setPositionDetail(newPositionDetailObj)

    }
    function assignUserRole(event){

        console.log(event.target.value)
        setNewStaffRole(state=>{
            return event.target.value
        })
    }
    function openAssignRole(e,data){
        let newPositionDetailObj = {};
        newPositionDetailObj = { ...positionDetail };
        newPositionDetailObj.user_name = data.user_name
        newPositionDetailObj.user_id = data.user_id
        newPositionDetailObj.home_id = String(params)
        newPositionDetailObj.dob = data.dob


        console.log(data)
        setPositionDetail(newPositionDetailObj)
        handleShowAssignRole()
    }

    return (
        <div className='org-container'>


            <div md={6} className="mb-2">
                {/* <Button onClick={toggleshowNotification} className="mb-2">
          Toggle Toast <strong>with</strong> Animation
        </Button> */}
                <ToastContainer className="p-3" position={'middle-end'}>
                    <Toast show={showNotification} onClose={toggleshowNotification} >
                        <Toast.Header>
                            <strong className="me-auto">LCPT Notification</strong>

                        </Toast.Header>
                        <Toast.Body>{notificationText}</Toast.Body>
                    </Toast>
                </ToastContainer>
            </div>

            <h1>Staff Members for Home : {params}</h1>
            {/* <Button style={{ float: "right", marginRight: "1%", marginBottom: "1%" }} variant="warning" onClick={handleShowPosition}>Add Position</Button> */}

            <Button style={{ float: "right", marginRight: "1%", marginBottom: "1%" }} variant="warning" onClick={handleShowStaff}>Add Staff</Button>
            <Modal show={showPosition} onHide={handleClosePosition}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Position</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-2 col-xs-6" controlId="formBasicEmail">
                            <Form.Label>Enter the Position Name</Form.Label>
                            <Form.Control type="text"
                                onChange={(e) => {
                                    addPositionText(e, 'pos1');
                                }}
                            />
                            <Form.Label>Enter the Position ID</Form.Label>
                            <Form.Control type="text"
                                onChange={(e) => {
                                    addPositionText(e, 'pos2');
                                }}
                            />

                        </Form.Group>

                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseStaff}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={savePositionDetail}  >
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showStaff} onHide={handleCloseStaff}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Staff Member</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-2 col-xs-6" controlId="formBasicEmail">
                            <Form.Label>Enter the User ID</Form.Label>
                            <Form.Control type="text"
                                onChange={(e) => {
                                    addStaffText(e, 'st1');
                                }}
                            />
                            <Form.Label>Enter the User Name</Form.Label>
                            <Form.Control type="text"
                                onChange={(e) => {
                                    addStaffText(e, 'st2');
                                }}
                            />
                                <Form.Label>Select the Role for User</Form.Label>
                                    <Form.Select style={{width:"85%"}} aria-label="Default select example" onChange={(e) => {
                                        addStaffText(e, 'st4');
                                    }} >
                                        <option value={""}>Select a Role</option>
                                        {roleDetails.map((item, _id) => {
                                            return <option value={item.role_name}>
                                                {item.role_name}
                                            </option>
                                        })}
                                    </Form.Select>
                              
                            {/* <Form.Label>Enter the Employee Role ID</Form.Label>
                            <Form.Control type="text"
                                onChange={(e) => {
                                    addStaffText(e, 'st2');
                                }}
                            /> */}
                            {/* <Form.Label>Enter the Employee Role Name</Form.Label>
                            <Form.Control type="text"
                                onChange={(e) => {
                                    addStaffText(e, 'st4');
                                }}
                            /> */}
                            <Form.Label>Enter the Date of Birth(YYYY-MM-DD)</Form.Label>
                            <Form.Control type="date" style={{width:"85%"}}
                                onChange={(e) => {
                                    addStaffText(e, 'st3');
                                }}
                            />


                            {/* <Form.Label>Enter the Email-ID</Form.Label>
                            <Form.Control type="text"
                                onChange={(e) => {
                                    addStaffText(e, 'st5');
                                }} 
                            />
                            <Form.Label>Enter the Employment Status</Form.Label>

                            <Form.Select aria-label="Default select example" onChange={(e) => {
                                addStaffText(e, 'st4');
                            }} >
                                <option>Select From Below Option</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                                <option value="Pending">Pending</option>
                            </Form.Select>*/}
                        </Form.Group>

                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseStaff}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={saveStaffDetail} >
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>S.N.</th>
                        <th>Employee Name</th>
                        <th>Role</th>
                        <th>Role Status</th>
                        <th>Date of Birth</th>
                        {/* <th>Assign Role to Staff Member</th> */}
                        {/* <th>Assign Role</th> */}

                    </tr>
                </thead>



                {staffList.map((data, id) => {
                    return <tbody key={id}>
                        <tr >
                            <td>{id + 1}</td>
                            <td><Link to={`/getStaffCourseRoleCheckList/${data.user_id}/${data.home_id}`}>{data.user_name}</Link></td>
                            {/* <td>{data.role_name}</td> */}
                            <td><ul>{data.role_arr.map((val, _id) => {
                                return <li key={_id}>
                                    {val.role_name}
                                </li>


                            })
                            }
                            {/* <li></li> */}
                            </ul>
                            <p style={{color:"blue",cursor:"pointer"}} onClick={(e) => {
                                        openAssignRole(e, data);
                                    }}>+ Assign New Role</p>
                           
                           <Modal show={showAssignRole} onHide={handleCloseAssignRole}>
                <Modal.Header closeButton>
                    <Modal.Title>Assign Position</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-2 col-xs-6" controlId="formBasicEmail">
                            <Form.Label>Staff Name</Form.Label>
                            <Form.Control type="text"
                            readOnly
                           
                            value={positionDetail.user_name} 
                            />
                            <Form.Label>Staff User Id </Form.Label>
                            <Form.Control type="text"
                            value={positionDetail.user_id} readOnly
                            />
                            <Form.Label>Role Name</Form.Label>
                            <Form.Select aria-label="Default select example" style={{width:"85%"}}
                             onChange={(e) => {
                                        addStaffRole(e, positionDetail.user_id, positionDetail.home_id,positionDetail.dob);
                                    }}
                                     >
                                        <option value={-1}>Select Role</option>
                                        {roleDetails.map((item, _id) => {
                                            return <option value={_id}>
                                                {item.role_name}
                                            </option>


                                        })}
                                    </Form.Select>

                        </Form.Group>

                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAssignRole}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={saveAssignRoleDetail}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
                            </td>
                            <td>
                            <ul>{data.role_arr.map((val, _id) => {
                                return <li key={_id}>
                                     {/* <Form.Select aria-label="Default select example" defaultValue={val.emp_status} readOnly
                                      onChange={(e) => {
                                changeEmpStatus(e, data.user_id,data,_id);
                            }}>
                                <option value="Active" >Active</option>
                                <option value="Archived"> Archived</option>
                                <option value="Hold"> Hold</option>
                            </Form.Select> */}
                            {val.emp_status}
                                </li>


                            })
                            }</ul>
                               </td>
                            <td>{data.dob}</td>
                            {/* <td> <Form>
                                <Form.Group controlId="formBasicEmail">


                                    <Form.Select aria-label="Default select example" onChange={(e) => {
                                        addAssignRoleText(e, data.user_id, data.home_id, id);
                                    }} >
                                        <option value={-1}>Select Role</option>
                                        {roleDetails.map((item, _id) => {
                                            return <option value={_id}>
                                                {item.role_name}
                                            </option>


                                        })}
                                    </Form.Select>
                                </Form.Group>

                            </Form></td> */}
                            {/* <td>            <Link  to={`/getStaffCourseRoleCheckList/${data.user_id}/${data.home_id}`}><Button  variant="warning">View Role Details</Button></Link>
</td> */}
{/* <td>
    <Button variant='warning' onClick={handleShowAssignRole}>Assign Role</Button>
                           <Modal show={showAssignRole} onHide={handleCloseAssignRole}>
                <Modal.Header closeButton>
                    <Modal.Title>Assign Position</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-2 col-xs-6" controlId="formBasicEmail">
                            <Form.Label>Staff Name</Form.Label>
                            <Form.Control type="text"
                            readOnly
                            //  onChange={(e) => {
                            //     addAssignRoleText(e, 'rol1',data.user_id,data.role_id,data.role_arr);
                            // }}
                            value={data.user_name} 
                            />
                            <Form.Label>Staff User Id </Form.Label>
                            <Form.Control type="text"
                            value={data.user_id} readOnly
                            />
                            <Form.Label>Role Name</Form.Label>
                            <Form.Select aria-label="Default select example" style={{width:"85%"}}
                             onChange={(e) => {
                                        addStaffRole(e, data.user_id, data.home_id,data.dob);
                                    }}
                                     >
                                        <option value={-1}>Select Role</option>
                                        {roleDetails.map((item, _id) => {
                                            return <option value={_id}>
                                                {item.role_name}
                                            </option>


                                        })}
                                    </Form.Select>

                        </Form.Group>

                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAssignRole}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={saveAssignRoleDetail}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            </td> */}
                            {/* <td><span><Button variant='warning'>Save Role Changes</Button></span></td> */}
                            {/* <td><Button variant='warning' onClick={handleShowAssignRole}>Assign Role</Button></td> */}
                            {/* <Modal show={showAssignRole} onHide={handleCloseAssignRole}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Position</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-2 col-xs-6" controlId="formBasicEmail">
                            <Form.Label>Enter Role ID</Form.Label>
                            <Form.Control type="text"
                             onChange={(e) => {
                                addAssignRoleText(e, 'rol1',data.user_id,data.role_id,data.role_arr);
                            }}
                            />
                            <Form.Label>Enter the Role Name</Form.Label>
                            <Form.Control type="text"
                             onChange={(e) => {
                                addAssignRoleText(e, 'rol2',data.user_id,data.role_id,data.role_arr);
                            }}
                            />

                        </Form.Group>

                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAssignRole}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={saveAssignRoleDetail}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal> */}
                        </tr>
                    </tbody>
                })}

            </Table>
        </div>);
}

