import React from 'react';
import '../../static/App.css';
import jwt_decode from 'jwt-decode'
import { getAccounts } from '../services/DataServices';
import { addUser } from '../services/UserServices';
import { deleteUser } from '../services/UserServices';
import MaterialTable from 'material-table';

class Accounts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accounts: [], term: '',
            columns: [
                { title: 'Username', field: 'username' },
                { title: 'Trial Time', field: 'trial_time', },
                { title: 'Status', field: 'status' },
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
        });

    }

    onAdd(newData){
        if(!newData.status){
            newData.status = 'super admin added';
        }
        const newUser = {
            username: newData.username,
            trial_time: Number(newData.trial_time)
        }
        addUser(newUser).then(res =>{
            console.log('on Add '+newData.username,newData.trial_time,newData.status);
            this.getAll();
          }).catch(err => {
            console.log(err);
        }); 
    }

    onDelete(oldData){
        console.log('on Delete ' + oldData.username);
        deleteUser(oldData)
        this.getAll();
    }


    render() {
        return (
            <div>
                <div className="table">
                    <MaterialTable
                        style={{
                        
                        }}
                        title="All Accounts"
                        columns={this.state.columns}

                        data={this.state.accounts}

                        editable={{
                            onRowAdd: newData =>
                                new Promise(resolve => {
                                    setTimeout(() => {
                                        resolve();
                                        const data = [this.state.data];
                                        data.push(newData);
                                        this.setState({ ...this.state.data, data });
                                        this.onAdd(newData);
                                    }, 100)
                                }),
                            onRowUpdate: (newData, oldData) =>
                                new Promise(resolve => {
                                    setTimeout(() => {
                                        resolve();
                                        const data = [...this.state.data];
                                        data[data.indexOf(oldData)] = newData;
                                        this.setState({ ...this.state, data });
                                    }, 100);
                                }),
                            onRowDelete: oldData =>
                                new Promise(resolve => {
                                    setTimeout(() => {
                                        resolve();
                                        const data = [this.state.data];
                                        data.splice(data.indexOf(oldData), 1);
                                        this.setState({ ...this.state, data });
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