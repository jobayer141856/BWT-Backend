import { desc, eq } from 'drizzle-orm';
import { validateRequest } from '../../../util/index.js';
import db from '../../index.js';
import {
    leave_category,
    users
} from '../schema.js';

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const leave_categoryPromise = db
		.insert(leave_category)
		.values(req.body)
		.returning({ insertedName: leave_category.name });

	try {
		const data = await leave_categoryPromise;
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

	const leave_categoryPromise = db
		.update(leave_category)
		.set(req.body)
		.where(eq(leave_category.uuid, req.params.uuid))
		.returning({ updatedName: leave_category.name });

	try {
		const data = await leave_categoryPromise;
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

	const leave_categoryPromise = db
		.delete(leave_category)
		.where(eq(leave_category.uuid, req.params.uuid))
		.returning({ deletedName: leave_category.name });

	try {
		const data = await leave_categoryPromise;
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
			uuid: leave_category.uuid,
			id: leave_category.id,
			name: leave_category.name,
			created_by: leave_category.created_by,
			created_by_name: users.name,
			created_at: leave_category.created_at,
			updated_at: leave_category.updated_at,
			remarks: leave_category.remarks,
		})
		.from(leave_category)
		.leftJoin(users, eq(leave_category.created_by, users.uuid))
		.orderBy(desc(leave_category.created_at));

	try {
		const data = await resultPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'leave_category',
		};

		return res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function select(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const leave_categoryPromise = db
		.select({
			uuid: leave_category.uuid,
			id: leave_category.id,
			name: leave_category.name,
			created_by: leave_category.created_by,
			created_by_name: users.name,
			created_at: leave_category.created_at,
			updated_at: leave_category.updated_at,
			remarks: leave_category.remarks,
		})
		.from(leave_category)
		.leftJoin(users, eq(leave_category.created_by, users.uuid))
		.where(eq(leave_category.uuid, req.params.uuid));

	try {
		const data = await leave_categoryPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'leave_category',
		};

		return res.status(200).json({ toast, data: data[0] });
	} catch (error) {
		next(error);
	}
}
