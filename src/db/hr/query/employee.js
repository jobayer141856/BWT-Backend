import { desc, eq, sql } from 'drizzle-orm';
import { alias } from 'drizzle-orm/pg-core';
import { validateRequest } from '../../../util/index.js';
import { createApi } from '../../../util/api.js';
import db from '../../index.js';
import {
	ComparePass,
	CreateToken,
	HashPass,
} from '../../../middleware/auth.js';
import {
	department,
	designation,
	employee,
	leave_policy,
	shift_group,
	sub_department,
	users,
	workplace,
	employment_type,
} from '../schema.js';

const createdByUser = alias(users, 'created_by_user');

export async function insert(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const hashPassword = await HashPass(req.body.pass);

	const employeePromise = db
		.insert(employee)
		.values({
			...req.body,
			pass: hashPassword,
		})
		.returning({ insertedName: employee.name });

	try {
		const data = await employeePromise;
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

	const employeePromise = db
		.update(employee)
		.set(req.body)
		.where(eq(employee.uuid, req.params.uuid))
		.returning({ updatedName: employee.name });

	try {
		const data = await employeePromise;
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

	const employeePromise = db
		.delete(employee)
		.where(eq(employee.uuid, req.params.uuid))
		.returning({ deletedName: employee.name });

	try {
		const data = await employeePromise;
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
			uuid: employee.uuid,
			id: employee.id,
			gender: employee.gender,
			employee_name: employee.name,
			user_uuid: employee.user_uuid,
			users_name: users.name,
			start_date: employee.start_date,
			workplace_uuid: employee.workplace_uuid,
			workplace_name: workplace.name,
			rfid: employee.rfid,
			sub_department_uuid: employee.sub_department_uuid,
			sub_department_name: sub_department.name,
			primary_display_text: employee.primary_display_text,
			secondary_display_text: employee.secondary_display_text,
			configuration_uuid: employee.configuration_uuid,
			employment_type_uuid: employee.employment_type_uuid,
			employment_type_name: employment_type.name,
			end_date: employee.end_date,
			shift_group_uuid: employee.shift_group_uuid,
			shift_group_name: shift_group.name,
			line_manager_uuid: employee.line_manager_uuid,
			hr_manager_uuid: employee.hr_manager_uuid,
			is_admin: employee.is_admin,
			is_hr: employee.is_hr,
			is_line_manager: employee.is_line_manager,
			allow_over_time: employee.allow_over_time,
			exclude_from_attendance: employee.exclude_from_attendance,
			status: employee.status,
			created_by: employee.created_by,
			created_by_name: createdByUser.name,
			created_at: employee.created_at,
			updated_at: employee.updated_at,
			remarks: employee.remarks,
			name: employee.name,
			email: employee.email,
			pass: employee.pass,
			designation_uuid: employee.designation_uuid,
			designation_name: designation.designation,
			department_uuid: employee.department_uuid,
			department_name: department.department,
			employee_id: employee.employee_id,
			leave_policy_uuid: employee.leave_policy_uuid,
			leave_policy_name: leave_policy.name,
			report_position: employee.report_position,
		})
		.from(employee)
		.leftJoin(users, eq(employee.user_uuid, users.uuid))
		.leftJoin(workplace, eq(employee.workplace_uuid, workplace.uuid))
		.leftJoin(
			sub_department,
			eq(employee.sub_department_uuid, sub_department.uuid)
		)
		.leftJoin(createdByUser, eq(employee.created_by, createdByUser.uuid))
		.leftJoin(shift_group, eq(employee.shift_group_uuid, shift_group.uuid))
		.leftJoin(designation, eq(employee.designation_uuid, designation.uuid))
		.leftJoin(department, eq(employee.department_uuid, department.uuid))
		.leftJoin(
			leave_policy,
			eq(employee.leave_policy_uuid, leave_policy.uuid)
		)
		.leftJoin(
			employment_type,
			eq(employee.employment_type_uuid, employment_type.uuid)
		)
		.orderBy(desc(employee.created_at));

	try {
		const data = await resultPromise;
		const toast = {
			status: 200,
			type: 'select all',
			message: 'employee list',
		};

		return res.status(200).json({ toast, data });
	} catch (error) {
		next(error);
	}
}

export async function select(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const employeePromise = db
		.select({
			uuid: employee.uuid,
			id: employee.id,
			gender: employee.gender,
			employee_name: employee.name,
			user_uuid: employee.user_uuid,
			users_name: users.name,
			start_date: employee.start_date,
			workplace_uuid: employee.workplace_uuid,
			workplace_name: workplace.name,
			rfid: employee.rfid,
			sub_department_uuid: employee.sub_department_uuid,
			sub_department_name: sub_department.name,
			primary_display_text: employee.primary_display_text,
			secondary_display_text: employee.secondary_display_text,
			configuration_uuid: employee.configuration_uuid,
			employment_type_uuid: employee.employment_type_uuid,
			employment_type_name: employment_type.name,
			end_date: employee.end_date,
			shift_group_uuid: employee.shift_group_uuid,
			shift_group_name: shift_group.name,
			line_manager_uuid: employee.line_manager_uuid,
			hr_manager_uuid: employee.hr_manager_uuid,
			is_admin: employee.is_admin,
			is_hr: employee.is_hr,
			is_line_manager: employee.is_line_manager,
			allow_over_time: employee.allow_over_time,
			exclude_from_attendance: employee.exclude_from_attendance,
			status: employee.status,
			created_by: employee.created_by,
			created_by_name: createdByUser.name,
			created_at: employee.created_at,
			updated_at: employee.updated_at,
			remarks: employee.remarks,
			name: employee.name,
			email: employee.email,
			pass: employee.pass,
			designation_uuid: employee.designation_uuid,
			designation_name: designation.designation,
			department_uuid: employee.department_uuid,
			department_name: department.department,
			employee_id: employee.employee_id,
			leave_policy_uuid: employee.leave_policy_uuid,
			leave_policy_name: leave_policy.name,
			report_position: employee.report_position,
		})
		.from(employee)
		.leftJoin(users, eq(employee.user_uuid, users.uuid))
		.leftJoin(workplace, eq(employee.workplace_uuid, workplace.uuid))
		.leftJoin(
			sub_department,
			eq(employee.sub_department_uuid, sub_department.uuid)
		)
		.leftJoin(createdByUser, eq(employee.created_by, createdByUser.uuid))
		.leftJoin(shift_group, eq(employee.shift_group_uuid, shift_group.uuid))
		.leftJoin(designation, eq(employee.designation_uuid, designation.uuid))
		.leftJoin(department, eq(employee.department_uuid, department.uuid))
		.leftJoin(
			leave_policy,
			eq(employee.leave_policy_uuid, leave_policy.uuid)
		)
		.leftJoin(
			employment_type,
			eq(employee.employment_type_uuid, employment_type.uuid)
		)
		.where(eq(employee.uuid, req.params.uuid));
	try {
		const data = await employeePromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'employee',
		};
		return res.status(200).json({ toast, data: data[0] });
	} catch (error) {
		next(error);
	}
}

export async function manualEntryDetailsByEmployee(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const { employee_uuid } = req.params;

	try {
		const api = await createApi(req);
		const fetchData = async (endpoint) =>
			await api
				.get(`${endpoint}/${employee_uuid}`)
				.then((response) => response.data)
				.catch((error) => {
					throw error;
				});

		const [employee, manual_entry] = await Promise.all([
			fetchData('/hr/employee'),
			fetchData('/hr/manual-entry/by'),
		]);

		const response = {
			...employee?.data,
			field_visit: manual_entry?.data || [],
		};

		const toast = {
			status: 200,
			type: 'select',
			message: 'manual_entry details by employee',
		};
		return res.status(200).json({ toast, data: response });
	} catch (error) {
		next(error);
	}
}

export async function employeeLeaveInformationDetails(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const { employee_uuid } = req.params;

	const { apply_leave_uuid } = req.query;

	const employeeLeaveInformationPromise = db
		.select({
			uuid: employee.uuid,
			id: employee.id,
			gender: employee.gender,
			employee_name: employee.name,
			user_uuid: employee.user_uuid,
			users_name: users.name,
			start_date: employee.start_date,
			workplace_uuid: employee.workplace_uuid,
			workplace_name: workplace.name,
			rfid: employee.rfid,
			sub_department_uuid: employee.sub_department_uuid,
			sub_department_name: sub_department.name,
			primary_display_text: employee.primary_display_text,
			secondary_display_text: employee.secondary_display_text,
			configuration_uuid: employee.configuration_uuid,
			employment_type_uuid: employee.employment_type_uuid,
			employment_type_name: employment_type.name,
			end_date: employee.end_date,
			shift_group_uuid: employee.shift_group_uuid,
			shift_group_name: shift_group.name,
			line_manager_uuid: employee.line_manager_uuid,
			hr_manager_uuid: employee.hr_manager_uuid,
			is_admin: employee.is_admin,
			is_hr: employee.is_hr,
			is_line_manager: employee.is_line_manager,
			allow_over_time: employee.allow_over_time,
			exclude_from_attendance: employee.exclude_from_attendance,
			status: employee.status,
			created_by: employee.created_by,
			created_by_name: createdByUser.name,
			created_at: employee.created_at,
			updated_at: employee.updated_at,
			remarks: employee.remarks,
			name: employee.name,
			email: employee.email,
			//pass: employee.pass,
			designation_uuid: employee.designation_uuid,
			designation_name: designation.designation,
			department_uuid: employee.department_uuid,
			department_name: department.department,
			employee_id: employee.employee_id,
			leave_policy_uuid: employee.leave_policy_uuid,
			leave_policy_name: leave_policy.name,
			report_position: employee.report_position,
			remaining_leave_information: sql`
								(
									SELECT jsonb_agg(
										jsonb_build_object(
											'uuid', leave_category.uuid,
											'name', leave_category.name,
											'maximum_number_of_allowed_leaves', configuration_entry.maximum_number_of_allowed_leaves,
											'used_leave_days', COALESCE(leave_summary.total_leave_days, 0),
											'remaining_leave_days',
												COALESCE(
													configuration_entry.maximum_number_of_allowed_leaves - COALESCE(leave_summary.total_leave_days, 0),
													configuration_entry.maximum_number_of_allowed_leaves
												)
										)
									)
									FROM hr.employee
									LEFT JOIN hr.leave_policy ON employee.leave_policy_uuid = leave_policy.uuid
									LEFT JOIN hr.configuration
										ON leave_policy.uuid = configuration.leave_policy_uuid
									LEFT JOIN hr.configuration_entry
										ON configuration_entry.configuration_uuid = configuration.uuid
									LEFT JOIN hr.leave_category
										ON leave_category.uuid = configuration_entry.leave_category_uuid
									LEFT JOIN (
										SELECT
											apply_leave.employee_uuid,
											apply_leave.leave_category_uuid,
											SUM(apply_leave.to_date::date - apply_leave.from_date::date + 1) AS total_leave_days
										FROM hr.apply_leave
										WHERE apply_leave.approval = 'approved' AND apply_leave.employee_uuid = ${employee_uuid}
										GROUP BY apply_leave.employee_uuid, apply_leave.leave_category_uuid
									) AS leave_summary
										ON leave_summary.employee_uuid = employee.uuid
										AND leave_summary.leave_category_uuid = leave_category.uuid
									WHERE leave_policy.uuid = ${employee.leave_policy_uuid}
								)`,
			leave_application_information: sql`
								(
									SELECT COALESCE(
										jsonb_build_object(
											'uuid', apply_leave.uuid,
											'leave_category_uuid', apply_leave.leave_category_uuid,
											'leave_category_name', leave_category.name,
											'employee_uuid', apply_leave.employee_uuid,
											'employee_name', employee.name,
											'type', apply_leave.type,
											'from_date', apply_leave.from_date,
											'to_date', apply_leave.to_date,
											'reason', apply_leave.reason,
											'file', apply_leave.file,
											'approval', apply_leave.approval,
											'created_at', apply_leave.created_at,
											'updated_at', apply_leave.updated_at,
											'remarks', apply_leave.remarks,
											'created_by', apply_leave.created_by,
											'created_by_name', createdByUser.name
										), '{}'::jsonb
									)
									FROM hr.apply_leave
									LEFT JOIN hr.leave_category
										ON apply_leave.leave_category_uuid = leave_category.uuid
									LEFT JOIN hr.employee
										ON apply_leave.employee_uuid = employee.uuid
									LEFT JOIN hr.users AS createdByUser
										ON apply_leave.created_by = createdByUser.uuid
									WHERE apply_leave.employee_uuid = ${employee_uuid} AND 
									apply_leave.uuid = ${apply_leave_uuid}
								)`,
			last_five_leave_applications: sql`
											(
												SELECT COALESCE(
													jsonb_agg(
														jsonb_build_object(
															'uuid', t.uuid,
															'leave_category_uuid', t.leave_category_uuid,
															'leave_category_name', t.leave_category_name,
															'employee_uuid', t.employee_uuid,
															'employee_name', t.employee_name,
															'type', t.type,
															'from_date', t.from_date,
															'to_date', t.to_date,
															'reason', t.reason,
															'file', t.file,
															'approval', t.approval,
															'created_at', t.created_at,
															'updated_at', t.updated_at,
															'remarks', t.remarks,
															'created_by', t.created_by,
															'created_by_name', t.created_by_name
														)
													), '[]'::jsonb
												)
												FROM (
													SELECT
														apply_leave.uuid,
														apply_leave.leave_category_uuid,
														leave_category.name AS leave_category_name,
														apply_leave.employee_uuid,
														employee.name AS employee_name,
														apply_leave.type,
														apply_leave.from_date,
														apply_leave.to_date,
														apply_leave.reason,
														apply_leave.file,
														apply_leave.approval,
														apply_leave.created_at,
														apply_leave.updated_at,
														apply_leave.remarks,
														apply_leave.created_by,
														created_by_user.name AS created_by_name
													FROM hr.apply_leave
													LEFT JOIN hr.leave_category
														ON apply_leave.leave_category_uuid = leave_category.uuid
													LEFT JOIN hr.employee
														ON apply_leave.employee_uuid = employee.uuid
													LEFT JOIN hr.users AS created_by_user
														ON apply_leave.created_by = created_by_user.uuid
													WHERE apply_leave.employee_uuid = ${employee_uuid}
													ORDER BY apply_leave.created_at DESC
													LIMIT 5
												) t
											)
										`,
		})
		.from(employee)
		.leftJoin(users, eq(employee.user_uuid, users.uuid))
		.leftJoin(workplace, eq(employee.workplace_uuid, workplace.uuid))
		.leftJoin(
			sub_department,
			eq(employee.sub_department_uuid, sub_department.uuid)
		)
		.leftJoin(createdByUser, eq(employee.created_by, createdByUser.uuid))
		.leftJoin(shift_group, eq(employee.shift_group_uuid, shift_group.uuid))
		.leftJoin(designation, eq(employee.designation_uuid, designation.uuid))
		.leftJoin(department, eq(employee.department_uuid, department.uuid))
		.leftJoin(
			leave_policy,
			eq(employee.leave_policy_uuid, leave_policy.uuid)
		)
		.leftJoin(
			employment_type,
			eq(employee.employment_type_uuid, employment_type.uuid)
		)
		.where(eq(employee.uuid, employee_uuid));

	try {
		const data = await employeeLeaveInformationPromise;
		const toast = {
			status: 200,
			type: 'select',
			message: 'employee leave information details',
		};
		return res.status(200).json({ toast, data: data[0] });
	} catch (error) {
		next(error);
	}
}

export async function loginUser(req, res, next) {
	if (!(await validateRequest(req, next))) return;

	const { email, pass } = req.body;

	const userPromise = db
		.select({
			uuid: employee.uuid,
			name: employee.name,
			email: employee.email,
			pass: employee.pass,
			designation_uuid: employee.designation_uuid,
			department_uuid: employee.department_uuid,
			created_at: employee.created_at,
			updated_at: employee.updated_at,
			status: employee.status,
			remarks: employee.remarks,
			designation: designation.designation,
			department: department.department,
		})
		.from(employee)
		.leftJoin(designation, eq(employee.designation_uuid, designation.uuid))
		.leftJoin(department, eq(employee.department_uuid, department.uuid))
		.where(eq(employee.email, email));

	const USER = await userPromise;

	if (USER[0].length === 0) {
		return next(new CustomError('User not found', 404));
	}

	if (USER[0].status) {
		return res.status(200).json({
			status: 400,
			type: 'delete',
			message: 'User is not active',
		});
	}

	await ComparePass(pass, USER[0].pass).then((result) => {
		if (!result) {
			return res.status(200).json({
				status: 400,
				type: 'delete',
				message: 'Email/Password combination incorrect',
			});
		}

		const token = CreateToken(USER[0]);
		const { uuid, name, department } = USER[0];
		if (!token.success) {
			return res.status(500).json({ error: 'Error signing token' });
		}

		return res.status(200).json({
			status: 201,
			type: 'create',
			message: 'User logged in',
			token: token.token,
			user: { uuid, name, department },
		});
	});
}
