$(onReady);

function onReady() {
  // console.log('jq loaded');

  // Smooth Scroll on clicking nav items
  $('nav a').click(function () {
    // console.log('clicked on it');
    var $href = $(this).attr('href');
    var navHeight = $('nav').outerHeight();
    // Subtract section padding to get 10px between nav bottom and text top
    var sectionPadding = $href === '#home' ? 0 : parseInt($($href + ' h2').css('padding-top'));
    var offset = $href === '#home' ? 0 : navHeight + 10 - sectionPadding;
    $('html,body').stop().animate({
      scrollTop: $($href).offset().top - offset
    }, 1000);
    return false;
  });

  // back to top
  $('#toTop a').click(function () {
    $('html,body').animate({
      scrollTop: 0
    }, 1000);
    return false;
  });

  // Initialize slideshow
  initSlideshow();
}

// Slideshow functionality
function initSlideshow() {
  let currentSlide = 0;
  const slides = $('.hobby-slide');
  const indicators = $('.indicator');
  const totalSlides = slides.length;

  // Detect image orientation and apply layout class
  slides.each(function() {
    const $slide = $(this);
    const $img = $slide.find('img');

    // Wait for image to load to get natural dimensions
    $img.on('load', function() {
      const img = this;
      const aspectRatio = img.naturalWidth / img.naturalHeight;

      // If height > width (portrait), use horizontal layout
      if (aspectRatio < 1) {
        $slide.addClass('portrait');
      } else {
        $slide.removeClass('portrait');
      }
    });

    // Trigger load event if image is already cached
    if ($img[0].complete) {
      $img.trigger('load');
    }
  });

  // Show specific slide
  function showSlide(index) {
    // Wrap around if out of bounds
    if (index >= totalSlides) {
      currentSlide = 0;
    } else if (index < 0) {
      currentSlide = totalSlides - 1;
    } else {
      currentSlide = index;
    }

    // Update slides
    slides.removeClass('active');
    $(slides[currentSlide]).addClass('active');

    // Update indicators
    indicators.removeClass('active');
    $(indicators[currentSlide]).addClass('active');
  }

  // Next slide
  $('.slide-nav.next').click(function () {
    showSlide(currentSlide + 1);
  });

  // Previous slide
  $('.slide-nav.prev').click(function () {
    showSlide(currentSlide - 1);
  });

  // Indicator clicks
  indicators.click(function () {
    const slideIndex = parseInt($(this).attr('data-slide'));
    showSlide(slideIndex);
  });

  // Keyboard navigation
  $(document).keydown(function (e) {
    // Only trigger if hobbies section is in view
    const hobbiesSection = $('#hobbies');
    const scrollPos = $(window).scrollTop();
    const hobbiesTop = hobbiesSection.offset().top - 200;
    const hobbiesBottom = hobbiesTop + hobbiesSection.height();

    if (scrollPos >= hobbiesTop && scrollPos <= hobbiesBottom) {
      if (e.keyCode === 37) { // Left arrow
        showSlide(currentSlide - 1);
      } else if (e.keyCode === 39) { // Right arrow
        showSlide(currentSlide + 1);
      }
    }
  });
}


// Parallaxing + add class active on scroll
$(document).scroll(function () {

  // parallaxing - DISABLED (conflicts with background-attachment: fixed)
  // var $movebg = $(window).scrollTop() * -0.3;
  // $('.portion').css('background-positionY', ($movebg) + 'px');

  // add class active to nav a on scroll
  var scrollPos = $(document).scrollTop() + 100;

  // If at the top of the page, activate home link
  if ($(document).scrollTop() < 50) {
    $('nav a').removeClass("active");
    $('nav a[href="#home"]').addClass("active");
  } else {
    $('nav a').each(function () {
      var currLink = $(this);
      var refElement = $(currLink.attr("href"));
      if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
        $('nav a').removeClass("active");
        currLink.addClass("active");
      }
    });
  }

  // changing padding of nav a on scroll
    if (scrollPos > 250) {
      // $('nav a').addClass('small');
      // $('nav img').addClass('move');
      $('nav span').removeClass('movetext');
      $('header nav').addClass('nav-expanded');
    } else {
      // $('nav a').removeClass('small');
      // $('nav img').removeClass('move');
      $('nav span').addClass('movetext');
      $('header nav').removeClass('nav-expanded');
    }

});
