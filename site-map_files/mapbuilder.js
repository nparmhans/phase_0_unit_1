 /*
 * jQuery autoResize (textarea auto-resizer)
 * @copyright James Padolsey http://james.padolsey.com
 * @version 1.04
 */
(function($){

	$.fn.autoResize = function(options) {

		// Just some abstracted details,
		// to make plugin users happy:
		var settings = $.extend({
			onResize : function(){

			},
			animate : true,
			animateDuration : 150,
			animateCallback : function(){},
			extraSpace : 0,
			limit: 1000
		}, options);

		// Only textarea's auto-resize:
		this.filter('textarea').each(function(){

			// Get rid of scrollbars and disable WebKit resizing:
			var textarea = $(this).css({
				resize:'none',
				'overflow':'hidden'
			}),

			// Cache original height, for use later:
			origHeight = textarea.height(),


			// Need clone of textarea, hidden off screen:
			clone = (function(){

				// Properties which may effect space taken up by chracters:
				var props = ['height','width','lineHeight','textDecoration','letterSpacing'],
				propOb = {};

				// Create object of styles to apply:
				$.each(props, function(i, prop){
					propOb[prop] = textarea.css(prop);
				});

				// Clone the actual textarea removing unique properties
				// and insert before original textarea:
				return textarea.clone().removeAttr('id').removeAttr('name').css({
					position: 'absolute',
					top: 0,
					left: -9999
				}).css(propOb).attr('tabIndex','-1').insertBefore(textarea);

			})(),
			lastScrollTop = null,
			updateSize = function() {
				// Prepare the clone:
				clone.height(0).val($(this).val()).scrollTop(10000);

				// Find the height of text:
				var scrollTop = Math.max(clone.scrollTop(), origHeight) + settings.extraSpace,
				toChange = $(this).add(clone);

				// Don't do anything if scrollTip hasen't changed:
				if (lastScrollTop === scrollTop) {return;}
				lastScrollTop = scrollTop;

				// Check for limit:
				if ( scrollTop >= settings.limit ) {
					$(this).css('overflow-y','');
					return;
				}
				// Fire off callback:
				settings.onResize.call(this);

				// Either animate or directly apply height:
				settings.animate && textarea.css('display') === 'block' ?
				toChange.stop().animate({height:scrollTop}, settings.animateDuration, settings.animateCallback)
				: toChange.height(scrollTop);


			};

			// Bind namespaced handlers to appropriate events:
			textarea
			.unbind('.dynSiz')
			.bind('keyup.dynSiz', updateSize)
			.bind('keydown.dynSiz', updateSize)
			.bind('change.dynSiz', updateSize);

		});
		cleanMapStructure();
		// Chain:
		return this;

	};
})(jQuery);


/*--------------------------------------------------------------------------------
WriteMaps Application Behavior Layer
Author: Scott Jehl
Updated: april 08
--------------------------------------------------------------------------------*/
//writemaps live
var baseURL = '';
var archived = 0;


//canvas height function
function setCanvas(){
   // if($('#viewPort').size()>0) $('#viewPort').height($(window).height() - ($('#viewPort').get(0).scrollTop+ $('#footer').height() +210));
   if($('#viewPort').size()>0) $('#viewPort').height($(window).height() - ($('#viewPort').get(0).scrollTop +210));
}

//ZOOM SLIDER
function zoomSlider(){
    $('#area').slider({
	handle: '#knob',
	value: 50,
	slide: function(e, ui){
	  //  $('#sitePages').css('font-size', (ui.value/16)+ 'em');
            $('#sitePages').css('font-size', ui.value+50 + '%');
	  //  scrollMap();
	  //  hugSiteMap();
	}
    });
}


//Get the width of the sitemap UL and set it as an inline style so the floats don't wrap   --------------------------------------------
function hugSiteMap(){

                var isoutline = $('#viewPort').attr('class');


                if(isoutline == 'map editing' || isoutline == 'editing map'){


                       $('#sitemap').width(($('#sitemap li:eq(0)').width()+ 113)/10+'em');
                  //     $('#sitemap').width(($('#sitemap').width()+ 113)/10+'em');
                       $('#viewPort').scrollTo( { top:1000, left:'50%'});


                }
                else
                {
                   // $('#sitemap').width(($('#sitemap').width()+ 113)/10+'em');
                      $('#sitemap').width(($('#sitemap li:eq(0)').width()+ 113)/10+'em');
                }

}

//scroll sitemap to proper position (left for outline, center for map)
function scrollMap(){
    var viewWidth = $('#viewPort').width();
    var formWidth = $('#sitePages').width();
    if(view.getState() == 'map'){
	if(formWidth>viewWidth){
	    var pxFromCenter = (viewWidth - (viewWidth * (viewWidth / formWidth))+60)/2 ;
	    $('div#viewPort').scrollLeft(pxFromCenter);
	}
    }
    else {$('div#viewPort').scrollLeft(0);}
    $('div#viewPort').scrollTop(0);
}


// Loop the li's and add first,last-------------------------------------------
function cleanMapStructure(){
	$('ul:empty').parent().find('div.section:eq(0)').removeClass('section').parent().find('ul:empty').remove();
	$('li.page').each(function(){
		//clean up the ID structure
		var thisInt = 1;
		var parentID = 'page';
		var siblingID = '';
		var thisLi = $(this);
		if(thisLi.prev().size()>0){
		    siblingID = thisLi.prev().attr('id');
		    if (siblingID)
			thisInt = parseInt(siblingID.substring(siblingID.lastIndexOf('_') + 1), 10) + 1;
		}
		thisInt = PadDigits(thisInt, 3);



		//if there's an LI parent, grab its id, otherwise use 'page'
		if(thisLi.parents('li.page').size()>0) {
		    parentID = thisLi.parents('li.page').attr('id');
		}
		thisID = parentID + '_' + thisInt;


		thisLi.attr('id', thisID).find('textarea:eq(0)').attr('name', thisID);
		thisLi.find('.pageUrl').attr('name', thisID+'_url');
		thisLi.find('.pageNotes').attr('name', thisID+'_notes');
		thisLi.find('.pageUrl').attr('id', thisID+'_url');
		thisLi.find('.pageNotes').attr('id', thisID+'_notes');

		//attach first, last, and solo classes
		var thisDiv = thisLi.find('div:eq(0)');
		thisDiv.removeClass('first last solo').parents('ul:eq(0)').removeClass('solo');
		if(thisLi.is(':first-child') && thisLi.parent().find('> .empty_piece').size() == 0){
		    thisDiv.addClass('first');
		    thisLi.parent().removeClass('tail');
		}
		if(thisLi.is(':last-child') && thisLi.parent().find('> .empty_piece').size() == 0){
		    thisDiv.addClass('last');
		    thisLi.parent().removeClass('tail');
		}
		if(thisLi.is(':only-child') || (thisLi.parent().find('> .empty_piece').size() == 1 && thisLi.parent().find('li').size() == 2)){
		    thisDiv.addClass('solo').parents('ul:eq(0)').addClass('solo');
		    thisLi.parent().removeClass('tail');
		}

		if (thisLi.find('ul').size() == 0)
		{
		    thisLi.append('<ul class="tail"><li id="_000" class="empty_piece"></li></ul>');
		    if (thisLi.find('ul > li').size() == 0)
			thisLi.find('ul').append('<li id="_000" class="empty_piece"></li>');
		}
		else
		{
		    if (thisLi.find('ul > li').size() == 0)
		    {
			thisLi.find('ul').append('<li id="_000" class="empty_piece"></li>');
			if (!thisLi.find('ul').hasClass('tail'))
			    thisLi.find('ul').addClass('tail');
		    }
		}

	});
	$('ul.tail').each(function(key, value) {
	    if ($(value).find('li').size() > 1)
		$(value).find('> .empty_piece').remove();
	});
}


//validate url
String.prototype.validateUrl = function(url){
    if(this.length>0){
	var j = new RegExp("^[A-Za-z]+://[A-Za-z0-9-]+\.[A-Za-z0-9]+");
	return j.test(this) ? true : false;
    }
    return false;
}


//PadDigits function: accepts an integer and pads it with a variable number of leading zeroes to meet a total string length
function PadDigits(n, totalDigits) {
    n = n.toString();
    var pd = '';
    if (totalDigits > n.length) {
	    for (i=0; i < (totalDigits-n.length); i++) {
		    pd += '0';
	    }
    }
    return pd + n.toString();
}

function shareButtonClick()
{
	modalBox.create('<h2>Sharing Preferences</h2>', '<p id="loading">Loading...</p>', '<a href="#" id="mbCancel" title="Cancel">Cancel</a>');
	if(getMapID()){
		$.ajax({
		type: "GET",
		url: baseURL+"/wmaps/sharing_preferences?map_id="+getMapID(),
		success: function(msg){sharingData(msg);}
		});
	}
	else if(getShareID()) {
		$('#mbContent').html('<p>Sharing preferences can not be changed from within a shared sitemap.</p>');
	}
	else{
		$('#mbContent').html('<p>You must save this sitemap before you can share it.</p>');
	}
	return false;
}

function sharingData(msg){
	//msg = $.parseJSON(msg);

	if(msg.share_allow == 0){
		$('#mbContent').html('<p>This sitemap is not currently being shared.</p>'+
			'<p class="choiceExplain">If you would like to share this map, click "<strong>Enable Sharing</strong>" below. To enable sharing with editing abilities, click "<strong>Enable Sharing & Editing</strong>" below.</p> ');
		$('#sharingToggle, #sharingToggle_edit').remove();
		$('#mbFooter').append('<a href="'+baseURL+'/wmaps/sharing_preferences?map_id='+getMapID()+'&share_allow=1&edit_allow=0" id="sharingToggle">Enable Sharing</a><a href="'+baseURL+'/wmaps/sharing_preferences?map_id='+getMapID()+'&share_allow=1&edit_allow=1" id="sharingToggle_edit">Enable Sharing & Editing</a>');
	}
	else if(msg.edit_allow == 0) {
		$('#mbContent').html('<p>This sitemap is publicly shared with editing disabled at the following URL:</p>'+
			'<p><a href="'+baseURL+'/wmaps/shareMap/'+msg.share_id+'" onclick="window.open(\''+baseURL+'/wmaps/shareMap/'+msg.share_id+'\'); return false;" title="Open in New Window">'+msg.share_id+'</a></p>'+
			'<p class="choiceExplain">If you would like to disable sharing, click "<strong>Disable Sharing</strong>" below. To enable shared editing of this sitemap, click "<strong>Enable Editing</strong>" below.</p>');
		$('#sharingToggle, #sharingToggle_edit').remove();
		$('#mbFooter').append('<a href="'+baseURL+'/wmaps/sharing_preferences?map_id='+getMapID()+'&share_allow=0&edit_allow=0" id="sharingToggle">Disable sharing</a><a href="'+baseURL+'/wmaps/sharing_preferences?map_id='+getMapID()+'&share_allow=1&edit_allow=1" id="sharingToggle_edit">Enable Editing</a>');
	}
	else {
		$('#mbContent').html('<p>This sitemap is publicly shared and editable at the following URL:</p>'+
			'<p><a href="'+baseURL+'/wmaps/shareMap/'+msg.share_id+'" onclick="window.open(\''+baseURL+'/wmaps/shareMap/'+msg.share_id+'\'); return false;" title="Open in New Window">'+msg.share_id+'</a></p>'+
			'<p class="choiceExplain">If you would like to disable sharing, click "<strong>Disable Sharing</strong>" below. To disable shared editing of this sitemap, click "<strong>Disable Editing</strong>" below.</p>');
		$('#sharingToggle, #sharingToggle_edit').remove();
		$('#mbFooter').append('<a href="'+baseURL+'/wmaps/sharing_preferences?map_id='+getMapID()+'&share_allow=0&edit_allow=0" id="sharingToggle">Disable Sharing</a><a href="'+baseURL+'/wmaps/sharing_preferences?map_id='+getMapID()+'&share_allow=1&edit_allow=0" id="sharingToggle_edit">Disable Editing</a>');
	}

	$('#sharingToggle, #sharingToggle_edit').click(function(){
		$('#mbContent').html('<p id="loading">Loading...</p>');
		$('#sharingToggle').remove();
		$.ajax({
		    type: "GET",
		    url: $(this).attr('href'),
		    success: function(msg){sharingData(msg);}
		});
		return false;
	});
}

function assignPageEvents(){
	//SECTION TOGGLES
	$('.toggleSection').live("click", function(){
		if($(this).is('.sectionCol')){
		    $(this).parents('li.page:eq(0)').find('ul:eq(0)').css('opacity', 0).show(500, function(){
			    $(this).fadeTo(500, 1.0);
		    });
		    $(this).parents('li.page:eq(0)').find('div.connectContain:eq(0)').addClass('section');
		    $(this).removeClass('sectionCol');
		    $(this).html('<img src="'+imgs.bullet_toggle_minus+'" />');
		    $(this).attr('title', 'Collapse This Section');
		}
		else{
		    $(this).parents('li.page:eq(0)').find('ul:eq(0)').fadeTo(100, 0.0001, function(){$(this).hide(800);});
		    $(this).parents('li.page:eq(0)').find('div.connectContain:eq(0)').removeClass('section');
		    $(this).addClass('sectionCol');
		    $(this).html('<img src="'+imgs.bullet_toggle_plus+'" />');
		    $(this).attr('title', 'Expand This Section');
		}
		return false;
	});
	//KILL FORM SUBMIT
	$('form#mapForm').submit(function(){//prevent false http form submits
	    return false;
	});
	//textarea FOCUS
	$('#sitePages textarea.titleText').live("focus", function(){
	    $(this).addClass('focus');

	    $(this).next('div.safariWipe').hide();
	    if($(this).is('.defaultText') || $(this).val() == 'New Page')
		$(this).val('');
	});
	//textarea + TEXTAREA FOCUS
	$('#sitePages textarea, #sitePages textarea').live("focus", function(){
		appHistory.tempState = [$(this).attr('title'), false, mapData(true)];
	});
	//textarea BLUR
	$('#sitePages textarea.titleText').live("blur", function(){
	    $(this).removeClass('focus');
	    if($(this).val() == ''){
		$(this).addClass('defaultText');
		$(this).val('New Page');
		$(this).parents('.pageContain:eq(0)').find('.page_meta h4').html('New Page');
	    }
	    else if($(this).is('.defaultText') && $(this).val() != 'New Page'){$(this).removeClass('defaultText');}
	    $(this).next('div.safariWipe').show();
	});
	//textarea KEYUP
	$('#sitePages textarea.titleText').live("keyup", function(){
	    var thisAddButton = $(this).parents('li.page:eq(0)').find('a.addPage:eq(0)');
	    if($(this).val() == ''){
		$(this).addClass('defaultText');
		thisAddButton.attr('title', 'Add a Page To This Section');
		$(this).parents('.pageContain:eq(0)').find('.page_meta h4').html('New Page');
	    }
	    else{
		$(this).removeClass('defaultText');
		thisAddButton.attr('title', 'Add a Page To The ' + this.value + ' Section');
		$(this).parents('.pageContain:eq(0)').find('.page_meta h4').html(this.value);
		$(this).parents('.pageContain:eq(0)').find('.titleText').html(this.value);
	    }
	});
	//textarea AND TEXTAREA KEYUP
	$('#sitePages textarea, #sitePages textarea').live("blur", function(){
	    saveStatus.unsave();
	    if($(this).is('.pageUrl')){
		var val = $(this).val();
		$(this).siblings('.openUrl').remove();
		if(val.validateUrl())
		    $(this).after('<a href="#" onclick="window.open(\''+val+'\');" class="openUrl">View</a>');
	    }
	});
	//textarea AND TEXTAREA KEYDOWN
	$('#sitePages textarea').live("keydown", function(event) {
	    evt = event || window.event;
	    el = evt.srcElement || evt.target;
	    //if enter key is pressed
	    if(evt.keyCode == 13){
		    $(this).blur();
		    return false;
	    }
	});

	//textarea AND TEXTAREA CHANGE
	$('#sitePages textarea, #sitePages textarea').live("change", function(event) {
	    appHistory.addToUndo(appHistory.tempState[0], appHistory.tempState[1], appHistory.tempState[2]);
	    if($(this).is('.pageUrl')){
		var val = $(this).val();
		$(this).siblings('.openUrl').remove();
		if(val.validateUrl())
		    $(this).after('<a href="#" onclick="window.open(\''+val+'\');" class="openUrl" title="View URL in New Window">View</a>');
	    }
	});

	//ADD PAGE BUTTONS
	$('.addPage').live("click", function(e){
            e.preventDefault();
	    appHistory.addToUndo('New Page');
	    $(this).parents('li.page:eq(0)').find('ul:eq(0)').show();
	    var insertLoc = $(this).parent().attr('id');
	    var addType = "user";
	    addPage(insertLoc,null,null,null,null,addType);

	    return false;
	});
	//DELETE PAGE BUTTONS
	$('.deleteThis').live("click", function(e){
		e.preventDefault();
	    appHistory.addToUndo('Delete Page');
	    //get the current page
	    var thisPageLI = $(this).parents('li.page:eq(0)');
	    //get that page's parent


	    jPickerArr[thisPageLI] = null;
	    var pageParentLi = $(this).parents('li.page:eq(1)');
	    //if this li has no siblings, kill the section class and remove the empty UL
	    if(thisPageLI.siblings().size() < 1){
		pageParentLi.find('div.connectContain:eq(0)').removeClass('section');
		$(this).parents('ul:eq(0)').remove();
	    }
	    thisPageLI.remove();
	    if($('li.page').size()<1) {
		addPage('sitePages',null,null,null,null, 'user');
	    }
	    hugSiteMap();
	    cleanMapStructure();
	    saveStatus.unsave();
	    return false;
	});
	//SAFARI WIPE (adds a bordered div to blot out safari textarea borders)
	$('div.safariWipe').live("click", function(){
	    $(this).prev().focus();
	    $(this).hide();
	});

	$.fn.positionInfo = function(){
	    var thisParent = $('#'+$(this).attr('parentID'));
	    var parentCenter = thisParent.width() / 2;
	    var parentLoc = thisParent.offset();
	    $(this).css('top', (parentLoc.top - 120 + $('#viewPort').get(0).scrollTop) / 10 + 'em');

	    if(view.state == 'map')
		$(this).css('left', '40%');
	    else
		$(this).css('left', (parentLoc.left - 50) / 10 + 'em');
	    return $(this);
	}

	//INFO ICON TOGGLES
	var jPickerArr = {};

	/*----------------------------------
	APPLICATION MENU BAR
	----------------------------------*/
	//MENU CLICK
	$('li.appMenu').click(function(e){
		e.preventDefault();
	    if($(this).is('.open'))
		$(this).removeClass('open');
	    else {
		$(this).addClass('open');
		$(this).siblings('li').removeClass('open');
	    }
	    return false;
	});
	//MENU MOUSEOUT
	$('li.appMenu').mouseout(function(){
	    var timer = setTimeout(function(){$('li.appMenu').removeClass('open');}, 300);
	    $(this).mouseover(function(){clearTimeout(timer);});
	});
	//CLICK AWAY
	$(document).click(function(){$('li.appMenu').removeClass('open');});
	//FILE MENU
	//NEW
	$('#new a').click(function(){
	    if(saveStatus.state == 'saved'){
		window.location = baseURL+'/wmaps/mapbuilder/';
	    }
	    else{
		modalBox.create('<h2>Unsaved Changes</h2>', '<p>Would you like to save before leaving?</p>', '<a href="#" id="mbCancel" title="Cancel">Cancel</a><a href="#" id="dontSaveAndNew">Do not Save</a><a href="#" id="saveAndNew">Save</a>');
		//save and proceed
		$('#saveAndNew').click(function(){
		    saveMap('new');
		    return false;
		});
		//don't save, but proceed
		$('#dontSaveAndNew').click(function(){
		    saveStatus.save();
		    window.location = baseURL+'/wmaps/mapbuilder/';
		    return false;
		});
	    }
	    return false;
	});
	//OPEN
	$('#open a').click(function(){
	    openMap();
	    return false;
	});
	//SAVE
	$('#save a').click(function(){
	    saveMap();
	    return false;
	});


		//ARCHIVE
	$('#archive a').click(function(e){
		e.preventDefault();
	    archiveMap();
	    return false;
	});






 function EditBox($datas){
                        if ($('#viewPort').hasClass('outline') != true){view.outline();}
                        set_active_arrow('content');
                        $('.OutLineViewEDITOR').hide();
                        var EditorBox =  $('.OutLineViewEDITOR');// LEFT SIDE EDITOR
                        var thisPageMetaNew = $datas.next('.page_meta'); //HIDE EDITOR
                        var PageColor = $(thisPageMetaNew).parent().find('.backgrount-img-map').attr('id');//ÐŸÐ¾Ð»ÑƒÑ‡Ð°ÐµÐ¼ ID Ñ†Ð²ÐµÑ‚Ð° ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ñ‹ (incomp,pend,comp)
                        var Parrent =   $(thisPageMetaNew).parent().parent().parent().attr('id');
                        EditorBox.attr('id',Parrent);
                        if(document.getElementById('cke_super_puper')) CKEDITOR.instances.super_puper.destroy();
                         CKEDITOR.on('instanceCreated', function (e) {
                               // document.getElementById( e.editor.name + '_preview').innerHTML = e.editor.getData();
                                 e.editor.on('change', function (ev) {
                                    var editorData = editor.getData();
                                    var WindowID =   $('.OutLineViewEDITOR').attr('id');
                                    $('#sitemap').find('#'+WindowID).find('.pageNotes:first').text(editorData);
                                    var img = $('#sitemap').find('#'+WindowID).find('.connectContain:eq(0)').find('.pageContain').find('.metaToggle').find('img').attr('src');
                                    if (img != '../images/information.png'){
                                        $('#sitemap').find('#'+WindowID).find('.connectContain:eq(0)').find('.pageContain').find('.metaToggle').find('img').attr('src', imgs.information);
                                    }

                                });
                                 //e.editor.setReadOnly( 1 );
                                 e.editor.on('blur', function (ev) {

                                     if (autosave) setTimeout('autoSave()', 2000);
                                });


                            });

                         //*********** textarea**************//
                        var EpageNote =  thisPageMetaNew.find('.pageNotes').val();
                        EditorBox.find('.editor_page_note').val(EpageNote);
                        var editor =   CKEDITOR.replace( $('#super_puper').attr('id'), {
                             //   startupFocus : true,
                                enterMode : CKEDITOR.ENTER_BR,
                                shiftEnterMode: CKEDITOR.ENTER_P,
                                language: 'en',
                                uiColor: '#D1E8F0',
                                height: '350px',
                                toolbar:[
                                    { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ], items: [ 'Bold', 'Italic']},
                                    { name: 'links', items: [ 'Link', 'Unlink']},
                                    { name: 'paragraph', groups: [ 'list', 'indent' ], items: [ 'NumberedList', 'BulletedList' ]},
                                    { name: 'styles', items : [ 'Format' ] },
                                    { name: 'colors', items: [ 'TextColor', 'BGColor' ]}

                                ]
                            });


//                          var Plan = $('.surrent_plan').find('div').attr('class');

//                          //   if (Plan == 'FREE' || Plan == '' ){
// //                                alert('Please <a href="/settings/plans_and_payment">upgrade</a> to a paid plan to use this feature');

// //							alert('html', function(){comments_hide()});
// 							if (typeof share_id !=="undefined"){
// //
//                                $('.page_title_inp').attr('disabled','disabled');
//                                $('.editor_page_url').attr('disabled','disabled');
// //
//                               CKEDITOR.on( 'instanceReady', function( ev ) {
//                                     editor = ev.editor;
//                                     editor.setReadOnly( 1 );
//                                 });
//                     		 }
//
 	            //         }

                        //CKEDITOR.instances.super_puper.focus();
                        //***********************************//
                        var EpageName =  thisPageMetaNew.find('h4')[0].innerHTML;
                        var EpageUrl  =  thisPageMetaNew.find('.pageUrl').val();
                        var PageColor = $(thisPageMetaNew).parent().find('.backgrount-img-map').attr('id');

                        EditorBox.find('.page_title_inp').val(EpageName);
                        EditorBox.find('.editor_page_url').val(EpageUrl);

                        $('.OutLineViewEDITOR').show();


                        $('.editor_page_url:eq(0)').change(function(){
                            var WindowID =   $('.OutLineViewEDITOR').attr('id');
                            $('#sitemap').find('#'+WindowID).find('.pageUrl:first').val(EditorBox.find('.editor_page_url').val());
                            var img = $('#sitemap').find('#'+WindowID).find('.connectContain:eq(0)').find('.pageContain').find('.metaToggle').find('img').attr('src');
                            if (img !== '../images/information.png'){
                                $('#sitemap').find('#'+WindowID).find('.connectContain:eq(0)').find('.pageContain').find('.metaToggle').find('img').attr('src', imgs.information);
                            }
                             if (autosave) setTimeout('autoSave()', 2000);
                        });


                        $('.titleText').change(function(){

                                var WindowID =   $('.OutLineViewEDITOR').attr('id');
                                var Gnom =  $('#sitemap').find('#'+WindowID).find('.connectContain').find('h3:first').find('.titleText').val();
                                EditorBox.find('.page_title_inp').val(Gnom);

                                var img = $('#sitemap').find('#'+WindowID).find('.connectContain:eq(0)').find('.pageContain').find('.metaToggle').find('img').attr('src');
                                if (img !== '../images/information.png'){
                                    $('#sitemap').find('#'+WindowID).find('.connectContain:eq(0)').find('.pageContain').find('.metaToggle').find('img').attr('src', imgs.information);
                                }
                                return false;

                         });


                        $('.page_title_inp:eq(0)').keyup(function(){
                            var WindowID = $('.OutLineViewEDITOR').attr('id');
                            var PageMetaTitle = $('#sitemap').find('#'+WindowID).find('.connectContain:eq(0)').find('.pageContain').find('.page_meta').find('h4:eq(0)').text(EditorBox.find('.page_title_inp').val());
                            var datatext =  $('#sitemap').find('#'+WindowID).find('.connectContain').find('h3:eq(0)').find('.titleText').eq(1);
                                datatext.html(EditorBox.find('.page_title_inp').val());



                                var img = $('#sitemap').find('#'+WindowID).find('.connectContain:eq(0)').find('.pageContain').find('.metaToggle').find('img').attr('src');
                                if (img !== '../images/information.png'){
                                    $('#sitemap').find('#'+WindowID).find('.connectContain:eq(0)').find('.pageContain').find('.metaToggle').find('img').attr('src', imgs.information);
                                }

                                //  if (autosave) setTimeout('autoSave()', 2000);

                            return false;
                        });


                        $('.page_title_inp:eq(0)').blur(function(){
                             if (autosave) setTimeout('autoSave()', 2000);

                        });
//                         $('.titleText').blur(function(){
//                             if (autosave) setTimeout('autoSave()', 2000);
//
//                        });


                         EditorBox.find('.mb_colors').click(function (){
                            var Gemius = $(this).attr('id');
                            var WindowID = $('.OutLineViewEDITOR').attr('id');
                            $('#sitemap').find('#'+WindowID).find('.backgrount-img-map:first').attr('id',Gemius);
                            $('#sitemap').find('#'+WindowID).find('.connectContain:eq(0)').find('.pageContain').find('.metaToggle').find('img').attr('src', imgs.information);
                            if (autosave) setTimeout('autoSave()', 2000);
                         });
                         editor.on('contentDom', function(){
                            editor.document.on('change', function( event ){
                                    var editorData = editor.getData();
                                    var WindowID =   $('.OutLineViewEDITOR').attr('id');
                                    $('#sitemap').find('#'+WindowID).find('.pageNotes:first').text(editorData);
                                    $(this).find('img').attr('src', imgs.information);
                                    if (autosave) setTimeout('autoSave()', 2000);
                                });
                         });


                        return false;
                }





       $('.titleText').live("blur", function(e){
           $('.titleText').scrollTop(0);
           $('.titleText').height(15);
       });


//
       $('.titleText').live("click", function(e){
         var Plan = $('.surrent_plan').find('div').attr('class');
         if ($('#viewPort').hasClass('outline')){
                        if (Plan != 'FREE' && Plan != '' ){
                            var MetaT = $(this).parent().parent().find('.metaToggle');
                            var thisPageMetaNew = MetaT.next('.page_meta');
                            var Parrent = $(thisPageMetaNew).parent().parent().parent().attr('id');
                            var WindowID = $('.OutLineViewEDITOR').attr('id');
                            if (Parrent != WindowID) {
                                        e.preventDefault();
                                        $('.mb_box').hide();
                                        $('.OutLineViewEDITOR').animate({
                                        top: "1000px"
                                        },500 );
                                        $('.OutLineViewEDITOR').animate({
                                        top: "220px"
                                        },500 );
                                var MetaT = $(this).parent().parent().find('.metaToggle');
                                EditBox(MetaT);
                                //saveMap();
                                if (autosave) setTimeout('autoSave()', 10000);

	                        }
	                        return false;
		                }else{

		                	    var html = "Please upgrade to a paid plan to use this feature";
		                	    alert( html, function(){content_hide()});
		                }
		    }
           return false;
           });

	$('a.metaToggle').live("click", function(e){

            var Plan = $('.surrent_plan').find('div').attr('class');
            var html = "This feature is not available on the selected plan";
            if (Plan == 'FREE' || Plan == '' ){
                  alert( html, function(){content_hide()});

             }
                    $('.mb_box').hide();

                    $('.OutLineViewEDITOR').animate({
                    top: "1000px"
                    },500 );

                    $('.OutLineViewEDITOR').animate({
                    top: "220px"
                    },500 );

                    EditBox($(this));


                    return false;

             return false;
           // hugSiteMap();
	   // scrollMap();

	});

	//print button
	$('#print a').click(function(){
	    printMode.enable();
	    return false;
	});
	//XML SITEMAP EXPORT
	$('#exportXML a').click(function(){
	    var xmlData = xmlMap();
	    modalBox.create('<h2>XML Sitemap for SEO</h2>', '<p>Here\'s your Sitemap data in XML format as specified at sitemaps.org, this can be used to help google find the pages on your site more easily. <a href="http://www.sitemaps.org" onclick="window.open(\'http://www.sitemaps.org\'); return false;" title="Open in New Window">More info on XML Sitemaps</a></p> <textarea name="xmlData" id="xmlData">'+xmlData+'</textarea>', '<a href="#" id="mbCancel" title="Close">Close</a>');

	    return false;
	});

	//LOCAL BACKUP EXPORT
	jQuery.download = function(url, data, method){
	    //url and data options required
	    if( url && data ){
		//data can be string of parameters or array/object
		data = typeof data == 'string' ? data : jQuery.param(data);
		//split params into form textareas
		var inputs = '';
		jQuery.each(data.split('&'), function(){
			var pair = this.split('=');
			inputs+='<input type="hidden" name="'+ pair[0] +'" value="'+ pair[1] +'" />';
		});
		//send request
		jQuery('<form action="'+ url +'" method="'+ (method||'post') +'">'+inputs+'</form>')
		.appendTo('body').submit().remove();
	    };
	};

	// exporter
	$('#exportJSON a').click(function(){
	    var s = ["ID, Page Title,Parent Page/Section,Page Notes,Page URL"],
	    d = mapData(),
	    map = $("#sitemap");

	    $.each(d.pages, function(i){
		var id = d.pages[i].id,
		name = unescape(d.pages[i].name).replace(/\n|/gmi,"").replace(/,/gmi, ";" ),
		notes = unescape(d.pages[i].notes).replace(/\n/gmi,"").replace(/,/gmi, ";" ),
		url = unescape(d.pages[i].url),
		parentid = id.slice(0, id.lastIndexOf("_")),
		parentname = ( map.find( "textarea[name='" + parentid +"']" ).attr("value") || "" ).replace(/,/gmi, ";" );
                notes = (( map.find("textarea[name='"+id+"_notes']").attr("value")).replace(/,/gmi, ";")).replace(/<\/?[^>]+>/g, "");

                if( notes === "No notes as of yet!" )
		    notes = "";
		if( notes.indexOf(",") > -1 ){
                    notes = "'" + notes +"'";
                }
		if( url === "http://" )
		    url = "";
		if( name.indexOf(",") > -1 )
		    name = "'" + name +"'";

		s.push( id +","+ name +","+ parentname +","+ notes +","+ url );
	    });

	    // Final CSV data
            s = encodeURIComponent( s.join( "\n" ) );
	   // s = encodeURIComponent( s.join( "\n" ) );
	    $.download( "/wmaps/export_csv", "map_id="+map_id, "POST"  );
	    return false;
	});



	//LOCAL BACKUP IMPORT
	$('#importJSON a').click(function(){
	    modalBox.create('<h2>Import Local Backup (JSON)</h2>', '<p>To restore to a local backup, paste the sitemap source code into the field below. <strong>Reminder:</strong> Only valid WriteMaps JSON schema will be accepted.</p><form action="#"><fieldset><label for="map_source">SiteMap Source: </label><input type="text" id="map_source" name="map_source" /></fieldset></form>', '<a href="#" id="mbCancel">Cancel</a><a href="#" id="mbSave">Import</a>' );
	    $('#mbSave').click(function(){
		    var jsonData = $('#mbContent form input#map_source').val();
		    if(jsonData != ''){
			appHistory.addToUndo('Import Backup');
			jsonData = JSON.parse(jsonData);
			buildMap(jsonData);
			saveStatus.unsave();
		    }
		    else {
			$('#mbContent form input#map_source').val('Paste source code here').focus(function(){$(this).val('');});
		    }
		    return false;
	    });
	    return false;
	});
	//SHARING PREFERENCES
	$('#share').bind('click', function(){shareButtonClick();});


	//EDIT MENU
	//UNDO
	$('#undoLast a').click(function(){
	    appHistory.undo();
	    return false;
	});
	//REDO
	$('#redoLast a').click(function(){
	    appHistory.redo();
	    return false;
	});

	//close button
	$('#close, #close a').click(function(){
	    return true;
	});
	//OVERLAY CLOSE/CANCEL
	$('#mbCancel, #mbClose').live("click", function(){
	    modalBox.kill();
	    return false;
	});
	//HELP
	//WHATS NEW IN WMS
	$('#whatsNew a').click(function(){
	    modalBox.create('<h2>What\'s New in WriteMaps</h2>', '<p id="loading">Loading...</p>', '<a href="#" id="mbCancel" title="Cancel">Cancel</a>');
	    $.ajax({
		type: "GET",
		url: base_url+"mapfunctions/help_whatsNew/",
		success: function(msg){$('#mbContent').html(msg);}
	    });
	    return false;
	});
	//USING WMS
	$('#usingWriteMaps a').click(function(){
	    modalBox.create('<h2>Using WriteMaps</h2>', '<p id="loading">Loading...</p>', '<a href="#" id="mbCancel" title="Cancel">Cancel</a>');
	    $.ajax({
		type: "GET",
		url: base_url+"mapfunctions/help_usingWriteMaps/",
		success: function(msg){$('#mbContent').html(msg).pngFix();;}
	    });
	    return false;
	});


	/*----------------------------------
	BUTTON BAR
	----------------------------------*/
	//TOGGLE MAP VIEW
	$('#mapView').click(function(){
	    view.map();
		set_active_arrow('sitemap');
	    return false;
	});
	//TOGGLE OUTLINE VIEW
	$('#outlineView').click(function(){
	    view.outline();
	    return false;
	});

	//TOGGLE EDIT MODE
	$('#editingMode').click(function(){
	    mode.editing();
	    return false;
	});
	//TOGGLE PRESENTATION MODE
	$('#presentationMode').click(function(){
	    mode.presentation();
	    return false;
	});

}


//VIEW STATE TRACKING
var view = {
	state: 'map',
	map: function(){
	    $('#viewPort').scrollTo( { top:1000, left:'50%'});
            $('.OutLineViewEDITOR').hide();
		set_active_arrow('sitemap');
	    $('#viewPort, #viewToggles ul').addClass('map').removeClass('outline');
	    $.cookie('view', 'map');
	    this.state = 'map';
	    hugSiteMap();

	 //   scrollMap();
            $('div#viewPort').scrollTop(0);
	    if($('div.tempMeta').size()>0)
		$('div.tempMeta').positionInfo();
	},
	outline: function(){
		  hugSiteMap();
		  set_active_arrow('sitemap');
//                CKEDITOR.replace( $('#super_puper').attr('id'), {
//                language: 'en',
//                uiColor: '#D1E8F0',
//                height: '150px',
//                toolbar:[
//                    { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ], items: [ 'Bold', 'Italic']},
//                    { name: 'links', items: [ 'Link', 'Unlink']},
//                    { name: 'paragraph', groups: [ 'list', 'indent' ], items: [ 'NumberedList', 'BulletedList' ]},
//                    { name: 'insert', items: [ 'Image']},
//                    { name: 'styles', items: ['Font', 'FontSize' ]},
//                    { name: 'colors', items: [ 'TextColor', 'BGColor' ]}
//                ]
//            });
            //$('#viewPort').scrollLeft(0);
	    $('#viewPort, #viewToggles ul').addClass('outline').removeClass('map');
	    $.cookie('view', 'outline');
	    this.state = 'outline';
	   // hugSiteMap();
	    scrollMap();

	    if($('div.tempMeta').size()>0)
		$('div.tempMeta').positionInfo();
	},
	toggle: function(){
	    if(this.state == 'map')
		this.outline();
	    else
		this.map();
	},
	loadView: function(){ //ÐŸÑ€ÐµÐ´Ð¿Ð¾Ð»Ð¾Ð¶Ð¸Ñ‚ÐµÐ»ÑŒÐ½Ð¾ Ð¼Ð¾Ð¶Ð½Ð¾ ÑƒÐ´Ð°Ð»Ð¸Ñ‚ÑŒ /Ð¸ÑÐ¿Ð¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ñ‚ÑŒ Ð´Ð»Ñ Ð¾Ð¿Ñ€ÐµÐ´ÐµÐ»ÐµÐ½Ð¸Ñ Ð·Ð°Ð³Ñ€ÑƒÐ¶Ð°Ñ‚ÑŒ list Ð¸Ð»Ð¸ outline view
		//check cookie for map vs outline
		var viewName = $.cookie('view');
		if(viewName){
			if (viewName == 'outline')
			    view.outline();
			else
			    view.map();
		}
		else
		    view.map();

	},
	getState: function(){
	    return this.state;
	}
};


//MODE STATE TRACKING
var mode = {
	state: 'editing',
	editing: function(){
		$('#viewPort, #modeToggles ul').addClass('editing').removeClass('presentation').removeClass('printing');
		//$('#viewPort textarea').focus(function(){
			//this.focus();
		//});
		mode.state = 'editing';
		$.cookie('mode', 'editing');
	},
	presentation: function(){
		$('#viewPort, #modeToggles ul').addClass('presentation').removeClass('editing').removeClass('printing');
		//$('#viewPort textarea').focus(function(){
			//this.blur();
		//});
		mode.state = 'presentation';
		$.cookie('mode', 'presentation');
	},
	loadMode: function(){
		//check cookie for map vs outline
		var modeName = $.cookie('mode');
		if(modeName){
		    if (modeName == 'presentation')
			mode.presentation();
		    else
			mode.editing();
		}
		else {mode.editing();}
	}
};

var printMode = {
	savedMode: '',
	enable: function(){

	    killSorting();

	    var screenPrint = $('link[title=screenPrint]').get(0);
	    screenPrint.disabled = true;
	    screenPrint.disabled = false;
	    if($.browser.msie && $.browser.version < 7){
		    $('#sitemap img.pageIcon').attr('src', imgs.page_iePrint);
	    }
	    $('#sitemap').draggable();
	    $('#sitemap').css('margin', '0');
	    $('#viewPort').css('overflow', 'hidden');
//	    $('#logo').addClass('print');


            $('.wrapper').hide();
            $('.headline_mapbuilder').hide();
            $('#logo').hide();
            $('#canvas').removeClass('share');
            $('#canvasWrap_mb').removeClass('canvasWrap_mb');
            $('.comments').hide();

	},
	disable: function(){
	    var screenPrint = $('link[title=screenPrint]').get(0);
	    screenPrint.disabled = true;
	    if($.browser.msie && $.browser.version < 7){
		    $('#sitemap img.pageIcon').attr('src', imgs.page);
	    }
	    $('#sitemap').draggable('destroy').css({
		    'position': 'relative',
		    'left': 'auto',
		    'top': 'auto'
	    });
	    $('#viewPort').css('overflow', 'auto');
	    $('#sitemap').css('margin', '0 auto');
	    $('#logo').removeClass('print');

            $('.wrapper').show();
            $('.headline_mapbuilder').show();
            $('#logo').show();
            $('#canvas').addClass('share');
            $('#canvasWrap_mb').addClass('canvasWrap_mb');
            $('.comments').show();


	    hugSiteMap();
	    scrollMap();

	    setSorting();

	}
}

function whControls(){
	$('#printControls #pageWidth').keyup(function(){
	    var w = parseInt($(this).val());
	    $('#printCrop').width(w+'in');
	});
	$('#printControls #pageHeight').keyup(function(){
	    var h = parseInt($(this).val());
	    $('#printCrop').height(h+'in');
	});
	$('#printPrintView').click(function(){
	    window.print();
	    return false;
	});
	$('#closePrintView').click(function(){
	    printMode.disable();
	    return false;
	});
}

//ADD PAGE FUNCTION
function addPage(insertLoc, ID, pageName, pageUrl, pageNotes, thisPageColor, addType){


	// Setup Parent Node --------------------------------------------
	//assign the insertLoc var to an element with that id
	if(insertLoc) {
	    if($('#'+insertLoc).size() <1){//if no parent node
		var tempID = insertLoc.lastIndexOf('_');
		var thisParentID =  insertLoc.substring(0, tempID);
		var addType = "user";
		addPage(thisParentID,null,'Recovered Page',null,null,addType);
		saveStatus.srcStatus = 'unstable';
	    }
	    insertLoc = $('#'+insertLoc);
	}
	else {
	    insertLoc = $('#page_001');
	}
	// if the parent is not the fieldset, make parent into a section
	if(insertLoc.is('#sitePages')){}
	else
	    insertLoc.find('div.connectContain:eq(0)').addClass('section');
	// Assign Page ID --------------------------------------------
	//assign thisID var either through parent or from passed var
	var thisID = '';
	if(!ID){
		var thisInt = 1;
		var siblingID = '';
		var parentID = '';
		if(insertLoc.find('ul').size() != 0){
			siblingID = insertLoc.find('ul:eq(0) li:last').attr('id');
			thisInt = parseInt(siblingID.substring(siblingID.lastIndexOf('_') + 1), 10) + 1;
		}
		thisInt = PadDigits(thisInt, 3);
		if(insertLoc.attr('id') == 'sitePages'){
			parentID = 'page';
		}
		else {
			parentID = insertLoc.attr('id');
		}
		thisID = parentID + '_' + thisInt;
	}
	else{
		thisID = ID;
	}

	// Assign Page Name Var --------------------------------------------
	var pageNameINDefault = '';
	var pageClass = 'titleText';
	var addButtonMessage = '';

	if(!pageName || pageName == '' || pageName == null){
		pageName = pageNameINDefault;
		pageClass = 'titleText defaultText';
		addButtonMessage = 'Add a Page Inside This Section';
		if(addType != 'user') {
			pageName = 'New Page';
		}
	}
	else{
		addButtonMessage = 'Add a Page To The ' + pageName + ' Section';
	}
	//if there's no UL parent for the new page, make one
	if(insertLoc.find('ul').size() == 0){
		var ulAttrs = '';
		if($('#sitemap').size() < 1){
			ulAttrs = ' id="sitemap" ';
		}
		insertLoc.append('<ul'+ulAttrs+' class="solo"></ul>');
	}
	else
	{insertLoc.find('ul:eq(0)').removeClass('solo');}
	//create the New Page Li
	var liID = ' id="'+thisID+'"';

	//status of url/notes:
	var metaStatus = false;
	//url
	var thisURL = 'http://';
	var urlLink = '';
	if(pageUrl && pageUrl != '{page_url}' && pageUrl != thisURL && pageUrl != 'http&#x3A;&#x2F;&#x2F;') {
		thisURL = pageUrl;
		metaStatus = true;
		if(thisURL.validateUrl()) urlLink = '<a href="#" onclick="window.open(\''+thisURL+'\');" class="openUrl" title="View URL in New Window">View</a>';
	}

	//notes
	var thisNotes = 'No notes as of yet!';
	if(pageNotes && pageNotes!= '{page_notes}' && pageNotes != thisNotes && pageNotes != 'No%20notes%20as%20of%20yet!'){
		thisNotes = pageNotes;
		metaStatus = true;
	}

	var infoIcon = metaStatus ? imgs.information : imgs.information_off;
	//class
	var liClass = 'class="page"';
	if(insertLoc.find('ul:eq(0)').is('#sitemap')){
		liClass = ' class="root page"';
	}
	//var safariWipe = $.browser.safari ? '<div class="safariWipe"></div>' : '';
	var safariWipe = '';
	//INSERT EDITABLE PAGE


	var NewPage = $('<li'+liID+liClass+'>'+
		'<div class="connectContain">'+
		'<div class="vLine"><div class="line"></div></div>'+
		'<div class="pageContain">'+
                '<div class="backgrount-img-map" id="'+thisPageColor+'">&nbsp;</div>'+
//		'<div class="backgrount-img-map" style="background-color:'+thisPageColor+'">&nbsp;</div>'+
		'<img src="'+imgs.page+'" class="pageIcon" title="Drag to sort pages" />'+
		'<a href="#" class="toggleSection" title="Collapse Section"><img src="'+imgs.bullet_toggle_minus+'" /></a>'+
  //    readonly          '<h3><span style = "resize: none;" type="text" name="'+thisID+'" title="Page Title" class="'+pageClass+'" maxlength="250">'+pageName+'</span>'+safariWipe+'</h>'+
		'<h3><textarea  style = "resize: none;" type="text" name="'+thisID+'" title="Page Title" class="'+pageClass+'" maxlength="250">'+pageName+'</textarea>'+safariWipe+'</h3>'+
		'<a href="#" class="deleteThis" title="Delete Page"><img src="'+imgs.cancel+'" /></a>'+
		'<a href="#" class="metaToggle" title="Page Info"><img src="'+infoIcon+'" /></a>'+
		'<div class="page_meta">'+
		'<h4> '+pageName+'</h4>'+
		'<label for="'+thisID+'_url">Page URL</label>'+
		'<input type="text" name="'+thisID+'_url" id="'+thisID+'_url" value="'+thisURL+'" class="pageUrl" title="Page URL" maxlength="250" />'+urlLink+
		'<label for="'+thisID+'_notes">Page Notes</label>'+'<div class="colorPic"></div>'+
		'<textarea  name="'+thisID+'_notes" id="'+thisID+'_notes" class="pageNotes" title="Page Notes" maxlength="250" focus>'+thisNotes+'</textarea>'+
		'<a href="#" class="metaClose"> </a>'+
		'</div>'+
		'</div>'+
		'</div>'+
		'<a class="addPage" href="#" title="'+addButtonMessage+'"><img src="'+imgs.add+'"/></a>'+
		'<ul class="tail"><li id="_000" class="empty_piece"></li></ul>'+
		'</li>');

	insertLoc.find('ul:eq(0)').append(NewPage);
	$('h3 textarea', NewPage).autoResize();

	cleanMapStructure();
	hugSiteMap();

	if(addType == 'user') {//if user added the page
		saveStatus.unsave();
		setSorting();
		insertLoc.find('textarea.titleText:last').focus();
	}
	lock_gather_content();
}


//MAP DATA
// Package Map data to JS object (json boolean returns JSON string, otherwise, returns JS object) --------------------------------------------
function mapData(json, noEncode){
	cleanMapStructure();
	var mapData = {};
	mapData.pages = [];
	var key = 0;
	$('#sitePages li').each(function(i){

		var thisID = $(this).attr('id');
		if (thisID == undefined || thisID == '_000') return;
		mapData.pages[key] = {};
		mapData.pages[key].id = thisID;

		//page name
		if($(this).find('textarea.titleText:eq(0)').is('.defaultText')){
		    mapData.pages[key].name = '';
		}
		else {
		    if(!noEncode)
			mapData.pages[key].name = encodeURIComponent($(this).find('.titleText').html());
		    else
			mapData.pages[key].name = $(this).find('.titleText').html();
		}
		//page url
		if(!noEncode)
		    mapData.pages[key].url = encodeURIComponent($('#'+thisID+'_url').val());
		else
		    mapData.pages[key].url = $('#'+thisID+'_url').val();
		if(!noEncode)
		    mapData.pages[key].notes = encodeURIComponent($('#'+thisID+'_notes').html());
		else
		    mapData.pages[key].notes = $('#'+thisID+'_notes').html();
		key++;
	});
	if(json)
	    mapData = $.toJSON(mapData);

	return mapData;
}

//CONVERT TO HTML ENTITIES
String.prototype.htmlEntities = function(){
    var chars = ['&','Ð¿Ñ—Ð… ','Ð“ÐŽ','Ð“Ñž','Ð“Ðˆ','Ð“Â¤','Ð“Ò','Ð“Â¦','Ð“Â§','Ð“Ð','Ð“Â©','Ð“Ð„','Ð“Â«','Ð“Â¬','Ð“Â­','Ð“Â®','Ð“Ð‡','Ð“Â°','Ð“Â±','Ð“Ð†','Ð“Ñ–','Ð“Ò‘','Ð“Âµ','Ð“Â¶','Ð“Ñ‘','Ð“â„–','Ð“Ñ”','Ð“Â»','Ð“Ñ˜','Ð“Ð…','Ð“Ñ•','Ð“Ñ—','Ð“Ð‚','Ð“Ðƒ','Ð“â€š','Ð“Ñ“','Ð“â€ž','Ð“â€¦','Ð“â€ ','Ð“â€¡','Ð“â‚¬','Ð“â€°','Ð“Ð‰','Ð“â€¹','Ð“ÐŠ','Ð“ÐŒ','Ð“Ð‹','Ð“Ð','Ð“Ñ’','Ð“â€˜','Ð“â€™','Ð“â€œ','Ð“â€','Ð“â€¢','Ð“â€“','Ð“Â˜','Ð“â„¢','Ð“Ñ™','Ð“â€º','Ð“Ñš','Ð“Ñœ','Ð“Ñ›','Ð²â€šÂ¬','\"','Ð“ÑŸ','<','>','Ð’Ñž','Ð’Ðˆ','Ð’Â¤','Ð’Ò','Ð’Â¦','Ð’Â§','Ð’Ð','Ð’Â©','Ð’Ð„','Ð’Â«','Ð’Â¬','Ð’Â­','Ð’Â®','Ð’Ð‡','Ð’Â°','Ð’Â±','Ð’Ð†','Ð’Ñ–','Ð’Ò‘','Ð’Âµ','Ð’Â¶','Ð’Â·','Ð’Ñ‘','Ð’â„–','Ð’Ñ”','Ð’Â»','Ð’Ñ˜','Ð’Ð…','Ð’Ñ•'];
    var entities = ['amp','agrave','aacute','acirc','atilde','auml','aring','aelig','ccedil','egrave','eacute','ecirc','euml','igrave','iacute','icirc','iuml','eth','ntilde','ograve','oacute','ocirc','otilde','ouml','oslash','ugrave','uacute','ucirc','uuml','yacute','thorn','yuml','Agrave','Aacute','Acirc','Atilde','Auml','Aring','AElig','Ccedil','Egrave','Eacute','Ecirc','Euml','Igrave','Iacute','Icirc','Iuml','ETH','Ntilde','Ograve','Oacute','Ocirc','Otilde','Ouml','Oslash','Ugrave','Uacute','Ucirc','Uuml','Yacute','THORN','euro','quot','szlig','lt','gt','cent','pound','curren','yen','brvbar','sect','uml','copy','ordf','laquo','not','shy','reg','macr','deg','plusmn','sup2','sup3','acute','micro','para','middot','cedil','sup1','ordm','raquo','frac14','frac12','frac34'];
    newString = this;
    for (var i = 0; i < chars.length; i++){
	myRegExp = new RegExp();
	myRegExp.compile(chars[i],'g');
	newString = newString.replace (myRegExp, '&' + entities[i] + ';');
    }
    return newString;
};

//RETURN XML SITEMAP
function xmlMap(){

    var doctype = '<?xml version="1.0" encoding="UTF-8"?>';
    //doctype = doctype.htmlEntities();

    var urlSet = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
    //urlSet = urlSet.htmlEntities();

    var urlSetClose = '</urlset>'+"\n";
    //urlSetClose = urlSetClose.htmlEntities();
    var urls = [];
    $('#sitePages li').each(function(i){
	var thisUrl = $(this).find('input.pageUrl:eq(0)').val();
	var thisPriority = 1.0-($(this).parents('li').size() / $('#sitePages ul').size());
	var thisUrlNode = '<url><loc>'+thisUrl+'</loc><priority>'+thisPriority+'</priority><lastmod>2007-10-05</lastmod><changefreq>hourly</changefreq></url>';
	//thisUrlNode = thisUrlNode.htmlEntities();
	urls.push(thisUrlNode);
    });

    var xmlDocument = '';
    xmlDocument+=doctype+"\n";
    xmlDocument+=urlSet+"\n";
    xmlDocument+=urls.join('\n')+'\n\n';
    xmlDocument+=urlSetClose;
    return xmlDocument;
}



/* TRIAL FEATURES: This functionality is in bookmarklet stage and is not yet implemented in the application*/
function exportHTML(){
	if(!$.browser.msie){
		var copyMap = $('#sitePages').clone();
		copyMap.find('textarea.titleText').each(function(){
			var thisTitle = $(this).val();
			var parentLi = $(this).parents('li:eq(0)');
			var pageUrl = parentLi.find('input.pageUrl:eq(0)').val();
			thisTitle = '<a href="'+ pageUrl +'">'+thisTitle+'</a>';

			$(this).parents('li:eq(0)').prepend(thisTitle);
		});
		copyMap.find('div, a.addPage, img, h3, h4, label, textarea').remove();
		copyMap.find('ul, li').each(function(){
			var indent = '';
			var depth = $(this).parents('ul, li').each(function(){
				indent = indent + '\t';
			});
			$(this).removeAttr('class').removeAttr('id').removeAttr('style').before("\n"+indent).append("\n"+indent);
		});
		modalBox.create('<h2>Trial Feature: XHTML Sitemap</h2>', '<p>Here\'s your Sitemap data in XHTML format. This can be used to make a clickable site directory on your website. <strong>Note:</strong> Please let us know if you would like this integrated into the application!</p> <textarea name="xmlData" id="xmlData">'+	copyMap.html() +'</textarea>', '<a href="#" id="mbCancel" title="Close">Close</a>');
	}
	else {
		modalBox.create('<h2>Trial Feature: XHTML Sitemap</h2>', '<p>Sorry, due to technical constraints, this trial feature is not available in Internet Explorer. However, if you are interested in having this feature implemented in WriteMaps, please let us know!</p>', '<a href="#" id="mbCancel" title="Close">Close</a>');
	}
}


//BUILD MAP FROM JS OBJECT
function buildMap(mapData){
	if(!mapData)
		return false;
	//no pages means new map
	if(mapData.pages.length == 0){
		//cleanup any map that's there
		$('#sitemap').remove();
		addPage('sitePages',null,null,null,null, null);
	}
	else{
		var mapschema = 'valid';
		//check json for valid schema

		$(mapData.pages).each(function(){
			if(typeof this.id == "undefined" || typeof this.name == "undefined" || typeof this.url == "undefined" || typeof this.id == "undefined"){
				mapschema = 'invalid';
			}
		});

		//schema is good if we got this far
		//cleanup any map that's there
		if(mapschema == 'valid'){
			$('#sitemap').remove();
			modalBox.kill();
			if($('#initLoader').size()<1){
				$('#sitePages').after('<p id="initLoader">Loading...</p>');
			}
			$(mapData.pages).each(function(){

				var thisPageID = this.id;
				var thisPageName = decodeURIComponent(this.name);
				var thisPageUrl = decodeURIComponent(this.url);
				var thisPageNotes = decodeURIComponent(this.notes.replace(/%([^0-9])/g, "%25$1"));
				var tempID = thisPageID.lastIndexOf('_');
				var thisParentID =  thisPageID.substring(0, tempID);
				var thisPageColor = this.color;

				if(thisParentID == "page") {
					thisParentID = 'sitePages';
				}
				setTimeout(function(){
					addPage(thisParentID, thisPageID, thisPageName, thisPageUrl, thisPageNotes, thisPageColor);
				}, 10);
			});
		}
		else{
			modalBox.create('<h2>Error: Malformed Source Data</h2>', '<p>The sitemap source you have attempted to import has a malformed schema.</p>', '<a href="#" id="mbCancel" title="Close">Close</a>');
		}
		setCanvas();
                scrollMap();
            $(window).scrollTop(0);
	}
	//Done loading, fade the map in and alert the user if there was a recovery
	if (!$.browser.safari && $('#initLoader').size()>0) {$('#sitemap').hide();}
	$('#mapbuilder').css('cursor', 'default');
	cleanMapStructure();
	$('#initLoader').fadeOut('normal', function(){
		$(this).remove();

		if (!$.browser.safari) {$('#sitemap').fadeIn(1500);}
	//	scrollMap();
	//	hugSiteMap();

		setSorting();
		if(saveStatus.getSrcStatus() == 'unstable'){
			modalBox.create('<h2>Recovered SiteMap Data</h2>', '<p>Some of your SiteMap source data was damaged and WriteMaps auto-recovered it. Would you like to save your SiteMap?</p>', '<a href="#" id="mbCancel">Do not Save</a><a href="#" id="mbSave">Save</a>');
			$('#mbSave').click(function(){
				 setTimeout('autoSave()', 2000);
			});
		}

	});
	if (mapData.archive == 1)
	{
		archived = 1;
		checkArchived();
	}
}


//checks if map is archived or not and changes text in menu
function checkArchived()
{
    if (archived)
	{
		$('#archive a').html('Unarchive');
		$('#share').remove();
	}
    else
	{
		$('#archive a').html('Archive');
		if ($('#share').length == 0)
		{
			$('.appMenu.first li:last').append('<li id="share"><a href="#">Sharing...</a></li>');
		}

		console.log($('#share'));
		$('#share').bind('click', function(){shareButtonClick();});
	}
}




//PAGE SORTING BEHAVIOR
function setSorting(){
	//killSorting();
    $("#sitemap ul:eq(0)").sortable({
	items: "li",
	handle: 'img.pageIcon',
	cursor: 'move',
	placeholder: 'sortHover',
	//connectWith: ".ui-sortable",
	//helper: "clone",
	forceHelperSize: true,
	//dropOnEmpty: true,
	tolerance: "intersect",
	opacity: 0.4,
	distance: 5,
	'zIndex': 99999999,
	start: function(e, ui) {
	    appHistory.tempState = ['Page Sorting', false, mapData(true)];
	    ui.placeholder.height(ui.item.height());
	    ui.placeholder.width(ui.item.width());
	},
	update: function(){
	    appHistory.addToUndo(appHistory.tempState[0], appHistory.tempState[1], appHistory.tempState[2]);
	    saveStatus.unsave();
	},
	stop: function(){
	    setTimeout(function(){
		    cleanMapStructure();
		    hugSiteMap();
	    }, 25);
	}
    });
}

function killSorting(){
	$("#sitemap  ul:eq(0)").sortable('destroy'); //kill any sort that's already assigned
}





//GET MAP ID
function getMapID(){
	return $('#map_id').val();
}
//GET SHARED ID
function getShareID(){
	return $('#share_id').val();
}

//LOAD A SITEMAP BY EITHER MAP/SHARED ID OR NEW
function loadMap(){
    $('#sitemap').remove();
    var postParams = {};
    if($('#initLoader').size()==0)
	$('fieldset').prepend('<p id="initLoader">Loading...</p>');
    if(getMapID())
	postParams = { map_id: getMapID() };
    else if(getShareID())
	postParams = {share_id: getShareID()};
    else
	postParams = false;
    //Send to loadMap script
    $.post(base_url+"wmaps/mapfunctions/loadMap/", postParams, function(json){buildMap(jQuery.parseJSON(json));});
}


//OVERLAY BEHAVIOR
var modalBox = {
	create: function (header, content, footer){
	    $('li.appMenu').removeClass('open');
	    $('#overlayScreen').remove();
	    $('#mapNames').css('overflow', 'hidden');
	    $('body').append('<div id="overlayScreen" style="display: none;"><div id="modalBox"><div id="mbHeader">'+header+'<a href="#" id="mbClose" title="Close">Close</a></div><div id="mbContain"><div id="mbContent">'+content+'</div><div id="mbFooter">'+footer+'</div></div></div></div>');
	    $('#overlayScreen').width($('body').width()).height($('body').height());
	    $('#overlayScreen').fadeIn(500);
	},
	kill: function(){
	    $('#overlayScreen').fadeOut(500, function(){
		$(this).remove();
		$('#mapNames').css('overflow', 'auto');
	    });
	}
};


//OPEN MAP
function openMap(){
    modalBox.create('<h2>Open a Saved Map</h2>', '<p id="loading">Loading...</p>', '<a href="#" id="mbCancel" title="Cancel">Cancel</a>');
    $.ajax({
	type: "GET",
	url: base_url+"mapfunctions/openMenu/",
	success: function(msg){$('#mbContent').html(msg);}
    });
}

function autoSave()
{
	var map_id = getMapID();
	var share_id = getShareID();
	if(map_id || share_id){
	   // $('#sitemap textarea.defaultText').val('');
	    var mapData = {};
	    if(map_id) {
		    mapData['map_id'] = map_id;
	    }
	    else {
		    mapData['share_id'] = share_id;
	    }
	    mapData['pages'] = {};
	    mapData['pages'] = mapDataClass.getData();

//            custom code
//            var EditorBox =  $('.OutLineViewEDITOR');
//	    $('#sitemap textarea.defaultText').val('New Page');
//             var datatext =  $('#sitemap').find('#'+WindowID).find('.connectContain').find('h3:eq(0)').find('.titleText').eq(1);
//            custom code

	    var sendSuccessFunc = function(msg){
	        flag = '0';
		    if(msg*1 == msg || msg == 'shared save')
			    saveStatus.save();
		    else if (msg == 'Error: 401.'){
			    modalBox.create('<h2>Save Map</h2>', '<p>Error: Unauthorized attempt to save.</p>');
			    modalBox.kill();
		    }
	    }
	    mapDataClass.sendData(mapData, sendSuccessFunc);
	}
}

//SAVE MAP
var is_saving = false;
function saveMap(userAction){
            if (is_saving)
                {return;}
            is_saving = true;
            var map_id = getMapID();
            var share_id = getShareID();
            if(map_id || share_id)
            {
                modalBox.create('<h2>Save Map</h2>', '<p id="loading">Saving...</p>', '');
                $('#sitemap textarea.defaultText').val('');
                var mapData = {};
                if(map_id)
                mapData['map_id'] = map_id;
                else
                mapData['share_id'] = share_id;

                mapData['pages'] = {};
                mapData['pages'] = mapDataClass.getData();
                $('#sitemap textarea.defaultText').val('New Page');

                var sendSuccessFunc = function(msg){
                if(msg*1 == msg || msg == 'shared save')
                {
                    saveStatus.save();
                    $('#mbContent').html('<p>Save Successful</p>');
                    if(userAction == 'new')
                    window.location = baseURL+'/wmaps/mapbuilder/';
                    else
                    modalBox.kill();
                }
                else if (msg == 'Error: 401.')
                {
                    $('#mbContent').html('<p>Error: Unauthorized attempt to save.</p>');
                    modalBox.kill();
                }
                }
                mapDataClass.sendData(mapData, sendSuccessFunc);
            }
            //no current map_id, gotta saveAS
            else {saveMapAs(userAction);}
            is_saving = false;


}

//SAVE MAP AS
function saveMapAs(userAction){
	if (is_saving)
        {return;}
    is_saving = true;
    modalBox.create('<h2>Save Map As...</h2>', '<form action="#"><fieldset><label for="map_name">New SiteMap Name:</label><input type="text" id="map_name" name="map_name" /></fieldset></form>', '<a href="#" id="mbCancel">Cancel</a><a href="#" id="mbSave">Save</a>' );

	$('#mbSave').click(function(){
		$('#mbContent form').trigger("submit");
		return false;
	});
	var postString = '';
	$('#mbContent form').submit(function(){

	    var mapData = {};
	    mapData['map_name'] = $('#map_name').val();

	    $('#mbContent').html('<p>Saving...</p>');
	    $('#sitemap textarea.defaultText').val('');
	    $('#sitemap textarea.defaultText').val('New Page');

	    if(mapData['map_name'] != '') {
		mapData['pages'] = {};
		mapData['pages'] = mapDataClass.getData();
	    }
	    else {
		$(this).find('textarea[@type=text]:eq(0)').val('Give your sitemap a name!');
		return false;
	    }
	    var sendSuccessFunc = function(msg){
		if(msg*1 != msg){
		    $('#mbContent').html('<p>'+msg+'</p>');
		    return false;
		}
		saveStatus.save();
		if(userAction == 'new')
		    window.location = baseURL+'/wmaps/mapbuilder/';
		else
		    window.location = baseURL+'/wmaps/mapbuilder/'+msg;
	    }
	    mapDataClass.sendData(mapData, sendSuccessFunc);
	    return false;
	});
    is_saving = false;
}
//ARCHIVE MAP
function archiveMap(){
    var map_id = getMapID();
    if(!map_id || saveStatus.state == "unsave")
    {
	modalBox.create('<h2>Archive Map</h2>', '<p>You need to save this map first</p>', '');
    }
    else
    {
	$.ajax({
	    type: "POST",
	    url: base_url+"mapfunctions/archiveMap/",
	    dataType: "json",
	    data: {
		archive : 1 - archived,
		map_id : map_id
	    },
	    success: function(data){
		if (data.status == 'ok')
		{
		    if (archived)
			modalBox.create('<h2>Archive Map</h2>', '<p>Sucessfully unarchived</p>', '');
		    else
			modalBox.create('<h2>Archive Map</h2>', '<p>Sucessfully archived</p>', '');
		    archived = 1 - archived;
		    checkArchived();
			window.location.href = '/wmaps/archive';
		}
		else
		{alert(data.error);}
	    }
	});
    }
}
//SAVE STATUS TRACKING
var saveStatus = {
	state: 'saved',
	srcStatus: 'stable',
	save: function(){
		this.state = 'saved';
		this.srcStatus = 'stable';
		window.onbeforeunload = null;
		//$('li#save').addClass('disabled');
	},
	unsave: function(){
		this.state = 'unsaved';
		window.onbeforeunload = function(){
		    return 'You have unsaved changes in your sitemap. If you would like to save your sitemap, click cancel and save your sitemap before leaving.';
		};
		$('li#save').removeClass('disabled');
		if (autosave && map_id)
		{autoSave();}
	},
	getState: function(){
		return this.state;
	},
	getSrcStatus: function(){
		return this.srcStatus;
	}
};




//HISTORY TRACKING
var appHistory = {
	undoList: [],
	redoList: [],
	tempState: [], //for saving app state in situations that might need to be tracked depending on a following event
	addToUndo: function(eventName, fromRedo, json){
		if(typeof eventName == 'undefined') {
			eventName = '';
		}
		if(typeof json == 'undefined') {
			json = mapData(true);
		}
		if(typeof fromRedo == 'undefined'){
			this.redoList.length = 0;
			$('#redoLast').addClass('disabled').find('a:eq(0)').html('Redo');
		}
		$('#undoLast').removeClass('disabled').find('a:eq(0)').html('Undo '+eventName);
		this.undoList.push([json,eventName]);
	},
	addToRedo: function(eventName){
		if(typeof eventName == 'undefined') {
			eventName = '';
		}
		$('#redoLast').removeClass('disabled').find('a:eq(0)').html('Redo '+eventName);
		this.redoList.push([mapData(true),eventName]);
	},
	undo: function(){
		if(typeof this.undoList[0]!='undefined'){
			this.addToRedo(this.undoList[this.undoList.length-1][1]);
			buildMap(jQuery.parseJSON((this.undoList.pop()[0])));
		}
		if(typeof this.undoList[0]=='undefined'){
			$('#undoLast').addClass('disabled').find('a:eq(0)').html('Undo');
			saveStatus.save();
		}
		else {
			$('#undoLast').find('a:eq(0)').html('Undo '+this.undoList[this.undoList.length-1][1]);
		}
		cleanMapStructure();
		setSorting();
	},
	redo: function(){
		if(typeof this.redoList[0]!='undefined'){
			this.addToUndo(this.redoList[this.redoList.length-1][1], true);
			buildMap(JSON.parse(this.redoList.pop()[0]));
		}
		if(typeof this.redoList[0]=='undefined'){$('#redoLast').addClass('disabled').find('a:eq(0)').html('Redo');}
		else {
			$('#redoLast').find('a:eq(0)').html('Redo '+this.redoList[this.redoList.length-1][1]);
		}
		cleanMapStructure();
		setSorting();
	},
	print: function(){
		return this.undoList;
	}
};


//IMAGES PRELOADING AND REFERENCING
var imgs = (function(){
	var ext =  ($.browser.msie && $.browser.version < 7) ? 'gif' : 'png'; //extension switch for IE
	var imgsArr = {
		close: '/static/images/close.'+ext,
		modalBoxHeader: '/static/images/bg_modalBox_header.'+ext,
		modalBoxBot: '/static/images/bg_modalBox_bot.'+ext,
		loaderAnim: '/static/images/ajax-loader.gif',
		bullet_toggle_minus: '/static/images/bullet_toggle_minus.'+ext,
		bullet_toggle_plus: '/static/images/bullet_toggle_plus.'+ext,
		page: '/static/images/page2.'+ext,
		page_iePrint: '/static/images/page_iePrint.gif',
		cancel: '/static/images/cancel.'+ext,
		information: '/static/images/information.'+ext,
		information_off: '/static/images/information_off.'+ext,
		add: '/static/images/add.'+ext,
		newWin: '/static/images/newWin.gif',
		dropZone: '/static/images/dropZone.gif'
	};
	return imgsArr;
})();

//PRELOAD IMAGES FUNCTION
(function(){
	var loadedImgs = [];
	var i = 0;
	for (property in imgs){
		loadedImgs[i] = new Image();
		loadedImgs[i].src = imgs[property];
		i++;
	}
})();





/*-------------------------------------------------------------------------
DOM READY EVENTS
-------------------------------------------------------------------------*/
$(function(){
//	$('#logo').pngFix();
	$('#alertUser').remove();
	//view.loadView();
	view.map();
	mode.loadMode();

	zoomSlider();
	//setCanvas();
	assignPageEvents();
	$(window).resize(function () {setCanvas();});
	loadMap();
	whControls();


});
/*---------------------color Class----------------------*/
function MyColorClass(){
    this.rgbToHex = function(rgb){
	rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
	return "#" +
	("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
	("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
	("0" + parseInt(rgb[3],10).toString(16)).slice(-2);
    };
    this.getColorPage = function(id){
	return this.rgbToHex($('#'+id).children('.connectContain').children('.pageContain').children('.backgrount-img-map').css('background-color'));
    }
    this.setColorPage = function(all, id){
	$('#'+id).children('.connectContain').children('.pageContain').children('.backgrount-img-map').css('background-color', '#' + all.hex);
    }
}
var ColorClass = new MyColorClass();

/*-----------------MapData Class------------------------*/
function MapDataClass()
{

	var flag = '1';
    this.getData = function(){
	cleanMapStructure();
	var pages = {};
	$('#sitePages li').each(function(i){
	    var thisID = $(this).attr('id');
	    if (thisID == "_000") return;

	    pages[thisID] = {};
	    //pages[thisID]['name'] = $(this).find('.titleText').html();
        pages[thisID]['name'] = $(this).find('h3:eq(0)').find('.titleText:eq(1)').html();
	    pages[thisID]['url'] = $('#'+thisID+'_url').val();
	    pages[thisID]['notes'] = $('#'+thisID+'_notes').text();
	   // pages[thisID]['color'] = ColorClass.getColorPage(thisID);
        pages[thisID]['color'] = $('#'+thisID).find('.backgrount-img-map:first').attr('id');
	});

	return pages;
    }
    this.sendData = function(data, sendSuccessFunc){
		var mapDataJson = {};
		mapDataJson['data'] = JSON.stringify(data);
		$.ajax({
		    type: "POST",
		    url: base_url+"wmaps/save_map/",
		    data: mapDataJson,
		    success: sendSuccessFunc
		});
    }
}
var mapDataClass = new MapDataClass();





//  LIVE CHANGE
