import { desc, eq, sql } from 'drizzle-orm';
import { handleError, validateRequest } from '../../../util/index.js';
import db from '../../index.js';
import * as hrSchema from '../../hr/schema.js';
import { decimalToNumber } from '../../variables.js';

import { diagnosis, order } from '../schema.js';
import { box, floor, rack, warehouse } from '../../store/schema.js';

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const diagnosisPromise = db
		.insert(diagnosis)
		.values(req.body)
		.returning({ insertedUuid: diagnosis.uuid });

	try {
		const data = await diagnosisPromise;
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

	const diagnosisPromise = db
		.update(diagnosis)
		.set(req.body)
		.where(eq(diagnosis.uuid, req.params.uuid))
		.returning({ updatedUuid: diagnosis.uuid });

	try {
		const data = await diagnosisPromise;
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

	const diagnosisPromise = db
		.delete(diagnosis)
		.where(eq(diagnosis.uuid, req.params.uuid))
		.returning({ deletedUuid: diagnosis.uuid });

	try {
		const data = await diagnosisPromise;
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

// Assuming you have a function to fetch problem_name by problem_uuid
async function getProblemNameByUuid(problem_uuid) {
	// Implement the logic to fetch problem_name using problem_uuid
	// This could be a database query or an API call
	// For example:
	const result = await db.query(
		'SELECT problem.name FROM work.problem WHERE problem_uuid = $1',
		[problem_uuid]
	);
	return result.rows[0].problem_name;
}

export async function selectAll(req, res, next) {
	const diagnosisPromise = db
		.select({
			uuid: diagnosis.uuid,
			id: diagnosis.id,
			diagnosis_id: sql`CONCAT('WD', TO_CHAR(${diagnosis.created_at}, 'YY'), TO_CHAR(${diagnosis.id}, 'FM0000'))`,
			order_uuid: diagnosis.order_uuid,
			order_id: sql`CONCAT('WO', TO_CHAR(${order.created_at}, 'YY'), '-', TO_CHAR(${order.id}, 'FM0000'))`,
			engineer_uuid: diagnosis.engineer_uuid,
			problems_uuid: diagnosis.problems_uuid,
			problem_statement: diagnosis.problem_statement,
			status: diagnosis.status,
			status_update_date: diagnosis.status_update_date,
			proposed_cost: decimalToNumber(diagnosis.proposed_cost),
			is_proceed_to_repair: diagnosis.is_proceed_to_repair,
			created_by: diagnosis.created_by,
			created_by_name: hrSchema.users.name,
			created_at: diagnosis.created_at,
			updated_at: diagnosis.updated_at,
			remarks: diagnosis.remarks,
			warehouse_uuid: order.warehouse_uuid,
			warehouse_name: warehouse.name,
			rack_uuid: order.rack_uuid,
			rack_name: rack.name,
			floor_uuid: order.floor_uuid,
			floor_name: floor.name,
			box_uuid: order.box_uuid,
			box_name: box.name,
		})
		.from(diagnosis)
		.leftJoin(hrSchema.users, eq(diagnosis.created_by, hrSchema.users.uuid))
		.leftJoin(order, eq(diagnosis.order_uuid, order.uuid))
		.leftJoin(warehouse, eq(order.warehouse_uuid, warehouse.uuid))
		.leftJoin(rack, eq(order.rack_uuid, rack.uuid))
		.leftJoin(floor, eq(order.floor_uuid, floor.uuid))
		.leftJoin(box, eq(order.box_uuid, box.uuid))
		.orderBy(desc(diagnosis.created_at));

	try {
		const data = await diagnosisPromise;

		// Ensure problems_uuid is an array or handle object
		let problems_uuid = data.problems_uuid;
		if (problems_uuid === null || problems_uuid === undefined) {
			problems_uuid = [];
		} else if (typeof problems_uuid === 'object') {
			problems_uuid = Object.keys(problems_uuid); // Convert object keys to array
		} else if (typeof problems_uuid === 'string') {
			problems_uuid = problems_uuid.split(','); // Assuming comma-separated string
		} else if (!Array.isArray(problems_uuid)) {
			throw new Error(
				'problems_uuid is not an array, object, or a comma-separated string'
			);
		}

		// Fetch problem names
		const problems_name = [];
		for (const problem_uuid of problems_uuid) {
			const problem_name = await getProblemNameByUuid(problem_uuid);
			problems_name.push(problem_name);
		}

		// Add problems_name to the diagnosis data
		data.problems_name = problems_name;

		const toast = {
			status: 200,
			type: 'select all',
			message: 'diagnosis list',
		};

		return await res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function select(req, res, next) {
	const diagnosisPromise = db
		.select({
			uuid: diagnosis.uuid,
			id: diagnosis.id,
			diagnosis_id: sql`CONCAT('WD', TO_CHAR(${diagnosis.created_at}, 'YY'), TO_CHAR(${diagnosis.id}, 'FM0000'))`,
			order_uuid: diagnosis.order_uuid,
			order_id: sql`CONCAT('WO', TO_CHAR(${order.created_at}, 'YY'), '-', TO_CHAR(${order.id}, 'FM0000'))`,
			engineer_uuid: diagnosis.engineer_uuid,
			problems_uuid: diagnosis.problems_uuid,
			problem_statement: diagnosis.problem_statement,
			status: diagnosis.status,
			status_update_date: diagnosis.status_update_date,
			proposed_cost: decimalToNumber(diagnosis.proposed_cost),
			is_proceed_to_repair: diagnosis.is_proceed_to_repair,
			created_by: diagnosis.created_by,
			created_by_name: hrSchema.users.name,
			created_at: diagnosis.created_at,
			updated_at: diagnosis.updated_at,
			remarks: diagnosis.remarks,
			warehouse_uuid: order.warehouse_uuid,
			warehouse_name: warehouse.name,
			rack_uuid: order.rack_uuid,
			rack_name: rack.name,
			floor_uuid: order.floor_uuid,
			floor_name: floor.name,
			box_uuid: order.box_uuid,
			box_name: box.name,
		})
		.from(diagnosis)
		.leftJoin(hrSchema.users, eq(diagnosis.created_by, hrSchema.users.uuid))
		.leftJoin(order, eq(diagnosis.order_uuid, order.uuid))
		.leftJoin(warehouse, eq(order.warehouse_uuid, warehouse.uuid))
		.leftJoin(rack, eq(order.rack_uuid, rack.uuid))
		.leftJoin(floor, eq(order.floor_uuid, floor.uuid))
		.leftJoin(box, eq(order.box_uuid, box.uuid))
		.where(eq(diagnosis.uuid, req.params.uuid));

	try {
		const data = await diagnosisPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'diagnosis detail',
		};

		return await res.status(200).json({ toast, data: data[0] });
	} catch (error) {
		next(error);
	}
}
