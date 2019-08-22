import axios from 'axios';

export const register = newUser => {
    return axios
    .post("users/register", {
        username: newUser.username,
        password: newUser.password
    })
    .then(response => {
        console.log('Registered')
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

export const adminlogin = user => {
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