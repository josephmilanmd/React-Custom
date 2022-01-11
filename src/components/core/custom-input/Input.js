import React, { useEffect, useReducer } from "react";
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
    touched: false,
    focused: false,
  });

  const { initialValue, name } = props;

  useEffect(() => {
    // if (inputState.touched) {
    //
    // }
    dispatch({
      type: INPUT_CHANGE,
      value: initialValue,
      isValid: validate(initialValue),
    });
  }, [initialValue]);

  const validate = (text) => {
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }
    return isValid;
  };

  const textChangeHandler = (text) => {
    let isValid = validate(text);
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
        !inputState.isValid && inputState.touched ? "input-error" : ""
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
          //   type={inputType(type)}
          className="input-style"
          value={initialValue}
          onChange={(e) => textChangeHandler(e.target.value)}
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
        />
        {/* <span className="input-left-icon">09</span> */}
        {/* {showOrHide()} */}
      </div>
      <small>Required field</small>
    </div>
  );
};

export default Input;
