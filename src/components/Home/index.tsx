import React, { FC, useEffect, useState } from 'react';
import style from './style.module.css';
import { getUsers } from '../../api';
type SelectOption = {
	username: string;
	value: string | number;
};
type SelectProps = {
	userName: SelectOption[];
	value?: SelectOption;
	onChange: (value: SelectOption | undefined) => void;
};

export const Home = ({ value, onChange, userName }: SelectProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [highlightedIndex, setHighlightedIndex] = useState(0);

	const clearOptions = () => {
		onChange(undefined);
	};

	const selectOption = (userName: SelectOption) => {
		if (userName !== value) onChange(userName);
	};

	const isOptionSelected = (userName: SelectOption) => {
		return userName === value;
	};

	useEffect(() => {
		if (isOpen) setHighlightedIndex(0);
	}, [isOpen]);

	return (
		<>
			<div
				tabIndex={0}
				onBlur={() => setIsOpen(false)}
				onClick={() => setIsOpen(prev => !prev)}
				className={style.container}
			>
				<span className={style.value}>{value?.username}</span>
				<button
					onClick={e => {
						e.stopPropagation();
						clearOptions();
					}}
					className={style['clear-btn']}
				>
					&times;
				</button>
				<div className={style.divider}></div>
				<div className={style.caret}></div>
				<ul className={`${style.options} ${isOpen ? style.show : ''}`}>
					{userName.map((el, index) => (
						<li
							onClick={e => {
								e.stopPropagation();
								selectOption(el);
								setIsOpen(false);
							}}
							onMouseEnter={() => setHighlightedIndex(index)}
							className={`${style.option} ${
								isOptionSelected(el) ? style.selected : ''
							} ${
								index === highlightedIndex
									? style.highlighted
									: ''
							}`}
							key={el.value}
						>
							{el.username}
						</li>
					))}
				</ul>
			</div>
		</>
	);
};

// export const Home = () => {
// 	const [userName, setUserName] = useState([]);
// 	const [isShow, setIsShow] = useState(false);
// 	const [title, setTitle] = useState([':']);
// 	const onClickCard = () => {
// 		isShow === false ? setIsShow(true) : setIsShow(false);
// 	};

// 	const pushItem = (username: string) => {
// 		console.log(username);

// 		setTitle(title.concat(username + ' '));
// 	};

// 	useEffect(() => {
// 		(async () => {
// 			const users = await getUsers();
// 			const userName = users.map(({ id, username }: IUsers) => ({
// 				id,
// 				username
// 			}));
// 			setUserName(userName);
// 		})();
// 	}, []);

// 	console.log(userName);

// 	return (
// 		<div className={style.input} onClick={() => onClickCard()}>
// 			<p>{title}</p>
// 			{isShow &&
// 				userName.map((el: IUsers) => (
// 					<div key={el.id} onClick={() => pushItem(el.username)}>
// 						{el.username} <span>x</span>
// 					</div>
// 				))}
// 		</div>
// 	);
// };
