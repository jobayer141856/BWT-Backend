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
		model_uuid: SE.uuid(),
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
	required: ['uuid', 'name', 'created_at', 'type', 'service_warranty_days'],
	properties: {
		uuid: SE.uuid(),
		category_uuid: SE.uuid(),
		model_uuid: SE.uuid(),
		size_uuid: SE.uuid(),
		name: SE.string('Product 1'),
		warranty_days: SE.integer(),
		service_warranty_days: SE.integer(),
		type: SE.string('product'),
		is_maintaining_stock: SE.boolean(),
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

export const defPurchase = SED({
	required: ['uuid', 'created_at', 'vendor_uuid', 'branch_uuid'],
	properties: {
		uuid: SE.uuid(),
		vendor_uuid: SE.uuid(),
		branch_uuid: SE.uuid(),
		created_by: SE.uuid(),
		created_at: SE.date_time(),
		updated_at: SE.date_time(),
		remarks: SE.string('remarks'),
	},
	xml: 'Store/Purchase',
});

export const defStock = SED({
	required: ['uuid', 'created_at', 'product_uuid', 'branch_uuid'],
	properties: {
		uuid: SE.uuid(),
		product_uuid: SE.uuid(),
		warehouse_1: SE.number(),
		warehouse_2: SE.number(),
		warehouse_3: SE.number(),
		created_by: SE.uuid(),
		created_at: SE.date_time(),
		updated_at: SE.date_time(),
		remarks: SE.string('remarks'),
	},
	xml: 'Store/Stock',
});

export const defPurchaseEntry = SED({
	required: [
		'uuid',
		'created_at',
		'purchase_uuid',
		'stock_uuid',
		'quantity',
		'price_per_unit',
		'warehouse_uuid',
		'rack_uuid',
		'floor_uuid',
		'box_uuid',
	],
	properties: {
		uuid: SE.uuid(),
		purchase_uuid: SE.uuid(),
		stock_uuid: SE.uuid(),
		serial_no: SE.string('serial_no'),
		quantity: SE.number(),
		price_per_unit: SE.number(),
		discount: SE.number(),
		warehouse_uuid: SE.uuid(),
		rack_uuid: SE.uuid(),
		floor_uuid: SE.uuid(),
		box_uuid: SE.uuid(),
		created_by: SE.uuid(),
		created_at: SE.date_time(),
		updated_at: SE.date_time(),
		remarks: SE.string('remarks'),
	},
	xml: 'Store/PurchaseEntry',
});

export const defWarehouse = SED({
	required: ['uuid', 'created_at', 'branch_uuid', 'name'],
	properties: {
		uuid: SE.uuid(),
		branch_uuid: SE.uuid(),
		name: SE.string('Warehouse 1'),
		created_by: SE.uuid(),
		created_at: SE.date_time(),
		updated_at: SE.date_time(),
		remarks: SE.string('remarks'),
	},
	xml: 'Store/Warehouse',
});

export const defModel = SED({
	required: ['uuid', 'created_at', 'brand_uuid', 'name'],
	properties: {
		uuid: SE.uuid(),
		brand_uuid: SE.uuid(),
		name: SE.string('Room 1'),
		created_by: SE.uuid(),
		created_at: SE.date_time(),
		updated_at: SE.date_time(),
		remarks: SE.string('remarks'),
	},
	xml: 'Store/Model',
});

export const defRack = SED({
	required: ['uuid', 'created_at', 'warehouse_uuid', 'name'],
	properties: {
		uuid: SE.uuid(),
		warehouse_uuid: SE.uuid(),
		name: SE.string('Rack 1'),
		created_by: SE.uuid(),
		created_at: SE.date_time(),
		updated_at: SE.date_time(),
		remarks: SE.string('remarks'),
	},
	xml: 'Store/Rack',
});

export const defFloor = SED({
	required: ['uuid', 'created_at', 'rack_uuid', 'name'],
	properties: {
		uuid: SE.uuid(),
		rack_uuid: SE.uuid(),
		name: SE.string('Floor 1'),
		created_by: SE.uuid(),
		created_at: SE.date_time(),
		updated_at: SE.date_time(),
		remarks: SE.string('remarks'),
	},
	xml: 'Store/Floor',
});

export const defBox = SED({
	required: ['uuid', 'created_at', 'floor_uuid', 'name'],
	properties: {
		uuid: SE.uuid(),
		floor_uuid: SE.uuid(),
		name: SE.string('Box 1'),
		created_by: SE.uuid(),
		created_at: SE.date_time(),
		updated_at: SE.date_time(),
		remarks: SE.string('remarks'),
	},
	xml: 'Store/Box',
});

export const defPurchaseReturn = SED({
	required: ['uuid', 'created_at', 'purchase_uuid'],
	properties: {
		uuid: SE.uuid(),
		purchase_uuid: SE.uuid(),
		created_by: SE.uuid(),
		created_at: SE.date_time(),
		updated_at: SE.date_time(),
		remarks: SE.string('remarks'),
	},
	xml: 'Store/PurchaseReturn',
});

export const defPurchaseReturnEntry = SED({
	required: [
		'uuid',
		'created_at',
		'purchase_entry_uuid',
		'quantity',
		'price_per_unit',
	],
	properties: {
		uuid: SE.uuid(),
		purchase_return_uuid: SE.uuid(),
		quantity: SE.number(),
		price_per_unit: SE.number(),
		discount: SE.number(),
		created_by: SE.uuid(),
		created_at: SE.date_time(),
		updated_at: SE.date_time(),
		remarks: SE.string('remarks'),
	},
	xml: 'Store/PurchaseReturnEntry',
});

export const defInternalTransfer = SED({
	required: [
		'uuid',
		'created_at',
		'stock_uuid',
		'from_branch_uuid',
		'to_branch_uuid',
		'quantity',
		'warehouse_uuid',
		'rack_uuid',
		'floor_uuid',
		'box_uuid',
	],
	properties: {
		uuid: SE.uuid(),
		stock_uuid: SE.uuid(),
		from_branch_uuid: SE.uuid(),
		to_branch_uuid: SE.uuid(),
		warehouse_uuid: SE.uuid(),
		rack_uuid: SE.uuid(),
		floor_uuid: SE.uuid(),
		box_uuid: SE.uuid(),
		quantity: SE.number(),
		created_by: SE.uuid(),
		created_at: SE.date_time(),
		updated_at: SE.date_time(),
		remarks: SE.string('remarks'),
	},
	xml: 'Store/InternalTransfer',
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
	purchase: defPurchase,
	stock: defStock,
	purchase_entry: defPurchaseEntry,
	warehouse: defWarehouse,
	model: defModel,
	rack: defRack,
	floor: defFloor,
	box: defBox,
	purchase_return: defPurchaseReturn,
	purchase_return_entry: defPurchaseReturnEntry,
	internal_transfer: defInternalTransfer,
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
	{
		name: 'store.purchase',
		description: 'Operations about purchase',
	},
	{
		name: 'store.stock',
		description: 'Operations about stock',
	},
	{
		name: 'store.purchase_entry',
		description: 'Operations about purchase_entry',
	},
	{
		name: 'store.warehouse',
		description: 'Operations about warehouse',
	},
	{
		name: 'store.model',
		description: 'Operations about model',
	},
	{
		name: 'store.rack',
		description: 'Operations about rack',
	},
	{
		name: 'store.floor',
		description: 'Operations about floor',
	},
	{
		name: 'store.box',
		description: 'Operations about box',
	},
	{
		name: 'store.purchase_return',
		description: 'Operations about purchase_return',
	},
	{
		name: 'store.purchase_return_entry',
		description: 'Operations about purchase_return_entry',
	},
	{
		name: 'store.internal_transfer',
		description: 'Operations about internal_transfer',
	},
];
