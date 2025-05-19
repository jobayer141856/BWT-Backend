import {
	boolean,
	integer,
	json,
	numeric,
	pgEnum,
	pgSchema,
	serial,
	text,
} from 'drizzle-orm/pg-core';
import {
	DateTime,
	defaultUUID,
	PG_DECIMAL,
	uuid_primary,
} from '../variables.js';
const hr = pgSchema('hr');

export const department = hr.table('department', {
	uuid: uuid_primary,
	department: text('department').notNull().unique(),
	created_at: DateTime('created_at').notNull(),
	updated_at: DateTime('updated_at').default(null),
	remarks: text('remarks').default(null),
});

export const designation = hr.table('designation', {
	uuid: uuid_primary,
	designation: text('designation').notNull().unique(),
	created_at: DateTime('created_at').notNull(),
	updated_at: DateTime('updated_at').default(null),
	remarks: text('remarks').default(null),
});

export const userTypeEnum = pgEnum('user_type', [
	'employee',
	'customer',
	'vendor',
]);
export const businessTypeEnum = pgEnum('business_type', [
	'individual',
	'company',
	'user',
	'tv_company',
	'corporate',
]);

export const whereTheyFindUsEnum = pgEnum('where_they_find_us', [
	'facebook',
	'youtube',
	'whatsapp',
	'person',
	'instagram',
	'none',
]);

export const users = hr.table('users', {
	uuid: uuid_primary,
	name: text('name').notNull(),
	email: text('email').notNull().unique(),
	pass: text('pass').notNull(),
	designation_uuid: defaultUUID('designation_uuid').references(
		() => designation.uuid
	),
	department_uuid: defaultUUID('department_uuid').references(
		() => department.uuid
	),
	can_access: text('can_access').default('{"profile":["read"]}'),
	ext: text('ext').default(null),
	phone: text('phone').notNull().unique(),
	created_at: text('created_at').notNull(),
	updated_at: text('updated_at').default(null),
	status: text('status').default(0),
	remarks: text('remarks').default(null),
	id: serial('id').notNull().unique(),
	user_type: userTypeEnum('user_type').default('customer'),
	business_type: businessTypeEnum('business_type').default('user'),
	where_they_find_us:
		whereTheyFindUsEnum('where_they_find_us').default('none'),
	rating: integer('rating').default(5),
	price: integer('price').default(5),
});

export const policy_and_notice = hr.table('policy_and_notice', {
	uuid: uuid_primary,
	type: text('type').notNull(),
	title: text('title').notNull(),
	sub_title: text('sub_title').notNull(),
	url: text('url').notNull(),
	created_by: defaultUUID('created_by').references(() => users.uuid),
	created_at: text('created_at').notNull(),
	updated_at: text('updated_at').default(null),
	status: integer('status').notNull(),
	remarks: text('remarks').default(null),
});

// ! HRM

// ? Sub Department
export const sub_department = hr.table('sub_department', {
	uuid: uuid_primary,
	id: serial('id').notNull(),
	name: text('name').notNull(),
	hierarchy: integer('hierarchy').default(0),
	status: boolean('status').default(true),
	created_by: defaultUUID('created_by').references(() => users.uuid),
	created_at: DateTime('created_at').notNull(),
	updated_at: DateTime('updated_at').default(null),
	remarks: text('remarks').default(null),
});

// ? Workplace
export const workplace = hr.table('workplace', {
	uuid: uuid_primary,
	id: serial('id').notNull(),
	name: text('name').notNull(),
	hierarchy: integer('hierarchy').default(0),
	status: boolean('status').default(true),
	latitude: PG_DECIMAL('latitude').default(0),
	longitude: PG_DECIMAL('longitude').default(0),
	created_by: defaultUUID('created_by').references(() => users.uuid),
	created_at: DateTime('created_at').notNull(),
	updated_at: DateTime('updated_at').default(null),
	remarks: text('remarks').default(null),
});

// ? Employment Type
export const employment_type = hr.table('employment_type', {
	uuid: uuid_primary,
	id: serial('id').notNull(),
	name: text('name').notNull(),
	status: boolean('status').default(true),
	created_by: defaultUUID('created_by').references(() => users.uuid),
	created_at: DateTime('created_at').notNull(),
	updated_at: DateTime('updated_at').default(null),
	remarks: text('remarks').default(null),
});

// ? Special Holidays
export const special_holidays = hr.table('special_holidays', {
	uuid: uuid_primary,
	id: serial('id').notNull(),
	name: text('name').notNull(),
	workplace_uuid: defaultUUID('workplace_uuid').references(
		() => workplace.uuid
	),
	from_date: DateTime('from_date').notNull(),
	to_date: DateTime('to_date').notNull(),
	created_by: defaultUUID('created_by').references(() => users.uuid),
	created_at: DateTime('created_at').notNull(),
	updated_at: DateTime('updated_at').default(null),
	remarks: text('remarks').default(null),
});

// ? General Holiday
export const general_holiday = hr.table('general_holidays', {
	uuid: uuid_primary,
	id: serial('id').notNull(),
	name: text('name').notNull(),
	date: DateTime('date').notNull(),
	created_by: defaultUUID('created_by').references(() => users.uuid),
	created_at: DateTime('created_at').notNull(),
	updated_at: DateTime('updated_at').default(null),
	remarks: text('remarks').default(null),
});

// ? Device List
export const device_list = hr.table('device_list', {
	uuid: uuid_primary,
	id: serial('id').notNull(),
	name: text('name').notNull(),
	identifier: numeric('identifier').notNull(),
	location: text('location').default(null),
	connection_status: boolean('connection_status').default(false),
	phone_number: text('phone_number').default(null),
	description: text('description').default(null),
	created_by: defaultUUID('created_by').references(() => users.uuid),
	created_at: DateTime('created_at').notNull(),
	updated_at: DateTime('updated_at').default(null),
	remarks: text('remarks').default(null),
});

// ? Shifts
export const shifts = hr.table('shifts', {
	uuid: uuid_primary,
	id: serial('id').notNull(),
	name: text('name').notNull(),
	start_time: DateTime('start_time').notNull(),
	end_time: DateTime('end_time').notNull(),
	late_time: DateTime('late_time').notNull(),
	early_exit_before: DateTime('early_exit_before').notNull(),
	first_half_end: DateTime('first_half_end').notNull(),
	break_time_end: DateTime('break_time_end').notNull(),
	default_shift: boolean('default_shift').default(false),
	color: text('color').default(null),
	status: boolean('status').default(true),
	created_by: defaultUUID('created_by').references(() => users.uuid),
	created_at: DateTime('created_at').notNull(),
	updated_at: DateTime('updated_at').default(null),
	remarks: text('remarks').default(null),
});

// ? Shift Group
export const off_day_enum = pgEnum('off_day', [
	'sunday',
	'monday',
	'tuesday',
	'wednesday',
	'thursday',
	'friday',
	'saturday',
]);

export const shift_group = hr.table('shift_group', {
	uuid: uuid_primary,
	id: serial('id').notNull(),
	name: text('name').notNull(),
	default_shift: boolean('default_shift').default(false),
	status: boolean('status').default(true),
	off_days: json('off_days').default('[]'),
	created_by: defaultUUID('created_by').references(() => users.uuid),
	created_at: DateTime('created_at').notNull(),
	updated_at: DateTime('updated_at').default(null),
	remarks: text('remarks').default(null),
});

// ? Roster
export const roster = hr.table('roster', {
	uuid: uuid_primary,
	shift_group_uuid: defaultUUID('shift_group_uuid').references(
		() => shift_group.uuid
	),
	shifts_uuid: defaultUUID('shifts_uuid').references(() => shifts.uuid),
	created_by: defaultUUID('created_by').references(() => users.uuid),
	created_at: DateTime('created_at').notNull(),
	updated_at: DateTime('updated_at').default(null),
	remarks: text('remarks').default(null),
});

// ? Leave Policy
export const leave_policy = hr.table('leave_policy', {
	uuid: uuid_primary,
	id: serial('id').notNull(),
	name: text('name').notNull(),
	created_by: defaultUUID('created_by').references(() => users.uuid),
	created_at: DateTime('created_at').notNull(),
	updated_at: DateTime('updated_at').default(null),
	remarks: text('remarks').default(null),
});

// ? Leave Category
export const leave_category = hr.table('leave_category', {
	uuid: uuid_primary,
	id: serial('id').notNull(),
	name: text('name').notNull(),
	created_by: defaultUUID('created_by').references(() => users.uuid),
	created_at: DateTime('created_at').notNull(),
	updated_at: DateTime('updated_at').default(null),
	remarks: text('remarks').default(null),
});

// ? Configuration
export const configuration = hr.table('configuration', {
	uuid: uuid_primary,
	id: serial('id').notNull(),
	leave_policy_uuid: defaultUUID('leave_policy_uuid').references(
		() => leave_policy.uuid
	),
	created_by: defaultUUID('created_by').references(() => users.uuid),
	created_at: DateTime('created_at').notNull(),
	updated_at: DateTime('updated_at').default(null),
	remarks: text('remarks').default(null),
});

// ? Configuration Entry
export const leave_carry_type_enum = pgEnum('leave_carry_type', [
	'none',
	'fixed_amount',
	'percentage',
]);

export const applicability_enum = pgEnum('applicability', [
	'both',
	'male',
	'female',
	'other',
]);

export const configuration_entry = hr.table('configuration_entry', {
	uuid: uuid_primary,
	id: serial('id').notNull(),
	configuration_uuid: defaultUUID('configuration_uuid').references(
		() => configuration.uuid
	),
	leave_category_uuid: defaultUUID('leave_category_uuid').references(
		() => leave_category.uuid
	),
	number_of_leaves_to_provide_file: integer(
		'number_of_leaves_to_provide_file'
	).default(0),
	maximum_number_of_allowed_leaves: integer(
		'maximum_number_of_allowed_leaves'
	).default(0),
	leave_carry_type: leave_carry_type_enum('leave_carry_type').default('none'),
	consecutive_days: integer('consecutive_days').default(0),
	maximum_number_of_leaves_to_carry: integer(
		'maximum_number_of_leaves_to_carry'
	).default(0),
	count_off_days_as_leaves: boolean('count_off_days_as_leaves').default(
		false
	),
	enable_previous_day_selection: boolean(
		'enable_previous_day_selection'
	).default(false),
	maximum_number_of_leave_per_month: integer(
		'maximum_number_of_leave_per_month'
	).default(0),
	previous_date_selected_limit: integer(
		'previous_date_selected_limit'
	).default(0),
	applicability: applicability_enum('applicability').default('both'),
	eligible_after_joining: integer('eligible_after_joining').default(0),
	enable_pro_rata: boolean('enable_pro_rata').default(false),
	max_avail_time: integer('max_avail_time').default(0),
	enable_earned_leave: boolean('enable_earned_leave').default(false),
	created_by: defaultUUID('created_by').references(() => users.uuid),
	created_at: DateTime('created_at').notNull(),
	updated_at: DateTime('updated_at').default(null),
	remarks: text('remarks').default(null),
});

// ? Employee
export const genderEnum = pgEnum('gender_enum', ['male', 'female', 'other']);

export const employee = hr.table('employee', {
	uuid: uuid_primary,
	id: serial('id').notNull(),
	gender: genderEnum('gender').default('male'),
	user_uuid: defaultUUID('user_uuid').references(() => users.uuid),
	start_date: DateTime('start_date').default(null),
	workplace_uuid: defaultUUID('workplace_uuid').references(
		() => workplace.uuid
	),
	rfid: text('rfid').default(null),
	sub_department_uuid: defaultUUID('sub_department_uuid').references(
		() => sub_department.uuid
	),
	primary_display_text: text('primary_display_text').default(null),
	secondary_display_text: text('secondary_display_text').default(null),
	configuration_uuid: defaultUUID('configuration_uuid').references(
		() => configuration.uuid
	), // for leave policy
	employment_type_uuid: defaultUUID('employment_type_uuid').references(
		() => employment_type.uuid
	),
	end_date: DateTime('end_date').default(null),
	shift_group_uuid: defaultUUID('shift_group_uuid').references(
		() => shift_group.uuid
	),
	line_manager_uuid: defaultUUID('line_manager_uuid').references(
		() => users.uuid
	),
	hr_manager_uuid: defaultUUID('hr_manager_uuid').references(
		() => users.uuid
	),
	is_admin: boolean('is_admin').default(false),
	is_hr: boolean('is_hr').default(false),
	is_line_manager: boolean('is_line_manager').default(false),
	allow_over_time: boolean('allow_over_time').default(false),
	exclude_from_attendance: boolean('exclude_from_attendance').default(false),
	status: boolean('status').default(true),
	created_by: defaultUUID('created_by').references(() => users.uuid),
	created_at: DateTime('created_at').notNull(),
	updated_at: DateTime('updated_at').default(null),
	remarks: text('remarks').default(null),
	name: text('name').notNull(),
	email: text('email').notNull().unique(),
	pass: text('pass').notNull(),
	designation_uuid: defaultUUID('designation_uuid').references(
		() => designation.uuid
	),
	department_uuid: defaultUUID('department_uuid').references(
		() => department.uuid
	),
	company_id: boolean('company_id').default(false),
});

export const device_permission = hr.table('device_permission', {
	uuid: uuid_primary,
	id: serial('id').notNull(),
	device_list_uuid: defaultUUID('device_list_uuid').references(
		() => device_list.uuid
	),
	employee_uuid: defaultUUID('employee_uuid').references(() => employee.uuid),
	is_temporary_access: boolean('is_temporary_access').default(false),
	temporary_from_date: DateTime('temporary_from_date').default(null),
	temporary_to_date: DateTime('temporary_to_date').default(null),
	rfid_access: boolean('rfid_access').default(false),
	fingerprint_access: boolean('fingerprint_access').default(false),
	face_access: boolean('face_access').default(false),
	created_by: defaultUUID('created_by').references(() => users.uuid),
	created_at: DateTime('created_at').notNull(),
	updated_at: DateTime('updated_at').default(null),
	remarks: text('remarks').default(null),
});

// ? Punch Log
export const punch_type = pgEnum('punch_type', ['face', 'fingerprint', 'rfid']);

export const punch_log = hr.table('punch_log', {
	uuid: uuid_primary,
	employee_uuid: defaultUUID('employee_uuid').references(() => employee.uuid),
	device_list_uuid: defaultUUID('device_list_uuid').references(
		() => device_list.uuid
	),
	punch_type: punch_type('punch_type').default('face'),
	punch_time: DateTime('punch_time').notNull(),
});

// ? Manual Entry
export const manual_entry_type_enum = pgEnum('manual_entry_type_enum', [
	'manual_entry',
	'missing_punch',
	'field_visit',
]);

export const manual_entry = hr.table('manual_entry', {
	uuid: uuid_primary,
	employee_uuid: defaultUUID('employee_uuid').references(() => employee.uuid),
	type: manual_entry_type_enum('type').default('manual_entry'),
	entry_time: DateTime('entry_time').default(null),
	exit_time: DateTime('exit_time').default(null),
	reason: text('reason').notNull(),
	area: text('area').default(null),
	created_by: defaultUUID('created_by').references(() => users.uuid),
	created_at: DateTime('created_at').notNull(),
	updated_at: DateTime('updated_at').default(null),
	remarks: text('remarks').default(null),
});

// ? Apply Leave
export const apply_leave_type_enum = pgEnum('apply_leave_type_enum', [
	'full',
	'half',
]);

export const apply_leave = hr.table('apply_leave', {
	uuid: uuid_primary,
	employee_uuid: defaultUUID('employee_uuid').references(() => employee.uuid),
	leave_category_uuid: defaultUUID('leave_category_uuid').references(
		() => leave_category.uuid
	),
	year: integer('year').notNull(),
	type: apply_leave_type_enum('type').default('full'),
	from_date: DateTime('from_date').notNull(),
	to_date: DateTime('to_date').notNull(),
	reason: text('reason').notNull(),
	file: text('file').default(null),
	created_by: defaultUUID('created_by').references(() => users.uuid),
	created_at: DateTime('created_at').notNull(),
	updated_at: DateTime('updated_at').default(null),
	remarks: text('remarks').default(null),
});

// ? Apply Balance
export const apply_balance = hr.table('apply_balance', {
	uuid: uuid_primary,
	employee_uuid: defaultUUID('employee_uuid').references(() => employee.uuid),
	leave_category_uuid: defaultUUID('leave_category_uuid').references(
		() => leave_category.uuid
	),
	year: integer('year').notNull(),
	days_count: integer('days_count').notNull(),
	reason: text('reason').notNull(),
	file: text('file').default(null),
	created_by: defaultUUID('created_by').references(() => users.uuid),
	created_at: DateTime('created_at').notNull(),
	updated_at: DateTime('updated_at').default(null),
	remarks: text('remarks').default(null),
});

// ? payroll occasional

export const payroll_occasional = hr.table('payroll_occasional', {
	uuid: uuid_primary,
	employee_uuid: defaultUUID('employee_uuid').references(() => employee.uuid),
	month: integer('month'),
	year: integer('year'),
	special_holidays_uuid: defaultUUID('special_holiday_uuid').references(
		() => special_holidays.uuid
	),
	amount: PG_DECIMAL('amount').default(0),
	created_by: defaultUUID('created_by').references(() => users.uuid),
	created_at: DateTime('created_at').notNull(),
	updated_at: DateTime('updated_at').default(null),
	remarks: text('remarks').default(null),
});

// ? payroll increment
export const payroll_increment = hr.table('payroll_increment', {
	uuid: uuid_primary,
	employee_uuid: defaultUUID('employee_uuid').references(() => employee.uuid),
	salary: PG_DECIMAL('salary').notNull(),
	effective_date: DateTime('effective_date'),
	created_by: defaultUUID('created_by').references(() => users.uuid),
	created_at: DateTime('created_at').notNull(),
	updated_at: DateTime('updated_at').default(null),
	remarks: text('remarks').default(null),
});

// ? payroll entry
export const payroll_entry_type_enum = pgEnum('payroll_entry_type_enum', [
	'full',
	'partial',
]);
export const payroll_entry = hr.table('payroll_entry', {
	uuid: uuid_primary,
	employee_uuid: defaultUUID('employee_uuid').references(() => employee.uuid),
	type: payroll_entry_type_enum('type').default('full'),
	salary: PG_DECIMAL('salary').notNull(),
	month: integer('month').notNull(),
	year: integer('year').notNull(),
	created_by: defaultUUID('created_by').references(() => users.uuid),
	created_at: DateTime('created_at').notNull(),
	updated_at: DateTime('updated_at').default(null),
	remarks: text('remarks').default(null),
});

export default hr;
