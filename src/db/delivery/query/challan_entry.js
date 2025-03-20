import { desc, eq, sql, inArray } from 'drizzle-orm';
import { handleError, validateRequest } from '../../../util/index.js';
import db from '../../index.js';
import * as hrSchema from '../../hr/schema.js';
import { decimalToNumber } from '../../variables.js';
import { createApi } from '../../../util/api.js';
import { alias } from 'drizzle-orm/pg-core';

import * as workSchema from '../../work/schema.js';
import { challan_entry, challan } from '../schema.js';

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	try {
		const data = await db
			.insert(challan_entry)
			.values(req.body)
			.returning({ insertedUuid: challan_entry.uuid });

		const toast = {
			status: 201,
			type: 'insert',
			message: `${data[0].insertedUuid} inserted`,
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
			.update(challan_entry)
			.set(req.body)
			.where(challan_entry.uuid.eq(req.params.uuid))
			.returning({ updatedUuid: challan_entry.uuid });

		const toast = {
			status: 200,
			type: 'update',
			message: `${data[0].updatedUuid} updated`,
		};

		return await res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function remove(req, res, next) {
	try {
		const data = await db
			.delete(challan_entry)
			.where(challan_entry.uuid.eq(req.params.uuid))
			.returning({ deletedUuid: challan_entry.uuid });

		const toast = {
			status: 200,
			type: 'delete',
			message: `${data[0].deletedUuid} deleted`,
		};

		return await res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function selectAll(req, res, next) {
	const challanEntryPromise = db
		.select({
			uuid: challan_entry.uuid,
			challan_uuid: challan_entry.challan_uuid,
			challan_no: sql`CONCAT ('CH', TO_CHAR(${challan.created_at}::timestamp, 'YY'), '-', TO_CHAR(${challan.id}, 'FM0000'))`,
			order_uuid: challan_entry.order_uuid,
			order_no: sql`CONCAT ('WO', TO_CHAR(${workSchema.order.created_at}::timestamp, 'YY'), '-', TO_CHAR(${workSchema.order.id}, 'FM0000'))`,
			created_by: challan_entry.created_by,
			created_by_name: hrSchema.users.name,
			created_at: challan_entry.created_at,
			updated_at: challan_entry.updated_at,
			remarks: challan_entry.remarks,
		})
		.from(challan_entry)
		.leftJoin(
			hrSchema.users,
			eq(challan_entry.created_by, hrSchema.users.uuid)
		)
		.leftJoin(challan, eq(challan_entry.challan_uuid, challan.uuid))
		.leftJoin(
			workSchema.order,
			eq(challan_entry.order_uuid, workSchema.order.uuid)
		);

	try {
		const data = await challanEntryPromise;
		const toast = {
			status: 200,
			type: 'select all',
			message: 'Challan Entry list',
		};

		return await res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function select(req, res, next) {
	const challanEntryPromise = db
		.select({
			uuid: challan_entry.uuid,
			challan_uuid: challan_entry.challan_uuid,
			challan_no: sql`CONCAT ('CH', TO_CHAR(${challan.created_at}::timestamp, 'YY'), '-', TO_CHAR(${challan.id}, 'FM0000'))`,
			order_uuid: challan_entry.order_uuid,
			order_no: sql`CONCAT ('WO', TO_CHAR(${workSchema.order.created_at}::timestamp, 'YY'), '-', TO_CHAR(${workSchema.order.id}, 'FM0000'))`,
			created_by: challan_entry.created_by,
			created_by_name: hrSchema.users.name,
			created_at: challan_entry.created_at,
			updated_at: challan_entry.updated_at,
			remarks: challan_entry.remarks,
		})
		.from(challan_entry)
		.leftJoin(
			hrSchema.users,
			eq(challan_entry.created_by, hrSchema.users.uuid)
		)
		.leftJoin(challan, eq(challan_entry.challan_uuid, challan.uuid))
		.leftJoin(
			workSchema.order,
			eq(challan_entry.order_uuid, workSchema.order.uuid)
		)
		.where(challan_entry.uuid.eq(req.params.uuid));

	try {
		const data = await challanEntryPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'Challan Entry detail',
		};

		return await res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}
