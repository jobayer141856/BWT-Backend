import { desc, eq } from 'drizzle-orm';
import { handleError, validateRequest } from '../../../util/index.js';
import db from '../../index.js';
import * as hrSchema from '../../hr/schema.js';

import { branch } from '../schema.js';

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const branchPromise = db
		.insert(branch)
		.values(req.body)
		.returning({ insertedName: branch.name });

	try {
		const data = await branchPromise;
		const toast = {
			status: 201,
			type: 'create',
			message: `${data[0].insertedName} created`,
		};

		return await res.status(201).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function update(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const branchPromise = db
		.update(branch)
		.set(req.body)
		.where(eq(branch.uuid, req.params.uuid))
		.returning({ updatedName: branch.name });

	try {
		const data = await branchPromise;
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

	const branchPromise = db
		.delete(branch)
		.where(eq(branch.uuid, req.params.uuid))
		.returning({ deletedName: branch.name });

	try {
		const data = await branchPromise;
		const toast = {
			status: 201,
			type: 'delete',
			message: `${data[0].deletedName} deleted`,
		};

		return await res.status(201).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function selectAll(req, res, next) {
	const branchPromise = db
		.select({
			uuid: branch.uuid,
			name: branch.name,
			address: branch.address,
			created_by: branch.created_by,
			created_by_name: hrSchema.users.name,
			created_at: branch.created_at,
			updated_at: branch.updated_at,
			remarks: branch.remarks,
		})
		.from(branch)
		.leftJoin(hrSchema.users, eq(branch.created_by, hrSchema.users.uuid))
		.orderBy(desc(branch.created_at));

	try {
		const data = await branchPromise;
		return res.status(200).json(data);
	} catch (error) {
		next(error);
	}
}

export async function select(req, res, next) {
	const branchPromise = db
		.select({
			uuid: branch.uuid,
			name: branch.name,
			address: branch.address,
			created_by: branch.created_by,
			created_by_name: hrSchema.users.name,
			created_at: branch.created_at,
			updated_at: branch.updated_at,
			remarks: branch.remarks,
		})
		.from(branch)
		.leftJoin(hrSchema.users, eq(branch.created_by, hrSchema.users.uuid))
		.where(eq(branch.uuid, req.params.uuid));

	try {
		const data = await branchPromise;
		return res.status(200).json(data[0]);
	} catch (error) {
		next(error);
	}
}
