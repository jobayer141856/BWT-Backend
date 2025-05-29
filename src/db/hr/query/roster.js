import { desc, eq } from 'drizzle-orm';
import { validateRequest } from '../../../util/index.js';
import db from '../../index.js';
import {
	employee,
	general_holiday,
	roster,
	shift_group,
	shifts,
	users,
} from '../schema.js';
import { alias } from 'drizzle-orm/gel-core';

const createdByUser = alias(users, 'created_by_user');

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const rosterPromise = db
		.insert(roster)
		.values(req.body)
		.returning({ insertedName: roster.id });

	try {
		const data = await rosterPromise;
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

	const rosterPromise = db
		.update(roster)
		.set(req.body)
		.where(eq(roster.id, req.params.id))
		.returning({ updatedName: roster.id });

	try {
		const data = await rosterPromise;
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

	const rosterPromise = db
		.delete(roster)
		.where(eq(roster.id, req.params.id))
		.returning({ deletedName: roster.id });

	try {
		const data = await rosterPromise;
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
	const resultPromise = db
		.select({
			id: roster.id,
			shift_group_uuid: roster.shift_group_uuid,
			shift_group_name: shift_group.name,
			shifts_uuid: roster.shifts_uuid,
			shift_name: shifts.name,
			created_by: roster.created_by,
			created_by_name: users.name,
			created_at: roster.created_at,
			updated_at: roster.updated_at,
			remarks: roster.remarks,
		})
		.from(roster)
		.leftJoin(shift_group, eq(roster.shift_group_uuid, shift_group.uuid))
		.leftJoin(shifts, eq(roster.shifts_uuid, shifts.uuid))
		.leftJoin(users, eq(roster.created_by, users.uuid))
		.orderBy(desc(roster.created_at));

	try {
		const data = await resultPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'roster',
		};

		return res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function select(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const rosterPromise = db
		.select({
			id: roster.id,
			shift_group_uuid: roster.shift_group_uuid,
			shift_group_name: shift_group.name,
			shifts_uuid: roster.shifts_uuid,
			shift_name: shifts.name,
			created_by: roster.created_by,
			created_by_name: users.name,
			created_at: roster.created_at,
			updated_at: roster.updated_at,
			remarks: roster.remarks,
		})
		.from(roster)
		.leftJoin(shift_group, eq(roster.shift_group_uuid, shift_group.uuid))
		.leftJoin(shifts, eq(roster.shifts_uuid, shifts.uuid))
		.leftJoin(users, eq(roster.created_by, users.uuid))
		.where(eq(roster.id, req.params.id));

	try {
		const data = await rosterPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'roster',
		};

		return res.status(200).json({ toast, data: data[0] });
	} catch (error) {
		next(error);
	}
}

export async function selectRosterCalendarByEmployeeUuid(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const { employee_uuid, year, month } = req.params;

	const specialHolidaysQuery = sql`
		SELECT
			sh.from_date,
			sh.to_date
		FROM hr.special_holidays sh
		WHERE
			(
				EXTRACT(YEAR FROM sh.to_date) > ${year}
				OR (EXTRACT(YEAR FROM sh.to_date) = ${year} AND EXTRACT(MONTH FROM sh.to_date) >= ${month})
			)
			AND (
				EXTRACT(YEAR FROM sh.from_date) < ${year}
				OR (EXTRACT(YEAR FROM sh.from_date) = ${year} AND EXTRACT(MONTH FROM sh.from_date) <= ${month})
			)
	`;

	const generalHolidayQuery = sql`
		SELECT
			gh.date
		FROM 
			hr.general_holidays gh
		WHERE
			EXTRACT(YEAR FROM gh.date) = ${year}
			AND EXTRACT(MONTH FROM gh.date) = ${month}
	`;

	const query = sql`
		SELECT 
			employee.uuid as employee_uuid,
			users.name as employee_name,
			roster.off_days,
			roster.created_at
		FROM 
			hr.employee 
		LEFT JOIN
			hr.users ON employee.user_uuid = users.uuid
		LEFT JOIN 
			hr.shift_group ON employee.shift_group_uuid = shift_group.uuid
		LEFT JOIN
			hr.roster ON employee.shift_group_uuid = roster.shift_group_uuid
			AND roster.shifts_uuid = shift_group.shifts_uuid
			AND roster.created_at >= DATE_TRUNC('month', DATE '${year}-${month}-01')
			AND roster.created_at < DATE_TRUNC('month', DATE '${year}-${month}-01') + INTERVAL '1 month'
		WHERE 
			employee.uuid = ${employee_uuid}
	`;

	const rosterPromise = db.execute(query);
	const specialHolidaysPromise = db.execute(specialHolidaysQuery);
	const generalHolidaysPromise = db.execute(generalHolidayQuery);

	try {
		const data = await rosterPromise;
		const specialHolidays = await specialHolidaysPromise;
		const generalHolidays = await generalHolidaysPromise;

		const response = {
			roster: data.rows,
			special_holidays: specialHolidays.rows,
			general_holidays: generalHolidays.rows,
		};

		const toast = {
			status: 200,
			type: 'select',
			message: 'roster',
		};

		return res.status(200).json({
			toast,
			data: response,
		});
	} catch (error) {
		next(error);
	}
}
