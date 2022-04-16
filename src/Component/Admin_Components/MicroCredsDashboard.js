import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import CreateCourseForm from '../Course_Components/createCourseForm';
import ViewCourseTable from '../Course_Components/viewCourseTable';
function MicroCredsDashboard() {

    return (
        <div >
            <Tabs defaultActiveKey="course" fill>

                <Tab eventKey="course" title="Course">
                    <Tabs defaultActiveKey="form" fill>
                        <Tab eventKey="form" title="Create Course">
                            <CreateCourseForm />
                        </Tab>
                        <Tab eventKey="view" title="View Courses">
                            <ViewCourseTable />
                        </Tab>
                    </Tabs>
                </Tab>


                <Tab eventKey="course-home-mapping" title="course-home-mapping">
                    <h1 style={{ textAlign: "center" }}>course-home-mapping</h1>
                </Tab>


                <Tab eventKey="course-user-mapping" title="course-user-mapping">
                    <h1 style={{ textAlign: "center" }}>course-user-mapping</h1>
                </Tab>
            </Tabs>
        </div>
    )

}

export default MicroCredsDashboard