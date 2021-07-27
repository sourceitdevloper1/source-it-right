simply.ProfileSlider = function(){
  var cust_profile = $("#ahmedabad_studio .customer_profile .profile_slide");
  $(cust_profile).slick({
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: true,
    nextArrow: "<img class='slick_next' src='https://cdn.shopify.com/s/files/1/0285/2667/4059/files/Arrow_right_hl.png?v=1586937807'>",
    prevArrow: "<img class='slick_prev' src='https://cdn.shopify.com/s/files/1/0285/2667/4059/files/Arrow_left_hl.png?v=1586937799'>",
    dots: false,
    responsive: [
    {
      breakpoint: 1025,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        arrows: true,
        dots: false
      }
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: true,
        dots: false
      }
    }
    ]
  });
};

$(document).ready(function(){
  simply.ProfileSlider();
});