simply.appendGstField = function(){
  $(".gst-data").remove();
  var gst_data = '<fieldset class="gst-data"><div class="gst-info-label">ENTER GST DETAILS(optional)</div></fieldset>';
    var company_name =
      '<div class="custom--filled field additional-checkout-fields"><div class="information-icon-wrap field--show-floating-label clear_both"><div class="field__input-wrapper"><span class="info-icon">!</span><span class="info-text">Enter a business name if you want an invoice in the name of your Business.</span>' +
      '<div class="input-wrap"><label class="field__label field__label--visible" for="company_name">Business  name</label><input placeholder="Eg: ABCDE Limited" type="text" autocomplete="off" autocorrect="off" data-backup="company-name" data-trekkie-id="company_name" aria-required="true" class="field__input" name="checkout[attributes][company_name]" value="' +
      simply.company_name +
      '" id="company_name"></div></div></div>';
     var gst_number =
      '<div class="custom--filled field additional-checkout-fields"><div class="information-icon-wrap field__input-wrapper"><span class="info-icon">!</span><span class="info-text">Enter your 15 digit GSTIN number for generating B2B Invoice.</span>' +
      '<div class="input-wrap"><label class="field__label field__label--visible" for="gst_number">GST number</label><input type="text" autocomplete="off" autocorrect="off" data-backup="company-name" data-trekkie-id="company_name" aria-required="true" class="field__input" name="checkout[attributes][gst_number]" value="' +
      simply.gst_number +
      '" id="gst_number"></div></div></div>';
      $(".address-fields").append(gst_data);
      $(".address-fields .gst-data").append(company_name);
      $(".address-fields .gst-data").append(gst_number);
};

simply.gstVerification = function(){
  var gst_field = $("#gst_number");
  var gst_company = $("#company_name");
  var gst_field_val = gst_field.val();
  var gst_company_val = gst_company.val();
  var gst_len = gst_field_val.length;
  var error = false;
  if((!cn(gst_field_val) && gst_len != 15)){
    error = true;
    gst_field.closest(".field").find(".field__message--error").remove();
    gst_field.closest(".field").append('<p class="field__message field__message--error" id="error-for-gst">'+simply.gstError+'</p>');
    gst_field.closest(".field").find(".field__message--error").show();
  }
  else{
    gst_field.closest(".field").find(".field__message--error").remove();
  }
  if(!cn(gst_field_val) && cn(gst_company_val)){
    error = true;
    gst_company.closest(".field").find(".field__message--error").remove();
    gst_company.closest(".field").append('<p class="field__message field__message--error" id="error-for-company">'+simply.gstCompanyError+'</p>');
    gst_company.closest(".field").find(".field__message--error").show();
  }
  else{
    gst_company.closest(".field").find(".field__message--error").remove();
  }
  return error;
};

simply.verifyGstField = function(){
  $("#continue_button").click(function (e) {
    var gst_error = simply.gstVerification();
    if(gst_error){
      e.preventDefault();
    }
  });
  $(document).on("change","#company_name,#gst_number",function(){
    simply.gstVerification();
  })
};

simply.appendZipField = function(){

  if(!cn(simply.service_zip_json_file)){
    $.get(simply.service_zip_json_file, function(jsonArrayData){
      $.each(jsonArrayData, function(i, zipObj){
        simply.jsonArrayData[zipObj.Pincode] = zipObj; 
      });
      if(Shopify.Checkout.step == 'contact_information'){
        $(".new_pincode-section").remove();
        $('<div class="new_pincode-section"><div class="new_pincode_div"><label id="title">Pincode</label><input type="text" class="new_pincode_input" id="zipcode"></div><label id="msg_error"></label></div>').insertBefore('[data-address-field="city"]');
        $('#zipcode').val($('#checkout_shipping_address_zip').val());
        $('[data-address-field="zip"]').hide();
        $('#zipcode').keyup(function(){
          if ($('#zipcode').val()) {
           setTimeout(function(){
            var new_zip = $('#zipcode').val();
            $('#checkout_shipping_address_zip').val(new_zip);
            simply.verifyZipCode();
          }, 500);
         }
         else{
          $('#msg_error').html("Enter a ZIP / postal code");
        }
      });
      }
    });
  }
};

simply.verifyZipCode = function(){
  if(!cn(simply.service_zip_json_file)){
    let new_zip = $('#zipcode').val();
    if(!cn(new_zip)){
      if(cn(simply.jsonArrayData[new_zip])){
        $('button[type="submit"]').attr('disabled','disabled');
        $('#checkout_shipping_address_city').val("");
        $('#checkout_shipping_address_province').val("");
        $('#msg_error').addClass("error-msg").html('"Our courier partners do not deliver on this pincode. Order and we will delivery via India post"');
      }
      else{
        zipObj = simply.jsonArrayData[new_zip];
        $('#msg_error').html("");
        $('#checkout_shipping_address_city').val(zipObj.City);
        $('#checkout_shipping_address_province option').each(function(){
          var st = $(this).html().toLowerCase();
          var st1 = zipObj.State.toLowerCase();
          if(st == st1){
            $('#checkout_shipping_address_province').val($(this).attr('value'));
          }
        });
        simply.hasCod = zipObj['Has Cod'] == 'YES'? true : false;
        simply.hasPrepaid = zipObj['Has Prepaid'] == 'YES'? true : false;
        if(simply.hasCod && simply.hasPrepaid ){
          $('#msg_error').removeClass("error-msg").html('<span class="available">Prepaid Available,</span><span class="available"> COD Available</span>');
          $('button[type="submit"]').removeAttr('disabled');
          simply.setCookie("cod",true,1);
        }
        else if(!simply.hasCod && !simply.hasPrepaid ){
          $('#msg_error').html('Sorry. We don’t deliver here!');
          simply.setCookie("cod",false,1);
          $('button[type="submit"]').attr('disabled','disabled');
        }
        else if(simply.hasPrepaid && !simply.hasCod){
          $('#msg_error').removeClass("error-msg").html('<span class="available">Prepaid Available,</span><span class="not_available"> COD Unavailable</span>');
          simply.setCookie("cod",false,1);
          $('button[type="submit"]').removeAttr('disabled');
        }
      }
    }
  }
};
simply.checkCodAvail = function(){
  var cod_cookie = simply.getCookie("cod");
  var cod_content = $(".content-box__row[data-select-gateway='48777363595']");
  if(cod_cookie == "false"){
    var cod_con = $(".section--payment-method .section__content .content-box");
    $(cod_con).find(cod_content).hide();
    $(cod_con).find(".content-box__row:first").trigger("click");
  }
};
simply.setCookie = function(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  };

  simply.getCookie = function(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  };

  simply.appendPromotionalBanner = function(){
    if(!cn(simply.checkout_banner)){
      $(".section--payment-method .section__content").prepend("<div class='banner_image'><img src="+simply.checkout_banner+"></div>");
    }
  };
  simply.updateProducts = function(){
    $('.product-table tbody').html('');
    $('.product-table tbody').append($('.line-item-products table tr').clone());
  };

  simply.clickEvents = function(){
    $(document).on("input live change focus focusin focusout blur ready load paste keydown keypress keyup mousemove mousedown mouseover mouseout mouseenter mouseleave click dbclick hover toggle select","#checkout_shipping_address_phone_clone",function (e) {
      if (e.originalEvent && e.originalEvent.clipboardData)
        var withoutSpaces = e.originalEvent.clipboardData.getData("Text");
      if (!withoutSpaces)
        var withoutSpaces = $("#checkout_shipping_address_phone_clone").val();
      var spaces1 = withoutSpaces.replace(/\s+/g, "");
      var spaces2 = spaces1.replace(/[^0-9]/g, "");
      spaces2 = spaces2.replace("+91","").replace("+91 ","");;
      spaces2 = spaces2.replace(/^0+/, "");
      withoutSpaces = spaces2.substring(0, 10);
      var withoutSpaces1 = withoutSpaces.replace(/\s+/g, "");
      var withoutSpaces2 = withoutSpaces1.replace(/[^0-9]/g, "");
      $("#checkout_shipping_address_phone_clone").val(withoutSpaces2);
      $("#checkout_shipping_address_phone").val($("#checkout_shipping_address_phone_clone").val());
    });
    $(document).on("change","#checkout_shipping_address_phone_clone",function (e) {
      if ($(this).val().length > 9) {
        var withoutSpaces = $(this).val();
        var spaces1 = withoutSpaces.replace(/\s+/g, "");
        var spaces2 = spaces1.replace(/[^0-9]/g, "");
        spaces2 = spaces2.replace("+91","").replace("+91 ","");
        spaces2 = spaces2.replace(/^0+/, "");
        withoutSpaces = spaces2.substring(0, 10);
        var withoutSpaces1 = withoutSpaces.replace(/\s+/g, "");
        var withoutSpaces2 = withoutSpaces1.replace(/[^0-9]/g, "");
        $("#checkout_shipping_address_phone_clone").val(withoutSpaces2);
        $("#checkout_shipping_address_phone").val($("#checkout_shipping_address_phone_clone").val());
        $(".edit_checkout #continue_button").removeAttr("disabled");
        return false;
      }
    });

    $("#continue_button").click(function (e) {
      checkout_shipping_address_phone = $("#checkout_shipping_address_phone_clone").val();
      if (checkout_shipping_address_phone && checkout_shipping_address_phone.length != 10){
        e.preventDefault();
        $("#continue_button .btn__content").css("opacity", 1);
        $("#continue_button .icon-svg--spinner-button").css("opacity", 0);
        $("#checkout_shipping_address_phone_clone").closest(".field").addClass("field--error");
        if ($("#error-for-phone").length == 0) {
          $("#checkout_shipping_address_phone_clone").closest(".field").append('<p class="field__message field__message--error" id="error-for-phone">Please enter 10 digit phone number.</p>').css("max-height", "inherit");
        } else {
          $("#error-for-phone").text(simply.phone_error).show();
        }
      }
    });
  };

  simply.phoneFieldValidate = function(){
    if(Shopify.Checkout.step == "contact_information"){
      $("#checkout_shipping_address_phone_clone").closest(".field").remove();
      var phone_field = $('[data-address-field="phone"]').clone();
      $('[data-address-field="phone"]:not(.cloned_phone)').hide();
      phone = phone_field.find("#checkout_shipping_address_phone");
      phone.attr("id", "checkout_shipping_address_phone_clone");
      phone_field.find("label").attr("for", "checkout_shipping_address_phone_clone");
      phone.removeAttr("data-phone-formatter", "");
      phone.removeAttr("data-phone-formatter-country-select", "");
      phone.attr("size", "10");
      phone.attr("type", "text");
      phone.attr("max-length", "10");
      phone_field.addClass("clear_both cloned_phone");
      if ($("#checkout_shipping_address_phone_clone").length == 0) {
        phone_field.insertAfter($(".field[data-address-field=province]"));
        $(phone_field).show();
      }
      str = $("#checkout_shipping_address_phone").val();
      str = str.replace(/ /g, "");
      $("#checkout_shipping_address_phone_clone").val(str);
      $("#checkout_shipping_address_phone_clone").val(
        $("#checkout_shipping_address_phone_clone").val().substring(0, 10));
      $("#checkout_shipping_address_phone").val($("#checkout_shipping_address_phone_clone").val());
    }
  };

  simply.appendCountryCode = function(){
    $(".country_code").remove();
    let phone = $("#checkout_shipping_address_phone_clone");
    let phone_parent = $(phone).parent();
    var country_html = '<span class="country_code">+91<span>';
    phone_parent.append(country_html);
    $(phone_parent).addClass('phone_field_wrap');
    $(phone_parent).find("label").addClass('phone_label');
  };

  simply.checkoutEvents = function(){
  if(Shopify.Checkout.step == "contact_information"){
    simply.appendGstField();
    simply.appendZipField();
    simply.verifyGstField();
    simply.phoneFieldValidate();
    simply.clickEvents();
    simply.appendCountryCode();
    $(document).on("page:load page:change", function () {
      simply.appendGstField();
      simply.appendZipField();
      simply.verifyGstField();
      setTimeout(function () {
        simply.verifyZipCode();
      }, 2000);
      simply.clickEvents();
      simply.phoneFieldValidate();
      simply.appendCountryCode();
    });
    $(window).load(function(){
      simply.verifyZipCode();
    });
  }
  if(Shopify.Checkout.step == "payment_method"){
    simply.appendPromotionalBanner();
    simply.checkCodAvail();
    $(document).on("page:load page:change", function () {
      simply.appendPromotionalBanner();
      simply.checkCodAvail();
    });
  }
  simply.updateProducts();
  $(document).on("page:load page:change", function () {
    simply.updateProducts();
  });
};

simply.checkoutInit = function(){
  simply.checkoutEvents();
};

simply.infoIcon = function(){
  if($(window).width() > 1024){
    $( ".info-icon" ).hover(
      function() {
        $(this).closest(".information-icon-wrap").find(".info-text").addClass("active");
      }, function() {
        $(this).closest(".information-icon-wrap").find(".info-text").removeClass("active");
      }
    );
  } else {
    $( ".info-icon" ).click(function() {
      $(this).closest(".information-icon-wrap").find(".info-text").toggleClass("active");
    });
  }
}
$(document).ready(function () {
  simply.checkoutInit();
  simply.infoIcon();
});