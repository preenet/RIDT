import React from 'react';
import '../../static/App.css';
import jwt_decode from 'jwt-decode';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { editPassword, editUsername } from '../services/UserServices';
import { withRouter } from 'react-router-dom';

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      status: '',
      trial_time: '',
      passwordChangeOpen: false,
      usernameChangeOpen: false,
      password: '',
      newPassword: '',
      newUsername: '',
      errors: [],
    };

  }

  componentDidMount() {
    if (localStorage.usertoken) {
      const token = localStorage.usertoken;
      const decoded = jwt_decode(token);
      this.setState({
        username: decoded.identity.username,
        status: decoded.identity.status,
        trial_time: decoded.identity.trial_time,
      });
    } else {
      alert('Please login!');
      this.props.history.push('/');
      window.location.reload();
    }
  }

  onBack(e) {
    e.preventDefault();
    this.props.history.goBack();
  }

  usernameHandleClickOpen() {
    this.setState({ usernameChangeOpen: true });
  }

  usernameHandleCancel() {
    this.setState({ usernameChangeOpen: false });
  }

  passwordHandleClickOpen() {
    this.setState({ passwordChangeOpen: true });
  }

  passwordHandleCancel() {
    this.setState({ passwordChangeOpen: false });
  }

  usernameHandleConfirm() {
    editUsername({ username: this.state.username, info: this.state.newUsername }).then(res => {
      console.log('on Edit ' + this.state.username);
      this.logout();

    }).catch(err => {
      console.log(err);
    });
    this.setState({ usernameChangeOpen: false });
  }



  passwordHandleConfirm() {
    editPassword({ username: this.state.username, password: this.state.password, new_password: this.state.newPassword }).then(res => {
      console.log('on Edit ' + this.state.username);
      this.logout()
    }).catch(err => {
      console.log(err);
    });
    this.setState({ passwordChangeOpen: false });
  }


  logout() {
    this.props.history.push('/')
    localStorage.removeItem('usertoken')
    console.log('Log out successfully');
  }

  onUsernameChanged(e) {
    this.setState({ newUsername: e.target.value });
    this.clearValidationErr("sformat");
    // eslint-disable-next-line
    if (/[.~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(e.target.value) && e.target.value.length !== 0) {
      this.showValidationErr("sformat", "Username cannot contain special character!");
      console.log('Username cannot contain special character!');
    }
  }

  onPasswordChanged(e) {
    this.setState({ password: e.target.value });
    this.clearValidationErr("pformat");
    if (e.target.value.length < 6 && e.target.value.length !== 0) {
      this.showValidationErr("pformat", "Password must be more than 6 digits!");
      console.log('Password must be more than 6 digits!');
    }
  }

  onNewPasswordChanged(e) {
    this.setState({ newPassword: e.target.value });
    this.clearValidationErr("pformat");
    if (e.target.value.length < 6 && e.target.value.length !== 0) {
      this.showValidationErr("pformat", "Password must be more than 6 digits!");
      console.log('Password must be more than 6 digits!');
    }
  }


  showValidationErr(elm, msg) {
    this.setState((prevState) => ({ errors: [...prevState.errors, { elm, msg }] }));
  }

  clearValidationErr(elm) {
    this.setState((prevState) => {
      let newArr = [];
      for (let err of prevState.errors) {
        if (elm !== err.elm) {
          newArr.push(err);
        }
      }
      return { errors: newArr };
    });
  }



  render() {


    let sFormatErr = null;
    let pFormatErr = null;


    for (let err of this.state.errors) {

      if (err.elm === "sformat") {
        sFormatErr = err.msg;
      }
      if (err.elm === "pformat") {
        pFormatErr = err.msg;
      }

    }

    return (
      <div >
        <div>
          <button className="mid-controller" onClick={this.usernameHandleClickOpen.bind(this)}>
            Change Username
          </button>
        </div>

        <div>
          <button className="mid-controller" onClick={this.passwordHandleClickOpen.bind(this)}>
            Change Password
          </button>
        </div>

        <div>
          <Dialog style={{ 'height': '50%', }} maxWidth='sm'
            fullWidth
            open={this.state.passwordChangeOpen} onClose={this.passwordHandleCancel.bind(this)} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Change Password</DialogTitle>
            <DialogContent>

              <TextField
                margin="dense"
                id="username"
                label="Username"
                type="username"
                fullWidth
                value={this.state.username}
                disabled
              />
              <TextField
                autoFocus
                required
                margin="dense"
                id="password"
                label="Old Password"
                type="password"
                fullWidth
                onChange={this.onPasswordChanged.bind(this)}
              />

              <TextField
                required
                margin="dense"
                id="new-password"
                label="New Password"
                type="password"
                fullWidth
                onChange={this.onNewPasswordChanged.bind(this)}
              />
              <small className="danger-error" > {pFormatErr ? pFormatErr : ""} </small>

            </DialogContent>


            <DialogActions>
              <button autoFocus className="dia-controller" onClick={this.passwordHandleCancel.bind(this)} >
                Cancel
          </button>
              <button disabled={!this.state.password.length < 6 && this.state.newPassword.length < 6} className="dia-controller" onClick={this.passwordHandleConfirm.bind(this)} color="primary">
                Confirm
          </button>
            </DialogActions>
          </Dialog>
        </div>

        <div><Dialog style={{ 'height': '50%', }} maxWidth='sm'
          fullWidth
          open={this.state.usernameChangeOpen} onClose={this.usernameHandleCancel.bind(this)} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Change Username</DialogTitle>
          <DialogContent>

            <TextField
              margin="dense"
              id="username"
              label="Username"
              type="username"
              fullWidth
              value={this.state.username}
              disabled
            />

            <TextField
              autoFocus
              required
              margin="dense"
              id="new username"
              label="New Username"
              type="new username"
              fullWidth
              inputProps={{
                maxLength: 10,
              }}
              onChange={this.onUsernameChanged.bind(this)}
            />

            <small className="danger-error" > {sFormatErr ? sFormatErr : ""} </small>

          </DialogContent>
          <DialogActions>
            <button autoFocus className="dia-controller" onClick={this.usernameHandleCancel.bind(this)} color="primary">
              Cancel
          </button>
            <button disabled={sFormatErr || !this.state.newUsername} className="dia-controller" onClick={this.usernameHandleConfirm.bind(this)} color="primary">
              Confirm
          </button>
          </DialogActions>
        </Dialog></div>
      </div>
    );
  }
}

export default withRouter(Edit);