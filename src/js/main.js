$(document).ready(function(){

  //////////
  // Global variables
  //////////

  const _window = $(window);
  const _document = $(document);

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
  $('.sidebar__link').on('click', function(){
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

  $('.trending__wrapper').slick({
    autoplay: true,
    dots: false,
    arrows: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    centerMode: true,
    variableWidth: true
  });

  // handle outside click
  $(document).click(function (e) {
    var container = new Array();
    container.push($('.ui-select'));

    $.each(container, function(key, value) {
        if (!$(value).is(e.target) && $(value).has(e.target).length === 0) {
            $(value).removeClass('active');
        }
    });
  });

  // numeric input
  $('.ui-number span').on('click', function(e){
    var element = $(this).parent().find('input');
    var currentValue = parseInt($(this).parent().find('input').val()) || 0;

    if( $(this).data('action') == 'minus' ){
      if(currentValue <= 1){
        return false;
      }else{
        element.val( currentValue - 1 );
      }
    } else if( $(this).data('action') == 'plus' ){
      if(currentValue >= 99){
        return false;
      } else{
        element.val( currentValue + 1 );
      }
    }
  });


  // Masked input
  $(".js-dateMask").mask("99.99.9999",{placeholder:"__ __ ____"});
  $(".js-dateMask2").mask("99.99.99",{placeholder:"ДД.ММ.ГГ"});
  $(".js-indexMask").mask("999 999",{placeholder:"000 000"});
  $("input[type='tel']").mask("+7 (000) 000-0000", {placeholder: "+7 (___) ___-____"});


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
  $('.js-test-loader').on('click', function(){
    localStorage.setItem("isFirstLoadComplete", "false");
    setTimeout(function(){
      location.reload();
    },300)
  });
});
