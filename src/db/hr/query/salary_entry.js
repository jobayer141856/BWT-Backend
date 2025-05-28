import { desc, eq } from 'drizzle-orm';
import { alias } from 'drizzle-orm/pg-core';
import { validateRequest } from '../../../util/index.js';
import db from '../../index.js';

import { employee, salary_entry, users } from '../schema.js';
import { decimalToNumber } from '../../variables.js';

const createdByUser = alias(users, 'created_by_user');

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const salaryIncrementPromise = db
		.insert(salary_entry)
		.values(req.body)
		.returning({ insertedUuid: salary_entry.uuid });

	try {
		const data = await salaryIncrementPromise;
		const toast = {
			status: 201,
			type: 'insert',
			message: `${data[0].insertedUuid} inserted`,
		};

		return res.status(201).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function update(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const salaryIncrementPromise = db
		.update(salary_entry)
		.set(req.body)
		.where(eq(salary_entry.uuid, req.params.uuid))
		.returning({ updatedUuid: salary_entry.uuid });

	try {
		const data = await salaryIncrementPromise;
		const toast = {
			status: 200,
			type: 'update',
			message: `${data[0].updatedUuid} updated`,
		};

		return res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function remove(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const salaryIncrementPromise = db
		.delete(salary_entry)
		.where(eq(salary_entry.uuid, req.params.uuid))
		.returning({ deletedUuid: salary_entry.uuid });

	try {
		const data = await salaryIncrementPromise;
		const toast = {
			status: 200,
			type: 'delete',
			message: `${data[0].deletedUuid} deleted`,
		};

		return res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function selectAll(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const salaryIncrementPromise = db
		.select({
			uuid: salary_entry.uuid,
			employee_uuid: salary_entry.employee_uuid,
			employee_name: users.name,
			type: salary_entry.type,
			amount: decimalToNumber(salary_entry.amount),
			month: salary_entry.month,
			year: salary_entry.year,
			created_by: salary_entry.created_by,
			created_by_name: createdByUser.name,
			created_at: salary_entry.created_at,
			updated_at: salary_entry.updated_at,
			remarks: salary_entry.remarks,
		})
		.from(salary_entry)
		.leftJoin(
			createdByUser,
			eq(salary_entry.created_by, createdByUser.uuid)
		)
		.leftJoin(employee, eq(salary_entry.employee_uuid, employee.uuid))
		.leftJoin(users, eq(employee.user_uuid, users.uuid))
		.orderBy(desc(salary_entry.created_at));

	try {
		const data = await salaryIncrementPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'salary_entry list',
		};
		return res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function select(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const salaryIncrementPromise = db
		.select({
			uuid: salary_entry.uuid,
			employee_uuid: salary_entry.employee_uuid,
			employee_name: users.name,
			type: salary_entry.type,
			amount: decimalToNumber(salary_entry.amount),
			month: salary_entry.month,
			year: salary_entry.year,
			created_by: salary_entry.created_by,
			created_by_name: createdByUser.name,
			created_at: salary_entry.created_at,
			updated_at: salary_entry.updated_at,
			remarks: salary_entry.remarks,
		})
		.from(salary_entry)
		.leftJoin(
			createdByUser,
			eq(salary_entry.created_by, createdByUser.uuid)
		)
		.leftJoin(employee, eq(salary_entry.employee_uuid, employee.uuid))
		.leftJoin(users, eq(employee.user_uuid, users.uuid))
		.where(eq(salary_entry.uuid, req.params.uuid));

	try {
		const data = await salaryIncrementPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'salary_entry list',
		};
		return res.status(200).json({ toast, data: data[0] });
	} catch (error) {
		next(error);
	}
}
