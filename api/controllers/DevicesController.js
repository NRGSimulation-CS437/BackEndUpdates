/**
 * DevicesController
 *
 * @description :: Server-side logic for managing devices
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	returnAll: function (req, res) {
    console.log(req.session.identifier + ':' + req.param('id') + ":" + req.param('room'));
    Devices.find({where: {owner:req.session.identifier, house:req.param('id'), room: req.param('room')}}).exec(function findHouses(err, temp){
        if(err){
          console.log('errror in the rooms could not add');
          req.session.devices = [];
          return res.redirect('main');

        }
          console.log("this is the devices info");
          console.log(temp);
          console.log(temp.length);
          req.session.devices = temp;
          return res.view('device',{id:req.param('id'),room: req.param('room')});

      });
  	},


  	delete: function (req, res) {
      Devices.destroy({ name : req.param('name') }).exec(function createdCB(err, created){
        if(err){
          return res.redirect('main');
        }
        console.log(req.session.identifier + ':' + req.param('id') + ":" + req.param('room'));
        Devices.find({where: {owner:req.session.identifier, house:req.param('id'), room: req.param('room')}}).exec(function findHouses(err, temp){
          if(err){
            console.log('errror in the rooms could not add');
            req.session.devices = [];
            return res.redirect('main');
          }
            console.log("this is the devices info");
            console.log(temp);
            console.log(temp.length);
            req.session.devices = temp;
            return res.view('device',{id:req.param('id'),room: req.param('room')});
        });
      });
  	},


  	add: function (req, res) {
      console.log("adding the Room");
      console.log(req.param('name') + " : " + req.param('room') );
      console.log(req.param('id') + " : " + req.param('image') );
      console.log(req.param('watts') + " : " + req.param('trigger') );
      Devices.create({ name : req.param('name') , house : req.param('id'), room: req.param('room'),
       owner: req.session.identifier,watts: req.param('watts'), image: req.param('image'),
        trigger: req.param('trigger')}).exec(function createdCB(err, created){
        if(err){
          console.log('what the fuck I couldnt add the device');
          return res.redirect('main');
        }else{
          console.log('I think we created him ' + created );
          console.log(created);
          req.session.devices.push(created);
          return res.view('device',{id:req.param('id'),room: req.param('room')});
        }
      });
  	}	
};

