import React, {useState,useEffect} from 'react'
import { Row, Col, Button, Container,  Modal, Spinner, Alert, Form } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { BASE_API_URL } from '../Url-config';
import { BASE_URL_FRONTEND } from '../Url-config';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
//import {Row, Col, Tab, Nav, Button } from 'react-bootstrap';


function UserCourseApplication() {

    const params = useParams().id;
    const [courseList, setCourseList] = useState([{'':''}]); 
    
    const [modalInfo, setmodalInfo] = useState('');
    const [show, setshow] = useState(false);
    const [userId, setuserId] = useState(0);
    
    const [courseBadgeUrl, setCourseBadgeUrl] = useState('');
    const [selectedCourseId, setSelectedCourseId] = useState('');
    
    const BASE_URL_GET_ALLCOURSELIST = BASE_API_URL+"course/getAllCourses/";
    const BASE_URL_SAVE_BADGE_URL = BASE_API_URL+"user/saveBadgeUrl/";

    useEffect(() => {
        if(sessionStorage.getItem("userType")!='admin' && sessionStorage.getItem("userType")!='user') {
            return window.location.href = BASE_URL_FRONTEND;  
        }

        //setuserId(params);
         const getUserHomeRoleData = BASE_URL_GET_ALLCOURSELIST + params;
        const res = axios.get(getUserHomeRoleData, {
         headers: {
             'Content-Type': 'application/json'
         }
         }).then(response =>{
             console.log(" All COURSES ========== > ", response);
             setCourseList(response.data)
         });
    },[]);

    const setBadgeUrlMethod  = e => {
        const{name, value} = e.target
        setCourseBadgeUrl(value);
       };
   
       const submitBadgeUrl = () => {
          // alert(badgeUrl);
           setshow(false);
           if(courseBadgeUrl === ""){
            alert("Please enter valid Badge Url");
           }
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
            }catch (error) {
               console.log(error);
            }
       };
       const handleClose = () => setshow(false);
       const handleShow = () => {
           setshow(true)
       };
       const func2 = (userId,roleId,roleName,trainDuration,validity,crsId,title,reqFrom,badgeUrl,description,document) => {
           var val = userId+","+roleId+","+roleName+","+trainDuration+","+validity+","+crsId+","+title+","+reqFrom+","+badgeUrl+","+description+","+document;
           setSelectedCourseId(crsId);
           setuserId(userId);
           setmodalInfo(val);
       }
     const ModalContent = () =>{
        //Conditional rendering for BadgeURL
       var field = (modalInfo.split(",")[7] === 'Pending')?
       <tr><td className="text-center"><b>Upload Badge URL</b></td>
       <td className="text-left"><Form.Control type="text"  onBlur={setBadgeUrlMethod} name="badgeUrl" placeholder="Please enter your course badge URL" /></td></tr>
       :<tr><td className="text-center"><b> Badge URL</b></td>
       <td className="text-left"><Form.Label>{modalInfo.split(",")[8]} </Form.Label></td></tr>;

       var button = (modalInfo.split(",")[7] === 'Pending')?<Button variant="success" onClick={submitBadgeUrl}>Save</Button>:'';
         return (<Modal show={show} onHide={handleClose} centered>
           <Modal.Body>
              <Row>
                  <h5 className='text-center' style={{color:'#0f6fc5'}}>{modalInfo.split(",")[6]}</h5>
                  <h5 className='text-center' style={{color:'#0f6fc5'}}>{modalInfo.split(",")[5]}</h5>
                  <hr></hr>
                   <table class="panel-body">
                       <tbody>
                       <tr><td className='text-center'><b>User ID</b></td><td className='text-left'><Form.Label>{modalInfo.split(",")[0]} </Form.Label></td></tr>
                       <tr><td className='text-center'><b>Course Description</b></td><td className='text-left'><Form.Label>{modalInfo.split(",")[9]} </Form.Label></td></tr>
                       <tr><td className='text-center'><b>Training Duration</b></td><td className='text-left'><Form.Label>{modalInfo.split(",")[3]} </Form.Label></td></tr>
                       <tr><td className='text-center'><b>Validity</b></td><td className='text-left'><Form.Label>{modalInfo.split(",")[4]} </Form.Label></td></tr>
                       <tr><td className='text-center'><b>External Document</b></td><td className='text-left'><Form.Label>{modalInfo.split(",")[10]} </Form.Label></td></tr>
                       {field}
                       </tbody>
                   </table>
                          
              </Row>
           </Modal.Body>
           <Modal.Footer>
               {button}
           <Button variant="secondary" style={{backgroundColor :'#0f6fc5'}} onClick={handleClose}>
               Close
           </Button>
           </Modal.Footer>
       </Modal>);
     }

     const buttonFormatter = (data, row) => {
        console.log(row.applied, row.applied === "No")
        if(row.applied === "No"){
            return <Button variant="warning" onClick={function(event){ handleShow(); func2(row.userId,row.roleId,row.roleName,
                row.trainDuration,row.validity, row.crsId, row.title,row.status, row.badgeUrl, row.description, row.extDoc);}}>
                    Apply
            </Button>;
        }else{
            return <Button variant="success" onClick={function(event){ handleShow(); func2(row.userId,row.roleId,row.roleName,
                row.trainDuration,row.validity, row.crsId, row.title,row.status, row.badgeUrl, row.description, row.extDoc);}}>
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
        dataField:"crsId",
        text:"Course ID",
        sort:true,
        filter: textFilter(),
        style: {
            fontWeight: 'bold',
            height: '5%'
        }
        
    },
    {
        dataField:"title",
        text:"Title",
        filter: textFilter(),
        title: (cell, row, rowIndex, colIndex) => `${cell}`
    },
    {
        dataField:"trainDuration",
        text:"Training Duration",
    },
    {
        dataField:"validity",
        text:"Validity",
    },
    {
        dataField:"applied",
        text:"Applied",
    },
    {
        dataField:"status",
        text:"Status",
    },
    {
        dataField:"valid",
        text:"Valid Upto",
    },
    {
        dataField:"sharedEmp",
        text:"Shared With Employer",
    },
    {
        dataField:"",
        text:"View",
        formatter: buttonFormatter
    }

    ]

    
    const CaptionElement = () => <h4 style={{ borderRadius: '0.25em', textAlign: 'center', color:'#0f6fc5', border: '1px solid #0f6fc5', padding: '0.2em' }}>All Courses</h4>;

    return (
        <div>
            <Container>
                <Row>
                    <Col xs={12} md={12}>
                        <CaptionElement/>
                        <BootstrapTable columns={columns} 
                        keyField="id" 
                        data={courseList} 
                        pagination={ paginationFactory(options) } 
                        filter={ filterFactory() } 
                        filterPosition="top"
                        striped 
                        hover 
                        condensed />
                    {/* <BootstrapTable data={courseList} striped={true} hover={true}>
                        <TableHeaderColumn dataField="crsId" columnFilter={true} isKey={true} dataAlign="center" dataSort={true}>Course ID</TableHeaderColumn>
                        <TableHeaderColumn dataField="title" dataSort={true}>Title</TableHeaderColumn>
                        <TableHeaderColumn dataField="description" >Description</TableHeaderColumn>
                        <TableHeaderColumn dataField="trainDuration" dataAlign="center" dataSort={true}>Train Duration</TableHeaderColumn>
                        <TableHeaderColumn dataField="validity" dataSort={true}>Validity</TableHeaderColumn>
                        <TableHeaderColumn dataField="applied">Applied</TableHeaderColumn>
                        <TableHeaderColumn dataField="status" dataAlign="center" dataSort={true}>Status</TableHeaderColumn>
                        <TableHeaderColumn dataField="valid" dataSort={true}>Valid Upto</TableHeaderColumn>
                        <TableHeaderColumn dataField="extDoc" >External Document</TableHeaderColumn>
                        <TableHeaderColumn dataField="sharedEmp" >Shared to Employer</TableHeaderColumn>
                        <TableHeaderColumn dataField="badgeUrl" >Badge URL</TableHeaderColumn>
                        <TableHeaderColumn dataField="" >View</TableHeaderColumn>
                    </BootstrapTable> */}
                    </Col>
                </Row>
            <Row>
            {/* <Col xs={12} md={12}>
            <h2>All Course List</h2> */}
            {/* <Table striped bordered hover style={{maxHeight: '15pc'}}>
                <thead>
                    <tr>
                    <th>Code</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Training Duration</th>
                    <th>Validity Duration</th>
                    <th>Applied</th>
                    <th>Status</th>
                    <th>Valid Upto</th>
                    <th>External Document</th>
                    <th>Shared with Employer</th>
                    <th>Badge URL</th>
                    
                    <th>View</th>
                    </tr>
                </thead>
                {courseList?.map((data, id) => { 
                     
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
                               
                                <td>{data.crsId}</td>
                                <td>{data.title}</td>
                                <td>{data.description}</td>
                                <td>{data.trainDuration}</td>
                                <td>{data.validity}</td>
                                <td>{data.applied}</td>
                                <td>{data.status}</td>
                                <td>{data.valid}</td>
                                <td>{data.extDoc}</td>
                                <td>{data.sharedEmp}</td>
                                <td>{data.badgeUrl}</td>
                                    <td>
                                    <Button variant="warning" onClick={function(event){ handleShow(); func2(data.userId,data.roleId,data.roleName,
                                        data.trainDuration,data.validity, data.crsId, data.title,data.status);}}>
                                            {buttonText}
                                    </Button></td>
                            </tr>
                        </tbody>
                        }
                })}
            </Table> */}
            </Row>
            </Container>
            {show ? <ModalContent/> : null}
        </div>
    )
}

export default UserCourseApplication;



