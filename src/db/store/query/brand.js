import { desc, eq } from 'drizzle-orm';
import { handleError, validateRequest } from '../../../util/index.js';
import db from '../../index.js';
import * as hrSchema from '../../hr/schema.js';

import { brand } from '../schema.js';

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const brandPromise = db
		.insert(brand)
		.values(req.body)
		.returning({ insertedName: brand.name });

	try {
		const data = await brandPromise;

		const toast = {
			status: 201,
			type: 'insert',
			message: `${data[0].insertedName} inserted`,
		};

		return res.status(201).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function update(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const brandPromise = db
		.update(brand)
		.set(req.body)
		.where(eq(brand.uuid, req.params.uuid))
		.returning({ updatedName: brand.name });

	try {
		const data = await brandPromise;

		const toast = {
			status: 201,
			type: 'update',
			message: `${data[0].updatedName} updated`,
		};

		return res.status(201).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function remove(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const brandPromise = db
		.delete(brand)
		.where(eq(brand.uuid, req.params.uuid))
		.returning({ deletedName: brand.name });

	try {
		const data = await brandPromise;

		const toast = {
			status: 201,
			type: 'delete',
			message: `${data[0].deletedName} deleted`,
		};

		return res.status(201).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function selectAll(req, res, next) {
	const brandPromise = db
		.select({
			uuid: brand.uuid,
			id: brand.id,
			name: brand.name,
			created_by: brand.created_by,
			created_by_name: hrSchema.users.name,
			created_at: brand.created_at,
			updated_at: brand.updated_at,
			remarks: brand.remarks,
		})
		.from(brand)
		.leftJoin(hrSchema.users, eq(brand.created_by, hrSchema.users.uuid));

	try {
		const data = await brandPromise;
		const toast = {
			status: 200,
			type: 'select all',
			message: 'band list',
		};
		return res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function select(req, res, next) {
	const brandPromise = db
		.select({
			uuid: brand.uuid,
			id: brand.id,
			name: brand.name,
			created_by: brand.created_by,
			created_by_name: hrSchema.users.name,
			created_at: brand.created_at,
			updated_at: brand.updated_at,
			remarks: brand.remarks,
		})
		.from(brand)
		.leftJoin(hrSchema.users, eq(brand.created_by, hrSchema.users.uuid))
		.where(eq(brand.uuid, req.params.uuid));

	try {
		const data = await brandPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'brand',
		};
		return res.status(200).json({ toast, data: data[0] });
	} catch (error) {
		next(error);
	}
}
