import { Box, Button, Control, Field, Input, Label, Select } from 'bloomer';
import React, {
	ChangeEvent,
	FC,
	FormEvent,
	memo,
	ReactElement,
	useState,
} from 'react';

import {
	CaseType,
	DigitalType,
	FormatType,
	YesNo,
	StatusType,
	FilterType,
} from '../../graphql/output';
import { TFilterFilters, TFilterType } from '../../utils/types';

export interface FiltersProps {
	filters: TFilterFilters;
	updateFilters: (filters: TFilterFilters) => void;
}

const Filters: FC<FiltersProps> = ({
	filters,
	updateFilters,
}): ReactElement => {
	const [currentFilters, setCurrentFilters] = useState<TFilterFilters>(filters);

	const convertStateToProps = (ev: FormEvent<HTMLFormElement>): false => {
		ev.preventDefault();
		updateFilters(currentFilters);

		return false;
	};

	const resetFilters = (): void => {
		const resetFilters = {};

		updateFilters(resetFilters);
		setCurrentFilters(resetFilters);
	};

	const updateStateFromForm = (ev: ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = ev.currentTarget;
		let filter: TFilterType<unknown> | undefined =
			currentFilters[name as keyof TFilterFilters];

		switch (name) {
			case 'releaseDateFrom':
				if (filter) {
					filter.value = value;
				} else {
					filter = { relation: FilterType.Between, value, value2: null };
				}

				break;
			case 'releaseDateTo':
				if (filter) {
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					//@ts-ignore
					filter.value2 = value;
				} else {
					filter = { relation: FilterType.Between, value: null, value2: value };
				}

				break;
			case 'itemName':
				filter = { relation: FilterType.Like, value };

				break;
			case 'caseType':
			case 'digitalType':
			case 'formatType':
			case 'is3D':
			case 'isWatched':
			case 'itemStatus':
				filter = { relation: FilterType.Equal, value };

				break;
			default:
				console.error('Invalid name found', name);
				break;
		}

		if (value !== '') {
			setCurrentFilters({ ...currentFilters, [name]: filter });
		} else {
			const newFilters = { ...currentFilters };

			delete newFilters[name as keyof TFilterFilters];
			setCurrentFilters(newFilters);
		}
	};

	const {
		caseType,
		digitalType,
		formatType,
		is3D,
		isWatched,
		itemName,
		itemStatus,
		releaseDate,
	} = currentFilters;

	return (
		<Box>
			<form onSubmit={convertStateToProps}>
				<Field>
					<Label>Name: </Label>
					<Control>
						<Input
							name="itemName"
							onChange={updateStateFromForm}
							placeholder="Search on name"
							type="text"
							value={itemName?.value || ''}
						/>
					</Control>
				</Field>
				<Field>
					<Label>Case Type: </Label>
					<Control>
						<Select
							name="caseType"
							onChange={updateStateFromForm}
							value={caseType?.value || ''}
						>
							<option value="">All Case Types</option>
							{Object.keys(CaseType).map(
								(caseType): ReactElement => (
									<option key={`case-type-${caseType}`} value={caseType}>
										{caseType}
									</option>
								),
							)}
						</Select>
					</Control>
				</Field>
				<Field>
					<Label>Digital Type: </Label>
					<Control>
						<Select
							name="digitalType"
							onChange={updateStateFromForm}
							value={digitalType?.value || ''}
						>
							<option value="">All Digital Types</option>
							{Object.keys(DigitalType).map(
								(digitalType): ReactElement => (
									<option
										key={`digital-type-${digitalType}`}
										value={digitalType}
									>
										{digitalType}
									</option>
								),
							)}
						</Select>
					</Control>
				</Field>
				<Field>
					<Label>Format Type: </Label>
					<Control>
						<Select
							name="formatType"
							onChange={updateStateFromForm}
							value={formatType?.value || ''}
						>
							<option value="">All Formats</option>
							{Object.keys(FormatType).map(
								(formatType): ReactElement => (
									<option key={`format-type-${formatType}`} value={formatType}>
										{formatType}
									</option>
								),
							)}
						</Select>
					</Control>
				</Field>
				<Field>
					<Label>3D: </Label>
					<Control>
						<Select
							name="is3D"
							onChange={updateStateFromForm}
							value={is3D?.value || ''}
						>
							<option value="">All 3D Types</option>
							{Object.keys(YesNo).map(
								(opt): ReactElement => (
									<option key={`is-3D-${opt}`} value={opt}>
										{opt}
									</option>
								),
							)}
						</Select>
					</Control>
				</Field>
				<Field>
					<Label>Watched: </Label>
					<Control>
						<Select
							name="isWatched"
							onChange={updateStateFromForm}
							value={isWatched?.value || ''}
						>
							<option value="">All Watched Types</option>
							{Object.keys(YesNo).map(
								(opt): ReactElement => (
									<option key={`is-watched=${opt}`} value={opt}>
										{opt}
									</option>
								),
							)}
						</Select>
					</Control>
				</Field>
				<Field>
					<Label>Status: </Label>
					<Control>
						<Select
							name="itemStatus"
							onChange={updateStateFromForm}
							value={itemStatus?.value || ''}
						>
							<option value="">All Statuses</option>
							{Object.keys(StatusType).map(
								(itemStatus): ReactElement => (
									<option key={`item-status-${itemStatus}`} value={itemStatus}>
										{itemStatus}
									</option>
								),
							)}
						</Select>
					</Control>
				</Field>
				<Field>
					<Label>Release Date From: </Label>
					<Control>
						<Input
							name="releaseDateFrom"
							placeholder="Search on release date"
							onChange={updateStateFromForm}
							type="date"
							value={`${releaseDate?.value || ''}`}
						/>
					</Control>
				</Field>
				<Field>
					<Label>Release Date To: </Label>
					<Control>
						<Input
							name="releaseDateTo"
							placeholder="Search on release date"
							onChange={updateStateFromForm}
							type="date"
							// eslint-disable-next-line @typescript-eslint/ban-ts-comment
							//@ts-ignore
							value={`${releaseDate?.value2 || ''}`}
						/>
					</Control>
				</Field>

				<Field isGrouped>
					<Control>
						<Button isColor="primary" type="submit">
							Filter
						</Button>
					</Control>
					<Control>
						<Button isColor="danger" onClick={resetFilters}>
							Reset
						</Button>
					</Control>
				</Field>
			</form>
		</Box>
	);
};

Filters.whyDidYouRender = true;

export default memo(Filters);
