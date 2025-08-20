import { useState } from "react";
import styles from "./app.module.css";

export const App = () => {
  const NUMS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

  const [operand1, setOperand1] = useState("0");
  const [operator, setOperator] = useState("");
  const [operand2, setOperand2] = useState("");
  const [isResult, setIsResult] = useState(false);

  const output = `${operand1} ${operator} ${operand2}`;

  return (
    <div className={styles.container}>
      <p className={`${styles.text} ${isResult ? styles["result-text"] : ""}`}>
        {output}
      </p>
      <div className={styles["button-container"]}>
        <button
          className={styles.button}
          onClick={() => {
            setOperator("+");
            setIsResult(false);
          }}
        >
          +
        </button>
        <button
          className={styles.button}
          onClick={() => {
            setOperator("-");
            setIsResult(false);
          }}
        >
          &#8722;
        </button>
        <button
          className={`${styles.button} ${styles["reset-button"]}`}
          onClick={() => {
            setOperand1("0");
            setOperand2("");
            setOperator("");
            setIsResult(false);
          }}
        >
          C
        </button>
        <button
          className={styles.button}
          onClick={() => {
            if (operand2 !== "") {
              setOperator("");
              switch (operator) {
                case "+":
                  setOperand1(Number(operand1) + Number(operand2));
                  break;
                case "-":
                  setOperand1(Number(operand1) - Number(operand2));
                  break;
                default:
              }
              setOperand2("");
            }
            setOperator("");
            setIsResult("true");
          }}
        >
          =
        </button>
        {NUMS.map((num) => {
          return (
            <button
              className={styles.button}
              onClick={() => {
                if (operator === "") {
                  if (operand1 === "0") {
                    setOperand1(num);
                  } else {
                    setOperand1(operand1 + num);
                  }
                } else {
                  if (operand1 === "0") {
                    setOperand2(num);
                  } else {
                    setOperand2(operand2 + num);
                  }
                }
                setIsResult(false);
              }}
            >
              {num}
            </button>
          );
        })}
      </div>
    </div>
  );
};
