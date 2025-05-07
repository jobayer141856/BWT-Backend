import { desc, eq, sql, inArray } from 'drizzle-orm';
import { handleError, validateRequest } from '../../../util/index.js';
import db from '../../index.js';
import * as hrSchema from '../../hr/schema.js';
import { decimalToNumber } from '../../variables.js';
import { createApi } from '../../../util/api.js';
import { alias } from 'drizzle-orm/pg-core';
import { users } from '../../hr/schema.js';
import { info, zone } from '../schema.js';
import { nanoid } from '../../../lib/nanoid.js';
const user = alias(hrSchema.users, 'user');
import * as deliverySchema from '../../delivery/schema.js';

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
		where_they_find_us,
		submitted_by,
	} = req.body;

	try {
		
		let userUuid = user_uuid;

		if (is_new_customer) {
			const formattedName = name.toLowerCase().replace(/\s+/g, '');
			await db.insert(users).values({
				uuid: userUuid,
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
				where_they_find_us: where_they_find_us,
			});
		}
		if (submitted_by === 'customer') {
			const formattedName2 = name.toLowerCase().replace(/\s+/g, '');

			const existingUser = await db
				.select()
				.from(users)
				.where(eq(users.phone, phone))
				.limit(1);

			userUuid = existingUser[0]?.uuid || userUuid;

			if (existingUser.length === 0) {
				userUuid = nanoid();
				console.log('userUuid', userUuid);
				await db.insert(users).values({
					uuid: userUuid,
					name: name,
					phone: phone,
					user_type: 'customer',
					pass: phone,
					email: `${formattedName2 + phone}@bwt.com`,
					ext: '+880',
					created_at: created_at,
				});
			}
		}
		const infoPromise = db
			.insert(info)
			.values({ ...req.body, user_uuid: userUuid })
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
		where_they_find_us,
	} = req.body;

	try {
		if (is_new_customer) {
			const formattedName = name.toLowerCase().replace(/\s+/g, '');
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
				where_they_find_us: where_they_find_us,
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
	if (!(await validateRequest(req, next))) return;
	const { customer_uuid } = req.query;
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
			location: info.location,
			zone_uuid: info.zone_uuid,
			zone_name: zone.name,
			submitted_by: info.submitted_by,
		})
		.from(info)
		.leftJoin(user, eq(info.user_uuid, user.uuid))
		.leftJoin(hrSchema.users, eq(info.created_by, hrSchema.users.uuid))
		.leftJoin(zone, eq(info.zone_uuid, zone.uuid));

	if (customer_uuid) {
		infoPromise.where(eq(info.user_uuid, customer_uuid));
	}

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
			location: info.location,
			zone_uuid: info.zone_uuid,
			zone_name: zone.name,
			submitted_by: info.submitted_by,
		})
		.from(info)
		.leftJoin(user, eq(info.user_uuid, user.uuid))
		.leftJoin(hrSchema.users, eq(info.created_by, hrSchema.users.uuid))
		.leftJoin(zone, eq(info.zone_uuid, zone.uuid))
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

	const { diagnosis, process } = req.query;

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

		// Process each order to fetch diagnosis and process data conditionally
		const enrichedOrders = await Promise.all(
			order.data.map(async (orderItem) => {
				const { uuid: order_uuid } = orderItem;

				const diagnosisData =
					diagnosis === 'true'
						? await fetchData(
								`/work/diagnosis-by-order/${order_uuid}`
							)
						: null;

				const processData =
					process === 'true'
						? await fetchData(
								`/work/process?order_uuid=${order_uuid}`
							)
						: null;

				return {
					...orderItem,
					...(diagnosisData
						? { diagnosis: diagnosisData?.data }
						: {}),
					...(processData ? { process: processData?.data } : []),
				};
			})
		);
		enrichedOrders.sort(
			(a, b) => new Date(b.created_at) - new Date(a.created_at)
		);
		const response = {
			...info?.data,
			// order_entry: order?.data || [],
			order_entry: enrichedOrders || [],
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
