import { desc, eq, sql, inArray } from 'drizzle-orm';
import { handleError, validateRequest } from '../../../util/index.js';
import db from '../../index.js';
import * as hrSchema from '../../hr/schema.js';
import { decimalToNumber } from '../../variables.js';
import { createApi } from '../../../util/api.js';
import { alias } from 'drizzle-orm/pg-core';

const customerUser = alias(hrSchema.users, 'customerUser');
const employeeUser = alias(hrSchema.users, 'employeeUser');

import { challan, courier, vehicle } from '../schema.js';

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	try {
		const data = await db
			.insert(challan)
			.values(req.body)
			.returning({ insertedUuid: challan.uuid });

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
			.update(challan)
			.set(req.body)
			.where(challan.uuid.eq(req.params.uuid))
			.returning({ updatedUuid: challan.uuid });

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
			.delete(challan)
			.where(challan.uuid.eq(req.params.uuid))
			.returning({ deletedUuid: challan.uuid });

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
	const challanPromise = db
		.select({
			id: challan.id,
			challan_no: sql`CONCAT('CH', TO_CHAR(${challan.created_at}::timestamp, 'YY'), '-', TO_CHAR(${challan.id}, 'FM0000'))`,
			uuid: challan.uuid,
			customer_uuid: challan.customer_uuid,
			customer_name: customerUser.name,
			type: challan.type,
			employee_uuid: challan.employee_uuid,
			employee_name: employeeUser.name,
			vehicle_uuid: challan.vehicle_uuid,
			vehicle_name: vehicle.name,
			vehicle_no: vehicle.no,
			courier_uuid: challan.courier_uuid,
			courier_name: courier.name,
			courier_branch: courier.branch,
			is_delivery_complete: challan.is_delivery_complete,
			created_by: challan.created_by,
			created_by_name: hrSchema.users.name,
			created_at: challan.created_at,
			updated_at: challan.updated_at,
			remarks: challan.remarks,
		})
		.from(challan)
		.leftJoin(customerUser, eq(challan.customer_uuid, customerUser.uuid))
		.leftJoin(employeeUser, eq(challan.employee_uuid, employeeUser.uuid))
		.leftJoin(vehicle, eq(challan.vehicle_uuid, vehicle.uuid))
		.leftJoin(courier, eq(challan.courier_uuid, courier.uuid))
		.leftJoin(hrSchema.users, eq(challan.created_by, hrSchema.users.uuid));
	try {
		const data = await challanPromise;
		const toast = {
			status: 200,
			type: 'select all',
			message: 'Challan list',
		};

		return await res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function select(req, res, next) {
	const challanPromise = db
		.select({
			id: challan.id,
			challan_no: sql`CONCAT('CH', TO_CHAR(${challan.created_at}::timestamp, 'YY'), '-', TO_CHAR(${challan.id}, 'FM0000'))`,
			uuid: challan.uuid,
			customer_uuid: challan.customer_uuid,
			customer_name: customerUser.name,
			type: challan.type,
			employee_uuid: challan.employee_uuid,
			employee_name: employeeUser.name,
			vehicle_uuid: challan.vehicle_uuid,
			vehicle_name: vehicle.name,
			vehicle_no: vehicle.no,
			courier_uuid: challan.courier_uuid,
			courier_name: courier.name,
			courier_branch: courier.branch,
			is_delivery_complete: challan.is_delivery_complete,
			created_by: challan.created_by,
			created_by_name: hrSchema.users.name,
			created_at: challan.created_at,
			updated_at: challan.updated_at,
			remarks: challan.remarks,
		})
		.from(challan)
		.leftJoin(customerUser, eq(challan.customer_uuid, customerUser.uuid))
		.leftJoin(employeeUser, eq(challan.employee_uuid, employeeUser.uuid))
		.leftJoin(vehicle, eq(challan.vehicle_uuid, vehicle.uuid))
		.leftJoin(courier, eq(challan.courier_uuid, courier.uuid))
		.leftJoin(hrSchema.users, eq(challan.created_by, hrSchema.users.uuid))
		.where(eq(challan.uuid, req.params.uuid));

	try {
		const data = await challanPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'Challan',
		};

		return await res.status(200).json({ toast, data: data[0] });
	} catch (error) {
		next(error);
	}
}

export async function selectChallanDetailsByChallan(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const { uuid } = req.params;

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
		const [challan, challan_entries] = await Promise.all([
			fetchData(`/delivery/challan/${uuid}`),
			fetchData(`/delivery/challan-entry/by/challan/${uuid}`),
		]);

		const response = {
			...challan?.data,
			challan_entries: challan_entries?.data || [],
		};

		const toast = {
			status: 200,
			type: 'select',
			message: 'Challan details',
		};

		return await res.status(200).json({ toast, data: response });
	} catch (error) {
		next(error);
	}
}
