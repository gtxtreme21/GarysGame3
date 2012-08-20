function removeConfirm(delUrl, message, gridParent, focusElement) {
	var myGridId = gridParent+"_gridlist";
	if (confirm(message)) {
		$.getJSON(delUrl, function (data, status, xhr) {
			if(data && data.isValid == true) {
				if (myGridId) {
					$("#"+myGridId).trigger("reloadGrid");
					//Now done in populategrid function $(".ui-jqgrid-titlebar-close", "#gbox_"+myGridId).click();
					var elem = document.getElementById(focusElement);
					if (elem) {elem.focus();}
					
					return false;
				}
			} else {
				alert("Something failed while removing items.");
			}
		});
	}
}

function resetForm(aform) {
	if (aform) {
		if (confirm('Clear all form fields?')) {
			aform.reset();
		}
	}
}

function deleteObj(delUrl) {
	if (delUrl) {
		top.location=delUrl;
	}
}

function deleteFuncAjax(validateUrl, success, fail){
	$.getJSON(validateUrl, function (data, status, xhr){
		if(success) {
			if (data.isValid == true) {
				success(true,data.message);
			} else {
				fail();
			}
		}
	});
}	

function deleteConfirm(delUrl, hasChild, display){
	var message = "Are you sure you want to delete " + display + "?";
	
	if (hasChild == "true") {
		message = "All associated records will be deleted for " + display + ".Are you sure?";
	}	

	if (confirm(message)) {
		deleteObj(delUrl);		
	}
}

function deleteFunc(delUrl, validateUrl){
	deleteFuncAjax(validateUrl,
		function(isValid,message){
			if(isValid){
				if(message){
					if (confirm(message)) {
						deleteObj(delUrl);
					}
				}
				else{
					if (confirm('Are you sure you want to delete?')) {
						deleteObj(delUrl);
					}
				}
			}
			else{
				if(message){
					if (confirm(message)) {
						deleteObj(delUrl);
					}
				}
				else{
					alert("An error occured while validating for delete!");
					//TODO: what can we do?
				}
			}
		}
		,
		function(){
			alert("An error occured while validating for delete!");
		}
	);
	return false;
}

function removeFunc(validateUrl, gridParent){
	deleteFuncAjax(validateUrl,
		function(isValid,message){
			if(isValid){
				if(message){
					alert(message);
				}
				var myGridId = "#"+gridParent+"_gridlist";
				$(myGridId).trigger("reloadGrid", {current:true}); 
			}
			else{
				if(message){
					alert(message);
				}
				else{
					alert("An error occured while removing item!");
				}
			}
		}
		,
		function(){
			alert("An error occured while removing item!");
		}
	);
	return false;
}

function populateGrid(gridUrl, gridId, gridTitle, gridColNames, gridColModel){

	var id = gridId+"_gridlist";
	var myGridId = "#"+id;
	var myGridPage = "#"+gridId+"_gridpage";
	//window.open(gridUrl);
    jQuery(myGridId).jqGrid({
        url:gridUrl, 
        datatype: "json",
        //TODO: had to change to local data type until I figure this out in GWT
        //datatype: "local",
        height:250,
        width:498,

        colNames:gridColNames,
        colModel:gridColModel,
        multiselect: false,
        paging: false,
        rowNum:-1,
        rowList:[10,50,100],
        pager: $(myGridPage),
        loadonce:false,
        caption: gridTitle,
        emptyrecords: "Nothing to display",
        viewrecords:true,
        gridComplete: function(data){
        	$(myGridId).jqGrid('setGridParam',{datatype:'json'});
        	$(myGridPage).css('height','30px').css('right-padding','10px');
        	hideGrid(gridId);
        },
        
        jsonReader: {
        	root: "rows",
        	repeatitems: false,
        	page: function(obj) {
    			if (obj) {
    				return obj.page;
    			}
    			return 0;
        	}, 
            total: function(obj) { 
            	if (obj) {
            		return obj.total;
            	}
            	return 0;
            } 
        },
        prmNames: {npage:1}

    }).navGrid(myGridPage,{edit:false,add:false,del:false,search:false});

}

function hyperLink(cellValue, options, rowdata, action) {
	var myVal = "";
	if (cellValue) {
		var len = cellValue.length;
		for (var i = 0; i < len; i++) {
			var hyperLink = cellValue[i];
			var bar = len > 1 ? " | " : "";
			if (hyperLink) {
				if (i == (len - 1)) {
					bar = "";
				}
				if (hyperLink.validateUrl) {
					myVal += "<a href='javascript:void(0)' onclick='javascript:deleteFunc("+ '"' + hyperLink.url + '"' + "," + '"'  +"/acms" + hyperLink.validateUrl + '"' + "); return false;'>" + hyperLink.display + "</a>" + bar;
				} else if(hyperLink.ajax) {
					myVal += "<a href='javascript:void(0)' onclick='javascript:removeFunc("+ '"' + hyperLink.url + '"' + ","  + '"'  + hyperLink.gridParent + '"' + "); return false;'>" + hyperLink.display + "</a>" + bar;
				} else {
					myVal += "<a href='" + hyperLink.url + "' >" + hyperLink.display + "</a>" + bar;
				}
			}
		}
	}
    return myVal; 
}

function readonlyLink(cellValue, options, rowdata, action) {
	var myVal = "";
	if (cellValue) {
		var len = cellValue.length;
		for (var i = 0; i < len; i++) {
			var hyperLink = cellValue[i];
			var bar = len > 1 ? " | " : "";
			if (hyperLink) {
				if (i == (len - 1)) {
					bar = "";
				}
				myVal += "N/A";
			}
		}
	}
    return myVal; 
}

function hideGrid(id) {
	if (id) {
		id = "#"+id;
		var myGridId = id+"_gridlist";
		var myGridPage = id+"_gridpage";
		if (jQuery(myGridId) != null) {
			var cnt = jQuery(myGridId).jqGrid('getGridParam', 'reccount');
			var isNbr = $.isNumeric(cnt);
			if (isNbr && cnt < 1) {
				$(id).hide();
				$(myGridId).hide();
				$(myGridPage).hide();
			} else {
				$(id).show();
				$(myGridId).show();
				$(myGridPage).show();
			}
		}
	}
}

function getGridUrl(gridUrl) {
	//window.open(gridUrl);	
	return {
	 "total":1,"page":1,"records":6,"rows":[
	  {"id":null,"display":"B4B","action":[{"display":"REMOVE","url":"/ad/25150/mpnapplicability/B4B/remove","validateUrl":null,"ajax":true,"gridParent":"jqRangeGrid"}]},
	  {"id":null,"display":"B5B","action":[{"display":"REMOVE","url":"/ad/25150/mpnapplicability/B5B/remove","validateUrl":null,"ajax":true,"gridParent":"jqRangeGrid"}]},
	  {"id":null,"display":"B6B","action":[{"display":"REMOVE","url":"/ad/25150/mpnapplicability/B6B/remove","validateUrl":null,"ajax":true,"gridParent":"jqRangeGrid"}]},
	  {"id":null,"display":"B7B","action":[{"display":"REMOVE","url":"/ad/25150/mpnapplicability/B7B/remove","validateUrl":null,"ajax":true,"gridParent":"jqRangeGrid"}]},
	  {"id":null,"display":"B8B","action":[{"display":"REMOVE","url":"/ad/25150/mpnapplicability/B8B/remove","validateUrl":null,"ajax":true,"gridParent":"jqRangeGrid"}]},
	  {"id":null,"display":"B9B","action":[{"display":"REMOVE","url":"/ad/25150/mpnapplicability/B9B/remove","validateUrl":null,"ajax":true,"gridParent":"jqRangeGrid"}]}
	 ]
 }
}

function populateRowsFromLocal(id) {
	var mydata = [
	        	  {"id":null,"display":"B4B","action":[{"display":"REMOVE","url":"/ad/25150/mpnapplicability/B4B/remove","validateUrl":null,"ajax":true,"gridParent":"jqRangeGrid"}]},
	        	  {"id":null,"display":"B5B","action":[{"display":"REMOVE","url":"/ad/25150/mpnapplicability/B5B/remove","validateUrl":null,"ajax":true,"gridParent":"jqRangeGrid"}]},
	        	  {"id":null,"display":"B6B","action":[{"display":"REMOVE","url":"/ad/25150/mpnapplicability/B6B/remove","validateUrl":null,"ajax":true,"gridParent":"jqRangeGrid"}]},
	        	  {"id":null,"display":"B7B","action":[{"display":"REMOVE","url":"/ad/25150/mpnapplicability/B7B/remove","validateUrl":null,"ajax":true,"gridParent":"jqRangeGrid"}]},
	        	  {"id":null,"display":"B8B","action":[{"display":"REMOVE","url":"/ad/25150/mpnapplicability/B8B/remove","validateUrl":null,"ajax":true,"gridParent":"jqRangeGrid"}]},
	        	  {"id":null,"display":"B9B","action":[{"display":"REMOVE","url":"/ad/25150/mpnapplicability/B9B/remove","validateUrl":null,"ajax":true,"gridParent":"jqRangeGrid"}]}
	        	 ];
	for(var i=0;i<=mydata.length;i++) {
		jQuery(id).jqGrid('addRowData',i+1,mydata[i]);	
	}
}

function populateRows(display, width, sortable) {
	var columnModelRow = {};
	columnModelRow['name'] = display;
	columnModelRow['index'] = display;
	var sort = sortable == false? false: true;
	columnModelRow['sortable'] = sort;
	columnModelRow['width'] = width;
	columnModelRow['resizable'] = true;

	//if (display == "TODO: Fix This!") {
	if (display == "action") {
		columnModelRow['formatter'] = hyperLink;
/*			function hyperLink(cellValue, options, rowdata, action) {
			var myVal = "";
			if (cellValue) {
				var len = cellValue.length;
				for (var i = 0; i < len; i++) {
					var hyperLink = cellValue[i];
					var bar = len > 1 ? " | " : "";
					if (hyperLink) {
						if (i == (len - 1)) {
							bar = "";
						}
						if (hyperLink.validateUrl) {
							myVal += "<a href='javascript:void(0)' onclick='javascript:deleteFunc("+ '"' + hyperLink.url + '"' + "," + '"'  + hyperLink.validateUrl + '"' + "); return false;'>" + hyperLink.display + "</a>" + bar;
						} else if(hyperLink.ajax) {
							myVal += "<a href='javascript:void(0)' onclick='javascript:removeFunc("+ '"' + hyperLink.url + '"' + ","  + '"'  + hyperLink.gridParent + '"' + "); return false;'>" + hyperLink.display + "</a>" + bar;
						} else {
							myVal += "<a href='" + hyperLink.url + "' >" + hyperLink.display + "</a>" + bar;
						}
					}
				}
			}
		    return myVal; 
		};*/
	}
	return columnModelRow;
}