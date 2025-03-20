import SE, { SED } from '../../../util/swagger_example.js';

const defVehicle = SED({
	required: ['uuid', 'name', 'no', 'created_by', 'created_at'],
	properties: {
		uuid: SE.uuid(),
		name: SE.string('Vehicle 1'),
		no: SE.string('no'),
		created_by: SE.uuid(),
		created_at: SE.date_time(),
		updated_at: SE.date_time(),
		remarks: SE.string('remarks'),
	},
	xml: 'Delivery/Vehicle',
});
const defCourier = SED({
	required: ['uuid', 'name', 'branch', 'created_by', 'created_at'],
	properties: {
		uuid: SE.uuid(),
		name: SE.string('Courier 1'),
		branch: SE.string('branch'),
		created_by: SE.uuid(),
		created_at: SE.date_time(),
		updated_at: SE.date_time(),
		remarks: SE.string('remarks'),
	},
	xml: 'Delivery/Courier',
});

const defChallan = SED({
	required: ['uuid', 'customer_uuid', 'type', 'created_by', 'created_at'],
	properties: {
		uuid: SE.uuid(),
		customer_uuid: SE.uuid(),
		type: SE.type_enum(),
		employee_uuid: SE.uuid(),
		vehicle_uuid: SE.uuid(),
		courier_uuid: SE.uuid(),
		is_delivery_complete: SE.boolean(),
		created_by: SE.uuid(),
		created_at: SE.date_time(),
		updated_at: SE.date_time(),
		remarks: SE.string('remarks'),
	},
	xml: 'Delivery/Challan',
});

const defChallanEntry = SED({
	required: [
		'uuid',
		'challan_uuid',
		'order_uuid',
		'created_by',
		'created_at',
	],
	properties: {
		uuid: SE.uuid(),
		challan_uuid: SE.uuid(),
		order_uuid: SE.uuid(),
		created_by: SE.uuid(),
		created_at: SE.date_time(),
		updated_at: SE.date_time(),
		remarks: SE.string('remarks'),
	},
	xml: 'Delivery/ChallanEntry',
});

//* Merge all
export const defDelivery = {
	vehicle: defVehicle,
	courier: defCourier,
	challan: defChallan,
	challan_entry: defChallanEntry,
};

//* Tag
export const tagDelivery = [
	{
		name: 'delivery.vehicle',
		description: 'Delivery Vehicle',
	},
	{
		name: 'delivery.courier',
		description: 'Delivery Courier',
	},
	{
		name: 'delivery.challan',
		description: 'Delivery Challan',
	},
	{
		name: 'delivery.challan_entry',
		description: 'Delivery Challan Entry',
	},
];
