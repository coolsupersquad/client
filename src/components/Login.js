
import React, { Component } from 'react';
import { login, register, resetPassword } from '../helpers/auth';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'

function setErrorMsg(error) {
  return {
    loginMessage: error
  };
}

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loginMessage: null
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    login(this.state.email, this.state.password)
      .then(usr => {
        window.user = usr
        window.location.pathname = "/"
      })
      .catch(error => {
        this.setState(setErrorMsg('Invalid username/password.'));
      });
  };

  handleRegister = e => {
    e.preventDefault();
    let res = window.confirm("Create user with " + this.state.email + "?")
    if (res) {
      register(this.state.email, this.state.password)
        .then(usr => {
          window.user = usr
          window.location.pathname = "/"
        })
        .catch(error => {
          console.log(error)
          this.setState(setErrorMsg("(registration error) " + error.message));
        });
    }
  }

  resetPassword = () => {
    resetPassword(this.state.email)
      .then(() =>
        this.setState(
          setErrorMsg(`Password reset email sent to ${this.state.email}.`)
        )
      )
      .catch(error => this.setState(setErrorMsg(`Email address not found.`)));
  };


  render() {
    return (
      <form
        style={style.container}
      >
        <h3>Login</h3>
        <TextField
          placeholder="Your email"
          label="Email"
          value={this.state.value}
          onChange={(e, newValue) => {
            this.setState({ email: e.target.value })
          }}
        />
        <br />
        <TextField
          type="password"
          placeholder="Your super strong password"
          label="Password"
          onChange={(e, newValue) => this.setState({ password: e.target.value })}
        />
        <br />
        {this.state.loginMessage && (
          <div className="alert alert-danger" role="alert">
            <span
              className="glyphicon glyphicon-exclamation-sign"
              aria-hidden="true"
            />
            <span className="sr-only">Error:</span>
            &nbsp;{this.state.loginMessage}{' '}
            <a href="#" onClick={this.resetPassword} className="alert-link">
              Forgot Password?
            </a>
          </div>
        )}
        <Button variant="contained"
          label="Login"
          primary={true}
          style={style.raisedBtn}
          type="submit"

          onClick={event => this.handleSubmit(event)}
        >
          Login
          </Button>

          <Button variant="contained"
          primary={false}
          style={style.raisedBtn}

          onClick={event => this.handleRegister(event)}
        >
          Register
          </Button>
      </form>
    );
  }
}

const raisedBtn = {
  margin: 15
};

const container = {
  textAlign: 'center'
};

const style = {
  raisedBtn,
  container
};
