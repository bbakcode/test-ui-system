import React from "react";
import styles from "./Button.module.scss";
//import classNames from "classnames/bind";

interface ButtonProps
  extends Omit<React.HTMLAttributes<HTMLButtonElement>, ""> {}

//let cx = classNames.bind(styles);
export const Button: React.FC<ButtonProps> = (props) => {
  return <button className={styles.root}>bbak_button</button>;
};
