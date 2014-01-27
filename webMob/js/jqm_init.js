//initialisation des status des menus
if (window.sessionStorage.menuOpened == null) {
	window.sessionStorage.menuOpened = 0;
	window.sessionStorage.smallMenuOpened = 0;
	window.sessionStorage.headerHidden = 0;
} 
		
$(document).bind('pageinit',(function() {
	$.event.special.swipe.horizontalDistanceThreshold = '50';
	
	$.mobile.defaultPageTransition = 'none';
	$.mobile.defaultDialogTransition = 'none';
	$.mobile.ajaxLinksEnabled = false;
}));

//Gestion des swipe pour changement de page
$('.ui-page').bind('swipeleft swiperight', function(event) {
	if (tplMgr.fDisableTouchEvents)  return;	
	var nextPage = "";
	var button;
	if (event.type == "swiperight") {
		
		nextPage = $("a.mob_prevBtn").attr("href");
	} else if (event.type == "swipeleft") {
		nextPage = $("startBtn").attr("href");
		if (nextPage == null)
			nextPage = $("a.mob_nextBtn").attr("href");
	}
	
	if (nextPage != null) {
		window.location.href=nextPage;
	}
});

$( "#mypanel" ).on( "panelopen", function( event, ui ) { 
	$( "#mypanel" ).trigger( "updatelayout" );
} );

	
//Affiche ou masque les menus avant l'affichage de la page
$( '#page' ).bind( 'pagebeforeshow',function(event){
	if ($(window).width()>640) {
		//$( "#mypanel" ).panel({ animate: false });
		//$('#menuBtn').trigger('click');
		if (window.sessionStorage.menuOpened == 1 || window.sessionStorage.toolsMenuOpened == 1) {	
			$( "#mypanel" ).panel( "open" );
		} else {
			$( "#mypanel" ).panel( "close" );
		}
	} else {
		$( "#mypanel" ).panel( "close" );
		if (window.sessionStorage.smallMenuOpened == 1 )
			$('#menu-top').trigger('expand');
			
		if ($(window).width()<500) {
		  $('#menuBtn').buttonMarkup({iconpos:"notext"}).buttonMarkup("refresh");
		  $("#playBtn").buttonMarkup({iconpos:"notext"}).buttonMarkup("refresh");
		  $("#toolsBtn").buttonMarkup({iconpos:"notext"}).buttonMarkup("refresh");
  		}
	}
	
	if (window.sessionStorage.headerHidden == 1){
		hideToolBars();
	}
	
});

//enregistrement du changement de status du menu small une fois la page chargée
$( '#page' ).bind( 'pageshow',function(event){
	$('#menu-top').bind('expand', function () {
		window.sessionStorage.smallMenuOpened = 1;
	});
	$('#menu-top').bind('collapse', function () {
		window.sessionStorage.smallMenuOpened = 0;
	});
	if (window.sessionStorage.menuOpened == 1 || window.sessionStorage.toolsMenuOpened ==1) {
		minHeight = ($(window).height() > $( "#mypanel" ).height()) ? $(window).height() - 105:$( "#mypanel" ).outerHeight();
		$('.ui-panel-content-wrap').css("min-height",minHeight);
	}
});

$( "#toolsBtn" ).bind( "click", function() {
	window.sessionStorage.toolsMenuOpened = 1;
});

$ ( "#playBtn" ).bind( "click", function() {
	window.sessionStorage.toolsMenuOpened = window.sessionStorage.menuOpened;
});

//Action sur le bouton menu
$( "#menuBtn" ).bind( "click", function() {
	//$( "#mypanel" ).panel({ animate: true });
	
	if ($(window).width()>640) {
		$( "#mypanel" ).trigger( "updatelayout" );
		$( "#mypanel" ).panel( "toggle" );
		
		if (window.sessionStorage.menuOpened == 1) {
			window.sessionStorage.menuOpened = 0;
		} else {
			window.sessionStorage.menuOpened = 1;
		}	
		window.sessionStorage.toolsMenuOpened = window.sessionStorage.menuOpened;
	} else {
		$.mobile.silentScroll(0);
		$('#menu-top').trigger('expand');				
	}
});



//Gestion du changement d'orientation : fermeture du panel de gauche
$(window).resize(function() {
  if ($(window).width()<640) {
	  $( "#mypanel" ).panel( "close" );	  
	  window.sessionStorage.menuOpened = 0;
  }
  
  if ($(window).width()<500) {
		  $('#menuBtn').buttonMarkup({iconpos:"notext"}).buttonMarkup("refresh");
		  $("#playBtn").buttonMarkup({iconpos:"notext"}).buttonMarkup("refresh");
		  $("#toolsBtn").buttonMarkup({iconpos:"notext"}).buttonMarkup("refresh");
  } else {
	  $('#menuBtn').buttonMarkup({iconpos:"left"}).buttonMarkup("refresh");
	  $("#playBtn").buttonMarkup({iconpos:"left"}).buttonMarkup("refresh");
	  $("#toolsBtn").buttonMarkup({iconpos:"right"}).buttonMarkup("refresh");
  }
});

//Permet le fonctionnement des liens internes sur les pages de glossaire
$('.refOutlineEntry a').attr("data-ajax", "false");

//masquer afficher le header et le footer
$('#hideBtn').bind('click', function(event) {
	hideToolBars();	
});

//masquer afficher le header et le footer
$('#showBtn').bind('click', function(event) {
	showToolBars();
});

function hideToolBars(){
	$('#my-header').css("display","none");
	$('.ui-footer').css("display","none");
	
	if ($(window).width()>640)
		$( "#mypanel" ).panel( "close" );
	else
		$('#menu-top').css("display","none");
	
	$('#showBtnDiv').css("display","block");
	
	window.sessionStorage.headerHidden = 1;
	window.sessionStorage.menuOpened = 0;
	
	minHeight = $(window).height();
	$('.ui-panel-content-wrap').css("min-height",minHeight);
	$('.ui-page').addClass("toolbars-hidden");
}

function showToolBars(){
	$('#my-header').css("display","");
	$('.ui-footer').css("display","");
	$('.ui-page').removeClass("toolbars-hidden");
	
	minHeight = $(window).height();
	$('.ui-panel-content-wrap').css("min-height",minHeight-105);
		
	if ($(window).width()<640)
		$('#menu-top').css("display","");
		
	$('#showBtnDiv').css("display","none");	
	window.sessionStorage.headerHidden = 0;
}