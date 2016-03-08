/**
 * RoomsController
 *
 * @description :: Server-side logic for managing rooms
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	returnAll: function (req, res) {
    console.log(req.session.identifier + ':' + req.param('id'));
    Rooms.find({where: {owner:req.session.identifier, house:req.param('id')}}).exec(function findHouses(err, temp){
        if(err){
          console.log('errror in the rooms could not add');
          req.session.rooms = [];
          req.session.devices = [];
          return res.redirect('main');

        }
          console.log("this is the rooms info");
          console.log(temp);
          console.log(temp.length);
          req.session.rooms = temp;
          return res.view('room',{id:req.param('id')});

      });
  },


  delete: function (req, res) {
      Rooms.destroy({ name : req.param('name') }).exec(function createdCB(err, created){
        if(err){
          return res.redirect('main');
        }
        Rooms.find({where: {owner:req.session.identifier, house:req.param('id')}}).exec(function findHouses(err, temp){
          if(err){
            console.log('errror in the rooms could not add');
            req.session.rooms = [];
            req.session.devices = [];
            return res.redirect('main');

          }
            console.log("this is the rooms info");
            console.log(temp);
            console.log(temp.length);
            req.session.rooms = temp;
            return res.view('room',{id:req.param('id')});
        });
    });
	},


	add: function (req, res) {
    console.log("adding the Room");
    console.log(req.param('name') + " : " + req.param('password') );
    Rooms.create({ name : req.param('name') , house : req.param('id'), owner: req.session.identifier }).exec(function createdCB(err, created){
      if(err){
        return res.redirect('main');
      }else{
        console.log('I think we created him ' + created );
        console.log(created);
        req.session.devices = [];
        req.session.rooms.push(created);
        return res.view('room',{id:req.param('id')});
      }
    });
  }	
};

