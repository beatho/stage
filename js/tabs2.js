window.tabs = {}
window.tabs.apply = function (){
    var elements = document.querySelectorAll(".tabs");
    elements.forEach(element => {
        //console.log(element)
        var init = false;
        var nb_asset = element.nb;
        var agent = element.agent;
        var div2 = document.getElementById("tab");
        if (div2 == null){
            var div2 = document.createElement("div");
            div2.id = "tab";
            init = true;
        } 
        for (var index = Number(data.oldNbAsset) ; index < Number(nb_asset); index++) {    
            //console.log(index)       
            var span = document.createElement("span");
            if(index == 0){
                span.className = "tab_1 tab";
            } else {
                span.className = "tab_0 tab";
            }
            
            span.id = "tab_asset_" + String(index+1);
            span.onclick = change_tab("asset_" + String(index+1));
            span.textContent = "Asset n°" + String(index+1);
            div2.appendChild(span);
            //<span class="tab_0 tab" id="tab_quoi" onclick="javascript:change_tab('quoi');">Quoi</span>
        }


        if (init){
            element.appendChild(div2);
        }
                
        var div3 = document.getElementById("content_tab");
        if (div3 == null){
            var div3 = document.createElement("div");
            div3.id = "content_tab";
        }
        for (var index = Number(data.oldNbAsset); index < Number(nb_asset); index++) {
            if (agent != undefined){
                var asset = data.asset[agent.asset[index]];
            }
            var values = (asset != undefined);


            var div4 = document.createElement("div");
            div4.className = "content_tab";
            div4.id = 'content_tab_asset_' + String(index+1);
            if(index == 0 ){
                div4.style = "display: block";
            }
            // choice if we use asset by default
            var div = document.createElement("div");
            var h4 = document.createElement("h4");
            h4.textContent = "Customized Asset ? ";
            div.appendChild(h4);
            div.className = "form";
            div.id = 'div'+ 'custom' + String(index);
            var selctElm5 = document.createElement("select");
            selctElm5.onchange = changeCustom(index);
            selctElm5.id = 'custom' + String(index);
            for (choice of choices.customAsset){
                var opt = document.createElement("option");
                opt.setAttribute("value", choice);
                opt.innerText = choice;
                selctElm5.appendChild(opt);
            }
            div.appendChild(selctElm5);
            div4.appendChild(div);


            
            //choice of the type of the Asset
            var div = document.createElement("div");
            var h4 = document.createElement("h4");
            h4.textContent = "Asset type : ";
            div.appendChild(h4);
            div.className = "form";
            
            div.id = 'div' + 'type' + String(index);
            var selctElm3 = document.createElement("select");
            selctElm3.id = 'type' + String(index);
            selctElm3.onchange = changeTypeAsset(index);
            for (choice of choices.typeAsset){
                var opt = document.createElement("option");
                opt.setAttribute("value", choice);
                opt.innerText = choice;
                selctElm3.appendChild(opt);
                if (values && choice == asset.type){
                    opt.selected = true;
                }
            }
            div.appendChild(selctElm3);
            div4.appendChild(div);
        
            // choice of the name of the Asset
            var div = document.createElement("div");
            var h4 = document.createElement("h4");
            h4.textContent = "Asset name : ";
            div.appendChild(h4);
            div.className = "form";
            
            div.id = 'div' + 'name'+ String(index);
            var textElm = document.createElement("input");
            textElm.id = 'name'+ String(index);
            textElm.type = "text";
            if (values){
                textElm.value = asset.name;
            } else {
                textElm.value = 'Asset ' + String(data.asset.length + index);
            }
            
            div.appendChild(textElm);
            div4.appendChild(div);

            // type of the cost function 
            var div = document.createElement("div");
            var h4 = document.createElement("h4");
            h4.textContent = "cost function type : ";
            div.appendChild(h4);
            div.className = "form";
            
            div.id = 'div' + 'functionType' + String(index);
            var selctElm4 = document.createElement("select");
            selctElm4.id = 'functionType' + String(index);
            for (choice of choices.functionType){
                var opt = document.createElement("option");
                opt.setAttribute("value", choice);
                opt.innerText = choice;
                selctElm4.appendChild(opt);
                if (values && choice == asset.functionType){
                    opt.selected = true;
                }
            }
            div.appendChild(selctElm4);
            div4.appendChild(div);
            
            // features of the cost function
            var div = document.createElement("div");
            var h4 = document.createElement("h4");
            h4.textContent = "Features of the cost fonction (see help) ";
            div.appendChild(h4);
            div.className = "form";
            
            div.id = 'div' + 'functionCharac' + String(index);
            var numberElm1 = document.createElement("input");
            numberElm1.type = "texte";
            numberElm1.id = 'functionCharac' + String(index);
            if (values){
                var feature = asset.functionCharac;
                var feat_chain = '';
                for (feat of feature){
                    feat_chain = feat_chain + String(feat) + ' ; ';
                }
                numberElm1.value = feat_chain;
            } else {
                numberElm1.value = "1.0 ; 1.0 ; 0.0";
            }
            
            div.appendChild(numberElm1);
            div4.appendChild(div);

            // Add multiple time step

            var div = document.createElement("div");
            var h4 = document.createElement("h4");
            h4.textContent = "Do you want to include Multiple step for the power ? ";
            div.appendChild(h4);
            div.className = "form";
            div.id = 'div' + 'MultipleStep' + String(index);
            var buttonelm = document.createElement("input");
            buttonelm.type = "file";
            buttonelm.id = "button_step" + String(index);
            buttonelm.onchange = clicChoiceStep(index);
            div.appendChild(buttonelm);
            div4.appendChild(div);


            if((!values) || ( asset.type == choices.typeAsset[0])) {
        
                // Power maximal and minimal
                var div = document.createElement("div");
                var h4 = document.createElement("h4");
                h4.textContent = "Upper bound (kW) : ";
                div.appendChild(h4);
                div.className = "form"
                div.id = 'div' + 'Pmaxcap' + String(index);
                var numberElm2 = document.createElement("input");
                numberElm2.type = "number";
                numberElm2.step = "any";
                numberElm2.id = 'Pmaxcap' + String(index);
                if (values){
                    numberElm2.value =asset.Pmaxcap;
                } else {
                    numberElm2.value = 0;
                }
                
                div.appendChild(numberElm2);
                div4.appendChild(div);
                var div = document.createElement("div");
                var h4 = document.createElement("h4");
                h4.textContent = "Lower bound (kW) : ";
                div.appendChild(h4);
                div.className = "form"
                
                div.id = 'div' + 'Pmincap' + String(index);
                var numberElm3 = document.createElement("input");
                numberElm3.type = "number";
                numberElm3.step = "any";
                numberElm3.id = 'Pmincap' + String(index);
                if (values){
                    numberElm3.value =asset.Pmincap;
                } else {
                    numberElm3.value = 0;
                }
                div.appendChild(numberElm3);
                div4.appendChild(div);

                
            } else if (asset.type == choices.typeAsset[1]) {
                var div = document.createElement("div");
                var h4 = document.createElement("h4");
                h4.textContent = "Power (kW) : ";
                div.appendChild(h4);
                div.className = "form"
                div.id = 'div' + 'Pcap' + String(index);
                var numberElm2 = document.createElement("input");
                numberElm2.type = "number";
                numberElm2.step = "any";
                numberElm2.id = 'Pcap' + String(index);
                if (values){
                    numberElm2.value = asset.Pmaxcap;
                } else {
                    numberElm2.value = 0;
                }
                div.appendChild(numberElm2);
                div4.appendChild(div);
            } 
            if (values && asset.type == choices.typeAsset[2]){
                var div = document.createElement("div");
                var h4 = document.createElement("h4");
                h4.textContent = "Uncertainty Type function : ";
                div.appendChild(h4);
                div.className = "form"
                
                div.id = 'div' + 'uncertaintyType' + String(index);
                var selctElm6 = document.createElement("select");
                selctElm6.id = 'uncertaintyType' + String(index);
                for (choice of choices.uncernityType){
                    var opt = document.createElement("option");
                    opt.setAttribute("value", choice);
                    opt.innerText = choice;
                    selctElm6.appendChild(opt);
                    if (values && choice == asset.uncertaintyType){
                        opt.selected = true;
                    }
                }
                div.appendChild(selctElm6);
                div4.appendChild(div);

                var div = document.createElement("div");
                var h4 = document.createElement("h4");
                h4.textContent = "Features of the uncertainty fonction (see help) ";
                div.appendChild(h4);
                div.className = "form"
                
                div.id = 'div' + 'uncertainCharac' + String(index);
                var numberElm1 = document.createElement("input");
                numberElm1.id = 'uncertainCharac' + String(index);
                numberElm1.type = "texte";
                if (values){
                    var feature = asset.functionCharac;
                    var feat_chain = '';
                    for (feat of feature){
                        feat_chain = feat_chain + String(feat) + ' ; ';
                    }
                    numberElm1.value = feat_chain;
                } else {
                    numberElm1.value = "1.0 ; 1.0 ";
                }
                
                div.appendChild(numberElm1);
                div4.appendChild(div);
                }
            div3.appendChild(div4);  
        }
        
        if (init){
            
            element.appendChild(div3);
            init = false;
        }
        
        
    });
}

/*if(element.init != true){
    element.init = true;*/

function changeCustom(index)  {
    return function() {
        var select = document.getElementById("custom" + String(index));
        var value = select.options[select.selectedIndex].value;
        for (example of choices.assetExample){
            if(example.id == value){
                for (key of Object.keys(example)){
                    var form = document.getElementById(key + String(index));
                    if (form != null){
                        if (key == "type" || key =="functionType" || key =="uncertaintyType" ){
                            for(opt of Object.keys(form.options)){
                                if (form.options[opt].value == example[key]){
                                    form.options[opt].selected = true;
                                }else {
                                    form.options[opt].selected =false;
                                }
                            }
                            if(typeof(form.onchange) === "function"){
                                form.onchange(index);
                            }
                        } else {
                            form.value = example[key];
                        }
                    }
                }
            }
        }

    }
}


function changeTypeAsset(index) {
    return function() {
        var tab = document.getElementById('content_tab_asset_' + String(index+1));
        var select = document.getElementById( 'type' + String(index));
        var value = select.options[select.selectedIndex].value;
        var div1 = document.getElementById('div' + 'Pmaxcap'+ String(index));
        var div2 = document.getElementById('div' + 'Pmincap'+ String(index));
        var div3 = document.getElementById('div' + 'Pcap'+ String(index));
        var div4 = document.getElementById('div' + 'uncertaintyType'+ String(index));
        var div5 = document.getElementById('div' + 'uncertainCharac'+ String(index));
        var div6 = document.getElementById('div' + 'MultipleStep' + String(index));
        var input = document.getElementById('functionCharac' + String(index));

        if (value == choices.typeAsset[0]){
            if(div3 != null){
                tab.removeChild(div3);
            } 
            if(div4 != null){
                tab.removeChild(div4);
                tab.removeChild(div5);
            }
            if (div6 == null){
                var div = document.createElement("div");
                var h4 = document.createElement("h4");
                h4.textContent = "Do you want to include Multiple step for the power ? ";
                div.appendChild(h4);
                div.className = "form"
                div.id = 'div' + 'MultipleStep' + String(index);
                var buttonelm = document.createElement("input");
                buttonelm.type = "file";
                buttonelm.id = "button_step" + String(index);
                buttonelm.onchange = clicChoiceStep(index);
                div.appendChild(buttonelm);
                tab.appendChild(div);
            }
            if (div1 == null){
                input.value = "1.0 ; 1.0 ; 0.0";

                var div = document.createElement("div");
                var h4 = document.createElement("h4");
                h4.textContent = "Upper bound (kW) : ";
                div.appendChild(h4);
                div.className = "form"
                
                div.id = 'div' + 'Pmaxcap' + String(index);
                var numberElm2 = document.createElement("input");
                numberElm2.type = "number";
                numberElm2.step = "any";
                numberElm2.id = 'Pmaxcap' + String(index);
                numberElm2.value = 0;
                
                
                div.appendChild(numberElm2);
                tab.appendChild(div); // à changer pour insérer au bon endroit ?

                var div = document.createElement("div");
                var h4 = document.createElement("h4");
                h4.textContent = "Lower bound (kW) : ";
                div.appendChild(h4);
                div.className = "form"
                
                div.id = 'div' + 'Pmincap' + String(index);
                var numberElm3 = document.createElement("input");
                numberElm3.type = "number";
                numberElm3.step = "any";
                numberElm3.id = 'Pmincap' + String(index);
                numberElm3.value = 0;
                
                div.appendChild(numberElm3);
                tab.appendChild(div); // à changer pour insérer au bon endroit ?
            }

        } else if (value == choices.typeAsset[1]){
            if(div4 != null){
                tab.removeChild(div4);
                tab.removeChild(div5);
            } 
            if(div1 != null){
                tab.removeChild(div1);
                tab.removeChild(div2);
            } 
            if (div6 == null){
                input.value = "0.0 ; 0.0 ; 0.0"


                var div = document.createElement("div");
                var h4 = document.createElement("h4");
                h4.textContent = "Do you want to include Multiple step for the power ? ";
                div.appendChild(h4);
                div.className = "form"
            
                div.id = 'div' + 'MultipleStep' + String(index);
                var buttonelm = document.createElement("input");
                buttonelm.type = "file";
                buttonelm.id = "button_step" + String(index);
                buttonelm.onchange = clicChoiceStep(index);
                div.appendChild(buttonelm);
                tab.appendChild(div);
            }
            if(div3 == null){
                var div = document.createElement("div");
                var h4 = document.createElement("h4");
                h4.textContent = "Power (kW) : ";
                div.appendChild(h4);
                div.className = "form"
                
                div.id = 'div' + 'Pcap' + String(index);
                var numberElm2 = document.createElement("input");
                numberElm2.type = "number";
                numberElm2.step = "any";
                numberElm2.id = 'Pcap' + String(index);
                numberElm2.value = 0;
            
                div.appendChild(numberElm2);
                tab.appendChild(div);
            }

        } else if (value == choices.typeAsset[2]) {
            if(div1 != null){
                tab.removeChild(div1);
                tab.removeChild(div2);
            } 
            if(div3 != null){
                tab.removeChild(div3);
            } 
            if (div6 != null){
                tab.removeChild(div6)
            }
            if(div4 == null) {
                input.value = "1.0 ; 1.0 ; 0.0"
                var div = document.createElement("div");
                var h4 = document.createElement("h4");
                h4.textContent = "Uncertainty Type function : ";
                div.appendChild(h4);
                div.className = "form"
                
               
                div.id = 'div' + 'uncertaintyType' + String(index);
                var selctElm6 = document.createElement("select");
                selctElm6.id = 'uncertaintyType' + String(index);
                for (choice of choices.uncernityType){
                    var opt = document.createElement("option");
                    opt.setAttribute("value", choice);
                    opt.innerText = choice;
                    selctElm6.appendChild(opt);
                }
                div.appendChild(selctElm6);
                tab.appendChild(div);

                var div = document.createElement("div");
                var h4 = document.createElement("h4");
                h4.textContent = "Features of the uncertainty fonction (see help) ";
                div.appendChild(h4);
                div.className = "form"
               
                div.id = 'div' + 'uncertainCharac' + String(index);
                var numberElm1 = document.createElement("input");
                numberElm1.id = 'uncertainCharac' + String(index);
                numberElm1.type = "texte";
                numberElm1.value = "1.0 ; 1.0 ";
                
                
                div.appendChild(numberElm1);
                tab.appendChild(div);
            }
        }

    }
}

function clicChoiceStep(index) {
    return function() {
        input = document.getElementById("button_step"+ String(index)) 
        console.log(input)
        Papa.parse(input.files[0], {
            complete: function(results) {
                console.log(results);
                processing_data(results,index);
    
            }
        });
	};
    
}
function processing_data(results,index){
    var result = results.data;
    data.multipleStep_1[index] = result[1]; // Pmaxt or Pt
    data.multipleStep_2[index] = result[2]; // Pmint
    
}