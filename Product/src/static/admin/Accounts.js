import React from 'react';
import '../../static/App.css';
import jwt_decode from 'jwt-decode'
import { getAccounts } from '../services/DataServices';
import { addUser } from '../services/UserServices';
import { deleteUser } from '../services/UserServices';
import { editUser } from '../services/UserServices';
import MaterialTable from 'material-table';

class Accounts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accounts: [],
            columns: [
                { title: 'Username', field: 'username', editable: 'always' },
                { title: 'Trial Time', field: 'trial_time', editable: 'onAdd', type: 'numeric' },
                {
                    title: 'Status', field: 'status',
                    editable: 'always',
                    lookup: { 'approved': 'approved', 'pending': 'pending','rejected':'rejected' }
                },
            ],
        };

    }

    componentDidMount() {
        this.getAll();
        const token = localStorage.usertoken;
        const decoded = jwt_decode(token);
        console.log(decoded.identity);
    }

    getAll = () => {
        getAccounts().then(data => {
            this.setState(
                {
                    accounts: [...data]
                },
            )
        }).catch(err => {
            alert('Cannot connect to database, please try again!');
        })
    }

    onAdd(newData) {
        const newUser = {
            username: newData.username,
            trial_time: Number(newData.trial_time),
            status: newData.status
        }
        addUser(newUser).then(res => {
            console.log('on Add ' + newData.username, newData.trial_time, newData.status);
            this.getAll();
        }).catch(err => {
            console.log(err);
        });
    }

    onDelete(oldData) {
        console.log('on Delete ' + oldData.username);
        deleteUser(oldData)
        this.getAll();
    }

    onEdit(oldData, newData) {
        editUser({ username: oldData.username, info: newData.username, status: newData.status }).then(res => {
            console.log('on Edit ' + oldData.username);
            this.getAll();
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        return (
            <div>
                <div className="table">
                    <MaterialTable
                        style={{
                            'width': '50%',
                            'left': '25%'
                        }}
                        title="All Accounts"
                        columns={this.state.columns}
                        data={this.state.accounts}

                        editable={{
                            onRowAdd: newData =>
                                new Promise(resolve => {
                                    setTimeout(() => {
                                        resolve();
                                        const data = [this.state.accounts];
                                        data.push(newData);
                                        this.setState({ ...this.state.accounts, data });
                                        this.onAdd(newData);
                                    }, 100)
                                }),
                            onRowUpdate: (newData, oldData) =>
                                new Promise(resolve => {
                                    setTimeout(() => {
                                        resolve();
                                        const data = [...this.state.accounts];
                                        data[data.indexOf(oldData)] = newData;
                                        this.setState({ ...this.state.accounts, data });
                                        console.log(oldData)
                                        console.log(newData)
                                        this.onEdit(oldData, newData);
                                    }, 100);
                                }),
                            onRowDelete: oldData =>
                                new Promise(resolve => {
                                    setTimeout(() => {
                                        resolve();
                                        const data = [this.state.accounts];
                                        data.splice(data.indexOf(oldData), 1);
                                        this.setState({ ...this.state.accounts, data });
                                        this.onDelete(oldData);
                                    }, 100);
                                }),
                        }}
                    />
                </div>


            </div>
        );
    }
}

export default Accounts;