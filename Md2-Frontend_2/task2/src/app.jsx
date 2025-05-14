import { useState } from "react";
import styles from "./app.module.css";
import data from "./data.json";

export const App = () => {
  // Можно задать 2 состояния — steps и activeIndex

  // И определить 3 обработчика: Клик назад, Клик вперед, Начать сначала

  // И 2 переменных-флага — находимся ли мы на первом шаге, и находимся ли на последнем
  const [steps, setSteps] = useState(data);
  const [activeIndex, setActiveIndex] = useState(0);
  let isFirstStep = activeIndex === 0 ? true : false;
  let isLastStep = activeIndex === 6 ? true : false;

  const onGoBackButtonClick = () => {
    if (isFirstStep) {
      return;
    }
    setActiveIndex((activeIndex) => activeIndex - 1);
  };

  const onGoForwardButtonClick = () => {
    if (isLastStep) {
      return;
    }
    setActiveIndex(activeIndex + 1);
  };

  const onStartOverButtonClick = () => {
    setActiveIndex(0);
    isFirstStep = true;
    isLastStep = false;
  };

  const goForwardButton = (
    <button className={styles.button} onClick={onGoForwardButtonClick}>
      Далее
      {/* "Начать сначала", можно сделать этой же кнопкой, просто подменять обработчик и текст в зависимости от условия */}
      {/* Или заменять всю кнопку в зависимости от условия */}
    </button>
  );

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Инструкция по готовке пельменей</h1>
        <div className={styles.steps}>
          <div className={styles["steps-content"]}>
            {/* Для получения активного контента использйте steps и activeIndex */}
            {steps.map((step, index) => {
              if (index === activeIndex) {
                return step.content;
              }
            })}
          </div>
          <ul className={styles["steps-list"]}>
            {/* Выводите <li> с помощью массива steps и метода map(), подставляя в разметку нужные значения и классы */}
            {steps.map((step, index) => {
              return (
                <li
                  className={
                    index <= activeIndex
                      ? styles["steps-item"] + " " + styles.active
                      : styles["steps-item"]
                  }
                >
                  {/* Для того, чтобы вычислить необходимый класс используйте активный индекс, текущий индекс, а также тернарные операторы */}
                  <button
                    className={styles["steps-item-button"]}
                    onClick={() => setActiveIndex(index)}
                  >
                    {Number(step.id)}
                  </button>
                  {/* При клике на кнопку установка выбранного шага в качестве активного */}
                  {step.title}
                </li>
              );
            })}
          </ul>
          <div className={styles["buttons-container"]}>
            <button
              className={styles.button}
              disabled={isFirstStep}
              onClick={onGoBackButtonClick}
            >
              Назад
            </button>
            {!isLastStep && goForwardButton}
            {isLastStep && (
              <button
                className={styles.button}
                onClick={onStartOverButtonClick}
              >
                Начать сначала
                {/* "Начать сначала", можно сделать этой же кнопкой, просто подменять обработчик и текст в зависимости от условия */}
                {/* Или заменять всю кнопку в зависимости от условия */}
              </button>
            )}
            {/* {isLastStep && startOverButton} */}
          </div>
        </div>
      </div>
    </div>
  );
};
