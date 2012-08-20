$(document).ready(function(){
 $("#msgid").html("Welcome to the jQuery Demo");
 $("#msgid2").html("These are the most common jQuery examples, as well as, a custom example that I added to the end");
 
 $.datepicker.setDefaults({dateFormat: 'mm-dd-yy'}); 

 $('#date_field').datepicker();
 
 $("#isSelect").click(function () {
	 
	alert($('#country').val());
 
    });
 
 $("#selectUS").click(function () {
 
	$("#country").val("United States");
 
    });
 
     
 $("#disableUS").click(function () {
 
	$("#country option[value='United States']").attr("disabled", true);
 
    });
 
 $("#enableUS").click(function () {
 
	$("#country option[value='United States']").attr("disabled", false);
	});
 
 $("#male_box").prop("checked", false);
 
 $("#female_box").prop("checked", true);
 
 $( "#button").click(function()
		 {alert("You clicked the submit button")}
 );
 
 $("#ajax_button").click(function(){
		$("#ajax_div").load("result.html");
	//  alert("This is an AJAX Button");
	  }); 

 $("#json_button").click(function(){
		//$("#json_div").load("result1.json");
	 	 $.getJSON('result1.json', function(jd) {
         $('#json_div').html('<p> Name: ' + jd.name + '</p>');
         $('#json_div').append('<p>Age : ' + jd.age+ '</p>');
         $('#json_div').append('<p> Sex: ' + jd.sex+ '</p>');
      });
	 }); 
	 
$(".prefix").focus(function (element) {

var i=0;
	 //setTimeout(function(){
		var ainput = element;
		var ua = window.navigator.userAgent;
		var msie = ua.indexOf ( "MSIE " );
		if (msie > 0) {
		var src = ainput.srcElement;
		//src.value = 'test4';
		var FieldRange = src.createTextRange();
		FieldRange.moveStart('character', src.value.length);
		FieldRange.collapse();
		FieldRange.select();
		if (i < 2) {
			i = i + 1;
			src.focus();//has to be here or all characters stay selected
		}
		} else {
		var src = ainput.srcElement;		
		src.selectionStart = src.value.length;
		src.selectionEnd = src.value.length;
		src.value = src.value;
		}
	//},50);  // call the function after 50ms

});

$(".prefix").focus(function (element) {
	var i=0;
		var ainput = element;
		var src = ainput.target;
		var ua = window.navigator.userAgent;
		//alert(ua);
		var msie = ua.indexOf ( "MSIE " );
		//var ff = ua.indexOf ( "Mozilla" );
		//ff = ff > -1? ff: ua.indexOf ( "Firefox" );
		//alert(ff);
		if (msie > -1) {
			//alert('in IE and FF code');
			
			var FieldRange = src.createTextRange();
			FieldRange.moveStart('character', src.value.length);
			FieldRange.collapse();
			FieldRange.select();
			if (i < 2) {
				i = i + 1;
				src.focus();//has to be here or all characters stay selected
			}
		} else {
			//var src = ainput.srcElement;		
			src.selectionStart = src.value.length;
			src.selectionEnd = src.value.length;
			src.focus();
			src.value = src.value;
			$(".prefix").attr('selectionStart',src.value.length);
			$(".prefix").attr('selectionEnd',src.value.length);
			if (src.selectionStart != null) {
				setTimeout(function(){
					src.setSelectionRange(src.value.length, src.value.length);
					//alert('setSelectionRange');
				},50);  // call the function after 50ms
			}
		}
	});

$(function() {
	
	$( "#tabs" ).tabs({header :"h4"});
	
	$( "#accordion" ).accordion({header :"h3"}); 
	
	var availableTags = [
	         			"ActionScript",
	         			"AppleScript",
	         			"Asp",
	         			"BASIC",
	         			"C",
	         			"C++",
	         			"Clojure",
	         			"COBOL",
	         			"ColdFusion",
	         			"Erlang",
	         			"Fortran",
	         			"Groovy",
	         			"Haskell",
	         			"Java",
	         			"JavaScript",
	         			"Lisp",
	         			"Perl",
	         			"PHP",
	         			"Python",
	         			"Ruby",
	         			"Scala",
	         			"Scheme"
	         		];
	$( "#tags" ).autocomplete({
		source: availableTags
	});
	
	$( "#dialog" ).dialog({
		autoOpen:false,
		width: 600,
		height:200,
		buttons: {
				"Ok": function() {
					$(this).dialog("close");
				},
				"Cancel": function() {
					$(this).dialog("close");
				}
			}
	});
	
	$('#dialog_link').click(function(){

		$('#dialog').dialog('open');

		return false;

	});
	
	$('#dialog_link, ul#icons li').hover(

			function() { $(this).addClass('ui-state-hover'); },

			function() { $(this).removeClass('ui-state-hover'); }

	);


	         		         		
});


});