import React, { useState, useEffect, useRef } from 'react'
import { Form, Row, Col, Button, Container, Table, Modal, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { BASE_API_URL } from '../Url-config';
import { BASE_URL_FRONTEND } from '../Url-config';


var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();


function UserCourses(props) {


    var paramId = useParams().id;

    var propsId = props.homeId
    var params = propsId;
    if (!propsId) {

        params = paramId;
    }

    const [mappingData, setMappingData] = useState([{ '': '' }]);
    const [orgId, setorgId] = useState(0);
    const [homeId, sethomeId] = useState(0);
    const [roleId, setroleId] = useState(0);
    const [userId, setuserId] = useState(0);
    const [homeList, sethomelist] = useState([{ '': '' }]);
    const [mappedHomeList, setmappedHomeList] = useState([{ '': '' }]);
    const [roleList, setroleList] = useState([{ '': '' }]);
    const [courseList, setCourseList] = useState([]);
    const [completedCourses, setCompletedCourses] = useState([]);
    const [pendingCourses, setPendingCourses] = useState([]);
    const [waitMsg, setWaitMsg] = useState('Loading..');

    const [modalInfo, setmodalInfo] = useState('');
    const [show, setshow] = useState(false);
    const [alertshow, setalertShow] = useState(false);

    const [dateTime, setDateTime] = useState(date);
    const [courseBadgeUrl, setCourseBadgeUrl] = useState('');
    const [selectedCourseId, setSelectedCourseId] = useState('');






    const BASE_URL_GET_All_HOMELIST = BASE_API_URL + "orgnization/getAllHomes";
    const BASE_URL_GET_ROLELIST = BASE_API_URL + "orgnization/getRoleByHomeId/";
    const BASE_URL_GET_COURSELIST = BASE_API_URL + "course/fetchCourseDetails";
    const BASE_URL_GET_USER_HOME_ROLE = BASE_API_URL + "user/fetchUHRdetails/";
    const BASE_URL_SAVE_BADGE_URL = BASE_API_URL + "user/saveBadgeUrl/";
    const BASE_URL_GET_HOME_ROLE_CRS_LIST = BASE_API_URL + "orgnization/getHomeInfo/";

    useEffect(() => {
        if (sessionStorage.getItem("userType") != 'admin' && sessionStorage.getItem("userType") != 'user') {
            return window.location.href = BASE_URL_FRONTEND;

        }
        // fetchData();
        console.log('User ID: ', params);
        setuserId(params);
        const getUserHomeRoleData = BASE_URL_GET_USER_HOME_ROLE + params;
        const res = axios.get(getUserHomeRoleData, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            console.log(" ========== > ", response);
            setMappingData(response.data);
            getHomeList(response.data);
        });
    }, [params]);


    const getHomeList = (resp) => {
        try {
            const res = axios.get(BASE_URL_GET_All_HOMELIST, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                console.log(" ========== Home List > ", response.data);

                const userMappedHome = resp.map((c) => {
                    const inner = response.data.find(
                        (s) => {
                            console.log(c.home_id, "   ", s.home_id);
                            if (c.home_id === s.home_id) {
                                return (s);
                            }
                        });

                    // ((allHome)=>{
                    //     if(c.home_id === allHome.home_id) 
                    //         return (allHome)
                    // });
                    return (inner);
                });
                console.log('==== Only Required home === ', userMappedHome);
                setmappedHomeList(userMappedHome);
                sethomelist(response.data);
                console.log('==== Only Required home 2 === ', homeList);
            });
            console.log("Home list : " + homeList);

        } catch (error) {
            console.log(error);
        }
    };

    const filterRoleDropdown = e => {
        console.log("Dropdown filter : ", homeList);
        const { name, value } = e.target
        console.log(" Value ", value);
        sethomeId(value);

        if (value !== 0) {
            setroleList([{ '': '' }]);
            const getUserData = BASE_URL_GET_HOME_ROLE_CRS_LIST + value
            axios.get(getUserData).then(function (response) {
                setroleList(response.data.result);
                if (response.data.result.length === 0) {
                    setWaitMsg("There is no role mapped with selected Home.")
                    setalertShow(true);
                }
            })
                .catch(function (error) {
                    console.log(error);
                });;
        }
        // const roleHomeMapping = mappingData.map((c)=>{  
        //     sethomeId(value);
        //     setuserId(c.user_id);
        //     //setroleList([{'':''}]);
        //     console.log('Value ',value,' Select Home ', c.home_id);
        //     if(String(value) === String(c.home_id)){
        //         if(c.role_arr && c.role_arr.length>0){
        //         console.log('Role going on : ', c.role_arr);
        //         setroleList(c.role_arr);
        //         return (c.role_arr);
        //         }
        //     }
        // });    
    }

    const setRoleValue = e => {
        const { name, value } = e.target
        setroleId(value);
    }

    const fetchCourseDetails = () => {
        try {
            const body = JSON.stringify({ userId: userId, orgId: orgId, roleId: roleId, homeId: homeId });
            console.log("Body to send => ", body);
            var resJson = [];
            setCompletedCourses([{ '': '' }]);
            setPendingCourses([{ '': '' }]);
            setWaitMsg('');
            axios.post(BASE_URL_GET_COURSELIST, body, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                console.log(res);
                resJson = res.data;
                if (resJson !== undefined) {
                    setCourseList(resJson);
                    //setCompletedCourses(courseList.completedCourses);
                    //setPendingCourses(courseList.pendingCourses);
                    lastMethodCall(resJson);
                    if (resJson.completedCourses.length === 0
                        && resJson.pendingCourses.length === 0) {
                        setWaitMsg("Not able to fetch courses.\nNiether user has completed any course nor any course is registered with selected role. \n\nPlease contact your LCPT support team.")
                        // alert();
                        setalertShow(true);
                    } else if (resJson.completedCourses.length === 0
                        && resJson.pendingCourses.length > 0) {
                        //alert("All courses are pending.");
                        setWaitMsg("All courses are pending.")
                        // alert();
                        setalertShow(true);
                    }
                } else {
                    return alert("Selected role don't have courses specified yet. Please contact admin and try again");
                }
            })
                .catch(err => {
                    console.log(err);
                })
        } catch (error) {
            console.log(error);
        }
    }

    const lastMethodCall = (passresJson) => {
        try {
            setCourseList(passresJson.allCourseList);
            setCompletedCourses(passresJson.completedCourses);
            setPendingCourses(passresJson.pendingCourses);
            console.log("Course list : " + courseList);
            console.log("Pending Courses : " + pendingCourses);
            console.log("CompletedCourses : " + completedCourses);
            console.log("Course list All in system : " + courseList.allCourseList);
        } catch (error) {
            console.log(error);
        }
    }


    const setBadgeUrlMethod = e => {
        const { name, value } = e.target
        setCourseBadgeUrl(value);
    };

    const submitBadgeUrl = () => {
        // alert(badgeUrl);
        setshow(false);
        //const [selectedCourseId, setSelectedCourseId] = useState('');
        try {
            const body = JSON.stringify({ userId: userId, courseId: selectedCourseId, badgeUrl: courseBadgeUrl });
            axios.post(BASE_URL_SAVE_BADGE_URL, body, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                console.log(res);

            });
        } catch (error) {
            console.log(error);
        }
    };
    const handleAlertClose = () => setalertShow(false);
    const handleClose = () => setshow(false);
    const handleShow = () => {
        setshow(true)
    };
    const func2 = (userId, roleId, roleName, trainDuration, validity, crsId, title, reqFrom) => {
        var val = userId + "," + roleId + "," + roleName + "," + trainDuration + "," + validity + "," + crsId + "," + title + "," + reqFrom;
        setSelectedCourseId(crsId);
        setmodalInfo(val);
    }
    const ModalContent = () => {
        var field = (modalInfo.split(",")[7] === 'pending') ? <tr><td className="text-center"><b>Upload Badge URL</b></td><td className="text-left"><Form.Control type="text" onBlur={setBadgeUrlMethod} name="badgeUrl" placeholder="Please enter your course badge URL" /></td></tr> : '';
        var button = (modalInfo.split(",")[7] === 'pending') ? <Button variant="success" onClick={submitBadgeUrl}>Save</Button> : '';
        return (<Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title style={{ color: '#0f6fc5' }}>Course Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <h3 className='text-center' style={{ color: '#0f6fc5' }}>{modalInfo.split(",")[6]}</h3>
                    <h4 className='text-center' style={{ color: '#0f6fc5' }}>{modalInfo.split(",")[5]}</h4>
                    <hr></hr>
                    <table class="panel-body">
                        <tbody>
                            <tr><td className='text-center'><b>User ID</b></td><td className='text-left'><Form.Label>{modalInfo.split(",")[0]} </Form.Label></td></tr>
                            <tr><td className='text-center'><b>Designation</b></td><td className='text-left'><Form.Label>{modalInfo.split(",")[2]} </Form.Label></td></tr>
                            <tr><td className='text-center'><b>Training Duration</b></td><td className='text-left'><Form.Label>{modalInfo.split(",")[3]} </Form.Label></td></tr>
                            <tr><td className='text-center'><b>Course Validity</b></td><td className='text-left'><Form.Label>{modalInfo.split(",")[4]} </Form.Label></td></tr>
                            {field}
                        </tbody>
                    </table>

                </Row>
            </Modal.Body>
            <Modal.Footer>
                {button}
                <Button variant="secondary" style={{ backgroundColor: '#0f6fc5' }} onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>);
    }

    const printContent2 = () => {
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
                    <Alert variant="danger" show={alertshow} onClose={() => setalertShow(false)} dismissible>
                        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                        <p>
                            {waitMsg}
                        </p>
                    </Alert>
                    <Col xs={6} md={3}>
                        <h2 style={{ textAlign: "left" }}>Employer Details</h2>
                        <Form style={{ minHeight: '15pc' }}>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridHome">
                                    <Form.Label>Home</Form.Label>
                                    <Form.Select defaultValue="Choose..." onChange={filterRoleDropdown}>
                                        <option> -- Select Home -- </option>
                                        {homeList?.map((data, id) => (
                                            <option value={data.home_id} key={data.home_id}>{data.name}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridRole">
                                    <Form.Label>Role</Form.Label>
                                    <Form.Select defaultValue="Choose..." onChange={setRoleValue}>
                                        <option> -- Select Role -- </option>
                                        {roleList?.map((data, id) => (<option value={data.role_id} key={data.role_id}>{data.role_name}</option>))}
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
                        <Table striped bordered hover style={{ maxHeight: '35pc' }}>
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
                                if (data.crsId === undefined || data.crsId === "") {
                                    return <tbody key={id}>
                                        <tr >
                                            <td colSpan={13} className="text-center" >
                                                <Spinner animation="border" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </Spinner>
                                            </td>
                                        </tr>
                                    </tbody>
                                } else {
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
                                                <Button variant="warning" onClick={function (event) {
                                                    handleShow(); func2(data.userId, data.roleId, data.roleName,
                                                        data.trainDuration, data.validity, data.crsId, data.title, 'completed');
                                                }}>
                                                    Details
                                                </Button></td>

                                        </tr>
                                    </tbody>
                                }
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
                            if (data.crsId === undefined || data.crsId === "") {
                                return <tbody key={id}>
                                    <tr >
                                        <td colSpan={13} className="text-center" >
                                            <Spinner animation="border" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </Spinner>
                                        </td>
                                    </tr>
                                </tbody>
                            } else {
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
                                        <td><Button variant="warning" onClick={function (event) {
                                            handleShow(); func2(data.userId, data.roleId, data.roleName,
                                                data.trainDuration, data.validity, data.crsId, data.title, 'pending');
                                        }}>
                                            Details
                                        </Button></td>
                                    </tr>
                                </tbody>
                            }
                        })}
                    </Table>
                </Row>
                <Row className='text-center'>
                    <Col xs={12} style={{ alignContent: 'center' }}>
                        <div>
                            <br></br>
                            <br></br>
                            <h4>Print all courses with details</h4> <Button variant="primary" >Print</Button>
                            {/* <UserProfile ref={componentRef} />
      <button onClick={handlePrint}>Print this out!</button> */}
                        </div>
                        <br></br>
                    </Col>
                </Row>
            </Container>
            {show ? <ModalContent /> : null}
            <div hidden={true} id='printContent'>
                <Row>
                    <Col className='text-center' style={{ color: '#0f6fc5' }}>
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



