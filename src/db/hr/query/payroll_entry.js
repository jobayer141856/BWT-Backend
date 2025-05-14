import { desc, eq } from 'drizzle-orm';
import { alias } from 'drizzle-orm/pg-core';
import { validateRequest } from '../../../util/index.js';
import db from '../../index.js';

import { payroll_increment, employee, users } from '../schema.js';

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
			employee_name: employee.name,
			type: payroll_increment.type,
			salary: payroll_increment.salary,
			month: payroll_increment.month,
			year: payroll_increment.year,
			created_by: payroll_increment.created_by,
			created_by_name: users.name,
			created_at: payroll_increment.created_at,
			updated_at: payroll_increment.updated_at,
			remarks: payroll_increment.remarks,
		})
		.from(payroll_increment)
		.leftJoin(employee, eq(payroll_increment.employee_uuid, employee.uuid))
		.leftJoin(users, eq(payroll_increment.created_by, users.uuid));

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
			uuid: payroll_increment.uuid,
			employee_uuid: payroll_increment.employee_uuid,
			employee_name: employee.name,
			type: payroll_increment.type,
			salary: payroll_increment.salary,
			month: payroll_increment.month,
			year: payroll_increment.year,
			created_by: payroll_increment.created_by,
			created_by_name: users.name,
			created_at: payroll_increment.created_at,
			updated_at: payroll_increment.updated_at,
			remarks: payroll_increment.remarks,
		})
		.from(payroll_increment)
		.where(eq(payroll_increment.uuid, req.params.uuid))
		.leftJoin(employee, eq(payroll_increment.employee_uuid, employee.uuid))
		.leftJoin(users, eq(payroll_increment.created_by, users.uuid));

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
