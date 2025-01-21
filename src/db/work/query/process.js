import { desc, eq, sql } from 'drizzle-orm';
import { handleError, validateRequest } from '../../../util/index.js';
import db from '../../index.js';
import * as hrSchema from '../../hr/schema.js';
import { decimalToNumber } from '../../variables.js';

import { process, section } from '../schema.js';
import * as storeSchema from '../../store/schema.js';

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const processPromise = db
		.insert(process)
		.values(req.body)
		.returning({ insertedUuid: process.uuid });

	try {
		const data = await processPromise;
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

	const processPromise = db
		.update(process)
		.set(req.body)
		.where(eq(process.uuid, req.params.uuid))
		.returning({ updatedUuid: process.uuid });

	try {
		const data = await processPromise;
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

	const processPromise = db
		.delete(process)
		.where(eq(process.uuid, req.params.uuid))
		.returning({ deletedUuid: process.uuid });

	try {
		const data = await processPromise;
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
	const processPromise = db
		.select({
			id: process.id,
			process_id: sql`CONCAT('WP-', TO_CHAR(${process.created_at}, 'YY'), '-', TO_CHAR(${process.id}, 'FM0000'))`,
			uuid: process.uuid,
			section_uuid: process.section_uuid,
			section_name: section.name,
			diagnosis_uuid: process.diagnosis_uuid,
			engineer_uuid: process.engineer_uuid,
			problems_uuid: process.problems_uuid,
			problem_statement: process.problem_statement,
			status: process.status,
			status_update_date: process.status_update_date,
			is_transferred_for_qc: process.is_transferred_for_qc,
			is_ready_for_delivery: process.is_ready_for_delivery,
			warehouse_uuid: process.warehouse_uuid,
			warehouse_name: storeSchema.warehouse.name,
			rack_uuid: process.rack_uuid,
			rack_name: storeSchema.rack.name,
			floor_uuid: process.floor_uuid,
			floor_name: storeSchema.floor.name,
			box_uuid: process.box_uuid,
			box_name: storeSchema.box.name,
			process_uuid: process.uuid,
			created_by: process.created_by,
			created_by_name: hrSchema.users.name,
			created_at: process.created_at,
			updated_at: process.updated_at,
			remarks: process.remarks,
		})
		.from(process)
		.leftJoin(hrSchema.users, eq(process.created_by, hrSchema.users.uuid))
		.leftJoin(section, eq(process.section_uuid, section.uuid))
		.leftJoin(
			storeSchema.warehouse,
			eq(process.warehouse_uuid, storeSchema.warehouse.uuid)
		)
		.leftJoin(
			storeSchema.rack,
			eq(process.rack_uuid, storeSchema.rack.uuid)
		)
		.leftJoin(
			storeSchema.floor,
			eq(process.floor_uuid, storeSchema.floor.uuid)
		)
		.leftJoin(storeSchema.box, eq(process.box_uuid, storeSchema.box.uuid))

		.orderBy(desc(process.created_at));

	try {
		const data = await processPromise;
		const toast = {
			status: 200,
			type: 'select all',
			message: 'process list',
		};

		return await res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function select(req, res, next) {
	const processPromise = db
		.select({
			id: process.id,
			process_id: sql`CONCAT('WP-', TO_CHAR(${process.created_at}, 'YY'), '-', TO_CHAR(${process.id}, 'FM0000'))`,
			uuid: process.uuid,
			section_uuid: process.section_uuid,
			diagnosis_uuid: process.diagnosis_uuid,
			engineer_uuid: process.engineer_uuid,
			problems_uuid: process.problems_uuid,
			problem_statement: process.problem_statement,
			status: process.status,
			status_update_date: process.status_update_date,
			is_transferred_for_qc: process.is_transferred_for_qc,
			is_ready_for_delivery: process.is_ready_for_delivery,
			warehouse_uuid: process.warehouse_uuid,
			rack_uuid: process.rack_uuid,
			floor_uuid: process.floor_uuid,
			box_uuid: process.box_uuid,
			created_by: process.created_by,
			created_at: process.created_at,
			updated_at: process.updated_at,
			remarks: process.remarks,
		})
		.from(process)
		.leftJoin(hrSchema.users, eq(process.created_by, hrSchema.users.uuid))
		.leftJoin(section, eq(process.section_uuid, section.uuid))
		.leftJoin(
			storeSchema.warehouse,
			eq(process.warehouse_uuid, storeSchema.warehouse.uuid)
		)
		.leftJoin(
			storeSchema.rack,
			eq(process.rack_uuid, storeSchema.rack.uuid)
		)
		.leftJoin(
			storeSchema.floor,
			eq(process.floor_uuid, storeSchema.floor.uuid)
		)
		.leftJoin(storeSchema.box, eq(process.box_uuid, storeSchema.box.uuid))

		.where(eq(process.uuid, req.params.uuid));

	try {
		const data = await processPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'process',
		};

		return await res.status(200).json({ toast, data: data[0] });
	} catch (error) {
		next(error);
	}
}
