import styles from "./add-search-block.module.css";
export const AddSearchBlock = ({
  inputValue,
  onInputChange,
  onAddTask,
  sortTasksAlphabetically,
  searchPhrase,
  onSearchPhraseChange,
}) => {
  return (
    <>
      <div className={styles.addTaskContainer}>
        <input
          type="text"
          className={styles.addInput}
          placeholder="Добавить"
          value={inputValue}
          onChange={onInputChange}
        />
        <button className={styles.addButton} onClick={onAddTask}>
          ✛
        </button>
        <button className={styles.sortButton} onClick={sortTasksAlphabetically}>
          Сортировать
        </button>
      </div>
      <input
        type="text"
        className={styles.searchInput}
        placeholder="Поиск..."
        value={searchPhrase}
        onChange={onSearchPhraseChange}
      />
    </>
  );
};
