import { desc, eq } from 'drizzle-orm';
import { handleError, validateRequest } from '../../../util/index.js';
import db from '../../index.js';
import * as hrSchema from '../../hr/schema.js';
import { decimalToNumber } from '../../variables.js';

import { zone } from '../schema.js';

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const zonePromise = db
		.insert(zone)
		.values(req.body)
		.returning({ insertedName: zone.name });

	try {
		const data = await zonePromise;
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

	const zonePromise = db
		.update(zone)
		.set(req.body)
		.where(eq(zone.uuid, req.params.uuid))
		.returning({ updatedName: zone.name });

	try {
		const data = await zonePromise;
		const toast = {
			status: 201,
			type: 'update',
			message: `${data[0].updatedName} updated`,
		};

		return await res.status(201).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function remove(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const zonePromise = db
		.delete(zone)
		.where(eq(zone.uuid, req.params.uuid))
		.returning({ deletedName: zone.name });

	try {
		const data = await zonePromise;
		const toast = {
			status: 201,
			type: 'delete',
			message: `${data[0].deletedName} deleted`,
		};

		return await res.status(201).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function selectAll(req, res, next) {
	const zonePromise = db
		.select({
			id: zone.id,
			uuid: zone.uuid,
			name: zone.name,
			division: zone.division,
			latitude: zone.latitude,
			longitude: zone.longitude,
			created_by: zone.created_by,
			created_by_name: hrSchema.users.name,
			created_at: zone.created_at,
			updated_at: zone.updated_at,
			remarks: zone.remarks,
		})
		.from(zone)
		.leftJoin(hrSchema.users, eq(zone.created_by, hrSchema.users.uuid))
		.orderBy(desc(zone.created_at));

	try {
		const data = await zonePromise;
		const toast = {
			status: 200,
			type: 'select all',
			message: 'zone list',
		};

		return await res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function select(req, res, next) {
	const zonePromise = db
		.select({
			id: zone.id,
			uuid: zone.uuid,
			name: zone.name,
			division: zone.division,
			latitude: zone.latitude,
			longitude: zone.longitude,
			created_by: zone.created_by,
			created_by_name: hrSchema.users.name,
			created_at: zone.created_at,
			updated_at: zone.updated_at,
			remarks: zone.remarks,
		})
		.from(zone)
		.leftJoin(hrSchema.users, eq(zone.created_by, hrSchema.users.uuid))
		.where(eq(zone.uuid, req.params.uuid));

	try {
		const data = await zonePromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'zone',
		};

		return await res.status(200).json({ toast, data: data[0] });
	} catch (error) {
		next(error);
	}
}
