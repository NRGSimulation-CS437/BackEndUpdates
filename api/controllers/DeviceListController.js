/**
 * DeviceListController
 *
 * @description :: Server-side logic for managing devicelists
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	returnAll: function (req, res) {
    	return res.json({
      		todo: 'returnAll() is not implemented yet!'
    	});
  	},


  	delete: function (req, res) {
    	return res.json({
      		todo: 'delete() is not implemented yet!'
    	});
  	},


  	add: function (req, res) {
    	return res.json({
      		todo: 'add() is not implemented yet!'
    	});
  	},

    test: function (req, res) {
      return res.view('test', {
        user: "buttface",
        corndogs: "nothing much to see here"
      });
    }
};

