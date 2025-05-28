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

// export async function employeeSalaryDetailsByYearDate(req, res, next) {
// 	if (!(await validateRequest(req, next))) return;

// 	const { year, month } = req.params;

// const salaryIncrementPromise = db
// 	.select({
// 		employee_uuid: salary_increment.employee_uuid,
// 		total_increment_amount: sum(salary_increment.amount).as(
// 			'total_increment_amount'
// 		),
// 	})
// 	.from(salary_increment)
// 	.where(
// 		sql`EXTRACT(YEAR FROM ${salary_increment.effective_date}) <= ${year}`,
// 		sql`EXTRACT(MONTH FROM ${salary_increment.effective_date}) <= ${month}`
// 	)
// 	.groupBy(salary_increment.employee_uuid)
// 	.as('salaryIncrementPromise');

// const punchLogPromise = db
// 	.select({
// 		employee_uuid: punch_log.employee_uuid,
// 		present_days: sql`
// 			COUNT(
// 				CASE
// 					WHEN ${punch_log.punch_time} IS NOT NULL
// 					AND TO_CHAR(${punch_log.punch_time}, 'HH24:MI') < TO_CHAR(${shifts.late_time}, 'HH24:MI')
// 					THEN 1
// 				END
// 			)
// 		`.as('present_days'),
// 		late_days: sql`
// 			COUNT(
// 				CASE
// 					WHEN ${punch_log.punch_time} IS NOT NULL
// 					AND TO_CHAR(${punch_log.punch_time}, 'HH24:MI') >= TO_CHAR(${shifts.late_time}, 'HH24:MI')
// 					THEN 1
// 				END
// 			)
// 		`.as('late_days'),
// 	})
// 	.from(punch_log)
// 	.leftJoin(employee, eq(punch_log.employee_uuid, employee.uuid))
// 	.leftJoin(shift_group, eq(employee.shift_group_uuid, shift_group.uuid))
// 	.leftJoin(shifts, eq(shift_group.shifts_uuid, shifts.uuid))
// 	.where(
// 		sql`EXTRACT(YEAR FROM ${punch_log.punch_time}) = ${year}`,
// 		sql`EXTRACT(MONTH FROM ${punch_log.punch_time}) = ${month}`
// 	)
// 	.groupBy(employee.uuid)
// 	.as('punchLogPromise');

// const applyLeavePromise = db
// 	.select({
// 		employee_uuid: apply_leave.employee_uuid,
// 		off_days: sql`
//         SUM(
//             LEAST(
//                 DATE_TRUNC('month', ${apply_leave.to_date}) + INTERVAL '1 month - 1 day',
//                 DATE_TRUNC('month', DATE '${year}-${month}-01') + INTERVAL '1 month - 1 day'
//             )
//             -
//             GREATEST(
//                 DATE_TRUNC('month', ${apply_leave.from_date}),
//                 DATE_TRUNC('month', DATE '${year}-${month}-01')
//             )
//             + INTERVAL '1 day'
//         )::int
//     `.as('off_days'),
// 	})
// 	.from(apply_leave)
// 	.where(
// 		sql`${apply_leave.approved} = true`,
// 		sql`(
//         (${apply_leave.from_date} <= DATE_TRUNC('month', DATE '${year}-${month}-01') + INTERVAL '1 month - 1 day')
//         AND
//         (${apply_leave.to_date} >= DATE_TRUNC('month', DATE '${year}-${month}-01'))
//     )`
// 	)
// 	.groupBy(apply_leave.employee_uuid)
// 	.as('applyLeavePromise');

// const resultPromise = db
// 	.select({
// 		uuid: salary_entry.uuid,
// 		employee_uuid: salary_entry.employee_uuid,
// 		employee_name: users.name,
// 		type: salary_entry.type,
// 		amount: decimalToNumber(salary_entry.amount),
// 		month: salary_entry.month,
// 		year: salary_entry.year,
// 		created_by: salary_entry.created_by,
// 		created_by_name: createdByUser.name,
// 		created_at: salary_entry.created_at,
// 		updated_at: salary_entry.updated_at,
// 		remarks: salary_entry.remarks,
// 		total_increment_amount:
// 			salaryIncrementPromise.total_increment_amount,
// 		total_amount: sql`
// 			COALESCE(${salary_entry.amount}, 0) + COALESCE(${salaryIncrementPromise.total_increment_amount}, 0)
// 		`.as('total_amount'),
// 		joining_date: employee.start_date,
// 		present_days: punchLogPromise.present_days,
// 		late_days: punchLogPromise.late_days,
// 		off_days: shift_group.off_days,
// 		leave_days: applyLeavePromise.off_days,
// 		total_days: sql`
// 			COALESCE(${punchLogPromise.present_days}, 0) +
// 			COALESCE(${punchLogPromise.late_days}, 0) +
// 			COALESCE(${shift_group.off_days}, 0) +
// 			COALESCE(${applyLeavePromise.off_days}, 0)
// 		`.as('total_days'),
// 	})
// 	.from(salary_entry)
// 	.leftJoin(
// 		createdByUser,
// 		eq(salary_entry.created_by, createdByUser.uuid)
// 	)
// 	.leftJoin(employee, eq(salary_entry.employee_uuid, employee.uuid))
// 	.leftJoin(users, eq(employee.user_uuid, users.uuid))
// 	.leftJoin(
// 		salaryIncrementPromise,
// 		eq(salary_entry.employee_uuid, salaryIncrementPromise.employee_uuid)
// 	)
// 	.leftJoin(
// 		punchLogPromise,
// 		eq(salary_entry.employee_uuid, punchLogPromise.employee_uuid)
// 	)
// 	.leftJoin(shift_group, eq(employee.shift_group_uuid, shift_group.uuid))
// 	.leftJoin(
// 		applyLeavePromise,
// 		eq(salary_entry.employee_uuid, applyLeavePromise.employee_uuid)
// 	)
// 	.where(eq(salary_entry.year, year), eq(salary_entry.month, month));

// 	const query = sql`
// 					 	SELECT
// 							se.uuid,
// 							se.employee_uuid,
// 							u.name AS employee_name,
// 							se.type,
// 							se.amount::numeric,
// 							se.month,
// 							se.year,
// 							se.created_by,
// 							cu.name AS created_by_name,
// 							se.created_at,
// 							se.updated_at,
// 							se.remarks,
// 							si.total_increment_amount,
// 							COALESCE(se.amount, 0) + COALESCE(si.total_increment_amount, 0) AS total_amount,
// 							e.start_date AS joining_date,
// 							pl.present_days,
// 							pl.late_days,
// 							sg.off_days,
// 							al.off_days AS leave_days,
// 							COALESCE(pl.present_days, 0) +
// 								COALESCE(pl.late_days, 0) +
// 								COALESCE(sg.off_days, 0) +
// 								COALESCE(al.off_days, 0) AS total_days
// 							FROM hr.salary_entry se
// 							LEFT JOIN hr.users cu ON se.created_by = cu.uuid
// 							LEFT JOIN hr.employee e ON se.employee_uuid = e.uuid
// 							LEFT JOIN hr.users u ON e.user_uuid = u.uuid
// 							LEFT JOIN hr.shift_group sg ON e.shift_group_uuid = sg.uuid

// 							-- Salary Increment Subquery
// 							LEFT JOIN (
// 							SELECT
// 								employee_uuid,
// 								SUM(amount) AS total_increment_amount
// 							FROM hr.salary_increment
// 							WHERE
// 								EXTRACT(YEAR FROM effective_date) <= ${year}
// 								AND EXTRACT(MONTH FROM effective_date) <= ${month}
// 							GROUP BY employee_uuid
// 							) si ON se.employee_uuid = si.employee_uuid

// 							-- Punch Log Subquery
// 							LEFT JOIN (
// 							SELECT
// 								pl.employee_uuid,
// 								COUNT(
// 								CASE
// 									WHEN pl.punch_time IS NOT NULL
// 									AND TO_CHAR(pl.punch_time, 'HH24:MI') < TO_CHAR(s.late_time, 'HH24:MI')
// 									THEN 1
// 								END
// 								) AS present_days,
// 								COUNT(
// 								CASE
// 									WHEN pl.punch_time IS NOT NULL
// 									AND TO_CHAR(pl.punch_time, 'HH24:MI') >= TO_CHAR(s.late_time, 'HH24:MI')
// 									THEN 1
// 								END
// 								) AS late_days
// 							FROM hr.punch_log pl
// 							LEFT JOIN hr.employee e ON pl.employee_uuid = e.uuid
// 							LEFT JOIN hr.shift_group sg ON e.shift_group_uuid = sg.uuid
// 							LEFT JOIN hr.shifts s ON sg.shifts_uuid = s.uuid
// 							WHERE
// 								EXTRACT(YEAR FROM pl.punch_time) = ${year}
// 								AND EXTRACT(MONTH FROM pl.punch_time) = ${month}
// 							GROUP BY pl.employee_uuid
// 							) pl ON se.employee_uuid = pl.employee_uuid

// 							-- Apply Leave Subquery
// 							LEFT JOIN (
// 							SELECT
// 								al.employee_uuid,
// 								SUM(
// 								LEAST(
// 									DATE_TRUNC('month', al.to_date) + INTERVAL '1 month - 1 day',
// 									DATE_TRUNC('month', DATE ${year}  || '-' || ${month} || '-01') + INTERVAL '1 month - 1 day'
// 								)
// 								-
// 								GREATEST(
// 									DATE_TRUNC('month', al.from_date),
// 									DATE_TRUNC('month', DATE ${year}  || '-' || ${month} || '-01')
// 								)
// 								+ INTERVAL '1 day'
// 								)::int AS off_days
// 							FROM hr.apply_leave al
// 							WHERE
// 								al.approved = true
// 								AND (
// 								al.from_date <= DATE_TRUNC('month', DATE ${year} || '-' || ${month} || '-01') + INTERVAL '1 month - 1 day'
// 								AND
// 								al.to_date >= DATE_TRUNC('month', DATE ${year} || '-' || ${month} || '-01')
// 								)
// 							GROUP BY al.employee_uuid
// 							) al ON se.employee_uuid = al.employee_uuid

// 							WHERE se.year = ${year} AND se.month = ${month}`;

// 	const resultPromise = db.execute(query);

// 	try {
// 		const data = await resultPromise;
// 		const toast = {
// 			status: 200,
// 			type: 'select all',
// 			message: 'employee salary details list',
// 		};
// 		return res.status(200).json({ toast, data });
// 	} catch (error) {
// 		next(error);
// 	}
// }

// export async function employeeSalaryDetailsByYearDate(req, res, next) {
// 	if (!(await validateRequest(req, next))) return;

// 	const { year, month } = req.params;

// 	// Define CTEs (reusable subqueries)
// 	const salaryIncrementCTE = db
// 		.select({
// 			employee_uuid: salary_increment.employee_uuid,
// 			total_increment_amount: sum(salary_increment.amount).as(
// 				'total_increment_amount'
// 			),
// 		})
// 		.from(salary_increment)
// 		.where(
// 			sql`EXTRACT(YEAR FROM ${salary_increment.effective_date}) <= ${year}`,
// 			sql`EXTRACT(MONTH FROM ${salary_increment.effective_date}) <= ${month}`
// 		)
// 		.groupBy(salary_increment.employee_uuid)
// 		.as('salaryIncrementCTE');

// 	const punchLogCTE = db
// 		.select({
// 			employee_uuid: punch_log.employee_uuid,
// 			present_days: sql`
//                 COUNT(
//                     CASE
//                         WHEN ${punch_log.punch_time} IS NOT NULL
//                         AND TO_CHAR(${punch_log.punch_time}, 'HH24:MI') < TO_CHAR(${shifts.late_time}, 'HH24:MI')
//                         THEN 1
//                     END
//                 )
//             `.as('present_days'),
// 			late_days: sql`
//                 COUNT(
//                     CASE
//                         WHEN ${punch_log.punch_time} IS NOT NULL
//                         AND TO_CHAR(${punch_log.punch_time}, 'HH24:MI') >= TO_CHAR(${shifts.late_time}, 'HH24:MI')
//                         THEN 1
//                     END
//                 )
//             `.as('late_days'),
// 		})
// 		.from(punch_log)
// 		.leftJoin(employee, eq(punch_log.employee_uuid, employee.uuid))
// 		.leftJoin(shift_group, eq(employee.shift_group_uuid, shift_group.uuid))
// 		.leftJoin(shifts, eq(shift_group.shifts_uuid, shifts.uuid))
// 		.where(
// 			sql`EXTRACT(YEAR FROM ${punch_log.punch_time}) = ${year}`,
// 			sql`EXTRACT(MONTH FROM ${punch_log.punch_time}) = ${month}`
// 		)
// 		.groupBy(punch_log.employee_uuid) // Fixed: group by punch_log's employee_uuid
// 		.as('punchLogCTE');

// 	const applyLeaveCTE = db
// 		.select({
// 			employee_uuid: apply_leave.employee_uuid,
// 			off_days: sql`
//                 SUM(
//                     LEAST(
//                         DATE_TRUNC('month', ${apply_leave.to_date}) + INTERVAL '1 month - 1 day',
//                         DATE_TRUNC('month', DATE ${`${year}-${month}-01`}::date) + INTERVAL '1 month - 1 day'
//                     )
//                     -
//                     GREATEST(
//                         DATE_TRUNC('month', ${apply_leave.from_date}),
//                         DATE_TRUNC('month', DATE ${`${year}-${month}-01`}::date)
//                     )
//                     + INTERVAL '1 day'
//                 )::int
//             `.as('off_days'),
// 		})
// 		.from(apply_leave)
// 		.where(
// 			sql`${apply_leave.approved} = true`,
// 			sql`(
//                 (${apply_leave.from_date} <= DATE_TRUNC('month', DATE ${`${year}-${month}-01`}::date) + INTERVAL '1 month - 1 day')
//                 AND
//                 (${apply_leave.to_date} >= DATE_TRUNC('month', DATE ${`${year}-${month}-01`}::date))
//             )`
// 		)
// 		.groupBy(apply_leave.employee_uuid)
// 		.as('applyLeaveCTE');

// 	// Main query using CTEs
// 	const resultPromise = db
// 		.with(salaryIncrementCTE, punchLogCTE, applyLeaveCTE)
// 		.select({
// 			uuid: salary_entry.uuid,
// 			employee_uuid: salary_entry.employee_uuid,
// 			employee_name: users.name,
// 			type: salary_entry.type,
// 			amount: decimalToNumber(salary_entry.amount),
// 			month: salary_entry.month,
// 			year: salary_entry.year,
// 			created_by: salary_entry.created_by,
// 			created_by_name: createdByUser.name,
// 			created_at: salary_entry.created_at,
// 			updated_at: salary_entry.updated_at,
// 			remarks: salary_entry.remarks,
// 			total_increment_amount: salaryIncrementCTE.total_increment_amount,
// 			total_amount: sql`
//                 COALESCE(${salary_entry.amount}, 0) + COALESCE(${salaryIncrementCTE.total_increment_amount}, 0)
//             `.as('total_amount'),
// 			joining_date: employee.start_date,
// 			present_days: punchLogCTE.present_days,
// 			late_days: punchLogCTE.late_days,
// 			off_days: shift_group.off_days,
// 			leave_days: applyLeaveCTE.off_days,
// 			total_days: sql`
//                 COALESCE(${punchLogCTE.present_days}, 0) +
//                 COALESCE(${punchLogCTE.late_days}, 0) +
//                 COALESCE(${shift_group.off_days}, 0) +
//                 COALESCE(${applyLeaveCTE.off_days}, 0)
//             `.as('total_days'),
// 		})
// 		.from(salary_entry)
// 		.leftJoin(
// 			createdByUser,
// 			eq(salary_entry.created_by, createdByUser.uuid)
// 		)
// 		.leftJoin(employee, eq(salary_entry.employee_uuid, employee.uuid))
// 		.leftJoin(users, eq(employee.user_uuid, users.uuid))
// 		.leftJoin(shift_group, eq(employee.shift_group_uuid, shift_group.uuid))
// 		// Join CTEs instead of subqueries
// 		.leftJoin(
// 			salaryIncrementCTE,
// 			eq(salary_entry.employee_uuid, salaryIncrementCTE.employee_uuid)
// 		)
// 		.leftJoin(
// 			punchLogCTE,
// 			eq(salary_entry.employee_uuid, punchLogCTE.employee_uuid)
// 		)
// 		.leftJoin(
// 			applyLeaveCTE,
// 			eq(salary_entry.employee_uuid, applyLeaveCTE.employee_uuid)
// 		)
// 		.where(eq(salary_entry.year, year), eq(salary_entry.month, month));

// 	try {
// 		const data = await resultPromise;
// 		const toast = {
// 			status: 200,
// 			type: 'select all',
// 			message: 'employee salary details list',
// 		};
// 		return res.status(200).json({ toast, data });
// 	} catch (error) {
// 		next(error);
// 	}
// }

// ...existing code...
export async function employeeSalaryDetailsByYearDate(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const { year, month } = req.params;
	// const monthStr = String(month).padStart(2, '0');
	// const periodDate = `${year}-${monthStr}-01`;

	const query = sql`
					SELECT 
							se.uuid as salary_uuid,
							se.employee_uuid,
							employeeUser.name as employee_name,
							se.type,
							se.amount,
							se.month,
							se.year,
							se.created_by,
							createdByUser.name as created_by_name,
							se.created_at,
							se.updated_at,
							se.remarks,
							COALESCE(total_increment.total_salary_increment, 0) AS total_incremented_salary,
							COALESCE(attendance_summary.present_days, 0) AS present_days,
							COALESCE(attendance_summary.late_days, 0) AS late_days,
							COALESCE(leave_summary.total_leave_days, 0) AS total_leave_days,
							COALESCE(
								se.amount + COALESCE(total_increment.total_salary_increment, 0),
								se.amount
							) AS total_salary,
							COALESCE(
								COALESCE(attendance_summary.present_days, 0) + COALESCE(attendance_summary.late_days, 0) + COALESCE(leave_summary.total_leave_days, 0),
								0
							) AS total_days

					FROM hr.salary_entry se
					LEFT JOIN hr.employee
						ON se.employee_uuid = employee.uuid
					LEFT JOIN hr.users employeeUser
						ON se.employee_uuid = employeeUser.uuid
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
							AND EXTRACT(YEAR FROM pl.punch_time) <= ${year}
							AND EXTRACT(MONTH FROM pl.punch_time) <= ${month}
						GROUP BY pl.employee_uuid
						) AS attendance_summary
						ON se.employee_uuid = attendance_summary.employee_uuid
					LEFT JOIN (
						SELECT
							al.employee_uuid,
							SUM(al.to_date::date - al.from_date::date + 1) AS total_leave_days
							FROM hr.apply_leave al
							WHERE al.approval = 'approved'
							AND EXTRACT(YEAR FROM al.from_date) = ${year}
							AND EXTRACT(MONTH FROM al.from_date) = ${month}
						GROUP BY al.employee_uuid
					) AS leave_summary
						ON se.employee_uuid = leave_summary.employee_uuid
					WHERE se.year = ${year} AND se.month = ${month}
					ORDER BY se.created_at DESC
	`;

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
