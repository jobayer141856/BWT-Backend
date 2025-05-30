import SE, { SED } from '../../../util/swagger_example.js';

const defProblem = SED({
	required: ['uuid', 'name', 'created_at'],
	properties: {
		uuid: SE.uuid(),
		name: SE.string('Problem 1'),
		category: SE.type_enum('customer', 'employee'),
		created_by: SE.uuid(),
		created_at: SE.date_time(),
		updated_at: SE.date_time(),
		remarks: SE.string('remarks'),
	},
	xml: 'Work/Problem',
});

const defInfo = SED({
	required: [
		'id',
		'uuid',
		'user_uuid',
		'received_date',
		'is_product_received',
		'created_at',
	],
	properties: {
		id: SE.integer(),
		uuid: SE.uuid(),
		user_uuid: SE.uuid(),
		received_date: SE.date_time(),
		is_product_received: SE.boolean(),
		created_by: SE.uuid(),
		created_at: SE.date_time(),
		updated_at: SE.date_time(),
		remarks: SE.string('remarks'),
		location: SE.string('location'),
		zone_uuid: SE.uuid(),
	},
	xml: 'Work/Info',
});

const defOrder = SED({
	required: [
		'uuid',
		'model_uuid',
		'size_uuid',
		'serial_no',
		'problem_statement',
		'warehouse_uuid',
		'rack_uuid',
		'floor_uuid',
		'box_uuid',
		'created_at',
	],
	properties: {
		id: SE.integer(),
		uuid: SE.uuid(),
		model_uuid: SE.uuid(),
		size_uuid: SE.uuid(),
		serial_no: SE.string('serial_no'),
		problems_uuid: SE.array(),
		problem_statement: SE.string('problem_statement'),
		accessories: SE.array(),
		warehouse_uuid: SE.uuid(),
		rack_uuid: SE.uuid(),
		floor_uuid: SE.uuid(),
		box_uuid: SE.uuid(),
		created_by: SE.uuid(),
		created_at: SE.date_time(),
		updated_at: SE.date_time(),
		remarks: SE.string('remarks'),
		is_diagnosis_need: SE.boolean(),
		quantity: SE.integer(),
		is_transferred_for_qc: SE.boolean(),
		is_ready_for_delivery: SE.boolean(),
	},
	xml: 'Work/Order',
});

const defDiagnosis = SED({
	required: [
		'id',
		'uuid',
		'order_uuid',
		'engineer_uuid',
		'problem_statement',
		'status',
		'status_update_date',
		'created_at',
	],
	properties: {
		id: SE.integer(),
		uuid: SE.uuid(),
		order_uuid: SE.uuid(),
		engineer_uuid: SE.uuid(),
		problems_uuid: SE.array(),
		problem_statement: SE.string('problem_statement'),
		status: SE.boolean(),
		status_update_date: SE.date_time(),
		proposed_cost: SE.number(),
		is_proceed_to_repair: SE.boolean(),
		created_by: SE.uuid(),
		created_at: SE.date_time(),
		updated_at: SE.date_time(),
		remarks: SE.string('remarks'),
		customer_problem_statement: SE.string('customer_problem_statement'),
		customer_remarks: SE.string('customer_remarks'),
	},
	xml: 'Work/Diagnosis',
});

const defSection = SED({
	required: ['uuid', 'name', 'created_at'],
	properties: {
		uuid: SE.uuid(),
		name: SE.string('Section 1'),
		created_by: SE.uuid(),
		created_at: SE.date_time(),
		updated_at: SE.date_time(),
		remarks: SE.string('remarks'),
	},
	xml: 'Work/Section',
});

const defProcess = SED({
	required: [
		'id',
		'uuid',
		'section_uuid',
		'diagnosis_uuid',
		'engineer_uuid',
		'problems_uuid',
		'problem_statement',
		'status',
		'status_update_date',
		'proposed_cost',
		'is_proceed_to_repair',
		'warehouse_uuid',
		'rack_uuid',
		'floor_uuid',
		'box_uuid',
		'created_by',
		'created_at',
	],
	properties: {
		id: SE.integer(),
		uuid: SE.uuid(),
		section_uuid: SE.uuid(),
		diagnosis_uuid: SE.uuid(),
		engineer_uuid: SE.uuid(),
		problems_uuid: SE.array(),
		problem_statement: SE.string('problem_statement'),
		status: SE.boolean(),
		status_update_date: SE.date_time(),
		proposed_cost: SE.number(),
		is_proceed_to_repair: SE.boolean(),
		warehouse_uuid: SE.uuid(),
		rack_uuid: SE.uuid(),
		floor_uuid: SE.uuid(),
		box_uuid: SE.uuid(),
		created_by: SE.uuid(),
		created_at: SE.date_time(),
		updated_at: SE.date_time(),
		remarks: SE.string('remarks'),
	},
	xml: 'Work/Process',
});

const defAccessory = SED({
	required: ['uuid', 'name', 'created_at'],
	properties: {
		uuid: SE.uuid(),
		name: SE.string('Accessory 1'),
		created_by: SE.uuid(),
		created_at: SE.date_time(),
		updated_at: SE.date_time(),
		remarks: SE.string('remarks'),
	},
	xml: 'Work/Accessory',
});

const defZone = SED({
	required: ['uuid', 'name', 'division', 'created_at'],
	properties: {
		uuid: SE.uuid(),
		name: SE.string('Zone 1'),
		division: SE.string('Zone 1 Division'),
		latitude: SE.string('Zone 1 Latitude'),
		longitude: SE.string('Zone 1 Longitude'),
		created_by: SE.uuid(),
		created_at: SE.date_time(),
		updated_at: SE.date_time(),
		remarks: SE.string('remarks'),
	},
	xml: 'Work/Zone',
});

//* Marge all
export const defWork = {
	problem: defProblem,
	info: defInfo,
	order: defOrder,
	diagnosis: defDiagnosis,
	section: defSection,
	process: defProcess,
	accessory: defAccessory,
	zone: defZone,
};

//* Tag
export const tagWork = [
	{
		name: 'work.problem',
		description: 'Work Problem',
	},
	{
		name: 'work.info',
		description: 'Work Info',
	},
	{
		name: 'work.order',
		description: 'Work Order',
	},
	{
		name: 'work.diagnosis',
		description: 'Work Diagnosis',
	},
	{
		name: 'work.section',
		description: 'Work Section',
	},
	{
		name: 'work.process',
		description: 'Work Process',
	},
	{
		name: 'work.accessory',
		description: 'Work Accessory',
	},
	{
		name: 'work.zone',
		description: 'Work Zone',
	},
];
