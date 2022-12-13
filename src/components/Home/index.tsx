import React, { useEffect, useRef, useState } from 'react';
import style from './style.module.css';

export type SelectOption = {
	username: string;
	value: string | number;
};
type SingleSelectProps = {
	multiple?: false;
	value?: SelectOption;
	onChange: (value: SelectOption | undefined) => void;
};
type MultipleSelectProps = {
	multiple: true;
	value: SelectOption[];
	onChange: (value: SelectOption[]) => void;
};
type SelectProps = {
	userName: SelectOption[];
} & (SingleSelectProps | MultipleSelectProps);

export const Home = ({ multiple, value, onChange, userName }: SelectProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [highlightedIndex, setHighlightedIndex] = useState(0);
	const containerRef = useRef<HTMLDivElement>(null);

	const clearOptions = () => {
		multiple ? onChange([]) : onChange(undefined);
	};

	const selectOption = (userName: SelectOption) => {
		if (multiple) {
			if (value.includes(userName)) {
				onChange(value.filter(el => el !== userName));
			} else {
				onChange([...value, userName]);
			}
		} else {
			if (userName !== value) onChange(userName);
		}
	};

	const isOptionSelected = (userName: SelectOption) => {
		return multiple ? value.includes(userName) : userName === value;
	};

	useEffect(() => {
		if (isOpen) setHighlightedIndex(0);
	}, [isOpen]);

	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			if (e.target != containerRef.current) return;
			switch (e.code) {
				case 'Escape':
					setIsOpen(false);
					break;
			}
		};
		containerRef.current?.addEventListener('keydown', handler);
		return () => {
			containerRef.current?.removeEventListener('keydown', handler);
		};
	}, []);

	return (
		<div
			ref={containerRef}
			tabIndex={0}
			onBlur={() => setIsOpen(false)}
			onClick={() => setIsOpen(prev => !prev)}
			className={style.container}
		>
			<span className={style.value}>
				{multiple
					? value?.map(el => (
							<button
								key={el.value}
								onClick={e => {
									e.stopPropagation();
									selectOption(el);
								}}
								className={style['option-badge']}
							>
								{el.username}
								<span className={style['remove-btn']}>
									&times;
								</span>
							</button>
					  ))
					: value?.username}
			</span>
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
							index === highlightedIndex ? style.highlighted : ''
						}`}
						key={el.value}
					>
						{el.username}
					</li>
				))}
			</ul>
		</div>
	);
};
