$(document).on('change','.custom_qty_wrap .unit_quantity',function(event) {
  /* Act on the event */
  var parent = $(this).closest('.custom_qty_wrap');
  if($('.template-product').length > 0){
    parent = $(this).closest('form');
  }
  var min_base_unit = parseInt($(this).attr('data-qty'));
  if(cn(min_base_unit)){
    min_base_unit = 1;
  }
  var this_qty = $(this).val(); 
  if(this_qty < 1){
    this_qty = 1;
  }
  if($(this).hasClass("piece_input_qty")){
     var qty = parseFloat(this_qty * min_base_unit).toFixed(0);
  }
  else{
    var qty = parseFloat(this_qty * min_base_unit).toFixed(0);
  }
  if($(this).hasClass("mini_cart_qty")){
    let data_par = $(this).closest(".custom_qty_wrap");
    $('.unit_quantity',data_par).val(this_qty);
    $('.actual_qty',data_par).val(qty).triggerHandler('change');
  }else{
  $('.unit_quantity',parent).val(this_qty);
  $('.actual_qty',parent).val(qty).triggerHandler('change');
  }
});
if(screen.widdth > 999){
$(document).on('input live change focus focusin focusout blur ready load paste keydown keypress keyup mousemove mousedown mouseover mouseout mouseenter mouseleave click dbclick hover toggle select', '.custom_qty_wrap .unit_quantity.piece_input_qty', function(e) {
  if(e.originalEvent && e.originalEvent.clipboardData)
    var withoutSpaces = e.originalEvent.clipboardData.getData('Text');
  if(!withoutSpaces)
    var withoutSpaces = $(".custom_qty_wrap .unit_quantity.piece_input_qty").val();
  var withoutSpaces1 = withoutSpaces.replace(/\s+/g, '');
  var withoutSpaces2 = withoutSpaces1.replace(/[^1-9]/g, '');
  $('.custom_qty_wrap .unit_quantity.piece_input_qty').val(withoutSpaces2);
});
}