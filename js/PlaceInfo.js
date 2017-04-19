$(document).ready(function(){
    $.ajax({
        url: 'php/getPlan.php',
        dataType: 'json',
        loadFancy: function(){
            $("[data-fancybox]").fancybox({
                onInit: function( instance, slide ) {
                    $("[id^=fancybox-container-]").css("display", "none");
                }
            });
        },
        getTunel: function(numBlock, table){
            //Заполняем корридор

            var rowTunel = $("<div class='row'></div>");
            for (var j = 0; j < 2; j++) {
                var tr = $("<tr></tr>");
                tr.addClass("row");
                for (var k = 0; k < 5; k++) {
                    if(numBlock < 10){
                        var td = $("<td>0" + numBlock++ + "</td>");

                    }else{
                        var td = $("<td>" + numBlock++ + "</td>");    
                    }
                    td.css("text-align", "center");
                    if (j == 0) {
                        td.css("padding-bottom", "20px");
                    }else{
                        td.css("padding-top", "20px");
                    }
                    tr.append(td);
                }
                table.append(tr); 
            }
            rowTunel.append(table);
            return rowTunel;

        },
        createTab: function(i){
            var liObj = $("<li></li>");

            if (i == 0) {
                liObj.addClass("active");
            }
            var aObj = $("<a href='#" + (i + 1) + "-flour' data-toggle='tab'></a>");
            aObj.html(i+1);

            liObj.append(aObj);
            return liObj;
        },
        createKmesto: function(data){
            var place = $("<a href='javascript:;'>" + this.numPlaces + "</a>");
            place.addClass("btn");
            var isBusy = 0;
            var placeIndex = 0;
            place.attr('id', this.numPlacesObj + 1);
            place.attr('data-fancybox', '');
            place.attr('data-src', "#page-wrapper-" + (this.numPlacesObj + 1));


            var pageWrapper = $("<div></div>");
            pageWrapper.attr('id', "page-wrapper-" + (this.numPlacesObj + 1));
            pageWrapper.css('display', 'none');
            var containerFluid = $("<div></div>");
            containerFluid.attr('class', 'container-fluid');
            var containerRow = $("<div></div>");
            //containerRow.attr('class', 'row');
            var containerForm = $("<form></form>");
            containerForm.attr('id', 'UpdateForm');
            containerForm.attr("action", "php/updateInfo.php");
            containerForm.attr("method", "POST");

            for(var w = 0; w < data.length; w++){
                if((this.numPlacesObj + 1) == data[w].id_k_mesto){
                    isBusy = 1;
                    placeIndex = w;
                    break;
                }
            }
            if (isBusy == 1) {
                place.attr("data-src", "PersonInfoFormWithRemove.html?id=" + data[placeIndex].id + "&placeId=" + data[placeIndex].id_k_mesto);
                place.addClass("btn-danger");
                place.attr("data-test", isBusy);
            }else{
                place.attr("data-test", isBusy);
                place.addClass("btn-default");
                var alertMessage = $("<div></div>");
                alertMessage.addClass("alert");
                alertMessage.addClass("alert-warning");
                alertMessage.html("Здесь никто не проживает");
                containerForm.append(alertMessage);

                var message = $("<a></a>");
                message.attr("data-fancybox", "");
                message.attr("data-src", "modalWindow.html?id=" + (this.numPlacesObj + 1));
                message.addClass("btn");
                message.addClass("btn-block");
                message.addClass("btn-success");
                message.html("Заселить");

                containerForm.append(message);
            }
            
            containerRow.append(containerForm);
            containerFluid.append(containerRow);
            pageWrapper.append(containerFluid);
            var array = new Array();
            array.push(place);
            array.push(pageWrapper);
            return array;
        },
        createPlace: function(data, isFlatB, q){
            var Flat = $("<div></div>");
            if (isFlatB == 1) {
                Flat.addClass("col-lg-9");
                Flat.addClass("flat-b");
                for (var i = 0; i < 3; i++) {
                    var PlaceContainer = $("<div class='col-lg-4'></div>");
                    if (i == 0) {
                        Flat.append(PlaceContainer);
                    }else{
                        var array = this.createKmesto(data);
                        PlaceContainer.append(array[0]);
                        PlaceContainer.append(array[1]);
                        Flat.append(PlaceContainer);
                        this.numPlaces += 2;
                        this.numPlacesObj += 2;
                        if (q == 0) {
                            this.numPlacesObjEven += 2;
                        }else{
                            this.numPlacesObjOdd += 2;
                        }  
                    }

                }
            }else{
                Flat.addClass("col-lg-3");
                Flat.addClass("flat-a");
                var array = this.createKmesto(data);
                Flat.append(array[0]);
                Flat.append(array[1]);
            }
            return Flat;
        },
        numPlacesObjEven: 0,
        numPlacesObjOdd: 1,
        numPlacesObj: 0,
        numPlaces: 0,
        success: function(data){
            var NumObj = data[data.length-1];
            var numBlock = 1;
            var numBlockId = 0;
            var numBusyPlace = 0;
            var total = $("<ul class='nav nav-tabs'></ul>");
            //Создаём табы
            for (var i = 0; i < NumObj.NumFlours ; i++) {

                var liObj = this.createTab(i);
                total.append(liObj);
            }
            $("#tab-container").append(total);
            var tabContent = $("<div class='tab-content clearfix'></div>");
            //Создаём панели
            for (var i = 0; i < NumObj.NumFlours; i++) {
                
                var tabPane = $("<div id='" + (i + 1) + "-flour' class='tab-pane'></div>");
                if (i == 0) {
                    tabPane.addClass("active");
                }
                var panelBody = $("<div class='panel-body'></div>");
                var flotChart = $("<div class='flot-chart'></div>");
                var container = $("<div class='col-lg-12'></div>");
                
                var table = $("<table class='table'></table>");

                var rows = Array();
                
                var evenPlaces = 1;
                var oddPlaces = 2;
                this.numPlaces = 0;
                //Заполняем 2 ряда блоков
                for (var e = 0; e < 2; e++) {
                    var row = $("<div></div>");
                    var BlockRowContainer = $("<table class='table'></table>");
                    var BlockRow = $("<tr></tr>");
                    row.addClass("row");
                    //Создаём блоки
                    for (var j = 0; j < 5; j++) {
                        var Block = $("<td class='cell'></td>");
                        numBlockId++;
                        for (var q = 0; q < 3; q++) {
                            var NestRow = $("<div class='row'></div>");
                            if(q == 1){
                                var paragr = $("<p></p>");
                                NestRow.append(paragr);
                            }else{
                                if (q == 0 ) {
                                    this.numPlaces = evenPlaces;
                                    this.numPlacesObj = this.numPlacesObjEven;
                                }else{
                                    this.numPlaces = oddPlaces;
                                    this.numPlacesObj = this.numPlacesObjOdd;
                                }
                                var FlatA = this.createPlace(data, 0, q);
                                this.numPlaces += 2;
                                this.numPlacesObj += 2;
                                numBusyPlace++;
                                if (q == 0) {
                                    this.numPlacesObjEven += 2;
                                }else{
                                    this.numPlacesObjOdd += 2;
                                }
                                var FlatB = this.createPlace(data, 1, q);
                                NestRow.append(FlatA);
                                NestRow.append(FlatB);
                            }
                            Block.append(NestRow);
                        }
                        BlockRow.append(Block);
                        BlockRowContainer.append(BlockRow);
                    }
                    row.append(BlockRowContainer);
                    rows.push(row);
                }

                var rowTunel = this.getTunel(numBlock, table);
                container.append(rows[0]);
                container.append(rowTunel);
                container.append(rows[1]);
                flotChart.append(container);
                panelBody.append(flotChart);
                tabPane.append(panelBody);
                tabContent.append(tabPane);
            }
            $("#tab-container").append(tabContent);
            $( ".datepicker" ).datepicker({
              minDate: new Date(),
              dateFormat: "yy-mm-dd"
            });
            this.loadFancy();                
        },
        error: function (jqXHR, exception) {
                var msg = '';
                if (jqXHR.status === 0) {
                    msg = 'Not connect.\n Verify Network.';
                } else if (jqXHR.status == 404) {
                    msg = 'Requested page not found. [404]';
                } else if (jqXHR.status == 500) {
                    msg = 'Internal Server Error [500].';
                } else if (exception === 'parsererror') {
                    msg = 'Requested JSON parse failed.';
                } else if (exception === 'timeout') {
                    msg = 'Time out error.';
                } else if (exception === 'abort') {
                    msg = 'Ajax request aborted.';
                } else {
                    msg = 'Uncaught Error.\n' + jqXHR.responseText;
                }
                alert(msg);
            }
    });
});