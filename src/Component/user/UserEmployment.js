import React from 'react'
import {Row, Col, Tab, Nav, Button } from 'react-bootstrap';
import UserCourses from './UserCourses';
import UserCoursesCheck from './UserCoursesCheck';

function UserEmployment() {
    return (
        <div>
            <Tab.Container id="left-tabs-example" defaultActiveKey="userCourses">
            <Row>
                <Col sm={2} className='text-center py-2 px-2' style={{backgroundColor:'#f8f9fa'}}>
                <Nav variant="pills" className="flex-column">
                    <Nav.Item>
                        <Button as={Nav.Link} variant="primary" eventKey="userCoursesCheck">Overview</Button>
                       
                    </Nav.Item>
                    <hr></hr>
                    <Nav.Item>
                        <Button as={Nav.Link} variant="primary" eventKey="userCourses">Profile Status</Button>
                        
                    </Nav.Item>
                </Nav>
                </Col>
                <Col sm={10}>
                <Tab.Content>
                    <Tab.Pane eventKey="userCoursesCheck">
                        <UserCoursesCheck/>
                    </Tab.Pane>
                    <Tab.Pane eventKey="userCourses">
                        <UserCourses/>
                    </Tab.Pane>
                </Tab.Content>
                </Col>
            </Row>
            </Tab.Container>   
        </div>
    )
}

export default UserEmployment;



