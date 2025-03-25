import { desc, eq, sql } from 'drizzle-orm';
import { handleError, validateRequest } from '../../../util/index.js';
import db from '../../index.js';
import * as hrSchema from '../../hr/schema.js';
import { decimalToNumber } from '../../variables.js';
import * as workSchema from '../../work/schema.js';
import { product_transfer, product, warehouse } from '../schema.js';

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
			info_id: sql`CONCAT('WI', TO_CHAR(${workSchema.info.created_at}, 'YY'), '-', TO_CHAR(${workSchema.info.id}, 'FM0000'))`,
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
		);
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
			info_id: sql`CONCAT('WI', TO_CHAR(${workSchema.info.created_at}, 'YY'), '-', TO_CHAR(${workSchema.info.id}, 'FM0000'))`,
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
