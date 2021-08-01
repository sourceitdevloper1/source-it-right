simply.miniHeightAction = function (selector) {
  var min_height = 0;
  selector.each(function () {
    var height = $(this).outerHeight();
    if (height > min_height) {
      min_height = height;
    }
  });
  return min_height;
};

simply.miniHeight = function (parent, select) {
  var parentWrapper = $(parent).closest(".shopify-section");
  parentWrapper.each(function (index, item) {
    if ($(parent, item).length > 0) {
      var result = simply.miniHeightAction($(select, item));
      $(parent, item).css("height", result);
    }
  });
};

simply.miniHeightFunction = function(){
  //  cart page static recently view
  if($(".template-cart").length > 0){
    var cart_prod = ".recently-viewed-products-placeholder .product-item .product-item__info";
    simply.miniHeight(cart_prod,cart_prod);
  }
  simply.miniHeight(".product-item__info-inner .product-item__title",".product-item__info-inner .product-item__title");
  simply.miniHeight(".product-item__info-inner .product-item__price-list",".product-item__info-inner .product-item__price-list");
  simply.miniHeight(".text-with-icons.text-with-icons--boxed .text-with-icons__item .text-with-icons__icon-wrapper",".text-with-icons.text-with-icons--boxed .text-with-icons__item .text-with-icons__icon-wrapper");
};


// product Page Mini-Height function
simply.productPageMiniHeight = function(){
  simply.miniHeight(".section.product-promotion-block .block-list__item .promo-block__heading",".section.product-promotion-block .block-list__item .promo-block__heading");
  simply.miniHeight(".section.product-promotion-block .block-list__item .promo-block__content",".section.product-promotion-block .block-list__item .promo-block__content");
  simply.miniHeight(".here-are-some-matches-product-wrapper .tabbed-content .product-item-block-wrap .product-title",".here-are-some-matches-product-wrapper .tabbed-content .product-item-block-wrap .product-title");
};


// Landing Page Mini-Height function
simply.landingPageMiniHeight = function(){
  if($(".landing_page").length > 0 ){
    simply.miniHeight(".landing_product_block .product_card .collection_block .img", ".landing_product_block .product_card .collection_block .img img" );
    simply.miniHeight(".landing_product_block .product_card .collection_block .product_title", ".landing_product_block .product_card .collection_block .product_title h5");
  }
};

simply.elementInViewport = function (el) {
  var top = el.offsetTop;
  var left = el.offsetLeft;
  var width = el.offsetWidth;
  var height = el.offsetHeight;
  top = top  - 100;
  while(el.offsetParent) {
    el = el.offsetParent; 
    top += el.offsetTop;
    left += el.offsetLeft;
  }

  return (
    top < (window.pageYOffset + window.innerHeight) &&
    left < (window.pageXOffset + window.innerWidth) &&
    (top + height) > window.pageYOffset &&
    (left + width) > window.pageXOffset
    );
};

simply.imageLoadOnScroll = function(){
  $(".lazyloadscroll").each(function(index, el) {
    if($(el).closest('.slick-slide').length != 0){
      el = $(el).closest('.shopify-section');
      el = el[0];
    }
    if(simply.elementInViewport(el)){
      $(el).addClass('lazyload').removeClass('lazyloadscroll');
      $(".lazyloadscroll",$(el)).addClass('lazyload').removeClass('lazyloadscroll');
    } 
  });
};

simply.checkoutScrollEvent =function(){
   $(window).scroll(function() {    
    var scroll = $(window).scrollTop();
    if (scroll >= 300) {
      $(".checkout-btn").addClass("fixed-pos");
    }
    else{
      $(".checkout-btn").removeClass("fixed-pos");
    }
  });
};

// megamenu links show more js
simply.customClickEvent = function(){
  $(document).on("click",".custom_megamenu_navs .mega-menu__linklist .mega-menu__item.more_item",function(){
   $(this).toggleClass("active");
   var link_parent =  $(this).parent();
   var text_more = $(this).find(".link").attr("data-more");
   var text_less = $(this).find(".link").attr("data-less");
   if($(this).hasClass("active")){
    $(".mega-menu__item.link_hide",link_parent).removeClass("hide");
    $(this).find(".link span").text(text_less);
   }
   else{
    $(".mega-menu__item.link_hide",link_parent).addClass("hide");
    $(this).find(".link span").text(text_more);
   }
 });
  $(document).on("click",".form .register-form-button",function(e){
    var reg_form = $(this).parent(".form");
    var gst_field = $(reg_form).find(".form__input-wrapper .form__field[name='customer[note][gst_number]']");
    var gst_field_val = gst_field.val();
    $(gst_field).parent().find(".gst-field-err").remove();
    if(!cn(gst_field_val) && gst_field_val.length != 15 && !cn(simply.gstError)){
      var gst_error = '<p class="gst-field-err">'+simply.gstError+'</p>';
      $(gst_field).parent().append(gst_error);
      e.preventDefault();
    }
  });

  // mini cart page edit quantity 
  $(document).on("click","#mini-cart .mini-cart__line-item .remove-wrap .edit-qty",function(){
    var parent = $(this).closest(".mini-cart__quantity");
    $(".quantity-selector__value",parent).focus();
  });
};

simply.asyncJavascript = function(){
  if(simply.asyncurls){
    for (var i = 0; i < simply.asyncurls.length; i++) {
      var url  = simply.asyncurls[i];
      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.async = true;
      s.src = simply.asyncurls[i];
      var x = document.getElementsByTagName('script')[0];
      var addScript = true;
      if(addScript){
        x.parentNode.insertBefore(s, x);
      }
    }  
  }
};
simply.chatWidgetCss = function(){
  setTimeout(function(){
    $('body iframe[title="chat widget"]').each(function(){
      if($(this).is(':visible')){
        $(this).css('bottom','60px');
      }
    });
  },1000);
};

$(document).ready(function(){
    if($(window).width() < 768) {
    simply.checkoutScrollEvent();
  }
  $(window).load(function(){
    simply.miniHeightFunction();
    simply.productPageMiniHeight();
    simply.landingPageMiniHeight();
    simply.customClickEvent();
    simply.asyncJavascript();
    simply.imageLoadOnScroll();
    simply.chatWidgetCss();
  });
  $(window).scroll(function(){
    simply.imageLoadOnScroll();
  });
});