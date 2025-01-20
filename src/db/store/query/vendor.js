import { desc, eq } from 'drizzle-orm';
import { handleError, validateRequest } from '../../../util/index.js';
import db from '../../index.js';
import * as hrSchema from '../../hr/schema.js';
import { model, vendor } from '../schema.js';

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const vendorPromise = db
		.insert(vendor)
		.values(req.body)
		.returning({ insertedName: vendor.name });

	try {
		const data = await vendorPromise;

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

	const vendorPromise = db
		.update(vendor)
		.set(req.body)
		.where(eq(vendor.uuid, req.params.uuid))
		.returning({ updatedName: vendor.name });

	try {
		const data = await vendorPromise;

		const toast = {
			status: 200,
			type: 'update',
			message: `${data[0].updatedName} updated`,
		};

		return res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function remove(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const vendorPromise = db
		.delete(vendor)
		.where(eq(vendor.uuid, req.params.uuid))
		.returning({ deletedName: vendor.name });

	try {
		const data = await vendorPromise;

		const toast = {
			status: 200,
			type: 'delete',
			message: `${data[0].deletedName} deleted`,
		};

		return res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function selectAll(req, res, next) {
	const vendorPromise = db
		.select({
			uuid: vendor.uuid,
			model_uuid: vendor.model_uuid,
			model_name: model.name,
			name: vendor.name,
			company_name: vendor.company_name,
			phone: vendor.phone,
			address: vendor.address,
			description: vendor.description,
			is_active: vendor.is_active,
			created_by: vendor.created_by,
			created_by_name: hrSchema.users.name,
			created_at: vendor.created_at,
			updated_at: vendor.updated_at,
			remarks: vendor.remarks,
		})
		.from(vendor)
		.leftJoin(model, eq(vendor.model_uuid, model.uuid))
		.leftJoin(hrSchema.users, eq(vendor.created_by, hrSchema.users.uuid))
		.orderBy(desc(vendor.created_at));
	try {
		const data = await vendorPromise;

		const toast = {
			status: 200,
			type: 'select all',
			message: 'vendors list',
		};

		return res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function select(req, res, next) {
	const vendorPromise = db
		.select({
			uuid: vendor.uuid,
			model_uuid: vendor.model_uuid,
			model_name: model.name,
			name: vendor.name,
			company_name: vendor.company_name,
			phone: vendor.phone,
			address: vendor.address,
			description: vendor.description,
			is_active: vendor.is_active,
			created_by: vendor.created_by,
			created_by_name: hrSchema.users.name,
			created_at: vendor.created_at,
			updated_at: vendor.updated_at,
			remarks: vendor.remarks,
		})
		.from(vendor)
		.leftJoin(model, eq(vendor.model_uuid, model.uuid))
		.leftJoin(hrSchema.users, eq(vendor.created_by, hrSchema.users.uuid))
		.where(eq(vendor.uuid, req.params.uuid));

	try {
		const data = await vendorPromise;

		const toast = {
			status: 200,
			type: 'select',
			message: 'vendor',
		};

		return res.status(200).json({ toast, data: data[0] });
	} catch (error) {
		next(error);
	}
}
