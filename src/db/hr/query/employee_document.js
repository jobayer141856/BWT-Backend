import { desc, eq } from 'drizzle-orm';
import { validateRequest } from '../../../util/index.js';
import db from '../../index.js';
import { designation, employee, employee_document, users } from '../schema.js';
import { alias } from 'drizzle-orm/gel-core';

const createdByUser = alias(users, 'created_by_user');

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const employee_documentPromise = db
		.insert(employee_document)
		.values(req.body)
		.returning({ insertedName: employee_document.employee_document });

	try {
		const data = await employee_documentPromise;
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

	const employee_documentPromise = db
		.update(employee_document)
		.set(req.body)
		.where(eq(employee_document.uuid, req.params.uuid))
		.returning({ updatedName: employee_document.employee_document });

	try {
		const data = await employee_documentPromise;
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

	const employee_documentPromise = db
		.delete(employee_document)
		.where(eq(employee_document.uuid, req.params.uuid))
		.returning({ deletedName: employee_document.employee_document });

	try {
		const data = await employee_documentPromise;
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
			uuid: employee_document.uuid,
			index: employee_document.index,
			employee_uuid: employee_document.employee_uuid,
			employee_name: users.name,
			document_type: employee_document.document_type,
			description: employee_document.description,
			file: employee_document.file,
			created_by: employee_document.created_by,
			created_by_name: createdByUser.name,
			created_at: employee_document.created_at,
			updated_at: employee_document.updated_at,
			remarks: employee_document.remarks,
		})
		.from(employee_document)
		.leftJoin(employee, eq(employee_document.employee_uuid, employee.uuid))
		.leftJoin(users, eq(employee.user_uuid, users.uuid))
		.leftJoin(
			createdByUser,
			eq(employee_document.created_by, createdByUser.uuid)
		)
		.orderBy(desc(employee_document.created_at));

	try {
		const data = await resultPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'Employee_document',
		};

		return res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function select(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const employee_documentPromise = db
		.select({
			uuid: employee_document.uuid,
			index: employee_document.index,
			employee_uuid: employee_document.employee_uuid,
			employee_name: users.name,
			document_type: employee_document.document_type,
			description: employee_document.description,
			file: employee_document.file,
			created_by: employee_document.created_by,
			created_by_name: createdByUser.name,
			created_at: employee_document.created_at,
			updated_at: employee_document.updated_at,
			remarks: employee_document.remarks,
		})
		.from(employee_document)
		.leftJoin(employee, eq(employee_document.employee_uuid, employee.uuid))
		.leftJoin(users, eq(employee.user_uuid, users.uuid))
		.leftJoin(
			createdByUser,
			eq(employee_document.created_by, createdByUser.uuid)
		)
		.where(eq(employee_document.uuid, req.params.uuid));

	try {
		const data = await employee_documentPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'Employee_document',
		};

		return res.status(200).json({ toast, data: data[0] });
	} catch (error) {
		next(error);
	}
}

export async function selectByEmployeeUuid(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const employee_documentPromise = db
		.select({
			uuid: employee_document.uuid,
			index: employee_document.index,
			employee_uuid: employee_document.employee_uuid,
			employee_name: users.name,
			document_type: employee_document.document_type,
			description: employee_document.description,
			file: employee_document.file,
			created_by: employee_document.created_by,
			created_by_name: createdByUser.name,
			created_at: employee_document.created_at,
			updated_at: employee_document.updated_at,
			remarks: employee_document.remarks,
		})
		.from(employee_document)
		.leftJoin(employee, eq(employee_document.employee_uuid, employee.uuid))
		.leftJoin(users, eq(employee.user_uuid, users.uuid))
		.leftJoin(
			createdByUser,
			eq(employee_document.created_by, createdByUser.uuid)
		)
		.where(eq(employee_document.employee_uuid, req.params.employee_uuid));

	try {
		const data = await employee_documentPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'Employee_document',
		};

		return res.status(200).json({ toast, data: data[0] });
	} catch (error) {
		next(error);
	}
}
