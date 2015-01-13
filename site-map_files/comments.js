
var comments_show_flag = false;

function comments_hide()
{

	set_prev_active_arrow();
	$('.comments').animate({
		right : '-800px'
	});
	comments_show_flag = false;
}
function content_hide()
{
        $('.OutLineViewEDITOR').animate({
            top: "1000px",
            display:'none'
            },500 );
        $('.OutLineViewEDITOR').hide();

}

function comments_show()
{
	set_active_arrow('comments');
	update_comments();
	$('.comments').animate({
		right : '0px'
	});
	comments_show_flag = true;
}

function add_comment(comment)
{
	$.post(
		'/wmaps/comment_add/',
		{ map_id : map_id, comment : comment },
		function(data) {
			if (data.status == 'ok'){
                //update_comments();
				$('.comments_list').html(data.html);
				$('.gicon-comments').remove();
            }
			else {
                alert(data.error);
            }
		},
		"json"
	);
}

function delete_comment(comment_id, element)
{
	$.post(
		'/wmaps/comment_delete/',
		{ comment_id : comment_id },
		function(data) {
			if (data.status == 'ok') {
                $(element).closest('.message_holder').remove();
            }
			else {
				if (data.error == 'cant_delete') {
					alert("You can't delete this comment");
				}
				else {
                    alert(data.error);
                }
			}
		},
		"json"
	);
}

function update_comments()
{
	$.post(
		'/wmaps/comment_response/',
		{ map_id : map_id },
		function(data) {
			if (data.status == 'ok') {
				$('.comments_list').html(data.html);
				$('.gicon-comments').remove();
			}
			else {
			 	alert(data.error);
			}
		},
		"json"
		);
}

$(document).ready(function(){
	$('.btn_comments').click(function(){
		if (!comments_show_flag)
		{comments_show();}
	});


	$('.message_delete').live('click', function(e){
		e.preventDefault();
		var element_id = $(this).closest('.message').attr('id');
		var comment_id = element_id.substr(8);
		delete_comment(comment_id, this);
	});


	$('.add_comment').click(function(){
		var comment = $('.comment_add textarea').val();
		if (comment == '')
		{
			alert("Don't forget to leave comment text!");
			return;
		}
		add_comment(comment);
		$('.comment_add textarea').val('');
	});

	$(document).click(function(e){
		var container = $('.comments');
		if ($(e.target).hasClass('comments_show') || $(e.target).find('a').hasClass('comments_show'))
			return;

		if (container.has(e.target).length === 0)
		{
			if (comments_show_flag)
			{comments_hide();}
		}
	});


	$('.update_comments').click(function()
	{update_comments();});

	$('.comment_add textarea').keydown(function(e){
		if (e.keyCode == 13 && !e.shiftKey)
		{
			e.preventDefault();
			$('.add_comment').click();
		}
	});
	});