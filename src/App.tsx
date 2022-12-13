import React, { FC, useEffect, useState } from 'react';
import { Home } from './components/Home';
import { getUsers } from './api';
import { SelectOption } from './components/Home';
type SelectOptionApp = {
	username: string;
	value: string | number;
	id: string | number;
};

export const App = () => {
	const [userName, setUserName] = useState([]);

	useEffect(() => {
		(async () => {
			const users = await getUsers();
			const userName = users.map(({ id, username }: SelectOptionApp) => ({
				value: id,
				username
			}));
			setUserName(userName);
		})();
	}, []);
	const [value, setValue] = useState<SelectOption[]>([]);

	return (
		<div>
			<Home
				multiple
				userName={userName}
				value={value}
				onChange={e => setValue(e)}
			/>
		</div>
	);
};
