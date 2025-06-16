import { and, desc, eq, gt, sql } from 'drizzle-orm';
import { alias } from 'drizzle-orm/pg-core';
import { validateRequest } from '../../../util/index.js';
import db from '../../index.js';
import {
	device_list,
	employee,
	punch_log,
	shift_group,
	shifts,
	users,
} from '../schema.js';

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const punch_logPromise = db
		.insert(punch_log)
		.values(req.body)
		.returning({ insertedName: punch_log.name });

	try {
		const data = await punch_logPromise;
		const toast = {
			status: 201,
			type: 'insert',
			message: `${data[0].insertedName} inserted`,
		};

		return res.status(201).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function update(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const punch_logPromise = db
		.update(punch_log)
		.set(req.body)
		.where(eq(punch_log.uuid, req.params.uuid))
		.returning({ updatedName: punch_log.name });

	try {
		const data = await punch_logPromise;
		const toast = {
			status: 200,
			type: 'update',
			message: `${data[0].updatedName} updated`,
		};

		return res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function remove(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const punch_logPromise = db
		.delete(punch_log)
		.where(eq(punch_log.uuid, req.params.uuid))
		.returning({ deletedName: punch_log.name });

	try {
		const data = await punch_logPromise;
		const toast = {
			status: 200,
			type: 'delete',
			message: `${data[0].deletedName} deleted`,
		};

		return res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function selectAll(req, res, next) {
	const { employee_uuid } = req.query;

	const resultPromise = db
		.select({
			uuid: punch_log.uuid,
			employee_uuid: punch_log.employee_uuid,
			employee_name: users.name,
			device_list_uuid: punch_log.device_list_uuid,
			device_list_name: device_list.name,
			punch_type: punch_log.punch_type,
			punch_time: punch_log.punch_time,
		})
		.from(punch_log)
		.leftJoin(device_list, eq(punch_log.device_list_uuid, device_list.uuid))
		.leftJoin(employee, eq(punch_log.employee_uuid, employee.uuid))
		.leftJoin(users, eq(employee.user_uuid, users.uuid))
		.where(
			employee_uuid ? eq(punch_log.employee_uuid, employee_uuid) : true
		)
		.orderBy(desc(punch_log.punch_time));

	try {
		const data = await resultPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'punch_log',
		};

		return res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function select(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const punch_logPromise = db
		.select({
			uuid: punch_log.uuid,
			employee_uuid: punch_log.employee_uuid,
			employee_name: users.name,
			device_list_uuid: punch_log.device_list_uuid,
			device_list_name: device_list.name,
			punch_type: punch_log.punch_type,
			punch_time: punch_log.punch_time,
		})
		.from(punch_log)
		.leftJoin(device_list, eq(punch_log.device_list_uuid, device_list.uuid))
		.leftJoin(employee, eq(punch_log.employee_uuid, employee.uuid))
		.leftJoin(users, eq(employee.user_uuid, users.uuid))
		.where(eq(punch_log.uuid, req.params.uuid));

	try {
		const data = await punch_logPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'punch_log',
		};

		return res.status(200).json({ toast, data: data[0] });
	} catch (error) {
		next(error);
	}
}

export async function selectLateEntryDateByEmployeeUuid(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const punch_logPromise = db
		.select({
			uuid: punch_log.uuid,
			employee_uuid: punch_log.employee_uuid,
			employee_name: users.name,
			device_list_uuid: punch_log.device_list_uuid,
			device_list_name: device_list.name,
			punch_type: punch_log.punch_type,
			punch_time: punch_log.punch_time,
		})
		.from(punch_log)
		.leftJoin(device_list, eq(punch_log.device_list_uuid, device_list.uuid))
		.leftJoin(employee, eq(punch_log.employee_uuid, employee.uuid))
		.leftJoin(users, eq(employee.user_uuid, users.uuid))
		.leftJoin(shift_group, eq(employee.shift_group_uuid, shift_group.uuid))
		.leftJoin(shifts, eq(shift_group.shifts_uuid, shifts.uuid))
		.where(
			and(
				eq(punch_log.employee_uuid, req.params.employee_uuid),
				gt(punch_log.punch_time, shifts.late_time)
			)
		)
		.orderBy(desc(punch_log.punch_time));

	try {
		const data = await punch_logPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'punch_log',
		};

		return res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function selectEmployeePunchLogPerDayByEmployeeUuid(
	req,
	res,
	next
) {
	if (!(await validateRequest(req, next))) return;

	const { from_date, to_date } = req.query;

	const { employee_uuid } = req.params;

	// get year and month from the from_date
	const fromDateYear = from_date ? new Date(from_date).getFullYear() : null;
	const fromDateMonth = from_date ? new Date(from_date).getMonth() + 1 : null;
	const toDateYear = to_date ? new Date(to_date).getFullYear() : null;
	const toDateMonth = to_date ? new Date(to_date).getMonth() + 1 : null;

	const SpecialHolidaysQuery = sql`
		SELECT date(gs.generated_date) AS holiday_date, sh.name, 'special' AS holiday_type
		FROM hr.special_holidays sh
		JOIN LATERAL (
			SELECT generate_series(sh.from_date::date, sh.to_date::date, INTERVAL '1 day') AS generated_date
		) gs ON TRUE
		WHERE
			${
				fromDateYear && fromDateMonth
					? sql`(
				EXTRACT(YEAR FROM sh.to_date) > ${fromDateYear}
				OR (EXTRACT(YEAR FROM sh.to_date) = ${fromDateYear} AND EXTRACT(MONTH FROM sh.to_date) >= ${fromDateMonth})
			)`
					: sql`true`
			}
			AND ${
				toDateYear && toDateMonth
					? sql`(
				EXTRACT(YEAR FROM sh.from_date) < ${toDateYear}
				OR (EXTRACT(YEAR FROM sh.from_date) = ${toDateYear} AND EXTRACT(MONTH FROM sh.from_date) <= ${toDateMonth})
			)`
					: sql`true`
			}
		ORDER BY holiday_date;
	`;

	const generalHolidayQuery = sql`
		SELECT date(date) AS holiday_date, name, 'general' AS holiday_type
		FROM hr.general_holidays
		WHERE
			${
				fromDateYear && fromDateMonth
					? sql`(
						EXTRACT(YEAR FROM date) > ${fromDateYear}
						OR (EXTRACT(YEAR FROM date) = ${fromDateYear} AND EXTRACT(MONTH FROM date) >= ${fromDateMonth})
					)`
					: sql`true`
			}
			AND ${
				toDateYear && toDateMonth
					? sql`(
						EXTRACT(YEAR FROM date) < ${toDateYear}
						OR (EXTRACT(YEAR FROM date) = ${toDateYear} AND EXTRACT(MONTH FROM date) <= ${toDateMonth})
					)`
					: sql`true`
			}
		ORDER BY holiday_date;
	`;

	const specialHolidaysPromise = db.execute(SpecialHolidaysQuery);
	const generalHolidaysPromise = db.execute(generalHolidayQuery);

	const [specialHolidaysResult, generalHolidaysResult] = await Promise.all([
		specialHolidaysPromise,
		generalHolidaysPromise,
	]);

	const punch_log_query = sql`
		WITH date_series AS (
			SELECT generate_series(${from_date}::date, ${to_date}::date, INTERVAL '1 day')::date AS punch_date
		),
		user_dates AS (
			SELECT u.uuid AS user_uuid, u.name AS employee_name, d.punch_date
			FROM hr.users u
			CROSS JOIN date_series d
		)
		SELECT
			ud.user_uuid,
			ud.employee_name,
			DATE(ud.punch_date) AS punch_date,
			MIN(pl.punch_time) AS entry_time,
			MAX(pl.punch_time) AS exit_time,
			(EXTRACT(EPOCH FROM MAX(pl.punch_time) - MIN(pl.punch_time)) / 3600)::float8 AS duration_hours
		FROM hr.employee e
		LEFT JOIN user_dates ud ON e.user_uuid = ud.user_uuid
		LEFT JOIN hr.punch_log pl ON pl.employee_uuid = e.uuid AND DATE(pl.punch_time) = DATE(ud.punch_date)
		WHERE 
			e.uuid = ${employee_uuid}
		GROUP BY ud.user_uuid, ud.employee_name, ud.punch_date
		ORDER BY ud.user_uuid, ud.punch_date;


	`;

	const punch_logPromise = db.execute(punch_log_query);

	try {
		const data = await punch_logPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'punch_log',
		};

		return res.status(200).json({
			toast,
			data: data?.rows,
			special_holidays: specialHolidaysResult?.rows,
			general_holidays: generalHolidaysResult?.rows,
		});
	} catch (error) {
		next(error);
	}
}
