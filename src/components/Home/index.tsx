import React, { FC, useEffect, useState } from 'react';
import style from './style.module.css';
import { getUsers } from '../../api';
interface IUsers {
	id: number;
	value: number;
	username: string;
}

export const Home = () => {
	const [userName, setUserName] = useState([]);

	useEffect(() => {
		(async () => {
			const users = await getUsers();
			const userName = users.map(({ id, username }: IUsers) => ({
				value: id,
				username
			}));
			setUserName(userName);
		})();
	}, []);
	console.log(userName);

	return (
		<>
			<div tabIndex={0} className={style.container}>
				<span className={style.value}>value</span>
				<button className={style['clear-btn']}>&times;</button>
				<div className={style.divider}></div>
				<div className={style.caret}></div>
				<ul className={style.options}>
					{userName.map((el: IUsers) => (
						<li className={style.option} key={el.value}>
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
