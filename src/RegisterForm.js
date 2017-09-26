import React, { Component } from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import { isAlpha, isLength, isEmail } from 'validator';

import FormField from './FormField';

function isLowerCase(str) {
  if (str.toLowerCase() !== str) {
    return false;
  }

  return true;
}

class RegisterForm extends Component {
  constructor(props) {
    super(props);

    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.setError = this.setError.bind(this);
    this.validateForm = this.validateForm.bind(this);

    this.state = {
      firstname: '',
      lastname: '',
      username: '',
      password: '',
      email: '',
      touched: {
        firstname: false,
        lastname: false,
        username: false,
        password: false,
        email: false
      },
      errors: {
        firstname: null,
        lastname: null,
        username: null,
        password: null,
        email: null
      }
    };
  }

  onInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState(prevState => ({
      [name]: value,
      touched: {
        ...prevState.touched,
        [name]: true
      },
      validForm: this.validateForm()
    }));
  }

  onSubmit(e) {
    e.preventDefault();

    const validForm = this.validateForm();

    if (validForm === true) {
      const { firstname, lastname, username, password, email } = this.state;

      const formValues = JSON.stringify({
        firstname,
        lastname,
        username,
        password,
        email
      });
      alert(`You've submitted: ${formValues}`);
    }
  }

  setError(name, message) {
    return this.setState(prevState => ({
      errors: { ...prevState.errors, [name]: message }
    }));
  }

  validateForm() {
    return (
      Object.keys(this.state.touched).filter(
        fieldKey => this.state.touched[fieldKey] === true
      ).length === 5 &&
      Object.keys(this.state.errors).filter(
        fieldKey => this.state.errors[fieldKey] === null
      ).length === 5
    );
  }

  render() {
    return (
      <StyledForm onSubmit={this.onSubmit}>
        <Title>Create Your Free Account</Title>
        <FormField
          name="firstname"
          value={this.state.firstname}
          onInputChange={this.onInputChange}
          labelText="First Name"
          type="text"
          validator={() => isAlpha(this.state.firstname)}
          setErrorOnForm={this.setError}
          error={this.state.errors.firstname}
          errorMessage="Only alphanumerical characters please"
        />
        <FormField
          name="lastname"
          value={this.state.lastname}
          onInputChange={this.onInputChange}
          labelText="Last Name"
          type="text"
          validator={() => isAlpha(this.state.lastname)}
          setErrorOnForm={this.setError}
          error={this.state.errors.lastname}
          errorMessage="Only alphanumerical characters please"
        />
        <FormField
          name="username"
          value={this.state.username}
          onInputChange={this.onInputChange}
          labelText="Username"
          type="text"
          validator={() => isLowerCase(this.state.username)}
          setErrorOnForm={this.setError}
          error={this.state.errors.username}
          errorMessage="Only small letters please"
        />
        <FormField
          name="password"
          value={this.state.password}
          onInputChange={this.onInputChange}
          labelText="Password"
          type="password"
          validator={() => isLength(this.state.password, { min: 8 })}
          setErrorOnForm={this.setError}
          error={this.state.errors.password}
          errorMessage="Password has to be at least 8 characters long"
        />
        <FormField
          name="email"
          value={this.state.email}
          onInputChange={this.onInputChange}
          labelText="Email"
          type="text"
          validator={() => isEmail(this.state.email)}
          setErrorOnForm={this.setError}
          error={this.state.errors.email}
          errorMessage="This is not a valid email address"
        />
        <Terms>
          By clicking Submit, I agree that I have read and accepted the{' '}
          <a href="http://google.com">Terms and Conditions</a>
        </Terms>
        <StyledButton
          type="primary"
          onClick={this.onSubmit}
          disabled={!this.validateForm()}>
          Submit
        </StyledButton>
      </StyledForm>
    );
  }
}

const StyledForm = styled.form`
  width: 50%;
  max-height: 90%;
  max-width: 500px;
  background-color: #fff;
  margin-top: 30px;
`;

const Title = styled.h1`
  width: 100%;
  background-color: #1e90ff;
  color: white;
  font-size: 16px;

  padding: 10px;
`;

const Terms = styled.span`
  display: block;
  margin: 10px 20px;
`;

const StyledButton = styled(Button)`
  margin: 20px auto;
  display: block;
  width: 150px;
  text-transform: uppercase;
`;

export default RegisterForm;
