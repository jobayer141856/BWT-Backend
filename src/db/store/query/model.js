import { desc, eq } from 'drizzle-orm';
import { handleError, validateRequest } from '../../../util/index.js';
import db from '../../index.js';
import * as hrSchema from '../../hr/schema.js';

import { brand, model } from '../schema.js';

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const modelPromise = db
		.insert(model)
		.values(req.body)
		.returning({ insertedName: model.name });

	try {
		const data = await modelPromise;
		const toast = {
			status: 201,
			type: 'insert',
			message: `${data[0].insertedName} inserted`,
		};

		return await res.status(201).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function update(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const modelPromise = db
		.update(model)
		.set(req.body)
		.where(eq(model.uuid, req.params.uuid))
		.returning({ updatedName: model.name });

	try {
		const data = await modelPromise;
		const toast = {
			status: 201,
			type: 'update',
			message: `${data[0].updatedName} updated`,
		};

		return await res.status(201).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function remove(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const modelPromise = db
		.delete(model)
		.where(eq(model.uuid, req.params.uuid))
		.returning({ deletedName: model.name });

	try {
		const data = await modelPromise;
		const toast = {
			status: 200,
			type: 'delete',
			message: `${data[0].deletedName} deleted`,
		};

		return await res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function selectAll(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const modelPromise = db
		.select({
			uuid: model.uuid,
			name: model.name,
			brand_uuid: model.brand_uuid,
			brand_name: brand.name,
			created_by: model.created_by,
			created_by_name: hrSchema.users.name,
			created_at: model.created_at,
			updated_at: model.updated_at,
			remarks: model.remarks,
		})
		.from(model)
		.leftJoin(brand, eq(model.brand_uuid, brand.uuid))
		.leftJoin(hrSchema.users, eq(model.created_by, hrSchema.users.uuid))
		.orderBy(desc(model.created_at));

	try {
		const data = await modelPromise;

		const toast = {
			status: 200,
			type: 'select all',
			message: 'models list',
		};

		return await res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function select(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const modelPromise = db
		.select({
			uuid: model.uuid,
			name: model.name,
			brand_uuid: model.brand_uuid,
			brand_name: brand.name,
			created_by: model.created_by,
			created_by_name: hrSchema.users.name,
			created_at: model.created_at,
			updated_at: model.updated_at,
			remarks: model.remarks,
		})
		.from(model)
		.leftJoin(brand, eq(model.brand_uuid, brand.uuid))
		.leftJoin(hrSchema.users, eq(model.created_by, hrSchema.users.uuid))
		.where(eq(model.uuid, req.params.uuid));

	try {
		const data = await modelPromise;

		const toast = {
			status: 200,
			type: 'select',
			message: 'model details',
		};

		return await res.status(200).json({ toast, data: data[0] });
	} catch (error) {
		next(error);
	}
}
