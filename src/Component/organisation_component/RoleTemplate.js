
import './organisation.css';
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default function HomeDetailComponent() {
    const {homeId, roleId} = useParams();
    const [templateDetails, setTemplateDetails] = useState({});
    const [showTemplateDetails,setShowTemplateDetails] = useState(false)

    useEffect(() => {
        const params = homeId +"/"+ roleId

        const getRoleTemplateUrl = "https://lcpt-webportal-backend.herokuapp.com/orgnization/getRoleTemplateDetails/" + params
        axios.get(getRoleTemplateUrl)
            .then(res => {
                if(res.data=="" || res.data.length==0)
                console.log("No data")
                else{
                    console.log(res.data[0]);
                    setTemplateDetails(res.data[0])
                    if(templateDetails!={})
                    setShowTemplateDetails(true)
                }
                
            })
            .catch(err => {
                console.log(err);
            })
    }, [])


    function changeRoleTemplateText(event, id) {
        let roleDetailObj ={}; 
        roleDetailObj={...templateDetails};
        if (id === 'det1')
        roleDetailObj.name = event.target.value;
        // else if (id === 'det2')
        // roleDetailObj.contact_firstName = event.target.value;
        // else if (id === 'det3')
        // roleDetailObj.contact_lastName = event.target.value;
        // else if (id === 'det4')
        // roleDetailObj.phone_no = event.target.value;
        // else if (id === 'det5')
        // roleDetailObj.email_id = event.target.value;
        setTemplateDetails(templateDetails=>({
                ...templateDetails,...roleDetailObj
            }));

       // setHomeDetails(newHomeDetailObj);
        console.log("template details:",templateDetails)

    }
    function saveRoleTemplateText(){
        console.log("In saveText")
        console.log(templateDetails)
        axios.put("https://lcpt-webportal-backend.herokuapp.com/orgnization/editRoleTemplateDetails",templateDetails)
            .then(res => {
                console.log(res);
                
            })
            .catch(err => {
                console.log(err);
            })
    }
   

    return (

        <div style={{ marginTop: "8vh" }} >
            <h1>Role Template </h1>
                    <div className='org-container'>
                    <Form>
                        <Form.Group className="mb-2 col-xs-6" controlId="formBasicEmail">
                            <Form.Label>Role Name</Form.Label>
                            <Form.Control type="text" 
                            defaultValue={templateDetails.role_name} onChange={(e) => {
                                changeRoleTemplateText(e, 'det1');
                            }} 
                            />
                        </Form.Group>
                        <Form.Group className="mb-3 col-xs-6" controlId="formBasicEmail">
                            <Form.Label>Role ID</Form.Label>
                            <Form.Control type="text" 
                              defaultValue={templateDetails.role_id} disabled 
                             />
                        </Form.Group>
                        <Form.Group className="mb-3 col-xs-6" controlId="formBasicEmail">
                            <Form.Label>Archived Status</Form.Label>
                            <Form.Control type="text" 
                             defaultValue={templateDetails.archived} disabled
                             />
                        </Form.Group>
                        <Form.Group className="mb-3 col-xs-6" controlId="formBasicEmail">
                            <Form.Label>Courses Mandatory</Form.Label>
                        {showTemplateDetails ? (
        templateDetails.course_details.map((data, id) => {
            return <p key={id}>
                {data.details}
            </p>
        })
      ) : (
                        
                    <p>...Data Loading.....</p>)
                    }
</Form.Group>

                        {/* <Form.Group className="mb-3 col-xs-6" controlId="formBasicEmail">
                            <Form.Label>Courses Mandatory</Form.Label> */}
                           
                                {/* <li>First Aid Training</li>
                                <li>Training in Statistics</li>
                                <li>Training in operating machines</li> */}
                            
                            {/* <div style={{marginLeft:"15%"}}>{templateDetails.course_details.map((courseData) => { return <li style={{ marginBottom: "15px", marginTop: "10px" }} >{courseData.details}</li> })}</div> */}
                        {/* </Form.Group> */}
                        
                        <Button 
                        onClick={saveRoleTemplateText} 
                             variant="warning"  > 
                            Save Changes
                        </Button>
                    </Form>
                    </div>
           </div>)

}