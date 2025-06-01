import { desc, eq } from 'drizzle-orm';
import { validateRequest } from '../../../util/index.js';
import db from '../../index.js';
import { employee, employee_document, users } from '../schema.js';
import { alias } from 'drizzle-orm/gel-core';
import { insertFile, updateFile } from '@/util/upload_files.js';

const createdByUser = alias(users, 'created_by_user');

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const formData = req.body;
	const file = req.file;

	const filePath = file
		? await insertFile(file, 'public/employee-document')
		: null;

	const employee_documentPromise = db
		.insert(employee_document)
		.values({
			...formData,
			file: filePath,
		})
		.returning({ insertedName: employee_document.uuid });

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

	const formData = req.body;
	const file = req.file;

	if (file) {
		// If a new file is uploaded, we need to handle the file update
		const oldFilePath = db
			.select()
			.from(employee_document)
			.where(eq(employee_document.uuid, req.params.uuid))
			.returning(employee_document.file);
		const oldFile = await oldFilePath;

		if (oldFile && oldFile[0].file) {
			// If there is an old file, delete it
			const filePath = updateFile(
				file,
				oldFile[0].file,
				'public/employee-document'
			);
			formData.file = filePath;
		} else {
			// If no new file is uploaded, keep the old file path
			const filePath = insertFile(file, 'public/employee-document');
			formData.file = filePath;
		}
	}

	const employee_documentPromise = db
		.update(employee_document)
		.set(formData)
		.where(eq(employee_document.uuid, req.params.uuid))
		.returning({ updatedName: employee_document.uuid });

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

	// First, we need to check if the document exists and get its file path
	const oldFilePath = db
		.select()
		.from(employee_document)
		.where(eq(employee_document.uuid, req.params.uuid))
		.returning(employee_document.file);
	const oldFile = await oldFilePath;
	if (oldFile && oldFile[0].file) {
		// If there is an old file, delete it
		await deleteFile(oldFile[0].file);
	}

	const employee_documentPromise = db
		.delete(employee_document)
		.where(eq(employee_document.uuid, req.params.uuid))
		.returning({ deletedName: employee_document.uuid });

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
