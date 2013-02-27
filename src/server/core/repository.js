var Repository = function(dbUrl, collectionName) {

	// modules vars
	var MongoClient = require('mongodb').MongoClient,
		db, coll;
	
	/**
	 * Connect to the db.
	 * @param callback {object} - the called function once connected
	 */
	var _connect = function(callback) {
		MongoClient.connect(dbUrl, function(err, database) {
			if (err) throw err;
			db = database;
			db.collection(collectionName, function(err, collection) {
				if (err) throw err;
				coll = collection;
				callback();
			});
		});
	};
	
	/**
	 * Find all items in the collection
	 * @param callback {object} - the called function once all items are found
	 */
	var _all = function(callback) {
		coll.find().toArray(function(err, items) {
			if (err) throw err;
			callback(items);
		});
	};
	
	/**
	 * Find all items in the collection matching the query
	 * @param query {object} - the query object
	 * @param callback {object} - the called function once all matching items are found
	 */
	var _find = function(query, callback) {
		coll.find(query).toArray(function(err, items) {
			if (err) throw err;
			callback(items);
		});
	};
	
	/**
	 * Find one item in the collection matching the query
	 * @param query {object} - the query object
	 * @param callback {object} - the called function once a matching item is found
	 */
	var _one = function(query, callback) {
		coll.findOne(query, function(err, item) {
			if (err) throw err;
            callback(item);
		});
	};
	
	/**
	 * Insert a new object in the collection
	 * @param object {object} - the object to insert
	 * @param callback {object} - the called function once object is inserted
	 */
	var _newOne = function(object, callback) {
		coll.insert(object, function(err, item) {
			if (err) throw err;
            callback(err, item);
		});
	};
	
	return {
		connect : _connect,
		all     : _all,
		find    : _find,
		one     : _one,
		newOne     : _newOne
	};
};

module.exports = Repository;