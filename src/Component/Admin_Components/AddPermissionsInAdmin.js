import React from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import AddNewAdmin from './AddNewAdmin'
import AddNewOrganizationLogin from './AddNewOrganizationLogin'
function AddPermissionsInAdmin() {
    return (
        <div>

            <Tabs defaultActiveKey="addNewAdmin" id="uncontrolled-tab-example" className="mb-3" fill>
                <Tab eventKey="addNewAdmin" title="Add New Admin Login">
                    <AddNewAdmin />
                </Tab>
                <Tab eventKey="addNewOrganization" title="Add New Organization Login">
                    <AddNewOrganizationLogin />
                </Tab>
            </Tabs>
        </div>
    )
}

export default AddPermissionsInAdmin