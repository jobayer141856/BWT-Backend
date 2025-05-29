import { desc, eq, lte, sum, sql } from 'drizzle-orm';
import { alias, uuid } from 'drizzle-orm/pg-core';
import { validateRequest } from '../../../util/index.js';
import db from '../../index.js';

import {
	employee,
	salary_entry,
	salary_increment,
	users,
	punch_log,
	shifts,
	shift_group,
	apply_leave,
} from '../schema.js';
import { decimalToNumber } from '../../variables.js';

const createdByUser = alias(users, 'created_by_user');

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const salaryIncrementPromise = db
		.insert(salary_entry)
		.values(req.body)
		.returning({ insertedUuid: salary_entry.uuid });

	try {
		const data = await salaryIncrementPromise;
		const toast = {
			status: 201,
			type: 'insert',
			message: `${data[0].insertedUuid} inserted`,
		};

		return res.status(201).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function update(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const salaryIncrementPromise = db
		.update(salary_entry)
		.set(req.body)
		.where(eq(salary_entry.uuid, req.params.uuid))
		.returning({ updatedUuid: salary_entry.uuid });

	try {
		const data = await salaryIncrementPromise;
		const toast = {
			status: 200,
			type: 'update',
			message: `${data[0].updatedUuid} updated`,
		};

		return res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function remove(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const salaryIncrementPromise = db
		.delete(salary_entry)
		.where(eq(salary_entry.uuid, req.params.uuid))
		.returning({ deletedUuid: salary_entry.uuid });

	try {
		const data = await salaryIncrementPromise;
		const toast = {
			status: 200,
			type: 'delete',
			message: `${data[0].deletedUuid} deleted`,
		};

		return res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function selectAll(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const salaryIncrementPromise = db
		.select({
			uuid: salary_entry.uuid,
			employee_uuid: salary_entry.employee_uuid,
			employee_name: users.name,
			type: salary_entry.type,
			amount: decimalToNumber(salary_entry.amount),
			month: salary_entry.month,
			year: salary_entry.year,
			created_by: salary_entry.created_by,
			created_by_name: createdByUser.name,
			created_at: salary_entry.created_at,
			updated_at: salary_entry.updated_at,
			remarks: salary_entry.remarks,
		})
		.from(salary_entry)
		.leftJoin(
			createdByUser,
			eq(salary_entry.created_by, createdByUser.uuid)
		)
		.leftJoin(employee, eq(salary_entry.employee_uuid, employee.uuid))
		.leftJoin(users, eq(employee.user_uuid, users.uuid))
		.orderBy(desc(salary_entry.created_at));

	try {
		const data = await salaryIncrementPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'salary_entry list',
		};
		return res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function select(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const salaryIncrementPromise = db
		.select({
			uuid: salary_entry.uuid,
			employee_uuid: salary_entry.employee_uuid,
			employee_name: users.name,
			type: salary_entry.type,
			amount: decimalToNumber(salary_entry.amount),
			month: salary_entry.month,
			year: salary_entry.year,
			created_by: salary_entry.created_by,
			created_by_name: createdByUser.name,
			created_at: salary_entry.created_at,
			updated_at: salary_entry.updated_at,
			remarks: salary_entry.remarks,
		})
		.from(salary_entry)
		.leftJoin(
			createdByUser,
			eq(salary_entry.created_by, createdByUser.uuid)
		)
		.leftJoin(employee, eq(salary_entry.employee_uuid, employee.uuid))
		.leftJoin(users, eq(employee.user_uuid, users.uuid))
		.where(eq(salary_entry.uuid, req.params.uuid));

	try {
		const data = await salaryIncrementPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'salary_entry list',
		};
		return res.status(200).json({ toast, data: data[0] });
	} catch (error) {
		next(error);
	}
}

export async function employeeSalaryDetailsByYearDate(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const { year, month } = req.params;

	const SpecialHolidaysQuery = sql`
							SELECT
								SUM(sh.to_date::date - sh.from_date::date + 1) -
								SUM(
									CASE
										WHEN sh.to_date::date > (TO_TIMESTAMP(CAST(${year} AS TEXT) || '-' || LPAD(CAST(${month} AS TEXT), 2, '0') || '-01', 'YYYY-MM-DD') + INTERVAL '1 month - 1 day')::date
											THEN sh.to_date::date - (TO_TIMESTAMP(CAST(${year} AS TEXT) || '-' || LPAD(CAST(${month} AS TEXT), 2, '0') || '-01', 'YYYY-MM-DD') + INTERVAL '1 month - 1 day')::date
										ELSE 0
									END
									+
									CASE
										WHEN sh.from_date::date < TO_TIMESTAMP(CAST(${year} AS TEXT) || '-' || LPAD(CAST(${month} AS TEXT), 2, '0') || '-01', 'YYYY-MM-DD')::date
											THEN TO_TIMESTAMP(CAST(${year} AS TEXT) || '-' || LPAD(CAST(${month} AS TEXT), 2, '0') || '-01', 'YYYY-MM-DD')::date - sh.from_date::date
										ELSE 0
									END
								) AS total_special_holidays
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
						COUNT(*) AS total_off_days
					FROM 
						hr.general_holidays gh
					WHERE
						EXTRACT(YEAR FROM gh.date) = ${year}
						AND EXTRACT(MONTH FROM gh.date) = ${month}
					`;

	const specialHolidaysPromise = db.execute(SpecialHolidaysQuery);
	const generalHolidaysPromise = db.execute(generalHolidayQuery);

	const [specialHolidaysResult, generalHolidaysResult] = await Promise.all([
		specialHolidaysPromise,
		generalHolidaysPromise,
	]);

	const total_special_holidays =
		specialHolidaysResult.rows[0]?.total_special_holidays || 0;
	const total_general_holidays =
		generalHolidaysResult.rows[0]?.total_off_days || 0;

	const query = sql`
					SELECT 
							se.uuid as salary_uuid,
							se.employee_uuid,
							employeeUser.name as employee_name,
							se.type,
							se.amount::float8,
							se.month,
							se.year,
							employee.start_date as joining_date,
							se.created_by,
							createdByUser.name as created_by_name,
							se.created_at,
							se.updated_at,
							se.remarks,
							COALESCE(total_increment.total_salary_increment, 0)::float8 AS total_incremented_salary,
							COALESCE(attendance_summary.present_days, 0)::float8 AS present_days,
							COALESCE(attendance_summary.late_days, 0)::float8 AS late_days,
							COALESCE(leave_summary.total_leave_days, 0)::float8 AS total_leave_days,
							COALESCE(
								se.amount + COALESCE(total_increment.total_salary_increment, 0),
								se.amount
							)::float8 AS total_salary,
							COALESCE(off_days_summary.total_off_days, 0)::float8 AS week_days,
							COALESCE(${total_general_holidays}, 0)::float8 AS total_general_holidays,
							COALESCE(${total_special_holidays}, 0)::float8 AS total_special_holidays,
							COALESCE(
								off_days_summary.total_off_days + ${total_general_holidays} + ${total_special_holidays},
								0
							)::float8 AS total_off_days_including_holidays,
							COALESCE(
								attendance_summary.present_days + attendance_summary.late_days + leave_summary.total_leave_days,
								0
							)::float8 AS total_present_days,
							COALESCE(
								COALESCE(attendance_summary.present_days, 0) + COALESCE(attendance_summary.late_days, 0) + COALESCE(leave_summary.total_leave_days, 0) +
								COALESCE(off_days_summary.total_off_days, 0) + COALESCE(${total_general_holidays}, 0) + COALESCE(${total_special_holidays}, 0),
								0
							)::float8 AS total_days,
							COALESCE(
									(
										(TO_TIMESTAMP(CAST(${year} AS TEXT) || '-' || LPAD(CAST(${month} AS TEXT), 2, '0') || '-01', 'YYYY-MM-DD') + INTERVAL '1 month - 1 day')::date 
										- (TO_TIMESTAMP(CAST(${year} AS TEXT) || '-' || LPAD(CAST(${month} AS TEXT), 2, '0') || '-01', 'YYYY-MM-DD'))::date
										+ 1
									), 0
									)
									- (
									COALESCE(attendance_summary.present_days, 0) + 
									COALESCE(attendance_summary.late_days, 0) + 
									COALESCE(leave_summary.total_leave_days, 0) + 
									COALESCE(${total_general_holidays}::int, 0) + 
									COALESCE(${total_special_holidays}::int, 0)
									)::float8 AS absent_days
					FROM hr.salary_entry se
					LEFT JOIN hr.employee
						ON se.employee_uuid = employee.uuid
					LEFT JOIN hr.users employeeUser
						ON employee.user_uuid = employeeUser.uuid
					LEFT JOIN hr.users createdByUser
						ON se.created_by = createdByUser.uuid
					LEFT JOIN (
						SELECT 
							si.employee_uuid, 
							SUM(si.amount) AS total_salary_increment 
						FROM hr.salary_increment si
					WHERE EXTRACT(YEAR FROM si.effective_date) <= ${year}
						AND EXTRACT(MONTH FROM si.effective_date) <= ${month}
						GROUP BY si.employee_uuid
					) AS total_increment
						ON se.employee_uuid = total_increment.employee_uuid
					LEFT JOIN (
						SELECT 
							pl.employee_uuid,
							COUNT(CASE WHEN pl.punch_time IS NOT NULL AND TO_CHAR(pl.punch_time, 'HH24:MI') < TO_CHAR(shifts.late_time, 'HH24:MI') THEN 1 END) AS present_days,
							COUNT(CASE WHEN pl.punch_time IS NULL AND TO_CHAR(pl.punch_time, 'HH24:MI') >= TO_CHAR(shifts.late_time, 'HH24:MI') THEN 1 END) AS late_days
						FROM hr.punch_log pl
						LEFT JOIN hr.employee e ON pl.employee_uuid = e.uuid
						LEFT JOIN hr.shift_group ON e.shift_group_uuid = shift_group.uuid
						LEFT JOIN hr.shifts ON shift_group.shifts_uuid = shifts.uuid
						WHERE pl.punch_time IS NOT NULL
							AND EXTRACT(YEAR FROM pl.punch_time) = ${year}
							AND EXTRACT(MONTH FROM pl.punch_time) = ${month}
						GROUP BY pl.employee_uuid
						) AS attendance_summary
						ON se.employee_uuid = attendance_summary.employee_uuid
					LEFT JOIN (
						SELECT
								al.employee_uuid,
								SUM(al.to_date::date - al.from_date::date + 1) -
								SUM(
									CASE
										WHEN al.to_date::date > (TO_TIMESTAMP(CAST(${year} AS TEXT) || '-' || LPAD(CAST(${month} AS TEXT), 2, '0') || '-01', 'YYYY-MM-DD') + INTERVAL '1 month - 1 day')::date
											THEN al.to_date::date - (TO_TIMESTAMP(CAST(${year} AS TEXT) || '-' || LPAD(CAST(${month} AS TEXT), 2, '0') || '-01', 'YYYY-MM-DD') + INTERVAL '1 month - 1 day')::date
										ELSE 0
									END
									+
									CASE
										WHEN al.from_date::date < TO_TIMESTAMP(CAST(${year} AS TEXT) || '-' || LPAD(CAST(${month} AS TEXT), 2, '0') || '-01', 'YYYY-MM-DD')::date
											THEN TO_TIMESTAMP(CAST(${year} AS TEXT) || '-' || LPAD(CAST(${month} AS TEXT), 2, '0') || '-01', 'YYYY-MM-DD')::date - al.from_date::date
										ELSE 0
									END
								) AS total_leave_days
							FROM hr.apply_leave al
							WHERE al.approval = 'approved'
							AND (
								EXTRACT(YEAR FROM al.to_date) > ${year}
								OR (EXTRACT(YEAR FROM al.to_date) = ${year} AND EXTRACT(MONTH FROM al.to_date) >= ${month})
							)
							AND (
								EXTRACT(YEAR FROM al.from_date) < ${year}
								OR (EXTRACT(YEAR FROM al.from_date) = ${year} AND EXTRACT(MONTH FROM al.from_date) <= ${month})
							)
							GROUP BY al.employee_uuid
					) AS leave_summary
						ON se.employee_uuid = leave_summary.employee_uuid
					LEFT JOIN (
						WITH params AS (
							SELECT 
								${year}::int AS y, 
								${month}::int AS m,
								make_date(${year}::int, ${month}::int, 1) AS month_start,
								(make_date(${year}::int, ${month}::int, 1) + INTERVAL '1 month - 1 day')::date AS month_end
						),
						roster_periods AS (
							SELECT
								shift_group_uuid,
								effective_date,
								off_days::jsonb,
								LEAD(effective_date) OVER (PARTITION BY shift_group_uuid ORDER BY effective_date) AS next_effective_date
							FROM hr.roster
							WHERE EXTRACT(YEAR FROM effective_date) = (SELECT y FROM params)
							AND EXTRACT(MONTH FROM effective_date) = (SELECT m FROM params)
						),
						date_ranges AS (
							SELECT
								shift_group_uuid,
								GREATEST(effective_date, (SELECT month_start FROM params)) AS period_start,
								LEAST(
									COALESCE(next_effective_date - INTERVAL '1 day', (SELECT month_end FROM params)),
									(SELECT month_end FROM params)
								) AS period_end,
								off_days
							FROM roster_periods
						),
						all_days AS (
							SELECT
								dr.shift_group_uuid,
								d::date AS day,
								dr.off_days
							FROM date_ranges dr
							CROSS JOIN LATERAL generate_series(dr.period_start, dr.period_end, INTERVAL '1 day') AS d
						)
						SELECT
							shift_group_uuid,
							COUNT(*) AS total_off_days
						FROM all_days
						WHERE lower(to_char(day, 'Dy')) = ANY (
							SELECT jsonb_array_elements_text(off_days)
						)
						GROUP BY shift_group_uuid
					) AS off_days_summary
						ON employee.shift_group_uuid = off_days_summary.shift_group_uuid
					WHERE se.year = ${year} AND se.month = ${month}
					ORDER BY se.created_at DESC`;

	const resultPromise = db.execute(query);

	try {
		const data = await resultPromise;
		const toast = {
			status: 200,
			type: 'select all',
			message: 'employee salary details list',
		};
		return res.status(200).json({ toast, data: data.rows });
	} catch (error) {
		next(error);
	}
}
