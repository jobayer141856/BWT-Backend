import { desc, eq, sql, inArray } from 'drizzle-orm';
import { handleError, validateRequest } from '../../../util/index.js';
import db from '../../index.js';
import * as hrSchema from '../../hr/schema.js';
import { decimalToNumber } from '../../variables.js';
import { createApi } from '../../../util/api.js';
import { alias } from 'drizzle-orm/pg-core';
import { order, problem } from '../schema.js';
import * as storeSchema from '../../store/schema.js';
import { users } from '../../hr/schema.js';
const user = alias(hrSchema.users, 'user');

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;
	const { is_new_customer, user_uuid, name, phone, created_at } = req.body;

	// console.log('is_new_customer', req.body);

	try {
		if (is_new_customer) {
			await db.insert(users).values({
				uuid: user_uuid,
				name: name,
				phone: phone,
				user_type: 'customer',
				pass: phone,
				department_uuid: null,
				designation_uuid: null,
				email: `${name + phone}@bwt.com`,
				ext: '+880',
				created_at: created_at,
			});
		}
		const orderPromise = db
			.insert(order)
			.values(req.body)
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

	const orderPromise = db
		.update(order)
		.set(req.body)
		.where(eq(order.uuid, req.params.uuid))
		.returning({ updatedUuid: order.uuid });

	try {
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
	const orderPromise = db
		.select({
			id: order.id,
			order_id: sql`CONCAT('WO', TO_CHAR(${order.created_at}, 'YY'), '-', TO_CHAR(${order.id}, 'FM0000'))`,
			uuid: order.uuid,
			user_uuid: order.user_uuid,
			user_id: sql`CONCAT('HU', TO_CHAR(${user.created_at}::timestamp, 'YY'), '-', TO_CHAR(${user.id}::integer, 'FM0000'))`,
			user_name: user.name,
			model_uuid: order.model_uuid,
			model_name: storeSchema.model.name,
			size_uuid: order.size_uuid,
			size_name: storeSchema.size.name,
			serial_no: order.serial_no,
			problems_uuid: order.problems_uuid,
			problem_statement: order.problem_statement,
			accessories: order.accessories,
			is_product_received: order.is_product_received,
			receive_date: order.receive_date,
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
		})
		.from(order)
		.leftJoin(hrSchema.users, eq(order.created_by, hrSchema.users.uuid))
		.leftJoin(
			storeSchema.model,
			eq(order.model_uuid, storeSchema.model.uuid)
		)
		.leftJoin(storeSchema.size, eq(order.size_uuid, storeSchema.size.uuid))
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
		.leftJoin(user, eq(order.user_uuid, user.uuid))

		.orderBy(desc(order.created_at));

	try {
		const data = await orderPromise;

		const problems_uuid = data.map((order) => order.problems_uuid).flat();

		const problems = await db
			.select({
				name: problem.name,
				uuid: problem.uuid,
			})
			.from(problem)
			.where(inArray(problem.uuid, problems_uuid));

		const problemsMap = problems.reduce((acc, problem) => {
			acc[problem.uuid] = problem.name;
			return acc;
		}, {});

		data.forEach((order) => {
			order.problems_name = order.problems_uuid.map(
				(uuid) => problemsMap[uuid]
			);
		});

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
			user_uuid: order.user_uuid,
			user_id: sql`CONCAT('HU', TO_CHAR(${user.created_at}::timestamp, 'YY'), '-', TO_CHAR(${user.id}::integer, 'FM0000'))`,
			user_name: user.name,
			user_phone: user.phone,
			model_uuid: order.model_uuid,
			model_name: storeSchema.model.name,
			size_uuid: order.size_uuid,
			size_name: storeSchema.size.name,
			serial_no: order.serial_no,
			problems_uuid: order.problems_uuid,
			problem_statement: order.problem_statement,
			accessories: order.accessories,
			is_product_received: order.is_product_received,
			receive_date: order.receive_date,
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
			brand_uuid: storeSchema.model.brand_uuid,
			brand_name: storeSchema.brand.name,
		})
		.from(order)
		.leftJoin(hrSchema.users, eq(order.created_by, hrSchema.users.uuid))
		.leftJoin(
			storeSchema.model,
			eq(order.model_uuid, storeSchema.model.uuid)
		)
		.leftJoin(storeSchema.size, eq(order.size_uuid, storeSchema.size.uuid))
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
		.leftJoin(user, eq(order.user_uuid, user.uuid))
		.leftJoin(
			storeSchema.brand,
			eq(storeSchema.model.brand_uuid, storeSchema.brand.uuid)
		)
		.where(eq(order.uuid, req.params.uuid));

	try {
		const data = await orderPromise;
		const problems_uuid = data.map((order) => order.problems_uuid).flat();

		const problems = await db
			.select({
				name: problem.name,
				uuid: problem.uuid,
			})
			.from(problem)
			.where(inArray(problem.uuid, problems_uuid));

		const problemsMap = problems.reduce((acc, problem) => {
			acc[problem.uuid] = problem.name;
			return acc;
		}, {});

		data.forEach((order) => {
			order.problems_name = order.problems_uuid.map(
				(uuid) => problemsMap[uuid]
			);
		});

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
				.get(`${endpoint}/${order_uuid}`)
				.then((response) => response.data)
				.catch((error) => {
					console.error(
						`Error fetching data from ${endpoint}:`,
						error.message
					);
					throw error;
				});

		const [order, diagnosis] = await Promise.all([
			fetchData('/work/order'),
			fetchData('/work/diagnosis-by-order'),
		]);

		const response = {
			...order?.data,
			diagnosis: diagnosis?.data || [],
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
