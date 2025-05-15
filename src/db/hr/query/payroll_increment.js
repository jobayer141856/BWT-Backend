import { desc, eq } from 'drizzle-orm';
import { alias } from 'drizzle-orm/pg-core';
import { validateRequest } from '../../../util/index.js';
import db from '../../index.js';

import { employee, payroll_increment, users } from '../schema.js';

const createdByUser = alias(users, 'created_by_user');

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const payrollIncrementPromise = db
		.insert(payroll_increment)
		.values(req.body)
		.returning({ insertedUuid: payroll_increment.uuid });

	try {
		const data = await payrollIncrementPromise;
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

	const payrollIncrementPromise = db
		.update(payroll_increment)
		.set(req.body)
		.where(eq(payroll_increment.uuid, req.params.uuid))
		.returning({ updatedUuid: payroll_increment.uuid });

	try {
		const data = await payrollIncrementPromise;
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

	const payrollIncrementPromise = db
		.delete(payroll_increment)
		.where(eq(payroll_increment.uuid, req.params.uuid))
		.returning({ deletedUuid: payroll_increment.uuid });

	try {
		const data = await payrollIncrementPromise;
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

	const payrollIncrementPromise = db
		.select({
			uuid: payroll_increment.uuid,
			employee_uuid: payroll_increment.employee_uuid,
			employee_name: users.name,
			salary: payroll_increment.salary,
			effective_date: payroll_increment.effective_date,
			created_by: payroll_increment.created_by,
			created_by_name: users.name,
			created_at: payroll_increment.created_at,
			updated_at: payroll_increment.updated_at,
			remarks: payroll_increment.remarks,
		})
		.from(payroll_increment)
		.leftJoin(employee, eq(payroll_increment.employee_uuid, employee.uuid))
		.leftJoin(users, eq(employee.user_uuid, users.uuid))
		.leftJoin(
			createdByUser,
			eq(payroll_increment.created_by, createdByUser.uuid)
		)
		.orderBy(desc(payroll_increment.created_at));

	try {
		const data = await payrollIncrementPromise;
		const toast = {
			status: 200,
			type: 'select_all',
			message: `payroll_increment list`,
		};
		return res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function select(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const payrollIncrementPromise = db
		.select({
			uuid: payroll_increment.uuid,
			employee_uuid: payroll_increment.employee_uuid,
			employee_name: users.name,
			salary: payroll_increment.salary,
			effective_date: payroll_increment.effective_date,
			created_by: payroll_increment.created_by,
			created_by_name: createdByUser.name,
			created_at: payroll_increment.created_at,
			updated_at: payroll_increment.updated_at,
			remarks: payroll_increment.remarks,
		})
		.from(payroll_increment)
		.leftJoin(employee, eq(payroll_increment.employee_uuid, employee.uuid))
		.leftJoin(users, eq(employee.user_uuid, users.uuid))
		.leftJoin(
			createdByUser,
			eq(payroll_increment.created_by, createdByUser.uuid)
		)
		.where(eq(payroll_increment.uuid, req.params.uuid));

	try {
		const data = await payrollIncrementPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: `payroll_increment`,
		};
		return res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}
