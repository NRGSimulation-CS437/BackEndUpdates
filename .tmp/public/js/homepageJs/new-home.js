/**
 * Created by Levi on 3/1/16.
 */
/**
 * Main script created to manage the {NewHomeFooter}
 * Author: Harrisson Restrepo
 */
var NewHomeFooter = (function(){
  var me={},settings={},s;
  /**
   * Constructor main comp method everything starts from here!
   * @method init
   * @return {Function} starts the main component
   */
  me.init = function() {
    settings.elem = $('footer');
    s = settings;
    initMobileCollapsibleList();
  };

  /**
   * We make that the lists of links in the footer become collapsible
   * @method {initMobileCollapsibleList}
   * @return {Function}
   */
  function initMobileCollapsibleList() {
    $(window).resize(function() {

      var listcols = s.elem.find('.footer-col');
      listcols.each(function(){
        var $el = $(this), titles = $el.find('.list-title[data-toggleable]'), contents = $el.find('.list-content');
        if(window.matchMedia("(max-width: 768px)").matches) {
          titles.unbind('click');
          titles.on('click', function(){
            contents.slideToggle(300);
          });
        } else {
          titles.unbind('click');
          contents.removeAttr('style');
        }//this match
      });

    }).trigger('resize');
  };

  return me;
}());

$(function() {
  NewHomeFooter.init();
});

/**
 * Main script created to manage the {NewHomeHeader}
 * Author: Harrisson Restrepo
 */
var NewHomeHeader = (function(){
  var me={},settings={},s;
  /**
   * Constructor main comp method everything starts from here!
   * @method init
   * @return {Function} starts the main component
   */
  me.init = function() {
    settings.elem = $('body.new-home > header');
    settings.slider = $('body.new-home > section.slider');
    s = settings;
    initSlider();
    initMobileMenu();
  };

  /**
   * From here we start the new home slider and send params to it
   * @method {initSlider}
   * @return {Function}
   */
  function initSlider() {
    s.slider.find('.main-slider').slick({
      lazyLoad: 'ondemand',
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: true,
      zIndex: 9000,
      focusOnSelect: true,
      autoplay: true,
      infinite: true,
      speed: 500,
      fade: true,
      cssEase: 'linear',
      prevArrow: s.slider.find('.prev-nav'),
      nextArrow: s.slider.find('.next-nav')
    });
  };

  /**
   * Once the screen has mobile sizes, we start the toggleable items
   * @method {initMobileMenu}
   * @return {Function}
   */
  function initMobileMenu() {
    var submenu =  s.elem.find('.submenu-wrapper'), c=0;
    $(window).resize(function() {
      if(window.matchMedia("(max-width: 768px)").matches) {
        submenu.each(function(){
          var $el = $(this);
          $el.parent('li').children('a').unbind('click');
          //console.log($el);
          $el.parent('li').children('a').on('click', function(event){
            var href = $(this);
            href.next('.submenu-wrapper').slideToggle(300);
            event.preventDefault();
          });

        });
      } else {
        submenu.each(function(){
          $(this).removeAttr('style');
          $(this).parent('li').children('a').unbind('click');
        });
      }//this match
    }).trigger('resize');
  };

  return me;
}());

$(function(){
  NewHomeHeader.init();
});

/**
 * Main script created to manage social sharing on posts
 * Applies to Facebook, Twitter and Instagram
 *
 * @instructions: fill variable values with the accounts data you want
 * to work with.
 *
 * @author: Harrisson Restrepo
 */
;
(function () {

  //app and account settings
  //please fill them
  //gary FB page id: 1208462662504205
  var settings = {
    'fb_app_id': '1491764791127898',
    'fb_page_id' : '1208462662504205',
    'it_client_id' : '16e88406ced24f90b2326b1991bcd42a'
  };

  var publishForm = $('form.social-sharing'), postTitle, postLink,
    fbShared, ttShared, itShared, postBtn = publishForm.find('button'),
    alert = $('span.msg');


  //=============================== Some Util methods ==========================
  window.fbAsyncInit = function() {
    FB.init({
      appId      : settings.fb_app_id,
      xfbml      : true,
      version    : 'v2.5'
    });
  };

  /**
   * Creating a small notification system
   * @method {customAlert}
   * @return {Function}
   * @param {String} _action - Want to close it or open it?
   * @param {String} _msg - Say something in the message
   * @param {String} _type - Want an error or an info message?
   */
  function customAlert(_action, _msg, _type) {
    if(_type === 'error') {
      alert.addClass('error');
      alert.removeClass('info');
    } else {
      alert.addClass('info');
      alert.removeClass('error');
    }
    switch (_action) {
      case 'open':
        alert.slideDown(200);
        alert.text(_msg);
        break;
      case 'close':
        alert.fadeOut(200);
        alert.text('');
        break;
    };
  }

  /**
   * Just to validate the url field
   * @method {isValidURL}
   * @return {Boolean}
   * @param {String} _url - Specify the url want to validate
   */
  function isValidURL(_url) {
    return /^(http(s)?:\/\/)?(www\.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(_url);
  }

  postBtn.on('click', function(e){
    postTitle = publishForm.find('#p_title').val();
    postLink = publishForm.find('#p_link').val();
    fbShared = publishForm.find('#facebook').is(':checked');
    ttShared = publishForm.find('#twitter').is(':checked');
    itShared = publishForm.find('#instagram').is(':checked');


    if(postTitle != '' && postLink) {
      if(isValidURL(postLink)) {
        customAlert('open', 'Everything is fine now', 'info');
        if(fbShared) {
          console.log('posting to facebook...');
          postToFacebook(postTitle, postLink);
        }
        if(ttShared) {
          console.log('posting to twitter...');
          postToTwitter(postTitle, postLink)
        }
        if(itShared) {
          console.log('posting to instagram...');
          postToInstragram(postTitle, postLink);
        }
      } else {
        customAlert('open', 'Por favor ingresa una url válida!', 'error');
      }
    } else {
      customAlert('open', 'Los campos son obligatorios!', 'error');
    }
    e.preventDefault();
  });

  //=============================== Social sharing methods ==========================
  /**
   * This is used every time we wanna post to facebook
   * @method {postToFacebook}
   * @return {Function}
   * @param {String} _msg - The message we want to publish on facebook
   * @param {String} _link - If we wanna share a link with the post
   */
  function postToFacebook(_msg, _link) {
    console.log(checkFBLoginStatus());
    if(checkFBLoginStatus() === true) {
      FB.api('/' + settings.fb_page_id, {fields: 'access_token'}, function(resp) {
        //console.log(resp);
        if(resp.access_token) {
          FB.api('/' + settings.fb_page_id + '/feed',
            'post',
            {
              message: _msg,
              link: _link,
              access_token: resp.access_token
            }
            ,function(response) {
              if(response.error) customAlert('open', response.error.message, 'error');
              //console.log(response);
            });
        }
      });
    } else {
      customAlert('open', 'Inicia sessión en Facebook antes de hacer la publicacion!', 'error');
    }
  }

  /**
   * This is used every time we wanna post to twitter
   * @method {postToTwitter}
   * @return {Function}
   * @param {String} _msg - The message we want to publish on twitter
   * @param {String} _link - If we wanna share a link with the post
   */
  function postToTwitter(_msg, _link) {
    $.ajax({
      type: 'POST',
      url: 'http://localhost/test/social.php',
      data: {'msg': _msg, 'link': _link},
      dataType: 'json',
      success: function(result){
        console.log(result);
      },
      error: function(result) {
        console.log(result);
      }
    });
  };


  /**
   * This is used every time we wanna post to Instagram
   * also access token and client id are needed
   * @method {postToInstragram}
   * @return {Function}
   * @param {String} _msg - The message we want to publish on twitter
   * @param {String} _link - If we wanna share a link with the post
   */
  function postToInstragram(_msg, _link) {
    $.ajax({
      type: 'POST',
      url: 'https://api.instagram.com/oauth/authorize/?client_id='+settings.it_client_id+'&redirect_uri=http://localhost:3000/social.html&response_type=token',
      //data: {'msg': _msg, 'link': _link},
      dataType: 'jsonp',
      success: function(result){
        console.log(result);
      },
      error: function(result) {
        console.log(result);
      }
    });
    return false;
  };


  /**
   * This is used to check whether a session is active
   * @method {checkFBLoginStatus}
   * @return {Boolean}
   */
  function checkFBLoginStatus() {
    var connected = false;
    FB.getLoginStatus(function(response) {
      console.log(response);
      if (response.status === 'connected') {
        //var accessToken = response.authResponse.accessToken;
        connected = true;
      } else {
        //console.log('not connected to facebook');
        connected = false;
      }
    });
    return connected;
  }

})();



