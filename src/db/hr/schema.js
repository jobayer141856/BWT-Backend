import {
	integer,
	pgEnum,
	pgSchema,
	serial,
	text,
	uuid,
} from 'drizzle-orm/pg-core';
import { DateTime, defaultUUID, uuid_primary } from '../variables.js';
const hr = pgSchema('hr');

export const department = hr.table('department', {
	uuid: uuid_primary,
	department: text('department').notNull().unique(),
	created_at: DateTime('created_at').notNull(),
	updated_at: DateTime('updated_at').default(null),
	remarks: text('remarks').default(null),
});

export const designation = hr.table('designation', {
	uuid: uuid_primary,
	designation: text('designation').notNull().unique(),
	created_at: DateTime('created_at').notNull(),
	updated_at: DateTime('updated_at').default(null),
	remarks: text('remarks').default(null),
});

export const userTypeEnum = pgEnum('user_type', [
	'employee',
	'customer',
	'vendor',
]);
export const businessTypeEnum = pgEnum('business_type', [
	'individual',
	'company',
	'user',
	'tv_company',
	'corporate',
]);

export const whereTheyFindUsEnum = pgEnum('where_they_find_us', [
	'facebook',
	'youtube',
	'whatsapp',
	'person',
	'instagram',
	'none',
]);

export const users = hr.table('users', {
	uuid: uuid_primary,
	name: text('name').notNull(),
	email: text('email').notNull().unique(),
	pass: text('pass').notNull(),
	designation_uuid: defaultUUID('designation_uuid').references(
		() => designation.uuid
	),
	department_uuid: defaultUUID('department_uuid').references(
		() => department.uuid
	),
	can_access: text('can_access').default('{"profile":["read"]}'),
	ext: text('ext').default(null),
	phone: text('phone').notNull().unique(),
	created_at: text('created_at').notNull(),
	updated_at: text('updated_at').default(null),
	status: text('status').default(0),
	remarks: text('remarks').default(null),
	id: serial('id').notNull().unique(),
	user_type: userTypeEnum('user_type').default('customer'),
	business_type: businessTypeEnum('business_type').default('user'),
	where_they_find_us:
		whereTheyFindUsEnum('where_they_find_us').default('none'),
	rating: integer('rating').default(5),
	price: integer('price').default(5),
});

export const policy_and_notice = hr.table('policy_and_notice', {
	uuid: uuid_primary,
	type: text('type').notNull(),
	title: text('title').notNull(),
	sub_title: text('sub_title').notNull(),
	url: text('url').notNull(),
	created_by: defaultUUID('created_by').references(() => users.uuid),
	created_at: text('created_at').notNull(),
	updated_at: text('updated_at').default(null),
	status: integer('status').notNull(),
	remarks: text('remarks').default(null),
});

export default hr;
