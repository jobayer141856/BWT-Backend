import { desc, eq, sql } from 'drizzle-orm';
import { handleError, validateRequest } from '../../../util/index.js';
import db from '../../index.js';
import * as hrSchema from '../../hr/schema.js';
import { createApi } from '../../../util/api.js';
import { decimalToNumber } from '../../variables.js';
import { alias } from 'drizzle-orm/pg-core';

import {
	box,
	branch,
	internal_transfer,
	rack,
	stock,
	warehouse,
	room,
	floor,
} from '../schema.js';

const fromBranch = alias(branch, 'from_branch');
const toBranch = alias(branch, 'to_branch');

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const internalTransferPromise = db
		.insert(internal_transfer)
		.values(req.body)
		.returning({ insertedUuid: internal_transfer.uuid });

	try {
		const data = await internalTransferPromise;
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

	const internalTransferPromise = db
		.update(internal_transfer)
		.set(req.body)
		.where(eq(internal_transfer.uuid, req.params.uuid))
		.returning({ updatedUuid: internal_transfer.uuid });

	try {
		const data = await internalTransferPromise;
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

	const internalTransferPromise = db
		.delete(internal_transfer)
		.where(eq(internal_transfer.uuid, req.params.uuid))
		.returning({ deletedUuid: internal_transfer.uuid });

	try {
		const data = await internalTransferPromise;
		const toast = {
			status: 201,
			type: 'remove',
			message: `${data[0].deletedUuid} removed`,
		};

		return await res.status(201).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function selectAll(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const internalTransferPromise = db
		.select({
			uuid: internal_transfer.uuid,
			id: internal_transfer.id,
			internal_transfer_id: sql`CONCAT(
                                    'SIT',
                                        TO_CHAR(${internal_transfer.created_at}, 'YY'),
                                        ' - ',
                                        TO_CHAR(${internal_transfer.id}, 'FM0000')
                                    )`,
			stock_uuid: internal_transfer.stock_uuid,
			stock_id: sql`CONCAT(
                            'SS',
                            TO_CHAR(${stock.created_at}, 'YY'),
                            ' - ',
                            TO_CHAR(${stock.id}, 'FM0000')
                        )`,
			from_branch_uuid: internal_transfer.from_branch_uuid,
			from_branch_name: fromBranch.name,
			to_branch_uuid: internal_transfer.to_branch_uuid,
			to_branch_name: toBranch.name,
			warehouse_uuid: internal_transfer.warehouse_uuid,
			warehouse_name: warehouse.name,
			room_uuid: internal_transfer.room_uuid,
			room_name: room.name,
			rack_uuid: internal_transfer.rack_uuid,
			rack_name: rack.name,
			floor_uuid: internal_transfer.floor_uuid,
			floor_name: floor.name,
			box_uuid: internal_transfer.box_uuid,
			box_name: box.name,
			quantity: decimalToNumber(internal_transfer.quantity),
			created_by: internal_transfer.created_by,
			created_by_name: hrSchema.users.name,
			created_at: internal_transfer.created_at,
			updated_at: internal_transfer.updated_at,
			remarks: internal_transfer.remarks,
		})
		.from(internal_transfer)
		.leftJoin(
			fromBranch,
			eq(internal_transfer.from_branch_uuid, fromBranch.uuid)
		)
		.leftJoin(toBranch, eq(internal_transfer.to_branch_uuid, toBranch.uuid))
		.leftJoin(
			warehouse,
			eq(internal_transfer.warehouse_uuid, warehouse.uuid)
		)
		.leftJoin(room, eq(internal_transfer.room_uuid, room.uuid))
		.leftJoin(floor, eq(internal_transfer.floor_uuid, floor.uuid))
		.leftJoin(box, eq(internal_transfer.box_uuid, box.uuid))
		.leftJoin(stock, eq(internal_transfer.stock_uuid, stock.uuid))
		.leftJoin(
			hrSchema.users,
			eq(internal_transfer.created_by, hrSchema.users.uuid)
		)
		.leftJoin(rack, eq(internal_transfer.rack_uuid, rack.uuid))

		.orderBy(internal_transfer.created_at, desc);

	try {
		const data = await internalTransferPromise;

		const toast = {
			status: 200,
			type: 'select all',
			message: 'internal transfer list',
		};

		return res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function select(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const internalTransferPromise = db
		.select({
			uuid: internal_transfer.uuid,
			id: internal_transfer.id,
			internal_transfer_id: sql`CONCAT(
                'SIT',
                TO_CHAR(${internal_transfer.created_at}, 'YY'),
                ' - ',
                TO_CHAR(${internal_transfer.id}, 'FM0000')
            )`,
			stock_uuid: internal_transfer.stock_uuid,
			stock_id: sql`CONCAT(
                'SS',
                TO_CHAR(${stock.created_at}, 'YY'),
                ' - ',
                TO_CHAR(${stock.id}, 'FM0000')
            )`,
			from_branch_uuid: internal_transfer.from_branch_uuid,
			from_branch_name: fromBranch.name,
			to_branch_uuid: internal_transfer.to_branch_uuid,
			to_branch_name: toBranch.name,
			warehouse_uuid: internal_transfer.warehouse_uuid,
			warehouse_name: warehouse.name,
			room_uuid: internal_transfer.room_uuid,
			room_name: room.name,
			rack_uuid: internal_transfer.rack_uuid,
			rack_name: rack.name,
			floor_uuid: internal_transfer.floor_uuid,
			floor_name: floor.name,
			box_uuid: internal_transfer.box_uuid,
			box_name: box.name,
			quantity: decimalToNumber(internal_transfer.quantity),
			created_by: internal_transfer.created_by,
			created_by_name: hrSchema.users.name,
			created_at: internal_transfer.created_at,
			updated_at: internal_transfer.updated_at,
			remarks: internal_transfer.remarks,
		})
		.from(internal_transfer)
		.leftJoin(
			fromBranch,
			eq(internal_transfer.from_branch_uuid, fromBranch.uuid)
		)
		.leftJoin(toBranch, eq(internal_transfer.to_branch_uuid, toBranch.uuid))
		.leftJoin(
			warehouse,
			eq(internal_transfer.warehouse_uuid, warehouse.uuid)
		)
		.leftJoin(room, eq(internal_transfer.room_uuid, room.uuid))
		.leftJoin(floor, eq(internal_transfer.floor_uuid, floor.uuid))
		.leftJoin(box, eq(internal_transfer.box_uuid, box.uuid))
		.leftJoin(stock, eq(internal_transfer.stock_uuid, stock.uuid))
		.leftJoin(
			hrSchema.users,
			eq(internal_transfer.created_by, hrSchema.users.uuid)
		)
		.leftJoin(rack, eq(internal_transfer.rack_uuid, rack.uuid))
		.where(eq(internal_transfer.uuid, req.params.uuid));

	try {
		const data = await internalTransferPromise;

		const toast = {
			status: 200,
			type: 'select',
			message: 'internal transfer',
		};

		return res.status(200).json({ toast, data: data[0] });
	} catch (error) {
		next(error);
	}
}