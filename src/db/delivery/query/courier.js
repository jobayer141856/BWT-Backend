import { desc, eq, sql, inArray } from 'drizzle-orm';
import { handleError, validateRequest } from '../../../util/index.js';
import db from '../../index.js';
import * as hrSchema from '../../hr/schema.js';
import { decimalToNumber } from '../../variables.js';
import { createApi } from '../../../util/api.js';
import { alias } from 'drizzle-orm/pg-core';

import { courier } from '../schema.js';

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	try {
		const data = await db
			.insert(courier)
			.values(req.body)
			.returning({ insertedName: courier.name });

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
			.update(courier)
			.set(req.body)
			.where(courier.uuid.eq(req.params.uuid))
			.returning({ updatedName: courier.name });

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
			.delete(courier)
			.where(courier.uuid.eq(req.params.uuid))
			.returning({ deletedName: courier.name });

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
	const courierPromise = db
		.select({
			uuid: courier.uuid,
			name: courier.name,
			branch: courier.branch,
			created_at: courier.created_at,
			updated_at: courier.updated_at,
			remarks: courier.remarks,
			created_by: courier.created_by,
			created_by_name: hrSchema.users.name,
		})
		.from(courier)
		.leftJoin(hrSchema.users, eq(courier.created_by, hrSchema.users.uuid))
		.orderBy(courier.created_at, desc);

	try {
		const data = await courierPromise;
		const toast = {
			status: 200,
			type: 'select all',
			message: 'Courier list',
		};

		return await res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function select(req, res, next) {
	const courierPromise = db
		.select({
			uuid: courier.uuid,
			name: courier.name,
			branch: courier.branch,
			created_at: courier.created_at,
			updated_at: courier.updated_at,
			remarks: courier.remarks,
			created_by: courier.created_by,
			created_by_name: hrSchema.users.name,
		})
		.from(courier)
		.leftJoin(hrSchema.users, eq(courier.created_by, hrSchema.users.uuid))
		.where(courier.uuid.eq(req.params.uuid));

	try {
		const data = await courierPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'Courier',
		};

		return await res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}
