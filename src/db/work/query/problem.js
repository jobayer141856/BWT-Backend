import { desc, eq } from 'drizzle-orm';
import { handleError, validateRequest } from '../../../util/index.js';
import db from '../../index.js';
import * as hrSchema from '../../hr/schema.js';
import { decimalToNumber } from '../../variables.js';

import { problem } from '../schema.js';

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const problemPromise = db
		.insert(problem)
		.values(req.body)
		.returning({ insertedName: problem.name });

	try {
		const data = await problemPromise;
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

	const problemPromise = db
		.update(problem)
		.set(req.body)
		.where(eq(problem.uuid, req.params.uuid))
		.returning({ updatedName: problem.name });

	try {
		const data = await problemPromise;
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

	const problemPromise = db
		.delete(problem)
		.where(eq(problem.uuid, req.params.uuid))
		.returning({ deletedName: problem.name });

	try {
		const data = await problemPromise;
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
	const problemPromise = db
		.select({
			uuid: problem.uuid,
			name: problem.name,
			category: problem.category,
			created_by: problem.created_by,
			created_by_name: hrSchema.users.name,
			created_at: problem.created_at,
			updated_at: problem.updated_at,
			remarks: problem.remarks,
		})
		.from(problem)
		.leftJoin(hrSchema.users, eq(problem.created_by, hrSchema.users.uuid))
		.orderBy(desc(problem.created_at));

	try {
		const data = await problemPromise;
		const toast = {
			status: 200,
			type: 'select all',
			message: 'problems list',
		};

		return await res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function select(req, res, next) {
	const problemPromise = db
		.select({
			uuid: problem.uuid,
			name: problem.name,
			category: problem.category,
			created_by: problem.created_by,
			created_by_name: hrSchema.users.name,
			created_at: problem.created_at,
			updated_at: problem.updated_at,
			remarks: problem.remarks,
		})
		.from(problem)
		.leftJoin(hrSchema.users, eq(problem.created_by, hrSchema.users.uuid))
		.where(eq(problem.uuid, req.params.uuid));

	try {
		const data = await problemPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'problem',
		};

		return await res.status(200).json({ toast, data: data[0] });
	} catch (error) {
		next(error);
	}
}
