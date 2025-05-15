import { desc, eq } from 'drizzle-orm';
import { alias } from 'drizzle-orm/pg-core';
import { validateRequest } from '../../../util/index.js';
import db from '../../index.js';

import { employee, payroll_entry, users } from '../schema.js';

const createdByUser = alias(users, 'created_by_user');

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const payrollIncrementPromise = db
		.insert(payroll_entry)
		.values(req.body)
		.returning({ insertedUuid: payroll_entry.uuid });

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
		.update(payroll_entry)
		.set(req.body)
		.where(eq(payroll_entry.uuid, req.params.uuid))
		.returning({ updatedUuid: payroll_entry.uuid });

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
		.delete(payroll_entry)
		.where(eq(payroll_entry.uuid, req.params.uuid))
		.returning({ deletedUuid: payroll_entry.uuid });

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
			uuid: payroll_entry.uuid,
			employee_uuid: payroll_entry.employee_uuid,
			employee_name: users.name,
			type: payroll_entry.type,
			salary: payroll_entry.salary,
			month: payroll_entry.month,
			year: payroll_entry.year,
			created_by: payroll_entry.created_by,
			created_by_name: createdByUser.name,
			created_at: payroll_entry.created_at,
			updated_at: payroll_entry.updated_at,
			remarks: payroll_entry.remarks,
		})
		.from(payroll_entry)
		.leftJoin(employee, eq(payroll_entry.employee_uuid, employee.uuid))
		.leftJoin(users, eq(employee.user_uuid, users.uuid))
		.leftJoin(
			createdByUser,
			eq(payroll_entry.created_by, createdByUser.uuid)
		)
		.orderBy(desc(payroll_entry.created_at));

	try {
		const data = await payrollIncrementPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'Payroll_entry list',
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
			uuid: payroll_entry.uuid,
			employee_uuid: payroll_entry.employee_uuid,
			employee_name: users.name,
			type: payroll_entry.type,
			salary: payroll_entry.salary,
			month: payroll_entry.month,
			year: payroll_entry.year,
			created_by: payroll_entry.created_by,
			created_by_name: createdByUser.name,
			created_at: payroll_entry.created_at,
			updated_at: payroll_entry.updated_at,
			remarks: payroll_entry.remarks,
		})
		.from(payroll_entry)
		.leftJoin(employee, eq(payroll_entry.employee_uuid, employee.uuid))
		.leftJoin(users, eq(employee.user_uuid, users.uuid))
		.leftJoin(
			createdByUser,
			eq(payroll_entry.created_by, createdByUser.uuid)
		)
		.leftJoin(users, eq(payroll_entry.created_by, users.uuid));

	try {
		const data = await payrollIncrementPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'Payroll_entry list',
		};
		return res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}
