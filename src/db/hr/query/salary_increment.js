import { desc, eq } from 'drizzle-orm';
import { alias } from 'drizzle-orm/pg-core';
import { validateRequest } from '../../../util/index.js';
import db from '../../index.js';
import { decimalToNumber } from '../../variables.js';

import { employee, salary_increment, users } from '../schema.js';

const createdByUser = alias(users, 'created_by_user');

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const salaryIncrementPromise = db
		.insert(salary_increment)
		.values(req.body)
		.returning({ insertedUuid: salary_increment.uuid });

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
		.update(salary_increment)
		.set(req.body)
		.where(eq(salary_increment.uuid, req.params.uuid))
		.returning({ updatedUuid: salary_increment.uuid });

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
		.delete(salary_increment)
		.where(eq(salary_increment.uuid, req.params.uuid))
		.returning({ deletedUuid: salary_increment.uuid });

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
			uuid: salary_increment.uuid,
			employee_uuid: salary_increment.employee_uuid,
			employee_name: users.name,
			amount: decimalToNumber(salary_increment.amount),
			effective_date: salary_increment.effective_date,
			created_by: salary_increment.created_by,
			created_by_name: users.name,
			created_at: salary_increment.created_at,
			updated_at: salary_increment.updated_at,
			remarks: salary_increment.remarks,
		})
		.from(salary_increment)
		.leftJoin(employee, eq(salary_increment.employee_uuid, employee.uuid))
		.leftJoin(users, eq(employee.user_uuid, users.uuid))
		.leftJoin(
			createdByUser,
			eq(salary_increment.created_by, createdByUser.uuid)
		)
		.orderBy(desc(salary_increment.created_at));

	try {
		const data = await salaryIncrementPromise;
		const toast = {
			status: 200,
			type: 'select_all',
			message: `salary_increment list`,
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
			uuid: salary_increment.uuid,
			employee_uuid: salary_increment.employee_uuid,
			employee_name: users.name,
			amount: decimalToNumber(salary_increment.amount),
			effective_date: salary_increment.effective_date,
			created_by: salary_increment.created_by,
			created_by_name: createdByUser.name,
			created_at: salary_increment.created_at,
			updated_at: salary_increment.updated_at,
			remarks: salary_increment.remarks,
		})
		.from(salary_increment)
		.leftJoin(employee, eq(salary_increment.employee_uuid, employee.uuid))
		.leftJoin(users, eq(employee.user_uuid, users.uuid))
		.leftJoin(
			createdByUser,
			eq(salary_increment.created_by, createdByUser.uuid)
		)
		.where(eq(salary_increment.uuid, req.params.uuid));

	try {
		const data = await salaryIncrementPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: `salary_increment`,
		};
		return res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}
