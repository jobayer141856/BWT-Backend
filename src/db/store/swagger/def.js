import SE, { SED } from '../../../util/swagger_example.js';

const defGroup = SED({
	required: ['uuid', 'name', 'created_at'],
	properties: {
		uuid: SE.uuid(),
		name: SE.string('Group 1'),
		created_by: SE.uuid(),
		created_at: SE.date_time(),
		updated_at: SE.date_time(),
		remarks: SE.string('remarks'),
	},
	xml: 'Store/Group',
});

const defCategory = SED({
	required: ['uuid', 'name', 'created_at'],
	properties: {
		uuid: SE.uuid(),
		name: SE.string('Category 1'),
		group_uuid: SE.uuid(),
		created_by: SE.uuid(),
		created_at: SE.date_time(),
		updated_at: SE.date_time(),
		remarks: SE.string('remarks'),
	},
	xml: 'Store/Category',
});

const defBrand = SED({
	required: ['uuid', 'name', 'created_at'],
	properties: {
		uuid: SE.uuid(),
		name: SE.string('Brand 1'),
		created_by: SE.uuid(),
		created_at: SE.date_time(),
		updated_at: SE.date_time(),
		remarks: SE.string('remarks'),
	},
	xml: 'Store/Brand',
});

const defSize = SED({
	required: ['uuid', 'name', 'created_at'],
	properties: {
		uuid: SE.uuid(),
		name: SE.string('Size 1'),
		created_by: SE.uuid(),
		created_at: SE.date_time(),
		updated_at: SE.date_time(),
		remarks: SE.string('remarks'),
	},
	xml: 'Store/Size',
});

const defVendor = SED({
	required: [
		'uuid',
		'name',
		'created_at',
		'company_name',
		'phone',
		'address',
		'description',
		'is_active',
	],
	properties: {
		uuid: SE.uuid(),
		brand_uuid: SE.uuid(),
		name: SE.string('Vendor 1'),
		company_name: SE.string('Company 1'),
		phone: SE.string('01521533595'),
		address: SE.string('Address 1'),
		description: SE.string('Description 1'),
		is_active: SE.boolean(),
		created_by: SE.uuid(),
		created_at: SE.date_time(),
		updated_at: SE.date_time(),
		remarks: SE.string('remarks'),
	},
	xml: 'Store/Vendor',
});

export const defProduct = SED({
	required: ['uuid', 'created_at', 'type', 'service_warranty_days'],
	properties: {
		uuid: SE.uuid(),
		category_uuid: SE.uuid(),
		brand_uuid: SE.uuid(),
		size_uuid: SE.uuid(),
		warranty_days: SE.integer(),
		service_warranty_days: SE.integer(),
		type: SE.string('product'),
		created_by: SE.uuid(),
		created_at: SE.date_time(),
		updated_at: SE.date_time(),
		remarks: SE.string('remarks'),
	},
	xml: 'Store/Product',
});

export const defBranch = SED({
	required: ['uuid', 'name', 'created_at'],
	properties: {
		uuid: SE.uuid(),
		name: SE.string('Branch 1'),
		address: SE.string('Address 1'),
		created_by: SE.uuid(),
		created_at: SE.date_time(),
		updated_at: SE.date_time(),
		remarks: SE.string('remarks'),
	},
	xml: 'Store/Branch',
});

//* Marge all
export const defStore = {
	group: defGroup,
	category: defCategory,
	brand: defBrand,
	size: defSize,
	vendor: defVendor,
	product: defProduct,
	branch: defBranch,
};

//* Tag

export const tagStore = [
	{
		name: 'store.group',
		description: 'Everything about your Group',
	},
	{
		name: 'store.category',
		description: 'Operations about category',
	},
	{
		name: 'store.brand',
		description: 'Operations about brand',
	},
	{
		name: 'store.size',
		description: 'Operations about size',
	},
	{
		name: 'store.vendor',
		description: 'Operations about vendor',
	},
	{
		name: 'store.product',
		description: 'Operations about product',
	},
	{
		name: 'store.branch',
		description: 'Operations about branch',
	},
];
