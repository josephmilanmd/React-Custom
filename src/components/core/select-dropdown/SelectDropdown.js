import React, { useEffect, useRef, useState } from "react";
import "./select-dropdown.styles.css";

const SelectDropdown = ({ value, onChange }) => {
  const ref = useRef();
  const debounceTimeout = useRef();
  const searchTerm = useRef("");

  const [options, setOptions] = useState([]);
  const [currentOption, setCurrentOption] = useState("");

  useEffect(() => {}, [value]);

  useEffect(() => {
    const getCurrentSelected = () => {
      let options = ref.current
        ? [...ref.current.lastElementChild.childNodes].map((option, index) => {
            return {
              index: index,
              value: option.dataset.value,
              innerContent: option.innerHTML,
              element: option,
            };
          })
        : [];

      options.forEach((option) => {
        option.element.classList.remove("custom-select-option-selected");
        option.element.addEventListener("click", () => {
          onChange(option.value);
          ref.current.classList.remove("custom-select-open");
        });
      });
      let currentOption = options.find((x) => x.value == value);
      if (currentOption) {
        currentOption.element.classList.add("custom-select-option-selected");
        currentOption.element.scrollIntoView({block: "nearest"});
        ref.current.firstElementChild.innerHTML = currentOption.innerContent;
      }
      setOptions(options);
      setCurrentOption(currentOption);
    };
    getCurrentSelected();
    return () => {
      options.forEach((option) => {
        option.element.removeEventListener("click", () => {
          onChange(option.value);
          ref.current.classList.remove("custom-select-open");
        });
      });
    };
  }, [value]);

  useEffect(() => {
    ref.current.firstElementChild.addEventListener("click", toggle);
    ref.current.addEventListener("blur", () => {
      ref.current.classList.remove("custom-select-open");
    });

    return () => {
      ref.current.firstElementChild.removeEventListener("click", toggle);
      ref.current.removeEventListener("blur", () => {
        ref.current.classList.remove("custom-select-open");
      });
    };
  }, []);

  useEffect(() => {
    if (currentOption) {
      ref.current.addEventListener("keydown", onKeyPress);
    }
    return () => {
      ref.current.removeEventListener("keydown", onKeyPress);
    };
  }, [currentOption]);

  const toggle = () => {
    ref.current.classList.toggle("custom-select-open");
  };

  const onKeyPress = (e) => {
    switch (e.code) {
      case "Space":
      case "Enter":
        ref.current.classList.toggle("custom-select-open");
        break;
      case "Escape":
        ref.current.classList.remove("custom-select-open");
        break;
      case "ArrowUp":
        if (currentOption.index - 1 >= 0)
          onChange(options[currentOption.index - 1].value);
        break;
      case "ArrowDown":
        if (currentOption.index + 1 < options.length)
          onChange(options[currentOption.index + 1].value);
        break;
      default:
        clearTimeout(debounceTimeout.current);
        searchTerm.current += e.key;
        debounceTimeout.current = setTimeout(() => {
          searchTerm.current = "";
        }, 500);

        let searchOption = options.find((x) =>
          x.innerContent.toLowerCase().startsWith(searchTerm.current)
        );
        if (searchOption) onChange(searchOption.value);
    }
  };

  return (
    <>
      <div tabIndex={0} ref={ref} className="custom-select">
        <span>Selected</span>
        <ul>
          <Option value={0}>option 1</Option>
          <Option value={1}>obtion 2</Option>
          <Option value={2}>oction 3</Option>
          <Option value={3}>aption 4</Option>
          <Option value={4}>dption 5</Option>
          <Option value={5}>option 1</Option>
          <Option value={6}>obtion 2</Option>
          <Option value={7}>oction 3</Option>
          <Option value={8}>aption 4</Option>
          <Option value={9}>dption 5</Option>
          <Option value={10}>option 1</Option>
          <Option value={11}>obtion 2</Option>
          <Option value={12}>zction 3</Option>
          <Option value={13}>aption 4</Option>
          <Option value={14}>dption 5</Option>
        </ul>
      </div>
    </>
  );
};

export default SelectDropdown;

const Option = ({ value, children }) => (
  <li data-value={value}>{children}</li>
);
