import { desc, eq } from 'drizzle-orm';
import { alias } from 'drizzle-orm/pg-core';
import { validateRequest } from '../../../util/index.js';
import db from '../../index.js';

import {
	employee,
	payroll_occasional,
	special_holidays,
	users,
} from '../schema.js';

const createdByUser = alias(users, 'created_by_user');

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const payrollOccasionalPromise = db
		.insert(payroll_occasional)
		.values(req.body)
		.returning({ insertedUuid: payroll_occasional.uuid });

	try {
		const data = await payrollOccasionalPromise;
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

	const payrollOccasionalPromise = db
		.update(payroll_occasional)
		.set(req.body)
		.where(eq(payroll_occasional.uuid, req.params.uuid))
		.returning({ updatedUuid: payroll_occasional.uuid });

	try {
		const data = await payrollOccasionalPromise;
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

	const payrollOccasionalPromise = db
		.delete(payroll_occasional)
		.where(eq(payroll_occasional.uuid, req.params.uuid))
		.returning({ deletedUuid: payroll_occasional.uuid });

	try {
		const data = await payrollOccasionalPromise;
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

	const payrollOccasionalPromise = db
		.select({
			uuid: payroll_occasional.uuid,
			employee_uuid: payroll_occasional.employee_uuid,
			employee_name: users.name,
			month: payroll_occasional.month,
			year: payroll_occasional.year,
			special_holidays_uuid: payroll_occasional.special_holidays_uuid,
			special_holidays_name: special_holidays.name,
			amount: payroll_occasional.amount,
			created_by: payroll_occasional.created_by,
			created_by_name: users.name,
			created_at: payroll_occasional.created_at,
			updated_at: payroll_occasional.updated_at,
			remarks: payroll_occasional.remarks,
		})
		.from(payroll_occasional)
		.leftJoin(employee, eq(payroll_occasional.employee_uuid, employee.uuid))
		.leftJoin(users, eq(employee.user_uuid, users.uuid))
		.leftJoin(
			special_holidays,
			eq(payroll_occasional.special_holidays_uuid, special_holidays.uuid)
		)
		.leftJoin(
			createdByUser,
			eq(payroll_occasional.created_by, createdByUser.uuid)
		)
		.orderBy(desc(payroll_occasional.created_at));

	try {
		const data = await payrollOccasionalPromise;
		const toast = {
			status: 200,
			type: 'select_all',
			message: `payroll_occasional list`,
		};
		return res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function select(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const payrollOccasionalPromise = db
		.select({
			uuid: payroll_occasional.uuid,
			employee_uuid: payroll_occasional.employee_uuid,
			employee_name: users.name,
			month: payroll_occasional.month,
			year: payroll_occasional.year,
			special_holidays_uuid: payroll_occasional.special_holidays_uuid,
			special_holidays_name: special_holidays.name,
			amount: payroll_occasional.amount,
			created_by: payroll_occasional.created_by,
			created_by_name: users.name,
			created_at: payroll_occasional.created_at,
			updated_at: payroll_occasional.updated_at,
			remarks: payroll_occasional.remarks,
		})
		.from(payroll_occasional)
		.leftJoin(employee, eq(payroll_occasional.employee_uuid, employee.uuid))
		.leftJoin(users, eq(employee.user_uuid, users.uuid))
		.leftJoin(
			special_holidays,
			eq(payroll_occasional.special_holidays_uuid, special_holidays.uuid)
		)
		.leftJoin(
			createdByUser,
			eq(payroll_occasional.created_by, createdByUser.uuid)
		)
		.where(eq(payroll_occasional.uuid, req.params.uuid));

	try {
		const data = await payrollOccasionalPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: `payroll_occasional`,
		};

		return res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}
