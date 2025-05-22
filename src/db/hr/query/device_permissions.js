import { and, desc, eq, ne, sql } from 'drizzle-orm';
import { alias } from 'drizzle-orm/pg-core';
import { validateRequest } from '../../../util/index.js';
import db from '../../index.js';
import { device_list, device_permission, employee, users } from '../schema.js';

const createdByUser = alias(users, 'created_by_user');

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const device_permissionPromise = db
		.insert(device_permission)
		.values(req.body)
		.returning({ insertedName: device_permission.uuid });

	try {
		const data = await device_permissionPromise;
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

	const device_permissionPromise = db
		.update(device_permission)
		.set(req.body)
		.where(eq(device_permission.uuid, req.params.uuid))
		.returning({ updatedName: device_permission.uuid });

	try {
		const data = await device_permissionPromise;
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

	const device_permissionPromise = db
		.delete(device_permission)
		.where(eq(device_permission.uuid, req.params.uuid))
		.returning({ deletedName: device_permission.uuid });

	try {
		const data = await device_permissionPromise;
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
	if (!(await validateRequest(req, next))) return;

	const { employee_uuid, device_list_uuid } = req.query;

	const resultPromise = db
		.select({
			uuid: device_permission.uuid,
			id: device_permission.id,
			device_list_uuid: device_permission.device_list_uuid,
			device_list_name: device_list.name,
			employee_uuid: device_permission.employee_uuid,
			employee_name: employee.name,
			is_temporary_access: device_permission.is_temporary_access,
			temporary_from_date: device_permission.temporary_from_date,
			temporary_to_date: device_permission.temporary_to_date,
			rfid_access: device_permission.rfid_access,
			fingerprint_access: device_permission.fingerprint_access,
			face_access: device_permission.face_access,
			created_by: device_permission.created_by,
			created_by_name: createdByUser.name,
			created_at: device_permission.created_at,
			updated_at: device_permission.updated_at,
			remarks: device_permission.remarks,
		})
		.from(device_permission)
		.leftJoin(
			device_list,
			eq(device_permission.device_list_uuid, device_list.uuid)
		)
		.leftJoin(employee, eq(device_permission.employee_uuid, employee.uuid))
		.leftJoin(users, eq(employee.user_uuid, users.uuid))
		.leftJoin(
			createdByUser,
			eq(device_permission.created_by, createdByUser.uuid)
		)
		.orderBy(desc(device_permission.created_at));

	if (employee_uuid) {
		resultPromise.where(eq(device_permission.employee_uuid, employee_uuid));
	}

	if (device_list_uuid) {
		resultPromise.where(
			eq(device_permission.device_list_uuid, device_list_uuid)
		);
	}

	try {
		const data = await resultPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'device_permission',
		};

		return res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function select(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const device_permissionPromise = db
		.select({
			uuid: device_permission.uuid,
			id: device_permission.id,
			device_list_uuid: device_permission.device_list_uuid,
			device_list_name: device_list.name,
			employee_uuid: device_permission.employee_uuid,
			employee_name: employee.name,
			is_temporary_access: device_permission.is_temporary_access,
			temporary_from_date: device_permission.temporary_from_date,
			temporary_to_date: device_permission.temporary_to_date,
			rfid_access: device_permission.rfid_access,
			fingerprint_access: device_permission.fingerprint_access,
			face_access: device_permission.face_access,
			created_by: device_permission.created_by,
			created_by_name: createdByUser.name,
			created_at: device_permission.created_at,
			updated_at: device_permission.updated_at,
			remarks: device_permission.remarks,
		})
		.from(device_permission)
		.leftJoin(
			device_list,
			eq(device_permission.device_list_uuid, device_list.uuid)
		)
		.leftJoin(employee, eq(device_permission.employee_uuid, employee.uuid))
		.leftJoin(users, eq(employee.user_uuid, users.uuid))
		.leftJoin(
			createdByUser,
			eq(device_permission.created_by, createdByUser.uuid)
		)
		.where(eq(device_permission.uuid, req.params.uuid));

	try {
		const data = await device_permissionPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'device_permission',
		};

		return res.status(200).json({ toast, data: data[0] });
	} catch (error) {
		next(error);
	}
}

export async function selectNotAssignedEmployeeForPermissionByDeviceListUuid(
	req,
	res,
	next
) {
	if (!(await validateRequest(req, next))) return;

	const { device_list_uuid } = req.params;

	const query = sql`
		SELECT 
			e.uuid as employee_uuid, 
			e.name as employee_name, 
			e.user_uuid
		FROM hr.employee e
		LEFT JOIN hr.device_permission dp
			ON dp.employee_uuid = e.uuid AND dp.device_list_uuid = ${device_list_uuid}
		WHERE dp.employee_uuid IS NULL;
	`;

	const device_permissionPromise = db.execute(query);

	try {
		const data = await device_permissionPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'Not Assigned Employee',
		};

		return res.status(200).json({ toast, data: data.rows });
	} catch (error) {
		next(error);
	}
}
