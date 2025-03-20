import SE from '../../../util/swagger_example.js';

//* deliver Vehicle *//

export const pathDeliveryVehicle = {
	'/delivery/vehicle': {
		get: {
			tags: ['delivery.vehicle'],
			summary: 'Get all vehicles',
			responses: {
				200: SE.response_schema(200, {
					uuid: SE.uuid(),
					name: SE.string('Vehicle 1'),
					no: SE.string('no'),
					created_by: SE.uuid(),
					created_by_name: SE.string('User 1'),
					created_at: SE.date_time(),
					updated_at: SE.date_time(),
					remarks: SE.string('remarks'),
				}),
			},
		},
		post: {
			tags: ['delivery.vehicle'],
			summary: 'Create a new vehicle',
			requestBody: SE.requestBody_schema_ref('delivery/vehicle'),
			responses: {
				responses: {
					200: SE.response_schema_ref(200, 'delivery/vehicle'),
					405: SE.response(405),
				},
			},
		},
	},
	'/delivery/vehicle/{uuid}': {
		get: {
			tags: ['delivery.vehicle'],
			summary: 'Get a vehicle',
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					description: 'UUID of the delivery vehicle',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			responses: {
				200: SE.response_schema(200, {
					uuid: SE.uuid(),
					name: SE.string('Vehicle 1'),
					no: SE.string('no'),
					created_by: SE.uuid(),
					created_by_name: SE.string('User 1'),
					created_at: SE.date_time(),
					updated_at: SE.date_time(),
					remarks: SE.string('remarks'),
				}),
			},
		},
		put: {
			tags: ['delivery.vehicle'],
			summary: 'Update a vehicle',
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					description: 'UUID of the delivery vehicle',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			requestBody: SE.requestBody_schema_ref('delivery/vehicle'),
			responses: {
				200: SE.response_schema_ref(200, 'delivery/vehicle'),
			},
		},
		delete: {
			tags: ['delivery.vehicle'],
			summary: 'Delete a vehicle',
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					description: 'UUID of the delivery vehicle',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			responses: {
				200: SE.response_schema(200, {
					uuid: SE.uuid(),
					name: SE.string('Vehicle 1'),
					no: SE.string('no'),
					created_by: SE.uuid(),
					created_by_name: SE.string('User 1'),
					created_at: SE.date_time(),
					updated_at: SE.date_time(),
					remarks: SE.string('remarks'),
				}),
			},
		},
	},
};

//* deliver Courier *//

export const pathDeliveryCourier = {
	'/delivery/courier': {
		get: {
			tags: ['delivery.courier'],
			summary: 'Get all couriers',
			responses: {
				200: SE.response_schema(200, {
					uuid: SE.uuid(),
					name: SE.string('Courier 1'),
					branch: SE.string('branch'),
					created_by: SE.uuid(),
					created_by_name: SE.string('User 1'),
					created_at: SE.date_time(),
					updated_at: SE.date_time(),
					remarks: SE.string('remarks'),
				}),
			},
		},
		post: {
			tags: ['delivery.courier'],
			summary: 'Create a new courier',
			requestBody: SE.requestBody_schema_ref('delivery/courier'),
			responses: {
				responses: {
					200: SE.response_schema_ref(200, 'delivery/courier'),
					405: SE.response(405),
				},
			},
		},
	},
	'/delivery/courier/{uuid}': {
		get: {
			tags: ['delivery.courier'],
			summary: 'Get a courier',
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					description: 'UUID of the delivery courier',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			responses: {
				200: SE.response_schema(200, {
					uuid: SE.uuid(),
					name: SE.string('Courier 1'),
					branch: SE.string('branch'),
					created_by: SE.uuid(),
					created_by_name: SE.string('User 1'),
					created_at: SE.date_time(),
					updated_at: SE.date_time(),
					remarks: SE.string('remarks'),
				}),
			},
		},
		put: {
			tags: ['delivery.courier'],
			summary: 'Update a courier',
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					description: 'UUID of the delivery courier',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			requestBody: SE.requestBody_schema_ref('delivery/courier'),
			responses: {
				200: SE.response_schema_ref(200, 'delivery/courier'),
			},
		},
		delete: {
			tags: ['delivery.courier'],
			summary: 'Delete a courier',
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					description: 'UUID of the delivery courier',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			responses: {
				200: SE.response_schema(200, {
					uuid: SE.uuid(),
					name: SE.string('Courier 1'),
					branch: SE.string('branch'),
					created_by: SE.uuid(),
					created_by_name: SE.string('User 1'),
					created_at: SE.date_time(),
					updated_at: SE.date_time(),
					remarks: SE.string('remarks'),
				}),
			},
		},
	},
};

//* deliver Challan *//

export const pathDeliveryChallan = {
	'/delivery/challan': {
		get: {
			tags: ['delivery.challan'],
			summary: 'Get all challan',
			responses: {
				200: SE.response_schema(200, {
					uuid: SE.uuid(),
					customer_uuid: SE.uuid(),
					customer_name: SE.string('User 1'),
					type: SE.type_enum(),
					employee_uuid: SE.uuid(),
					employee_name: SE.string('User 1'),
					vehicle_uuid: SE.uuid(),
					vehicle_name: SE.string('Vehicle 1'),
					vehicle_no: SE.string('no'),
					courier_uuid: SE.uuid(),
					courier_name: SE.string('Courier 1'),
					courier_branch: SE.string('branch'),
					is_delivery_complete: SE.boolean(),
					created_by: SE.uuid(),
					created_by_name: SE.string('User 1'),
					created_at: SE.date_time(),
					updated_at: SE.date_time(),
					remarks: SE.string('remarks'),
				}),
			},
		},
		post: {
			tags: ['delivery.challan'],
			summary: 'Create a new challan',
			requestBody: SE.requestBody_schema_ref('delivery/challan'),
			responses: {
				responses: {
					200: SE.response_schema_ref(200, 'delivery/challan'),
					405: SE.response(405),
				},
			},
		},
	},
	'/delivery/challan/{uuid}': {
		get: {
			tags: ['delivery.challan'],
			summary: 'Get a challan',
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					description: 'UUID of the delivery challan',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			responses: {
				200: SE.response_schema(200, {
					id: SE.integer(),
					challan_no: SE.string('CH21-0001'),
					uuid: SE.uuid(),
					customer_uuid: SE.uuid(),
					customer_name: SE.string('User 1'),
					type: SE.type_enum(),
					employee_uuid: SE.uuid(),
					employee_name: SE.string('User 1'),
					vehicle_uuid: SE.uuid(),
					vehicle_name: SE.string('Vehicle 1'),
					vehicle_no: SE.string('no'),
					courier_uuid: SE.uuid(),
					courier_name: SE.string('Courier 1'),
					courier_branch: SE.string('branch'),
					is_delivery_complete: SE.boolean(),
					created_by: SE.uuid(),
					created_by_name: SE.string('User 1'),
					created_at: SE.date_time(),
					updated_at: SE.date_time(),
					remarks: SE.string('remarks'),
				}),
			},
		},
		put: {
			tags: ['delivery.challan'],
			summary: 'Update a challan',
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					description: 'UUID of the delivery challan',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			requestBody: SE.requestBody_schema_ref('delivery/challan'),
			responses: {
				200: SE.response_schema_ref(200, 'delivery/challan'),
			},
		},
		delete: {
			tags: ['delivery.challan'],
			summary: 'Delete a challan',
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					description: 'UUID of the delivery challan',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			responses: {
				200: SE.response_schema(200, {
					id: SE.integer(),
					challan_no: SE.string('CH21-0001'),
					uuid: SE.uuid(),
					customer_uuid: SE.uuid(),
					customer_name: SE.string('User 1'),
					type: SE.type_enum(),
					employee_uuid: SE.uuid(),
					employee_name: SE.string('User 1'),
					vehicle_uuid: SE.uuid(),
					vehicle_name: SE.string('Vehicle 1'),
					vehicle_no: SE.string('no'),
					courier_uuid: SE.uuid(),
					courier_name: SE.string('Courier 1'),
					courier_branch: SE.string('branch'),
					is_delivery_complete: SE.boolean(),
					created_by: SE.uuid(),
					created_by_name: SE.string('User 1'),
					created_at: SE.date_time(),
					updated_at: SE.date_time(),
					remarks: SE.string('remarks'),
				}),
			},
		},
	},
};

//* deliver Challan Entry *//

export const pathDeliveryChallanEntry = {
	'/delivery/challan-entry': {
		get: {
			tags: ['delivery.challan_entry'],
			summary: 'Get all challan entries',
			responses: {
				200: SE.response_schema(200, {
					uuid: SE.uuid(),
					challan_uuid: SE.uuid(),
					challan_no: SE.string('CH21-0001'),
					order_uuid: SE.uuid(),
					order_no: SE.string('WO21-0001'),
					created_by: SE.uuid(),
					created_by_name: SE.string('User 1'),
					created_at: SE.date_time(),
					updated_at: SE.date_time(),
					remarks: SE.string('remarks'),
				}),
			},
		},
		post: {
			tags: ['delivery.challan_entry'],
			summary: 'Create a new challan entry',
			requestBody: SE.requestBody_schema_ref('delivery/challan-entry'),
			responses: {
				responses: {
					200: SE.response_schema_ref(200, 'delivery/challan-entry'),
					405: SE.response(405),
				},
			},
		},
	},
	'/delivery/challan-entry/{uuid}': {
		get: {
			tags: ['delivery.challan_entry'],
			summary: 'Get a challan entry',
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					description: 'UUID of the delivery challan entry',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			responses: {
				200: SE.response_schema(200, {
					uuid: SE.uuid(),
					challan_uuid: SE.uuid(),
					challan_no: SE.string('CH21-0001'),
					order_uuid: SE.uuid(),
					order_no: SE.string('WO21-0001'),
					created_by: SE.uuid(),
					created_by_name: SE.string('User 1'),
					created_at: SE.date_time(),
					updated_at: SE.date_time(),
					remarks: SE.string('remarks'),
				}),
			},
		},
		put: {
			tags: ['delivery.challan_entry'],
			summary: 'Update a challan entry',
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					description: 'UUID of the delivery challan entry',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			requestBody: SE.requestBody_schema_ref('delivery/challan-entry'),
			responses: {
				200: SE.response_schema_ref(200, 'delivery/challan-entry'),
			},
		},
		delete: {
			tags: ['delivery.challan_entry'],
			summary: 'Delete a challan entry',
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					description: 'UUID of the delivery challan entry',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			responses: {
				200: SE.response_schema(200, {
					uuid: SE.uuid(),
					challan_uuid: SE.uuid(),
					challan_no: SE.string('CH21-0001'),
					order_uuid: SE.uuid(),
					order_no: SE.string('WO21-0001'),
					created_by: SE.uuid(),
					created_by_name: SE.string('User 1'),
					created_at: SE.date_time(),
					updated_at: SE.date_time(),
					remarks: SE.string('remarks'),
				}),
			},
		},
	},
};

export const pathDelivery = {
	...pathDeliveryVehicle,
	...pathDeliveryCourier,
	...pathDeliveryChallan,
	...pathDeliveryChallanEntry,
};
