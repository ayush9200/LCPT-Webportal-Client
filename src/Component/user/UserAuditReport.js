import React, {useState,useEffect} from 'react'
import { Form, Row, Col, Button, Container, Table, Spinner } from 'react-bootstrap'
import axios from 'axios';
import { useParams } from "react-router-dom";
import * as XLSX from "xlsx";
import { BASE_API_URL } from '../Url-config';
import { BASE_URL_FRONTEND } from '../Url-config';
import { FaFileExcel, FaRegPaperPlane , FaUserCheck} from 'react-icons/fa';
//import { PDFDownloadLink } from '@react-pdf/renderer';
//import PdfAuditReport from './PdfAuditReport';
import jsPDF from "jspdf";
import "jspdf-autotable";

//import PDF, { Text, AddPage, Line, Image, Html } from 'jspdf-react';


const styleH1 = {
    fontSize: '15px',
    textAlign: 'center',
    color: 'red'
  };
   
  const invisibleStyle = {
    display: 'none',
  };


function UserAuditReport() {

    const params = useParams().id;
    const [userList, setUserList] = useState([]);
    const [finalList, setFinalList] = useState([{'':''}]);
    const [mappingData, setMappingData] = useState([{'':''}]);

    const [roleList, setroleList] = useState([{'':''}]);
    const [format, setformat] = useState(0); 
    const [homeList, setHomeList] = useState([{'home_id':'0'}]);
    const [selectedHomeId, setselectedHomeId] = useState(0);
    const [empEmailId, setempEmailId] = useState(''); 

    const [msg, setmsg] = useState(''); 
    
   
    // https://lcpt-webportal.herokuapp.com/
    const BASE_URL_GET_COURSELIST = BASE_API_URL+"course/fetchCourseDetails";
    const BASE_URL_USER = BASE_API_URL+"user/getUser/";
    const BASE_URL_GET_USER_HOME_ROLE = BASE_API_URL+"user/fetchUHRdetails/";
    const BASE_URL_GET_APPLIED_CRS = BASE_API_URL+"course/fetchPendingCourses/";
    const BASE_URL_GET_ALL_HOMELIST = BASE_API_URL+"orgnization/getAllHomes";
    const BASE_URL_GET_HOME_ROLE_CRS_LIST = BASE_API_URL+"orgnization/getHomeInfo/";
    const BASE_URL_EMAIL_TO_EMPLOYER = BASE_API_URL+"user/sendEmailEmp";
    

    useEffect(() => {
        if(sessionStorage.getItem("userType")!='admin' && sessionStorage.getItem("userType")!='user')
    {
        alert("Sorry.Access Not Permitted")
        return window.location.href = BASE_URL_FRONTEND;  

    }
        //fetchData();
        const getUserHomeRoleData = BASE_URL_GET_USER_HOME_ROLE + params;
        const res = axios.get(getUserHomeRoleData, {
         headers: {
             'Content-Type': 'application/json'
         }
         }).then(response =>{
            
            // console.log(" ========== > ", response);
             setMappingData(response.data);
             fetchCourseDetails(response.data);
             fetchData();
             
         });
    },[]);

    async function fetchData() {
        const getUserData = BASE_URL_USER + params
        let response = await axios.get(
            getUserData
        );
        //fetchCourseDetails(response.data.data);
        setUserList(response.data.data);

        const getData = BASE_URL_GET_ALL_HOMELIST
            axios.get(getData).then(function (response) {
            console.log("=====> Res Audit homes ===> ", response);
            //this.setState({homeList: response.data})
            setHomeList(response.data);
          })
         .catch(function (error) {
            console.log(error);
         });;
    }

   
    const fetchCourseDetails = (response) => {
       try {
        var responseArray = [];
        var appliedCrsArr = '';
            const userMappedHome = response.map((c)=>{  
                    const inner = c.role_arr.find(
                    (s) => {
                    var b = { 'userId': c.user_id, 'roleId': s.role_id, 'homeId': c.home_id };
                    axios.post(BASE_URL_GET_COURSELIST, b, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(res => {
                            var resJson = res.data;
                            responseArray.push(resJson);
                            if(resJson === undefined){
                                return alert("Invalid Credentials. Please try again.");
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        })
                    return (responseArray);
                });
                axios.get(BASE_URL_GET_APPLIED_CRS+ c.user_id, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(res => {
                    appliedCrsArr = res.data;
                });
            return (inner);
            });
            setTimeout(() => lastMethodCall(responseArray, appliedCrsArr), 3000);
        }catch (error) {
           console.log(error);
        }
     }
   
     const lastMethodCall = (passresJson, appliedCrsArr) => {
       try {
           var list = [];
           var courseIds = [];
        const arrayOfResponse = passresJson.map((c)=>{  
            const inner = c.completedCourses.find(
                (s) => {
                    if(!courseIds.includes(s.crsId)){
                        courseIds.push(s.crsId);
                         list.push(s)
                    }
                    
                });
                const inner2 = c.pendingCourses.find(
                    (s) => {
                        if(!courseIds.includes(s.crsId)){
                            courseIds.push(s.crsId);
                            list.push(s)
                        }
                        
                    });
                    const inner3 = appliedCrsArr.find(
                        (s) => {
                            if(!courseIds.includes(s.crsId)){
                                courseIds.push(s.crsId);
                                list.push(s)
                            }
                            
                        });
            return list;
        });
            setmsg("Report based on all courses");
            setFinalList(list);
       }catch (error) {
           console.log(error);
        }
     }

     //Excel
     const exportAuditExcel = async e =>{
         var arrayOfData = [];
            {finalList?.map((data, id) => { 
                //console.log(" >><<< ", data)
                var mapForCourses = {
                    'USER NAME': userList.userName,
                    'USER ID': userList.user_id,
                    'EMAIL ID': userList.email,
                    'CONTACT NUMBER': userList.number,
                    'DATE OF BIRTH': userList.dob,
                    'ADDRESS': userList.address+", "+userList.city+", "+userList.state+" , "+userList.postalCode,
                    'COURSE ID': data.crsId,
                    'COURSE TITLE': data.title,
                    'STATUS': data.status,
                    'VALIDITY': data.validity,
                    'SHARED WITH EMPLOYER': data.sharedEmp,
                    'EXTERNAL DOCUMENT': data.extDoc,
                    'TRAINING DURATION': data.trainDuration
                }
                arrayOfData.push(mapForCourses);
            })};

            const worksheet = XLSX.utils.json_to_sheet(arrayOfData);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
            let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
            const data = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8" });
            console.log(data);
            return data;
            //XLSX.writeFile(workbook, "LCPT_UserAuditReport_"+userList.user_id+".xlsx");
     }

     //pdf- Not in use
     const printPdfReport = () => {
        var doc = new jsPDF("p","pt","a4");
        doc.html(document.querySelector("#content"),{
            callback: function(pdf){
                pdf.save("mypdf.pdf");
            }
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
        for (let i = 0; i < finalList.length; i++) {
            var tempArr = [userList.userName, userList.user_id, userList.email,userList.number,userList.dob, userList.address,
            finalList[i]["crsId"],finalList[i]["title"],finalList[i]["status"],finalList[i]["validity"],
            finalList[i]["sharedEmp"],finalList[i]["extDoc"],finalList[i]["trainDuration"]];
            dataArr.push(tempArr);
        }
        let content = {
            startY: 50,
            head: headers,
            body: dataArr
        };
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        var blob =doc.output('blob')
        return blob;
    }

     const formatChange = e => {
        const{name, value} = e.target;
        (value == "pdf")? setformat(1): setformat(0);
     }
     
     const handleOnChange = e => {
        const{name, value} = e.target;
        setselectedHomeId(value);
        setmsg("");
        var index = e.nativeEvent.target.selectedIndex;
        setmsg("User course report : "+e.nativeEvent.target[index].text);
        if(value !== 0){
            const getUserData = BASE_URL_GET_HOME_ROLE_CRS_LIST+value
                axios.get(getUserData).then(function (response) {
                    setroleList(response.data.result);
                    if(response.data.result.length === 0){
                        alert("There is no role mapped with selected Home.");
                    }
            })
            .catch(function (error) {
                console.log(error);
            });;
        }
     }

     const sendDataThroughEmail = e => {
        var fileBlob = "";
        var data = new FormData();
        data.append("userId", params);
        data.append("emailId", empEmailId);
        if(format == 0){
            //excel
            fileBlob = exportAuditExcel();
        }else{
            //pdf
            fileBlob = exportAuditPDF();
        }
        data.append("file", fileBlob);
        axios.post(BASE_URL_EMAIL_TO_EMPLOYER, data)
            .then(response => {
                console.log(response);
            });
     }

     const updateEmpEmailId = e =>{
        const{name, value} = e.target;
        setempEmailId(value);
     }

     const fetchAllCourses = e =>{
        const{name, value} = e.target;
        setFinalList([{'':''}]);
        var index = e.nativeEvent.target.selectedIndex;
        var text = msg;
        text = text.split(" - ")[0];
        text+= " - "+ e.nativeEvent.target[index].text;
        setmsg(text);
       // setcondition(true);
        if(value !== undefined){
            var list = [];
            var courseIds = [];
            var json = { 'userId': params, 'roleId': value, 'homeId': selectedHomeId };
            axios.post(BASE_URL_GET_COURSELIST, json, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                    var resJson = res.data;
                    console.log("Hola ... ",resJson);
                   // const arrayOfResponse = resJson.map((c)=>{  
                        const inner = resJson.completedCourses.find(
                            (s) => {
                                if(!courseIds.includes(s.crsId)){
                                    courseIds.push(s.crsId);
                                        list.push(s)
                                }
                                
                            });
                            const inner2 = resJson.pendingCourses.find(
                                (s) => {
                                    if(!courseIds.includes(s.crsId)){
                                        courseIds.push(s.crsId);
                                        list.push(s)
                                    }
                                    
                                });
                       // return list;
                   // });
                    setFinalList(list);
                })
                .catch(err => {
                    console.log(err);
                })
        }
       
    }

    return (
        <div>
            <br></br>
            <Container style={{minHeight:'20pc'}}>
            <Row>
           
            <Col>
          
            <h3 className='text-center' style={{color:'#0f6fc5'}}> <FaUserCheck/> User Report</h3>
                <br></br>
                    <Row>
                    <Col xs={6} md={5}>
                    <div className='text-left'>
                    <h5><b>User ID :</b> {userList.user_id}</h5>
                    <h5><b>Username : </b>{userList.userName}</h5>
                    <h5><b>Contact : </b>{userList.number}</h5>
                    <h5><b>Email ID : </b>{userList.email}</h5>
                    <h5><b>Address : </b>{userList.address+", "+userList.city+", "+userList.state+" , "+userList.postalCode}</h5>
                    </div>
                    </Col>
                    <Col xs={6} md={7} className='shadow p-3 mb-5 bg-white rounded'>
                        <Form >
                           
                            <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Label>Home</Form.Label>
                                        <Form.Select name="format" onChange={handleOnChange}>
                                            <option value={0} key='0'> -- Please select -- </option>
                                            {homeList?.map((data, id) => (<option value={data.home_id} key={data.home_id}>{data.name}</option>))}
                                        </Form.Select>
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="formGridState">
                                        <Form.Label>Role</Form.Label>
                                        <Form.Select name="format" onChange={fetchAllCourses}>
                                            <option value={0} key='0'> -- Please select -- </option>
                                            {roleList?.map((data, id) => (<option value={data.role_id} key={data.role_id}>{data.role_name}</option>))}
                                        </Form.Select>
                                        </Form.Group>
                                </Row>
                                <hr></hr>
                                <Form.Group id="formGridCheckbox">
                                <Form.Label>Please select format for Audit Report</Form.Label>
                                        <Form.Select name="format" onChange={formatChange}>
                                            <option> -- Choose your format -- </option>
                                                    <option value="excel" key="1">Excel</option>
                                                    <option value="pdf" key="2"> PDF</option>
                                           
                                        </Form.Select>
                                </Form.Group>
                                <br></br>
                                <Form.Group>
                                            <Form.Check type="checkbox" label="Verify and send all data to Employer" />
                                        </Form.Group>
                                        <br></br>
                                        <Row className="sm-3">
                                            <Col xs={6} md={9}>
                                            <Form.Group  as={Col} controlId="formGridName">
                                                <Form.Label>Email ID</Form.Label>
                                                <Form.Control className="w-50" type="text" name="email" onBlur={updateEmpEmailId} placeholder="Employer email ID" />
                                            </Form.Group>
                                            </Col>
                                            <Col xs={6} md={3}>
                                            <Form.Group  as={Col} controlId="formGridName">
                                                <Button variant="primary" onClick={sendDataThroughEmail}><FaRegPaperPlane/> Send</Button>
                                            </Form.Group>
                                            </Col>
                                        </Row>
                              
                        </Form>
                    </Col>
                    </Row>
                   
            </Col>
            </Row>
            <br></br>
            <br></br>
            <Row>
               
                <hr></hr>
                <Row>
                    <Col>
                    <h5>{msg}</h5>
                    </Col>
                </Row>
                <div id="content">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>User Name</th>
                            <th>Course ID</th>
                            <th>Course Title</th>
                            <th>Status</th>
                            <th>Validity</th>
                            <th>Shared with Employer</th>
                            <th>External Document</th>
                            <th>Training Duration</th>
                            </tr>
                        </thead>
                        {finalList?.map((data, id) => { 
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
                                        <tr>
                                            <td>{userList.userName}</td>
                                            <td>{data.crsId}</td>
                                            <td>{data.title}</td>
                                            <td>{data.status}</td>
                                            <td>{data.validity}</td>
                                            <td>{data.sharedEmp}</td>
                                            <td>{data.extDoc}</td>
                                            <td>{data.trainDuration}</td>
                                        </tr>
                                    </tbody>
                            }
                        })}
                        {/* {pendingCourses?.map((data, id) => {
                    return <tbody key={id}>
                        <tr >
                            <td>{userList.fullName}</td>
                            <td>{data.crsId}</td>
                            <td>{data.title}</td>
                            <td>{data.status}</td>
                            <td>{data.validity}</td>
                            <td>{data.sharedEmp}</td>
                            <td>{data.extDoc}</td>
                            <td>{data.trainDuration}</td>
                        </tr>
                        </tbody>
                    })} */}
                    </Table>
                    </div>
                   
            </Row>
            </Container>
            <br>
                    </br>
                    <br></br>
                    <br>
                    </br>
                    <br></br>
                    <br>
                    </br>
                   
        </div>
    )
}

export default UserAuditReport;



