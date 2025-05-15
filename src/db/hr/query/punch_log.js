import { desc, eq } from 'drizzle-orm';
import { alias } from 'drizzle-orm/pg-core';
import { validateRequest } from '../../../util/index.js';
import db from '../../index.js';
import {
	device_list,
	employee,
	punch_log,
	users
} from '../schema.js';

const createdByUser = alias(users, 'created_by_user');

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const punch_logPromise = db
		.insert(punch_log)
		.values(req.body)
		.returning({ insertedName: punch_log.name });

	try {
		const data = await punch_logPromise;
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

	const punch_logPromise = db
		.update(punch_log)
		.set(req.body)
		.where(eq(punch_log.uuid, req.params.uuid))
		.returning({ updatedName: punch_log.name });

	try {
		const data = await punch_logPromise;
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

	const punch_logPromise = db
		.delete(punch_log)
		.where(eq(punch_log.uuid, req.params.uuid))
		.returning({ deletedName: punch_log.name });

	try {
		const data = await punch_logPromise;
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
			uuid: punch_log.uuid,
			employee_uuid: punch_log.employee_uuid,
			employee_name: users.name,
			device_list_uuid: punch_log.device_list_uuid,
			device_list_name: device_list.name,
			punch_type: punch_log.punch_type,
			punch_time: punch_log.punch_time,
		})
		.from(punch_log)
		.leftJoin(device_list, eq(punch_log.device_list_uuid, device_list.uuid))
		.leftJoin(employee, eq(punch_log.employee_uuid, employee.uuid))
		.leftJoin(users, eq(employee.user_uuid, users.uuid))
		.orderBy(desc(punch_log.punch_time));

	try {
		const data = await resultPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'punch_log',
		};

		return res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function select(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const punch_logPromise = db
		.select({
			uuid: punch_log.uuid,
			employee_uuid: punch_log.employee_uuid,
			employee_name: users.name,
			device_list_uuid: punch_log.device_list_uuid,
			device_list_name: device_list.name,
			punch_type: punch_log.punch_type,
			punch_time: punch_log.punch_time,
		})
		.from(punch_log)
		.leftJoin(device_list, eq(punch_log.device_list_uuid, device_list.uuid))
		.leftJoin(employee, eq(punch_log.employee_uuid, employee.uuid))
		.leftJoin(users, eq(employee.user_uuid, users.uuid))
		.where(eq(punch_log.uuid, req.params.uuid));

	try {
		const data = await punch_logPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'punch_log',
		};

		return res.status(200).json({ toast, data: data[0] });
	} catch (error) {
		next(error);
	}
}
