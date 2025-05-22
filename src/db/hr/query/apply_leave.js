import { desc, eq } from 'drizzle-orm';
import { alias } from 'drizzle-orm/pg-core';
import { validateRequest } from '../../../util/index.js';
import {
	deleteFile,
	insertFile,
	updateFile,
} from '../../../util/upload_files.js';
import db from '../../index.js';
import { apply_leave, employee, leave_category, users } from '../schema.js';

const createdByUser = alias(users, 'created_by_user');

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const formData = req.body;
	const file = req.file;

	// console.log('formData', formData);
	// console.log('file', file);

	const filePath = file ? await insertFile(file, 'public/apply-leave') : null;

	const values = {
		uuid: formData.uuid,
		employee_uuid: formData.employee_uuid || null,
		leave_category_uuid: formData.leave_category_uuid || null,
		year: formData.year,
		type: formData.type,
		from_date: formData.from_date,
		to_date: formData.to_date,
		reason: formData.reason,
		file: filePath,
		created_by: formData.created_by,
		created_at: formData.created_at,
		updated_at: formData.updated_at || null,
		remarks: formData.remarks || null,
		approved: formData.approved === 'true' || formData.approved === true,
	};

	const apply_leavePromise = db
		.insert(apply_leave)
		.values(values)
		.returning({ insertedName: apply_leave.type });

	try {
		const data = await apply_leavePromise;
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

	if (!formData || Object.keys(formData).length === 0) {
		return res.status(400).json({ error: 'No form data provided' });
	}

	let filePath = null;

	if (file && typeof file === 'object') {
		// Check if the file is being updated
		const existingData = await db
			.select({ file: apply_leave.file })
			.from(apply_leave)
			.where(eq(apply_leave.uuid, req.params.uuid))
			.limit(1);

		const existingFilePath = existingData[0]?.file;

		if (existingFilePath) {
			filePath = await updateFile(
				file,
				existingFilePath,
				'public/apply-leave'
			);
		} else {
			filePath = await insertFile(file, 'public/apply-leave');
		}
	}

	const values = {
		uuid: formData.uuid,
		employee_uuid: formData.employee_uuid || null,
		leave_category_uuid: formData.leave_category_uuid || null,
		year: formData.year,
		type: formData.type,
		from_date: formData.from_date,
		to_date: formData.to_date,
		reason: formData.reason,
		file: filePath,
		created_by: formData.created_by,
		created_at: formData.created_at,
		updated_at: formData.updated_at || null,
		remarks: formData.remarks || null,
		approved: formData.approved === 'true' || formData.approved === true,
	};

	const apply_leavePromise = db
		.update(apply_leave)
		.set(values)
		.where(eq(apply_leave.uuid, req.params.uuid))
		.returning({ updatedName: apply_leave.type });

	try {
		const data = await apply_leavePromise;
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

	const existingData = await db
		.select({ file: apply_leave.file })
		.from(apply_leave)
		.where(eq(apply_leave.uuid, req.params.uuid))
		.limit(1);
	const existingFilePath = existingData[0]?.file;
	if (existingFilePath) {
		// Delete the old file
		await deleteFile(existingFilePath);
	}

	const apply_leavePromise = db
		.delete(apply_leave)
		.where(eq(apply_leave.uuid, req.params.uuid))
		.returning({ deletedName: apply_leave.type });

	try {
		const data = await apply_leavePromise;
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
			uuid: apply_leave.uuid,
			employee_uuid: apply_leave.employee_uuid,
			employee_name: users.name,
			leave_category_uuid: apply_leave.leave_category_uuid,
			leave_category_name: leave_category.name,
			year: apply_leave.year,
			type: apply_leave.type,
			from_date: apply_leave.from_date,
			to_date: apply_leave.to_date,
			reason: apply_leave.reason,
			file: apply_leave.file,
			created_by: apply_leave.created_by,
			created_by_name: createdByUser.name,
			created_at: apply_leave.created_at,
			updated_at: apply_leave.updated_at,
			remarks: apply_leave.remarks,
			approved: apply_leave.approved,
		})
		.from(apply_leave)
		.leftJoin(employee, eq(apply_leave.employee_uuid, employee.uuid))
		.leftJoin(users, eq(employee.user_uuid, users.uuid))
		.leftJoin(
			leave_category,
			eq(apply_leave.leave_category_uuid, leave_category.uuid)
		)
		.leftJoin(createdByUser, eq(apply_leave.created_by, createdByUser.uuid))
		.orderBy(desc(apply_leave.created_at));

	try {
		const data = await resultPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'apply_leave',
		};

		return res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function select(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const apply_leavePromise = db
		.select({
			uuid: apply_leave.uuid,
			employee_uuid: apply_leave.employee_uuid,
			employee_name: users.name,
			leave_category_uuid: apply_leave.leave_category_uuid,
			leave_category_name: leave_category.name,
			year: apply_leave.year,
			type: apply_leave.type,
			from_date: apply_leave.from_date,
			to_date: apply_leave.to_date,
			reason: apply_leave.reason,
			file: apply_leave.file,
			created_by: apply_leave.created_by,
			created_by_name: createdByUser.name,
			created_at: apply_leave.created_at,
			updated_at: apply_leave.updated_at,
			remarks: apply_leave.remarks,
			approved: apply_leave.approved,
		})
		.from(apply_leave)
		.leftJoin(employee, eq(apply_leave.employee_uuid, employee.uuid))
		.leftJoin(users, eq(employee.user_uuid, users.uuid))
		.leftJoin(
			leave_category,
			eq(apply_leave.leave_category_uuid, leave_category.uuid)
		)
		.leftJoin(createdByUser, eq(apply_leave.created_by, createdByUser.uuid))
		.where(eq(apply_leave.uuid, req.params.uuid));

	try {
		const data = await apply_leavePromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'apply_leave',
		};

		return res.status(200).json({ toast, data: data[0] });
	} catch (error) {
		next(error);
	}
}
