$(document).ready(function(){
  //Load Animation
  $('body').addClass('load-animation');

  //Search Component
  $('.search-activer > a').click(function(){
    $('.container-search').slideToggle();
    $('.container-search input').val('');
    $('.container-search input').focus();
    $(this).find('.fa-angle-up').toggle();
    $(this).find('.fa-search').toggle();
  })

  //Lookbook BG
  var srcBgLookbook = $('.bg-lookbook').attr('src');
  $('.lookbook-header').css('background-image','url('+srcBgLookbook+')')

  //Set Background Hover Menu on Home
  $('.menu-up').hover(function(){
    var backgroundSet = $('.title-menu',this).attr('data-background')
    setBackground('url('+backgroundSet+')');
  },function(){
    destroyBackground();
  });


  $('.menu-up .title-menu').each(function(){
    $(this).parent().parent().width($(this).width()+82)
  });


  function setBackground(bgURL){
    $('.mask-background').removeClass('maskDown');
    $('.mask-background').addClass('maskUp');
    $('.bg_ws').css('background-image',bgURL);
  }

  function destroyBackground(){
    $('.mask-background').removeClass('maskUp');
    $('.mask-background').addClass('maskDown');
  }

  //Slide
  var owl = $("#principal-slide");

  owl.owlCarousel({
    navigation : true,
    slideSpeed : 300,
    paginationSpeed : 400,
    transitionStyle : "fadeUp",
    navigationText : false,
    singleItem:true,
    autoHeight : true,
    afterAction:syncSizeArrows
  });

  function syncSizeArrows(el) {
    var current = this.currentItem;
    var heigthArrow = $($('.owl-item').get(current)).find('.description-slide').outerHeight();
    var heigthPort = $('#principal-slide').outerHeight();
    if (heigthArrow < 80){
      $('.owl-buttons div').height(heigthPort);
      $('.owl-buttons div').css('line-height',heigthPort+'px');

    }else{
      $('.owl-buttons div').height(heigthArrow);
      $('.owl-buttons div').css('line-height',heigthArrow+'px');
    }
  }

  //Elipsis
  $(".ellipsis").dotdotdot();
  $(window).resize(function(){
    $(".ellipsis").dotdotdot("update");
  })

  //Animation Helper for Image Options (Grid)
  $('.grid_box').each(function(){
    $('h3',this).addClass('ellipsis');
    $(".ellipsis").dotdotdot("update");
  })

  $('.grid_box').hover(function(){
    $(this).addClass('hover_grid');
    $('.mask-active',this).addClass('mask-anim');
  },function(){
    $(this).removeClass('hover_grid');
    $('.mask-active',this).removeClass('mask-anim');
  });

  //Article Headerfix
  $('.header-post').affix({
    offset:{
      top: 180
    }
  });

  $('.header-post.affix').width($('.wrap-block-grid .row').width()-40);

  $(window).resize(function(){
    $('.header-post.affix').width($('.wrap-block-grid .row').width()-40);
  })

  $(window).scroll(function(){
    var heightHeaderPost = $('.header-post').outerHeight();
    if(!$('.header-post').hasClass('affix-top')){
      $('.article-wrap').css('padding-top',heightHeaderPost);
      $('aside').css('padding-top',heightHeaderPost);
    }else{
      $('.article-wrap').css('padding-top','0px');
      $('aside').css('padding-top','0');
    }
  });

  //Back to Top
  $(window).scroll(function() {
    var scrollPosy = $(this).scrollTop();
    if(scrollPosy >= 100){
      $('#go-top').addClass('activeBackTop');
    }

    if(scrollPosy < 100){
      $('#go-top').removeClass('activeBackTop');
    }
  });

  $('#go-top').click(function(){
    $('html,body').stop(true,true).animate({
      scrollTop:0
    });
  });

  $('#go-top i').tooltip();

  //File Type
  $('.wrap-file-input').find('.mask-file').click(function(){
    $(this).parent().find('input[type="file"]').click();

    $(this).parent().find('input[type="file"]').change(function(){
      var valueFile = $(this).parent().find('input[type="file"]').val();
      $(this).parent().find('p').html(valueFile);
    });

  });


  //Validation Forms (jQuery Validator)
  $('#contact-form, #corrigenos-form, #inspiranos-form, #empleo-form,#pasantias-form, #casting-form').validate({
    rules: {
      name: {
        minlength: 2,
        required: true
      },
      email: {
        required: true,
        email: true
      },
      message: {
        minlength: 2,
        required: true
      }
    },
    highlight: function (element) {
      $(element).closest('.control-group').removeClass('success').addClass('error');
    },
    success: function (element) {
      element.closest('.control-group').removeClass('error').addClass('success');
    }
  });

  //Custom Messange for jQuery Validator
  jQuery.extend(jQuery.validator.messages, {
    required: "Este Campo es requerido.",
    remote: "Please fix this field.",
    email: "Ingrese un Email Valido.",
    url: "Please enter a valid URL.",
    date: "Please enter a valid date.",
    dateISO: "Please enter a valid date (ISO).",
    number: "Please enter a valid number.",
    digits: "Please enter only digits.",
    creditcard: "Please enter a valid credit card number.",
    equalTo: "Please enter the same value again.",
    accept: "Please enter a value with a valid extension.",
    maxlength: jQuery.validator.format("Please enter no more than {0} characters."),
    minlength: jQuery.validator.format("Ingrese almenos {0} caracteres."),
    rangelength: jQuery.validator.format("Please enter a value between {0} and {1} characters long."),
    range: jQuery.validator.format("Please enter a value between {0} and {1}."),
    max: jQuery.validator.format("Please enter a value less than or equal to {0}."),
    min: jQuery.validator.format("Please enter a value greater than or equal to {0}."),

  });

  //FAQ Component

  //FAQ ID generator for items (requeried for Accordion effect)
  $('.faq-container .panel').each(function(j){
    $('.panel-title a',this).attr('href','#faq-n'+j);
    $('.panel-collapse',this).attr('id','faq-n'+j);
  });


  //Filter based on Data attribute
  $('#filter-faq').change(function(){
    var valueSearch = $(this).val();
    switch (valueSearch) {
      case ('saulGastronomia'):
        $('.faq-container .panel-default[data-filter="saulGastronomia"]').fadeIn();
        $('.faq-container .panel-default[data-filter="saulModa"]').hide();
        $('.faq-container .panel-collapse.in').collapse('hide');
        break;
      case ('saulModa'):
        $('.faq-container .panel-default[data-filter="saulModa"]').fadeIn();
        $('.faq-container .panel-default[data-filter="saulGastronomia"]').hide();
        $('.faq-container .panel-collapse.in').collapse('hide');

        break;

      default:
        $('.faq-container .panel-default').fadeIn();
        $(".faq-container .panel-collapse").collapse('hide');

    }
  });

  //Triggers Expand and Collapse
  $("#expandAll-filter").on("click", function(e) {
    $(".faq-container .panel-collapse").collapse('show');
    $(".faq-container .panel-title").find('a').removeClass('collapsed');
    event.preventDefault();
  });

  $("#collapseAll-filter").on("click", function(e) {
    $(".faq-container .panel-collapse").collapse('hide');
    $(".faq-container .panel-title").find('a').addClass('collapsed');
    event.preventDefault();
  });

  $(".faq-container .panel-title a").click(function(){
    if($(this).hasClass('collapsed')){
      $(this).removeClass('collapsed');
    }else{
      $(this).addClass('collapsed');
    }
  })

  $('.faq-container .panel-title a').each(function(){
    $(this).addClass('collapsed');
  })



  //Lookbook JS
  var Page = (function() {

    var config = {
        $bookBlock : $( '#bb-bookblock' ),
        $navNext : $( '#bb-nav-next' ),
        $navPrev : $( '#bb-nav-prev' ),
        $navFirst : $( '#bb-nav-first' ),
        $navLast : $( '#bb-nav-last' )
      },
      init = function() {
        config.$bookBlock.bookblock( {
          speed : 400,
          shadowSides : 0,
          orientation : 'vertical',
          shadows: false
        });
        initEvents();
      },
      initEvents = function() {

        var $slides = config.$bookBlock.children();

        // add navigation events
        config.$navNext.on( 'click touchstart', function() {
          config.$bookBlock.bookblock( 'next' );
          return false;
        } );

        config.$navPrev.on( 'click touchstart', function() {
          config.$bookBlock.bookblock( 'prev' );
          return false;
        } );

        config.$navFirst.on( 'click touchstart', function() {
          config.$bookBlock.bookblock( 'first' );
          return false;
        } );

        config.$navLast.on( 'click touchstart', function() {
          config.$bookBlock.bookblock( 'last' );
          return false;
        } );

        // add swipe events
        $slides.on( {
          'swipeleft' : function( event ) {
            config.$bookBlock.bookblock( 'next' );
            return false;
          },
          'swiperight' : function( event ) {
            config.$bookBlock.bookblock( 'prev' );
            return false;
          }
        } );

        // add keyboard events
        $( document ).keydown( function(e) {
          var keyCode = e.keyCode || e.which,
            arrow = {
              left : 37,
              up : 38,
              right : 39,
              down : 40
            };

          switch (keyCode) {
            case arrow.left:
              config.$bookBlock.bookblock( 'prev' );
              break;
            case arrow.right:
              config.$bookBlock.bookblock( 'next' );
              break;
          }
        } );
      };

    return { init : init };

  })();

  Page.init();


  resizeWrapLookbok();

  $(window).resize(function(){
    resizeWrapLookbok($('.bb-item').height());
  });

  function resizeWrapLookbok(height){
    $('.bb-bookblock').height(height);
    $('.bb-bookblock img').width($('.bb-item').width()/2)
  }

  $(window).load(function () {
    resizeWrapLookbok($('.bb-item').height());
  });

  function setSameHeight(item1, item2) {
    var $item1 = $(item1),
      $item2 = $(item2),
      item1h = $item1.outerHeight(),
      item2h = $item2.outerHeight(),
      aditionalHeight = item1h - item2h;

    if (aditionalHeight > 0) $item2.height( $item2.height() + aditionalHeight );
    else $item1.height( $item1.height() - aditionalHeight );
  }

  if($('.lookbook-header').get(0) !== undefined) {

    setSameHeight('.principal-header ', '.lookbook-header');
  }

  //Mapbox - Tiendas
  if($('#map-tiendas').get(0) != undefined){
    var map = L.mapbox.map('map-tiendas', 'daguttierrez.h8e4hne2')
      .setView([15.231, -90.461], 6);
    map.dragging.disable();
    map.touchZoom.disable();
    map.doubleClickZoom.disable();
    map.scrollWheelZoom.disable();
    // disable tap handler, if present.
    if (map.tap) map.tap.disable();
    if (map.tap) map.tap.disable();
  }

  if (Modernizr.mq('only screen and (max-width: 480px)')==true) {
    $('ul.pagination').find('.active').prev().css('display','inline');
    $('ul.pagination').find('.active').next().css('display','inline');
  }
});

(function() {

  var event = jQuery.event,

  //helper that finds handlers by type and calls back a function, this is basically handle
  // events - the events object
  // types - an array of event types to look for
  // callback(type, handlerFunc, selector) - a callback
  // selector - an optional selector to filter with, if there, matches by selector
  //     if null, matches anything, otherwise, matches with no selector
    findHelper = function( events, types, callback, selector ) {
      var t, type, typeHandlers, all, h, handle,
        namespaces, namespace,
        match;
      for ( t = 0; t < types.length; t++ ) {
        type = types[t];
        all = type.indexOf(".") < 0;
        if (!all ) {
          namespaces = type.split(".");
          type = namespaces.shift();
          namespace = new RegExp("(^|\\.)" + namespaces.slice(0).sort().join("\\.(?:.*\\.)?") + "(\\.|$)");
        }
        typeHandlers = (events[type] || []).slice(0);

        for ( h = 0; h < typeHandlers.length; h++ ) {
          handle = typeHandlers[h];

          match = (all || namespace.test(handle.namespace));

          if(match){
            if(selector){
              if (handle.selector === selector  ) {
                callback(type, handle.origHandler || handle.handler);
              }
            } else if (selector === null){
              callback(type, handle.origHandler || handle.handler, handle.selector);
            }
            else if (!handle.selector ) {
              callback(type, handle.origHandler || handle.handler);

            }
          }


        }
      }
    };

  /**
   * Finds event handlers of a given type on an element.
   * @param {HTMLElement} el
   * @param {Array} types an array of event names
   * @param {String} [selector] optional selector
   * @return {Array} an array of event handlers
   */
  event.find = function( el, types, selector ) {
    var events = ( $._data(el) || {} ).events,
      handlers = [],
      t, liver, live;

    if (!events ) {
      return handlers;
    }
    findHelper(events, types, function( type, handler ) {
      handlers.push(handler);
    }, selector);
    return handlers;
  };
  /**
   * Finds all events.  Group by selector.
   * @param {HTMLElement} el the element
   * @param {Array} types event types
   */
  event.findBySelector = function( el, types ) {
    var events = $._data(el).events,
      selectors = {},
    //adds a handler for a given selector and event
      add = function( selector, event, handler ) {
        var select = selectors[selector] || (selectors[selector] = {}),
          events = select[event] || (select[event] = []);
        events.push(handler);
      };

    if (!events ) {
      return selectors;
    }
    //first check live:
    /*$.each(events.live || [], function( i, live ) {
     if ( $.inArray(live.origType, types) !== -1 ) {
     add(live.selector, live.origType, live.origHandler || live.handler);
     }
     });*/
    //then check straight binds
    findHelper(events, types, function( type, handler, selector ) {
      add(selector || "", type, handler);
    }, null);

    return selectors;
  };
  event.supportTouch = "ontouchend" in document;

  $.fn.respondsTo = function( events ) {
    if (!this.length ) {
      return false;
    } else {
      //add default ?
      return event.find(this[0], $.isArray(events) ? events : [events]).length > 0;
    }
  };
  $.fn.triggerHandled = function( event, data ) {
    event = (typeof event == "string" ? $.Event(event) : event);
    this.trigger(event, data);
    return event.handled;
  };
  /**
   * Only attaches one event handler for all types ...
   * @param {Array} types llist of types that will delegate here
   * @param {Object} startingEvent the first event to start listening to
   * @param {Object} onFirst a function to call
   */
  event.setupHelper = function( types, startingEvent, onFirst ) {
    if (!onFirst ) {
      onFirst = startingEvent;
      startingEvent = null;
    }
    var add = function( handleObj ) {

        var bySelector, selector = handleObj.selector || "";
        if ( selector ) {
          bySelector = event.find(this, types, selector);
          if (!bySelector.length ) {
            $(this).delegate(selector, startingEvent, onFirst);
          }
        }
        else {
          //var bySelector = event.find(this, types, selector);
          if (!event.find(this, types, selector).length ) {
            event.add(this, startingEvent, onFirst, {
              selector: selector,
              delegate: this
            });
          }

        }

      },
      remove = function( handleObj ) {
        var bySelector, selector = handleObj.selector || "";
        if ( selector ) {
          bySelector = event.find(this, types, selector);
          if (!bySelector.length ) {
            $(this).undelegate(selector, startingEvent, onFirst);
          }
        }
        else {
          if (!event.find(this, types, selector).length ) {
            event.remove(this, startingEvent, onFirst, {
              selector: selector,
              delegate: this
            });
          }
        }
      };
    $.each(types, function() {
      event.special[this] = {
        add: add,
        remove: remove,
        setup: function() {},
        teardown: function() {}
      };
    });
  };
})(jQuery);
(function($){
  var isPhantom = /Phantom/.test(navigator.userAgent),
    supportTouch = !isPhantom && "ontouchend" in document,
    scrollEvent = "touchmove scroll",
  // Use touch events or map it to mouse events
    touchStartEvent = supportTouch ? "touchstart" : "mousedown",
    touchStopEvent = supportTouch ? "touchend" : "mouseup",
    touchMoveEvent = supportTouch ? "touchmove" : "mousemove",
    data = function(event){
      var d = event.originalEvent.touches ?
        event.originalEvent.touches[ 0 ] :
        event;
      return {
        time: (new Date).getTime(),
        coords: [ d.pageX, d.pageY ],
        origin: $( event.target )
      };
    };

  /**
   * @add jQuery.event.swipe
   */
  var swipe = $.event.swipe = {
    /**
     * @attribute delay
     * Delay is the upper limit of time the swipe motion can take in milliseconds.  This defaults to 500.
     *
     * A user must perform the swipe motion in this much time.
     */
    delay : 500,
    /**
     * @attribute max
     * The maximum distance the pointer must travel in pixels.  The default is 75 pixels.
     */
    max : 75,
    /**
     * @attribute min
     * The minimum distance the pointer must travel in pixels.  The default is 30 pixels.
     */
    min : 30
  };

  $.event.setupHelper( [

  /**
   * @hide
   * @attribute swipe
   */
    "swipe",
  /**
   * @hide
   * @attribute swipeleft
   */
    'swipeleft',
  /**
   * @hide
   * @attribute swiperight
   */
    'swiperight',
  /**
   * @hide
   * @attribute swipeup
   */
    'swipeup',
  /**
   * @hide
   * @attribute swipedown
   */
    'swipedown'], touchStartEvent, function(ev){
    var
    // update with data when the event was started
      start = data(ev),
      stop,
      delegate = ev.delegateTarget || ev.currentTarget,
      selector = ev.handleObj.selector,
      entered = this;

    function moveHandler(event){
      if ( !start ) {
        return;
      }
      // update stop with the data from the current event
      stop = data(event);

      // prevent scrolling
      if ( Math.abs( start.coords[0] - stop.coords[0] ) > 10 ) {
        event.preventDefault();
      }
    };

    // Attach to the touch move events
    $(document.documentElement).bind(touchMoveEvent, moveHandler)
      .one(touchStopEvent, function(event){
        $(this).unbind( touchMoveEvent, moveHandler);
        // if start and stop contain data figure out if we have a swipe event
        if ( start && stop ) {
          // calculate the distance between start and stop data
          var deltaX = Math.abs(start.coords[0] - stop.coords[0]),
            deltaY = Math.abs(start.coords[1] - stop.coords[1]),
            distance = Math.sqrt(deltaX*deltaX+deltaY*deltaY);

          // check if the delay and distance are matched
          if ( stop.time - start.time < swipe.delay && distance >= swipe.min ) {
            var events = ['swipe'];
            // check if we moved horizontally
            if( deltaX >= swipe.min && deltaY < swipe.min) {
              // based on the x coordinate check if we moved left or right
              events.push( start.coords[0] > stop.coords[0] ? "swipeleft" : "swiperight" );
            } else
            // check if we moved vertically
            if(deltaY >= swipe.min && deltaX < swipe.min){
              // based on the y coordinate check if we moved up or down
              events.push( start.coords[1] < stop.coords[1] ? "swipedown" : "swipeup" );
            }

            // trigger swipe events on this guy
            $.each($.event.find(delegate, events, selector), function(){
              this.call(entered, ev, {start : start, end: stop})
            })

          }
        }
        // reset start and stop
        start = stop = undefined;
      })
  });

})(jQuery)


