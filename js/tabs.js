window.tabs = {}
window.tabs.apply = function (){
    var elements = document.querySelectorAll(".tabs");
    elements.forEach(element => {
        //console.log(element)
        
        var nb_asset = element.nb;
        var agent = element.agent;
        var div2 = document.getElementById("onglets");
        if (div2 == null){
            var div2 = document.createElement("div");
            div2.id = "onglets";
            var init = true;
        } 
        for (var indice = Number(data.oldNbAsset) ; indice < Number(nb_asset); indice++) {           
            var span = document.createElement("span");
            if(indice == 0){
                span.className = "onglet_1 onglet";
            } else {
                span.className = "onglet_0 onglet";
            }
            
            span.id = "onglet_asset_" + String(indice+1);
            span.onclick = change_onglet("asset_" + String(indice+1));
            span.textContent = "Asset n°" + String(indice+1);
            div2.appendChild(span);
            //<span class="onglet_0 onglet" id="onglet_quoi" onclick="javascript:change_onglet('quoi');">Quoi</span>
        }


        if (init){
            element.appendChild(div2);
        }
                
        var div3 = document.getElementById("contenu_onglets");
        if (div3 == null){
            var div3 = document.createElement("div");
            div3.id = "contenu_onglets";
        }
        for (var indice = Number(data.oldNbAsset); indice < Number(nb_asset); indice++) {
            if (agent != undefined){
                var asset = data.asset[agent.asset[indice]];
            }
            var values = (asset != undefined);


            var div4 = document.createElement("div");
            div4.className = "contenu_onglet";
            div4.id = 'contenu_onglet_asset_' + String(indice+1);
            if(indice == 0 ){
                div4.style = "display: block";
            }
            

            
            //choice of the type of the Asset
            var div = document.createElement("div");
            div.textContent = "Asset type : ";
            var selctElm3 = document.createElement("select");
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
            div.textContent = "Asset name : ";
            var textElm = document.createElement("input");
            textElm.id = "asset_name";
            textElm.type = "text";
            if (values){
                textElm.value =asset.name;
            } else {
                textElm.value = 'Asset ' + String(data.asset.length + indice);
            }
            
            div.appendChild(textElm);
            div4.appendChild(div);

            // type of the cost function 
            var div = document.createElement("div");
            div.textContent = "cost function type : ";
            var selctElm4 = document.createElement("select");
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
            div.textContent = "Features of the cost fonction (see help) ";
            div.id = "Features";
            var numberElm1 = document.createElement("input");
            numberElm1.type = "texte";
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

            // Power maximal and minimal
            var div = document.createElement("div");
            div.textContent = "Upper bound (kW) : ";
            div.id = "Power_max";
            var numberElm2 = document.createElement("input");
            numberElm2.type = "number";
            numberElm2.step = "any";
            if (values){
                numberElm2.value =asset.Pmaxcap;
            } else {
                numberElm2.value = 0;
            }
            
            div.appendChild(numberElm2);
            div4.appendChild(div);

            var div = document.createElement("div");
            div.textContent = "Lower bound (kW) : ";
            div.id = "Number_asset";
            var numberElm3 = document.createElement("input");
            numberElm3.type = "number";
            numberElm3.step = "any";
            if (values){
                numberElm3.value =asset.Pmincap;
            } else {
                numberElm3.value = 0;
            }
            div.appendChild(numberElm3);
            div4.appendChild(div);

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




