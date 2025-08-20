import styles from './app.module.css';
import { useState } from 'react';

export const App = () => {
	const [value, setValue] = useState('');
	const [list, setList] = useState([]);
	const [error, setError] = useState('');
	let isValueVaild = value.length >= 3 ? true : false;
	const id = Date.now();
	const updatedList = [...list, { id, value }];

	const onInputButtonClick = () => {
		let promptValue = prompt('Введите значение');
		if (promptValue.length < 3) {
			setError('Введенное значение должно содержать минимум 3 символа');
		} else if (promptValue.length >= 3) {
			setValue(promptValue);
			setError('');
		}
	};

	const onAddButtonClick = () => {
		if (isValueVaild) {
			list.push(value);
			setList(updatedList);
			setValue('');
			setError('');
		}
	};

	const errorText = (
		<div className={styles.error}>
			Введенное значение должно содержать минимум 3 символа
		</div>
	);

	return (
		<div className={styles.app}>
			<h1 className={styles['page-heading']}>Ввод значения</h1>
			<p className={styles['no-margin-text']}>
				Текущее значение <code>value</code>: "
				<output className={styles['current-value']}>{value}</output>"
			</p>
			{error != '' && errorText}
			<div className={styles['buttons-container']}>
				<button className={styles.button} onClick={onInputButtonClick}>
					Ввести новое
				</button>
				<button
					className={styles.button}
					disabled={!isValueVaild}
					onClick={onAddButtonClick}
				>
					Добавить в список
				</button>
			</div>
			<div className={styles['list-container']}>
				<h2 className={styles['list-heading']}>Список:</h2>
				<p className={styles['no-margin-text']}>Нет добавленных элементов</p>
				<ul className={styles.list}>
					<li className={styles['list-item']}>
						{list.length != 0
							? list.map((item) => `${item.id} ${item.value}`)
							: 'Нет добавленных элементов'}
					</li>
				</ul>
			</div>
		</div>
	);
};
