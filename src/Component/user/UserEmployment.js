import React from 'react'
import {Tabs, Tab, } from 'react-bootstrap';
import UserCourses from './UserCourses';
//import UserCoursesCheck from './UserCoursesCheck';
import UserCourseApplication from './UserCourseApplication';

function UserEmployment() {
    return (
        // <div>
        //     <Tab.Container id="left-tabs-example" defaultActiveKey="userCourses">
        //     <Row>
        //         <Col sm={2} className='text-center py-1 px-1' style={{backgroundColor:'#f8f9fa'}}>
        //         <Nav variant="pills" className="flex-column">
        //             <Nav.Item>
        //                 <Button as={Nav.Link} variant="primary" eventKey="userCourseApplication">Overview</Button>
                       
        //             </Nav.Item>
        //             <hr></hr>
        //             <Nav.Item>
        //                 <Button as={Nav.Link} variant="primary" eventKey="userCourses">Profile Status</Button>
                        
        //             </Nav.Item>
        //         </Nav>
        //         </Col>
        //         <Col sm={10}>
        //         <Tab.Content>
        //             <Tab.Pane eventKey="userCourseApplication">
        //                 <UserCourseApplication/>
        //             </Tab.Pane>
        //             <Tab.Pane eventKey="userCourses">
        //                 <UserCourses/>
        //             </Tab.Pane>
        //         </Tab.Content>
        //         </Col>
        //     </Row>
        //     </Tab.Container>   
        // </div>

        <div style={{ marginTop: "1pc" }}>
        <Tabs defaultActiveKey="overview" id="uncontrolled-tab-example" className="mb-3" fill>
            <Tab eventKey="overview" title="Overview">
                <UserCourses/>
            </Tab>
            <Tab eventKey="courses" title="Courses">
                <UserCourseApplication/>
            </Tab>
        </Tabs>
        </div>
    )
}

export default UserEmployment;



