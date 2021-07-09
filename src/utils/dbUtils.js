const _ = require('lodash');
const { snakeCase: toSnakeCase } = require('snake-case');
const toCamelCase = require('camelcase');

module.exports = function dbUtils() {
	return {
		mapToDb,
		mapFromDb,
	};

	function mapToDb(value) {
		return mapDb(value, toSnakeCase);
	}

	function mapFromDb(value) {
		return mapDb(value, toCamelCase);
	}

	// Private

	function mapDb(value, func) {
		if (_.isArray(value)) return value.map((val) => mapDb(val, func));

		if (_.isObject(value)) return _.mapKeys(value, (val, key) => func(key));

		return func(value);
	}
};
