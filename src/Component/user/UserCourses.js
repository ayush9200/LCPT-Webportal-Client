import React, { useState, useEffect, useRef } from 'react'
import { Form, Row, Col, Button, Container, Modal, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { BASE_API_URL } from '../Url-config';
import { BASE_URL_FRONTEND } from '../Url-config';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import { FaFileExcel, FaRegPaperPlane, FaUserCheck } from 'react-icons/fa';
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";


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
    //const [orgId, setorgId] = useState(0);
    const [homeId, sethomeId] = useState(0);
    const [roleId, setroleId] = useState(0);
    const [userId, setuserId] = useState(0);
    const [homeList, sethomelist] = useState([{ '': '' }]);
    //const [mappedHomeList, setmappedHomeList] = useState([{ '': '' }]);
    const [roleList, setroleList] = useState([{ '': '' }]);
    //const [courseList, setCourseList] = useState([]);
    //const [completedCourses, setCompletedCourses] = useState([]);
    //const [pendingCourses, setPendingCourses] = useState([]);
    const [completeCourses, setCompleteCourses] = useState([]);
    const [waitMsg, setWaitMsg] = useState('Loading..');

    const [modalInfo, setmodalInfo] = useState('');
    const [show, setshow] = useState(false);
    const [alertshow, setalertShow] = useState(false);
    const [successAlertshow, setsuccessAlertshow] = useState(false);

    const [courseBadgeUrl, setCourseBadgeUrl] = useState('');
    const [selectedCourseId, setSelectedCourseId] = useState('');

    const [format, setformat] = useState(0);
    const [empEmailId, setempEmailId] = useState('');
    const [userList, setUserList] = useState([]);
    const [mapHomeList, setmapHomeList] = useState([]);
    const [mapRoleList, setmapRoleList] = useState([]);




    const BASE_URL_EMAIL_TO_EMPLOYER = BASE_API_URL + "user/sendEmailEmp";
    const BASE_URL_GET_All_HOMELIST = BASE_API_URL + "orgnization/getAllHomes";
    //const BASE_URL_GET_ROLELIST = BASE_API_URL + "orgnization/getRoleByHomeId/";
    const BASE_URL_GET_COURSELIST = BASE_API_URL + "course/fetchCourseDetails";
    const BASE_URL_GET_USER_HOME_ROLE = BASE_API_URL + "user/fetchUHRdetails/";
    const BASE_URL_SAVE_BADGE_URL = BASE_API_URL + "user/saveBadgeUrl/";
    const BASE_URL_GET_HOME_ROLE_CRS_LIST = BASE_API_URL + "orgnization/getHomeInfo/";
    const BASE_URL_USER = BASE_API_URL + "user/getUser/";

    useEffect(() => {
        if (sessionStorage.getItem("userType") != 'admin' && sessionStorage.getItem("userType") != 'user') {
            return window.location.href = BASE_URL_FRONTEND;

        }
        fetchData();
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

    async function fetchData() {
        const getUserData = BASE_URL_USER + params
        let response = await axios.get(
            getUserData
        );
        setUserList(response.data.data);
    }


    const getHomeList = (resp) => {
        try {
            const res = axios.get(BASE_URL_GET_All_HOMELIST, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                console.log(" ========== All Home List > ", response.data);
                var allHomesList = response.data;
                var onlyMappedHome = resp;
                var list = [];
                const userMappedHomes = allHomesList.map((c) => {
                    const inner = onlyMappedHome.find(
                        (s) => {
                            //console.log(c.home_id, "   ", s.home_id);
                            if (c.home_id === s.home_id) {
                                list.push(c);
                            }
                        });
                    return (inner);
                });
                setmapHomeList(list);
                //setmappedHomeList(userMappedHomes);
                sethomelist(response.data);
            });
        } catch (error) {
            console.log(error);
        }
    };

    const filterRoleDropdown = e => {
        const { name, value } = e.target
        sethomeId(value);
        if (value !== 0) {
            setroleList([{ '': '' }]);
            const getUserData = BASE_URL_GET_HOME_ROLE_CRS_LIST + value
            axios.get(getUserData).then(function (response) {
                setroleList(response.data.result);
                var list = [];
                const userMappedHomes = response.data.result.map((c) => {
                    const inner = mappingData.find(
                        (s) => {
                            // console.log("Check roles Home => ",c.home_id, "   ", s.home_id);
                            if (c.home_id === s.home_id) {
                                //console.log("Check roles Role => ",c.role_id);
                                s.role_arr.find(
                                    (v) => {
                                        //console.log("Role inner loop => ",v ," ", v.role_id == c.role_id, " ", v.emp_status == "Active")
                                        if (v.role_id == c.role_id && v.emp_status == "Active") {
                                            list.push(c)
                                        }
                                    })
                            }
                        });
                    return (inner);
                });
                setmapRoleList(list);
                if (response.data.result.length === 0) {
                    setWaitMsg("There is no role mapped with selected Home.")
                    setalertShow(true);
                }
            })
                .catch(function (error) {
                    console.log(error);
                });;
        }
    }

    const setRoleValue = e => {
        const { name, value } = e.target
        setroleId(value);
    }

    const fetchCourseDetails = () => {
        try {
            const body = JSON.stringify({ userId: userId, orgId: "", roleId: roleId, homeId: homeId });
            //console.log("Body to send => ", body);
            var resJson = [];
            setCompleteCourses([]);
            setWaitMsg('');
            (mapRoleList.some(item => item.role_id == roleId)) ? setsuccessAlertshow(true) : setsuccessAlertshow(false);
            axios.post(BASE_URL_GET_COURSELIST, body, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                console.log(res);
                resJson = res.data;
                if (resJson !== undefined) {
                    //setCourseList(resJson);
                    //setCompletedCourses(courseList.completedCourses);
                    //setPendingCourses(courseList.pendingCourses);
                    var list = [];
                    var courseIds = [];
                    const inner = resJson.completedCourses.find(
                        (s) => {
                            if (!courseIds.includes(s.crsId)) {
                                courseIds.push(s.crsId);
                                list.push(s)
                            }

                        });
                    const inner2 = resJson.pendingCourses.find(
                        (s) => {
                            if (!courseIds.includes(s.crsId)) {
                                courseIds.push(s.crsId);
                                list.push(s)
                            }

                        });
                    setCompleteCourses(list);
                    //lastMethodCall(resJson);
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

    const setBadgeUrlMethod = e => {
        const { name, value } = e.target
        setCourseBadgeUrl(value);
    };

    const submitBadgeUrl = () => {
        setshow(false);
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

    const buttonFormatter = (data, row) => {
        if (row.status === "Incomplete") {
            return <Button variant="warning" onClick={function (event) {
                handleShow(); func2(row.userId, row.roleId, row.roleName,
                    row.trainDuration, row.validity, row.crsId, row.title, row.status, row.badgeUrl, row.description, row.extDoc);
            }}>
                &nbsp;Add&nbsp;
            </Button>;
        } else {
            return <Button variant="success" onClick={function (event) {
                handleShow(); func2(row.userId, row.roleId, row.roleName,
                    row.trainDuration, row.validity, row.crsId, row.title, row.status, row.badgeUrl, row.description, row.extDoc);
            }}>
                View
            </Button>;
        }
    };

    const options = {
        // pageStartIndex: 0,
        sizePerPage: 5,
        hideSizePerPage: false,
        hidePageListOnlyOnePage: false
    };


    const columns = [
        {
            dataField: "crsId",
            text: "Course ID",
            sort: true,
            filter: textFilter(),
            style: {
                fontWeight: 'bold',
                height: '5%'
            }

        },
        {
            dataField: "title",
            text: "Title",
            sort: true,
            filter: textFilter(),
            title: (cell, row, rowIndex, colIndex) => `${cell}`
        },
        {
            dataField: "trainDuration",
            text: "Training Duration",
        },
        {
            dataField: "validity",
            text: "Validity",
        },
        {
            dataField: "status",
            text: "Status",
        },
        {
            dataField: "valid",
            text: "Valid Upto",
        },
        {
            dataField: "",
            text: "View",
            formatter: buttonFormatter
        }];

    const updateEmpEmailId = e => {
        const { name, value } = e.target;
        setempEmailId(value);
    }

    const sendDataThroughEmail = e => {
        var fileBlob = "";
        var data = new FormData();
        data.append("userId", params);
        data.append("emailId", empEmailId);
        if (format == 0) {
            //excel
            fileBlob = exportAuditExcel();
        } else {
            //pdf
            fileBlob = exportAuditPDF();
        }
        data.append("file", fileBlob);
        axios.post(BASE_URL_EMAIL_TO_EMPLOYER, data)
            .then(response => {
                console.log(response);
            });
    }

    //pdf
    var exportAuditPDF = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape
        const marginLeft = 5;
        const doc = new jsPDF(orientation, unit, size);
        doc.setFontSize(15);
        const title = "LCPT User Audit Report";
        var headers = [["userName", "user_id", "email", "number", "dob", "address", "crsId",
            "title", "status", "validity", "sharedEmp", "extDoc", "trainDuration"]];
        var dataArr = [];
        for (let i = 0; i < completeCourses.length; i++) {
            var tempArr = [userList.userName, userList.user_id, userList.email, userList.number, userList.dob, userList.address,
            completeCourses[i]["crsId"], completeCourses[i]["title"], completeCourses[i]["status"], completeCourses[i]["validity"],
            completeCourses[i]["sharedEmp"], completeCourses[i]["extDoc"], completeCourses[i]["trainDuration"]];
            dataArr.push(tempArr);
        }
        let content = {
            startY: 50,
            head: headers,
            body: dataArr
        };
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        var blob = doc.output('blob')
        return blob;
    }

    const formatChange = e => {
        const { name, value } = e.target;
        (value == "pdf") ? setformat(1) : setformat(0);
    }

    //Excel
    const exportAuditExcel = async e => {
        var arrayOfData = [];
        {
            completeCourses?.map((data, id) => {
                //console.log(" >><<< ", data)
                var mapForCourses = {
                    'USER NAME': userList.userName,
                    'USER ID': userList.user_id,
                    'EMAIL ID': userList.email,
                    'CONTACT NUMBER': userList.number,
                    'DATE OF BIRTH': userList.dob,
                    'ADDRESS': userList.address + ", " + userList.city + ", " + userList.state + " , " + userList.postalCode,
                    'COURSE ID': data.crsId,
                    'COURSE TITLE': data.title,
                    'STATUS': data.status,
                    'VALIDITY': data.validity,
                    'SHARED WITH EMPLOYER': data.sharedEmp,
                    'EXTERNAL DOCUMENT': data.extDoc,
                    'TRAINING DURATION': data.trainDuration
                }
                arrayOfData.push(mapForCourses);
            })
        };

        const worksheet = XLSX.utils.json_to_sheet(arrayOfData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const data = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8" });
        console.log(data);
        return data;
        //XLSX.writeFile(workbook, "LCPT_UserAuditReport_"+userList.user_id+".xlsx");
    }

    return (
        <div>
            <Container>
                <Alert variant="danger" show={alertshow} onClose={() => setalertShow(false)} dismissible>
                    <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                    <p>{waitMsg}</p>
                </Alert>
                <Alert variant="success" show={successAlertshow} onClose={() => setsuccessAlertshow(false)} dismissible>
                    <span><FaUserCheck /><p style={{ display: 'inline' }}>&nbsp; Course details are available to your employer.</p></span>
                </Alert>
                <Row>
                    <Col xs={6} md={12} className='shadow p-3 mb-5 bg-white rounded'>
                        <h2>Employer Details</h2>
                        <Row>
                            <Col xs={6} md={5}>
                                <Form.Group as={Col} controlId="formGridHome">
                                    <Form.Label>Home</Form.Label>
                                    <Form.Select defaultValue="Choose..." onChange={filterRoleDropdown}>
                                        <option> -- Select Home -- </option>
                                        {homeList?.map((data, id) => (
                                            (mapHomeList.some(item => item.home_id == data.home_id)) ? <option value={data.home_id} key={data.home_id}>{data.name} &nbsp; &#10004;</option> : <option value={data.home_id} key={data.home_id}>{data.name}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col xs={6} md={5}>
                                <Form.Group as={Col} controlId="formGridRole">
                                    <Form.Label>Role</Form.Label>
                                    <Form.Select defaultValue="Choose..." onChange={setRoleValue}>
                                        <option> -- Select Role -- </option>
                                        {roleList?.map((data, id) => (
                                            (mapRoleList.some(item => item.role_id == data.role_id)) ? <option value={data.role_id} key={data.role_id}>{data.role_name} &nbsp; &#10004;</option> : <option value={data.role_id} key={data.role_id}>{data.role_name}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col xs={6} md={2} style={{ marginTop: '2pc' }}>
                                <Button variant="primary" onClick={(e) => {
                                    fetchCourseDetails();
                                }}>Fetch details</Button>
                            </Col>
                        </Row>
                        <br></br>
                    </Col>
                </Row>

                <Row>
                    <br></br>
                    <Col xs={12} md={12}>
                        <BootstrapTable columns={columns}
                            keyField="id"
                            data={completeCourses}
                            pagination={paginationFactory(options)}
                            filter={filterFactory()}
                            filterPosition="top"
                            striped
                            hover
                            condensed />
                    </Col>
                </Row>
                <br></br>
                <br></br>

                {/* <Form style={{minHeight: '13pc'}}>
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
                        
                            <div class="vr"></div>
                            <br></br>
                            <Row>
                                <Button variant="primary" onClick={(e) => {
                                        fetchCourseDetails();
                                    }}>Fetch details</Button>
                            </Row>
                        </Form> */}
                <Row>
                    <Col xs={6} md={12} className='shadow p-3 mb-5 bg-white rounded'>
                        <h2 className='text-center'>Generate Audit Reports</h2>
                        <Row>
                            <Col xs={6} md={4}>
                                <p className='text-muted text-left'>Step 1</p>
                                <Form.Group id="formGridCheckbox">
                                    <Form.Label>Please select format for Audit Report</Form.Label>
                                    <Form.Select name="format" onChange={formatChange}>
                                        <option> -- Choose your format -- </option>
                                        <option value="excel" key="1">Excel</option>
                                        <option value="pdf" key="2"> PDF</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col xs={6} md={4}>
                                <p className='text-muted text-left'>Step 2</p>
                                <Form.Group as={Col} controlId="formGridName">
                                    <Form.Label>Employer's Email address</Form.Label>
                                    <Form.Control type="input" name="email" onBlur={updateEmpEmailId} placeholder="abc@xyz.com" />
                                </Form.Group>
                            </Col>
                            <Col xs={6} md={4}>
                                <p className='text-muted text-left'>Step 3</p>
                                <Row>
                                    <Col xs={6} md={6} style={{ marginTop: '1pc' }}>
                                        <Form.Group>
                                            <Form.Check type="checkbox" label="Verify and send all data to Employer" />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={6} md={6} style={{ marginTop: '1pc' }}>
                                        <Form.Group as={Col} controlId="formGridName">
                                            <Button variant="primary" onClick={sendDataThroughEmail}><FaRegPaperPlane /> Send</Button>
                                        </Form.Group>
                                    </Col>
                                </Row>


                            </Col>
                            <br></br>
                        </Row>
                    </Col>
                </Row>

            </Container>
            {show ? <ModalContent /> : null}
            {/* <h2>Enrolled Courses</h2>
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
                    if(data.crsId === undefined || data.crsId === ""){
                        return <tbody key={id}>
                        <tr >
                            <td colSpan={13} className="text-center" >
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                            </td>
                        </tr>
                    </tbody>
                    }else{
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
            {/* <Button variant="warning" onClick={function (event) {
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
                })} }
            </Table> */}

            {/* <h2>Pending Courses</h2>
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
                        if(data.crsId === undefined || data.crsId === ""){
                            return <tbody key={id}>
                            <tr >
                                <td colSpan={13} className="text-center" >
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                                    </td>
                            </tr>
                        </tbody>
                        }else{
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
                                            data.trainDuration,data.validity, data.crsId, data.title, 'pending');}}>
                                                Details
                                            </Button></td>
                                </tr>
                            </tbody>
                        }
                     })}
                </Table> */}
        </div>

    )
}

export default UserCourses;



