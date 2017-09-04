$(document).ready(function(){

  //////////
  // Global variables
  //////////

  var _window = $(window);
  var _document = $(document);

  function isRetinaDisplay() {
    if (window.matchMedia) {
        var mq = window.matchMedia("only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen  and (min-device-pixel-ratio: 1.3), only screen and (min-resolution: 1.3dppx)");
        return (mq && mq.matches || (window.devicePixelRatio > 1));
    }
  }

  var _mobileDevice = isMobile();
  // detect mobile devices
  function isMobile(){
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      return true
    } else {
      return false
    }
  }

  //////////
  // COMMON
  //////////

 	// Prevent # behavior
	$('[href="#"]').click(function(e) {
		e.preventDefault();
	});

	// Smoth scroll
	$('a[href^="#section"]').click( function() {
        var el = $(this).attr('href');
        $('body, html').animate({
            scrollTop: $(el).offset().top}, 1000);
        return false;
	});

  // PRELOADER
  function setSvgStroke(el){
    var pathLen = el.get(0).getTotalLength().toFixed();
    el.attr('stroke-dasharray', pathLen);
    el.attr('stroke-dashoffset', pathLen);
  }

  // setSvgStroke($('#logoStar'));

  setTimeout(function(){
    $('body').addClass('show-letters')
  }, 4000)

  setTimeout(function(){
    $('body').addClass('remove-fade')
  }, 5000)

  setTimeout(function(){
    $('body').addClass('remove-loader')
  }, 6500)


  // HAMBURGER TOGGLER
  $('.hamburger').on('click', function(){
    $('.hamburger').toggleClass('active');
    $('.mobile-navi').toggleClass('active');
  });

  // sidebar pannel toggler
  $('[data-panel]').on('click', function(){
    var panel = $(this).data('panel');
    if( $('.sidebar-panel[data-for='+panel+']').length > 0 ){
      $('.sidebar__link').removeClass('active')
      $(this).toggleClass('active');
      $('.sidebar-panel').removeClass('active');
      $('.sidebar-panel[data-for='+panel+']').toggleClass('active');
      window.location.hash = panel
    }
  });

  // hash nav
  if(window.location.hash) {
    var hash = window.location.hash.substring(1);
    $('.sidebar__link').removeClass('active')
    $('.sidebar__link[data-panel='+hash+']').addClass('active');
    $('.sidebar-panel').removeClass('active');
    $('.sidebar-panel[data-for='+hash+']').toggleClass('active');
  }

  $('.sidebar__back').on('click', function(){
    $('.sidebar-panel').removeClass('active');
    $('.sidebar__link').removeClass('active');
    window.location.hash = ""
  })

  //////////
  // SLIDERS
  //////////

  $('.point-card__slider').slick({
    autoplay: true,
    autoplaySpeed: 4000,
    dots: true,
    arrows: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    fade: true
  });

  // panzoom
  $(".panzoom").panzoom({
    eventNamespace: ".panzoom",
    transition: true,
    cursor: "move",
    disablePan: false,
    disableZoom: false,
    disableXAxis: false,
    disableYAxis: false,
    which: 1, // left (1), middle (2), or right click (3)
    increment: 0.3,

    // When no scale is passed, this option tells
    // the `zoom` method to increment
    // the scale *linearly* based on the increment option.
    // This often ends up looking like very little happened at larger zoom levels.
    // The default is to multiply/divide the scale based on the increment.
    linearZoom: false,

    // Pan only when the scale is greater than minScale
    panOnlyWhenZoomed: false,

    // min and max zoom scales
    minScale: 1,
    maxScale: 3.5,

    // The default step for the range input
    // Precendence: default < HTML attribute < option setting
    rangeStep: 0.05,

    duration: 400,
    easing: "ease-in-out",

    // Indicate that the element should be contained within its parent when panning
    // Note: this does not affect zooming outside of the parent
    // Set this value to 'invert' to only allow panning outside of the parent element (the opposite of the normal use of contain)
    // 'invert' is useful for a large Panzoom element where you don't want to show anything behind it
    contain: 'invert',

    // Transform value to which to always reset (string)
    // Defaults to the original transform on the element when Panzoom is initialized
    startTransform: undefined,

    // Zoom buttons/links collection (you can also bind these yourself - e.g. `$button.on("click", function( e ) { e.preventDefault(); $elem.panzoom("zoom"); });` )
    $zoomIn: $('.js-zoom-in'),
    $zoomOut: $('.js-zoom-out'),
    // Range input on which to bind zooming functionality
    $zoomRange: $('.js-zoom-range'),
    // Reset buttons/links collection on which to bind the reset method
    $reset: $('.js-reset'),
    // For convenience, these options will be bound to Panzoom events
    // These can all be bound normally on the Panzoom element
    // e.g. `$elem.on("panzoomend", function( e, panzoom ) { console.log( panzoom.getMatrix() ); });`
    onStart: undefined,
    onChange: undefined,
    onZoom: undefined,
    onPan: undefined,
    onEnd: undefined,
    onReset: undefined
  }).panzoom("zoom");

});

// Show preloader only once
$(window).on('load', function () {
  if (typeof(Storage) !== "undefined") {
    // $('.preloader').show()
    // Code for localStorage/sessionStorage.
    if(localStorage.isFirstLoadComplete==="false"){
      localStorage.setItem("isFirstLoadComplete", "true");
    } else {
      $('.preloader').hide();
      $('body').addClass('no-loader')
    }
  } else {
      // No Web Storage support..
  }
});

// TEMP CODE
$(document).ready(function(){

  // reload preloader
  $('.js-test-loader').on('click', function(){
    localStorage.setItem("isFirstLoadComplete", "false");
    setTimeout(function(){
      location.reload();
    },300)
  });

  // close favorites
  $('.favorite-card__close').on('click', function(){
    $(this).closest('.favorite-card').fadeOut();
    // callback
  })

});
