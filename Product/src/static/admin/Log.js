import React from 'react';
import '../../static/App.css';
import MaterialTable from 'material-table';
import { getLog } from '../services/DataServices';

class Log extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accounts: [],
            columns: [
                { title: 'ID', field: 'log_id', },
                { title: 'User', field: 'creator', },
                { title: 'Time', field: 'time', },
                { title: 'Type', field: 'type', },
                { title: 'Content', field: 'content', },
            ],
        };

    }

    componentDidMount() {
        this.getAll();
    }

    getAll = () => {
        getLog().then(data => {
            this.setState(
                {
                    logs: [...data]
                },
            )
        }).catch(err => {
            alert('Cannot connect to database, please try again!');
        })
    }


    render() {
        return (
            <div >
                <MaterialTable
                    style={{
                        'width': '50%',
                        'left': '25%'
                    }}
                    title="System Logs"
                    columns={this.state.columns}
                    data={this.state.logs}


                />
            </div>
        );
    }
}

export default Log;