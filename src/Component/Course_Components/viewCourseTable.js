import React, { useState, useEffect } from 'react'
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';

function ViewCourseTable() {

    const [allCourses, setAllCourses] = useState([]);
    var cols = [{
        dataField: 'courseID',
        text: 'COURSE ID'
    },
    {
        dataField: 'title',
        text: 'TITLE'
    },
    {
        dataField: 'description',
        text: 'DESCRIPTION'
    },
    {
        dataField: 'training_duration',
        text: 'TRAINING DURATION'
    },
    {
        dataField: 'validity_duration',
        text: 'VALIDITY DURATION'
    },

    ]
    useEffect(() => {
        axios.get("http://localhost:5000/course/view-all-courses")
            .then(res => {
                console.log(res.data[0]);
                setAllCourses(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    })


    return (
        <div>
            <BootstrapTable striped hover keyField='courseID' data={allCourses} columns={cols} />

        </div>
    )
}

export default ViewCourseTable