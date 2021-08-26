simply.productEvents = function(){
  $(".size_chart_product_page .size_chart_click a").click(function() {
   $('.popup_size').removeClass('hide');
   var mainContent = $('.main_content_size_chart');
   $.fancybox(mainContent);
 });
  $(".share_button_image .share_text").click(function(){
    $(".share_button_image .share_text").hide();
    $(".product-meta__share-buttons .social-media__item-list .social-media__item").show();
  });
  
  $(".product-form__info-item.custom_qty_wrap .product-form__quantity").on("change",function(e){
    simply.adjustQuantity(e,this);
  });

  $(document).on("input live focus focusin focusout blur ready load paste keydown keypress keyup mousemove mousedown mouseover mouseout mouseenter mouseleave click dbclick hover toggle select",".product-form__info-item.custom_qty_wrap .product-form__quantity,.custom_qty_input #custom_qty_mobile",function (e) {
    if (e.originalEvent && e.originalEvent.clipboardData)
      var withoutSpaces = e.originalEvent.clipboardData.getData("Text");
    if (!withoutSpaces)
      var withoutSpaces = $(this).val();
    var spaces1 = withoutSpaces.replace(/\s+/g, "");
    var spaces2 = spaces1.replace(/[^0-9/.]/g, "");
    var withoutSpaces1 = withoutSpaces.replace(/\s+/g, "");
    var withoutSpaces2 = withoutSpaces1.replace(/[^0-9/.]/g, "");
    withoutSpaces2 = withoutSpaces2.replace(/^0+/, "");
    $(this).val(withoutSpaces2);
  });
  $(".exit-popup__close.modal_close").click(function(){
    $(this).closest(".modal").attr("aria-hidden",true);
  });

  // tabbed-item
  $(document).on("click", ".product-block-list__item--info  .tabbed-item", function(){
    $(this).addClass('active').siblings().removeClass('active');
    var targetElement = $(this).data("value"),
        productItemSelected = parseInt($('.here-are-some-matches-product-wrapper').find('.tabbed-content .slick-slide[data-targat="'+targetElement+'"]:first').attr("data-slick-index"));
    $(".product-block-list__item--info .tabbed-content").slick('slickGoTo',productItemSelected);
  })

};

simply.adjustQuantity = function(e,that){
  var qty_value = $(that).val();
  var removePoint =  simply.removePoint(e,that);
  var min_qty_msg = false;
  if($(that).hasClass("piece_input_qty")){
    var removePoint =  simply.removePoint(e,that);
    qty_value = removePoint;
  }
  $(".card__section input.unit_quantity").each(function(){
    if(!cn(qty_value) && qty_value >= 1){
      if(!$(this).hasClass("piece_input_qty")){
        qty_value = parseFloat(qty_value).toFixed(2).replace(/((\,00)|(\.00))$/g,"");
      }
      $(this).val(qty_value);
    }else{
      $(this).val(1);
      min_qty_msg = true;
    }
  });
  if(min_qty_msg){
    var err_popup = $("#error_popup");
    var disp_unit = $(that).attr("data-display");
    var min_msg = window.languages.minQuantityMessage.replace("{{diam}}",disp_unit);
    $(".error_content",err_popup).html(min_msg);
    $(".modal",err_popup).attr("aria-hidden","false");
  }
};

simply.removePoint = function(e,that){
  if(e.originalEvent && e.originalEvent.clipboardData)
    var withoutSpaces = e.originalEvent.clipboardData.getData('Text');
  if(!withoutSpaces)
    var withoutSpaces = $(that).val();
  var withoutSpaces1 = withoutSpaces.replace(/\s+/g, '');
  var withoutSpaces2 = withoutSpaces1.replace(/[^1-9]/g, '');
  return withoutSpaces2 ;
};

simply.popupError = function(title){
 var err_pop = $("#error_popup");
 var product_qty = $("#product_in_stock").val();
 var msg_text = "We don't have as many "+title+" as you requested. We only have "+product_qty+".";
 $(".error_content",err_pop).html(msg_text);
 $(".modal",err_pop).attr("aria-hidden","false");
};

simply.addCartPopupEnable = function(data){
  var pop_variant_id = data.detail.variant.id;
  $.get('/cart.json',function(cartJson){
    var items = cartJson.items;
    var message = "is";
    var message1 = "item";
    if(items.length > 1){
       message = "are";
       message1 = "items";
    }
    var pop_item_count = items.length;
    var cart_popup = $("#add_to_cart_popup");
    $(items).each(function(i){
      if(items[i].id == pop_variant_id){
        var item_pop_base_min = parseInt(items[i].properties._base_unit_min);
        var item_pop_qty = parseFloat(items[i].quantity / item_pop_base_min);
        var item_pop_price = items[i].line_price;
        var cart_pop_total_price = cartJson.total_price;
        $(".item_name .popup_item_qty .qty",cart_popup).text(item_pop_qty +" "+ items[i].properties._display_unit);
        $(".item_name .popup_item_total .price",cart_popup).html(simply.productFormatMoney(item_pop_price,window.theme.moneyFormat));
        $(".cart_other_info .item_count",cart_popup).text("There "+message+" "+pop_item_count+" "+message1+" in your cart");
        $(".item_total_price .item_total",cart_popup).html(simply.productFormatMoney(cart_pop_total_price,window.theme.moneyFormat));
        $(".modal",cart_popup).attr("aria-hidden","false");
        return false;
      }
    });
  });
};

simply.productFormatMoney = function(t, e) {
  function o(t, e) {
    return void 0 === t ? e : t
  }
  function i(t, e, i, r) {
    if (e = o(e, 2),
      i = o(i, ","),
      r = o(r, "."),
      isNaN(t) || null == t)
      return 0;
    t = (t / 100).toFixed(e);
    var n = t.split(".");
    return n[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + i) + (n[1] ? r + n[1] : "")
  }
  "string" == typeof t && (t = t.replace(".", ""));
  var r = ""
  , n = /\{\{\s*(\w+)\s*\}\}/
  , a = e || this.money_format;
  switch (a.match(n)[1]) {
    case "amount":
    r = i(t, 2);
    break;
    case "amount_no_decimals":
    r = i(t, 0);
    break;
    case "amount_with_comma_separator":
    r = i(t, 2, ".", ",");
    break;
    case "amount_with_space_separator":
    r = i(t, 2, " ", ",");
    break;
    case "amount_with_period_and_space_separator":
    r = i(t, 2, " ", ".");
    break;
    case "amount_no_decimals_with_comma_separator":
    r = i(t, 0, ".", ",");
    break;
    case "amount_no_decimals_with_space_separator":
    r = i(t, 0, " ");
    break;
    case "amount_with_apostrophe_separator":
    r = i(t, 2, "'", ".")
  }
  return a.replace(n, r)
};

simply.productItemBlockWrap = function(){
  $(".here-are-some-matches-product-wrapper .tabbed-content.slick-initialized .slick-slide").each(function(){
    var dataHandle = $(this).find(".product-item-block-wrap").data("tag");
    $(this).attr("data-targat",dataHandle);
  })
}

simply.productStickyBtn = function(btn){
  var windowTop = $(window).scrollTop();
  var btn_wrap = $('.template-product .custom_qty_wrap.sticky_button_wrap');
  if (btn < windowTop) {
    $(btn_wrap).addClass('sticky');
  }
  else {
    $(btn_wrap).removeClass('sticky');
  }
};

simply.matchesProductDataUpdate = function(data){
  var pop_variant_id = data.detail.variant.id;
  $.get('/cart.json',function(cartJson){
    var items = cartJson.items;
    var cart_pop_total_price = cartJson.total_price;
    // $(items).each(function(i){
    //   if(items[i].id == pop_variant_id){
    //     $(".here-are-some-matches-product-wrapper .item-block-wrapper .img img").attr('src',items[i].image);
    //     $(".here-are-some-matches-product-wrapper .item-block-wrapper .product-id-wrap .product-id").text(items[i].id);
    //     $(".here-are-some-matches-product-wrapper .item-block-wrapper .product-generic-wrap .product-generic").text(items[i].properties._generic);        
    //     return false;
    //   }
    // });
    $(".checkout-price-wrapper .price-wrap .order-price").html(simply.productFormatMoney(cart_pop_total_price,window.theme.moneyFormat));
    $(".checkout-price-wrapper .price-wrap .cart-count").text(items.length);
  });
  $(".here-are-some-matches-product-wrapper").addClass('active').fadeIn();
  simply.showmixAndMatchesBlock();
  $('html, body').animate({
    scrollTop: $("#here-are-some-matches-product-wrapper").offset().top - $("#shopify-section-header").height()
  },2000);
};

simply.matchesProductDataUpdateCustom = function(data){
  var last_item_variant_id = data.items[0].id;
  $.get('/cart.json',function(cartJson){
    var items = cartJson.items;
    var cart_pop_total_price = cartJson.total_price;
    // $(items).each(function(i){
    //   if(items[i].id == last_item_variant_id){
    //     $(".here-are-some-matches-product-wrapper .item-block-wrapper .img img").attr('src',items[i].image);
    //     $(".here-are-some-matches-product-wrapper .item-block-wrapper .product-id-wrap .product-id").text(items[i].id);
    //     $(".here-are-some-matches-product-wrapper .item-block-wrapper .product-generic-wrap .product-generic").text(items[i].properties._generic);        
    //     return false;
    //   }
    // });
    $(".checkout-price-wrapper .price-wrap .order-price").html(simply.productFormatMoney(cart_pop_total_price,window.theme.moneyFormat));
    $(".checkout-price-wrapper .price-wrap .cart-count").text(items.length);
  });
  $(".here-are-some-matches-product-wrapper").addClass('active').fadeIn();
  simply.showmixAndMatchesBlock();
  $('html, body').animate({
    scrollTop: $("#here-are-some-matches-product-wrapper").offset().top - $("#shopify-section-header").height()
  },2000);
};

simply.matchesProductItemDataUpdates = function(line_item){
  var line_item_id = line_item.id;
  $.get('/cart.json',function(cartJson){
    var items = cartJson.items, itemImgSrc, itemTitle, itemId;
    var cart_pop_total_price = cartJson.total_price;
    // $(items).each(function(i){
    //   if(items[i].id == line_item_id){
    //     itemId = items[i].id;
    //     itemTitle = items[i].title;
    //     itemImgSrc = items[i].image;
    //     $(".here-are-some-matches-product-wrapper .item-block-wrapper .product-title-wrap").text(itemTitle);
    //     $(".here-are-some-matches-product-wrapper .item-block-wrapper .img img").attr({
    //       'src':itemImgSrc,
    //       'alt':itemTitle
    //     });
    //     $(".here-are-some-matches-product-wrapper .item-block-wrapper .product-id-wrap .product-id").text(itemId);
    //     if(items[i].properties != null ) {
    //       $(".here-are-some-matches-product-wrapper .item-block-wrapper .product-generic-wrap .product-generic").text(items[i].properties._generic);        
    //     }
    //     return false;
    //   }
    // });
    $(".checkout-price-wrapper .price-wrap .order-price").html(simply.productFormatMoney(cart_pop_total_price,window.theme.moneyFormat));
    $(".here-are-some-matches-product-wrapper").addClass('active').fadeIn();
  });
  simply.showmixAndMatchesBlock();
};

simply.mixAndMaxProductAddToCart = function(){
  $(document).on("click",".product-form__add-button", function(e){
    e.preventDefault();
    var productForm = $(this).closest('form[action*="/cart/add"]'),
        button = $(this),
        buttonText = $(this).attr("data-text");
    button.text(buttonText);
    $.ajax({
      type: 'POST',                             
      url: '/cart/add.js',
      dataType: 'json',                               
      data: productForm.serialize(),           
      success: function(response){
  		  $.ajax({
          type: 'GET',
          url: '/cart.js',
          dataType: 'json',
          success: function(cartdata){
            $('.header__cart-count').html(cartdata.items.length);
            simply.matchesProductDataUpdateCustom(cartdata);
          }
        });
        button.text("Added To cart");
        button.addClass("disable");   
      },                        
      error: function(data){
        button.text("Add To cart");
        button.closest(".product-item-block-details").append(`<p class="alert alert--error">`+data.responseJSON.description +`</p>`);
      }                           
    });
  });
}
simply.productSomeMatchesSection = function(){
  var tabbedItemSliderElm = $("#shopify-section-product-some-matches-section .product-some-matches-section .tabbed-content");
  tabbedItemSliderElm.removeClass('hidden');
  tabbedItemSliderElm.slick({
    speed: 300,
    infinite: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows : true,
    dots : false,
    prevArrow:'<button type="button" class="slick-prev"><svg class="button-icon" viewBox="0 0 100 100"><path d="M 10,50 L 60,100 L 70,90 L 30,50  L 70,10 L 60,0 Z" class="arrow"></path></svg></button>',
    nextArrow:'<button type="button" class="slick-next"><svg class="button-icon" viewBox="0 0 100 100"><path d="M 10,50 L 60,100 L 70,90 L 30,50  L 70,10 L 60,0 Z" class="arrow" transform="translate(100, 100) rotate(180) "></path></svg></button>',
    responsive: [
      {
        breakpoint: 800,
        settings: {
          arrows : false,
          slidesToShow: 1
        }
      }
    ]
  });
  simply.productItemBlockWrap();
  simply.miniHeight("#shopify-section-product-some-matches-section .here-are-some-matches-product-wrapper .tabbed-content .product-item-block-wrap .product-title","#shopify-section-product-some-matches-section .here-are-some-matches-product-wrapper .tabbed-content .product-item-block-wrap .product-title");
  $("#shopify-section-product-some-matches-section .product-some-matches-section .tabbed-content").removeClass("hidden");
}

simply.showmixAndMatchesBlock = function(){
  simply.someMatchesProduct();
  simply.miniHeight(".section.product-promotion-block .block-list__item .promo-block__content",".section.product-promotion-block .block-list__item .promo-block__content");
  simply.miniHeight(".here-are-some-matches-product-wrapper .tabbed-content .product-item-block-wrap .product-title",".here-are-some-matches-product-wrapper .tabbed-content .product-item-block-wrap .product-title");
}

simply.someMatchesProduct = function(){
  var tabbedItemSliderElm = $("#shopify-section-product-template .product-block-list__item--info .tabbed-content");
  tabbedItemSliderElm.removeClass('hidden');
  tabbedItemSliderElm.slick({
    speed: 300,
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows : true,
    dots : false,
    prevArrow:'<button type="button" class="slick-prev"><svg class="button-icon" viewBox="0 0 100 100"><path d="M 10,50 L 60,100 L 70,90 L 30,50  L 70,10 L 60,0 Z" class="arrow"></path></svg></button>',
    nextArrow:'<button type="button" class="slick-next"><svg class="button-icon" viewBox="0 0 100 100"><path d="M 10,50 L 60,100 L 70,90 L 30,50  L 70,10 L 60,0 Z" class="arrow" transform="translate(100, 100) rotate(180) "></path></svg></button>',
    responsive: [
      {
        breakpoint: 800,
        settings: {
          arrows : false,
          slidesToShow: 2
        }
      }
    ]
  });
  simply.productItemBlockWrap();
}

simply.productInit = function(){
  simply.productEvents();
  if ($(".template-product").length > 0 && screen.width < 768) {
    var stickyTop = $('.template-product .product-form__payment-container').offset().top + 60;
    simply.productStickyBtn(stickyTop); 
  }
  $(window).scroll(function() {
    if($(".template-product").length > 0 && screen.width < 768){
      simply.productStickyBtn(stickyTop);
    }
  });
};

$(document).ready(function() {
  simply.productInit();
  simply.mixAndMaxProductAddToCart();
  if($(".product-some-matches-section").length > 0){
    simply.productSomeMatchesSection();
    // tabbed-item
    $(document).on("click", "#shopify-section-product-some-matches-section .product-some-matches-section .tabbed-item", function(){
      $(this).addClass('active').siblings().removeClass('active');
      var targetElement = $(this).data("value"),
          productItemSelected = parseInt($('.here-are-some-matches-product-wrapper').find('.tabbed-content .slick-slide[data-targat="'+targetElement+'"]:first').attr("data-slick-index"));
      $("#shopify-section-product-some-matches-section .product-some-matches-section .tabbed-content").slick('slickGoTo',productItemSelected);
    })
  }
  if($(".template-product").length > 0){
    var alertError = setInterval(function(){ 
      if($(".alert.alert--error").length > 0 ){
        setTimeout(function(){
          $(".alert--error").remove();
          window.clearInterval(alertError);
        }, 15000);
      }
    }, 500);
  }
});
