import { desc, eq, sql, inArray } from 'drizzle-orm';
import { handleError, validateRequest } from '../../../util/index.js';
import db from '../../index.js';
import * as hrSchema from '../../hr/schema.js';
import { decimalToNumber } from '../../variables.js';
import { createApi } from '../../../util/api.js';
import { alias, serial } from 'drizzle-orm/pg-core';

import * as workSchema from '../../work/schema.js';
import * as storeSchema from '../../store/schema.js';
import { challan_entry, challan } from '../schema.js';

const user = alias(hrSchema.users, 'user');

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
			.where(eq(challan_entry.uuid, req.params.uuid))
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
			.where(eq(challan_entry.uuid, req.params.uuid))
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
			challan_id: sql`CONCAT ('CH', TO_CHAR(${challan.created_at}::timestamp, 'YY'), '-', TO_CHAR(${challan.id}, 'FM0000'))`,
			order_uuid: challan_entry.order_uuid,
			order_id: sql`CONCAT ('WO', TO_CHAR(${workSchema.order.created_at}::timestamp, 'YY'), '-', TO_CHAR(${workSchema.order.id}, 'FM0000'))`,
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
			challan_id: sql`CONCAT ('CH', TO_CHAR(${challan.created_at}::timestamp, 'YY'), '-', TO_CHAR(${challan.id}, 'FM0000'))`,
			order_uuid: challan_entry.order_uuid,
			order_id: sql`CONCAT ('WO', TO_CHAR(${workSchema.order.created_at}::timestamp, 'YY'), '-', TO_CHAR(${workSchema.order.id}, 'FM0000'))`,
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
		.where(eq(challan_entry.uuid, req.params.uuid));

	try {
		const data = await challanEntryPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'Challan Entry detail',
		};

		return await res.status(200).json({ toast, data: data[0] });
	} catch (error) {
		next(error);
	}
}

export async function selectChallanEntryByChallan(req, res, next) {
	const challanEntryPromise = db
		.select({
			uuid: challan_entry.uuid,
			challan_uuid: challan_entry.challan_uuid,
			challan_no: sql`CONCAT ('CH', TO_CHAR(${challan.created_at}::timestamp, 'YY'), '-', TO_CHAR(${challan.id}, 'FM0000'))`,
			order_uuid: challan_entry.order_uuid,
			order_id: sql`CONCAT ('WO', TO_CHAR(${workSchema.order.created_at}::timestamp, 'YY'), '-', TO_CHAR(${workSchema.order.id}, 'FM0000'))`,
			info_uuid: workSchema.order.info_uuid,
			user_uuid: workSchema.info.user_uuid,
			user_id: sql`CONCAT ('US', TO_CHAR(${user.created_at}::timestamp, 'YY'), '-', TO_CHAR(${user.id}, 'FM0000'))`,
			user_name: user.name,
			model_uuid: workSchema.order.model_uuid,
			model_name: storeSchema.model.name,
			brand_uuid: workSchema.order.brand_uuid,
			brand_name: storeSchema.brand.name,
			serial_no: workSchema.order.serial_no,
			problems_uuid: workSchema.order.problems_uuid,
			problem_statement: workSchema.order.problem_statement,
			accessories: workSchema.order.accessories,
			is_product_received: workSchema.info.is_product_received,
			received_date: workSchema.info.received_date,
			warehouse_uuid: workSchema.order.warehouse_uuid,
			warehouse_name: storeSchema.warehouse.name,
			rack_uuid: workSchema.order.rack_uuid,
			rack_name: storeSchema.rack.name,
			floor_uuid: workSchema.order.floor_uuid,
			floor_name: storeSchema.floor.name,
			box_uuid: workSchema.order.box_uuid,
			box_name: storeSchema.box.name,
			created_by: challan_entry.created_by,
			created_by_name: hrSchema.users.name,
			created_at: challan_entry.created_at,
			updated_at: challan_entry.updated_at,
			remarks: challan_entry.remarks,
			is_diagnosis_need: workSchema.order.is_diagnosis_need,
			quantity: workSchema.order.quantity,
			info_id: sql`CONCAT ('WI', TO_CHAR(${workSchema.info.created_at}::timestamp, 'YY'), '-', TO_CHAR(${workSchema.info.id}, 'FM0000'), '(', ${user.name}, ')')`,
			is_transferred_for_qc: workSchema.order.is_transferred_for_qc,
			is_ready_for_delivery: workSchema.order.is_ready_for_delivery,
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
		.leftJoin(
			storeSchema.model,
			eq(workSchema.order.model_uuid, storeSchema.model.uuid)
		)
		.leftJoin(
			storeSchema.brand,
			eq(workSchema.order.brand_uuid, storeSchema.brand.uuid)
		)
		.leftJoin(
			storeSchema.warehouse,
			eq(workSchema.order.warehouse_uuid, storeSchema.warehouse.uuid)
		)
		.leftJoin(
			storeSchema.rack,
			eq(workSchema.order.rack_uuid, storeSchema.rack.uuid)
		)
		.leftJoin(
			storeSchema.floor,
			eq(workSchema.order.floor_uuid, storeSchema.floor.uuid)
		)
		.leftJoin(
			storeSchema.box,
			eq(workSchema.order.box_uuid, storeSchema.box.uuid)
		)
		.leftJoin(
			workSchema.info,
			eq(workSchema.order.info_uuid, workSchema.info.uuid)
		)
		.leftJoin(user, eq(workSchema.info.user_uuid, user.uuid))
		.where(eq(challan_entry.challan_uuid, req.params.uuid));

	try {
		const data = await challanEntryPromise;

		const problems_uuid = data.map((item) => item.problems_uuid);
		const problems = await db
			.select({
				uuid: workSchema.problem.uuid,
				name: workSchema.problem.name,
			})
			.from(workSchema.problem)
			.where(inArray(workSchema.problem.uuid, problems_uuid));

		const problemsMap = problems.reduce((acc, item) => {
			acc[item.uuid] = item.name;
			return acc;
		}, {});

		data.forEach((item) => {
			if (Array.isArray(item.problems_uuid)) {
				item.problems_name = item.problems_uuid.map(
					(uuid) => problemsMap[uuid]
				);
			} else {
				item.problems_name = [];
			}
		});

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
