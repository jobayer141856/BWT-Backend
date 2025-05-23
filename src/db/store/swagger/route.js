import SE from '../../../util/swagger_example.js';

//* Store Group *//

export const pathStoreGroup = {
	'/store/group': {
		get: {
			tags: ['store.group'],
			summary: 'Get all store groups',
			responses: {
				200: SE.response_schema(200, {
					uuid: SE.uuid(),
					name: SE.string('name'),
					created_by: SE.uuid(),
					created_by_name: SE.string('created_by_name'),
					created_at: SE.date_time(),
					updated_at: SE.date_time(),
					remarks: SE.string('remarks'),
				}),
			},
		},
		post: {
			tags: ['store.group'],
			summary: 'Create a store group',
			requestBody: SE.requestBody_schema_ref('store/group'),
			responses: {
				responses: {
					200: SE.response_schema_ref(200, 'store/group'),
					405: SE.response(405),
				},
			},
		},
	},

	'/store/group/{uuid}': {
		get: {
			tags: ['store.group'],
			summary: 'Get a store group',
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					description: 'UUID of the store group',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			responses: {
				200: SE.response_schema(200, {
					uuid: SE.uuid(),
					name: SE.string('name'),
					created_by: SE.uuid(),
					created_by_name: SE.string('created_by_name'),
					created_at: SE.date_time(),
					updated_at: SE.date_time(),
					remarks: SE.string('remarks'),
				}),
				404: SE.response(404),
			},
		},
		put: {
			tags: ['store.group'],
			summary: 'Update a store group',
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					description: 'UUID of the store group',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			requestBody: SE.requestBody_schema_ref('store/group'),
			responses: {
				200: SE.response_schema_ref(200, 'store/group'),
				404: SE.response(404),
			},
		},
		delete: {
			tags: ['store.group'],
			summary: 'Delete a store group',
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					description: 'UUID of the store group',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			responses: {
				200: SE.response(200),
				404: SE.response(404),
			},
		},
	},
};

export const pathStoreCategory = {
	'/store/category': {
		get: {
			tags: ['store.category'],
			summary: 'Get all store categories',
			responses: {
				200: SE.response_schema(200, {
					uuid: SE.uuid(),
					group_uuid: SE.uuid(),
					group_name: SE.string('group_name'),
					name: SE.string('name'),
					created_by: SE.uuid(),
					created_by_name: SE.string('created_by_name'),
					created_at: SE.date_time(),
					updated_at: SE.date_time(),
					remarks: SE.string('remarks'),
				}),
			},
		},
		post: {
			tags: ['store.category'],
			summary: 'Create a store category',
			requestBody: SE.requestBody_schema_ref('store/category'),
			responses: {
				responses: {
					200: SE.response_schema_ref(200, 'store/category'),
					405: SE.response(405),
				},
			},
		},
	},

	'/store/category/{uuid}': {
		get: {
			tags: ['store.category'],
			summary: 'Get a store category',
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					description: 'UUID of the store category',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			responses: {
				200: SE.response_schema(200, {
					uuid: SE.uuid(),
					group_uuid: SE.uuid(),
					group_name: SE.string('group_name'),
					name: SE.string('name'),
					created_by: SE.uuid(),
					created_by_name: SE.string('created_by_name'),
					created_at: SE.date_time(),
					updated_at: SE.date_time(),
					remarks: SE.string('remarks'),
				}),
				404: SE.response(404),
			},
		},
		put: {
			tags: ['store.category'],
			summary: 'Update a store category',
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					description: 'UUID of the store category',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			requestBody: SE.requestBody_schema_ref('store/category'),
			responses: {
				200: SE.response_schema_ref(200, 'store/category'),
				404: SE.response(404),
			},
		},
		delete: {
			tags: ['store.category'],
			summary: 'Delete a store category',
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					description: 'UUID of the store category',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			responses: {
				200: SE.response(200),
				404: SE.response(404),
			},
		},
	},
};

export const pathStoreBrand = {
	'/store/brand': {
		get: {
			tags: ['store.brand'],
			summary: 'Get all store brands',
			responses: {
				200: SE.response_schema(200, {
					uuid: SE.uuid(),
					id: SE.integer(),
					name: SE.string('name'),
					created_by: SE.uuid(),
					created_by_name: SE.string('created_by_name'),
					created_at: SE.date_time(),
					updated_at: SE.date_time(),
					remarks: SE.string('remarks'),
				}),
			},
		},
		post: {
			tags: ['store.brand'],
			summary: 'Create a store brand',
			requestBody: SE.requestBody_schema_ref('store/brand'),
			responses: {
				responses: {
					200: SE.response_schema_ref(200, 'store/brand'),
					405: SE.response(405),
				},
			},
		},
	},

	'/store/brand/{uuid}': {
		get: {
			tags: ['store.brand'],
			summary: 'Get a store brand',
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					description: 'UUID of the store brand',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			responses: {
				200: SE.response_schema(200, {
					uuid: SE.uuid(),
					id: SE.integer(),
					name: SE.string('name'),
					created_by: SE.uuid(),
					created_by_name: SE.string('created_by_name'),
					created_at: SE.date_time(),
					updated_at: SE.date_time(),
					remarks: SE.string('remarks'),
				}),
				404: SE.response(404),
			},
		},
		put: {
			tags: ['store.brand'],
			summary: 'Update a store brand',
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					description: 'UUID of the store brand',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			requestBody: SE.requestBody_schema_ref('store/brand'),
			responses: {
				200: SE.response_schema_ref(200, 'store/brand'),
				404: SE.response(404),
			},
		},
		delete: {
			tags: ['store.brand'],
			summary: 'Delete a store brand',
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					description: 'UUID of the store brand',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			responses: {
				200: SE.response(200),
				404: SE.response(404),
			},
		},
	},
};

export const pathStoreSize = {
	'/store/size': {
		get: {
			tags: ['store.size'],
			summary: 'Get all store sizes',
			responses: {
				200: SE.response_schema(200, {
					uuid: SE.uuid(),
					name: SE.string('name'),
					created_by: SE.uuid(),
					created_by_name: SE.string('created_by_name'),
					created_at: SE.date_time(),
					updated_at: SE.date_time(),
					remarks: SE.string('remarks'),
				}),
			},
		},
		post: {
			tags: ['store.size'],
			summary: 'Create a store size',
			requestBody: SE.requestBody_schema_ref('store/size'),
			responses: {
				responses: {
					200: SE.response_schema_ref(200, 'store/size'),
					405: SE.response(405),
				},
			},
		},
	},

	'/store/size/{uuid}': {
		get: {
			tags: ['store.size'],
			summary: 'Get a store size',
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					description: 'UUID of the store size',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			responses: {
				200: SE.response_schema(200, {
					uuid: SE.uuid(),
					name: SE.string('name'),
					created_by: SE.uuid(),
					created_by_name: SE.string('created_by_name'),
					created_at: SE.date_time(),
					updated_at: SE.date_time(),
					remarks: SE.string('remarks'),
				}),
				404: SE.response(404),
			},
		},
		put: {
			tags: ['store.size'],
			summary: 'Update a store size',
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					description: 'UUID of the store size',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			requestBody: SE.requestBody_schema_ref('store/size'),
			responses: {
				200: SE.response_schema_ref(200, 'store/size'),
				404: SE.response(404),
			},
		},
		delete: {
			tags: ['store.size'],
			summary: 'Delete a store size',
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					description: 'UUID of the store size',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			responses: {
				200: SE.response(200),
				404: SE.response(404),
			},
		},
	},
};

export const pathStoreVendor = {
	'/store/vendor': {
		get: {
			tags: ['store.vendor'],
			summary: 'Get all store vendors',
			responses: {
				200: SE.response_schema(200, {
					uuid: SE.uuid(),
					model_uuid: SE.uuid(),
					model_name: SE.string('model_name'),
					name: SE.string('name'),
					company_name: SE.string('company_name'),
					phone: SE.string('phone'),
					address: SE.string('address'),
					description: SE.string('description'),
					is_active: SE.boolean(),
					created_by: SE.uuid(),
					created_by_name: SE.string('created_by_name'),
					created_at: SE.date_time(),
					updated_at: SE.date_time(),
					remarks: SE.string('remarks'),
				}),
			},
		},
		post: {
			tags: ['store.vendor'],
			summary: 'Create a store vendor',
			requestBody: SE.requestBody_schema_ref('store/vendor'),
			responses: {
				responses: {
					200: SE.response_schema_ref(200, 'store/vendor'),
					405: SE.response(405),
				},
			},
		},
	},

	'/store/vendor/{uuid}': {
		get: {
			tags: ['store.vendor'],
			summary: 'Get a store vendor',
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					description: 'UUID of the store vendor',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			responses: {
				200: SE.response_schema(200, {
					uuid: SE.uuid(),
					model_uuid: SE.uuid(),
					model_name: SE.string('model_name'),
					name: SE.string('name'),
					company_name: SE.string('company_name'),
					phone: SE.string('phone'),
					address: SE.string('address'),
					description: SE.string('description'),
					is_active: SE.boolean(),
					created_by: SE.uuid(),
					created_by_name: SE.string('created_by_name'),
					created_at: SE.date_time(),
					updated_at: SE.date_time(),
					remarks: SE.string('remarks'),
				}),
				404: SE.response(404),
			},
		},
		put: {
			tags: ['store.vendor'],
			summary: 'Update a store vendor',
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					description: 'UUID of the store vendor',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			requestBody: SE.requestBody_schema_ref('store/vendor'),
			responses: {
				200: SE.response_schema_ref(200, 'store/vendor'),
				404: SE.response(404),
			},
		},
		delete: {
			tags: ['store.vendor'],
			summary: 'Delete a store vendor',
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					description: 'UUID of the store vendor',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			responses: {
				200: SE.response(200),
				404: SE.response(404),
			},
		},
	},
};

export const pathStoreProduct = {
	'/store/product': {
		get: {
			tags: ['store.product'],
			summary: 'Get all store products',
			responses: {
				200: SE.response_schema(200, {
					uuid: SE.uuid(),
					name: SE.string('product_name'),
					model_uuid: SE.uuid(),
					model_name: SE.string('model_name'),
					category_uuid: SE.uuid(),
					category_name: SE.string('category_name'),
					size_uuid: SE.uuid(),
					size_name: SE.string('size_name'),
					warranty_days: SE.integer(),
					service_warranty_days: SE.integer(),
					type: SE.type_enum,
					description: SE.string('description'),
					is_active: SE.boolean(),
					created_by: SE.uuid(),
					created_by_name: SE.string('created_by_name'),
					created_at: SE.date_time(),
					updated_at: SE.date_time(),
					remarks: SE.string('remarks'),
				}),
			},
		},
		post: {
			tags: ['store.product'],
			summary: 'Create a store product',
			requestBody: SE.requestBody_schema_ref('store/product'),
			responses: {
				responses: {
					200: SE.response_schema_ref(200, 'store/product'),
					405: SE.response(405),
				},
			},
		},
	},

	'/store/product/{uuid}': {
		get: {
			tags: ['store.product'],
			summary: 'Get a store product',
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					description: 'UUID of the store product',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			responses: {
				200: SE.response_schema(200, {
					uuid: SE.uuid(),
					name: SE.string('product_name'),
					model_uuid: SE.uuid(),
					model_name: SE.string('model_name'),
					category_uuid: SE.uuid(),
					category_name: SE.string('category_name'),
					size_uuid: SE.uuid(),
					size_name: SE.string('size_name'),
					warranty_days: SE.integer(),
					service_warranty_days: SE.integer(),
					type: SE.type_enum,
					description: SE.string('description'),
					is_active: SE.boolean(),
					created_by: SE.uuid(),
					created_by_name: SE.string('created_by_name'),
					created_at: SE.date_time(),
					updated_at: SE.date_time(),
					remarks: SE.string('remarks'),
				}),
				404: SE.response(404),
			},
		},
		put: {
			tags: ['store.product'],
			summary: 'Update a store product',
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					description: 'UUID of the store product',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			requestBody: SE.requestBody_schema_ref('store/product'),
			responses: {
				200: SE.response_schema_ref(200, 'store/product'),
				404: SE.response(404),
			},
		},
		delete: {
			tags: ['store.product'],
			summary: 'Delete a store product',
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					description: 'UUID of the store product',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			responses: {
				200: SE.response(200),
				404: SE.response(404),
			},
		},
	},
};

export const pathStoreBranch = {
	'/store/branch': {
		get: {
			tags: ['store.branch'],
			summary: 'Get all store branches',
			responses: {
				200: SE.response_schema(200, {
					uuid: SE.uuid(),
					name: SE.string('name'),
					id: SE.integer(),
					brand_id: SE.string('SB25-0001'),
					created_by: SE.uuid(),
					created_by_name: SE.string('created_by_name'),
					created_at: SE.date_time(),
					updated_at: SE.date_time(),
					remarks: SE.string('remarks'),
				}),
			},
		},
		post: {
			tags: ['store.branch'],
			summary: 'Create a store branch',
			requestBody: SE.requestBody_schema_ref('store/branch'),
			responses: {
				responses: {
					200: SE.response_schema_ref(200, 'store/branch'),
					405: SE.response(405),
				},
			},
		},
	},
	'/store/branch/{uuid}': {
		get: {
			tags: ['store.branch'],
			summary: 'Get a store branch',
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					description: 'UUID of the store branch',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			responses: {
				200: SE.response_schema(200, {
					uuid: SE.uuid(),
					name: SE.string('name'),
					id: SE.integer(),
					brand_id: SE.string('SB25-0001'),
					created_by: SE.uuid(),
					created_by_name: SE.string('created_by_name'),
					created_at: SE.date_time(),
					updated_at: SE.date_time(),
					remarks: SE.string('remarks'),
				}),
				404: SE.response(404),
			},
		},
		put: {
			tags: ['store.branch'],
			summary: 'Update a store branch',
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					description: 'UUID of the store branch',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			requestBody: SE.requestBody_schema_ref('store/branch'),
			responses: {
				200: SE.response_schema_ref(200, 'store/branch'),
				404: SE.response(404),
			},
		},
		delete: {
			tags: ['store.branch'],
			summary: 'Delete a store branch',
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					description: 'UUID of the store branch',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			responses: {
				200: SE.response(200),
				404: SE.response(404),
			},
		},
	},
};

export const pathStorePurchase = {
	'/store/purchase': {
		get: {
			tags: ['store.purchase'],
			summary: 'Get all store purchases',
			responses: {
				200: SE.response_schema(200, {
					uuid: SE.uuid(),
					id: SE.integer(),
					vendor_uuid: SE.uuid(),
					vendor_name: SE.string('vendor_name'),
					branch_uuid: SE.uuid(),
					branch_name: SE.string('branch_name'),
					date: SE.date_time(),
					created_by: SE.uuid(),
					created_by_name: SE.string('created_by_name'),
					created_at: SE.date_time(),
					remarks: SE.string('remarks'),
				}),
			},
		},
		post: {
			tags: ['store.purchase'],
			summary: 'Create a store purchase',
			requestBody: SE.requestBody_schema_ref('store/purchase'),
			responses: {
				responses: {
					200: SE.response_schema_ref(200, 'store/purchase'),
					405: SE.response(405),
				},
			},
		},
	},
	'/store/purchase/{uuid}': {
		get: {
			tags: ['store.purchase'],
			summary: 'Get a store purchase',
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					description: 'UUID of the store purchase',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			responses: {
				200: SE.response_schema(200, {
					uuid: SE.uuid(),
					id: SE.integer(),
					vendor_uuid: SE.uuid(),
					vendor_name: SE.string('vendor_name'),
					branch_uuid: SE.uuid(),
					branch_name: SE.string('branch_name'),
					date: SE.date_time(),
					created_by: SE.uuid(),
					created_by_name: SE.string('created_by_name'),
					created_at: SE.date_time(),
					remarks: SE.string('remarks'),
				}),
				404: SE.response(404),
			},
		},
		put: {
			tags: ['store.purchase'],
			summary: 'Update a store purchase',
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					description: 'UUID of the store purchase',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			requestBody: SE.requestBody_schema_ref('store/purchase'),
			responses: {
				200: SE.response_schema_ref(200, 'store/purchase'),
				404: SE.response(404),
			},
		},
		delete: {
			tags: ['store.purchase'],
			summary: 'Delete a store purchase',
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					description: 'UUID of the store purchase',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			responses: {
				200: SE.response(200),
				404: SE.response(404),
			},
		},
	},
	'/store/purchase/purchase-entry-details/by/{purchase_uuid}': {
		get: {
			tags: ['store.purchase'],
			summary: 'Get purchase entry details by purchase UUID',
			parameters: [
				{
					name: 'purchase_uuid',
					in: 'path',
					description: 'UUID of the store purchase',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			responses: {
				200: SE.response_schema(200, {
					uuid: SE.uuid(),
					purchase_uuid: SE.uuid(),
					id: SE.integer(),
					purchase_id: SE.string('SP25-0001'),
					vendor_uuid: SE.uuid(),
					vendor_name: SE.string('vendor_name'),
					branch_uuid: SE.uuid(),
					branch_name: SE.string('branch_name'),
					date: SE.date_time(),
					created_by: SE.uuid(),
					created_by_name: SE.string('created_by_name'),
					created_at: SE.date_time(),
					remarks: SE.string('remarks'),
					purchase_entry: [
						{
							uuid: SE.uuid(),
							purchase_uuid: SE.uuid(),
							stock_uuid: SE.uuid(),
							stock_name: SE.string('stock_name'),
							serial_no: SE.string('serial_no'),
							quantity: SE.number(),
							price_per_unit: SE.number(),
							discount: SE.number(),
							warehouse_uuid: SE.uuid(),
							warehouse_name: SE.string('warehouse_name'),
							room_uuid: SE.uuid(),
							room_name: SE.string('room_name'),
							rack_uuid: SE.uuid(),
							rack_name: SE.string('rack_name'),
							floor_uuid: SE.uuid(),
							floor_name: SE.string('floor_name'),
							box_uuid: SE.uuid(),
							box_name: SE.string('box_name'),
							created_by: SE.uuid(),
							created_by_name: SE.string('created_by_name'),
							created_at: SE.date_time(),
							remarks: SE.string('remarks'),
						},
					],
				}),
				404: SE.response(404),
			},
		},
	},
};

export const pathStoreStock = {
	'/store/stock': {
		get: {
			tags: ['store.stock'],
			summary: 'Get all store stocks',
			responses: {
				200: SE.response_schema(200, {
					uuid: SE.uuid(),
					id: SE.integer(),
					stock_id: SE.string('SS25-0001'),
					product_uuid: SE.uuid(),
					product_name: SE.string('product_name'),
					warehouse_1: SE.number(),
					warehouse_2: SE.number(),
					warehouse_3: SE.number(),
					created_by: SE.uuid(),
					created_by_name: SE.string('created_by_name'),
					created_at: SE.date_time(),
					remarks: SE.string('remarks'),
				}),
			},
		},
		post: {
			tags: ['store.stock'],
			summary: 'Create a store stock',
			requestBody: SE.requestBody_schema_ref('store/stock'),
			responses: {
				responses: {
					200: SE.response_schema_ref(200, 'store/stock'),
					405: SE.response(405),
				},
			},
		},
	},
	'/store/stock/{uuid}': {
		get: {
			tags: ['store.stock'],
			summary: 'Get a store stock',
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					description: 'UUID of the store stock',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			responses: {
				200: SE.response_schema(200, {
					uuid: SE.uuid(),
					id: SE.integer(),
					stock_id: SE.string('SS25-0001'),
					product_uuid: SE.uuid(),
					product_name: SE.string('product_name'),
					warehouse_1: SE.number(),
					warehouse_2: SE.number(),
					warehouse_3: SE.number(),
					created_by: SE.uuid(),
					created_by_name: SE.string('created_by_name'),
					created_at: SE.date_time(),
					remarks: SE.string('remarks'),
				}),
				404: SE.response(404),
			},
		},
		put: {
			tags: ['store.stock'],
			summary: 'Update a store stock',
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					description: 'UUID of the store stock',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			requestBody: SE.requestBody_schema_ref('store/stock'),
			responses: {
				200: SE.response_schema_ref(200, 'store/stock'),
				404: SE.response(404),
			},
		},
		delete: {
			tags: ['store.stock'],
			summary: 'Delete a store stock',
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					description: 'UUID of the store stock',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			responses: {
				200: SE.response(200),
				404: SE.response(404),
			},
		},
	},
};

export const pathStorePurchaseEntry = {
	'/store/purchase-entry': {
		get: {
			tags: ['store.purchase_entry'],
			summary: 'Get all store purchase entries',
			responses: {
				200: SE.response_schema(200, {
					uuid: SE.uuid(),
					purchase_uuid: SE.uuid(),
					purchase_id: SE.integer(),
					stock_uuid: SE.uuid(),
					stock_name: SE.string('stock_name'),
					serial_no: SE.string('serial_no'),
					quantity: SE.number(),
					price_per_unit: SE.number(),
					discount: SE.number(),
					warehouse_uuid: SE.uuid(),
					warehouse_name: SE.string('warehouse_name'),
					rack_uuid: SE.uuid(),
					rack_name: SE.string('rack_name'),
					floor_uuid: SE.uuid(),
					floor_name: SE.string('floor_name'),
					box_uuid: SE.uuid(),
					box_name: SE.string('box_name'),
					created_by: SE.uuid(),
					created_by_name: SE.string('created_by_name'),
					created_at: SE.date_time(),
					remarks: SE.string('remarks'),
				}),
			},
		},
		post: {
			tags: ['store.purchase_entry'],
			summary: 'Create a store purchase entry',
			requestBody: SE.requestBody_schema_ref('store/purchase_entry'),
			responses: {
				responses: {
					200: SE.response_schema_ref(200, 'store/purchase_entry'),
					405: SE.response(405),
				},
			},
		},
	},
	'/store/purchase-entry/{uuid}': {
		get: {
			tags: ['store.purchase_entry'],
			summary: 'Get a store purchase entry',
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					description: 'UUID of the store purchase entry',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			responses: {
				200: SE.response_schema(200, {
					uuid: SE.uuid(),
					purchase_uuid: SE.uuid(),
					purchase_id: SE.integer(),
					stock_uuid: SE.uuid(),
					stock_name: SE.string('stock_name'),
					serial_no: SE.string('serial_no'),
					quantity: SE.number(),
					price_per_unit: SE.number(),
					discount: SE.number(),
					warehouse_uuid: SE.uuid(),
					warehouse_name: SE.string('warehouse_name'),
					rack_uuid: SE.uuid(),
					rack_name: SE.string('rack_name'),
					floor_uuid: SE.uuid(),
					floor_name: SE.string('floor_name'),
					box_uuid: SE.uuid(),
					box_name: SE.string('box_name'),
					created_by: SE.uuid(),
					created_by_name: SE.string('created_by_name'),
					created_at: SE.date_time(),
					remarks: SE.string('remarks'),
				}),
				404: SE.response(404),
			},
		},
		put: {
			tags: ['store.purchase_entry'],
			summary: 'Update a store purchase entry',
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					description: 'UUID of the store purchase entry',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			requestBody: SE.requestBody_schema_ref('store/purchase_entry'),
			responses: {
				200: SE.response_schema_ref(200, 'store/purchase_entry'),
				404: SE.response(404),
			},
		},
		delete: {
			tags: ['store.purchase_entry'],
			summary: 'Delete a store purchase entry',
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					description: 'UUID of the store purchase entry',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			responses: {
				200: SE.response(200),
				404: SE.response(404),
			},
		},
	},

	'/store/purchase-entry/by/{purchase_uuid}': {
		get: {
			tags: ['store.purchase_entry'],
			summary: 'Get all store purchase entries by purchase',
			parameters: [
				{
					name: 'purchase_uuid',
					in: 'path',
					description: 'UUID of the store purchase',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			responses: {
				200: SE.response_schema(200, {
					uuid: SE.uuid(),
					purchase_uuid: SE.uuid(),
					purchase_id: SE.integer(),
					stock_uuid: SE.uuid(),
					stock_name: SE.string('stock_name'),
					serial_no: SE.string('serial_no'),
					quantity: SE.number(),
					price_per_unit: SE.number(),
					discount: SE.number(),
					warehouse_uuid: SE.uuid(),
					warehouse_name: SE.string('warehouse_name'),
					rack_uuid: SE.uuid(),
					rack_name: SE.string('rack_name'),
					floor_uuid: SE.uuid(),
					floor_name: SE.string('floor_name'),
					box_uuid: SE.uuid(),
					box_name: SE.string('box_name'),
					created_by: SE.uuid(),
					created_by_name: SE.string('created_by_name'),
					created_at: SE.date_time(),
					remarks: SE.string('remarks'),
				}),
				404: SE.response(404),
			},
		},
	},
};

export const pathStoreWarehouse = {
	'/store/warehouse': {
		get: {
			tags: ['store.warehouse'],
			summary: 'Get all store warehouses',
			responses: {
				200: SE.response_schema(200, {
					uuid: SE.uuid(),
					name: SE.string('name'),
					created_by: SE.uuid(),
					created_by_name: SE.string('created_by_name'),
					created_at: SE.date_time(),
					updated_at: SE.date_time(),
					remarks: SE.string('remarks'),
				}),
			},
		},
		post: {
			tags: ['store.warehouse'],
			summary: 'Create a store warehouse',
			requestBody: SE.requestBody_schema_ref('store/warehouse'),
			responses: {
				responses: {
					200: SE.response_schema_ref(200, 'store/warehouse'),
					405: SE.response(405),
				},
			},
		},
	},
	'/store/warehouse/{uuid}': {
		get: {
			tags: ['store.warehouse'],
			summary: 'Get a store warehouse',
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					description: 'UUID of the store warehouse',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			responses: {
				200: SE.response_schema(200, {
					uuid: SE.uuid(),
					name: SE.string('name'),
					created_by: SE.uuid(),
					created_by_name: SE.string('created_by_name'),
					created_at: SE.date_time(),
					updated_at: SE.date_time(),
					remarks: SE.string('remarks'),
				}),
				404: SE.response(404),
			},
		},
		put: {
			tags: ['store.warehouse'],
			summary: 'Update a store warehouse',
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					description: 'UUID of the store warehouse',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			requestBody: SE.requestBody_schema_ref('store/warehouse'),
			responses: {
				200: SE.response_schema_ref(200, 'store/warehouse'),
				404: SE.response(404),
			},
		},
		delete: {
			tags: ['store.warehouse'],
			summary: 'Delete a store warehouse',
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					description: 'UUID of the store warehouse',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			responses: {
				200: SE.response(200),
				404: SE.response(404),
			},
		},
	},
};

export const pathStoreModel = {
	'/store/model': {
		get: {
			tags: ['store.model'],
			summary: 'Get all store models',
			responses: {
				200: SE.response_schema(200, {
					uuid: SE.uuid(),
					name: SE.string('name'),
					brand_uuid: SE.uuid(),
					brand_name: SE.string('brand_name'),
					created_by: SE.uuid(),
					created_by_name: SE.string('created_by_name'),
					created_at: SE.date_time(),
					updated_at: SE.date_time(),
					remarks: SE.string('remarks'),
				}),
			},
		},
		post: {
			tags: ['store.model'],
			summary: 'Create a store model',
			requestBody: SE.requestBody_schema_ref('store/model'),
			responses: {
				responses: {
					200: SE.response_schema_ref(200, 'store/model'),
					405: SE.response(405),
				},
			},
		},
	},
	'/store/model/{uuid}': {
		get: {
			tags: ['store.model'],
			summary: 'Get a store model',
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					description: 'UUID of the store model',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			responses: {
				200: SE.response_schema(200, {
					uuid: SE.uuid(),
					name: SE.string('name'),
					brand_uuid: SE.uuid(),
					brand_name: SE.string('brand_name'),
					created_by: SE.uuid(),
					created_by_name: SE.string('created_by_name'),
					created_at: SE.date_time(),
					updated_at: SE.date_time(),
					remarks: SE.string('remarks'),
				}),
				404: SE.response(404),
			},
		},
		put: {
			tags: ['store.model'],
			summary: 'Update a store model',
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					description: 'UUID of the store model',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			requestBody: SE.requestBody_schema_ref('store/model'),
			responses: {
				200: SE.response_schema_ref(200, 'store/model'),
				404: SE.response(404),
			},
		},
		delete: {
			tags: ['store.model'],
			summary: 'Delete a store model',
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					description: 'UUID of the store model',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			responses: {
				200: SE.response(200),
				404: SE.response(404),
			},
		},
	},
};

export const pathStoreRack = {
	'/store/rack': {
		get: {
			tags: ['store.rack'],
			summary: 'Get all store racks',
			responses: {
				200: SE.response_schema(200, {
					uuid: SE.uuid(),
					name: SE.string('name'),
					warehouse_uuid: SE.uuid(),
					warehouse_name: SE.string('warehouse_name'),
					created_by: SE.uuid(),
					created_by_name: SE.string('created_by_name'),
					created_at: SE.date_time(),
					updated_at: SE.date_time(),
					remarks: SE.string('remarks'),
				}),
			},
		},
		post: {
			tags: ['store.rack'],
			summary: 'Create a store rack',
			requestBody: SE.requestBody_schema_ref('store/rack'),
			responses: {
				responses: {
					200: SE.response_schema_ref(200, 'store/rack'),
					405: SE.response(405),
				},
			},
		},
	},
	'/store/rack/{uuid}': {
		get: {
			tags: ['store.rack'],
			summary: 'Get a store rack',
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					description: 'UUID of the store rack',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			responses: {
				200: SE.response_schema(200, {
					uuid: SE.uuid(),
					name: SE.string('name'),
					warehouse_uuid: SE.uuid(),
					warehouse_name: SE.string('warehouse_name'),
					created_by: SE.uuid(),
					created_by_name: SE.string('created_by_name'),
					created_at: SE.date_time(),
					updated_at: SE.date_time(),
					remarks: SE.string('remarks'),
				}),
				404: SE.response(404),
			},
		},
		put: {
			tags: ['store.rack'],
			summary: 'Update a store rack',
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					description: 'UUID of the store rack',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			requestBody: SE.requestBody_schema_ref('store/rack'),
			responses: {
				200: SE.response_schema_ref(200, 'store/rack'),
				404: SE.response(404),
			},
		},
		delete: {
			tags: ['store.rack'],
			summary: 'Delete a store rack',
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					description: 'UUID of the store rack',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			responses: {
				200: SE.response(200),
				404: SE.response(404),
			},
		},
	},
};

export const pathStoreFloor = {
	'/store/floor': {
		get: {
			tags: ['store.floor'],
			summary: 'Get all store floors',
			responses: {
				200: SE.response_schema(200, {
					uuid: SE.uuid(),
					name: SE.string('name'),
					warehouse_uuid: SE.uuid(),
					warehouse_name: SE.string('warehouse_name'),
					created_by: SE.uuid(),
					created_by_name: SE.string('created_by_name'),
					created_at: SE.date_time(),
					updated_at: SE.date_time(),
					remarks: SE.string('remarks'),
				}),
			},
		},
		post: {
			tags: ['store.floor'],
			summary: 'Create a store floor',
			requestBody: SE.requestBody_schema_ref('store/floor'),
			responses: {
				responses: {
					200: SE.response_schema_ref(200, 'store/floor'),
					405: SE.response(405),
				},
			},
		},
	},
	'/store/floor/{uuid}': {
		get: {
			tags: ['store.floor'],
			summary: 'Get a store floor',
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					description: 'UUID of the store floor',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			responses: {
				200: SE.response_schema(200, {
					uuid: SE.uuid(),
					name: SE.string('name'),
					warehouse_uuid: SE.uuid(),
					warehouse_name: SE.string('warehouse_name'),
					created_by: SE.uuid(),
					created_by_name: SE.string('created_by_name'),
					created_at: SE.date_time(),
					updated_at: SE.date_time(),
					remarks: SE.string('remarks'),
				}),
				404: SE.response(404),
			},
		},
		put: {
			tags: ['store.floor'],
			summary: 'Update a store floor',
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					description: 'UUID of the store floor',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			requestBody: SE.requestBody_schema_ref('store/floor'),
			responses: {
				200: SE.response_schema_ref(200, 'store/floor'),
				404: SE.response(404),
			},
		},
		delete: {
			tags: ['store.floor'],
			summary: 'Delete a store floor',
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					description: 'UUID of the store floor',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			responses: {
				200: SE.response(200),
				404: SE.response(404),
			},
		},
	},
};

export const pathStoreBox = {
	'/store/box': {
		get: {
			tags: ['store.box'],
			summary: 'Get all store boxes',
			responses: {
				200: SE.response_schema(200, {
					uuid: SE.uuid(),
					name: SE.string('name'),
					warehouse_uuid: SE.uuid(),
					warehouse_name: SE.string('warehouse_name'),
					floor_uuid: SE.uuid(),
					floor_name: SE.string('floor_name'),
					created_by: SE.uuid(),
					created_by_name: SE.string('created_by_name'),
					created_at: SE.date_time(),
					updated_at: SE.date_time(),
					remarks: SE.string('remarks'),
				}),
			},
		},
		post: {
			tags: ['store.box'],
			summary: 'Create a store box',
			requestBody: SE.requestBody_schema_ref('store/box'),
			responses: {
				responses: {
					200: SE.response_schema_ref(200, 'store/box'),
					405: SE.response(405),
				},
			},
		},
	},
	'/store/box/{uuid}': {
		get: {
			tags: ['store.box'],
			summary: 'Get a store box',
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					description: 'UUID of the store box',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			responses: {
				200: SE.response_schema(200, {
					uuid: SE.uuid(),
					name: SE.string('name'),
					warehouse_uuid: SE.uuid(),
					warehouse_name: SE.string('warehouse_name'),
					floor_uuid: SE.uuid(),
					floor_name: SE.string('floor_name'),
					created_by: SE.uuid(),
					created_by_name: SE.string('created_by_name'),
					created_at: SE.date_time(),
					updated_at: SE.date_time(),
					remarks: SE.string('remarks'),
				}),
				404: SE.response(404),
			},
		},
		put: {
			tags: ['store.box'],
			summary: 'Update a store box',
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					description: 'UUID of the store box',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			requestBody: SE.requestBody_schema_ref('store/box'),
			responses: {
				200: SE.response_schema_ref(200, 'store/box'),
				404: SE.response(404),
			},
		},
		delete: {
			tags: ['store.box'],
			summary: 'Delete a store box',
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					description: 'UUID of the store box',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			responses: {
				200: SE.response(200),
				404: SE.response(404),
			},
		},
	},
};

export const pathStorePurchaseReturn = {
	'/store/purchase-return': {
		get: {
			tags: ['store.purchase_return'],
			summary: 'Get all store purchase returns',
			responses: {
				200: SE.response_schema(200, {
					uuid: SE.uuid(),
					id: SE.string('SPR25-0001'),
					purchase_uuid: SE.uuid(),
					purchase_id: SE.string('SP25-0001'),
					created_by: SE.uuid(),
					created_by_name: SE.string('created_by_name'),
					created_at: SE.date_time(),
					remarks: SE.string('remarks'),
				}),
			},
		},
		post: {
			tags: ['store.purchase_return'],
			summary: 'Create a store purchase return',
			requestBody: SE.requestBody_schema_ref('store/purchase_return'),
			responses: {
				responses: {
					200: SE.response_schema_ref(200, 'store/purchase_return'),
					405: SE.response(405),
				},
			},
		},
	},
	'/store/purchase-return/{uuid}': {
		get: {
			tags: ['store.purchase_return'],
			summary: 'Get a store purchase return',
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					description: 'UUID of the store purchase return',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			responses: {
				200: SE.response_schema(200, {
					uuid: SE.uuid(),
					id: SE.string('SPR25-0001'),
					purchase_uuid: SE.uuid(),
					purchase_id: SE.string('SP25-0001'),
					created_by: SE.uuid(),
					created_by_name: SE.string('created_by_name'),
					created_at: SE.date_time(),
					remarks: SE.string('remarks'),
				}),
				404: SE.response(404),
			},
		},
		put: {
			tags: ['store.purchase_return'],
			summary: 'Update a store purchase return',
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					description: 'UUID of the store purchase return',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			requestBody: SE.requestBody_schema_ref('store/purchase_return'),
			responses: {
				200: SE.response_schema_ref(200, 'store/purchase_return'),
				404: SE.response(404),
			},
		},
		delete: {
			tags: ['store.purchase_return'],
			summary: 'Delete a store purchase return',
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					description: 'UUID of the store purchase return',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			responses: {
				200: SE.response(200),
				404: SE.response(404),
			},
		},
	},
	'/store/purchase-return/purchase-return-entry-details/by/{purchase_return_uuid}':
		{
			get: {
				tags: ['store.purchase_return'],
				summary:
					'Get purchase return entry details by purchase return UUID',
				parameters: [
					{
						name: 'purchase_return_uuid',
						in: 'path',
						description: 'UUID of the store purchase return',
						required: true,
						type: 'string',
						format: 'uuid',
					},
				],
				responses: {
					200: SE.response_schema(200, {
						uuid: SE.uuid(),
						id: SE.string('SPR25-0001'),
						purchase_uuid: SE.uuid(),
						purchase_id: SE.string('SP25-0001'),
						created_by: SE.uuid(),
						created_by_name: SE.string('created_by_name'),
						created_at: SE.date_time(),
						remarks: SE.string('remarks'),
						purchase_return_entry: [
							{
								uuid: SE.uuid(),
								purchase_return_uuid: SE.uuid(),
								purchase_return_id: SE.string('SPR25-0001'),
								product_uuid: SE.uuid(),
								product_name: SE.string('product_name'),
								quantity: SE.number(),
								price_per_unit: SE.number(),
								created_by: SE.uuid(),
								created_by_name: SE.string('created_by_name'),
								created_at: SE.date_time(),
								remarks: SE.string('remarks'),
							},
						],
					}),
					404: SE.response(404),
				},
			},
		},
};

export const pathStorePurchaseReturnEntry = {
	'/store/purchase-return-entry': {
		get: {
			tags: ['store.purchase_return_entry'],
			summary: 'Get all store purchase return entries',
			responses: {
				200: SE.response_schema(200, {
					uuid: SE.uuid(),
					purchase_return_uuid: SE.uuid(),
					purchase_return_id: SE.string('SPR25-0001'),
					product_uuid: SE.uuid(),
					product_name: SE.string('product_name'),
					quantity: SE.number(),
					price_per_unit: SE.number(),
					created_by: SE.uuid(),
					created_by_name: SE.string('created_by_name'),
					created_at: SE.date_time(),
					remarks: SE.string('remarks'),
				}),
			},
		},
		post: {
			tags: ['store.purchase_return_entry'],
			summary: 'Create a store purchase return entry',
			requestBody: SE.requestBody_schema_ref(
				'store/purchase_return_entry'
			),
			responses: {
				responses: {
					200: SE.response_schema_ref(
						200,
						'store/purchase_return_entry'
					),
					405: SE.response(405),
				},
			},
		},
	},
	'/store/purchase-return-entry/{uuid}': {
		get: {
			tags: ['store.purchase_return_entry'],
			summary: 'Get a store purchase return entry',
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					description: 'UUID of the store purchase return entry',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			responses: {
				200: SE.response_schema(200, {
					uuid: SE.uuid(),
					purchase_return_uuid: SE.uuid(),
					purchase_return_id: SE.string('SPR25-0001'),
					product_uuid: SE.uuid(),
					product_name: SE.string('product_name'),
					quantity: SE.number(),
					price_per_unit: SE.number(),
					created_by: SE.uuid(),
					created_by_name: SE.string('created_by_name'),
					created_at: SE.date_time(),
					remarks: SE.string('remarks'),
				}),
				404: SE.response(404),
			},
		},
		put: {
			tags: ['store.purchase_return_entry'],
			summary: 'Update a store purchase return entry',
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					description: 'UUID of the store purchase return entry',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			requestBody: SE.requestBody_schema_ref(
				'store/purchase_return_entry'
			),
			responses: {
				200: SE.response_schema_ref(200, 'store/purchase_return_entry'),
				404: SE.response(404),
			},
		},
		delete: {
			tags: ['store.purchase_return_entry'],
			summary: 'Delete a store purchase return entry',
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					description: 'UUID of the store purchase return entry',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			responses: {
				200: SE.response(200),
				404: SE.response(404),
			},
		},
	},
	'/store/purchase-return-entry/by/{purchase_return_uuid}': {
		get: {
			tags: ['store.purchase_return_entry'],
			summary: 'Get all store purchase return entries by purchase return',
			parameters: [
				{
					name: 'purchase_return_uuid',
					in: 'path',
					description: 'UUID of the store purchase return',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			responses: {
				200: SE.response_schema(200, {
					uuid: SE.uuid(),
					purchase_return_uuid: SE.uuid(),
					purchase_return_id: SE.string('SPR25-0001'),
					product_uuid: SE.uuid(),
					product_name: SE.string('product_name'),
					quantity: SE.number(),
					price_per_unit: SE.number(),
					created_by: SE.uuid(),
					created_by_name: SE.string('created_by_name'),
					created_at: SE.date_time(),
					remarks: SE.string('remarks'),
				}),
				404: SE.response(404),
			},
		},
	},
};

export const pathStoreInternalTransfer = {
	'/store/internal-transfer': {
		get: {
			tags: ['store.internal_transfer'],
			summary: 'Get all store internal transfers',
			responses: {
				200: SE.response_schema(200, {
					uuid: SE.uuid(),
					id: SE.integer(),
					internal_transfer_id: SE.string('SIT25-0001'),
					stock_uuid: SE.uuid(),
					stock_id: SE.string('SS25-0001'),
					from_branch_uuid: SE.uuid(),
					from_branch_name: SE.string('from_branch_name'),
					to_branch_uuid: SE.uuid(),
					to_branch_name: SE.string('to_branch_name'),
					warehouse_uuid: SE.uuid(),
					warehouse_name: SE.string('warehouse_name'),
					rack_uuid: SE.uuid(),
					rack_name: SE.string('rack_name'),
					floor_uuid: SE.uuid(),
					floor_name: SE.string('floor_name'),
					box_uuid: SE.uuid(),
					box_name: SE.string('box_name'),
					quantity: SE.number(),
					created_by: SE.uuid(),
					created_by_name: SE.string('created_by_name'),
					created_at: SE.date_time(),
					remarks: SE.string('remarks'),
				}),
			},
		},
		post: {
			tags: ['store.internal_transfer'],
			summary: 'Create a store internal transfer',
			requestBody: SE.requestBody_schema_ref('store/internal_transfer'),
			responses: {
				responses: {
					200: SE.response_schema_ref(200, 'store/internal_transfer'),
					405: SE.response(405),
				},
			},
		},
	},
	'/store/internal-transfer/{uuid}': {
		get: {
			tags: ['store.internal_transfer'],
			summary: 'Get a store internal transfer',
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					description: 'UUID of the store internal transfer',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			responses: {
				200: SE.response_schema(200, {
					uuid: SE.uuid(),
					id: SE.integer(),
					internal_transfer_id: SE.string('SIT25-0001'),
					stock_uuid: SE.uuid(),
					stock_id: SE.string('SS25-0001'),
					from_branch_uuid: SE.uuid(),
					from_branch_name: SE.string('from_branch_name'),
					to_branch_uuid: SE.uuid(),
					to_branch_name: SE.string('to_branch_name'),
					warehouse_uuid: SE.uuid(),
					warehouse_name: SE.string('warehouse_name'),
					rack_uuid: SE.uuid(),
					rack_name: SE.string('rack_name'),
					floor_uuid: SE.uuid(),
					floor_name: SE.string('floor_name'),
					box_uuid: SE.uuid(),
					box_name: SE.string('box_name'),
					quantity: SE.number(),
					created_by: SE.uuid(),
					created_by_name: SE.string('created_by_name'),
					created_at: SE.date_time(),
					remarks: SE.string('remarks'),
				}),
				404: SE.response(404),
			},
		},
		put: {
			tags: ['store.internal_transfer'],
			summary: 'Update a store internal transfer',
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					description: 'UUID of the store internal transfer',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			requestBody: SE.requestBody_schema_ref('store/internal_transfer'),
			responses: {
				200: SE.response_schema_ref(200, 'store/internal_transfer'),
				404: SE.response(404),
			},
		},
		delete: {
			tags: ['store.internal_transfer'],
			summary: 'Delete a store internal transfer',
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					description: 'UUID of the store internal transfer',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			responses: {
				200: SE.response(200),
				404: SE.response(404),
			},
		},
	},
};

export const pathStoreProductTransfer = {
	'/store/product-transfer': {
		get: {
			tags: ['store.product_transfer'],
			summary: 'Get all store product transfers',
			responses: {
				200: SE.response_schema(200, {
					uuid: SE.uuid(),
					id: SE.integer(),
					product_transfer_id: SE.string('SPT25-0001'),
					product_uuid: SE.uuid(),
					product_name: SE.string('product_name'),
					warehouse_uuid: SE.uuid(),
					warehouse_name: SE.string('warehouse_name'),
					order_uuid: SE.uuid(),
					order_id: SE.string('WO25-0001'),
					quantity: SE.number(),
					created_by: SE.uuid(),
					created_by_name: SE.string('created_by_name'),
					created_at: SE.date_time(),
					remarks: SE.string('remarks'),
				}),
			},
		},
		post: {
			tags: ['store.product_transfer'],
			summary: 'Create a store product transfer',
			requestBody: SE.requestBody_schema_ref('store/product_transfer'),
			responses: {
				responses: {
					200: SE.response_schema_ref(200, 'store/product_transfer'),
					405: SE.response(405),
				},
			},
		},
	},

	'/store/product-transfer/{uuid}': {
		get: {
			tags: ['store.product_transfer'],
			summary: 'Get a store product transfer',
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					description: 'UUID of the store product transfer',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			responses: {
				200: SE.response_schema(200, {
					uuid: SE.uuid(),
					id: SE.integer(),
					product_transfer_id: SE.string('SPT25-0001'),
					product_uuid: SE.uuid(),
					product_name: SE.string('product_name'),
					warehouse_uuid: SE.uuid(),
					warehouse_name: SE.string('warehouse_name'),
					order_uuid: SE.uuid(),
					order_id: SE.string('WO25-0001'),
					quantity: SE.number(),
					created_by: SE.uuid(),
					created_by_name: SE.string('created_by_name'),
					created_at: SE.date_time(),
					remarks: SE.string('remarks'),
				}),
				404: SE.response(404),
			},
		},
		put: {
			tags: ['store.product_transfer'],
			summary: 'Update a store product transfer',
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					description: 'UUID of the store product transfer',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			requestBody: SE.requestBody_schema_ref('store/product_transfer'),
			responses: {
				200: SE.response_schema_ref(200, 'store/product_transfer'),
				404: SE.response(404),
			},
		},
		delete: {
			tags: ['store.product_transfer'],
			summary: 'Delete a store product transfer',
			parameters: [
				{
					name: 'uuid',
					in: 'path',
					description: 'UUID of the store product transfer',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			responses: {
				200: SE.response(200),
				404: SE.response(404),
			},
		},
	},
	'/store/product-transfer/by/{order_uuid}': {
		get: {
			tags: ['store.product_transfer'],
			summary: 'Get all store product transfers by order',
			parameters: [
				{
					name: 'order_uuid',
					in: 'path',
					description: 'UUID of the store order',
					required: true,
					type: 'string',
					format: 'uuid',
				},
			],
			responses: {
				200: SE.response_schema(200, {
					uuid: SE.uuid(),
					id: SE.integer(),
					product_transfer_id: SE.string('SPT25-0001'),
					product_uuid: SE.uuid(),
					product_name: SE.string('product_name'),
					warehouse_uuid: SE.uuid(),
					warehouse_name: SE.string('warehouse_name'),
					order_uuid: SE.uuid(),
					order_id: SE.string('WO25-0001'),
					quantity: SE.number(),
					created_by: SE.uuid(),
					created_by_name: SE.string('created_by_name'),
					created_at: SE.date_time(),
					remarks: SE.string('remarks'),
				}),
				404: SE.response(404),
			},
		},
	},
};

export const pathStore = {
	...pathStoreGroup,
	...pathStoreCategory,
	...pathStoreBrand,
	...pathStoreSize,
	...pathStoreVendor,
	...pathStoreProduct,
	...pathStoreBranch,
	...pathStorePurchase,
	...pathStoreStock,
	...pathStorePurchaseEntry,
	...pathStoreWarehouse,
	...pathStoreModel,
	...pathStoreRack,
	...pathStoreFloor,
	...pathStoreBox,
	...pathStorePurchaseReturn,
	...pathStorePurchaseReturnEntry,
	...pathStoreInternalTransfer,
	...pathStoreProductTransfer,
};
