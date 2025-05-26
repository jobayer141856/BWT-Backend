import { and, desc, eq } from 'drizzle-orm';
import { alias } from 'drizzle-orm/pg-core';
import { validateRequest } from '../../../util/index.js';
import db from '../../index.js';
import {
	employee,
	manual_entry,
	users,
	department,
	designation,
	device_list,
} from '../schema.js';
import { constructSelectAllQuery } from '../../variables.js';

const createdByUser = alias(users, 'created_by_user');

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const manual_entryPromise = db
		.insert(manual_entry)
		.values(req.body)
		.returning({ insertedName: manual_entry.type });

	try {
		const data = await manual_entryPromise;
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

	const manual_entryPromise = db
		.update(manual_entry)
		.set(req.body)
		.where(eq(manual_entry.uuid, req.params.uuid))
		.returning({ updatedName: manual_entry.type });

	try {
		const data = await manual_entryPromise;
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

	const manual_entryPromise = db
		.delete(manual_entry)
		.where(eq(manual_entry.uuid, req.params.uuid))
		.returning({ deletedName: manual_entry.type });

	try {
		const data = await manual_entryPromise;
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
	const { type, approval } = req.query;

	const resultPromise = db
		.select({
			uuid: manual_entry.uuid,
			employee_uuid: manual_entry.employee_uuid,
			employee_name: employee.name,
			type: manual_entry.type,
			entry_time: manual_entry.entry_time,
			exit_time: manual_entry.exit_time,
			reason: manual_entry.reason,
			area: manual_entry.area,
			created_by: manual_entry.created_by,
			created_by_name: createdByUser.name,
			created_at: manual_entry.created_at,
			updated_at: manual_entry.updated_at,
			remarks: manual_entry.remarks,
			department_uuid: employee.department_uuid,
			department_name: department.department,
			designation_uuid: employee.designation_uuid,
			designation_name: designation.designation,
			device_list_uuid: manual_entry.device_list_uuid,
			device_list_name: device_list.name,
			approval: manual_entry.approval,
		})
		.from(manual_entry)
		.leftJoin(employee, eq(manual_entry.employee_uuid, employee.uuid))
		.leftJoin(department, eq(employee.department_uuid, department.uuid))
		.leftJoin(designation, eq(employee.designation_uuid, designation.uuid))
		.leftJoin(users, eq(employee.user_uuid, users.uuid))
		.leftJoin(
			createdByUser,
			eq(manual_entry.created_by, createdByUser.uuid)
		)
		.leftJoin(
			device_list,
			eq(manual_entry.device_list_uuid, device_list.uuid)
		)
		.orderBy(desc(manual_entry.created_at));

	if (type && approval) {
		resultPromise.where(
			and(
				eq(manual_entry.type, type),
				eq(manual_entry.approval, approval)
			)
		);
	} else if (type) {
		resultPromise.where(eq(manual_entry.type, type));
	} else if (approval) {
		resultPromise.where(eq(manual_entry.approval, approval));
	}
	// if (approval) {
	// 	resultPromise.where(eq(manual_entry.approval, approval));
	// }

	try {
		const data = await resultPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'manual_entry',
		};

		return res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function selectAllV2(req, res, next) {
	const { type, approval, is_pagination, field_name, field_value } =
		req.query;

	const resultPromise = db
		.select({
			uuid: manual_entry.uuid,
			employee_uuid: manual_entry.employee_uuid,
			employee_name: employee.name,
			type: manual_entry.type,
			entry_time: manual_entry.entry_time,
			exit_time: manual_entry.exit_time,
			reason: manual_entry.reason,
			area: manual_entry.area,
			created_by: manual_entry.created_by,
			created_by_name: createdByUser.name,
			created_at: manual_entry.created_at,
			updated_at: manual_entry.updated_at,
			remarks: manual_entry.remarks,
			department_uuid: employee.department_uuid,
			department_name: department.department,
			designation_uuid: employee.designation_uuid,
			designation_name: designation.designation,
			device_list_uuid: manual_entry.device_list_uuid,
			device_list_name: device_list.name,
			approval: manual_entry.approval,
		})
		.from(manual_entry)
		.leftJoin(employee, eq(manual_entry.employee_uuid, employee.uuid))
		.leftJoin(department, eq(employee.department_uuid, department.uuid))
		.leftJoin(designation, eq(employee.designation_uuid, designation.uuid))
		.leftJoin(users, eq(employee.user_uuid, users.uuid))
		.leftJoin(
			createdByUser,
			eq(manual_entry.created_by, createdByUser.uuid)
		)
		.leftJoin(
			device_list,
			eq(manual_entry.device_list_uuid, device_list.uuid)
		);

	if (type && approval) {
		resultPromise.where(
			and(
				eq(manual_entry.type, type),
				eq(manual_entry.approval, approval)
			)
		);
	} else if (type) {
		resultPromise.where(eq(manual_entry.type, type));
	} else if (approval) {
		resultPromise.where(eq(manual_entry.approval, approval));
	}

	resultPromise.orderBy(desc(manual_entry.created_at));

	let page = Number(req.query.page) || 1;
	let limit = Number(req.query.limit) || 10;

	try {
		const resultPromiseForCount = await resultPromise;

		const baseQuery =
			is_pagination === 'true'
				? constructSelectAllQuery(
						resultPromise,
						c.req.valid('query'),
						'created_at',
						[hrSchema.users.name.name, faculty.name.name],
						field_name,
						field_value
					)
				: resultPromise;

		const data = await baseQuery;

		const pagination =
			is_pagination === 'false'
				? null
				: {
						total_record: resultPromiseForCount.length,
						current_page: Number(page),
						total_page: Math.ceil(
							resultPromiseForCount.length / limit
						),
						next_page:
							page + 1 >
							Math.ceil(resultPromiseForCount.length / limit)
								? null
								: page + 1,
						prev_page: page - 1 <= 0 ? null : page - 1,
					};

		const response =
			is_pagination === 'false'
				? data
				: {
						data,
						pagination,
					};

		const toast = {
			status: 200,
			type: 'select',
			message: 'manual_entry',
		};

		return res.status(200).json({ toast, data: response });
	} catch (error) {
		next(error);
	}
}

export async function select(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const manual_entryPromise = db
		.select({
			uuid: manual_entry.uuid,
			employee_uuid: manual_entry.employee_uuid,
			employee_name: employee.name,
			type: manual_entry.type,
			entry_time: manual_entry.entry_time,
			exit_time: manual_entry.exit_time,
			reason: manual_entry.reason,
			area: manual_entry.area,
			created_by: manual_entry.created_by,
			created_by_name: createdByUser.name,
			created_at: manual_entry.created_at,
			updated_at: manual_entry.updated_at,
			remarks: manual_entry.remarks,
			department_uuid: employee.department_uuid,
			department_name: department.department,
			designation_uuid: employee.designation_uuid,
			designation_name: designation.designation,
			device_list_uuid: manual_entry.device_list_uuid,
			device_list_name: device_list.name,
			approval: manual_entry.approval,
		})
		.from(manual_entry)
		.leftJoin(employee, eq(manual_entry.employee_uuid, employee.uuid))
		.leftJoin(department, eq(employee.department_uuid, department.uuid))
		.leftJoin(designation, eq(employee.designation_uuid, designation.uuid))
		.leftJoin(users, eq(employee.user_uuid, users.uuid))
		.leftJoin(
			createdByUser,
			eq(manual_entry.created_by, createdByUser.uuid)
		)
		.leftJoin(
			device_list,
			eq(manual_entry.device_list_uuid, device_list.uuid)
		)
		.where(eq(manual_entry.uuid, req.params.uuid));

	try {
		const data = await manual_entryPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'manual_entry',
		};

		return res.status(200).json({ toast, data: data[0] });
	} catch (error) {
		next(error);
	}
}

export async function manualEntryByEmployee(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const { employee_uuid } = req.params;
	//console.log('employee_uuid', employee_uuid);

	const manual_entryPromise = db
		.select({
			uuid: manual_entry.uuid,
			employee_uuid: manual_entry.employee_uuid,
			employee_name: employee.name,
			type: manual_entry.type,
			entry_time: manual_entry.entry_time,
			exit_time: manual_entry.exit_time,
			reason: manual_entry.reason,
			area: manual_entry.area,
			created_by: manual_entry.created_by,
			created_by_name: createdByUser.name,
			created_at: manual_entry.created_at,
			updated_at: manual_entry.updated_at,
			remarks: manual_entry.remarks,
			department_uuid: employee.department_uuid,
			department_name: department.department,
			designation_uuid: employee.designation_uuid,
			designation_name: designation.designation,
			device_list_uuid: manual_entry.device_list_uuid,
			device_list_name: device_list.name,
			approval: manual_entry.approval,
		})
		.from(manual_entry)
		.leftJoin(employee, eq(manual_entry.employee_uuid, employee.uuid))
		.leftJoin(department, eq(employee.department_uuid, department.uuid))
		.leftJoin(designation, eq(employee.designation_uuid, designation.uuid))
		.leftJoin(users, eq(employee.user_uuid, users.uuid))
		.leftJoin(
			createdByUser,
			eq(manual_entry.created_by, createdByUser.uuid)
		)
		.leftJoin(
			device_list,
			eq(manual_entry.device_list_uuid, device_list.uuid)
		)
		.where(
			and(
				eq(manual_entry.employee_uuid, employee_uuid),
				eq(manual_entry.type, 'field_visit')
			)
		)
		.orderBy(desc(manual_entry.created_at))
		.limit(5);

	try {
		const data = await manual_entryPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'manual_entry',
		};

		return res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}
