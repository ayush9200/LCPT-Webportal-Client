import React, {useState,useEffect} from 'react'
import { Form, Row, Col, Button, Container, Table } from 'react-bootstrap'
import axios from 'axios';
import { useParams, Link } from "react-router-dom";
import * as XLSX from "xlsx";

function UserAuditReport() {

    const params = useParams().id;
    const [courseList, setCourseList] = useState([]); 
    const [completedCourses, setCompletedCourses] = useState([]);
    const [pendingCourses, setPendingCourses] = useState([]);
    const [userList, setUserList] = useState([]);
    const [finalList, setFinalList] = useState([]);
  
   
    // https://lcpt-webportal.herokuapp.com/
    const BASE_URL_GET_COURSELIST = "https://lcpt-webportal.herokuapp.com/course/fetchCourseDetails";
    const BASE_URL_USER = "https://lcpt-webportal.herokuapp.com/user/getUser/";

    useEffect(() => {
        fetchData();
    },[]);

    async function fetchData() {
        const getUserData = BASE_URL_USER + params
        let response = await axios.get(
            getUserData
        );
        fetchCourseDetails(response.data.data);
    }

   
    const fetchCourseDetails = async (response) => {
       try {
           setUserList(response);
           const body = JSON.stringify({ userId: userList.userId, orgId: userList.orgId, roleId: userList.roleId, homeId: userList.homeId });
           console.log(body);
           var resJson = [];
           const res = await axios.post(BASE_URL_GET_COURSELIST, body, {
               headers: {
                   'Content-Type': 'application/json'
               }
           }).then(res => {
                   console.log('+++++++++++ = ',res);
                   resJson = res.data;
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
                 }else{
                   return alert("Invalid Credentials. Please try again.");
                 }
               })
               .catch(err => {
                   console.log(err);
               })
               
    
       }catch (error) {
           console.log(error);
        }
     }
   
     const lastMethodCall = async(passresJson) => {
       try {
           setCourseList(passresJson);
           console.log("> Course list : "+courseList);
           console.log("> Pending Courses : "+courseList.pendingCourses);
           console.log("> CompletedCourses : "+courseList.completedCourses);
           console.log("> Course list All in system : "+courseList.allCourseList);
   
           setCompletedCourses(courseList.completedCourses);
           setPendingCourses(courseList.pendingCourses);

             // className='text-center' style={{justifyContent:'center', maxWidth: '450px'}}
       }catch (error) {
           console.log(error);
        }
     }

     const printAuditReport = async e =>{
         var arrayOfData = [];
      // arrayOfData.push(mapForUserData);
        {completedCourses?.map((data, id) => { 
            console.log(" >><<< ", data)
            var mapForCourses = {
                'USER NAME': userList.fullName,
                'USER ID': userList.userId,
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
          
        {pendingCourses?.map((data, id) => { 
        console.log(" >><<< ", data)
            var mapForCourses = {
                'USER NAME': userList.fullName,
                'USER ID': userList.userId,
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
          
                    <Row>
                    <Col></Col>
                    <Col>
                        <Form>
                            <Form.Group id="formGridCheckbox">
                                <Form.Label>Please select format to download Audit Report</Form.Label>
                                <Form.Select defaultValue="Choose...">
                                    <option>Choose...</option>
                                    <option>Xlsx</option>
                                    <option>Pdf</option>
                                </Form.Select>
                                <hr></hr>
                                <Form.Check type="checkbox" label="Verify and send all data to Employer" />
                                <hr></hr>
                                <div className='text-center'>
                                <Button variant="primary" onClick={printAuditReport}>Submit</Button>
                                </div>
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col></Col>
                    </Row>
                   
            </Col>
            </Row>
            <br></br>
            <br></br>
            <Row>
                <h3 className='text-center' style={{color:'#0f6fc5'}}>User Report</h3>
              
                <div className='text-center' style={{color:'#0f6fc5'}}>
                <h5><b>User ID :</b> {userList.userId}</h5>
                <h5><b>Username : </b>{userList.fullName}</h5>
                <h5><b>Contact : </b>{userList.number}</h5>
                <h5><b>Email ID : </b>{userList.email}</h5>
               <h5><b>Address : </b>{userList.address+", "+userList.city+", "+userList.state+" , "+userList.postalCode}</h5>
                </div>
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
                        {completedCourses?.map((data, id) => { 
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
                        {pendingCourses?.map((data, id) => {
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
                    })}
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
                    <br></br>
                    <br>
                    </br>
                    <br></br>
        </div>
    )
}

export default UserAuditReport;



