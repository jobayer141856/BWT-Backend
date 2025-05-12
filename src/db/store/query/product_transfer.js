import { desc, eq, sql } from 'drizzle-orm';
import { handleError, validateRequest } from '../../../util/index.js';
import db from '../../index.js';
import * as hrSchema from '../../hr/schema.js';
import { decimalToNumber } from '../../variables.js';
import * as workSchema from '../../work/schema.js';
import { product_transfer, product, warehouse } from '../schema.js';

import { alias } from 'drizzle-orm/pg-core';
const user = alias(hrSchema.users, 'user');
export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const productTransferPromise = db
		.insert(product_transfer)
		.values(req.body)
		.returning({ insertedId: product_transfer.uuid });

	try {
		const data = await productTransferPromise;
		const toast = {
			status: 201,
			type: 'insert',
			message: `${data[0].insertedId} inserted`,
		};

		return await res.status(201).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function update(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const productTransferPromise = db
		.update(product_transfer)
		.set(req.body)
		.where(eq(product_transfer.uuid, req.params.uuid))
		.returning({ updatedId: product_transfer.uuid });

	try {
		const data = await productTransferPromise;
		const toast = {
			status: 201,
			type: 'update',
			message: `${data[0].updatedId} updated`,
		};

		return await res.status(201).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function remove(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const productTransferPromise = db
		.delete(product_transfer)
		.where(eq(product_transfer.uuid, req.params.uuid))
		.returning({ deletedId: product_transfer.uuid });

	try {
		const data = await productTransferPromise;
		const toast = {
			status: 201,
			type: 'delete',
			message: `${data[0].deletedId} deleted`,
		};

		return await res.status(201).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function selectAll(req, res, next) {
	const productTransferPromise = db
		.select({
			id: product_transfer.id,
			product_transfer_id: sql`CONCAT('PT', TO_CHAR(${product_transfer.created_at}, 'YY'), '-', TO_CHAR(${product_transfer.id}, 'FM0000'))`,
			uuid: product_transfer.uuid,
			product_uuid: product_transfer.product_uuid,
			product_name: product.name,
			warehouse_uuid: product_transfer.warehouse_uuid,
			warehouse_name: warehouse.name,
			order_uuid: product_transfer.order_uuid,
			order_id: sql`CONCAT('WO', TO_CHAR(${workSchema.order.created_at}, 'YY'), '-', TO_CHAR(${workSchema.order.id}, 'FM0000'))`,
			quantity: decimalToNumber(product_transfer.quantity),
			created_by: product_transfer.created_by,
			created_by_name: hrSchema.users.name,
			created_at: product_transfer.created_at,
			updated_at: product_transfer.updated_at,
			remarks: product_transfer.remarks,
			info_uuid: workSchema.order.info_uuid,
			info_id: sql`CONCAT ('WI', TO_CHAR(${workSchema.info.created_at}::timestamp, 'YY'), '-', TO_CHAR(${workSchema.info.id}, 'FM0000'))`,
			user_uuid: workSchema.info.user_uuid,
			user_name: user.name,
			max_quantity:
				decimalToNumber(sql`CASE WHEN ${warehouse.assigned} = 'warehouse_1' THEN ${product.warehouse_1} + ${product_transfer.quantity} 
						WHEN ${warehouse.assigned} = 'warehouse_2' THEN ${product.warehouse_2} + ${product_transfer.quantity} 
						WHEN ${warehouse.assigned} = 'warehouse_3' THEN ${product.warehouse_3} + ${product_transfer.quantity} 
						WHEN ${warehouse.assigned} = 'warehouse_4' THEN ${product.warehouse_4} + ${product_transfer.quantity}
						WHEN ${warehouse.assigned} = 'warehouse_5' THEN ${product.warehouse_5} + ${product_transfer.quantity} 
						WHEN ${warehouse.assigned} = 'warehouse_6' THEN ${product.warehouse_6} + ${product_transfer.quantity} 
						WHEN ${warehouse.assigned} = 'warehouse_7' THEN ${product.warehouse_7} + ${product_transfer.quantity} 
						WHEN ${warehouse.assigned} = 'warehouse_8' THEN ${product.warehouse_8} + ${product_transfer.quantity} 
						WHEN ${warehouse.assigned} = 'warehouse_9' THEN ${product.warehouse_9} + ${product_transfer.quantity} 
						WHEN ${warehouse.assigned} = 'warehouse_10' THEN ${product.warehouse_10} + ${product_transfer.quantity}
						WHEN ${warehouse.assigned} = 'warehouse_11' THEN ${product.warehouse_11} + ${product_transfer.quantity}
						WHEN ${warehouse.assigned} = 'warehouse_12' THEN ${product.warehouse_12} + ${product_transfer.quantity}
						END`),
		})
		.from(product_transfer)
		.leftJoin(product, eq(product_transfer.product_uuid, product.uuid))
		.leftJoin(
			warehouse,
			eq(product_transfer.warehouse_uuid, warehouse.uuid)
		)
		.leftJoin(
			workSchema.order,
			eq(product_transfer.order_uuid, workSchema.order.uuid)
		)
		.leftJoin(
			hrSchema.users,
			eq(product_transfer.created_by, hrSchema.users.uuid)
		)
		.leftJoin(
			workSchema.info,
			eq(workSchema.order.info_uuid, workSchema.info.uuid)
		)
		.leftJoin(user, eq(workSchema.info.user_uuid, user.uuid));
	try {
		const data = await productTransferPromise;
		const toast = {
			status: 200,
			type: 'select all',
			message: 'product transfer list',
		};

		return await res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function select(req, res, next) {
	const productTransferPromise = db
		.select({
			id: product_transfer.id,
			product_transfer_id: sql`CONCAT('PT', TO_CHAR(${product_transfer.created_at}, 'YY'), '-', TO_CHAR(${product_transfer.id}, 'FM0000'))`,
			uuid: product_transfer.uuid,
			product_uuid: product_transfer.product_uuid,
			product_name: product.name,
			warehouse_uuid: product_transfer.warehouse_uuid,
			warehouse_name: warehouse.name,
			order_uuid: product_transfer.order_uuid,
			order_id: sql`CONCAT('WO', TO_CHAR(${workSchema.order.created_at}, 'YY'), '-', TO_CHAR(${workSchema.order.id}, 'FM0000'))`,
			quantity: decimalToNumber(product_transfer.quantity),
			created_by: product_transfer.created_by,
			created_by_name: hrSchema.users.name,
			created_at: product_transfer.created_at,
			updated_at: product_transfer.updated_at,
			remarks: product_transfer.remarks,
			info_uuid: workSchema.order.info_uuid,
			user_uuid: workSchema.info.user_uuid,
			user_name: user.name,
			info_id: sql`CONCAT ('WI', TO_CHAR(${workSchema.info.created_at}::timestamp, 'YY'), '-', TO_CHAR(${workSchema.info.id}, 'FM0000'))`,
			max_quantity:
				decimalToNumber(sql`CASE WHEN ${warehouse.assigned} = 'warehouse_1' THEN ${product.warehouse_1} + ${product_transfer.quantity} 
						WHEN ${warehouse.assigned} = 'warehouse_2' THEN ${product.warehouse_2} + ${product_transfer.quantity} 
						WHEN ${warehouse.assigned} = 'warehouse_3' THEN ${product.warehouse_3} + ${product_transfer.quantity} 
						WHEN ${warehouse.assigned} = 'warehouse_4' THEN ${product.warehouse_4} + ${product_transfer.quantity}
						WHEN ${warehouse.assigned} = 'warehouse_5' THEN ${product.warehouse_5} + ${product_transfer.quantity} 
						WHEN ${warehouse.assigned} = 'warehouse_6' THEN ${product.warehouse_6} + ${product_transfer.quantity} 
						WHEN ${warehouse.assigned} = 'warehouse_7' THEN ${product.warehouse_7} + ${product_transfer.quantity} 
						WHEN ${warehouse.assigned} = 'warehouse_8' THEN ${product.warehouse_8} + ${product_transfer.quantity} 
						WHEN ${warehouse.assigned} = 'warehouse_9' THEN ${product.warehouse_9} + ${product_transfer.quantity} 
						WHEN ${warehouse.assigned} = 'warehouse_10' THEN ${product.warehouse_10} + ${product_transfer.quantity}
						WHEN ${warehouse.assigned} = 'warehouse_11' THEN ${product.warehouse_11} + ${product_transfer.quantity}
						WHEN ${warehouse.assigned} = 'warehouse_12' THEN ${product.warehouse_12} + ${product_transfer.quantity}
						END`),
		})
		.from(product_transfer)
		.leftJoin(product, eq(product_transfer.product_uuid, product.uuid))
		.leftJoin(
			warehouse,
			eq(product_transfer.warehouse_uuid, warehouse.uuid)
		)
		.leftJoin(
			workSchema.order,
			eq(product_transfer.order_uuid, workSchema.order.uuid)
		)
		.leftJoin(
			hrSchema.users,
			eq(product_transfer.created_by, hrSchema.users.uuid)
		)
		.leftJoin(
			workSchema.info,
			eq(workSchema.order.info_uuid, workSchema.info.uuid)
		)
		.leftJoin(user, eq(workSchema.info.user_uuid, user.uuid))
		.where(eq(product_transfer.uuid, req.params.uuid));

	try {
		const data = await productTransferPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'product transfer detail',
		};

		return await res.status(200).json({ toast, data: data[0] });
	} catch (error) {
		next(error);
	}
}

export async function selectByOrderUuid(req, res, next) {
	if (!(await validateRequest(req, next))) return;
	const { order_uuid } = req.params;

	const productTransferPromise = db
		.select({
			id: product_transfer.id,
			uuid: product_transfer.uuid,
			product_uuid: product_transfer.product_uuid,
			product_name: product.name,
			warehouse_uuid: product_transfer.warehouse_uuid,
			warehouse_name: warehouse.name,
			order_uuid: product_transfer.order_uuid,
			created_by: product_transfer.created_by,
			created_by_name: hrSchema.users.name,
			created_at: product_transfer.created_at,
			updated_at: product_transfer.updated_at,
			remarks: product_transfer.remarks,
			quantity: sql`SUM(${product_transfer.quantity})::float8`,
		})
		.from(product_transfer)
		.leftJoin(
			hrSchema.users,
			eq(product_transfer.created_by, hrSchema.users.uuid)
		)
		.leftJoin(product, eq(product_transfer.product_uuid, product.uuid))
		.leftJoin(
			warehouse,
			eq(product_transfer.warehouse_uuid, warehouse.uuid)
		)
		.where(eq(product_transfer.order_uuid, order_uuid))
		.groupBy(
			product_transfer.id,
			product_transfer.uuid,
			product_transfer.product_uuid,
			product_transfer.warehouse_uuid,
			product_transfer.order_uuid,
			product_transfer.created_by,
			hrSchema.users.name,
			product_transfer.created_at,
			product_transfer.updated_at,
			product_transfer.remarks,
			product.name,
			warehouse.name
		);

	try {
		const data = await productTransferPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'product transfer list by order',
		};

		return await res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}
