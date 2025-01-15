import { desc, eq } from 'drizzle-orm';
import { handleError, validateRequest } from '../../../util/index.js';
import db from '../../index.js';
import * as hrSchema from '../../hr/schema.js';

import { product, stock } from '../schema.js';

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const stockPromise = db
		.insert(stock)
		.values(req.body)
		.returning({ insertedUuid: stock.uuid });

	try {
		const data = await stockPromise;
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

	const stockPromise = db
		.update(stock)
		.set(req.body)
		.where(eq(stock.uuid, req.params.uuid))
		.returning({ updatedUuid: stock.uuid });

	try {
		const data = await stockPromise;
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

	const stockPromise = db
		.delete(stock)
		.where(eq(stock.uuid, req.params.uuid))
		.returning({ deletedUuid: stock.uuid });

	try {
		const data = await stockPromise;
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
	const stockPromise = db
		.select({
			uuid: stock.uuid,
			id: stock.id,
			product_uuid: stock.product_uuid,
			product_name: product.name,
			warehouse_1: stock.warehouse_1,
			warehouse_2: stock.warehouse_2,
			warehouse_3: stock.warehouse_3,
			created_by: stock.created_by,
			created_by_name: hrSchema.users.name,
			created_at: stock.created_at,
			updated_at: stock.updated_at,
			remarks: stock.remarks,
		})
		.from(stock)
		.leftJoin(hrSchema.users, eq(stock.created_by, hrSchema.users.uuid))
		.leftJoin(product, eq(stock.product_uuid, product.uuid))
		.orderBy(desc(stock.created_at));

	try {
		const data = await stockPromise;
		const toast = {
			status: 200,
			type: 'select all',
			message: 'stocks list',
		};
		return res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function select(req, res, next) {
	const stockPromise = db
		.select({
			uuid: stock.uuid,
			id: stock.id,
			product_uuid: stock.product_uuid,
			product_name: product.name,
			warehouse_1: stock.warehouse_1,
			warehouse_2: stock.warehouse_2,
			warehouse_3: stock.warehouse_3,
			created_by: stock.created_by,
			created_by_name: hrSchema.users.name,
			created_at: stock.created_at,
			updated_at: stock.updated_at,
			remarks: stock.remarks,
		})
		.from(stock)
		.leftJoin(hrSchema.users, eq(stock.created_by, hrSchema.users.uuid))
		.leftJoin(product, eq(stock.product_uuid, product.uuid))
		.where(eq(stock.uuid, req.params.uuid));

	try {
		const data = await stockPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'stock',
		};
		return res.status(200).json({ toast, data: data[0] });
	} catch (error) {
		next(error);
	}
}
