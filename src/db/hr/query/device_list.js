import { desc, eq } from 'drizzle-orm';
import { validateRequest } from '../../../util/index.js';
import db from '../../index.js';
import { device_list, users } from '../schema.js';

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const device_listPromise = db
		.insert(device_list)
		.values(req.body)
		.returning({ insertedName: device_list.name });

	try {
		const data = await device_listPromise;
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

	const device_listPromise = db
		.update(device_list)
		.set(req.body)
		.where(eq(device_list.uuid, req.params.uuid))
		.returning({ updatedName: device_list.name });

	try {
		const data = await device_listPromise;
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

	const device_listPromise = db
		.delete(device_list)
		.where(eq(device_list.uuid, req.params.uuid))
		.returning({ deletedName: device_list.name });

	try {
		const data = await device_listPromise;
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
			uuid: device_list.uuid,
			id: device_list.id,
			name: device_list.name,
			identifier: device_list.identifier,
			location: device_list.location,
			connection_status: device_list.connection_status,
			phone_number: device_list.phone_number,
			description: device_list.description,
			created_by: device_list.created_by,
			created_by_name: users.name,
			created_at: device_list.created_at,
			updated_at: device_list.updated_at,
			remarks: device_list.remarks,
		})
		.from(device_list)
		.leftJoin(users, eq(device_list.created_by, users.uuid))
		.orderBy(desc(device_list.created_at));

	try {
		const data = await resultPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'device_list',
		};

		return res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function select(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const device_listPromise = db
		.select({
			uuid: device_list.uuid,
			id: device_list.id,
			name: device_list.name,
			identifier: device_list.identifier,
			location: device_list.location,
			connection_status: device_list.connection_status,
			phone_number: device_list.phone_number,
			description: device_list.description,
			created_by: device_list.created_by,
			created_by_name: users.name,
			created_at: device_list.created_at,
			updated_at: device_list.updated_at,
			remarks: device_list.remarks,
		})
		.from(device_list)
		.leftJoin(users, eq(device_list.created_by, users.uuid))
		.where(eq(device_list.uuid, req.params.uuid));

	try {
		const data = await device_listPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'device_list',
		};

		return res.status(200).json({ toast, data: data[0] });
	} catch (error) {
		next(error);
	}
}
