import { desc, eq, sql } from 'drizzle-orm';
import { handleError, validateRequest } from '../../../util/index.js';
import db from '../../index.js';
import * as hrSchema from '../../hr/schema.js';
import { decimalToNumber } from '../../variables.js';

import { order } from '../schema.js';
import * as storeSchema from '../../store/schema.js';

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const orderPromise = db
		.insert(order)
		.values(req.body)
		.returning({ insertedUuid: order.uuid });

	try {
		const data = await orderPromise;
		const toast = {
			status: 201,
			type: 'insert',
			message: `${data[0].insertedUuid} inserted`,
		};

		return await res.status(201).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function update(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const orderPromise = db
		.update(order)
		.set(req.body)
		.where(eq(order.uuid, req.params.uuid))
		.returning({ updatedUuid: order.uuid });

	try {
		const data = await orderPromise;
		const toast = {
			status: 201,
			type: 'update',
			message: `${data[0].updatedUuid} updated`,
		};

		return await res.status(201).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function remove(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const orderPromise = db
		.delete(order)
		.where(eq(order.uuid, req.params.uuid))
		.returning({ deletedUuid: order.uuid });

	try {
		const data = await orderPromise;
		const toast = {
			status: 201,
			type: 'delete',
			message: `${data[0].deletedUuid} deleted`,
		};

		return await res.status(201).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function selectAll(req, res, next) {
	const orderPromise = db
		.select({
			id: order.id,
			order_id: sql`CONCAT('WO', TO_CHAR(${order.created_at}, 'YY'), '-', TO_CHAR(${order.id}, 'FM0000'))`,
			uuid: order.uuid,
			user_uuid: order.user_uuid,
			model_uuid: order.model_uuid,
			model_name: storeSchema.model.name,
			size_uuid: order.size_uuid,
			size_name: storeSchema.size.name,
			serial_no: order.serial_no,
			problems_uuid: order.problems_uuid,
			problem_statement: order.problem_statement,
			accessories: order.accessories,
			is_product_received: order.is_product_received,
			receive_date: order.receive_date,
			warehouse_uuid: order.warehouse_uuid,
			warehouse_name: storeSchema.warehouse.name,
			rack_uuid: order.rack_uuid,
			rack_name: storeSchema.rack.name,
			floor_uuid: order.floor_uuid,
			floor_name: storeSchema.floor.name,
			box_uuid: order.box_uuid,
			box_name: storeSchema.box.name,
			created_by: order.created_by,
			created_by_name: hrSchema.users.name,
			created_at: order.created_at,
			updated_at: order.updated_at,
			remarks: order.remarks,
		})
		.from(order)
		.leftJoin(hrSchema.users, eq(order.created_by, hrSchema.users.uuid))
		.leftJoin(
			storeSchema.model,
			eq(order.model_uuid, storeSchema.model.uuid)
		)
		.leftJoin(storeSchema.size, eq(order.size_uuid, storeSchema.size.uuid))
		.leftJoin(
			storeSchema.warehouse,
			eq(order.warehouse_uuid, storeSchema.warehouse.uuid)
		)
		.leftJoin(storeSchema.rack, eq(order.rack_uuid, storeSchema.rack.uuid))
		.leftJoin(
			storeSchema.floor,
			eq(order.floor_uuid, storeSchema.floor.uuid)
		)
		.leftJoin(storeSchema.box, eq(order.box_uuid, storeSchema.box.uuid))

		.orderBy(desc(order.created_at));

	try {
		const data = await orderPromise;
		const toast = {
			status: 200,
			type: 'select all',
			message: 'orders list',
		};
		return await res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function select(req, res, next) {
	const orderPromise = db
		.select({
			id: order.id,
			order_id: sql`CONCAT('WO', TO_CHAR(${order.created_at}, 'YY'), '-', TO_CHAR(${order.id}, 'FM0000'))`,
			uuid: order.uuid,
			user_uuid: order.user_uuid,
			model_uuid: order.model_uuid,
			model_name: storeSchema.model.name,
			size_uuid: order.size_uuid,
			size_name: storeSchema.size.name,
			serial_no: order.serial_no,
			problems_uuid: order.problems_uuid,
			problem_statement: order.problem_statement,
			accessories: order.accessories,
			is_product_received: order.is_product_received,
			receive_date: order.receive_date,
			warehouse_uuid: order.warehouse_uuid,
			warehouse_name: storeSchema.warehouse.name,
			rack_uuid: order.rack_uuid,
			rack_name: storeSchema.rack.name,
			floor_uuid: order.floor_uuid,
			floor_name: storeSchema.floor.name,
			box_uuid: order.box_uuid,
			box_name: storeSchema.box.name,
			created_by: order.created_by,
			created_by_name: hrSchema.users.name,
			created_at: order.created_at,
			updated_at: order.updated_at,
			remarks: order.remarks,
		})
		.from(order)
		.leftJoin(hrSchema.users, eq(order.created_by, hrSchema.users.uuid))
		.leftJoin(
			storeSchema.model,
			eq(order.model_uuid, storeSchema.model.uuid)
		)
		.leftJoin(storeSchema.size, eq(order.size_uuid, storeSchema.size.uuid))
		.leftJoin(
			storeSchema.warehouse,
			eq(order.warehouse_uuid, storeSchema.warehouse.uuid)
		)
		.leftJoin(storeSchema.rack, eq(order.rack_uuid, storeSchema.rack.uuid))
		.leftJoin(
			storeSchema.floor,
			eq(order.floor_uuid, storeSchema.floor.uuid)
		)
		.leftJoin(storeSchema.box, eq(order.box_uuid, storeSchema.box.uuid))
		.where(eq(order.uuid, req.params.uuid));

	try {
		const data = await orderPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'order',
		};
		return await res.status(200).json({ toast, data: data[0] });
	} catch (error) {
		next(error);
	}
}
