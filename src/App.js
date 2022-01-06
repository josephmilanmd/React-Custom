import { useState } from "react";
import { SelectDropdown } from "./components/core";

function App() {
  const [value, setValue] = useState(0)
  return (
    <div>
      <SelectDropdown value={value}  onChange={(e)=>setValue(e)} />
    </div>
  );
}

export default App;
