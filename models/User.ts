/*******************************************************************************
 * Movies FE - the frontend implementation of a movie tracker.
 * Copyright (C) 2015-present Brian Duffey and Billy Alexander
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see {http://www.gnu.org/licenses/}.
 * Home: https://asitewithnoname.com/
 */
import Adapters from 'next-auth/adapters';
import { EntitySchemaColumnOptions } from 'typeorm';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default class User extends Adapters.TypeORM.Models.User.model {
	// You can extend the options in a model but you should not remove the base
	// properties or change the order of the built-in options on the constructor
	constructor (name: string, email: string, image: string, emailVerified: boolean) {
		super(name, email, image, emailVerified);
	}
}

export const UserSchema = {
	name: 'User',
	tableName: 'users',
	target: User,
	columns: {
		...Adapters.TypeORM.Models.User.schema.columns,
		id: {
			primary: true,
			type: 'int',
			generated: true,
			//name: 'UserID',
		} as EntitySchemaColumnOptions,
		name: {
			...Adapters.TypeORM.Models.User.schema.columns.name,
			//name: 'UserFirstName',
		} as EntitySchemaColumnOptions,
		email: {
			...Adapters.TypeORM.Models.User.schema.columns.email,
			//name: 'UserEmail',
		} as EntitySchemaColumnOptions,
		emailVerified: {
			...Adapters.TypeORM.Models.User.schema.columns.emailVerified,
			//name: 'UserVerified',
		} as EntitySchemaColumnOptions,
		image: {
			...Adapters.TypeORM.Models.User.schema.columns.image,
			//name: 'UserImage',
		} as EntitySchemaColumnOptions,
		createdAt: {
			type: 'timestamp',
			createDate: true,
			//name: 'UserAdded',
		} as EntitySchemaColumnOptions,
		updatedAt: {
			type: 'timestamp',
			updateDate: true,
			//name: 'UserUpdated',
		} as EntitySchemaColumnOptions,
	},
};
