import React, {useState,useEffect} from 'react'
import { Form, Row, Col, Button, Container, Table } from 'react-bootstrap'
import axios from 'axios';
import { useParams, Link } from "react-router-dom";
import * as XLSX from "xlsx";
import { BASE_API_URL } from '../Url-config';
import { BASE_URL_FRONTEND } from '../Url-config';
function UserAuditReport() {

    const params = useParams().id;
    const [courseList, setCourseList] = useState([]); 
    const [completedCourses, setCompletedCourses] = useState([]);
    const [pendingCourses, setPendingCourses] = useState([]);
    const [userList, setUserList] = useState([]);
    const [finalList, setFinalList] = useState([]);
    const [mappingData, setMappingData] = useState([{'':''}]);
    
   
    // https://lcpt-webportal.herokuapp.com/
    const BASE_URL_GET_COURSELIST = BASE_API_URL+"course/fetchCourseDetails";
    const BASE_URL_USER = BASE_API_URL+"user/getUser/";
    const BASE_URL_GET_USER_HOME_ROLE = BASE_API_URL+"user/fetchUHRdetails/";

    useEffect(() => {
        if(sessionStorage.getItem("userType")!='admin' && sessionStorage.getItem("userType")!='user')
    {
        return window.location.href = BASE_URL_FRONTEND;  
    
    }
        //fetchData();
        const getUserHomeRoleData = BASE_URL_GET_USER_HOME_ROLE + params;
        const res = axios.get(getUserHomeRoleData, {
         headers: {
             'Content-Type': 'application/json'
         }
         }).then(response =>{
             console.log(" ========== > ", response);
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
    }

   
    const fetchCourseDetails = (response) => {
       try {
           //setUserList(response[0]);
           console.log("> Get Audit  userlist: ",userList);
           console.log("> Get Audit  Response: ",response);
          
        var responseArray = [];
           //const inner = response.role_arr.find(
            const userMappedHome = response.map((c)=>{  
                const inner = c.role_arr.find(
                (s) => {
                var b = { 'userId': c.user_id, 'roleId': s.role_id, 'homeId': c.home_id };
                console.log("Audit request body : ",b);
                axios.post(BASE_URL_GET_COURSELIST, b, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(res => {
                        console.log('+++++++++++ Audit Report => ',res);
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
            return (inner);
            });
            //console.log("In the middle => ", inner);
            console.log("In the middle json => ", responseArray);
            console.log("In the middle Audit => ", userMappedHome);

            setTimeout(() => lastMethodCall(responseArray), 3000);
               
    
       }catch (error) {
           console.log(error);
        }
     }
   
     const lastMethodCall = (passresJson) => {
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
            return list;
        });
           //setCourseList(passresJson);
           console.log("> Mapped Home list : "+list);
           //setCompletedCourses(passresJson.completedCourses);
           //setPendingCourses(passresJson.pendingCourses);
            setFinalList(list);
             // className='text-center' style={{justifyContent:'center', maxWidth: '450px'}}
       }catch (error) {
           console.log(error);
        }
     }

     const printAuditReport = async e =>{
         var arrayOfData = [];
      // arrayOfData.push(mapForUserData);
      var courseIds = [];
        {finalList?.map((data, id) => { 
            console.log(" >><<< ", data)
           
            
            var mapForCourses = {
                'USER NAME': userList.fullName,
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
         
        // {pendingCourses?.map((data, id) => { 
        // console.log(" >><<< ", data)
        //     var mapForCourses = {
        //         'USER NAME': userList.fullName,
        //         'USER ID': userList.userId,
        //         'EMAIL ID': userList.email,
        //         'CONTACT NUMBER': userList.number,
        //         'DATE OF BIRTH': userList.dob,
        //         'ADDRESS': userList.address+", "+userList.city+", "+userList.state+" , "+userList.postalCode,
        //         'COURSE ID': data.crsId,
        //         'COURSE TITLE': data.title,
        //         'STATUS': data.status,
        //         'VALIDITY': data.validity,
        //         'SHARED WITH EMPLOYER': data.sharedEmp,
        //         'EXTERNAL DOCUMENT': data.extDoc,
        //         'TRAINING DURATION': data.trainDuration
        //     }
        //     arrayOfData.push(mapForCourses);
        // })};
        setFinalList(arrayOfData);
        console.log('////// ', arrayOfData);

        const worksheet = XLSX.utils.json_to_sheet(arrayOfData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
        XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
        XLSX.writeFile(workbook, "DataSheet.xlsx");
     }


    return (
        <div>
            <br></br>
            <Container style={{minHeight:'20pc'}}>
            <Row>
           
            <Col>
          
            <h3 className='text-center' style={{color:'#0f6fc5'}}>User Report</h3>
                <br></br>
                <br></br>
                <br></br>
                    <Row>
                    <Col>
                    <div className='text-left'>
                    <h5><b>User ID :</b> {userList.user_id}</h5>
                    <h5><b>Username : </b>{userList.fullName}</h5>
                    <h5><b>Contact : </b>{userList.number}</h5>
                    <h5><b>Email ID : </b>{userList.email}</h5>
                    <h5><b>Address : </b>{userList.address+", "+userList.city+", "+userList.state+" , "+userList.postalCode}</h5>
                    </div>
                    </Col>
                    <Col>
                        <Form>
                            <Form.Group id="formGridCheckbox">
                                <Form.Label>Please select format to download Audit Report</Form.Label>
                                <Form.Select defaultValue="Choose...">
                                    <option>Choose...</option>
                                    <option>Xlsx</option>
                                    <option>Pdf</option>
                                </Form.Select>
                               <br></br>
                               <br></br>
                                <Form.Check type="checkbox" label="Verify and send all data to Employer" />
                                <hr></hr>
                                <div className='text-center'>
                                <Button variant="primary" onClick={printAuditReport}>Generate Report</Button>
                                </div>
                            </Form.Group>
                        </Form>
                    </Col>
                    </Row>
                   
            </Col>
            </Row>
            <br></br>
            <br></br>
            <Row>
               
                <hr></hr>
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
                    return <tbody key={id}>
                                <tr>
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



