import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import CreateCourseForm from '../Course_Components/createCourseForm';
import ViewCourseTable from '../Course_Components/viewCourseTable';
import EditCourseForm from '../Course_Components/editCourseForm';
import DeleteCourseForm from '../Course_Components/deleteCourseForm';
import AdminHomeCourse from './AdminHomeCourse';
import AdminUserCourse from './AdminUserCourse';
function MicroCredsDashboard() {

    return (
        <div style={{ marginTop: "1vh" }}>
            <Tabs defaultActiveKey="course" fill>

                <Tab eventKey="course" title="Course" style={{ marginTop: "1vh" }}>
                    <Tabs defaultActiveKey="view" fill>
                        <Tab eventKey="create_form" title="Create Course">
                            <CreateCourseForm />
                        </Tab>
                        <Tab eventKey="view" title="View Courses">
                            <ViewCourseTable />
                        </Tab>
                        <Tab eventKey="update_form" title="Update Course">
                            <EditCourseForm />
                        </Tab>
                        <Tab eventKey="delete_form" title="Delete Course">
                            <DeleteCourseForm />
                        </Tab>
                    </Tabs>
                </Tab>


                <Tab eventKey="course-home-mapping" title="course-home-mapping">
                    <h1 style={{ textAlign: "center" }}>course-home-mapping</h1>
                    <AdminHomeCourse />

                </Tab>


                <Tab eventKey="course-user-mapping" title="course-user-mapping">
                    <h1 style={{ textAlign: "center" }}>course-user-mapping</h1>
                    <AdminUserCourse />
                </Tab>
            </Tabs>
        </div>
    )

}

export default MicroCredsDashboard