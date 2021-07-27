$(document).ready(function($) {
  $(".mob_up_btn").on("click", function() {
    $("html").animate({ scrollTop: 0 }, "slow");
  });
});