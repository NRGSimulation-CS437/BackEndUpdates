/**
 * HouseController
 *
 * @description :: Server-side logic for managing houses
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
      console.log(req.param('name') + " : " + req.param('image') + " : " + req.session.identifier );

      House.create({ name : req.param('name') , image : req.param('image') , owner : req.session.identifier }).exec(function createdCB(err, created){
        console.log('I think we created him ' + created );
        console.log(created);
        req.session.houses.push(created);
        console.log("long list of houses");
        console.log(req.session.houses);
        req.session.recent = created;
        return res.redirect('main');

      });
  	}	
};

