//Checks the number or records in the gridview and decides how many pages are required
//If only one page is required, the paging controls are hidden wth css display:none;
function EnablePageControls(forTable, recordsPerPage) {

    //alert("enabling paging");

    //FIND OUT HOW MANY PAGES WE NEED
    records = $('#' + forTable + ' tbody tr').length;
    recPerPage = recordsPerPage;
    noOfPages = Math.ceil(records / recPerPage);

    //alert(records);
    //alert(recPerPage);
    //alert(noOfPages);

    //HOLD VALUES IN PAGER ATTRIBUTES
    $('.pager').attr("curpage", "1");
    $('.pager').attr("pages", noOfPages);
    $('.pager').attr("recordsperpage", recPerPage);


    //HAVE WE GOT MORE THAN ONE PAGE?
    if (noOfPages > 1) {
        $('.pager span:nth-of-type(5)').html("Page 1 of " + noOfPages);
        $('.pager').attr("style", "display:inherit;");
    }
    else {
        $('.pager').removeAttr("style");
    }

    //move to the first page
    MovePage(1);

}

//Bind the button clicks
$(document).ready(function () {

    //<< back to start button
    $('body').on('click', '.pager span:nth-of-type(1)', function () {

        //get parent and table
        var p = $(this).parent();
        var table = $(p).attr("for");

        //work out first page
        var curpage = $(p).attr("curpage");
        var recordsperpage = $(p).attr("recordsperpage");
        var pages = $(p).attr("pages");
        var firstpage = 1;

        //is this button enabled?
        var enabled = $(this).attr("state");
        if (enabled == "enabled") {

            //change the display and the attr
            $(".pager span:nth-of-type(5)").html("Page " + firstpage + " of " + pages);
            $(".pager").attr("curpage", firstpage);

            $(".pager span:nth-of-type(4)").attr("state", "enabled");
            $(".pager span:nth-of-type(3)").attr("state", "enabled");
            $(".pager span:nth-of-type(2)").attr("state", "disabled");
            $(".pager span:nth-of-type(1)").attr("state", "disabled");

            MovePage(firstpage);
        }

    });

    //< back to previous page
    $('body').on('click', '.pager span:nth-of-type(2)', function () {

        //get parent and table
        var p = $(this).parent();
        var table = $(p).attr("for");

        //work out previous page
        var curpage = $(p).attr("curpage");
        var previouspage = Number(curpage) - Number(1);
        var recordsperpage = $(p).attr("recordsperpage");
        var pages = $(p).attr("pages");

        //is this button enabled?
        var enabled = $(this).attr("state");
        if (enabled == "enabled" && Number(curpage) > 1) {

            //change the display and the attr
            $(".pager span:nth-of-type(5)").html("Page " + previouspage + " of " + pages);
            $(".pager").attr("curpage", previouspage);

            //adjust style
            if (previouspage == 1) {
                $(".pager span:nth-of-type(4)").attr("state", "enabled");
                $(".pager span:nth-of-type(3)").attr("state", "enabled");
                $(".pager span:nth-of-type(2)").attr("state", "disabled");
                $(".pager span:nth-of-type(1)").attr("state", "disabled");
            }
            else {
                $(".pager span:nth-of-type(4)").attr("state", "enabled");
                $(".pager span:nth-of-type(3)").attr("state", "enabled");
                $(".pager span:nth-of-type(2)").attr("state", "enabled");
                $(".pager span:nth-of-type(1)").attr("state", "enabled");
            }
            MovePage(previouspage);
        }
    });

    //> forward to next page
    $('body').on('click', '.pager span:nth-of-type(3)', function () {

        //get parent and table
        var p = $(this).parent();
        var table = $(p).attr("for");

        //work out next page
        var curpage = $(p).attr("curpage");
        var nextpage = Number(curpage) + Number(1);
        var recordsperpage = $(p).attr("recordsperpage");
        var pages = $(p).attr("pages");

        //is this button enabled?
        var enabled = $(this).attr("state");
        if (enabled == "enabled" && Number(curpage) < Number(pages)) {

            //change the display and the attr
            $(".pager span:nth-of-type(5)").html("Page " + nextpage + " of " + pages);
            $(".pager").attr("curpage", nextpage);

            //adjust style
            if (nextpage == pages) {
                $(".pager span:nth-of-type(4)").attr("state", "disabled");
                $(".pager span:nth-of-type(3)").attr("state", "disabled");
                $(".pager span:nth-of-type(2)").attr("state", "enabled");
                $(".pager span:nth-of-type(1)").attr("state", "enabled");
            }
            else {
                $(".pager span:nth-of-type(4)").attr("state", "enabled");
                $(".pager span:nth-of-type(3)").attr("state", "enabled");
                $(".pager span:nth-of-type(2)").attr("state", "enabled");
                $(".pager span:nth-of-type(1)").attr("state", "enabled");
            }
            MovePage(nextpage);
        }

    });

    //>> forward to last page
    $('body').on('click', '.pager span:nth-of-type(4)', function () {

        //get parent and table
        var p = $(this).parent();
        var table = $(p).attr("for");

        //work out next page
        var curpage = $(p).attr("curpage");
        var recordsperpage = $(p).attr("recordsperpage");
        var pages = $(p).attr("pages");
        var lastpage = pages;

        //is this button enabled?
        var enabled = $(this).attr("state");
        if (enabled == "enabled" && Number(curpage) < Number(pages)) {

            //change the display and the attr
            $(".pager span:nth-of-type(5)").html("Page " + lastpage + " of " + pages);
            $(".pager").attr("curpage", lastpage);

            $(".pager span:nth-of-type(4)").attr("state", "disabled");
            $(".pager span:nth-of-type(3)").attr("state", "disabled");
            $(".pager span:nth-of-type(2)").attr("state", "enabled");
            $(".pager span:nth-of-type(1)").attr("state", "enabled");

            MovePage(lastpage);
        }

    });

});

//CREATES A NEW PAGER CONTROL
//id = the ID of the pager element, 
//table = the table the pager will work with
//parentid = the parent container
//appendEnd = set to false to append as the last element in the parent, set to true to append as the first element
function CreatePager(id, table, parentid, appendEnd, buttonColor, buttonActiveColor) {
    
	//CREATE SOME STYLE FOR THE BUTTONS
	var st = "<style>" 
	+ "#" + id + " span[state='enabled'] { background:" + buttonColor + "; }"
	+ "#" + id + " span[state='enabled']:active { background:" + buttonActiveColor + ";}";
	+ "</style>"
	$('head').append(st);
	
	//DELETE ANY PREVIOUS PAGERS WITH THIS ID
    $('#' + id).remove();

    //RECREATE
    var x = '<div class="pager" id="' + id + '" for="' + table + '" curpage="0" pages="0" recordsperpage="0"> <span state="disabled"><<</span> <span state="disabled"><</span> <span state="enabled">></span> <span state="enabled">>></span> <span>Page 1 of 5</span> </div>';

    if (appendEnd === true) {
        $(x).appendTo($('#' + parentid));
    }
    else {
        $('#' + parentid).prepend(x);
    }

    return true;
}

//Call this function to move pages in the paginated gridview. Item's are displayed or hidden by adding or removing the 
//attribute 'hiddenbypaging' (bool)
function MovePage(page) {


    //find out what table the pager is for
    var forGrid = $('.pager').attr("for");

    //WORK OUT RECORD RANGE
    var startRecord;
    if (page == 1)
    { startRecord = 1; }
    else
    { startRecord = (page * recPerPage) - recPerPage + 1; }
    var endRecord = startRecord + (recPerPage - 1);

    //FILTER BASED ON PAGE
    $('#' + forGrid + ' tbody tr').each(function () {

        //FIGURE OUT IF THIS RECORD SHOULD BE SHOW - APPLY CORRECT ATTR
        var ind = $(this).index() + 1;
        if (ind >= startRecord && ind <= endRecord) {
            $(this).removeAttr("hiddenbypaging");
        }
        else {
            $(this).attr("hiddenbypaging", "true");
        }
    });
}
