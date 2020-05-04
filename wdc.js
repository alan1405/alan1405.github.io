(function () {
    var myConnector = tableau.makeConnector();
    myConnector.getSchema = function (schemaCallback) {
    var cols = [
    { id : "areaName", alias:"Area Name", dataType : tableau.dataTypeEnum.string },
    { id : "totalLabConfirmedCases", alias: "Total Confirmed Cases",dataType : tableau.dataTypeEnum.string },
    { id : "dailyLabConfirmedCases",alias: "Daily COnfirmed Cases", dataType : tableau.dataTypeEnum.string },
    ];
    var tableInfo = {
    id : "cases",
    alias : "Covid Daily Cases",
    columns : cols
    };
    schemaCallback([tableInfo]);
    };
    myConnector.getData = function(table, doneCallback) {
    $.getJSON("https://coronavirus.data.gov.uk/downloads/json/coronavirus-cases_latest.json", function(resp) {
    var feat = resp;
    tableData = [];
    // Iterate over the JSON object
    for (var i = 0, len = feat.length; i < len; i++) {
    tableData.push({
    "areaName": feat[i]["dailyRecords"]["areaName"],
    "totalLabConfirmedCases": feat[i]["dailyRecords"]["totalLabConfirmedCases"],
    "dailyLabConfirmedCases": feat[i]["dailyRecords"]["dailyLabConfirmedCases"],
    });
    }
    table.appendRows(tableData);
    doneCallback();
    });
    };
    tableau.registerConnector(myConnector);
    $(document).ready(function () {
    $("#submitButton").click(function () {
    tableau.connectionName = "cases";
    tableau.submit();
    });
    });})();