import { desc, eq } from 'drizzle-orm';
import { validateRequest } from '../../../util/index.js';
import db from '../../index.js';
import { designation, employee, employee_history, users } from '../schema.js';
import { alias } from 'drizzle-orm/pg-core';

const createdByUser = alias(users, 'created_by_user');

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const employee_historyPromise = db
		.insert(employee_history)
		.values(req.body)
		.returning({ insertedName: employee_history.uuid });

	try {
		const data = await employee_historyPromise;
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

	const employee_historyPromise = db
		.update(employee_history)
		.set(req.body)
		.where(eq(employee_history.uuid, req.params.uuid))
		.returning({ updatedName: employee_history.uuid });

	try {
		const data = await employee_historyPromise;
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

	const employee_historyPromise = db
		.delete(employee_history)
		.where(eq(employee_history.uuid, req.params.uuid))
		.returning({ deletedName: employee_history.uuid });

	try {
		const data = await employee_historyPromise;
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
			uuid: employee_history.uuid,
			index: employee_history.index,
			employee_uuid: employee_history.employee_uuid,
			employee_name: users.name,
			company_name: employee_history.company_name,
			company_business: employee_history.company_business,
			start_date: employee_history.start_date,
			end_date: employee_history.end_date,
			department: employee_history.department,
			designation: employee_history.designation,
			location: employee_history.location,
			responsibilities: employee_history.responsibilities,
			created_by: employee_history.created_by,
			created_by_name: createdByUser.name,
			created_at: employee_history.created_at,
			updated_at: employee_history.updated_at,
			remarks: employee_history.remarks,
		})
		.from(employee_history)
		.leftJoin(employee, eq(employee_history.employee_uuid, employee.uuid))
		.leftJoin(users, eq(employee.user_uuid, users.uuid))
		.leftJoin(
			createdByUser,
			eq(employee_history.created_by, createdByUser.uuid)
		)
		.orderBy(desc(employee_history.created_at));

	try {
		const data = await resultPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'Employee_history',
		};

		return res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function select(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const employee_historyPromise = db
		.select({
			uuid: employee_history.uuid,
			index: employee_history.index,
			employee_uuid: employee_history.employee_uuid,
			employee_name: users.name,
			company_name: employee_history.company_name,
			company_business: employee_history.company_business,
			start_date: employee_history.start_date,
			end_date: employee_history.end_date,
			department: employee_history.department,
			designation: employee_history.designation,
			location: employee_history.location,
			responsibilities: employee_history.responsibilities,
			created_by: employee_history.created_by,
			created_by_name: createdByUser.name,
			created_at: employee_history.created_at,
			updated_at: employee_history.updated_at,
			remarks: employee_history.remarks,
		})
		.from(employee_history)
		.leftJoin(employee, eq(employee_history.employee_uuid, employee.uuid))
		.leftJoin(users, eq(employee.user_uuid, users.uuid))
		.leftJoin(
			createdByUser,
			eq(employee_history.created_by, createdByUser.uuid)
		)
		.where(eq(employee_history.uuid, req.params.uuid));

	try {
		const data = await employee_historyPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'Employee_history',
		};

		return res.status(200).json({ toast, data: data[0] });
	} catch (error) {
		next(error);
	}
}

export async function selectByEmployeeUuid(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const employee_historyPromise = db
		.select({
			uuid: employee_history.uuid,
			index: employee_history.index,
			employee_uuid: employee_history.employee_uuid,
			employee_name: users.name,
			company_name: employee_history.company_name,
			company_business: employee_history.company_business,
			start_date: employee_history.start_date,
			end_date: employee_history.end_date,
			department: employee_history.department,
			designation: employee_history.designation,
			location: employee_history.location,
			responsibilities: employee_history.responsibilities,
			created_by: employee_history.created_by,
			created_by_name: createdByUser.name,
			created_at: employee_history.created_at,
			updated_at: employee_history.updated_at,
			remarks: employee_history.remarks,
		})
		.from(employee_history)
		.leftJoin(employee, eq(employee_history.employee_uuid, employee.uuid))
		.leftJoin(users, eq(employee.user_uuid, users.uuid))
		.leftJoin(
			createdByUser,
			eq(employee_history.created_by, createdByUser.uuid)
		)
		.where(eq(employee_history.employee_uuid, req.params.employee_uuid));

	try {
		const data = await employee_historyPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'Employee_history',
		};

		return res.status(200).json({ toast, data: data || [] });
	} catch (error) {
		next(error);
	}
}
