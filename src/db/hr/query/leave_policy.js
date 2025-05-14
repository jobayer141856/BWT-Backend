import { desc, eq } from 'drizzle-orm';
import { validateRequest } from '../../../util/index.js';
import db from '../../index.js';
import { leave_policy, users } from '../schema.js';

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const leave_policyPromise = db
		.insert(leave_policy)
		.values(req.body)
		.returning({ insertedName: leave_policy.name });

	try {
		const data = await leave_policyPromise;
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

	const leave_policyPromise = db
		.update(leave_policy)
		.set(req.body)
		.where(eq(leave_policy.uuid, req.params.uuid))
		.returning({ updatedName: leave_policy.name });

	try {
		const data = await leave_policyPromise;
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

	const leave_policyPromise = db
		.delete(leave_policy)
		.where(eq(leave_policy.uuid, req.params.uuid))
		.returning({ deletedName: leave_policy.name });

	try {
		const data = await leave_policyPromise;
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
			uuid: leave_policy.uuid,
			id: leave_policy.id,
			name: leave_policy.name,
			created_by: leave_policy.created_by,
			created_by_name: users.name,
			created_at: leave_policy.created_at,
			updated_at: leave_policy.updated_at,
			remarks: leave_policy.remarks,
		})
		.from(leave_policy)
		.leftJoin(users, eq(leave_policy.created_by, users.uuid))
		.orderBy(desc(leave_policy.created_at));

	try {
		const data = await resultPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'leave_policy',
		};

		return res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function select(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const leave_policyPromise = db
		.select({
			uuid: leave_policy.uuid,
			id: leave_policy.id,
			name: leave_policy.name,
			created_by: leave_policy.created_by,
			created_by_name: users.name,
			created_at: leave_policy.created_at,
			updated_at: leave_policy.updated_at,
			remarks: leave_policy.remarks,
		})
		.from(leave_policy)
		.leftJoin(users, eq(leave_policy.created_by, users.uuid))
		.where(eq(leave_policy.uuid, req.params.uuid));

	try {
		const data = await leave_policyPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'leave_policy',
		};

		return res.status(200).json({ toast, data: data[0] });
	} catch (error) {
		next(error);
	}
}
