import { desc, eq } from 'drizzle-orm';
import { validateRequest } from '../../../util/index.js';
import db from '../../index.js';
import { sub_department, users } from '../schema.js';

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const sub_departmentPromise = db
		.insert(sub_department)
		.values(req.body)
		.returning({ insertedName: sub_department.name });

	try {
		const data = await sub_departmentPromise;
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

	const sub_departmentPromise = db
		.update(sub_department)
		.set(req.body)
		.where(eq(sub_department.uuid, req.params.uuid))
		.returning({ updatedName: sub_department.name });

	try {
		const data = await sub_departmentPromise;
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

	const sub_departmentPromise = db
		.delete(sub_department)
		.where(eq(sub_department.uuid, req.params.uuid))
		.returning({ deletedName: sub_department.name });

	try {
		const data = await sub_departmentPromise;
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
			uuid: sub_department.uuid,
			id: sub_department.id,
			name: sub_department.name,
			hierarchy: sub_department.hierarchy,
			status: sub_department.status,
			created_by: sub_department.created_by,
			created_by_name: users.name,
			created_at: sub_department.created_at,
			updated_at: sub_department.updated_at,
			remarks: sub_department.remarks,
		})
		.from(sub_department)
		.leftJoin(users, eq(sub_department.created_by, users.uuid))
		.orderBy(desc(sub_department.created_at));

	try {
		const data = await resultPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'sub_department',
		};

		return res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function select(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const sub_departmentPromise = db
		.select({
			uuid: sub_department.uuid,
			id: sub_department.id,
			name: sub_department.name,
			hierarchy: sub_department.hierarchy,
			status: sub_department.status,
			created_by: sub_department.created_by,
			created_by_name: users.name,
			created_at: sub_department.created_at,
			updated_at: sub_department.updated_at,
			remarks: sub_department.remarks,
		})
		.from(sub_department)
		.leftJoin(users, eq(sub_department.created_by, users.uuid))
		.where(eq(sub_department.uuid, req.params.uuid));

	try {
		const data = await sub_departmentPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'sub_department',
		};

		return res.status(200).json({ toast, data: data[0] });
	} catch (error) {
		next(error);
	}
}
