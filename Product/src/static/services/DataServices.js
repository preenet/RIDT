import axios from 'axios';



export const getAccounts = () => {
    return axios
        .get('/users/get-all', {
            headers: { 'Content-type': 'application/json' }
        })
        .then(res => {
            var data = []
            Object.keys(res.data).forEach(function (key) {
                var val = res.data[key]
                data.push({ username: val.username, trial_time: val.trial_time, status: val.status })
            })
            console.log(data)
            return data
        })
}