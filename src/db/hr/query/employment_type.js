import { desc, eq } from 'drizzle-orm';
import { validateRequest } from '../../../util/index.js';
import db from '../../index.js';
import { employment_type, users } from '../schema.js';

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const employment_typePromise = db
		.insert(employment_type)
		.values(req.body)
		.returning({ insertedName: employment_type.name });

	try {
		const data = await employment_typePromise;
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

	const employment_typePromise = db
		.update(employment_type)
		.set(req.body)
		.where(eq(employment_type.uuid, req.params.uuid))
		.returning({ updatedName: employment_type.name });

	try {
		const data = await employment_typePromise;
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

	const employment_typePromise = db
		.delete(employment_type)
		.where(eq(employment_type.uuid, req.params.uuid))
		.returning({ deletedName: employment_type.name });

	try {
		const data = await employment_typePromise;
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
	const resultPromise = db
		.select({
			uuid: employment_type.uuid,
			id: employment_type.id,
			name: employment_type.name,
			status: employment_type.status,
			created_by: employment_type.created_by,
			created_by_name: users.name,
			created_at: employment_type.created_at,
			updated_at: employment_type.updated_at,
			remarks: employment_type.remarks,
		})
		.from(employment_type)
		.leftJoin(users, eq(employment_type.created_by, users.uuid))
		.orderBy(desc(employment_type.created_at));

	try {
		const data = await resultPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'employment_type',
		};

		return res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function select(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const employment_typePromise = db
		.select({
			uuid: employment_type.uuid,
			id: employment_type.id,
			name: employment_type.name,
			status: employment_type.status,
			created_by: employment_type.created_by,
			created_by_name: users.name,
			created_at: employment_type.created_at,
			updated_at: employment_type.updated_at,
			remarks: employment_type.remarks,
		})
		.from(employment_type)
		.leftJoin(users, eq(employment_type.created_by, users.uuid))
		.where(eq(employment_type.uuid, req.params.uuid));

	try {
		const data = await employment_typePromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'employment_type',
		};

		return res.status(200).json({ toast, data: data[0] });
	} catch (error) {
		next(error);
	}
}
