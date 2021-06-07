module.exports = function dbService(knex, logger) {
	return {
		getDatabaseHealth,
	};

	/**
	 * @returns {Promise<boolean>}
	 */
	async function getDatabaseHealth(timeout = 1000) {
		try {
			await knex.raw('SELECT version()').timeout(timeout);
		} catch (err) {
			logger.error('dbService:', err);
			return false;
		}

		return true;
	}
};
