import { desc, eq } from 'drizzle-orm';
import { handleError, validateRequest } from '../../../util/index.js';
import db from '../../index.js';

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const groupPromise = db
		.insert(group)
		.values(req.body)
		.returning({ insertedId: group.name });

	try {
		const data = await groupPromise;
		const toast = {
			status: 201,
			type: 'create',
			message: `${data[0].insertedId} created`,
		};

		return await res.status(201).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function update(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const groupPromise = db
		.update(group)
		.set(req.body)
		.where(eq(group.uuid, req.params.uuid))
		.returning({ updatedId: group.name });

	try {
		const data = await groupPromise;
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

	const groupPromise = db
		.delete(group)
		.where(eq(group.uuid, req.params.uuid))
		.returning({ deletedId: group.name });

	try {
		const data = await groupPromise;
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
	const resultPromise = db
		.select({
			uuid: group.uuid,
			name: group.name,
			created_by: group.created_by,
			created_at: group.created_at,
			updated_at: group.updated_at,
			remarks: group.remarks,
		})
		.from(group)
		.orderBy(desc(group.created_at));

	try {
		const data = await resultPromise;
		return await res.status(200).json(data);
	} catch (error) {
		next(error);
	}
}

export async function select(req, res, next) {
	const resultPromise = db
		.select({
			uuid: group.uuid,
			name: group.name,
			created_by: group.created_by,
			created_at: group.created_at,
			updated_at: group.updated_at,
			remarks: group.remarks,
		})
		.from(group)
		.where(eq(group.uuid, req.params.uuid));

	try {
		const data = await resultPromise;
		return await res.status(200).json(data);
	} catch (error) {
		next(error);
	}
}
