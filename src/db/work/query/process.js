import { asc, desc, eq, inArray, is, or, sql } from 'drizzle-orm';
import { handleError, validateRequest } from '../../../util/index.js';
import db from '../../index.js';
import * as hrSchema from '../../hr/schema.js';
import { decimalToNumber } from '../../variables.js';
import { alias, index } from 'drizzle-orm/pg-core';
import {
	diagnosis,
	process,
	section,
	order,
	problem,
	info,
} from '../schema.js';
import * as storeSchema from '../../store/schema.js';

const engineer_user = alias(hrSchema.users, 'engineer_user');
const user = alias(hrSchema.users, 'user');

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;
	// const {
	// 	uuid,
	// 	index,
	// 	section_uuid,
	// 	diagnosis_uuid,
	// 	order_uuid,
	// 	process_uuid,
	// 	created_by,
	// 	created_at,
	// } = req.body;
	// let diagnosisData = null;
	// let orderData = null;

	// if (diagnosis_uuid !== null && diagnosis_uuid !== undefined) {
	// 	const diagnosisPromise = db
	// 		.select({
	// 			diagnosis_uuid: diagnosis.uuid,
	// 			order_uuid: diagnosis.order_uuid,
	// 			problems_uuid: diagnosis.problems_uuid,
	// 			problem_statement: diagnosis.problem_statement,
	// 			warehouse_uuid: order.warehouse_uuid,
	// 			rack_uuid: order.rack_uuid,
	// 			floor_uuid: order.floor_uuid,
	// 			box_uuid: order.box_uuid,
	// 		})
	// 		.from(diagnosis)
	// 		.leftJoin(order, eq(diagnosis.order_uuid, order.uuid))
	// 		.where(eq(diagnosis.uuid, diagnosis_uuid));

	// 	diagnosisData = await diagnosisPromise;
	// }

	// if (order_uuid !== null && order_uuid !== undefined) {
	// 	const orderPromise = db
	// 		.select({
	// 			order_uuid: order.uuid,
	// 			diagnosis_uuid: diagnosis.uuid,
	// 			warehouse_uuid: order.warehouse_uuid,
	// 			rack_uuid: order.rack_uuid,
	// 			floor_uuid: order.floor_uuid,
	// 			box_uuid: order.box_uuid,
	// 			problems_uuid: diagnosis.problems_uuid,
	// 			problem_statement: diagnosis.problem_statement,
	// 		})
	// 		.from(order)
	// 		.leftJoin(diagnosis, eq(order.uuid, diagnosis.order_uuid))
	// 		.where(eq(order.uuid, order_uuid));

	// 	orderData = await orderPromise;
	// }

	// const sourceData = diagnosisData
	// 	? diagnosisData[0]
	// 	: orderData
	// 		? orderData[0]
	// 		: {};

	// const processData = {
	// 	uuid: uuid,
	// 	index: index,
	// 	section_uuid: section_uuid,
	// 	diagnosis_uuid: diagnosis_uuid || sourceData.diagnosis_uuid,
	// 	engineer_uuid: null,
	// 	problems_uuid: sourceData.problems_uuid,
	// 	problem_statement: sourceData.problem_statement,
	// 	status: false,
	// 	status_update_date: null,
	// 	is_transferred_for_qc: false,
	// 	is_ready_for_delivery: false,
	// 	warehouse_uuid: sourceData.warehouse_uuid,
	// 	rack_uuid: sourceData.rack_uuid,
	// 	floor_uuid: sourceData.floor_uuid,
	// 	box_uuid: sourceData.box_uuid,
	// 	process_uuid: process_uuid,
	// 	created_by: created_by,
	// 	created_at: created_at,
	// 	updated_at: null,
	// 	remarks: null,
	// };

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
	try {
		const { order_uuid, entry } = req.query;

		//console.log('Received request with:', { order_uuid, diagnosis_uuid });

		let processPromise = db
			.select({
				id: process.id,
				process_id: sql`CONCAT('WP-', TO_CHAR(${process.created_at}, 'YY'), '-', TO_CHAR(${process.id}, 'FM0000'))`,
				uuid: process.uuid,
				section_uuid: process.section_uuid,
				section_name: section.name,
				order_uuid: process.order_uuid,
				diagnosis_uuid: process.diagnosis_uuid,
				engineer_uuid: process.engineer_uuid,
				engineer_name: engineer_user.name,
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
				index: process.index,
				branch_uuid: storeSchema.warehouse.branch_uuid,
				branch_name: storeSchema.branch.name,
			})
			.from(process)
			.leftJoin(
				hrSchema.users,
				eq(process.created_by, hrSchema.users.uuid)
			)
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
			.leftJoin(
				storeSchema.box,
				eq(process.box_uuid, storeSchema.box.uuid)
			)
			.leftJoin(
				engineer_user,
				eq(process.engineer_uuid, engineer_user.uuid)
			)
			.leftJoin(
				storeSchema.branch,
				eq(storeSchema.warehouse.branch_uuid, storeSchema.branch.uuid)
			)
			.orderBy(asc(process.index));

		if (order_uuid) {
			const diagnosisPromise = db
				.select({
					uuid: diagnosis.uuid,
				})
				.from(diagnosis)
				.where(eq(diagnosis.order_uuid, order_uuid));

			const diagnosisData = await diagnosisPromise;
			console.log('diagnosisData:', diagnosisData);

			if (diagnosisData.length > 0) {
				processPromise = processPromise.where(
					or(
						eq(process.diagnosis_uuid, diagnosisData[0].uuid),
						eq(process.order_uuid, order_uuid)
					)
				);
			} else {
				processPromise = processPromise.where(
					eq(process.order_uuid, order_uuid)
				);
			}
		}
		let resultIdData = null;
		if (order_uuid) {
			const resultIdPromise = db
				.select({
					order_id: sql`CONCAT('WO-', TO_CHAR(${order.created_at}, 'YY'), '-', TO_CHAR(${order.id}, 'FM0000'))`,
					user_uuid: info.user_uuid,
					user_name: user.name,
					info_id: sql`CONCAT('WI', TO_CHAR(${info.created_at}::timestamp, 'YY'), '-', TO_CHAR(${info.id}, 'FM0000'))`,
					diagnosis_id: sql`CASE WHEN ${diagnosis.created_at} IS NULL OR ${diagnosis.id} IS NULL THEN NULL ELSE CONCAT('WD-', TO_CHAR(${diagnosis.created_at}, 'YY'), '-', TO_CHAR(${diagnosis.id}, 'FM0000')) END`,
				})
				.from(order)
				.leftJoin(diagnosis, eq(order.uuid, diagnosis.order_uuid))
				.leftJoin(info, eq(order.info_uuid, info.uuid))
				.leftJoin(user, eq(info.user_uuid, user.uuid))
				.where(eq(order.uuid, order_uuid));

			resultIdData = await resultIdPromise;
			//console.log('resultIdData:', resultIdData);
		}

		const processData = await processPromise;

		const problems_uuid = processData
			.map((process) => process.problems_uuid)
			.flat();
		const problemPromise = await db
			.select({
				name: problem.name,
				uuid: problem.uuid,
			})
			.from(problem)
			.where(inArray(problem.uuid, problems_uuid));

		const problemsMap = problemPromise.reduce((acc, problem) => {
			acc[problem.uuid] = problem.name;
			return acc;
		}, {});

		processData.forEach((process) => {
			process.problems_name = process.problems_uuid.map(
				(uuid) => problemsMap[uuid]
			);
		});

		const formattedData = processData.map((item) => ({
			uuid: item.uuid,
			diagnosis_uuid: item.diagnosis_uuid,
			section_uuid: item.section_uuid,
			remarks: item.remarks,
		}));

		const toast = {
			status: 200,
			type: 'select all',
			message: 'Process list',
		};

		const formattedDataWithId =
			resultIdData && resultIdData.length > 0
				? {
						...resultIdData[0],
						entry: formattedData,
					}
				: {
						entry: formattedData,
					};

		let responseData = entry ? formattedDataWithId : processData;

		return res.status(200).json({
			toast,
			data: responseData,
		});
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
			engineer_name: engineer_user.name,
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
			created_by_name: hrSchema.users.name,
			created_at: process.created_at,
			updated_at: process.updated_at,
			remarks: process.remarks,
			index: process.index,
			branch_uuid: storeSchema.warehouse.branch_uuid,
			branch_name: storeSchema.branch.name,
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
		.leftJoin(engineer_user, eq(process.engineer_uuid, engineer_user.uuid))
		.leftJoin(
			storeSchema.branch,
			eq(storeSchema.warehouse.branch_uuid, storeSchema.branch.uuid)
		)
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
