import { desc, eq } from 'drizzle-orm';
import { validateRequest } from '../../../util/index.js';
import db from '../../index.js';
import { designation, employee, employee_education, users } from '../schema.js';
import { alias } from 'drizzle-orm/gel-core';

const createdByUser = alias(users, 'created_by_user');

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const employee_educationPromise = db
		.insert(employee_education)
		.values(req.body)
		.returning({ insertedName: employee_education.employee_education });

	try {
		const data = await employee_educationPromise;
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

	const employee_educationPromise = db
		.update(employee_education)
		.set(req.body)
		.where(eq(employee_education.uuid, req.params.uuid))
		.returning({ updatedName: employee_education.employee_education });

	try {
		const data = await employee_educationPromise;
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

	const employee_educationPromise = db
		.delete(employee_education)
		.where(eq(employee_education.uuid, req.params.uuid))
		.returning({ deletedName: employee_education.employee_education });

	try {
		const data = await employee_educationPromise;
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
			uuid: employee_education.uuid,
			index: employee_education.index,
			employee_uuid: employee_education.employee_uuid,
			employee_name: users.name,
			degree_name: employee_education.degree_name,
			institute: employee_education.institute,
			board: employee_education.board,
			year_of_passing: employee_education.year_of_passing,
			grade: employee_education.grade,
			created_by: employee_education.created_by,
			created_by_name: createdByUser.name,
			created_at: employee_education.created_at,
			updated_at: employee_education.updated_at,
			remarks: employee_education.remarks,
		})
		.from(employee_education)
		.leftJoin(employee, eq(employee_education.employee_uuid, employee.uuid))
		.leftJoin(users, eq(employee.user_uuid, users.uuid))
		.leftJoin(
			createdByUser,
			eq(employee_education.created_by, createdByUser.uuid)
		)
		.orderBy(desc(employee_education.created_at));

	try {
		const data = await resultPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'Employee_education',
		};

		return res.status(200).json({ toast, data: data || [] });
	} catch (error) {
		next(error);
	}
}

export async function select(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const employee_educationPromise = db
		.select({
			uuid: employee_education.uuid,
			index: employee_education.index,
			employee_uuid: employee_education.employee_uuid,
			employee_name: users.name,
			degree_name: employee_education.degree_name,
			institute: employee_education.institute,
			board: employee_education.board,
			year_of_passing: employee_education.year_of_passing,
			grade: employee_education.grade,
			created_by: employee_education.created_by,
			created_by_name: createdByUser.name,
			created_at: employee_education.created_at,
			updated_at: employee_education.updated_at,
			remarks: employee_education.remarks,
		})
		.from(employee_education)
		.leftJoin(employee, eq(employee_education.employee_uuid, employee.uuid))
		.leftJoin(users, eq(employee.user_uuid, users.uuid))
		.leftJoin(
			createdByUser,
			eq(employee_education.created_by, createdByUser.uuid)
		)
		.where(eq(employee_education.uuid, req.params.uuid));

	try {
		const data = await employee_educationPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'Employee_education',
		};

		return res.status(200).json({ toast, data: data[0] });
	} catch (error) {
		next(error);
	}
}

export async function selectByEmployeeUuid(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const employee_educationPromise = db
		.select({
			uuid: employee_education.uuid,
			index: employee_education.index,
			employee_uuid: employee_education.employee_uuid,
			employee_name: users.name,
			degree_name: employee_education.degree_name,
			institute: employee_education.institute,
			board: employee_education.board,
			year_of_passing: employee_education.year_of_passing,
			grade: employee_education.grade,
			created_by: employee_education.created_by,
			created_by_name: createdByUser.name,
			created_at: employee_education.created_at,
			updated_at: employee_education.updated_at,
			remarks: employee_education.remarks,
		})
		.from(employee_education)
		.leftJoin(employee, eq(employee_education.employee_uuid, employee.uuid))
		.leftJoin(users, eq(employee.user_uuid, users.uuid))
		.leftJoin(
			createdByUser,
			eq(employee_education.created_by, createdByUser.uuid)
		)
		.where(eq(employee_education.employee_uuid, req.params.employee_uuid));

	try {
		const data = await employee_educationPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'Employee_education',
		};

		return res.status(200).json({ toast, data: data || [] });
	} catch (error) {
		next(error);
	}
}
