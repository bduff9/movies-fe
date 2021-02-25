import Adapters from 'next-auth/adapters';
import { EntitySchemaColumnOptions } from 'typeorm';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default class User extends Adapters.TypeORM.Models.User.model {
	// You can extend the options in a model but you should not remove the base
	// properties or change the order of the built-in options on the constructor
	constructor (
		name: string,
		email: string,
		image: string,
		emailVerified: boolean,
	) {
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
