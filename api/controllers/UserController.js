/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  loadtheshitup: function (req, res) {
 
    // need to make the shit to load up 
    // houses
    // rooms
    // devices
    // for each user that is in there respective session.
    return res.view('main');
    },

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
        console.log(req.param('username') + " : " + req.param('password') );
      User.create({ username : req.param('username') , password : req.param('password') }).exec(function createdCB(err, created){
        console.log('I think we created him ' + created );
        console.log(created);
        req.session.valid = true;
        req.session.identifier = created.id;
        req.session.username = created.username;
        return res.redirect('main');

      });

  	},

	verifyUser: function (req, res) {
    	return res.json({
      		todo: 'verifyUser() is not implemented yet!'
    	});
  	},


  	login: function (req, res) {


      var password, username;

      User.find({where: {username : req.param('username')}}).exec(function findUser(err, temp){

        if(temp.length > 0){

          password = temp[0].password;

        }

      console.log('this is the password : ');
      console.log(password);
      console.log(temp);

      if (req.param('password') === password){

        console.log("log that bitch in");
        req.session.houses = [];
        req.session.valid = true;
        req.session.identifier = temp[0].id;
        req.session.username = temp[0].username;
        //this.loadtheshitup(req, res);
      }

      return res.view('main');

      });



  	},


	logout: function (req, res) {
      req.session.valid = false;
      console.log('loged out :' + req.session.id);
      return res.view('main');

  	} 

};

