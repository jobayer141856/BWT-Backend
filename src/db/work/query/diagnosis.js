import { desc, eq, sql, inArray } from 'drizzle-orm';
import { handleError, validateRequest } from '../../../util/index.js';
import db from '../../index.js';
import * as hrSchema from '../../hr/schema.js';
import { decimalToNumber } from '../../variables.js';
import { createApi } from '../../../util/api.js';
import { diagnosis, order, problem, info } from '../schema.js';
import { box, branch, floor, rack, warehouse } from '../../store/schema.js';
import { alias } from 'drizzle-orm/pg-core';

const user = alias(hrSchema.users, 'user');

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

export async function selectAll(req, res, next) {
	const diagnosisPromise = db
		.select({
			uuid: diagnosis.uuid,
			id: diagnosis.id,
			diagnosis_id: sql`CONCAT('WD', TO_CHAR(${diagnosis.created_at}, 'YY'), '-', TO_CHAR(${diagnosis.id}, 'FM0000'))`,
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
			is_diagnosis_need: order.is_diagnosis_need,
			customer_problem_statement: diagnosis.customer_problem_statement,
			customer_remarks: diagnosis.customer_remarks,
			info_uuid: order.info_uuid,
			user_uuid: info.user_uuid,
			user_name: user.name,
			user_phone: user.phone,
			info_id: sql`CONCAT('WI', TO_CHAR(${info.created_at}::timestamp, 'YY'), '-', TO_CHAR(${info.id}, 'FM0000'))`,
			branch_uuid: warehouse.branch_uuid,
			branch_name: branch.name,
			order_problems_uuid: order.problems_uuid,
			order_problem_statement: order.problem_statement,
		})
		.from(diagnosis)
		.leftJoin(hrSchema.users, eq(diagnosis.created_by, hrSchema.users.uuid))
		.leftJoin(order, eq(diagnosis.order_uuid, order.uuid))
		.leftJoin(warehouse, eq(order.warehouse_uuid, warehouse.uuid))
		.leftJoin(rack, eq(order.rack_uuid, rack.uuid))
		.leftJoin(floor, eq(order.floor_uuid, floor.uuid))
		.leftJoin(box, eq(order.box_uuid, box.uuid))
		.leftJoin(info, eq(order.info_uuid, info.uuid))
		.leftJoin(branch, eq(warehouse.branch_uuid, branch.uuid))
		.leftJoin(user, eq(info.user_uuid, user.uuid))
		.where(eq(diagnosis.is_proceed_to_repair, false))
		.orderBy(desc(diagnosis.created_at));

	try {
		const data = await diagnosisPromise;

		// Gather all unique UUIDs from both diagnosis.problems_uuid and order_problems_uuid
		const diagnosisProblemsUUIDs = data
			.filter((d) => d.problems_uuid != null)
			.map((d) => d.problems_uuid)
			.flat();

		const orderProblemsUUIDs = data
			.filter((d) => d.order_problems_uuid != null)
			.map((d) => d.order_problems_uuid)
			.flat();

		const allProblemsUUIDs = Array.from(
			new Set([...diagnosisProblemsUUIDs, ...orderProblemsUUIDs])
		);

		const problems = await db
			.select({
				name: problem.name,
				uuid: problem.uuid,
			})
			.from(problem)
			.where(inArray(problem.uuid, allProblemsUUIDs));

		const problemsMap = problems.reduce((acc, problem) => {
			acc[problem.uuid] = problem.name;
			return acc;
		}, {});

		data.forEach((diagnosis) => {
			// diagnosis_problems_name
			if (
				diagnosis.problems_uuid &&
				Array.isArray(diagnosis.problems_uuid)
			) {
				diagnosis.diagnosis_problems_name = diagnosis.problems_uuid.map(
					(uuid) => problemsMap[uuid]
				);
			} else {
				diagnosis.diagnosis_problems_name = [];
			}

			// order_problems_name
			if (
				diagnosis.order_problems_uuid &&
				Array.isArray(diagnosis.order_problems_uuid)
			) {
				diagnosis.order_problems_name =
					diagnosis.order_problems_uuid.map(
						(uuid) => problemsMap[uuid]
					);
			} else {
				diagnosis.order_problems_name = [];
			}
		});

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
			is_diagnosis_need: order.is_diagnosis_need,
			customer_problem_statement: diagnosis.customer_problem_statement,
			customer_remarks: diagnosis.customer_remarks,
			info_uuid: order.info_uuid,
			user_uuid: info.user_uuid,
			user_name: user.name,
			user_phone: user.phone,
			info_id: sql`CONCAT('WI', TO_CHAR(${info.created_at}::timestamp, 'YY'), '-', TO_CHAR(${info.id}, 'FM0000'))`,
			branch_uuid: warehouse.branch_uuid,
			branch_name: branch.name,
			order_problems_uuid: order.problems_uuid,
			order_problem_statement: order.problem_statement,
		})
		.from(diagnosis)
		.leftJoin(hrSchema.users, eq(diagnosis.created_by, hrSchema.users.uuid))
		.leftJoin(order, eq(diagnosis.order_uuid, order.uuid))
		.leftJoin(warehouse, eq(order.warehouse_uuid, warehouse.uuid))
		.leftJoin(rack, eq(order.rack_uuid, rack.uuid))
		.leftJoin(floor, eq(order.floor_uuid, floor.uuid))
		.leftJoin(box, eq(order.box_uuid, box.uuid))
		.leftJoin(info, eq(order.info_uuid, info.uuid))
		.leftJoin(branch, eq(warehouse.branch_uuid, branch.uuid))
		.leftJoin(user, eq(info.user_uuid, user.uuid))
		.where(eq(diagnosis.uuid, req.params.uuid));

	try {
		const data = await diagnosisPromise;

		const diagnosisProblemsUUIDs = data
			.filter((d) => d.problems_uuid != null)
			.map((d) => d.problems_uuid)
			.flat();

		const orderProblemsUUIDs = data
			.filter((d) => d.order_problems_uuid != null)
			.map((d) => d.order_problems_uuid)
			.flat();

		const allProblemsUUIDs = Array.from(
			new Set([...diagnosisProblemsUUIDs, ...orderProblemsUUIDs])
		);

		const problems = await db
			.select({
				name: problem.name,
				uuid: problem.uuid,
			})
			.from(problem)
			.where(inArray(problem.uuid, allProblemsUUIDs));

		const problemsMap = problems.reduce((acc, problem) => {
			acc[problem.uuid] = problem.name;
			return acc;
		}, {});

		data.forEach((diagnosis) => {
			// diagnosis_problems_name
			if (
				diagnosis.problems_uuid &&
				Array.isArray(diagnosis.problems_uuid)
			) {
				diagnosis.diagnosis_problems_name = diagnosis.problems_uuid.map(
					(uuid) => problemsMap[uuid]
				);
			} else {
				diagnosis.diagnosis_problems_name = [];
			}

			// order_problems_name
			if (
				diagnosis.order_problems_uuid &&
				Array.isArray(diagnosis.order_problems_uuid)
			) {
				diagnosis.order_problems_name =
					diagnosis.order_problems_uuid.map(
						(uuid) => problemsMap[uuid]
					);
			} else {
				diagnosis.order_problems_name = [];
			}
		});

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

export async function selectByOrder(req, res, next) {
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
			is_diagnosis_need: order.is_diagnosis_need,
			customer_problem_statement: diagnosis.customer_problem_statement,
			customer_remarks: diagnosis.customer_remarks,
			info_uuid: order.info_uuid,
			user_uuid: info.user_uuid,
			user_name: user.name,
			user_phone: user.phone,
			info_id: sql`CONCAT('WI', TO_CHAR(${info.created_at}::timestamp, 'YY'), '-', TO_CHAR(${info.id}, 'FM0000'))`,
			branch_uuid: warehouse.branch_uuid,
			branch_name: branch.name,
			order_problems_uuid: order.problems_uuid,
			order_problem_statement: order.problem_statement,
		})
		.from(diagnosis)
		.leftJoin(hrSchema.users, eq(diagnosis.created_by, hrSchema.users.uuid))
		.leftJoin(order, eq(diagnosis.order_uuid, order.uuid))
		.leftJoin(warehouse, eq(order.warehouse_uuid, warehouse.uuid))
		.leftJoin(rack, eq(order.rack_uuid, rack.uuid))
		.leftJoin(floor, eq(order.floor_uuid, floor.uuid))
		.leftJoin(box, eq(order.box_uuid, box.uuid))
		.leftJoin(info, eq(order.info_uuid, info.uuid))
		.leftJoin(branch, eq(warehouse.branch_uuid, branch.uuid))
		.leftJoin(user, eq(info.user_uuid, user.uuid))
		.where(eq(diagnosis.order_uuid, req.params.order_uuid));

	try {
		const data = await diagnosisPromise;

		const diagnosisProblemsUUIDs = data
			.filter((d) => d.problems_uuid != null)
			.map((d) => d.problems_uuid)
			.flat();

		const orderProblemsUUIDs = data
			.filter((d) => d.order_problems_uuid != null)
			.map((d) => d.order_problems_uuid)
			.flat();

		const allProblemsUUIDs = Array.from(
			new Set([...diagnosisProblemsUUIDs, ...orderProblemsUUIDs])
		);

		const problems = await db
			.select({
				name: problem.name,
				uuid: problem.uuid,
			})
			.from(problem)
			.where(inArray(problem.uuid, allProblemsUUIDs));

		const problemsMap = problems.reduce((acc, problem) => {
			acc[problem.uuid] = problem.name;
			return acc;
		}, {});

		data.forEach((diagnosis) => {
			// diagnosis_problems_name
			if (
				diagnosis.problems_uuid &&
				Array.isArray(diagnosis.problems_uuid)
			) {
				diagnosis.diagnosis_problems_name = diagnosis.problems_uuid.map(
					(uuid) => problemsMap[uuid]
				);
			} else {
				diagnosis.diagnosis_problems_name = [];
			}

			// order_problems_name
			if (
				diagnosis.order_problems_uuid &&
				Array.isArray(diagnosis.order_problems_uuid)
			) {
				diagnosis.order_problems_name =
					diagnosis.order_problems_uuid.map(
						(uuid) => problemsMap[uuid]
					);
			} else {
				diagnosis.order_problems_name = [];
			}
		});

		const toast = {
			status: 200,
			type: 'select by order',
			message: 'diagnosis list',
		};

		return await res.status(200).json({ toast, data: data[0] });
	} catch (error) {
		next(error);
	}
}
