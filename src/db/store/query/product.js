import { desc, eq } from 'drizzle-orm';
import { handleError, validateRequest } from '../../../util/index.js';
import db from '../../index.js';
import * as hrSchema from '../../hr/schema.js';
import { decimalToNumber } from '../../variables.js';
import { brand, category, model, product, size, warehouse } from '../schema.js';

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const productPromise = db
		.insert(product)
		.values(req.body)
		.returning({ insertedId: product.uuid });

	try {
		const data = await productPromise;
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

	const productPromise = db
		.update(product)
		.set(req.body)
		.where(eq(product.uuid, req.params.uuid))
		.returning({ updatedId: product.uuid });

	try {
		const data = await productPromise;
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

	const productPromise = db
		.delete(product)
		.where(eq(product.uuid, req.params.uuid))
		.returning({ deletedId: product.uuid });

	try {
		const data = await productPromise;
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
	const productPromise = db
		.select({
			uuid: product.uuid,
			name: product.name,
			category_uuid: product.category_uuid,
			category_name: category.name,
			model_uuid: product.model_uuid,
			model_name: model.name,
			size_uuid: product.size_uuid,
			size_name: size.name,
			warranty_days: product.warranty_days,
			service_warranty_days: product.service_warranty_days,
			type: product.type,
			is_maintaining_stock: product.is_maintaining_stock,
			created_by: product.created_by,
			created_by_name: hrSchema.users.name,
			created_at: product.created_at,
			updated_at: product.updated_at,
			remarks: product.remarks,
			warehouse_1: decimalToNumber(product.warehouse_1),
			warehouse_2: decimalToNumber(product.warehouse_2),
			warehouse_3: decimalToNumber(product.warehouse_3),
		})
		.from(product)
		.leftJoin(category, eq(product.category_uuid, category.uuid))
		.leftJoin(model, eq(product.model_uuid, model.uuid))
		.leftJoin(size, eq(product.size_uuid, size.uuid))
		.leftJoin(hrSchema.users, eq(product.created_by, hrSchema.users.uuid))
		.orderBy(desc(product.created_at));

	try {
		const data = await productPromise;
		const toast = {
			status: 200,
			type: 'select all',
			message: 'products list',
		};
		return await res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function select(req, res, next) {
	const productPromise = db
		.select({
			uuid: product.uuid,
			name: product.name,
			category_uuid: product.category_uuid,
			category_name: category.name,
			model_uuid: product.model_uuid,
			model_name: model.name,
			size_uuid: product.size_uuid,
			size_name: size.name,
			warranty_days: product.warranty_days,
			service_warranty_days: product.service_warranty_days,
			type: product.type,
			is_maintaining_stock: product.is_maintaining_stock,
			created_by: product.created_by,
			created_by_name: hrSchema.users.name,
			created_at: product.created_at,
			updated_at: product.updated_at,
			remarks: product.remarks,
			warehouse_1: decimalToNumber(product.warehouse_1),
			warehouse_2: decimalToNumber(product.warehouse_2),
			warehouse_3: decimalToNumber(product.warehouse_3),
		})
		.from(product)
		.leftJoin(category, eq(product.category_uuid, category.uuid))
		.leftJoin(model, eq(product.model_uuid, model.uuid))
		.leftJoin(size, eq(product.size_uuid, size.uuid))
		.leftJoin(hrSchema.users, eq(product.created_by, hrSchema.users.uuid))
		.where(eq(product.uuid, req.params.uuid));

	try {
		const data = await productPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'product',
		};
		return await res.status(200).json({ toast, data: data[0] });
	} catch (error) {
		next(error);
	}
}
