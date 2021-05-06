/*
Movies FE - the frontend implementation of a movie tracker.
Copyright (C) 2015-present Brian Duffey and Billy Alexander
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.
This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.
You should have received a copy of the GNU General Public License
along with this program.  If not, see {http://www.gnu.org/licenses/}.
Home: https://asitewithnoname.com/
*/
import {
	Button,
	Column,
	Control,
	Field,
	Help,
	Image,
	Input,
	Label,
	Radio,
	Select,
	TextArea,
} from 'bloomer';
import { Formik, ErrorMessage, Form } from 'formik';
import React, { FC, ReactElement, ReactText } from 'react';
import * as Yup from 'yup';

import {
	CaseType,
	DigitalType,
	FormatType,
	MovieItem,
	MutationAddMovieItemArgs,
	MutationUpdateMovieItemArgs,
	StatusType,
	YesNo,
} from '../../graphql/output';
import { convertGQLValueForDisplay } from '../../utils';
import ButtonLink from '../ButtonLink/ButtonLink';
import MovieItemPlaceholder from '../MovieItemPlaceholder/MovieItemPlaceholder';

type CustomErrorProps = Record<string, ReactText[]>;

const CustomError: FC<CustomErrorProps> = ({ children }): ReactElement => (
	<Help isColor="danger">{children}</Help>
);

const defaultSubmitHandler = (): void => {
	throw new Error('Missing submit handler implementation');
};

type MovieItemFormProps = {
	movieItem?: MovieItem;
	onAddSubmit?: (
		movieItem: MutationAddMovieItemArgs,
		extra: Record<string, unknown>,
	) => void;
	onUpdateSubmit?: (
		movieItem: MutationUpdateMovieItemArgs,
		extra: Record<string, unknown>,
	) => void;
};

const MovieItemForm: FC<MovieItemFormProps> = ({
	movieItem = {
		caseType: CaseType.Plain,
		digitalType: DigitalType.None,
		formatType: FormatType.UltraHd,
		is3D: YesNo.N,
		isWatched: YesNo.N,
		itemID: 0,
		itemName: '',
		itemStatus: StatusType.Owned,
		itemURL: '',
	},
	onAddSubmit,
	onUpdateSubmit,
}): ReactElement => (
	<Formik
		initialValues={movieItem}
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		onSubmit={onAddSubmit || onUpdateSubmit || defaultSubmitHandler}
		validationSchema={Yup.object().shape({
			itemName: Yup.string().required('Please enter title'),
			formatType: Yup.string()
				.oneOf(Object.values(FormatType), 'Please select a valid format')
				.required('Please select a format'),
			is3D: Yup.string()
				.oneOf(Object.keys(YesNo))
				.required('Please select whether this is 3D'),
			digitalType: Yup.string()
				.oneOf(Object.values(DigitalType))
				.required('Please select which digital type this item includes'),
			caseType: Yup.string()
				.oneOf(Object.keys(CaseType))
				.required('Please select the case type'),
			itemStatus: Yup.string()
				.oneOf(Object.keys(StatusType))
				.required('Please select an item status'),
			releaseDate: Yup.date()
				.required('Please enter a valid release date')
				.test(
					'releaseDate',
					'Date must be a Tuesday',
					(value: Date | undefined): boolean => !!value && value.getDay() === 2,
				),
			isWatched: Yup.string()
				.oneOf(Object.keys(YesNo))
				.required('Please select whether this has been watched'),
			itemURL: Yup.string()
				.url('Please enter a valid image URL')
				.required('Please enter an image URL'),
			itemNotes: Yup.string().nullable(true),
		})}
	>
		{({
			dirty,
			errors,
			isSubmitting,
			touched,
			values,
			handleBlur,
			handleChange,
			handleReset,
		}): ReactElement => (
			<Form>
				<Column>
					<ButtonLink isColor="danger" to="/">
						Return
					</ButtonLink>
					&nbsp;
					<Button
						isColor="warning"
						type="button"
						disabled={!dirty || isSubmitting}
						onClick={handleReset}
					>
						Reset
					</Button>
					&nbsp;
					<Button isColor="primary" type="submit" disabled={isSubmitting}>
						Save
					</Button>
					{Object.keys(errors).length > 0 && (
						<CustomError>
							Please fix the {Object.keys(errors).length} errors below
						</CustomError>
					)}
				</Column>

				<Field>
					<Label>Title</Label>
					<Control>
						<Input
							id="itemName"
							name="itemName"
							isColor={
								errors.itemName && touched.itemName ? 'danger' : undefined
							}
							value={values.itemName}
							type="text"
							placeholder="Title"
							onBlur={handleBlur}
							onChange={handleChange}
						/>
					</Control>
					<ErrorMessage component={CustomError} name="itemName" />
				</Field>

				<Field>
					<Label>Format</Label>
					<Control>
						<Select
							id="formatType"
							name="formatType"
							isColor={
								errors.formatType && touched.formatType ? 'danger' : undefined
							}
							value={values.formatType}
							onChange={handleChange}
						>
							{Object.values(FormatType).map(
								(format): JSX.Element => (
									<option value={format} key={`format-${format}`}>
										{convertGQLValueForDisplay(format)}
									</option>
								),
							)}
						</Select>
					</Control>
					<ErrorMessage component={CustomError} name="formatType" />
				</Field>

				<Field>
					<Label>3D?</Label>
					<Control>
						<Radio
							id="is3D-Y"
							name="is3D"
							value="Y"
							onChange={handleChange}
							checked={values.is3D === 'Y'}
						>
							{' '}
							Yes{' '}
						</Radio>
						<Radio
							id="is3D-N"
							name="is3D"
							value="N"
							onChange={handleChange}
							checked={values.is3D !== 'Y'}
						>
							{' '}
							No{' '}
						</Radio>
					</Control>
					<ErrorMessage component={CustomError} name="is3D" />
				</Field>

				<Field>
					<Label>Included Digital</Label>
					<Control>
						<Select
							id="digitalType"
							name="digitalType"
							isColor={
								errors.digitalType && touched.digitalType ? 'danger' : undefined
							}
							value={values.digitalType}
							onChange={handleChange}
						>
							{Object.values(DigitalType).map(
								(type): JSX.Element => (
									<option value={type} key={`digital-${type}`}>
										{convertGQLValueForDisplay(type)}
									</option>
								),
							)}
						</Select>
					</Control>
					<ErrorMessage component={CustomError} name="digitalType" />
				</Field>

				<Field>
					<Label>Case Type</Label>
					<Control>
						<Select
							id="caseType"
							name="caseType"
							isColor={
								errors.caseType && touched.caseType ? 'danger' : undefined
							}
							value={values.caseType}
							onChange={handleChange}
						>
							{Object.keys(CaseType).map(
								(caseType): JSX.Element => (
									<option value={caseType} key={`case-${caseType}`}>
										{caseType}
									</option>
								),
							)}
						</Select>
					</Control>
					<ErrorMessage component={CustomError} name="caseType" />
				</Field>

				<Field>
					<Label>Status</Label>
					<Control>
						<Select
							id="itemStatus"
							name="itemStatus"
							isColor={
								errors.itemStatus && touched.itemStatus ? 'danger' : undefined
							}
							value={values.itemStatus}
							onChange={handleChange}
						>
							{Object.keys(StatusType).map(
								(status): JSX.Element => (
									<option value={status} key={`status-${status}`}>
										{status}
									</option>
								),
							)}
						</Select>
					</Control>
					<ErrorMessage component={CustomError} name="itemStatus" />
				</Field>

				<Field>
					<Label>Release Date</Label>
					<Control>
						<Input
							id="releaseDate"
							name="releaseDate"
							isColor={
								errors.releaseDate && touched.releaseDate ? 'danger' : undefined
							}
							value={values.releaseDate ?? ''}
							type="date"
							placeholder="Release Date"
							onBlur={handleBlur}
							onChange={handleChange}
						/>
					</Control>
					<ErrorMessage component={CustomError} name="releaseDate" />
				</Field>

				<Field>
					<Label>Watched?</Label>
					<Control>
						<Radio
							id="isWatched-Y"
							name="isWatched"
							value="Y"
							onChange={handleChange}
							checked={values.isWatched === 'Y'}
						>
							{' '}
							Yes{' '}
						</Radio>
						<Radio
							id="isWatched-N"
							name="isWatched"
							value="N"
							onChange={handleChange}
							checked={values.isWatched !== 'Y'}
						>
							{' '}
							No{' '}
						</Radio>
					</Control>
					<ErrorMessage component={CustomError} name="isWatched" />
				</Field>

				<Field>
					<Label>Image</Label>
					<Control>
						<Input
							id="itemURL"
							name="itemURL"
							isColor={errors.itemURL && touched.itemURL ? 'danger' : undefined}
							value={values.itemURL}
							type="text"
							placeholder="Image URL"
							onBlur={handleBlur}
							onChange={handleChange}
						/>
					</Control>
					<ErrorMessage component={CustomError} name="itemURL" />
				</Field>

				<div style={{ width: 114 }}>
					{values.itemURL ? (
						<Image className="is-3by4" src={values.itemURL} />
					) : (
						<MovieItemPlaceholder title={values.itemName || ''} />
					)}
				</div>

				<Field>
					<Label>Notes</Label>
					<Control>
						<TextArea
							id="itemNotes"
							name="itemNotes"
							value={values.itemNotes || ''}
							placeholder="Optional Notes"
							onBlur={handleBlur}
							onChange={handleChange}
						/>
					</Control>
					<ErrorMessage component={CustomError} name="itemNotes" />
				</Field>

				<Column>
					<ButtonLink isColor="danger" to="/">
						Return
					</ButtonLink>
					&nbsp;
					<Button
						isColor="warning"
						type="button"
						disabled={!dirty || isSubmitting}
						onClick={handleReset}
					>
						Reset
					</Button>
					&nbsp;
					<Button isColor="primary" type="submit" disabled={isSubmitting}>
						Save
					</Button>
				</Column>
			</Form>
		)}
	</Formik>
);

MovieItemForm.whyDidYouRender = true;

export default MovieItemForm;
