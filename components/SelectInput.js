import React, { useState } from "react";
import { MdArrowDropDown } from "react-icons/md";
import styles from "../styles/Input.module.css";

function SelectInput({ children, title, changeSelect }) {
  const [isOpen, setisOpen] = useState(false);
  const [selectedItem, setselectedItem] = useState(children[0].props.children);

  const handleChoose = (name) => {
    setselectedItem(name);
    setisOpen(false);
    if (name === "All") {
      changeSelect("0");
    } else {
      changeSelect(name);
    }
  };

  return (
    <div className={styles.SelectInput}>
      <h4>{title}</h4>

      <div className={styles.SelectLayout} onClick={() => setisOpen(!isOpen)}>
        <p>{selectedItem}</p>
        <MdArrowDropDown />
      </div>

      {isOpen && (
        <div className={styles.children}>
          {children.map((child, index) => {
            return (
              <h4
                onClick={() => handleChoose(child.props.children)}
                key={index}
              >
                {child.props.children}
              </h4>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SelectInput;
