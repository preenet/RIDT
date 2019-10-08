import React from 'react';
import '../../static/App.css';
import { getPending } from '../services/DataServices';
import MaterialTable from 'material-table';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { approveAll } from '../services/UserServices';
import { rejectAll } from '../services/UserServices';
import { approve } from '../services/UserServices';
import { reject } from '../services/UserServices';


class WaitingList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accounts: [],
            columns: [
                { title: 'Username', field: 'username', editable: 'never' },
                {
                    title: 'Status', field: 'status',
                    editable: 'always',
                    lookup: { 'approved': 'approved', 'pending': 'pending', 'rejected': 'rejected' }
                },
            ],
            open: false,
            info: ''
        };

    }
    handleClickApprove() {
        this.setState({ info: 'APPROVE', open: true })

    }

    handleClicknReject() {
        this.setState({ info: 'REJECT', open: true })
    }

    handleClickYes(e) {
        console.log(e.target.value);
        if (e.target.value === 'APPROVE YES') {
            approveAll();
            this.getPending();
        }
        if (e.target.value === 'REJECT YES') {
            rejectAll();
            this.getPending();
        }
        this.setState({ open: false })
    }

    onEdit(oldData, newData) {
        console.log(newData.status);
        if (newData.status === 'approved') {
            approve({ username: oldData.username }).then(res => {
                console.log('on Approve ' + oldData.username);
                this.getPending();
            }).catch(err => {
                console.log(err);
            });
        } else if (newData.status === 'rejected') {
            reject({ username: oldData.username }).then(res => {
                console.log('on Reject ' + oldData.username);
                this.getPending();
            }).catch(err => {
                console.log(err);
            });
        }
    }

    handleClickNo(e) {
        console.log(e.target.value);
        this.setState({ open: false })
    }

    handleClose() {
        this.setState({ open: false })
    }

    componentDidMount() {
        this.getPending();
    }

    getPending = () => {
        getPending().then(data => {
            if (data) {
                this.setState(
                    {
                        accounts: data.results
                    },
                )
            } else {
                alert('Cannot connect to database, please try again!');
            }

        });
    }

    render() {
        return (
            <div >
                <div className="table">

                    <div>
                        <button type="button" onClick={this.handleClickApprove.bind(this)} className="mini-controller"> Approve All </button>
                        <button type="button" onClick={this.handleClicknReject.bind(this)} className="mini-controller"> Reject All </button>
                        <Dialog
                            style={{ 'height': '50%' }}
                            open={this.state.open}
                            onClose={this.handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">{this.state.info} all users?</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Are you sure you want to {this.state.info} all users in the waiting list?
            </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <button className="mini-controller" onClick={e => this.handleClickNo(e, 'value')} value={this.state.info + ' NO'} color="primary">
                                    No
            </button>
                                <button className="mini-controller" onClick={e => this.handleClickYes(e, 'value')} value={this.state.info + ' YES'} color="primary" autoFocus>
                                    Yes
            </button>
                            </DialogActions>
                        </Dialog>
                    </div>
                    <MaterialTable
                        style={{
                            'width': '50%',
                            'left': '25%'
                        }}
                        title="Waiting List"
                        columns={this.state.columns}

                        data={this.state.accounts}

                        editable={{

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

                        }}
                    />
                </div>



            </div>
        );
    }
}


export default WaitingList;