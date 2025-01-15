import { desc, eq } from 'drizzle-orm';
import { handleError, validateRequest } from '../../../util/index.js';
import db from '../../index.js';
import { decimalToNumber } from '../../variables.js';
import * as hrSchema from '../../hr/schema.js';

import {
	box,
	purchase_entry,
	stock,
	warehouse,
	room,
	floor,
	rack,
} from '../schema.js';

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const purchaseEntryPromise = db
		.insert(purchase_entry)
		.values(req.body)
		.returning({ insertedUuid: purchase_entry.uuid });

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
		.update(purchase_entry)
		.set(req.body)
		.where(eq(purchase_entry.uuid, req.params.uuid))
		.returning({ updatedUuid: purchase_entry.uuid });

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
		.delete(purchase_entry)
		.where(eq(purchase_entry.uuid, req.params.uuid))
		.returning({ deletedUuid: purchase_entry.uuid });

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
	if (!(await validateRequest(req, next))) return;

	const purchaseEntryPromise = db
		.select({
			uuid: purchase_entry.uuid,
			purchase_uuid: purchase_entry.purchase_uuid,
			stock_uuid: purchase_entry.stock_uuid,
			serial_no: purchase_entry.serial_no,
			quantity: decimalToNumber(purchase_entry.quantity),
			price_per_unit: decimalToNumber(purchase_entry.price_per_unit),
			discount: decimalToNumber(purchase_entry.discount),
			warehouse_uuid: purchase_entry.warehouse_uuid,
			warehouse_name: warehouse.name,
			room_uuid: purchase_entry.room_uuid,
			room_name: room.name,
			rack_uuid: purchase_entry.rack_uuid,
			rack_name: rack.name,
			floor_uuid: purchase_entry.floor_uuid,
			floor_name: floor.name,
			box_uuid: purchase_entry.box_uuid,
			box_name: box.name,
			created_by: purchase_entry.created_by,
			created_by_name: hrSchema.users.name,
			created_at: purchase_entry.created_at,
			updated_at: purchase_entry.updated_at,
			remarks: purchase_entry.remarks,
		})
		.from(purchase_entry)
		.leftJoin(
			hrSchema.users,
			eq(purchase_entry.created_by, hrSchema.users.uuid)
		)
		.leftJoin(warehouse, eq(purchase_entry.warehouse_uuid, warehouse.uuid))
		.leftJoin(room, eq(purchase_entry.room_uuid, room.uuid))
		.leftJoin(rack, eq(purchase_entry.rack_uuid, rack.uuid))
		.leftJoin(floor, eq(purchase_entry.floor_uuid, floor.uuid))
		.leftJoin(box, eq(purchase_entry.box_uuid, box.uuid))
		.orderBy(desc(purchase_entry.created_at));

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
	if (!(await validateRequest(req, next))) return;

	const purchaseEntryPromise = db
		.select({
			uuid: purchase_entry.uuid,
			purchase_uuid: purchase_entry.purchase_uuid,
			stock_uuid: purchase_entry.stock_uuid,
			serial_no: purchase_entry.serial_no,
			quantity: decimalToNumber(purchase_entry.quantity),
			price_per_unit: decimalToNumber(purchase_entry.price_per_unit),
			discount: decimalToNumber(purchase_entry.discount),
			warehouse_uuid: purchase_entry.warehouse_uuid,
			warehouse_name: warehouse.name,
			room_uuid: purchase_entry.room_uuid,
			room_name: room.name,
			rack_uuid: purchase_entry.rack_uuid,
			rack_name: rack.name,
			floor_uuid: purchase_entry.floor_uuid,
			floor_name: floor.name,
			box_uuid: purchase_entry.box_uuid,
			box_name: box.name,
			created_by: purchase_entry.created_by,
			created_by_name: hrSchema.users.name,
			created_at: purchase_entry.created_at,
			updated_at: purchase_entry.updated_at,
			remarks: purchase_entry.remarks,
		})
		.from(purchase_entry)
		.leftJoin(
			hrSchema.users,
			eq(purchase_entry.created_by, hrSchema.users.uuid)
		)
		.leftJoin(warehouse, eq(purchase_entry.warehouse_uuid, warehouse.uuid))
		.leftJoin(room, eq(purchase_entry.room_uuid, room.uuid))
		.leftJoin(rack, eq(purchase_entry.rack_uuid, rack.uuid))
		.leftJoin(floor, eq(purchase_entry.floor_uuid, floor.uuid))
		.leftJoin(box, eq(purchase_entry.box_uuid, box.uuid))
		.where(eq(purchase_entry.uuid, req.params.uuid));

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

export async function selectByPurchaseUuid(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const purchaseEntryPromise = db
		.select({
			uuid: purchase_entry.uuid,
			purchase_uuid: purchase_entry.purchase_uuid,
			stock_uuid: purchase_entry.stock_uuid,
			serial_no: purchase_entry.serial_no,
			quantity: decimalToNumber(purchase_entry.quantity),
			price_per_unit: decimalToNumber(purchase_entry.price_per_unit),
			discount: decimalToNumber(purchase_entry.discount),
			warehouse_uuid: purchase_entry.warehouse_uuid,
			warehouse_name: warehouse.name,
			room_uuid: purchase_entry.room_uuid,
			room_name: room.name,
			rack_uuid: purchase_entry.rack_uuid,
			rack_name: rack.name,
			floor_uuid: purchase_entry.floor_uuid,
			floor_name: floor.name,
			box_uuid: purchase_entry.box_uuid,
			box_name: box.name,
			created_by: purchase_entry.created_by,
			created_by_name: hrSchema.users.name,
			created_at: purchase_entry.created_at,
			updated_at: purchase_entry.updated_at,
			remarks: purchase_entry.remarks,
		})
		.from(purchase_entry)
		.leftJoin(
			hrSchema.users,
			eq(purchase_entry.created_by, hrSchema.users.uuid)
		)
		.leftJoin(warehouse, eq(purchase_entry.warehouse_uuid, warehouse.uuid))
		.leftJoin(room, eq(purchase_entry.room_uuid, room.uuid))
		.leftJoin(rack, eq(purchase_entry.rack_uuid, rack.uuid))
		.leftJoin(floor, eq(purchase_entry.floor_uuid, floor.uuid))
		.leftJoin(box, eq(purchase_entry.box_uuid, box.uuid))
		.where(eq(purchase_entry.purchase_uuid, req.params.purchase_uuid));

	try {
		const data = await purchaseEntryPromise;
		const toast = {
			status: 200,
			type: 'select by purchase uuid',
			message: 'purchase entries list',
		};
		return res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}
