import axios from 'axios';

export const register = newUser => {
    return axios
    .post("users/register", {
        username: newUser.username,
        password: newUser.password
    })
    .then(response => {
        console.log(newUser.username + 'Registered')
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
        localStorage.setItem('usertoken',response.data.token)
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
        trial_time: newUser.trial_time
    })
    .then(response => {
        console.log(newUser.username + 'Added')
    })
}