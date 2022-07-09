import React, { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { BASE_API_URL } from '../Url-config';
import { BASE_URL_FRONTEND } from '../Url-config';
import axios from 'axios';

function EnterIndividualForm() {
    const [userIdList, setUserIdList] = useState([]);


    var mainDivStyling = {
        width: "80vw",
        margin: "auto"
    }

    useEffect(() => {
        // user / getAll
        var gethomeDetailsUrl = BASE_API_URL + "user/getAll";
        axios.get(gethomeDetailsUrl)
            .then(res => {

                console.log(res.data.data);
                var userIDListArr = [];
                for (let i = 0; i < res.data.data.length; i++) {
                    userIDListArr.push(res.data.data[i]["user_id"]);
                }
                setUserIdList(userIDListArr)
                console.log()
                // toggleshowSpinner()
            })
            .catch(err => {
                console.log(err);
            })







    }, [])


    return (
        <div style={mainDivStyling}>
            <Autocomplete
                disablePortal
                id="userIdAutoInputs"
                options={userIdList}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Users" />}
            />
            <form autocomplete="off">
                <div class="autocomplete" style={{ width: "300px" }}>
                </div>
                <input type="submit" />
            </form>

        </div>
    )
}

export default EnterIndividualForm