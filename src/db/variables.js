import { asc, desc, eq, like, or, sql } from 'drizzle-orm';
import {
	decimal,
	integer,
	pgSchema,
	serial,
	text,
	timestamp,
	uuid,
} from 'drizzle-orm/pg-core';

export const defaultUUID = (column = 'uuid') =>
	text(column, {
		length: 15,
	});

export const uuid_primary = defaultUUID().primaryKey();

export const DateTime = (column) =>
	timestamp(column, {
		mode: 'string',
		withTimezone: false,
	});

export const PG_DECIMAL = (column) =>
	decimal(column, {
		precision: 20,
		scale: 4,
	}).notNull();

export const decimalToNumber = (column) => {
	return sql`coalesce(${column},0)::float8`;
};

export function constructSelectAllQuery(
	baseQuery,
	params,
	defaultSortField = 'created_at',
	additionalSearchFields = [],
	searchFieldNames,
	field_value
) {
	let { q, page, limit, sort, orderby } = params;

	const avoidFields = [
		'uuid',
		'id',
		'created_at',
		'updated_at',
		'approval',
		'entry_time',
		'exit_time',
	];

	// Get search fields from the main table
	const searchFields = Object.keys(
		baseQuery.config.table[Symbol.for('drizzle:Columns')]
	).filter((field) => avoidFields.includes(field) === false);

	// Get table name from baseQuery
	const tableNameSymbol = Object.getOwnPropertySymbols(
		baseQuery.config.table
	).find((symbol) => symbol.toString().includes('OriginalName'));
	const tableName = tableNameSymbol
		? baseQuery.config.table[tableNameSymbol]
		: '';

	// Include table name with fields for the main table
	const searchFieldsWithTable = searchFields.map(
		(field) => `"${tableName}"."${field}"`
	);

	// Include additional search fields from joined tables
	const joinedTables = baseQuery.config.joins || [];
	joinedTables.forEach((join) => {
		const joinTableNameSymbol = Object.getOwnPropertySymbols(
			join.table
		).find((symbol) => symbol.toString().includes('OriginalName'));

		const joinTableName = joinTableNameSymbol
			? join.table[joinTableNameSymbol]
			: '';

		const joinTableFields = Object.keys(
			join.table[Symbol.for('drizzle:Columns')]
		)
			.filter((field) => avoidFields.includes(field) === false)
			.filter((field) => additionalSearchFields.includes(field));

		const joinFieldsWithTable = joinTableFields.map((field) =>
			joinTableName ? `"${joinTableName}"."${field}"` : `"${field}"`
		);

		searchFieldsWithTable.push(...joinFieldsWithTable);
	});

	// Include additional search fields from joined tables
	const allSearchFields = [...searchFieldsWithTable];

	// Apply search filter
	if (searchFieldNames !== undefined && field_value !== undefined) {
		const matchedSearchFields = allSearchFields.filter((field) =>
			field.includes(searchFieldNames)
		);

		const searchConditions = matchedSearchFields
			? sql`LOWER(CAST(${sql.raw(matchedSearchFields[0])} AS TEXT)) LIKE LOWER(${`%${field_value}%`})`
			: sql``;

		if (searchConditions) {
			baseQuery = baseQuery.where(sql`${or(searchConditions)}`);
		}
	} else {
		if (q) {
			const searchConditions = allSearchFields.map((field) => {
				return sql`LOWER(CAST(${sql.raw(field)} AS TEXT)) LIKE LOWER(${`%${q}%`})`;
			});

			if (searchConditions.length > 0) {
				baseQuery = baseQuery.where(sql`${or(...searchConditions)}`);
			}
		}
	}

	// Apply sorting
	if (sort) {
		const order = orderby === 'asc' ? asc : desc;
		baseQuery = baseQuery.orderBy(
			order(baseQuery.config.table[Symbol.for('drizzle:Columns')][sort])
		);
	} else {
		baseQuery = baseQuery.orderBy(
			desc(
				baseQuery.config.table[Symbol.for('drizzle:Columns')][
					defaultSortField
				]
			)
		); // Default sorting
	}

	// Apply pagination
	if (page) {
		const limitValue = limit || 10; // Set your desired limit per page
		const offset = (page - 1) * limitValue;
		baseQuery = baseQuery.limit(limitValue).offset(offset);
	}

	return baseQuery;
}
