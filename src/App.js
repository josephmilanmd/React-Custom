import { useCallback, useState } from "react";
import { Input } from "./components/core";

function App() {
  const [value, setValue] = useState("");

  const onChange= useCallback(
    (name, value, isValid)  => {
      {
        setValue(value);
        console.log(value, isValid);
      }
    },
    [value],
  )

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Input
          name="email"
          initialValue={value}
          onChange={onChange}
          label="Email"
          required
          email
        />
        <button type="submit">login</button>
      </form>
    </div>
  );
}

export default App;
