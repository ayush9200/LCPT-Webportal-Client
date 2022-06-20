import React, {useState,useEffect, useRef} from 'react';
import axios from 'axios';
import { Form, Row, Col, Button, Container, Table, ListGroup, Modal } from 'react-bootstrap';
import { BASE_API_URL } from '../Url-config';
import { BASE_URL_FRONTEND } from '../Url-config';
//BASE_API_URL+"user/";

function UserCoursesCheck() {

    const [selectedHomeId, setselectedHomeId] = useState(0);
    const [roleList, setroleList] = useState([{'':''}]); 
    const [homeList, setHomeList] = useState([{'home_id':'0'}]); 
    const [roleCourseMap, setroleCourseMap] = useState([{'':''}]); 
    const [condition, setcondition] = useState(false);

    const [modalInfo, setmodalInfo] = useState('');
    const [show, setshow] = useState(false);
   

    const BASE_URL_GET_ALL_HOMELIST = BASE_API_URL+"orgnization/getAllHomes";
    const BASE_URL_GET_HOME_ROLE_CRS_LIST = BASE_API_URL+"orgnization/getHomeInfo/";
    const BASE_URL_GET_HRC_LIST = BASE_API_URL+"orgnization/getHRCInfo/";


    useEffect(() => {
        if(sessionStorage.getItem("userType")!='admin' && sessionStorage.getItem("userType")!='user')
    {
        return window.location.href = BASE_URL_FRONTEND;  
    
    }
        fetchData();
    },[]);

    async function fetchData() {
        //var self = this;
        const getUserData = BASE_URL_GET_ALL_HOMELIST
            axios.get(getUserData).then(function (response) {
            console.log("=====> Res===> ", response);
            //this.setState({homeList: response.data})
            setHomeList(response.data);
          })
         .catch(function (error) {
            console.log(error);
         });;
    }

    const handleChange = e =>{
        const{name, value} = e.target;
        console.log(value);
        setselectedHomeId(value);
        if(value !== 0){
            setroleList([{'':''}]);
            setroleCourseMap([{'':''}]);
            const getUserData = BASE_URL_GET_HOME_ROLE_CRS_LIST+value
                axios.get(getUserData).then(function (response) {
                    console.log("=====> Res +++ ===> ", response);
                        setroleList(response.data);
                    
            })
            .catch(function (error) {
                console.log(error);
            });;
        }
    }

    const fetchAllCourses = e =>{
        const{name, value} = e.target;
        setcondition(true);
        if(value !== undefined){
            console.log('Called',value);
            const getUserData = BASE_URL_GET_HRC_LIST+1+"/"+value;
                axios.get(getUserData).then(function (response) {
                    console.log("+*+*+*+*+ Res  *+*+*+* ", response);
                    setroleCourseMap(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });;
        }
       
    }

    const handleClose = () => setshow(false);
    const handleShow = () => {
        setshow(true)
    };
    const func2 = (courseId,title,description,trainDuration,validity) => {
        var val = courseId+","+title+","+description+","+trainDuration+","+validity;
        setmodalInfo(val);
    }
  const ModalContent = () =>{
      return (<Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
        <Modal.Title style={{color:'#0f6fc5'}}>Course Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
           <Row>
                <table class="panel-body">
                    <tbody>
                    <tr><td className='text-center'><b>Course ID</b></td><td className='text-left'><Form.Label>{modalInfo.split(",")[0]} </Form.Label></td></tr>
                    <tr><td className='text-center'><b>Title</b></td><td className='text-left'><Form.Label>{modalInfo.split(",")[1]} </Form.Label></td></tr>
                    <tr><td className='text-center'><b>Description</b></td><td className='text-left'><Form.Label>{modalInfo.split(",")[2]} </Form.Label></td></tr>
                    <tr><td className='text-center'><b>Training Duration</b></td><td className='text-left'><Form.Label>{modalInfo.split(",")[3]} </Form.Label></td></tr>
                    <tr><td className='text-center'><b>Course Validity</b></td><td className='text-left'><Form.Label>{modalInfo.split(",")[4]} </Form.Label></td></tr>
                    <tr><td className='text-center'><b>Upload URL</b></td><td className='text-left'><Form.Control type="text" name="badgeUrl" placeholder="Please enter your course badge URL" /></td></tr>
                    </tbody>
                </table>
                       
           </Row>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="success" onClick={handleClose}>
            Save
        </Button>
        <Button variant="primary" style={{backgroundColor :'#0f6fc5'}} onClick={handleClose}>
            Close
        </Button>
        </Modal.Footer>
    </Modal>);
  }

    return (
        <div style={{minHeight:'100%'}}>
           <Container>
                <Row>
                    <Col xs={6} md={3}></Col>
                    <Col xs={6} md={6}>
                        <Form>
                            <Row className="mb-3">
                                <Form.Group as={Row} controlId="formGridHome">
                                    <Form.Label column sm={3}>Select Home</Form.Label>
                                    <Col sm={9}>
                                        <Form.Select defaultValue="Choose..." onChange={handleChange}>
                                        <option value={0} key='0'> -- Please select -- </option>
                                        {homeList.map((data, id) => (<option value={data.home_id} key={data.home_id}>{data.name}</option>))}
                                        </Form.Select>
                                    </Col>
                                </Form.Group>
                            </Row>
                        </Form>
                    </Col>
                    <Col xs={6} md={3}></Col>
                </Row>
                <Row>
                    <Col xs={6} md={4}>
                        <h5>Select role</h5>
                        <div as={Col} style={{borderBlock:'1px groove'}}>
                            <Col xs={6} md={12}>
                                <ListGroup vertical='true'>
                                    {/* {roleList.map((data, id) => (<Button style={{margin:'2%'}} id={data.role_id} onClick={fetchAllCourses(4)} className={this.state.condition? "class" : "anotherClass"} variant="outline-primary">{data.role_name}</Button>))} */}
                                    {roleList.map((data, id) => (<ListGroup.Item action value={data.role_id} onClick={fetchAllCourses}>{data.role_name}</ListGroup.Item>))}
                                </ListGroup>
                            </Col>
                        </div>
                    </Col>
                    <Col xs={6} md={8}>
                        <div as={Col}>
                            <Col xs={6} md={12}>
                                <h2>Required Courses</h2>
                                <Table striped bordered hover style={{maxHeight: '35pc'}}>
                                    <thead>
                                        <tr>
                                        <th>Code</th>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th>Training Duration</th>
                                        <th>Validity Duration</th>
                                        </tr>
                                    </thead>
                                    {roleCourseMap?.map((data, id) => { 
                                            return <tbody key={id}>
                                                <tr>
                                                    <td>{data.courseID}</td>
                                                    <td>{data.title}</td>
                                                    <td>{data.description}</td>
                                                    <td>{data.training_duration}</td>
                                                    <td>{data.validity_duration}</td>
                                                    <td><Button variant="warning" onClick={function(event){ handleShow(); func2(data.courseID,data.title,data.description,
                                                            data.training_duration,data.validity_duration);}}>
                                                                Apply
                                                            </Button></td>
                                                            
                                                </tr>
                                            </tbody>
                                        })}
                                </Table>
                            </Col>
                        </div>
                    </Col>
                </Row>
            </Container>
            {show ? <ModalContent/> : null}
        </div>
    )
}

export default UserCoursesCheck;



