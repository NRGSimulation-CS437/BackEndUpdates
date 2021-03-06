/**
* House.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	name: {
      type: "string",
      required: true
    },
    owner: {
      type: "string",
      required: true
    },
    image: {
      type: "string",
      required: true
    },
    url: {
      type: "string",
      required: true
    },
    zipCode:
    {
      type: "string"
    }
  }
};


/**
 * FileController
 *
 * @description :: Server-side logic for managing files
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    index: function (req,res){

        res.writeHead(200, {'content-type': 'text/html'});
        res.end(
            '<form action="http://localhost:1337/file/upload" enctype="multipart/form-data" method="post">'+
            '<input type="text" name="title"><br>'+
            '<input type="file" name="avatar" multiple="multiple"><br>'+
            '<input type="submit" value="Upload">'+
            '</form>'
        )
    },
    upload: function  (req, res) {
        req.file('avatar').upload({
            dirname: '../../assets/images/house'
        },function (err, uploadedFiles) {
            if (err) return res.negotiate(err);

            return res.json({
                message: uploadedFiles.length + ' file(s) uploaded successfully',
                uploadedFiles: uploadedFiles
            });
        });
    }
};