import { desc, eq } from 'drizzle-orm';
import { alias } from 'drizzle-orm/pg-core';
import { validateRequest } from '../../../util/index.js';
import db from '../../index.js';
import { apply_balance, employee, leave_category, users } from '../schema.js';

const createdByUser = alias(users, 'created_by_user');

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const apply_balancePromise = db
		.insert(apply_balance)
		.values(req.body)
		.returning({ insertedName: apply_balance.name });

	try {
		const data = await apply_balancePromise;
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

	const apply_balancePromise = db
		.update(apply_balance)
		.set(req.body)
		.where(eq(apply_balance.uuid, req.params.uuid))
		.returning({ updatedName: apply_balance.name });

	try {
		const data = await apply_balancePromise;
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

	const apply_balancePromise = db
		.delete(apply_balance)
		.where(eq(apply_balance.uuid, req.params.uuid))
		.returning({ deletedName: apply_balance.name });

	try {
		const data = await apply_balancePromise;
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
			uuid: apply_balance.uuid,
			employee_uuid: apply_balance.employee_uuid,
			employee_name: users.name,
			leave_category_uuid: apply_balance.leave_category_uuid,
			leave_category_name: leave_category.name,
			year: apply_balance.year,
			days_count: apply_balance.days_count,
			reason: apply_balance.reason,
			file: apply_balance.file,
			created_by: apply_balance.created_by,
			created_by_name: createdByUser.name,
			created_at: apply_balance.created_at,
			updated_at: apply_balance.updated_at,
			remarks: apply_balance.remarks,
		})
		.from(apply_balance)
		.leftJoin(employee, eq(apply_balance.employee_uuid, employee.uuid))
		.leftJoin(users, eq(employee.user_uuid, users.uuid))
		.leftJoin(
			leave_category,
			eq(apply_balance.leave_category_uuid, leave_category.uuid)
		)
		.leftJoin(
			createdByUser,
			eq(apply_balance.created_by, createdByUser.uuid)
		)
		.orderBy(desc(apply_balance.created_at));

	try {
		const data = await resultPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'apply_balance',
		};

		return res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function select(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const apply_balancePromise = db
		.select({
			uuid: apply_balance.uuid,
			employee_uuid: apply_balance.employee_uuid,
			employee_name: users.name,
			leave_category_uuid: apply_balance.leave_category_uuid,
			leave_category_name: leave_category.name,
			year: apply_balance.year,
			days_count: apply_balance.days_count,
			reason: apply_balance.reason,
			file: apply_balance.file,
			created_by: apply_balance.created_by,
			created_by_name: createdByUser.name,
			created_at: apply_balance.created_at,
			updated_at: apply_balance.updated_at,
			remarks: apply_balance.remarks,
		})
		.from(apply_balance)
		.leftJoin(employee, eq(apply_balance.employee_uuid, employee.uuid))
		.leftJoin(users, eq(employee.user_uuid, users.uuid))
		.leftJoin(
			leave_category,
			eq(apply_balance.leave_category_uuid, leave_category.uuid)
		)
		.leftJoin(
			createdByUser,
			eq(apply_balance.created_by, createdByUser.uuid)
		)
		.where(eq(apply_balance.uuid, req.params.uuid));

	try {
		const data = await apply_balancePromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'apply_balance',
		};

		return res.status(200).json({ toast, data: data[0] });
	} catch (error) {
		next(error);
	}
}
