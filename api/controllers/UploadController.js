/**
 * UploadController
 *
 * @description :: Server-side logic for managing uploads
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    index: function (req,res){

        res.writeHead(200, {'content-type': 'text/html'});
        res.end(
            '<form action="http://localhost:1337/upload/upload" enctype="multipart/form-data" method="post">'+
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