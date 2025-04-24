import { desc, eq, sql } from 'drizzle-orm';
import { handleError, validateRequest } from '../../../util/index.js';
import db from '../../index.js';
import * as hrSchema from '../../hr/schema.js';
import { decimalToNumber } from '../../variables.js';
import { brand, category, model, product, size, warehouse } from '../schema.js';
import { alias } from 'drizzle-orm/pg-core';

const warehouse1 = alias(warehouse, 'warehouse_1');
const warehouse2 = alias(warehouse, 'warehouse_2');
const warehouse3 = alias(warehouse, 'warehouse_3');
const warehouse4 = alias(warehouse, 'warehouse_4');
const warehouse5 = alias(warehouse, 'warehouse_5');
const warehouse6 = alias(warehouse, 'warehouse_6');
const warehouse7 = alias(warehouse, 'warehouse_7');
const warehouse8 = alias(warehouse, 'warehouse_8');
const warehouse9 = alias(warehouse, 'warehouse_9');
const warehouse10 = alias(warehouse, 'warehouse_10');
const warehouse11 = alias(warehouse, 'warehouse_11');
const warehouse12 = alias(warehouse, 'warehouse_12');

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
			warehouse_4: decimalToNumber(product.warehouse_4),
			warehouse_5: decimalToNumber(product.warehouse_5),
			warehouse_6: decimalToNumber(product.warehouse_6),
			warehouse_7: decimalToNumber(product.warehouse_7),
			warehouse_8: decimalToNumber(product.warehouse_8),
			warehouse_9: decimalToNumber(product.warehouse_9),
			warehouse_10: decimalToNumber(product.warehouse_10),
			warehouse_11: decimalToNumber(product.warehouse_11),
			warehouse_12: decimalToNumber(product.warehouse_12),
			warehouse_1_uuid: warehouse1.uuid,
			warehouse_1_name: warehouse1.name,
			warehouse_2_uuid: warehouse2.uuid,
			warehouse_2_name: warehouse2.name,
			warehouse_3_uuid: warehouse3.uuid,
			warehouse_3_name: warehouse3.name,
			warehouse_4_uuid: warehouse4.uuid,
			warehouse_4_name: warehouse4.name,
			warehouse_5_uuid: warehouse5.uuid,
			warehouse_5_name: warehouse5.name,
			warehouse_6_uuid: warehouse6.uuid,
			warehouse_6_name: warehouse6.name,
			warehouse_7_uuid: warehouse7.uuid,
			warehouse_7_name: warehouse7.name,
			warehouse_8_uuid: warehouse8.uuid,
			warehouse_8_name: warehouse8.name,
			warehouse_9_uuid: warehouse9.uuid,
			warehouse_9_name: warehouse9.name,
			warehouse_10_uuid: warehouse10.uuid,
			warehouse_10_name: warehouse10.name,
			warehouse_11_uuid: warehouse11.uuid,
			warehouse_11_name: warehouse11.name,
			warehouse_12_uuid: warehouse12.uuid,
			warehouse_12_name: warehouse12.name,
		})
		.from(product)
		.leftJoin(category, eq(product.category_uuid, category.uuid))
		.leftJoin(model, eq(product.model_uuid, model.uuid))
		.leftJoin(size, eq(product.size_uuid, size.uuid))
		.leftJoin(hrSchema.users, eq(product.created_by, hrSchema.users.uuid))
		.leftJoin(warehouse1, eq(warehouse1.assigned, 'warehouse_1'))
		.leftJoin(warehouse2, eq(warehouse2.assigned, 'warehouse_2'))
		.leftJoin(warehouse3, eq(warehouse3.assigned, 'warehouse_3'))
		.leftJoin(warehouse4, eq(warehouse4.assigned, 'warehouse_4'))
		.leftJoin(warehouse5, eq(warehouse5.assigned, 'warehouse_5'))
		.leftJoin(warehouse6, eq(warehouse6.assigned, 'warehouse_6'))
		.leftJoin(warehouse7, eq(warehouse7.assigned, 'warehouse_7'))
		.leftJoin(warehouse8, eq(warehouse8.assigned, 'warehouse_8'))
		.leftJoin(warehouse9, eq(warehouse9.assigned, 'warehouse_9'))
		.leftJoin(warehouse10, eq(warehouse10.assigned, 'warehouse_10'))
		.leftJoin(warehouse11, eq(warehouse11.assigned, 'warehouse_11'))
		.leftJoin(warehouse12, eq(warehouse12.assigned, 'warehouse_12'))
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
			warehouse_4: decimalToNumber(product.warehouse_4),
			warehouse_5: decimalToNumber(product.warehouse_5),
			warehouse_6: decimalToNumber(product.warehouse_6),
			warehouse_7: decimalToNumber(product.warehouse_7),
			warehouse_8: decimalToNumber(product.warehouse_8),
			warehouse_9: decimalToNumber(product.warehouse_9),
			warehouse_10: decimalToNumber(product.warehouse_10),
			warehouse_11: decimalToNumber(product.warehouse_11),
			warehouse_12: decimalToNumber(product.warehouse_12),
			warehouse_1_uuid: warehouse1.uuid,
			warehouse_1_name: warehouse1.name,
			warehouse_2_uuid: warehouse2.uuid,
			warehouse_2_name: warehouse2.name,
			warehouse_3_uuid: warehouse3.uuid,
			warehouse_3_name: warehouse3.name,
			warehouse_4_uuid: warehouse4.uuid,
			warehouse_4_name: warehouse4.name,
			warehouse_5_uuid: warehouse5.uuid,
			warehouse_5_name: warehouse5.name,
			warehouse_6_uuid: warehouse6.uuid,
			warehouse_6_name: warehouse6.name,
			warehouse_7_uuid: warehouse7.uuid,
			warehouse_7_name: warehouse7.name,
			warehouse_8_uuid: warehouse8.uuid,
			warehouse_8_name: warehouse8.name,
			warehouse_9_uuid: warehouse9.uuid,
			warehouse_9_name: warehouse9.name,
			warehouse_10_uuid: warehouse10.uuid,
			warehouse_10_name: warehouse10.name,
			warehouse_11_uuid: warehouse11.uuid,
			warehouse_11_name: warehouse11.name,
			warehouse_12_uuid: warehouse12.uuid,
			warehouse_12_name: warehouse12.name,
		})
		.from(product)
		.leftJoin(category, eq(product.category_uuid, category.uuid))
		.leftJoin(model, eq(product.model_uuid, model.uuid))
		.leftJoin(size, eq(product.size_uuid, size.uuid))
		.leftJoin(hrSchema.users, eq(product.created_by, hrSchema.users.uuid))
		.leftJoin(warehouse1, eq(warehouse1.assigned, 'warehouse_1'))
		.leftJoin(warehouse2, eq(warehouse2.assigned, 'warehouse_2'))
		.leftJoin(warehouse3, eq(warehouse3.assigned, 'warehouse_3'))
		.leftJoin(warehouse4, eq(warehouse4.assigned, 'warehouse_4'))
		.leftJoin(warehouse5, eq(warehouse5.assigned, 'warehouse_5'))
		.leftJoin(warehouse6, eq(warehouse6.assigned, 'warehouse_6'))
		.leftJoin(warehouse7, eq(warehouse7.assigned, 'warehouse_7'))
		.leftJoin(warehouse8, eq(warehouse8.assigned, 'warehouse_8'))
		.leftJoin(warehouse9, eq(warehouse9.assigned, 'warehouse_9'))
		.leftJoin(warehouse10, eq(warehouse10.assigned, 'warehouse_10'))
		.leftJoin(warehouse11, eq(warehouse11.assigned, 'warehouse_11'))
		.leftJoin(warehouse12, eq(warehouse12.assigned, 'warehouse_12'))
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
