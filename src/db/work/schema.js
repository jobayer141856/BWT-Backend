import {
	boolean,
	integer,
	pgSchema,
	serial,
	text,
	uuid,
	pgEnum,
	PgArray,
} from 'drizzle-orm/pg-core';
import {
	DateTime,
	defaultUUID,
	PG_DECIMAL,
	uuid_primary,
} from '../variables.js';

import * as hrSchema from '../hr/schema.js';
import * as storeSchema from '../store/schema.js';

const work = pgSchema('work');

export const categoryEnum = pgEnum('category', ['customer', 'employee']);

export const problem = work.table('problem', {
	uuid: uuid_primary,
	name: text('name').notNull(),
	category: categoryEnum('category').default('employee'),
	created_by: defaultUUID('created_by').references(() => hrSchema.users.uuid),
	created_at: DateTime('created_at').notNull(),
	updated_at: DateTime('updated_at').default(null),
	remarks: text('remarks').default(null),
});

export const order = work.table('order', {
	id: serial('id').notNull().unique(),
	uuid: uuid_primary,
	user_uuid: defaultUUID('user_uuid').references(() => hrSchema.users.uuid),
	model_uuid: defaultUUID('model_uuid').references(
		() => storeSchema.model.uuid
	),
	size_uuid: defaultUUID('size_uuid').references(() => storeSchema.size.uuid),
	serial_no: text('serial_no').notNull(),
	problems_uuid: text('problems_uuid').array(),
	problem_statement: text('problem_statement').notNull(),
	accessories: text('accessories').array().default(null),
	is_product_received: boolean('is_product_received').default(false),
	receive_date: DateTime('receive_date').default(null),
	warehouse_uuid: defaultUUID('warehouse_uuid').references(
		() => storeSchema.warehouse.uuid
	),
	rack_uuid: defaultUUID('rack_uuid').references(() => storeSchema.rack.uuid),
	floor_uuid: defaultUUID('floor_uuid').references(
		() => storeSchema.floor.uuid
	),
	box_uuid: defaultUUID('box_uuid').references(() => storeSchema.box.uuid),
	created_by: defaultUUID('created_by').references(() => hrSchema.users.uuid),
	created_at: DateTime('created_at').notNull(),
	updated_at: DateTime('updated_at').default(null),
	remarks: text('remarks').default(null),
});
export const statusEnum = pgEnum('status', [
	'pending',
	'rejected',
	'accepted',
	'not_repairable',
]);

export const diagnosis = work.table('diagnosis', {
	id: serial('id').notNull().unique(),
	uuid: uuid_primary,
	order_uuid: defaultUUID('order_uuid').references(() => order.uuid),
	engineer_uuid: defaultUUID('engineer_uuid').references(
		() => hrSchema.users.uuid
	),
	problems_uuid: text('problems_uuid').array(),
	problem_statement: text('problem_statement'),
	status: statusEnum('status').default('pending'),
	status_update_date: DateTime('status_update_date').default(null),
	proposed_cost: PG_DECIMAL('proposed_cost').default(0),
	is_proceed_to_repair: boolean('is_proceed_to_repair').default(false),
	created_by: defaultUUID('created_by').references(() => hrSchema.users.uuid),
	created_at: DateTime('created_at').notNull(),
	updated_at: DateTime('updated_at').default(null),
	remarks: text('remarks').default(null),
});

export const section = work.table('section', {
	uuid: uuid_primary,
	name: text('name').notNull(),
	created_by: defaultUUID('created_by').references(() => hrSchema.users.uuid),
	created_at: DateTime('created_at').notNull(),
	updated_at: DateTime('updated_at').default(null),
	remarks: text('remarks').default(null),
});

export const process = work.table('process', {
	id: serial('id').notNull().unique(),
	uuid: uuid_primary,
	section_uuid: defaultUUID('section_uuid').references(() => section.uuid),
	diagnosis_uuid: defaultUUID('diagnosis_uuid').references(
		() => diagnosis.uuid
	),
	engineer_uuid: defaultUUID('engineer_uuid').references(
		() => hrSchema.users.uuid
	),
	problems_uuid: text('problems_uuid').array(),
	problem_statement: text('problem_statement').notNull(),
	status: boolean('status').default(false),
	status_update_date: DateTime('status_update_date').default(null),
	is_transferred_for_qc: boolean('is_transferred_for_qc').default(false),
	is_ready_for_delivery: boolean('is_ready_for_delivery').default(false),
	warehouse_uuid: defaultUUID('warehouse_uuid').references(
		() => storeSchema.warehouse.uuid
	),
	rack_uuid: defaultUUID('rack_uuid').references(() => storeSchema.rack.uuid),
	floor_uuid: defaultUUID('floor_uuid').references(
		() => storeSchema.floor.uuid
	),
	box_uuid: defaultUUID('box_uuid').references(() => storeSchema.box.uuid),
	process_uuid: defaultUUID('process_uuid').references(() => process.uuid),
	created_by: defaultUUID('created_by').references(() => hrSchema.users.uuid),
	created_at: DateTime('created_at').notNull(),
	updated_at: DateTime('updated_at').default(null),
	remarks: text('remarks').default(null),
});

export default work;
