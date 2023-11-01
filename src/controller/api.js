import Axios from 'axios';

function getDashboardData() {
    // get data and save it to data variable
    const data = Axios.get('http://localhost:8000/api/dashboard');
    return data;
}

export {getDashboardData};