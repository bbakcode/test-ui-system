import React from "react";
import styles from "./Input.module.scss";
//import classNames from "classnames/bind";

interface InputProps extends Omit<React.HTMLAttributes<HTMLInputElement>, ""> {}

//let cx = classNames.bind(styles);
export const Input: React.FC<InputProps> = (props) => {
  return <input className={styles.root} placeholder="bbak_input"></input>;
};
