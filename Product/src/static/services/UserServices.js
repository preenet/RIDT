import axios from 'axios';

export const register = newUser => {
    return axios
    .post("users/register", {
        username: newUser.username,
        password: newUser.password
    })
    .then(response => {
        console.log(newUser.username + ' registered')
    })
}

export const login = user => {
    return axios
    .post("users/login",{
        username: user.username,
        password: user.password
    })
    .then(response => {
        localStorage.setItem('usertoken',response.data.token)
        return response.data.token
    })
    .catch(err => {
        console.log(err)
    })
}

export const adminLogin = user => {
    return axios
    .post("admin/login",{
        username: user.username,
        password: user.password
    })
    .then(response => {
        localStorage.setItem('admintoken',response.data.token)
        return response.data.token
    })
    .catch(err => {
        console.log(err)
    })
}

export const addUser = newUser => {
    return axios
    .post("admin/add",{
        username: newUser.username,
        trial_time: newUser.trial_time,
        status : newUser.status
    })
    .then(response => {
        console.log(newUser.username + 'added')
    })
}


export const deleteUser = oldUser => {
    return axios
        .delete(`admin/delete/${oldUser.username}`, {
            headers: { 'Content-type': 'application/json' }
        })
        .then((response) => {
            console.log(response)
            console.log(oldUser.username + ' deleted')
        })
        .catch((response) => {
            console.log(response)
        })
}

export const editUser = info => {
    return axios
        .post('admin/edit/', {
            username: info.username,
            info: info.info,
            status: info.status
        })
        .then((response) => {
            console.log(response)
            console.log(info.username + ' changed to ' + info.info)
        })
        .catch((response) => {
            console.log(response)
        })
}

export const approveAll = () => {
    return axios
        .post('admin/approve-all', {
            headers: { 'Content-type': 'application/json' }
        })
        .then((response) => {
            console.log(response)
            
        })
        .catch((response) => {
            console.log(response)
        })
}


export const rejectAll = () => {
    return axios
        .post('admin/reject-all', {
            headers: { 'Content-type': 'application/json' }
        })
        .then((response) => {
            console.log(response)
            
        })
        .catch((response) => {
            console.log(response)
        })
}


export const approve = info => {
    return axios
        .post('/admin/approve', {
            username: info.username,
        })
        .then((response) => {
            console.log(response)
            console.log(info.username + ' approved')
        })
        .catch((response) => {
            console.log(response)
        })
}

export const reject = info => {
    return axios
        .post('/admin/reject', {
            username: info.username,
        })
        .then((response) => {
            console.log(response)
            console.log(info.username + ' rejected')
        })
        .catch((response) => {
            console.log(response)
        })
}

export const editPassword = info => {
    return axios
        .post('users/edit/password', {
            username: info.username,
            password: info.password,
            new_password: info.new_password
        })
        .then((response) => {
            console.log(response)
            console.log(info.username + ' \'s password changed')
        })
        .catch((response) => {
            console.log(response)
        })
}


export const editUsername = info => {
    return axios
        .post('users/edit/username', {
            username: info.username,
            info: info.info
        })
        .then((response) => {
            console.log(response)
            console.log(info.username + ' \'s password changed')
        })
        .catch((response) => {
            console.log(response)
        })
}