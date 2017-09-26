import React, { Component } from 'react';
import styled from 'styled-components';
import { Input, Form } from 'antd';

class FormField extends Component {
  constructor(props) {
    super(props);

    this.validateField = this.validateField.bind(this);

    this.state = { isValid: true };
  }

  validateField() {
    const { name, value, validator, errorMessage, setErrorOnForm } = this.props;

    let message;

    if (value === '') {
      message = 'This field is required';
      return;
    } else if (!validator(value)) {
      message = errorMessage;
    } else {
      message = null;
    }

    setErrorOnForm(name, message);
  }

  render() {
    const { labelText, type, value, onInputChange, name, error } = this.props;

    const hasError = error !== null;

    return (
      <Wrapper>
        <Label>{labelText}</Label>
        <StyledInput
          name={name}
          value={value}
          onChange={onInputChange}
          type={type}
          onBlur={this.validateField}
          className={`${hasError === true ? 'error' : ''}`}
        />
        {hasError && <Error>{error}</Error>}
      </Wrapper>
    );
  }
}

// Even though with styled-components, we can pass props and use in the styling,
// a CSS class is required to the input, because the antd Component
// can not accept custom props

const Wrapper = styled.div`margin: 25px;`;

const Label = styled.span`
  display: block;
  font-size: 13px;
  margin-bottom: 5px;
`;

const StyledInput = styled(Input)`
  width: 100%;

  &.error {
    border-color: #cc0000;

    &:focus {
      border-color: #49a9ee;
    }
  }
`;

const Error = styled.span`
  color: #cc0000;
  position: absolute;
  display: block;
`;

export default FormField;
