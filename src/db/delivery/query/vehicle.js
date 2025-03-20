import { desc, eq, sql, inArray } from 'drizzle-orm';
import { handleError, validateRequest } from '../../../util/index.js';
import db from '../../index.js';
import * as hrSchema from '../../hr/schema.js';
import { decimalToNumber } from '../../variables.js';
import { createApi } from '../../../util/api.js';
import { alias } from 'drizzle-orm/pg-core';

import { vehicle } from '../schema.js';

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	try {
		const data = await db
			.insert(vehicle)
			.values(req.body)
			.returning({ insertedName: vehicle.name });

		const toast = {
			status: 201,
			type: 'insert',
			message: `${data[0].insertedName} inserted`,
		};

		return await res.status(201).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function update(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	try {
		const data = await db
			.update(vehicle)
			.set(req.body)
			.where(vehicle.uuid.eq(req.params.uuid))
			.returning({ updatedName: vehicle.name });

		const toast = {
			status: 200,
			type: 'update',
			message: `${data[0].updatedName} updated`,
		};

		return await res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function remove(req, res, next) {
	try {
		const data = await db
			.delete(vehicle)
			.where(vehicle.uuid.eq(req.params.uuid))
			.returning({ deletedName: vehicle.name });

		const toast = {
			status: 200,
			type: 'delete',
			message: `${data[0].deletedName} deleted`,
		};

		return await res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function selectAll(req, res, next) {
	const vehiclePromise = db
		.select({
			uuid: vehicle.uuid,
			name: vehicle.name,
			no: vehicle.no,
			created_by: vehicle.created_by,
			created_by_name: hrSchema.users.name,
			created_at: vehicle.created_at,
			updated_at: vehicle.updated_at,
			remarks: vehicle.remarks,
		})
		.from(vehicle)
		.leftJoin(hrSchema.users, eq(vehicle.created_by, hrSchema.users.uuid))
		.orderBy(vehicle.created_at, desc);

	try {
		const data = await vehiclePromise;

		const toast = {
			status: 200,
			type: 'select all',
			message: 'Vehicle list',
		};

		return await res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function select(req, res, next) {
	const vehiclePromise = db
		.select({
			uuid: vehicle.uuid,
			name: vehicle.name,
			no: vehicle.no,
			created_by: vehicle.created_by,
			created_by_name: hrSchema.users.name,
			created_at: vehicle.created_at,
			updated_at: vehicle.updated_at,
			remarks: vehicle.remarks,
		})
		.from(vehicle)
		.leftJoin(hrSchema.users, eq(vehicle.created_by, hrSchema.users.uuid))
		.where(vehicle.uuid.eq(req.params.uuid));

	try {
		const data = await vehiclePromise;

		const toast = {
			status: 200,
			type: 'select one',
			message: 'Vehicle detail',
		};

		return await res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}
