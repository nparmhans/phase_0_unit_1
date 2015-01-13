$(document).ready(function() {

    $(window).resize(function() {

        var screens = screen.width;
        var w = $(window).width()

        var width = $(window).width();
        var parentWidth = $(window).offsetParent().width();
        var percent = 100*width/parentWidth;

        var zoomw = (w * 1) / screens ;

        if (zoomw >= 1.2 &&  zoomw < 2.5) {
            $('.page').css('margin-top', '-2px');
            //alert('Flag');
        }
        if (zoomw >= 2.5 &&  zoomw < 2.9) {
            $('.page').css('margin-top', '-2px');
            //alert('Flag');
        }
    });
    var plan = "PRO";

    /* Color choose in profile settings */
    $('.color.header').click(function() {$('.box.header').toggle();});

    $('.color.navigation').click(function() {$('.box.navigation').toggle();});


    $('.create_new_sitemap').click(function() {
        var new_name = prompt("Enter your sitemap name:")
        if (new_name != null) {
            location.href = '/wmaps/new_map?name='+new_name
        }
    });

    $('.mb_color').click(function() {$('.mb_box').toggle();});

    $('.navigation .colors').click(function() {
        var color = $(this).css("background-color");
        var newcolor = get_header_color(color);
        $('.box.navigation').hide();
        $('input[name="nav_color"]').val(color);
        $('#logo').css('backgroundColor',newcolor);
        $('input[name="header_color"]').val(newcolor);
        $('#nav_color').css('background-color',newcolor);
        $('.sample').css('background-color',color);
        $('.sample').show();

    });

    $('.navigation .colorss').click(function() {
        var color = $(this).css("background-color");
        var newcolor = get_header_color(color);
        $('input[name="nav_color"]').val(color);
        $('input[name="header_color"]').val(newcolor);
        $('#logo').css('backgroundColor',newcolor);
        $('#nav_color').css('background-color',newcolor);
        $('.sample').css('background-color',color);
        $('.sample').show();
    });

    $('.text_color').click(function() {
        var color = $(this).css("background-color");
        $('#logo').find('h12').css('color',color);
        $('input[name="title_color"]').val(color);

    });
    //
    $('#customer_country').change(function(){
        var Gemius = $('#customer_country option:selected').val();
        if (Gemius == 'NZ')     alert("GST of 15% is inclusive");

    });

    var plan = $('.p_and_p').find('#cur_plan option:selected').text();
    if(plan != 'undefined'){
        plan = jQuery.trim(plan.toLowerCase());
        $('#'+plan).addClass('activ_plan_block');
    }

    $('.plan_table_block').click(function(){
        var activThis = $(this).attr('id');
        var currentActivBlock = $('.activ_plan_block').attr('id');
        if(activThis != currentActivBlock ){

            $('#'+currentActivBlock).removeClass('activ_plan_block');
            $('#'+activThis).addClass('activ_plan_block');
        }

    });

    $('#select_plan_btn').click(function(){
        var currentActivBlock = $('.activ_plan_block').attr('id');
        var val = 0;
        switch(currentActivBlock) {
            case "PRO": {
                location.href = '/payment/plan/Pro';
                break;
            }
            case "FREE": {
                confirm("Are you sure you wish to cancel your subscription?", function() {
                    location.href = '/payment/cancel/';
                });
                break;
            }
            case "PREMIUM": {
                location.href = '/payment/plan/Premium'
                break;
            }
            default: {}}

    });
    if ($('.activ_plan_block').length == 0) {$('#FREE').addClass('activ_plan_block');}
    $('#select_current_plan_btn').click(function(){

        var currentActivBlock =  $('.class_f').find('#cur_plan option:selected').val();

        if (currentActivBlock == "1000"){
            alert('You can not upgrade current plan');
        }
        else{
            $('.pricing-container').hide();
            $('.class_f').show();
        }

    });


    /* Locking paid features */
    lock_paid_features();

    /* Bulk actions */
    function get_checked_sitemaps()
    {
        var result = [];
        $('.sitemaps_checkbox:checked').each(function(key, value){
            var element_id = $(value).closest('.maplist').attr('id');
            result.push(element_id.substr(9));
        });
        return result;
    }

    $('#apply_bulk_actions').click(function(){
        var sitemap_ids = get_checked_sitemaps();
        if (sitemap_ids.length > 0) {
            switch ($('#bulk_actions').val())
            {
                case 'delete' :
                    confirm('Are you sure you want to delete checked sitemaps?',
                        function(){
                            sitemap_action(sitemap_ids, 'delete');
                        }
                    );
                    break;
                case 'duplicate' :
                    sitemap_action(sitemap_ids, 'duplicate');
                    break;
                case 'archive' :
                    sitemap_action(sitemap_ids, 'archive');
                    break;
                case 'unarchive' :
                    sitemap_action(sitemap_ids, 'unarchive');
                    break;
                default:
                    break;
            }
        }
    });

    /* Icons near sitemap click events */

    $('#mapNames > ul').sortable({
        axis: "y",
        stop: function( event, ui ) {
            var sorted = $("#mapNames > ul").sortable("toArray");
            $.map(sorted, function(n, i) { return n.substring(9); });
            sitemap_action(sorted, 'reorder');
        },
        handle: '.change_position_writemap',
        cursor: 'move'
    });

    $('.duplicate_writemap').live('click', function()
    {
        var element_id = $(this).closest('.maplist').attr('id');
        var sitemap_id = element_id.substr(9);
        sitemap_action([sitemap_id], 'duplicate');
    });

    $('.archive_writemap').live('click', function()
    {
        var element_id = $(this).closest('.maplist').attr('id');
        var sitemap_id = element_id.substr(9);
        sitemap_action([sitemap_id], 'archive');
    });

    $('.unarchive_writemap').live('click', function()
    {
        var element_id = $(this).closest('.maplist').attr('id');
        var sitemap_id = element_id.substr(9);
        sitemap_action([sitemap_id], 'unarchive');
    });

    $('.rename_writemap').live('click', function(){
        var element_id = $(this).closest('.maplist').attr('id');
        var sitemap_id = element_id.substr(9);
        var new_name = prompt("Enter your sitemap name:")
        if (new_name != null) {
            $.post(
                '/wmaps/actions/?action=rename',
                {sitemap_ids:[sitemap_id], new_name:new_name},
                function(data) {
                $("#"+element_id+" ul.writemaps_hover + a").text(new_name);
            });
        }
    });


    $('.delete_writemap').live('click', function(){
        var element_id = $(this).closest('.maplist').attr('id');
        var sitemap_id = element_id.substr(9);
        confirm('Are you sure you want to delete "'+$(this).parent().parent().find('a').html()+'" sitemap?',
            function() {
                sitemap_action([sitemap_id], 'delete');
                $('#map_limit_warning').hide();
                $('.create_new_sitemap').attr('onclick', '').unbind('click');
            }
        );
    });

    //wmaps page hover action buttons initial state is hidden
    $('.writemaps_hover').hide();
    //buttons appear on hover
    $('#mapNames > ul > li').live('hover', function(){
        $(this).find('.writemaps_hover').show();
    });
    //buttons disappear on un-hover
    $('#mapNames > ul > li').live('mouseleave', function(){
        $(this).find('.writemaps_hover').hide();
    });

    $('input[name="logo_text"]').click(function(){$(':radio[name=header_type][value=text]').attr('checked','checked');});

    $('#fileToUpload').change(function(){$(':radio[name=header_type][value=logo]').attr('checked','checked');});

    if ($('.btn_sitemap').length)
    {
        set_active_arrow('sitemap');
        $('.btn_sitemap a').click(function(e)
        {
            e.preventDefault();
            comments_hide();
            set_active_arrow('sitemap');
        });
    }

    $('.btn_content').live('click', function(){
        $('li#page_001 a.metaToggle:eq(0)').click();
        return false;
    });

    $('.btn_sitemap').click(function(){$('#mapView').click();});

});


function sitemap_action(sitemap_ids, action) {
    $.post(
        '/wmaps/actions/?action=' + action,
        {sitemap_ids: sitemap_ids},
        function(data) {
            if (data.status == 'ok') {
                // Update the list view to show the changes
                if (action != 'reorder') {
                  location.reload();
                }
            } else {
                alert(data.error);
            }
        },
        'json'
    );
}

function lock_paid_features()
{
    set_locked_content_attributes();
}

function set_locked_content_attributes()
{
    var elements = $('.disabled');
    $.each(elements, function(key, value)
    {
        obj = $(value);

        if(obj.attr('id') == 'arch') {
            var html = "Please <a href='/settings/plans_and_payment'>upgrade</a> to a paid plan to use this feature";
        }else{
            var html = "This feature is not available on the selected plan";
        }



        if (obj.hasClass('create_new_sitemap')) {
            switch (plan) {
                case 'FREE':
                    html = "You can create a maximum of 10 sitemaps on the Free plan. Please <a href='/settings/plans_and_payment'>upgrade</a> to create more.";
                    break;
                case 'PRO':
                    html = "You can have a maximum of 10 live sitemaps on the Pro plan. Please archive some sitemaps or <a href='/settings/plans_and_payment'>upgrade</a> to create more.";
                    break;
                default:
                    break;
            }
            obj.unbind('click');
            obj.click(function(e){
                e.preventDefault();
                alert(html);
            });
        }
        else if (obj.hasClass('btn_comments'))
        {
            if (false)
            {
                html = 'Please contact your account owner directly';
            }
            obj.click(function(e){
                e.preventDefault();
                alert(html, function(){comments_hide()});
            });
        }
//                else if (obj.hasClass('btn_content'))
//		{
//			//if (false)
//			//{
//			//	html = 'Please contact your account owner directly';
//			//}
//			obj.click(function(e){
//				e.preventDefault();
//				alert(html, function(){content_hide()});
//			});
//		}

        else
        {
            obj.unbind('click');
            obj.click(function(e){
                e.preventDefault();
                alert(html);
            });
        }

    });
}

function lock_gather_content()
{
}


var arrow_color = (typeof color_from_settings === 'undefined' || color_from_settings == '') ? 'rgb(31, 174, 255)' : color_from_settings;
var active_arrow_color = get_active_arrow_color(arrow_color);
var active_arrow_stack = [];

function get_active_arrow_color(arrow_color)
{
    var result = '';
    var reg = /(\d{1,3})[,|)]{1}/g;
    var match = arrow_color.match(reg);
    var match_numbers = [];
    var number_reg = /\d{1,3}/;

    if (match && match.length)
    {
        $.each(match, function(k, v){
            var temp = number_reg.exec(v);
            match_numbers.push(temp[0]);
        });

        if (match_numbers.length == 3)
        {
            var red = match_numbers[0];
            var green = match_numbers[1];
            var blue = match_numbers[2];

            if (red > 40)
            {
                red = red - 40;
            }
            if (green > 40)
            {
                green = green - 40;
            }
            if (blue > 40)
            {
                blue = blue - 40;
            }

            if (red <= 40 && green <= 40 && blue <= 40)
            {
                red = red + 80;
                green = green + 80;
                blue = blue + 80;
            }

            result = 'rgb('+red+', '+green+', '+blue+')';
        }
    }

    return result;
}
function get_header_color(arrow_color)
{
    var result = '';
    var reg = /(\d{1,3})[,|)]{1}/g;
    var match = arrow_color.match(reg);
    var match_numbers = [];
    var number_reg = /\d{1,3}/;

    if (match && match.length)
    {
        $.each(match, function(k, v){
            var temp = number_reg.exec(v);
            match_numbers.push(temp[0]);
        });

        if (match_numbers.length == 3)
        {
            var red = match_numbers[0];
            var green = match_numbers[1];
            var blue = match_numbers[2];

            if (red > 30)
            {
                red = red - 30;
            }
            if (green > 30)
            {
                green = green - 30;
            }
            if (blue > 30)
            {
                blue = blue -30;
            }

            if (red <= 30 && green <= 30 && blue <= 30)
            {
                red = red + 70;
                green = green + 70;
                blue = blue + 70;
            }

            result = 'rgb('+red+', '+green+', '+blue+')';
        }
    }

    return result;
}

function set_active_arrow(arrow)
{
    if (active_arrow_stack[active_arrow_stack.length - 1] == arrow)
    {return;}
    active_arrow_stack.push(arrow);

    $('.btn_arrow').css('background', arrow_color);
    $('.big_right_triangle').css('border-color', 'transparent transparent transparent ' + arrow_color);

    $('.btn_'+arrow).css('background', active_arrow_color);
    $('.btn_'+arrow+' > .big_right_triangle').css('border-color', 'transparent transparent transparent ' + active_arrow_color);
}

function set_prev_active_arrow()
{
    active_arrow_stack.pop();
    set_active_arrow(active_arrow_stack.pop());
}

var check = false;
$(document).ready(function() {


    $('.wrapper').find('li').hover(function(){

       if (check == false){

       check = true;
       HoverReSize();
       }
    });

    var accordion_head_new = $('.single');
    var accordion_head = $('.accordion > li > a'),
    accordion_body = $('.accordion li > .sub-menu');
    var CurrentPage = $('.sidebar_point').attr('id');
    var SCurrentPage = $('.sidebar_second_point').attr('id');

   $('#'+CurrentPage).find('a').addClass('current_page');
   $('#'+SCurrentPage).addClass('current_li_a');

    accordion_head_new.on('click', function(event) {
    reSize();
    event.preventDefault();

        if ($(this).attr('class') == 'single active'){
            accordion_body.slideUp('normal')
            $(this).removeClass('active');
            return false;

        }


        if ($(this).attr('class') != 'active'){
            accordion_body.slideUp('normal');
            $(this).next().stop(true,true).slideToggle('normal');
            accordion_head.removeClass('active');
            $(this).addClass('active');
        }

    });

    $('.accordion').mouseleave(function(){
        setTimeout(reSizeMini,100);
        check = false;
    });

});


function reSize(){


     $('.wrapper').animate({
    width: "195px"
    },100 );

  //  $('.wrapper').width(195);
    $('.text').show();
  //  $('.subli').show();

}

function HoverReSize(){


     $('.wrapper').animate({
    width: "195px"
    },100 );

  //  $('.wrapper').width(195);
    $('.text').show();
    $('.subli').show();



}

function reSizeMini(){


    $('.accordion > li > a').removeClass('active');
    $('.wrapper').animate({
    width: "72px"
    },500 );


    $('.subli').hide();


}