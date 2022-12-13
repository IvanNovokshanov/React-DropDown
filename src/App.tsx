import React, { FC, useEffect, useState } from 'react';
import { Home } from './components/Home';
import { getUsers } from './api';
type SelectOption = {
	username: string;
	value: string | number;
	id: string | number;
};

export const App = () => {
	const [userName, setUserName] = useState([]);

	useEffect(() => {
		(async () => {
			const users = await getUsers();
			const userName = users.map(({ id, username }: SelectOption) => ({
				value: id,
				username
			}));
			setUserName(userName);
			setValue(userName[0]);
		})();
	}, []);
	const [value, setValue] = useState(userName[0]);
	console.log(userName[0]);
	return (
		<div>
			<Home
				userName={userName}
				value={value}
				onChange={e => setValue(e)}
			/>
		</div>
	);
};
