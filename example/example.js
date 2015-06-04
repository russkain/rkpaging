//WHEN THE DOCUMENT IS READ
$(document).ready(function () {

//MAKE A TABLE
var rec = 1;
$('#tableContainer').append("<table id='myTable' cellspacing='0' rules='all' border='1'></table>");
$('#myTable').append("<thead><tr><th>Header 1</th><th>Header Two</th><th>Header D</th></tr></thead>")
$('#myTable').append("<tbody></tbody>")
while (rec <= 468) {
    $('#myTable tbody').append("<tr><td>" + rec + "</td><td>data</td><td>more</td></tr>");
    rec = rec + 1;
}

//CREATE TWO PAGER CONTROLS
//CreatePager(id, table, parentid, appendEnd, buttonColor, buttonActiveColor)
CreatePager("topPageControls", "myTable", "tableContainer", false, "#e8090e", "#99060a");
CreatePager("bottomPageControls", "myTable", "tableContainer", true, "#e8090e", "#99060a");

//ENABLE THE CONTROLS
//EnablePageControls(forTable, recordsPerPage)-->
EnablePageControls('myTable', 20);

});