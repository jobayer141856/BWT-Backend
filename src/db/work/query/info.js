import { desc, eq, sql, inArray } from 'drizzle-orm';
import { handleError, validateRequest } from '../../../util/index.js';
import db from '../../index.js';
import * as hrSchema from '../../hr/schema.js';
import { decimalToNumber } from '../../variables.js';
import { createApi } from '../../../util/api.js';
import { alias } from 'drizzle-orm/pg-core';
import { users } from '../../hr/schema.js';
import { info } from '../schema.js';
const user = alias(hrSchema.users, 'user');

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;
	const {
		is_new_customer,
		user_uuid,
		name,
		phone,
		created_at,
		department_uuid,
		designation_uuid,
		business_type,
	} = req.body;

	try {
		const formattedName = name.toLowerCase().replace(/\s+/g, '');
		if (is_new_customer) {
			await db.insert(users).values({
				uuid: user_uuid,
				name: name,
				phone: phone,
				user_type: 'customer',
				pass: phone,
				department_uuid: department_uuid,
				designation_uuid: designation_uuid,
				email: `${formattedName + phone}@bwt.com`,
				ext: '+880',
				created_at: created_at,
				business_type: business_type,
			});
		}
		const infoPromise = db
			.insert(info)
			.values(req.body)
			.returning({ insertedUuid: info.uuid });

		const data = await infoPromise;
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

	const {
		is_new_customer,
		user_uuid,
		name,
		phone,
		updated_at,
		department_uuid,
		designation_uuid,
		business_type,
	} = req.body;

	try {
		const formattedName = name.toLowerCase().replace(/\s+/g, '');

		if (is_new_customer) {
			await db.insert(users).values({
				uuid: user_uuid,
				name: name,
				phone: phone,
				user_type: 'customer',
				pass: phone,
				department_uuid: department_uuid,
				designation_uuid: designation_uuid,
				email: `${formattedName + phone}@bwt.com`,
				ext: '+880',
				created_at: updated_at,
				business_type: business_type,
			});
		}

		const infoPromise = db
			.update(info)
			.set(req.body)
			.where(eq(info.uuid, req.params.uuid))
			.returning({ updatedUuid: info.uuid });

		const data = await infoPromise;
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

	const infoPromise = db
		.delete(info)
		.where(eq(info.uuid, req.params.uuid))
		.returning({ deletedUuid: info.uuid });

	try {
		const data = await infoPromise;
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
	const infoPromise = db
		.select({
			id: info.id,
			info_id: sql`CONCAT('WI', TO_CHAR(${info.created_at}::timestamp, 'YY'), '-', TO_CHAR(${info.id}, 'FM0000'))`,
			uuid: info.uuid,
			user_uuid: info.user_uuid,
			user_id: sql`CONCAT('HU', TO_CHAR(${user.created_at}::timestamp, 'YY'), '-', TO_CHAR(${user.id}, 'FM0000'))`,
			user_name: user.name,
			user_phone: user.phone,
			received_date: info.received_date,
			is_product_received: info.is_product_received,
			created_by: info.created_by,
			created_by_name: hrSchema.users.name,
			created_at: info.created_at,
			updated_at: info.updated_at,
			remarks: info.remarks,
		})
		.from(info)
		.leftJoin(user, eq(info.user_uuid, user.uuid))
		.leftJoin(hrSchema.users, eq(info.created_by, hrSchema.users.uuid));
	try {
		const data = await infoPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'info list',
		};
		return await res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function select(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const infoPromise = db
		.select({
			id: info.id,
			info_id: sql`CONCAT('WI', TO_CHAR(${info.created_at}::timestamp, 'YY'), '-', TO_CHAR(${info.id}, 'FM0000'))`,
			uuid: info.uuid,
			user_uuid: info.user_uuid,
			user_id: sql`CONCAT('HU', TO_CHAR(${user.created_at}::timestamp, 'YY'), '-', TO_CHAR(${user.id}, 'FM0000'))`,
			user_name: user.name,
			user_phone: user.phone,
			received_date: info.received_date,
			is_product_received: info.is_product_received,
			created_by: info.created_by,
			created_by_name: hrSchema.users.name,
			created_at: info.created_at,
			updated_at: info.updated_at,
			remarks: info.remarks,
		})
		.from(info)
		.leftJoin(user, eq(info.user_uuid, user.uuid))
		.leftJoin(hrSchema.users, eq(info.created_by, hrSchema.users.uuid))
		.where(eq(info.uuid, req.params.uuid));

	try {
		const data = await infoPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'info select',
		};
		return await res.status(200).json({ toast, data: data[0] });
	} catch (error) {
		next(error);
	}
}

export async function selectOrderDetailsByInfo(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const { info_uuid } = req.params;

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

		const [info, order] = await Promise.all([
			fetchData(`/work/info/${info_uuid}`),
			fetchData(`/work/order-by-info/${info_uuid}`),
		]);

		const response = {
			...info?.data,
			order_entry: order?.data || [],
		};

		const toast = {
			status: 200,
			type: 'select',
			message: 'order details by info',
		};

		return await res.status(200).json({ toast, data: response });
	} catch (error) {
		if (error.response && error.response.status === 404) {
			return res
				.status(404)
				.json({ message: 'Resource not found', error: error.message });
		}
		next(error);
	}
}
