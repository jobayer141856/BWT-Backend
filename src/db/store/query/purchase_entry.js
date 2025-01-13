import { desc, eq } from 'drizzle-orm';
import { handleError, validateRequest } from '../../../util/index.js';
import db from '../../index.js';
import * as hrSchema from '../../hr/schema.js';

import { purchaseEntry, stock } from '../schema.js';

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const purchaseEntryPromise = db
		.insert(purchaseEntry)
		.values(req.body)
		.returning({ insertedUuid: purchaseEntry.uuid });

	try {
		const data = await purchaseEntryPromise;
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

	const purchaseEntryPromise = db
		.update(purchaseEntry)
		.set(req.body)
		.where(eq(purchaseEntry.uuid, req.params.uuid))
		.returning({ updatedUuid: purchaseEntry.uuid });

	try {
		const data = await purchaseEntryPromise;
		const toast = {
			status: 201,
			type: 'update',
			message: `${data[0].updatedUuid} updated`,
		};

		return await res.status(201).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function remove(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const purchaseEntryPromise = db
		.delete(purchaseEntry)
		.where(eq(purchaseEntry.uuid, req.params.uuid))
		.returning({ deletedUuid: purchaseEntry.uuid });

	try {
		const data = await purchaseEntryPromise;
		const toast = {
			status: 201,
			type: 'delete',
			message: `${data[0].deletedUuid} deleted`,
		};

		return await res.status(201).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function selectAll(req, res, next) {
	const purchaseEntryPromise = db
		.select({
			uuid: purchaseEntry.uuid,
			purchase_uuid: purchaseEntry.purchase_uuid,
			stock_uuid: purchaseEntry.stock_uuid,
			serial_no: purchaseEntry.serial_no,
			quantity: purchaseEntry.quantity,
			price_per_unit: purchaseEntry.price_per_unit,
			discount: purchaseEntry.discount,
			created_by: purchaseEntry.created_by,
			created_by_name: hrSchema.users.name,
			created_at: purchaseEntry.created_at,
			updated_at: purchaseEntry.updated_at,
			remarks: purchaseEntry.remarks,
		})
		.from(purchaseEntry)
		.leftJoin(
			hrSchema.users,
			eq(purchaseEntry.created_by, hrSchema.users.uuid)
		)
		.orderBy(desc(purchaseEntry.created_at));

	try {
		const data = await purchaseEntryPromise;
		const toast = {
			status: 200,
			type: 'select all',
			message: 'purchase entries list',
		};
		return res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function select(req, res, next) {
	const purchaseEntryPromise = db
		.select({
			uuid: purchaseEntry.uuid,
			purchase_uuid: purchaseEntry.purchase_uuid,
			stock_uuid: purchaseEntry.stock_uuid,
			serial_no: purchaseEntry.serial_no,
			quantity: purchaseEntry.quantity,
			price_per_unit: purchaseEntry.price_per_unit,
			discount: purchaseEntry.discount,
			created_by: purchaseEntry.created_by,
			created_by_name: hrSchema.users.name,
			created_at: purchaseEntry.created_at,
			updated_at: purchaseEntry.updated_at,
			remarks: purchaseEntry.remarks,
		})
		.from(purchaseEntry)
		.leftJoin(
			hrSchema.users,
			eq(purchaseEntry.created_by, hrSchema.users.uuid)
		)
		.where(eq(purchaseEntry.uuid, req.params.uuid));

	try {
		const data = await purchaseEntryPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'purchase entry',
		};
		return res.status(200).json({ toast, data: data[0] });
	} catch (error) {
		next(error);
	}
}
