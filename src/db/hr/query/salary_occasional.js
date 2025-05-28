import { desc, eq } from 'drizzle-orm';
import { alias } from 'drizzle-orm/pg-core';
import { validateRequest } from '../../../util/index.js';
import db from '../../index.js';
import { decimalToNumber } from '../../variables.js';

import {
	employee,
	salary_occasional,
	special_holidays,
	users,
} from '../schema.js';

const createdByUser = alias(users, 'created_by_user');

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const salaryOccasionalPromise = db
		.insert(salary_occasional)
		.values(req.body)
		.returning({ insertedUuid: salary_occasional.uuid });

	try {
		const data = await salaryOccasionalPromise;
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

	const salaryOccasionalPromise = db
		.update(salary_occasional)
		.set(req.body)
		.where(eq(salary_occasional.uuid, req.params.uuid))
		.returning({ updatedUuid: salary_occasional.uuid });

	try {
		const data = await salaryOccasionalPromise;
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

	const salaryOccasionalPromise = db
		.delete(salary_occasional)
		.where(eq(salary_occasional.uuid, req.params.uuid))
		.returning({ deletedUuid: salary_occasional.uuid });

	try {
		const data = await salaryOccasionalPromise;
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

	const salaryOccasionalPromise = db
		.select({
			uuid: salary_occasional.uuid,
			employee_uuid: salary_occasional.employee_uuid,
			employee_name: users.name,
			month: salary_occasional.month,
			year: salary_occasional.year,
			special_holidays_uuid: salary_occasional.special_holidays_uuid,
			special_holidays_name: special_holidays.name,
			amount: decimalToNumber(salary_occasional.amount),
			created_by: salary_occasional.created_by,
			created_by_name: users.name,
			created_at: salary_occasional.created_at,
			updated_at: salary_occasional.updated_at,
			remarks: salary_occasional.remarks,
		})
		.from(salary_occasional)
		.leftJoin(employee, eq(salary_occasional.employee_uuid, employee.uuid))
		.leftJoin(users, eq(employee.user_uuid, users.uuid))
		.leftJoin(
			special_holidays,
			eq(salary_occasional.special_holidays_uuid, special_holidays.uuid)
		)
		.leftJoin(
			createdByUser,
			eq(salary_occasional.created_by, createdByUser.uuid)
		)
		.orderBy(desc(salary_occasional.created_at));

	try {
		const data = await salaryOccasionalPromise;
		const toast = {
			status: 200,
			type: 'select_all',
			message: `salary_occasional list`,
		};
		return res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function select(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const salaryOccasionalPromise = db
		.select({
			uuid: salary_occasional.uuid,
			employee_uuid: salary_occasional.employee_uuid,
			employee_name: users.name,
			month: salary_occasional.month,
			year: salary_occasional.year,
			special_holidays_uuid: salary_occasional.special_holidays_uuid,
			special_holidays_name: special_holidays.name,
			amount: decimalToNumber(salary_occasional.amount),
			created_by: salary_occasional.created_by,
			created_by_name: users.name,
			created_at: salary_occasional.created_at,
			updated_at: salary_occasional.updated_at,
			remarks: salary_occasional.remarks,
		})
		.from(salary_occasional)
		.leftJoin(employee, eq(salary_occasional.employee_uuid, employee.uuid))
		.leftJoin(users, eq(employee.user_uuid, users.uuid))
		.leftJoin(
			special_holidays,
			eq(salary_occasional.special_holidays_uuid, special_holidays.uuid)
		)
		.leftJoin(
			createdByUser,
			eq(salary_occasional.created_by, createdByUser.uuid)
		)
		.where(eq(salary_occasional.uuid, req.params.uuid));

	try {
		const data = await salaryOccasionalPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: `salary_occasional`,
		};

		return res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}
