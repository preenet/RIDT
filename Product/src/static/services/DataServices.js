import axios from 'axios';



export const getAccounts = () => {
    return axios
        .get('/users/get-all', {
            headers: { 'Content-type': 'application/json' }
        })
        .then(res => {
            return res.data
        })
}


export const getUser = user => {
    return axios
        .get(`/users/get/${user.username}`, {
            headers: { 'Content-type': 'application/json' }
        })
        .then((response) => {
            return response.data
        }).catch((response) => {
            console.log(response)
        })

}

export const getPending = () => {
    return axios
        .get('/admin/get-pending', {
            headers: { 'Content-type': 'application/json' }
        })
        .then((response) => {
            return response.data
        }).catch((response) => {
            console.log(response)
        })

}


export const getNumber = () => {
    return axios.get('/data/get-number', {
        headers: { 'Content-type': 'application/json' }
    })
        .then((response) => {
            return response.data
        }).catch((response) => {
            console.log(response)
        })
}

export const getTotalCount = () => {
    return axios.get('/data/get-total-count', {
        headers: { 'Content-type': 'application/json' }
    })
        .then((response) => {
            return response.data
        }).catch((response) => {
            console.log(response)
        })
}

export const getPositiveCount = () => {
    return axios.get('/data/get-positive-count', {
        headers: { 'Content-type': 'application/json' }
    })
        .then((response) => {
            return response.data
        }).catch((response) => {
            console.log(response)
        })
}

export const getNegativeCount = () => {
    return axios.get('/data/get-negative-count', {
        headers: { 'Content-type': 'application/json' }
    })
        .then((response) => {
            return response.data
        }).catch((response) => {
            console.log(response)
        })
}

export const getNeutralCount = () => {
    return axios.get('/data/get-neutral-count', {
        headers: { 'Content-type': 'application/json' }
    })
        .then((response) => {
            return response.data
        }).catch((response) => {
            console.log(response)
        })
}



export const getHotelList = () => {
    return axios.get('/data/get-hotel', {
        headers: { 'Content-type': 'application/json' }
    })
        .then((response) => {
            return response.data
        }).catch((response) => {
            console.log(response)
        })
}


export const getHotelByName = hotel => {
    return axios
        .get(`/data/get-hotel/${hotel.name}`, {
            headers: { 'Content-type': 'application/json' }
        })
        .then((response) => {
            return response
        })
        .catch((response) => {
            console.log(response)
        })
}

export const addComment = comment => {
    return axios
    .post("/data/add-comment",{
        content: comment.content,
        hotel: comment.hotel,
        user: comment.username,
        socket_id: comment.socket_id
    })
    .then(response => {
        console.log('new comment added')
    })
}

export const getLog = () => {
    return axios
        .get('/data/get-log', {
            headers: { 'Content-type': 'application/json' }
        })
        .then(res => {
            return res.data
        })
}

export const getWords = () => {
    return axios
        .get('/data/get-words', {
            headers: { 'Content-type': 'application/json' }
        })
        .then(res => {
            return res.data
        })
}

export const getTop10 = () => {
    return axios
        .get('/data/get-top10', {
            headers: { 'Content-type': 'application/json' }
        })
        .then(res => {
            return res.data
        })
}

export const getPositiveLine = () => {
    return axios
        .get('/data/get-line', {
            headers: { 'Content-type': 'application/json' }
        })
        .then(res => {
            return res.data
        })
}
