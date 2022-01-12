import { useState } from "react";
import { Input } from "./components/core";

function App() {
  const [value, setValue] = useState("");

  const onChange = (name, value, isValid) => {
    setValue(value);
    console.log(value, isValid);
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Input
          name="email"
          // type='number'
          initialValue={value}
          onChange={onChange}
          label="Email"
          required={{ message: "Please specify email" }}
          email={{ message: "Please specify vaild email" }}
          maxLength={{value: 10, message:"max length 10"}}
        />
        <button type="submit">login</button>
      </form>
    </div>
  );
}

export default App;
