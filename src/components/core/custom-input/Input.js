import React, { useCallback, useEffect, useReducer } from "react";
import "./custom-input.style.css";

const INPUT_CHANGE = "INPUT_CHANGE";
const INPUT_BLUR = "INPUT_BLUR";
const INPUT_FOCUS = "INPUT_FOCUS";

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
        validationMessage: action.validationMessage,
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true,
        focused: false,
      };
    case INPUT_FOCUS:
      return {
        ...state,
        focused: true,
      };
    default:
      return state;
  }
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: "",
    isValid: true,
    validationMessage: "",
    touched: false,
    focused: false,
  });

  const {
    initialValue,
    name,
    required,
    email,
    min,
    max,
    maxLength,
    minLength,
  } = props;

  const validate = useCallback(
    (text) => {
      const emailRegex =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (required && text.trim().length === 0)
        return {
          isValid: false,
          validationMessage: required.message,
        };
      if (email && !emailRegex.test(text.toLowerCase()))
        return {
          isValid: false,
          validationMessage: email.message,
        };
      if (min != null && +text < min.value)
        return {
          isValid: false,
          validationMessage: min.message,
        };
      if (max != null && +text > max.value)
        return {
          isValid: false,
          validationMessage: max.message,
        };
      if (minLength != null && text.length < minLength.value)
        return {
          isValid: false,
          validationMessage: minLength.message,
        };
      if (maxLength != null && text.length > maxLength.value)
        return {
          isValid: false,
          validationMessage: maxLength.message,
        };
      return {
        isValid: true,
        validationMessage: "",
      };
    },
    [required, email, min, max, maxLength, minLength]
  );

  useEffect(() => {
    dispatch({
      type: INPUT_CHANGE,
      value: initialValue,
      isValid: validate(initialValue).isValid,
      validationMessage: validate(initialValue).validationMessage,
    });
  }, [initialValue, validate]);

  const textChangeHandler = (text) => {
    let isValid = validate(text).isValid;
    props.onChange(name, text, isValid);
  };

  const onFocusHandler = () => {
    dispatch({ type: INPUT_FOCUS });
  };
  const onBlurHandler = () => {
    dispatch({ type: INPUT_BLUR });
  };

  return (
    <div
      className={`custom-input ${
        !inputState.isValid
        //  && !inputState.focused 
         && inputState.touched
          ? "input-error"
          : ""
      } ${props.className ? props.className : ""}`}
    >
      <span
        className={`label ${
          inputState.focused || inputState.value ? "on-focus" : ""
        }`}
      >
        {props.label}
      </span>
      <div className="input-container">
        {/* <span className="input-left-icon">09</span> */}
        <input
          type={props.type}
          className="input-style"
          value={initialValue}
          onChange={(e) => textChangeHandler(e.target.value)}
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
        />
        {/* <span className="input-left-icon">09</span> */}
        {/* {showOrHide()} */}
      </div>
      <small>{inputState.validationMessage}</small>
    </div>
  );
};

export default Input;
