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
					brand_uuid: SE.uuid(),
					brand_name: SE.string('brand_name'),
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
					brand_uuid: SE.uuid(),
					brand_name: SE.string('brand_name'),
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
					brand_uuid: SE.uuid(),
					brand_name: SE.string('brand_name'),
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
					brand_uuid: SE.uuid(),
					brand_name: SE.string('brand_name'),
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

export const pathStore = {
	...pathStoreGroup,
	...pathStoreCategory,
	...pathStoreBrand,
	...pathStoreSize,
	...pathStoreVendor,
	...pathStoreProduct,
	...pathStoreBranch,
};
