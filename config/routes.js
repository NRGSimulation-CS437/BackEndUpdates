/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {view: 'homepage'},
  'get /main': {view: 'main'},
  'get /register': {view: 'register'},
  'get /test': 'DeviceListController.test',


  'post /x/devicelistadd': 'DeviceListController.add',
  'get /x/devicelistdelete': 'DeviceListController.delete',
  'get /x/devicelistdreturnAll': 'DeviceListController.returnAll',
  
  //devices not sure why kevia added two to this but I guess

  'post /x/deviceadd': 'DevicesController.add',
  'get /x/devicedelete': 'DevicesController.delete',
  'get /x/devicereturnAll': 'DevicesController.returnAll',

  'post /x/houseadd': 'HouseController.add',
  'get /x/housedelete': 'HouseController.delete',
  'get /x/housereturnAll': 'HouseController.returnAll',

  'post /x/roomadd': 'RoomsController.add',
  'get /x/roomdelete': 'RoomsController.delete',
  'get /x/roomreturnAll': 'RoomsController.returnAll',

  'post /x/useradd': 'UserController.add',
  'post /x/userdelete': 'UserController.delete',
  'post /x/userreturnAll': 'UserController.returnAll',  
  'post /x/login': 'UserController.login',
  'get /x/logout': 'UserController.logout'

  //we might not need all this but created it for now. 

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
