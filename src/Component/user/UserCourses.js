import React, {useState,useEffect, useRef} from 'react'
import { Form, Row, Col, Button, Container, Table, Modal } from 'react-bootstrap';
import axios from 'axios';
import { useParams, Link } from "react-router-dom";
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { useReactToPrint } from "react-to-print";


var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();


function UserCourses() {


    const params = useParams().id;
    const [orgId, setorgId] = useState(0);
    const [homeId, sethomeId] = useState(0);
    const [roleId, setroleId] = useState(0);
    const [userId, setuserId] = useState(0);
    const [homeList, sethomelist] = useState([]);
    const [roleList, setroleList] = useState([]); 
    const [courseList, setCourseList] = useState([]); 
    const [completedCourses, setCompletedCourses] = useState([]);
    const [pendingCourses, setPendingCourses] = useState([]);

    const [modalInfo, setmodalInfo] = useState('');
    const [show, setshow] = useState(false);

    const [dateTime, setDateTime] = useState(date);
   

  
   

    const BASE_URL_GET_HOMELIST = "https://lcpt-webportal-backend.herokuapp.com/orgnization/getHomesList/";
    const BASE_URL_GET_ROLELIST = "https://lcpt-webportal-backend.herokuapp.com/orgnization/getRoleByHomeId/";
    const BASE_URL_GET_COURSELIST = "https://lcpt-webportal-backend.herokuapp.com/course/fetchCourseDetails";

    useEffect(() => {
        fetchData();
    },[]);

    async function fetchData() {
        const BASE_URL_USER = "https://lcpt-webportal-backend.herokuapp.com/user/getUser/";
        const getUserData = BASE_URL_USER + params
        let response = await axios.get(
            getUserData
        );
             let responseJson = response.data.data;
            console.log(" ==== Response json ==== ",responseJson);
            console.log("OrgId : "+responseJson.orgId);
            console.log("HomeId : "+responseJson.homeId);
            console.log("RoleId : "+responseJson.roleId);
            console.log("UserId : "+responseJson.userId);
            getHomeList(responseJson.orgId,responseJson.homeId,responseJson.roleId,responseJson.userId);
    }
    
   const getHomeList = async(passOrg, passHome, passRole, passUser) => {
     try {
        console.log("OrgId === : "+passOrg);
        console.log("HomeId === : "+passHome);
        console.log("RoleId === : "+passRole);

        setorgId(passOrg);
        sethomeId(passHome);
        setroleId(passRole);
        setuserId(passUser);
        
        const res = await axios.get(BASE_URL_GET_HOMELIST+passOrg, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response =>{
            console.log(" ========== > ", response);
            sethomelist(response.data);
        });
        //onst resJson = res.data;
        //console.log("===== > Home json ", resJson);
         // if(resJson!==undefined){
            //sethomelist(res.data);
           console.log("Home list : "+homeList);
           getRoleList(passRole);
        //   }else{
        //     return alert("Invalid Credentials. Please try again.");
        //   }

    }catch (error) {
        console.log(error);
    }
};

const getRoleList = async(passRoleId) => {
    try {
       const res = await axios.get(BASE_URL_GET_ROLELIST+passRoleId, {
           headers: {
               'Content-Type': 'application/json'
           }
       }).then(response =>{
        console.log(" ========== > ", response);
        setroleList(response.data);
        });
    //    const resJson = res.data;
    //      if(resJson!==undefined){
    //        setroleList(res.data);
           console.log("Role list : "+roleList);
    //      }else{
    //        return alert("Invalid Credentials. Please try again.");
    //      }

   }catch (error) {
       console.log(error);
    }
};
//
  const fetchCourseDetails = async e => {
    try {
        const body = JSON.stringify({ userId: userId, orgId: orgId, roleId: roleId, homeId: homeId });
        console.log(body);
        var resJson = [];
        const res = await axios.post(BASE_URL_GET_COURSELIST, body, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
                console.log(res);
                resJson = res.data;
                //setshowSpinner(false)
            })
            .catch(err => {
                console.log(err);
            })
        //const resJson = res.data;
          if(resJson!==undefined){
            setCourseList(resJson);
            console.log("Course list : "+courseList);
            console.log("Pending Courses : "+courseList.pendingCourses);
            console.log("CompletedCourses : "+courseList.completedCourses);
            console.log("Course list All in system : "+courseList.allCourseList);

            setCompletedCourses(courseList.completedCourses);
            setPendingCourses(courseList.pendingCourses);
            lastMethodCall(resJson);
            console.log(resJson);
           // alert();
          }else{
            return alert("Invalid Credentials. Please try again.");
          }
 
    }catch (error) {
        console.log(error);
     }
  }

  const lastMethodCall = async(passresJson) => {
    try {
        setCourseList(passresJson);
        console.log("Course list : "+courseList);
        console.log("Pending Courses : "+courseList.pendingCourses);
        console.log("CompletedCourses : "+courseList.completedCourses);
        console.log("Course list All in system : "+courseList.allCourseList);

        setCompletedCourses(courseList.completedCourses);
        setPendingCourses(courseList.pendingCourses);
        //lastMethodCall(resJson);
    }catch (error) {
        console.log(error);
     }
  }

    const handleClose = () => setshow(false);
    const handleShow = () => {
        setshow(true)
    };
    const func2 = (userId,roleId,roleName,trainDuration,validity,crsId,title) => {
        var val = userId+","+roleId+","+roleName+","+trainDuration+","+validity+","+crsId+","+title;
        setmodalInfo(val);
    }
  const ModalContent = () =>{
      return (<Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
        <Modal.Title style={{color:'#0f6fc5'}}>Course Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
           <Row>
               <h3 className='text-center' style={{color:'#0f6fc5'}}>{modalInfo.split(",")[6]}</h3>
               <h4 className='text-center' style={{color:'#0f6fc5'}}>{modalInfo.split(",")[5]}</h4>
               <hr></hr>
                <table class="panel-body">
                    <tbody>
                    <tr><td className='text-center'><b>User ID</b></td><td className='text-left'><Form.Label>{modalInfo.split(",")[0]} </Form.Label></td></tr>
                    <tr><td className='text-center'><b>Designation</b></td><td className='text-left'><Form.Label>{modalInfo.split(",")[2]} </Form.Label></td></tr>
                    <tr><td className='text-center'><b>Training Duration</b></td><td className='text-left'><Form.Label>{modalInfo.split(",")[3]} </Form.Label></td></tr>
                    <tr><td className='text-center'><b>Course Validity</b></td><td className='text-left'><Form.Label>{modalInfo.split(",")[4]} </Form.Label></td></tr>
                    </tbody>
                </table>
                       
           </Row>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" style={{backgroundColor :'#0f6fc5'}} onClick={handleClose}>
            Close
        </Button>
        </Modal.Footer>
    </Modal>);
  }
  
  const printContent2 = () =>{
    let printContents = document.getElementById('printContent').innerHTML;
    let originalContents = document.body.innerHTML;
   
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  }

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });


    return (
        <div>
                <Container>
            <Row>
            <Col xs={6} md={3}>
            <h2 style={{ textAlign: "left" }}>Employer Details</h2>
                <Form style={{minHeight: '15pc'}}>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridHome">
                            <Form.Label>Home</Form.Label>
                            <Form.Select defaultValue="Choose...">
                            {homeList.map((data, id) => (<option key={data.home_id}>{data.name}</option>))} 
                            </Form.Select>
                        </Form.Group>
                        </Row>
                        <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridRole">
                            <Form.Label>Role</Form.Label>
                            <Form.Select defaultValue="Choose...">
                                {roleList.map((data, id) => (<option key={data.role_id}>{data.role_name}</option>))}
                            </Form.Select>
                        </Form.Group>
                    </Row>
                    <br></br>
                    <Row>
                        <Form.Group as={Col} controlId="formGridCheckbox">
                            <Form.Check type="checkbox" label="Share with employer" />
                        </Form.Group>
                    </Row>
                    <br></br>
                    <Row>
                        <Button variant="primary" onClick={(e) => {
                                fetchCourseDetails();
                            }}>Fetch details</Button>
                    </Row>
                </Form>
            </Col>
            <Col xs={12} md={9}>
            <h2>Enrolled Courses</h2>
            <Table striped bordered hover style={{maxHeight: '35pc'}}>
                <thead>
                    <tr>
                    <th>Code</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>External Document</th>
                    <th>Shared with Employer</th>
                    <th>Status</th>
                    <th>View</th>
                    </tr>
                </thead>
                {completedCourses?.map((data, id) => { 
                    return <tbody key={id}>
                        <tr >
                            <td hidden={true}>{data.homeId}</td>
                            <td hidden={true}>{data.roleId}</td>
                            <td hidden={true}>{data.userId}</td>
                            <td hidden={true}>{data.roleName}</td>
                            <td hidden={true}>{data.trainDuration}</td>
                            <td hidden={true}>{data.validity}</td>

                            <td>{data.crsId}</td>
                            <td>{data.title}</td>
                            <td>{data.title}</td>
                            <td>{data.extDoc}</td>
                            <td>{data.sharedEmp}</td>
                            <td>{data.status}</td>
                            <td>
                                {/* <OverlayTrigger trigger="click" placement="left" overlay={popover}>
                                    <Button variant="success">...</Button>
                                </OverlayTrigger> */}
                                <Button variant="warning" onClick={function(event){ handleShow(); func2(data.userId,data.roleId,data.roleName,
                                    data.trainDuration,data.validity, data.crsId, data.title);}}>
                                        Details
                                    </Button></td>
                                    
                        </tr>
                    </tbody>
                })}
            </Table>
            </Col>
            </Row>
            <br></br>
            <br></br>
            <hr></hr>
            <br></br>
            <br></br>
            <Row>
                <h2>Pending Courses</h2>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>Code</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>External Document</th>
                        <th>Shared with Employer</th>
                        <th>Status</th>
                        <th>View</th>
                        </tr>
                    </thead>
                    {pendingCourses?.map((data, id) => {
                    return <tbody key={id}>
                        <tr >
                            <td hidden={true}>{data.homeId}</td>
                            <td hidden={true}>{data.roleId}</td>
                            <td hidden={true}>{data.userId}</td>
                            <td hidden={true}>{data.roleName}</td>
                            <td hidden={true}>{data.trainDuration}</td>
                            <td hidden={true}>{data.validity}</td>

                            <td>{data.crsId}</td>
                            <td>{data.title}</td>
                            <td>{data.title}</td>
                            <td>{data.extDoc}</td>
                            <td>{data.sharedEmp}</td>
                            <td>{data.status}</td>
                            <td><Button variant="warning" onClick={function(event){ handleShow(); func2(data.userId,data.roleId,data.roleName,
                                    data.trainDuration,data.validity, data.crsId, data.title);}}>
                                        Details
                                    </Button></td>
                        </tr>
                    </tbody>
                })}
                </Table>
            </Row>
            <Row className='text-center'>
                <Col xs={12} style={{alignContent: 'center'}}>
                    <div>
                        <br></br>
                        <br></br>
                    <h4>Print all courses with details</h4> <Button variant="primary" onClick={printContent2}>Print</Button>
                    {/* <UserProfile ref={componentRef} />
      <button onClick={handlePrint}>Print this out!</button> */}
                    </div>
                    <br></br>
                </Col>
            </Row>
            </Container>
            {show ? <ModalContent/> : null}
            <div hidden={true} id='printContent'>
                <Row>
                    <Col className='text-center' style={{color:'#0f6fc5'}}>
                        <h1>LCPT Course report</h1>
                        <h3>User Registration ID: {userId}</h3>
                        <h3>Date: {dateTime}</h3>
                        <hr></hr>
                    </Col>
                    <Col>
                    <Table striped bordered hover className='py-4'>
                <thead>
                    <tr>
                    <th>Course Code</th>
                    <th>Title</th>
                    <th>Designation</th>
                    <th>Description</th>
                    <th>External Document</th>
                    <th>Shared with Employer</th>
                    <th>Status</th>
                    <th>Training Duration</th>
                    <th>Course Validity</th>
                    </tr>
                </thead>
                {completedCourses?.map((data, id) => { 
                    return <tbody key={id}>
                        <tr >
                            <td>{data.crsId}</td>
                            <td>{data.title}</td>
                            <td>{data.title}</td>
                            <td>{data.roleName}</td>
                            <td>{data.extDoc}</td>
                            <td>{data.sharedEmp}</td>
                            <td>{data.status}</td>
                            <td>{data.trainDuration}</td>
                            <td>{data.validity}</td>
                        </tr>
                        </tbody>
                        })}
                        {pendingCourses?.map((data, id) => {
                    return <tbody key={id}>
                        <tr >
                        <td>{data.crsId} **</td>
                            <td>{data.title}</td>
                            <td>{data.title}</td>
                            <td>{data.roleName}</td>
                            <td>{data.extDoc}</td>
                            <td>{data.sharedEmp}</td>
                            <td>{data.status}</td>
                            <td>{data.trainDuration}</td>
                            <td>{data.validity}</td>
                            </tr>
                            </tbody>
                            })}
                    </Table>
                    </Col>
                    <hr></hr>
                    <Col><p className='text-muted'>** Course(s) needed to be completed</p><p className='text-muted'>Course status are subject to change as per approval from employer</p></Col>
                </Row>
           
            </div>
        </div>
    )
}

export default UserCourses;



