"back_end_port": "http://localhost:5000"
"back_end_port": "https://lcpt-webportal-backend.herokuapp.com"

eg of setting up URL
import Config from '../config.json'
var backendPortUrl = Config.back_end_port + '/';
var gethomeDetailsUrl = backendPortUrl + "orgnization/getHomesList/" + organizationID;

