simply.landingPageCollectionProductSlider = function(){
  if($(".landing-page-slider").length > 0){
    var collectionProductBlock = $(".collection_product_wrap");
    if(screen.width > 767){
      var sliderLandingpageThree = $(".slider-landing-page-three");
    }
    $(window).load(function() {
      $(collectionProductBlock).slick({
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 3,
        arrows: true,
        dots: false,
        responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            centerMode: true,
            centerPadding: '60px',
            arrows: false,
            dots: false
          }
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: true,
            centerPadding: '60px',
            arrows: false,
            dots: false
          }
        }
        ]
      });
    });

    $(sliderLandingpageThree).slick({
      infinite: true,
      speed: 300,
      slidesToShow: 5,
      slidesToScroll: 5,
      arrows: true,
      dots: false,
      responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          centerMode: true,
          centerPadding: '60px',
          arrows: false,
          dots: false
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '60px',
          arrows: false,
          dots: false
        }
      }
      ]
    });
  } 
};

$(document).ready(function(){
  if($(window).width() > 767){
  simply.landingPageCollectionProductSlider();
}
});