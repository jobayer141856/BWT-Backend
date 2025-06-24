import { desc, eq, sql, inArray, and, not, exists } from 'drizzle-orm';
import { handleError, validateRequest } from '../../../util/index.js';
import db from '../../index.js';
import * as hrSchema from '../../hr/schema.js';
import { decimalToNumber } from '../../variables.js';
import { createApi } from '../../../util/api.js';
import { alias } from 'drizzle-orm/pg-core';
import { order, problem, info, accessory, diagnosis } from '../schema.js';
import * as storeSchema from '../../store/schema.js';
import * as deliverySchema from '../../delivery/schema.js';
import { users } from '../../hr/schema.js';
import nanoid from '../../../lib/nanoid.js'; // Adjust the relative path

const user = alias(hrSchema.users, 'user');

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const { model_uuid, brand_uuid, created_by, created_at } = req.body;

	try {
		let finalModelUuid = model_uuid;

		if (model_uuid) {
			const model = await db
				.select()
				.from(storeSchema.model)
				.where(eq(storeSchema.model.uuid, model_uuid))
				.limit(1);

			if (model.length === 0) {
				const [newModel] = await db
					.insert(storeSchema.model)
					.values({
						uuid: nanoid(),
						brand_uuid: brand_uuid,
						name: model_uuid,
						created_by: created_by,
						created_at: created_at,
					})
					.returning({
						uuid: storeSchema.model.uuid,
					});

				finalModelUuid = newModel.uuid;
			}
		}

		const orderPromise = db
			.insert(order)
			.values({
				...req.body,
				model_uuid: finalModelUuid,
			})
			.returning({ insertedUuid: order.uuid });

		const data = await orderPromise;
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

	const { model_uuid, brand_uuid, created_by, updated_at } = req.body;

	try {
		let finalModelUuid = model_uuid;
		if (model_uuid) {
			const model = await db
				.select()
				.from(storeSchema.model)
				.where(eq(storeSchema.model.uuid, model_uuid))
				.limit(1);

			if (model.length === 0) {
				const [newModel] = await db
					.insert(storeSchema.model)
					.values({
						uuid: nanoid(),
						brand_uuid: brand_uuid,
						name: model_uuid,
						created_by: created_by,
						created_at: updated_at,
					})
					.returning({
						uuid: storeSchema.model.uuid,
					});
				finalModelUuid = newModel.uuid;
			}
		}
		const orderPromise = db
			.update(order)
			.set({
				...req.body,
				model_uuid: finalModelUuid,
			})
			.where(eq(order.uuid, req.params.uuid))
			.returning({ updatedUuid: order.uuid });

		const data = await orderPromise;
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

	const orderPromise = db
		.delete(order)
		.where(eq(order.uuid, req.params.uuid))
		.returning({ deletedUuid: order.uuid });

	try {
		const data = await orderPromise;
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
	const { qc, is_delivered, work_in_hand, customer_uuid, is_repair } =
		req.query;
	// console.log('customer_uuid', customer_uuid);
	const orderPromise = db
		.select({
			id: order.id,
			order_id: sql`CONCAT('WO', TO_CHAR(${order.created_at}, 'YY'), '-', TO_CHAR(${order.id}, 'FM0000'))`,
			uuid: order.uuid,
			info_uuid: order.info_uuid,
			user_uuid: info.user_uuid,
			user_id: sql`CONCAT('HU', TO_CHAR(${user.created_at}::timestamp, 'YY'), '-', TO_CHAR(${user.id}::integer, 'FM0000'))`,
			user_name: user.name,
			user_phone: user.phone,
			model_uuid: order.model_uuid,
			model_name: storeSchema.model.name,
			brand_uuid: order.brand_uuid,
			brand_name: storeSchema.brand.name,
			serial_no: order.serial_no,
			problems_uuid: order.problems_uuid,
			problem_statement: order.problem_statement,
			accessories: order.accessories,
			is_product_received: info.is_product_received,
			received_date: info.received_date,
			warehouse_uuid: order.warehouse_uuid,
			warehouse_name: storeSchema.warehouse.name,
			rack_uuid: order.rack_uuid,
			rack_name: storeSchema.rack.name,
			floor_uuid: order.floor_uuid,
			floor_name: storeSchema.floor.name,
			box_uuid: order.box_uuid,
			box_name: storeSchema.box.name,
			created_by: order.created_by,
			created_by_name: hrSchema.users.name,
			created_at: order.created_at,
			updated_at: order.updated_at,
			remarks: order.remarks,
			is_diagnosis_need: order.is_diagnosis_need,
			quantity: order.quantity,
			info_id: sql`CONCAT('WI', TO_CHAR(${info.created_at}::timestamp, 'YY'), '-', TO_CHAR(${info.id}, 'FM0000'))`,
			is_transferred_for_qc: order.is_transferred_for_qc,
			is_ready_for_delivery: order.is_ready_for_delivery,
			is_proceed_to_repair: order.is_proceed_to_repair,
			branch_uuid: storeSchema.warehouse.branch_uuid,
			branch_name: storeSchema.branch.name,
			repairing_problems_uuid: order.repairing_problems_uuid,
			qc_problems_uuid: order.qc_problems_uuid,
			delivery_problems_uuid: order.delivery_problems_uuid,
			repairing_problem_statement: order.repairing_problem_statement,
			qc_problem_statement: order.qc_problem_statement,
			delivery_problem_statement: order.delivery_problem_statement,
			ready_for_delivery_date: order.ready_for_delivery_date,
			diagnosis_problems_uuid: diagnosis.problems_uuid,
			diagnosis_problem_statement: diagnosis.problem_statement,
			bill_amount: decimalToNumber(order.bill_amount),
		})
		.from(order)
		.leftJoin(hrSchema.users, eq(order.created_by, hrSchema.users.uuid))
		.leftJoin(
			storeSchema.model,
			eq(order.model_uuid, storeSchema.model.uuid)
		)
		.leftJoin(
			storeSchema.brand,
			eq(order.brand_uuid, storeSchema.brand.uuid)
		)
		.leftJoin(
			storeSchema.warehouse,
			eq(order.warehouse_uuid, storeSchema.warehouse.uuid)
		)
		.leftJoin(storeSchema.rack, eq(order.rack_uuid, storeSchema.rack.uuid))
		.leftJoin(
			storeSchema.floor,
			eq(order.floor_uuid, storeSchema.floor.uuid)
		)
		.leftJoin(storeSchema.box, eq(order.box_uuid, storeSchema.box.uuid))
		.leftJoin(info, eq(order.info_uuid, info.uuid))
		.leftJoin(user, eq(info.user_uuid, user.uuid))
		.leftJoin(
			storeSchema.branch,
			eq(storeSchema.warehouse.branch_uuid, storeSchema.branch.uuid)
		)
		.leftJoin(diagnosis, eq(order.uuid, diagnosis.order_uuid))
		.orderBy(desc(order.created_at));

	const filters = [];

	if (qc === 'true') {
		filters.push(
			and(
				eq(order.is_transferred_for_qc, true),
				eq(order.is_ready_for_delivery, false)
			)
		);
	}

	if (is_delivered === 'true') {
		filters.push(eq(order.is_ready_for_delivery, true));
	}

	if (work_in_hand === 'true') {
		filters.push(
			and(
				eq(order.is_transferred_for_qc, false),
				eq(order.is_ready_for_delivery, false)
			)
		);
	}

	if (customer_uuid) {
		filters.push(
			and(
				eq(info.user_uuid, customer_uuid),
				eq(order.is_ready_for_delivery, true),
				not(
					exists(
						db
							.select()
							.from(deliverySchema.challan_entry)
							.where(
								eq(
									deliverySchema.challan_entry.order_uuid,
									order.uuid
								)
							)
					)
				)
			)
		);
	}
	if (is_repair === 'true') {
		filters.push(
			and(
				eq(order.is_proceed_to_repair, true),
				eq(order.is_transferred_for_qc, false),
				eq(order.is_ready_for_delivery, false)
			)
		);
	}

	if (filters.length > 0) {
		orderPromise.where(and(...filters));
	}

	try {
		const data = await orderPromise;

		// Gather all unique problem UUIDs from all relevant fields
		const orderProblemsUUIDs = data
			.map((order) => order.problems_uuid)
			.flat();
		const diagnosisProblemsUUIDs = data
			.map((order) => order.diagnosis_problems_uuid)
			.flat();
		const repairingProblemsUUIDs = data
			.map((order) => order.repairing_problems_uuid)
			.flat();
		const qcProblemsUUIDs = data
			.map((order) => order.qc_problems_uuid)
			.flat();
		const deliveryProblemsUUIDs = data
			.map((order) => order.delivery_problems_uuid)
			.flat();

		const allProblemsUUIDs = Array.from(
			new Set([
				...orderProblemsUUIDs,
				...diagnosisProblemsUUIDs,
				...repairingProblemsUUIDs,
				...qcProblemsUUIDs,
				...deliveryProblemsUUIDs,
			])
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

		const accessories_uuid = data.map((order) => order.accessories).flat();

		const accessories = await db
			.select({
				name: accessory.name,
				uuid: accessory.uuid,
			})
			.from(accessory)
			.where(inArray(accessory.uuid, accessories_uuid));

		const accessoriesMap = accessories.reduce((acc, accessory) => {
			acc[accessory.uuid] = accessory.name;
			return acc;
		}, {});

		data.forEach((order) => {
			order.order_problems_name = (order.problems_uuid || []).map(
				(uuid) => problemsMap[uuid]
			);
			order.diagnosis_problems_name = (
				order.diagnosis_problems_uuid || []
			).map((uuid) => problemsMap[uuid]);
			order.repairing_problems_name = (
				order.repairing_problems_uuid || []
			).map((uuid) => problemsMap[uuid]);
			order.qc_problems_name = (order.qc_problems_uuid || []).map(
				(uuid) => problemsMap[uuid]
			);
			order.delivery_problems_name = (
				order.delivery_problems_uuid || []
			).map((uuid) => problemsMap[uuid]);
			order.accessories_name = (order.accessories || []).map(
				(uuid) => accessoriesMap[uuid]
			);
		});

		if (is_repair === 'true') {
			const api = await createApi(req);

			const fetchData = async (endpoint) =>
				await api
					.get(`${endpoint}`)
					.then((response) => response.data)
					.catch((error) => {
						console.error(
							`Error fetching data from ${endpoint}:`,
							error.message
						);
						throw error;
					});

			// Fetch product transfer data for each order
			for (const order of data) {
				const productTransfer = await fetchData(
					`/store/product-transfer/by/${order.uuid}`
				);
				order.product_transfer = productTransfer?.data || [];
			}
		}

		const toast = {
			status: 200,
			type: 'select all',
			message: 'orders list',
		};
		return await res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function select(req, res, next) {
	const orderPromise = db
		.select({
			id: order.id,
			order_id: sql`CONCAT('WO', TO_CHAR(${order.created_at}, 'YY'), '-', TO_CHAR(${order.id}, 'FM0000'))`,
			uuid: order.uuid,
			info_uuid: order.info_uuid,
			user_uuid: info.user_uuid,
			user_id: sql`CONCAT('HU', TO_CHAR(${user.created_at}::timestamp, 'YY'), '-', TO_CHAR(${user.id}::integer, 'FM0000'))`,
			user_name: user.name,
			user_phone: user.phone,
			model_uuid: order.model_uuid,
			model_name: storeSchema.model.name,
			brand_uuid: order.brand_uuid,
			brand_name: storeSchema.brand.name,
			serial_no: order.serial_no,
			problems_uuid: order.problems_uuid,
			problem_statement: order.problem_statement,
			accessories: order.accessories,
			is_product_received: info.is_product_received,
			received_date: info.received_date,
			warehouse_uuid: order.warehouse_uuid,
			warehouse_name: storeSchema.warehouse.name,
			rack_uuid: order.rack_uuid,
			rack_name: storeSchema.rack.name,
			floor_uuid: order.floor_uuid,
			floor_name: storeSchema.floor.name,
			box_uuid: order.box_uuid,
			box_name: storeSchema.box.name,
			created_by: order.created_by,
			created_by_name: hrSchema.users.name,
			created_at: order.created_at,
			updated_at: order.updated_at,
			remarks: order.remarks,
			is_diagnosis_need: order.is_diagnosis_need,
			quantity: order.quantity,
			info_id: sql`CONCAT('WI', TO_CHAR(${info.created_at}::timestamp, 'YY'), '-', TO_CHAR(${info.id}, 'FM0000'))`,
			is_transferred_for_qc: order.is_transferred_for_qc,
			is_ready_for_delivery: order.is_ready_for_delivery,
			is_proceed_to_repair: order.is_proceed_to_repair,
			branch_uuid: storeSchema.warehouse.branch_uuid,
			branch_name: storeSchema.branch.name,
			is_delivery_complete: deliverySchema.challan.is_delivery_complete,
			repairing_problems_uuid: order.repairing_problems_uuid,
			qc_problems_uuid: order.qc_problems_uuid,
			delivery_problems_uuid: order.delivery_problems_uuid,
			repairing_problem_statement: order.repairing_problem_statement,
			qc_problem_statement: order.qc_problem_statement,
			delivery_problem_statement: order.delivery_problem_statement,
			ready_for_delivery_date: order.ready_for_delivery_date,
			diagnosis_problems_uuid: diagnosis.problems_uuid,
			diagnosis_problem_statement: diagnosis.problem_statement,
			bill_amount: decimalToNumber(order.bill_amount),
		})
		.from(order)
		.leftJoin(hrSchema.users, eq(order.created_by, hrSchema.users.uuid))
		.leftJoin(
			storeSchema.model,
			eq(order.model_uuid, storeSchema.model.uuid)
		)
		.leftJoin(
			storeSchema.brand,
			eq(order.brand_uuid, storeSchema.brand.uuid)
		)
		.leftJoin(
			storeSchema.warehouse,
			eq(order.warehouse_uuid, storeSchema.warehouse.uuid)
		)
		.leftJoin(storeSchema.rack, eq(order.rack_uuid, storeSchema.rack.uuid))
		.leftJoin(
			storeSchema.floor,
			eq(order.floor_uuid, storeSchema.floor.uuid)
		)
		.leftJoin(storeSchema.box, eq(order.box_uuid, storeSchema.box.uuid))
		.leftJoin(info, eq(order.info_uuid, info.uuid))
		.leftJoin(user, eq(info.user_uuid, user.uuid))
		.leftJoin(
			storeSchema.branch,
			eq(storeSchema.warehouse.branch_uuid, storeSchema.branch.uuid)
		)
		.leftJoin(
			deliverySchema.challan_entry,
			eq(order.uuid, deliverySchema.challan_entry.order_uuid)
		)
		.leftJoin(
			deliverySchema.challan,
			eq(
				deliverySchema.challan_entry.challan_uuid,
				deliverySchema.challan.uuid
			)
		)
		.leftJoin(diagnosis, eq(order.uuid, diagnosis.order_uuid))
		.where(eq(order.uuid, req.params.uuid));

	try {
		const data = await orderPromise;

		// Gather all unique problem UUIDs from all relevant fields
		const orderProblemsUUIDs = data
			.map((order) => order.problems_uuid)
			.flat();
		const diagnosisProblemsUUIDs = data
			.map((order) => order.diagnosis_problems_uuid || [])
			.flat();
		const repairingProblemsUUIDs = data
			.map((order) => order.repairing_problems_uuid || [])
			.flat();
		const qcProblemsUUIDs = data
			.map((order) => order.qc_problems_uuid || [])
			.flat();
		const deliveryProblemsUUIDs = data
			.map((order) => order.delivery_problems_uuid || [])
			.flat();

		const allProblemsUUIDs = Array.from(
			new Set([
				...orderProblemsUUIDs,
				...diagnosisProblemsUUIDs,
				...repairingProblemsUUIDs,
				...qcProblemsUUIDs,
				...deliveryProblemsUUIDs,
			])
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

		data.forEach((order) => {
			order.order_problems_name = (order.problems_uuid || []).map(
				(uuid) => problemsMap[uuid]
			);
			order.diagnosis_problems_name = (
				order.diagnosis_problems_uuid || []
			).map((uuid) => problemsMap[uuid]);
			order.repairing_problems_name = (
				order.repairing_problems_uuid || []
			).map((uuid) => problemsMap[uuid]);
			order.qc_problems_name = (order.qc_problems_uuid || []).map(
				(uuid) => problemsMap[uuid]
			);
			order.delivery_problems_name = (
				order.delivery_problems_uuid || []
			).map((uuid) => problemsMap[uuid]);
		});

		const api = await createApi(req);

		const fetchData = async (endpoint) =>
			await api
				.get(`${endpoint}`)
				.then((response) => response.data)
				.catch((error) => {
					console.error(
						`Error fetching data from ${endpoint}:`,
						error.message
					);
					throw error;
				});

		// Fetch product transfer data for each order
		for (const order of data) {
			const productTransfer = await fetchData(
				`/store/product-transfer/by/${order.uuid}`
			);
			order.product_transfer = productTransfer?.data || [];
		}

		const toast = {
			status: 200,
			type: 'select',
			message: 'order',
		};
		return await res.status(200).json({ toast, data: data[0] });
	} catch (error) {
		next(error);
	}
}

export async function selectDiagnosisDetailsByOrder(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const { order_uuid } = req.params;

	try {
		const api = await createApi(req);

		const fetchData = async (endpoint) =>
			await api
				.get(`${endpoint}`)
				.then((response) => response.data)
				.catch((error) => {
					console.error(
						`Error fetching data from ${endpoint}:`,
						error.message
					);
					throw error;
				});

		const [order, diagnosis, process, product_transfer] = await Promise.all(
			[
				fetchData(`/work/order/${order_uuid}`),
				fetchData(`/work/diagnosis-by-order/${order_uuid}`),
				fetchData(`/work/process?order_uuid=${order_uuid}`),
				fetchData(`/store/product-transfer/by/${order_uuid}`),
			]
		);

		const response = {
			...order?.data,
			diagnosis: diagnosis?.data || [],
			process: process?.data || [],
			product_transfer: product_transfer?.data || [],
		};

		const toast = {
			status: 200,
			type: 'select',
			message: 'diagnosis details by order',
		};

		return res.status(200).json({ toast, data: response });
	} catch (error) {
		if (error.response && error.response.status === 404) {
			return res
				.status(404)
				.json({ message: 'Resource not found', error: error.message });
		}
		next(error);
	}
}

export async function selectByInfo(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const { info_uuid } = req.params;

	const orderPromise = db
		.select({
			id: order.id,
			order_id: sql`CONCAT('WO', TO_CHAR(${order.created_at}, 'YY'), '-', TO_CHAR(${order.id}, 'FM0000'))`,
			uuid: order.uuid,
			info_uuid: order.info_uuid,
			user_uuid: info.user_uuid,
			user_id: sql`CONCAT('HU', TO_CHAR(${user.created_at}::timestamp, 'YY'), '-', TO_CHAR(${user.id}::integer, 'FM0000'))`,
			user_name: user.name,
			user_name: user.name,
			model_uuid: order.model_uuid,
			model_name: storeSchema.model.name,
			brand_uuid: order.brand_uuid,
			brand_name: storeSchema.brand.name,
			serial_no: order.serial_no,
			problems_uuid: order.problems_uuid,
			problem_statement: order.problem_statement,
			accessories: order.accessories,
			is_product_received: info.is_product_received,
			received_date: info.received_date,
			warehouse_uuid: order.warehouse_uuid,
			warehouse_name: storeSchema.warehouse.name,
			rack_uuid: order.rack_uuid,
			rack_name: storeSchema.rack.name,
			floor_uuid: order.floor_uuid,
			floor_name: storeSchema.floor.name,
			box_uuid: order.box_uuid,
			box_name: storeSchema.box.name,
			created_by: order.created_by,
			created_by_name: hrSchema.users.name,
			created_at: order.created_at,
			updated_at: order.updated_at,
			remarks: order.remarks,
			is_diagnosis_need: order.is_diagnosis_need,
			quantity: order.quantity,
			info_id: sql`CONCAT('WI', TO_CHAR(${info.created_at}::timestamp, 'YY'), '-', TO_CHAR(${info.id}, 'FM0000'))`,
			is_transferred_for_qc: order.is_transferred_for_qc,
			is_ready_for_delivery: order.is_ready_for_delivery,
			is_delivery_complete: sql`COALESCE(${deliverySchema.challan.is_delivery_complete}, false)`,
			is_proceed_to_repair: order.is_proceed_to_repair,
			branch_uuid: storeSchema.warehouse.branch_uuid,
			branch_name: storeSchema.branch.name,
			repairing_problems_uuid: order.repairing_problems_uuid,
			qc_problems_uuid: order.qc_problems_uuid,
			delivery_problems_uuid: order.delivery_problems_uuid,
			repairing_problem_statement: order.repairing_problem_statement,
			qc_problem_statement: order.qc_problem_statement,
			delivery_problem_statement: order.delivery_problem_statement,
			ready_for_delivery_date: order.ready_for_delivery_date,
			diagnosis_problems_uuid: diagnosis.problems_uuid,
			diagnosis_problem_statement: diagnosis.problem_statement,
			bill_amount: decimalToNumber(order.bill_amount),
		})
		.from(order)
		.leftJoin(hrSchema.users, eq(order.created_by, hrSchema.users.uuid))
		.leftJoin(
			storeSchema.model,
			eq(order.model_uuid, storeSchema.model.uuid)
		)
		.leftJoin(
			storeSchema.brand,
			eq(order.brand_uuid, storeSchema.brand.uuid)
		)
		.leftJoin(
			storeSchema.warehouse,
			eq(order.warehouse_uuid, storeSchema.warehouse.uuid)
		)
		.leftJoin(storeSchema.rack, eq(order.rack_uuid, storeSchema.rack.uuid))
		.leftJoin(
			storeSchema.floor,
			eq(order.floor_uuid, storeSchema.floor.uuid)
		)
		.leftJoin(storeSchema.box, eq(order.box_uuid, storeSchema.box.uuid))
		.leftJoin(info, eq(order.info_uuid, info.uuid))
		.leftJoin(user, eq(info.user_uuid, user.uuid))
		.leftJoin(
			deliverySchema.challan_entry,
			eq(order.uuid, deliverySchema.challan_entry.order_uuid)
		)
		.leftJoin(
			deliverySchema.challan,
			eq(
				deliverySchema.challan_entry.challan_uuid,
				deliverySchema.challan.uuid
			)
		)
		.leftJoin(
			storeSchema.branch,
			eq(storeSchema.warehouse.branch_uuid, storeSchema.branch.uuid)
		)
		.leftJoin(diagnosis, eq(order.uuid, diagnosis.order_uuid))
		.where(eq(order.info_uuid, info_uuid));

	try {
		const data = await orderPromise;

		// Gather all unique problem UUIDs from all relevant fields
		const orderProblemsUUIDs = data
			.map((order) => order.problems_uuid)
			.flat();
		const diagnosisProblemsUUIDs = data
			.map((order) => order.diagnosis_problems_uuid || [])
			.flat();
		const repairingProblemsUUIDs = data
			.map((order) => order.repairing_problems_uuid || [])
			.flat();
		const qcProblemsUUIDs = data
			.map((order) => order.qc_problems_uuid || [])
			.flat();
		const deliveryProblemsUUIDs = data
			.map((order) => order.delivery_problems_uuid || [])
			.flat();

		const allProblemsUUIDs = Array.from(
			new Set([
				...orderProblemsUUIDs,
				...diagnosisProblemsUUIDs,
				...repairingProblemsUUIDs,
				...qcProblemsUUIDs,
				...deliveryProblemsUUIDs,
			])
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

		data.forEach((order) => {
			order.order_problems_name = (order.problems_uuid || []).map(
				(uuid) => problemsMap[uuid]
			);
			order.diagnosis_problems_name = (
				order.diagnosis_problems_uuid || []
			).map((uuid) => problemsMap[uuid]);
			order.repairing_problems_name = (
				order.repairing_problems_uuid || []
			).map((uuid) => problemsMap[uuid]);
			order.qc_problems_name = (order.qc_problems_uuid || []).map(
				(uuid) => problemsMap[uuid]
			);
			order.delivery_problems_name = (
				order.delivery_problems_uuid || []
			).map((uuid) => problemsMap[uuid]);
		});

		const toast = {
			status: 200,
			type: 'select',
			message: 'order',
		};
		return res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}
