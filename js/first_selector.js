



window.addEventListener("load",function()
{   
    

    var wrap = document.getElementById("first_selection");
    wrap.textContent = "Actions : ";
    wrap.appendChild(document.createElement("br"));
    
    var selector = document.createElement("select");

    
        
    var opt = document.createElement("option");
    opt.setAttribute("value", '');
    opt.innerText = 'Select...';
    selector.appendChild(opt);

    for (var option of options)
            {
                option = option.id;
                var opt = document.createElement("option");
                opt.setAttribute("value", option);
                opt.innerText = option;
                selector.appendChild(opt);
            }
    wrap.appendChild(selector);
    counter = 0;
    selector.onchange = function(choice) {
        this.options[0].disabled = true;
        //console.log(choice.target.value)
        for (var option of options)
            {
            
            if (option.id === choice.target.value )
            {
                var selector2 = document.createElement("select");
                selector2.onchange = changeSelect2;
                var buttonelm = document.createElement("input");
                var opt = document.createElement("option");
                opt.setAttribute("value", '');
                opt.innerText = 'Select...';
                selector2.appendChild(opt);
                for (var dat of option.data) {

                    var opt = document.createElement("option");
                    opt.setAttribute("value", dat);
                    opt.innerText = dat;
                    selector2.appendChild(opt); 
                }
                if (counter == 0) {
                    //console.log("ok");
                    
                    buttonelm.type = "button";
                    buttonelm.value = "Select";
                    buttonelm.id = "button_select";
                    buttonelm.onclick = clicSelectChoice;
                    
                    
                    wrap.appendChild(selector2);
                    wrap.appendChild(buttonelm);
                    counter = 1;
                    //button = document.getElementById("button_select");  
                    //buttonelm.addEventListener("onclick", clic());
                    //buttonelm.setAttribute("onclick", clic());
                    
                   
                } else 
                {
                    var test = document.getElementsByTagName("select")[1];
                    //console.log(test);
                    wrap.replaceChild(selector2,test);
                } 
            }
            }
            var select = document.getElementById("name_node");
            var input = document.getElementById("nb_agent");
            //console.log(input);
            if (input !== null){
                wrap.removeChild(input)
            } else if (select !==null) {
                wrap.removeChild(select)
            }
            
            //wrap.removeChild(selects[2]);
        } 


});

function changeSelect2() {
    var wrap = document.getElementById("first_selection");
    var selects = document.getElementsByTagName("select");
    var button = document.getElementById("button_select");
    var selector3 = document.createElement("select");
    selector3.id = "name_node";
    var value1 = selects[0].value;
    var value2 = selects[1].value;
    
    // remove the element that we don't need on the page
    var select = document.getElementById("name_node");
    var input = document.getElementById("nb_agent");
    if (input !== null){
        wrap.removeChild(input)
    } else if (select !==null) {
        wrap.removeChild(select)
    }



    if (value1 ===options[0].id && value2===options[0].data[1]) {
        var inputElm = document.createElement("input");
        inputElm.type = "number";
        inputElm.step = 1;
        inputElm.id = "nb_agent";
        inputElm.min = 1;
        inputElm.value = 3;
        inputElm.required = "required";
        //console.log(inputElm);
        //console.log(button);
        wrap.insertBefore(inputElm,button);
        //selects[1].insertAdjacentHTML("afterend",inputElm);
    } else if (value1 ===options[1].id && value2===options[1].data[1]) {
        var opt = document.createElement("option");
        opt.setAttribute("value", '');
        opt.innerText = 'Select...';
        selector3.appendChild(opt);
        for (agent of data.node) {
            var opt = document.createElement("option");
            opt.setAttribute("value", agent.id);
            opt.innerText = agent.name;
            selector3.appendChild(opt);
        }
        
        wrap.insertBefore(selector3,button);
    }
    

}

function clicSelectChoice() {
    var selects = document.getElementsByTagName("select");
    var value1 = selects[0].options[selects[0].selectedIndex].value;
    var value2 = selects[1].options[selects[1].selectedIndex].value;
    console.log(value1,value2);
    switch(value1) {
        case options[0].id: // case Add
            switch(value2) {
                case options[0].data[0]:
                    addAgent();
                break
                case options[0].data[1]:
                    var input = document.getElementById("nb_agent");
                    var value3 = input.value;
                    addCom(value3);
                break
                case options[0].data[2]:
                    addLink();
                break
                case options[0].data[3]:
                    addExample();
                break
                case options[0].data[4]:
                    addFile();
                break
            }
            break
        case options[1].id: //case Modify
            switch(value2) {
                case options[1].data[0]:
                    modLink();
                break
                case options[1].data[1]:
                    var value3 = selects[2].options[selects[2].selectedIndex].value;
                    modAgCom(value3);
                break
            }
        break
        case options[2].id: //case Delete
            switch(value2) {
                case options[2].data[0]:
                    delAgCom();
                break
                case options[2].data[1]:
                    delLink();
                break
            }
        break
        case options[3].id: // case Save
                switch(value2) {
                    case options[3].data[0]:
                        save();
                    break
                    case options[3].data[1]:
                        saveAs();
                    break
                }
        break
        case options[4].id: // case Open
                switch(value2) {
                    case options[4].data[0]:
                        opNew();
                    break
                    case options[4].data[1]:
                        opExample();
                    break
                    case options[4].data[2]:
                        opFile();
                    break
                }
        break
    }
}  
function addAgent() {
    var content = document.getElementById("content");
    content.innerHTML ="";
    // choice of the type of the node
    var div = document.createElement("div");
    div.textContent = "Agent type : ";
    var selctElm1 = document.createElement("select");
    var opt = document.createElement("option");
    opt.setAttribute("value", undefined);
    opt.innerText = 'Select...';
    selctElm1.appendChild(opt);
    for (choice of choices.typeNode){
        var opt = document.createElement("option");
        opt.setAttribute("value", choice);
        opt.innerText = choice;
        selctElm1.appendChild(opt);
    }
    div.appendChild(selctElm1);
    content.appendChild(div);
   
    // choice of the name
    var div = document.createElement("div");
    div.textContent = "Agent name : ";
    var textElm = document.createElement("input");
    textElm.id = "node_name";
    textElm.type = "text";
    //textElm.required = "required";
    textElm.onchange = checkname;
    div.appendChild(textElm);
    content.appendChild(div);
    selctElm1.onchange = function(choice) {
        var content = document.getElementById("content");
        var textElm = document.getElementById("node_name");
        textElm.value = choice.target.value +' ' + String(data.node.length);
        this.options[0].disabled = true;

        

        if (choice.target.value == choices.typeNode[1]) {
            // change the legend if the form exists
            var commuElmt = document.getElementById("Community_membership")
            if (commuElmt != null){
                commuElmt.textContent = "Community membership"
            }
                        
            
            // remove forms that we don't need
            var input = document.getElementById("Number_asset");
            var tab = document.getElementById("onglets")
            var tab2 = document.getElementById("contenu_onglet")
            if(input != null){
                content.removeChild(input)
            }
            if(tab != null) {
                content.removeChild(tab);
                content.removeChild(tab2);
            }
            // choice of the Community objective:
            var div = document.createElement("div");
            div.textContent = "Community objective : ";
            div.id = "community_objective"
            var selctElm1 = document.createElement("select");
            for (choice of choices.comObjective){
                var opt = document.createElement("option");
                opt.setAttribute("value", choice);
                opt.innerText = choice;
                selctElm1.appendChild(opt);
            }
            div.appendChild(selctElm1);
            var buttonelm = document.getElementById("button_add_node");
            content.insertBefore(div,buttonelm);

        } else if (choice.target.value == choices.typeNode[0]){
            var commuElmt = document.getElementById("Community_membership")
            if (commuElmt != null){
                commuElmt.textContent = "Community members"
            }

            var input = document.getElementById("community_objective");
                if(input != null) {
                    content.removeChild(input);
                }
            var div = document.createElement("div");
            div.textContent = "Number of assets : ";
            div.id = "Number_asset";
            var numberElm = document.createElement("input");
            numberElm.type = "number";
            numberElm.step = 1;
            numberElm.min = 1;
            numberElm.value = 1;
            div.appendChild(numberElm);
            var buttonelm = document.getElementById("button_add_node");
            content.insertBefore(div,buttonelm);

            // creation of the default tab
            var div2 = document.createElement("div");
            div2.className = "onglets";
            div2.id = "onglets";
            var span = document.createElement("span");
            span.className = "onglet_1 onglet";
            span.id = "onglet_asset_" + String(1);
            span.onclick = change_onglet("asset_" + String(1));
            span.textContent = "Asset n°" + String(1);
            div2.appendChild(span);
            content.insertBefore(div2,buttonelm);
            
            // creation of the content of the default tab
            var div3 = document.createElement("div");
            div3.className = "contenu_onglets";
            div3.id = "contenu_onglets";
            var div4 = document.createElement("div");
            div4.className = "contenu_onglet";
            div4.id = 'contenu_onglet_asset_' + String(1);
            div4.style = "display: block";
            
            //choice of the type of the Asset
            var div = document.createElement("div");
            div.textContent = "Asset type : ";
            var selctElm3 = document.createElement("select");
            for (choice of choices.typeAsset){
                var opt = document.createElement("option");
                opt.setAttribute("value", choice);
                opt.innerText = choice;
                selctElm3.appendChild(opt);
            }
            div.appendChild(selctElm3);
            div4.appendChild(div);
        
            // choice of the name of the Asset
            var div = document.createElement("div");
            div.textContent = "Asset name : ";
            var textElm = document.createElement("input");
            textElm.id = "asset_name";
            textElm.type = "text";
            textElm.value = 'Asset ' + String(data.asset.length);
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
            }
            div.appendChild(selctElm4);
            div4.appendChild(div);
            
            // features of the cost function
            var div = document.createElement("div");
            div.textContent = "Feature of the cost fonction (see help) ";
            div.id = "Feature";
            var numberElm1 = document.createElement("input");
            numberElm1.type = "texte";
            numberElm1.value = "1.0 ; 1.0 ; 1.0";
            div.appendChild(numberElm1);
            div4.appendChild(div);

            // Power maximal and minimal
            var div = document.createElement("div");
            div.textContent = "Upper bound (kW) : ";
            div.id = "Power_max";
            var numberElm2 = document.createElement("input");
            numberElm2.type = "number";
            numberElm2.step = "any";
            numberElm2.value = 0;
            div.appendChild(numberElm2);
            div4.appendChild(div);

            var div = document.createElement("div");
            div.textContent = "Lower bound (kW) :";
            div.id = "Number_asset";
            var numberElm3 = document.createElement("input");
            numberElm3.type = "number";
            numberElm3.step = "any";
            numberElm3.value = 0;
            div.appendChild(numberElm3);
            div4.appendChild(div);

            div3.appendChild(div4)
            content.insertBefore(div3,buttonelm);
                

            numberElm.onchange = function(choice) {
                console.log(data.oldNbAsset)
                
                var nb_asset = choice.target.value;
                var wrap_tab = document.getElementById("onglets");
                var wrap_tabcontent = document.getElementById("contenu_onglets")
                if (nb_asset < data.oldNbAsset) {
                    for (var indice= Number(nb_asset)+1; indice < Number(data.oldNbAsset)+1; indice++) {
                        var tabs = document.getElementById('onglet_asset_' + String(indice));
                        var tabs2 = document.getElementById('contenu_onglet_asset_' + String(indice));
                        if(tabs != null){
                            wrap_tab.removeChild(tabs);
                            wrap_tabcontent.removeChild(tabs2);
                        }
                    }
                } else if (nb_asset > data.oldNbAsset) {
                    var div2 = document.getElementById("onglets"); 
                    for (var indice = Number(data.oldNbAsset) ; indice < Number(nb_asset); indice++) {
                                    
                        var span = document.createElement("span");
                        span.className = "onglet_0 onglet";
                        span.id = "onglet_asset_" + String(indice+1);
                        span.onclick = change_onglet("asset_" + String(indice+1));
                        span.textContent = "Asset n°" + String(indice+1);
                        div2.appendChild(span);
                        //<span class="onglet_0 onglet" id="onglet_quoi" onclick="javascript:change_onglet('quoi');">Quoi</span>
                    }
                    var div3 = document.getElementById("contenu_onglets");
                    for (var indice = Number(data.oldNbAsset); indice < Number(nb_asset); indice++) {
                        var div4 = document.createElement("div");
                        div4.className = "contenu_onglet";
                        div4.id = 'contenu_onglet_asset_' + String(indice+1);
                        
                        //choice of the type of the Asset
                        var div = document.createElement("div");
                        div.textContent = "Asset type : ";
                        var selctElm3 = document.createElement("select");
                        for (choice of choices.typeAsset){
                            var opt = document.createElement("option");
                            opt.setAttribute("value", choice);
                            opt.innerText = choice;
                            selctElm3.appendChild(opt);
                        }
                        div.appendChild(selctElm3);
                        div4.appendChild(div);
                    
                        // choice of the name of the Asset
                        var div = document.createElement("div");
                        div.textContent = "Asset name : ";
                        var textElm = document.createElement("input");
                        textElm.id = "asset_name";
                        textElm.type = "text";
                        textElm.value = 'Asset ' + String(data.asset.length + indice);
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
                        }
                        div.appendChild(selctElm4);
                        div4.appendChild(div);
                        
                        // features of the cost function
                        var div = document.createElement("div");
                        div.textContent = "Features of the cost fonction (see help) ";
                        div.id = "Features";
                        var numberElm1 = document.createElement("input");
                        numberElm1.type = "texte";
                        numberElm1.value = "1.0 ; 1.0 ; 1.0";
                        div.appendChild(numberElm1);
                        div4.appendChild(div);

                        // Power maximal and minimal
                        var div = document.createElement("div");
                        div.textContent = "Upper bound (kW) : ";
                        div.id = "Power_max";
                        var numberElm2 = document.createElement("input");
                        numberElm2.type = "number";
                        numberElm2.step = "any";
                        numberElm2.value = 0;
                        div.appendChild(numberElm2);
                        div4.appendChild(div);

                        var div = document.createElement("div");
                        div.textContent = "Lower bound (kW) :";
                        div.id = "Number_asset";
                        var numberElm3 = document.createElement("input");
                        numberElm3.type = "number";
                        numberElm3.step = "any";
                        numberElm3.value = 0;
                        div.appendChild(numberElm3);
                        div4.appendChild(div);

                        div3.appendChild(div4);
                    }
                }
                data.oldNbAsset = nb_asset;        
            }
        }
    }
    
    // choice of trading partners
    var div = document.createElement("div");
    div.textContent = "Trading partners : ";
    var selctElm2 = document.createElement("select");
    selctElm2.id = 'trading';
    selctElm2.multiple = "multiple";
    selctElm2.size = 2;
    var opt = document.createElement("option");
    opt.setAttribute("value", undefined);
    opt.innerText = 'None';
    selctElm2.appendChild(opt);
    for (node of data.node) {
        var opt = document.createElement("option");
        opt.setAttribute("value", node.id);
        opt.innerText = node.name;
        selctElm2.appendChild(opt);
    }
    div.appendChild(selctElm2);
    content.appendChild(div);
    new SlimSelect({
        select: '#trading'
    })

    selctElm2.onchange = function(choice) {
        var buttonelm = document.getElementById("button_add_node")
        var asset = document.getElementById("Number_asset")
        // choice of community membership
        var div = document.getElementById("Community_membership");
        
        var div2 = document.createElement("div");
        var selctElm3 = document.createElement("select");
        selctElm3.multiple = "multiple";
        selctElm3.size = 2;
        selctElm3.id = 'community'
        var opt = document.createElement("option");
        opt.setAttribute("value", undefined);
        opt.innerText = 'None';
        selctElm3.appendChild(opt);
        var trading = [];
        
    
        for (var j=0; j < this.options.length; j++) {
            if (this.options[j].selected) 
            {
                trading.push(Number(this.options[j].value));
            }
        }   
        for(admin of data.node) {
            if((admin.type === choices.typeNode[1]) && (trading.indexOf(admin.id))== -1)
            {
                var opt = document.createElement("option");
                opt.setAttribute("value", admin.id);
                opt.innerText = admin.name;
                selctElm3.appendChild(opt); 
            } 
        }
        
        if (div != null) {
            console.log("ok2")
            div2.textContent = div.innerHTML.split("<")[0] ;
            content.replaceChild(div2,div);
        } else {
            if (selctElm1.options[selctElm1.selectedIndex].value == choices.typeNode[0]){
                console.log("ok");
                div2.textContent = "Community membership  :"; 
                content.insertBefore(div2,asset);

            } else if (selctElm1.options[selctElm1.selectedIndex].value == choices.typeNode[1]) {
                div2.textContent = "Community members :" ;  
                content.insertBefore(div2,buttonelm);
            }   
        }
        div2.appendChild(selctElm3);
        new SlimSelect({
            select: '#community'
        })
        div2.id = "Community_membership";
   
    }

    /*  save of new data */
    var div = document.createElement("div");
    div.id = "button_add_node";
    var buttonelm = document.createElement("input");

    buttonelm.type = "button";
    buttonelm.value = "Add node";
    buttonelm.onclick = clicAddNode;
    div.appendChild(buttonelm);
    content.appendChild(div);   
}

function clicAddNode() {    
    console.log('Saving...')
    var content = document.getElementById("content");
    var selects = content.getElementsByTagName("select");
    var inputs = content.getElementsByTagName("input");
    
    
    // Create the node
    var type_node = selects[0].options[selects[0].selectedIndex].value;
    
    var trading_partners = [];
    for (var i=0; i < selects[1].options.length; i++) 
    {
        if (selects[1].options[i].selected) 
        {
            trading_partners.push(selects[1].options[i].value);
        }
    }
    if (trading_partners[0] == 'undefined'){
        trading_partners = [];
    } else 
    {
        for (var i=0; i< trading_partners.length; i++) {
            trading_partners[i] = Number(trading_partners[i])
        }
    }
    
    
    var community = [];
    
    for (var j=0; j < selects[2].options.length; j++) {
        if (selects[2].options[j].selected) 
        {
            community.push(selects[2].options[j].value);
        }
    }   
    
    if (community[0] == 'undefined'){
        community = [];
    } else 
    {
        for (var i=0; i< community.length; i++) {
            community[i] = Number(community[i])
        }
    }

    
    var name = inputs[0].value;
    if ( data.idLinkUnused.length >0 ) {
        var id_node = data.idNodeUnused.shift();                
    } else {
         var id_node = data.node.length;
    }
    if (type_node == choices.typeNode[1]){
        var objective = selects[3].options[selects[3].selectedIndex].value;
        var agent_temp = new Node(id_node,type_node,name,trading_partners,[],[],[], objective, community );
    } else if (type_node == choices.typeNode[0]){
        var agent_temp = new Node(id_node,type_node,name,trading_partners,community,[],[] );
    }
    

    
    
    console.log(community);
    console.log(data.node);
    if (type_node === choices.typeNode[0]) {
        data.nodeAgentName.push(name);
    } else if ( type_node === choices.typeNode[1] ) {
        data.nodeAdministratorName.push(name);
    }
    
    
    // create the links 
    for (id of trading_partners) {
        if ( data.idLinkUnused.length >0 ) {
            var id_link = data.idLinkUnused.shift();                
    }   else {
         var id_link = data.link.length;
    }
        var link_temp = new Link(id_link,choices.typeLink[0],id_node,id,0,0,'');
        data.link.push(link_temp);
    }
    for (id of community) {
        if ( data.idLinkUnused.length >0 ) {
            var id_link = data.idLinkUnused.shift();                
        } else {
             var id_link = data.link.length;
        }
        // the source is always the community manager
        if(type_node == choices.typeNode[0]) {
            var link_temp = new Link(id_link,choices.typeLink[0],id,id_node,0,0,'');
        } else if (type_node == choices.typeNode[1]) {
            var link_temp = new Link(id_link,choices.typeLink[0],id_node,id,0,0,'');
        }
        
        data.link.push(link_temp);
    }


    // Create the assets
    var nb_asset = inputs[3].value;
    for (var indice=0; indice<nb_asset; indice++){
        if ( data.idAssetUnused.length >0 ) {
            var id_asset = data.idAssetUnused.shift();                
        } else {
         var id_asset = data.asset.length;
        }
        agent_temp.asset.push(id_asset);

        var asset_type = selects[3+2*indice].options[selects[3+2*indice].selectedIndex].value;
        var function_type = selects[4+2*indice].options[selects[4+2*indice].selectedIndex].value;

        var asset_name = inputs[4 + 4* indice].value;
        var Pmax = inputs[6 + 4* indice].value;
        var Pmin = inputs[7 + 4* indice].value;
        
        var chain_features =inputs[5+4*indice].value;
        var feat =[];
        var feat_temps ='';
        k = 0;
        for (chiffre of chain_features) {
            if (k < choices.nbFeature[function_type]) {
                if (chiffre !== ';') {
                    feat_temps = feat_temps + chiffre;
                } else {
                    number = Number(feat_temps);
                    if (number != number) {
                        console.log("Warning it was not the good syntax")
                        asset_name = asset_name + 'syntax error'
                    }
                    feat.push(number);
                    feat_temps = '';
                    k = k+1;
                }
            }
        }
        if (k < choices.nbFeature[function_type]){
            number = Number(feat_temps);
            if (number != number) {
            console.log("Warning it was not the good syntax")
            }
            feat.push(number);
        }
        
        

        var asset_temp = new Asset(id_asset,asset_name,asset_type, function_type, feat, Pmin, Pmax, [], [], [], [], [])
        data.asset.push(asset_temp);
    }
    data.node[id_node] = agent_temp;





}

function checkname(choice) {
    //var text = document.getElementById("node_name");
    var node_name = choice.target.value;
    for (name of data.nodeAgentName ) {
        if (name === node_name){
            console.log("Beware name already used");
            break;
        }
    }
    for (name of data.nodeAdministratorName) {
        if (name === node_name){
            console.log("Beware name already used");
            break;
        }
    }
    
    
   
}

// beware you need the push the button select to update the names when you add several communities
function addCom(nb_agent) {
    //console.log('ok pour ' + String(nb_agent) + ' Agent');
    var content = document.getElementById("content");
    content.innerHTML ="";
       
    // choice of the name of the community
    var div = document.createElement("div");
    div.textContent = "Community name : ";
    var textElm = document.createElement("input");
    textElm.id = "community_name";
    textElm.type = "text";
    textElm.value = choices.typeNode[1]+ ' ' + String(data.node.length)
    textElm.onchange = checkname;
    div.appendChild(textElm);
    content.appendChild(div);
    
    // choice of the Community objective:
    var div = document.createElement("div");
    div.textContent = "Community objective : ";
    var selctElm1 = document.createElement("select");
    for (choice of choices.comObjective){
        var opt = document.createElement("option");
        opt.setAttribute("value", choice);
        opt.innerText = choice;
        selctElm1.appendChild(opt);
    }
    div.appendChild(selctElm1);
    content.appendChild(div);
    
    //choice of trading partners
    var div = document.createElement("div");
    div.textContent = "Trading partners : ";
    var selctElm2 = document.createElement("select");
    selctElm2.multiple = "multiple"
    selctElm2.id = "trading"
    var opt = document.createElement("option");
    opt.setAttribute("value", undefined);
    opt.innerText = 'None';
    selctElm2.appendChild(opt);
    for (node of data.node) {
        var opt = document.createElement("option");
        opt.setAttribute("value", node.id);
        opt.innerText = node.name;
        selctElm2.appendChild(opt);
    }
    div.appendChild(selctElm2);
    content.appendChild(div);
    new SlimSelect({
        select: '#trading'
    })
    
    // choice of the names of the agent
    var div = document.createElement("div");
    div.textContent = "Community member names : ";
    var textElm = document.createElement("input");
    textElm.id = "community_member_name";
    textElm.type = "text";
    var Chain_name =choices.typeNode[0]+ ' ' + String(data.node.length +1);;
    for(var i = 1; i < nb_agent; i++ ) {
        Chain_name = Chain_name + ',' + choices.typeNode[0]+ ' ' + String(data.node.length + 1 + i);
    }
    textElm.value = Chain_name;
    div.appendChild(textElm);
    content.appendChild(div);
    
    // save of new data
    var div = document.createElement("div");
    var buttonelm = document.createElement("input");

    buttonelm.type = "button";
    buttonelm.value = "Add community";
    buttonelm.id = "button_add_comm";
    buttonelm.onclick = clicAddComm(nb_agent);
    div.appendChild(buttonelm);
    content.appendChild(div);
}
function clicAddComm(nb_agent) {
    return function() {
        console.log("Saving...");
        var content = document.getElementById("content");
        var selects = content.getElementsByTagName("select");
        var text1 = document.getElementById("community_name");
        var text2 = document.getElementById("community_member_name");
        var community_objective = selects[0].options[selects[0].selectedIndex].value ; 
        var trading_partners = [];
        
        for (var i=0; i < selects[1].options.length; i++) 
        {
            if (selects[1].options[i].selected) 
            {
                trading_partners.push(selects[1].options[i].value);
            }
        }
        if (trading_partners[0] == "undefined"){
            trading_partners = [];
        } else 
        {
            for (var i=0; i< trading_partners.length; i++) {
                trading_partners[i] = Number(trading_partners[i])
            }
        }


        var name_admin = text1.value;

        var chain_name =text2.value;
        var names =[];
        var name_temp ='';
        k = 0;
        for (lettre of chain_name) {
            if (k < nb_agent) {
                if (lettre !== ',') {
                    name_temp = name_temp + lettre;
                } else {
                    names.push(name_temp);
                    name_temp = '';
                    k = k+1;
                }
            }
        }
        names.push(name_temp);
        
        var id_partner = [];
        if(trading_partners.length >0) {
            for (partner of trading_partners)
            {
                id_partner.push(partner.id);
            }
        }
       
        var id_community_merber = [];
        for(var i = 0; i < nb_agent; i++ ) {
            id_community_merber.push(data.node.length+1+i)
        }
        id_admin = data.node.length;
        var admin = new Node(id_admin,choices.typeNode[1], name_admin, id_partner, [], [], [],community_objective, id_community_merber);
        data.nodeAdministratorName.push(name_admin);
        data.node.push(admin);

        for(var i = 0; i < nb_agent; i++ ) {
            var name = names[i];
            var agent_temp = new Node(data.node.length,choices.typeNode[0],name,[],[id_admin],[],[]);
            data.node.push(agent_temp);
            
            data.nodeAgentName.push(name);
        }
     
        
        // create the links 
        for (id of id_partner) {
            if ( data.idLinkUnused.length >0 ) {
                var id_link = data.idLinkUnused.shift();                
            } else {
                 var id_link = data.link.length;
            }
            var name = 'Link ' + String(data.link.length);
            var link_temp = new Link(id_link,choices.typeLink[0],id_admin,id,name,0,0);
            data.link.push(link_temp);
        }
        for (id of id_community_merber) {
            if ( data.idLinkUnused.length >0 ) {
                var id_link = data.idLinkUnused.shift();                
            } else {
                 var id_link = data.link.length;
            }
            var name = 'Link ' + String(data.link.length);
            var link_temp = new Link(id_link,choices.typeLink[1],id_admin,id,name,0,0);
            data.link.push(link_temp);
        }
    } 
} 
  
function addLink() {
    var content = document.getElementById("content");
    content.innerHTML ="";

    // choice of the type of the link
    var div = document.createElement("div");
    div.textContent = "Link type : ";
    var selctElm1 = document.createElement("select");
    var opt = document.createElement("option");
    opt.setAttribute("value", '');
    opt.innerText = 'Select...';
    selctElm1.appendChild(opt);
    for (choice of choices.typeLink){
        var opt = document.createElement("option");
        opt.setAttribute("value", choice);
        opt.innerText = choice;
        selctElm1.appendChild(opt);
    }
    div.appendChild(selctElm1);
    content.appendChild(div);
   
    // choice of the name
    var div = document.createElement("div");
    div.textContent = "Link name : ";
    var textElm = document.createElement("input");
    textElm.id = "link_name";
    textElm.type = "text";
    textElm.value = 'Link ' + String(data.link.length);
    div.appendChild(textElm);
    content.appendChild(div);
    
    selctElm1.onchange = function(choice) {
        this.options[0].disabled = true; // remove the choice select
        // remove the elements that we don't need on the page
        var wrapper = document.getElementById("wrap");
        if (wrapper !== null){
            content.removeChild(wrapper)
        } 
        var wrap = document.createElement("div");
        wrap.id = "wrap"

        if (choice.target.value === choices.typeLink[0]) {
            // choice of the source
            var div = document.createElement("div");
            div.textContent = "Source : ";
            var selctElm2 = document.createElement("select");
            var opt = document.createElement("option");
            opt.setAttribute("value", '');
            opt.innerText = 'Select...';
            selctElm2.appendChild(opt);
            for (node of data.node) {
                var opt = document.createElement("option");
                opt.setAttribute("value", node.id);
                opt.innerText = node.name;
                selctElm2.appendChild(opt);
            }
            
            div.appendChild(selctElm2);
            wrap.appendChild(div);
            
            
            selctElm2.onchange = function(choice) {
                this.options[0].disabled = true; // remove the choice select
                // remove the elements that we don't need on the page
                var div2er = document.getElementById("div2");
                if (div2er !== null){
                    wrap.removeChild(div2er);
                } 
                var div2 = document.createElement("div");
                div2.id = "div2";


                // choice of the destination
                var div = document.createElement("div");
                div.textContent = "destination : ";
                var selctElm3 = document.createElement("select");
                var source = data.node[choice.target.value];
                var opt = document.createElement("option");
                opt.setAttribute("value", '');
                opt.innerText = 'Select...';
                selctElm3.appendChild(opt);
                //console.log(source.partners);
                //console.log(source.administrator);
                for (agent of data.node) {
                    // show only node who don't have a link with the source
                    if ( source.id != agent.id){
                        
                        if ( source.type === choices.typeNode[0] && source.partners.indexOf(agent.id) == -1 && source.administrator.indexOf(agent.id) == -1){
                            
                            //console.log(agent.id)
                            var opt = document.createElement("option");
                            opt.setAttribute("value", agent.id);
                            opt.innerText = agent.name;
                            selctElm3.appendChild(opt);

                        } else if ( source.type === choices.typeNode[1] && source.partners.indexOf(agent.id) == -1 && source.administrator.indexOf(agent.id) == -1 && source.communityMember.indexOf(agent.id) == -1 ) {
                            var opt = document.createElement("option");
                            opt.setAttribute("value", agent.id);
                            opt.innerText = agent.name;
                            selctElm3.appendChild(opt);
                        }          
                    }  
                }
                div.appendChild(selctElm3);
                div2.appendChild(div);
                wrap.appendChild(div2);

                selctElm3.onchange = function(choice2) {
                    this.options[0].disabled = true; // remove the choice select
                    var input1 = document.getElementById("preferenceSource");
                    var input2 = document.getElementById("preferenceDestination");
                    var input3 = document.getElementById("button_add_link")

                    if (input1 !== null){
                        div2.removeChild(input1)
                        div2.removeChild(input2)
                        div2.removeChild(input3)
                    } 
                    var div = document.createElement("div")
                    div.textContent = "Preference of the source : ";
                    div.id = "preferenceSource"
                    var inputElm = document.createElement("input");
                    inputElm.type = "number";
                    inputElm.step = "any";
                    inputElm.value = 0;
                    inputElm.id = "inputPreferenceSource";
                    inputElm.min = 0;
                    inputElm.placeholder = 0.0;

                    div.appendChild(inputElm);
                    div2.appendChild(div);


                    var div = document.createElement("div")
                    div.textContent = "Preference of the destination : ";
                    div.id = "preferenceDestination"
                    var inputElm = document.createElement("input");
                    inputElm.type = "number";
                    inputElm.step = "any";
                    inputElm.id = "inputPreferenceDestination";
                    inputElm.min = 0;
                    inputElm.value = 0;
                    inputElm.placeholder = 0.0;
                    div.appendChild(inputElm);
                    div2.appendChild(div);

                    // button to save the choice
                    var div = document.createElement("div");
                    div.id = "button_add_link";
                    var buttonelm = document.createElement("input");

                    buttonelm.type = "button";
                    buttonelm.value = "Add link";
                    buttonelm.onclick = clicAddLink;
                    div.appendChild(buttonelm);
                    div2.appendChild(div);
                    wrap.appendChild(div2);
                }
            }
            content.appendChild(wrap);
            

        } else if (choice.target.value === choices.typeLink[1]){
            // choice of the community new member
            var div = document.createElement("div");
            div.textContent = "Agent/Manager : ";
            var selctElm2 = document.createElement("select");
            var opt = document.createElement("option");
            opt.setAttribute("value", '');
            opt.innerText = 'Select...';
            selctElm2.appendChild(opt);
            for (node of data.node) {
                var opt = document.createElement("option");
                opt.setAttribute("value", node.id);
                opt.innerText = node.name;
                selctElm2.appendChild(opt);
            }
            
            div.appendChild(selctElm2);
            wrap.appendChild(div);
            
            
            selctElm2.onchange = function(choice) {
                this.options[0].disabled = true; // remove the choice select
                // remove the elements that we don't need on the page
                var div2er = document.getElementById("div2");
                if (div2er !== null){
                    wrap.removeChild(div2er);
                } 
                var div2 = document.createElement("div");
                div2.id = "div2";


                // choice of the community manager
                var div = document.createElement("div");
                div.textContent = "Community manager : ";
                var selctElm3 = document.createElement("select");
                var source = data.node[choice.target.value];
                var opt = document.createElement("option");
                opt.setAttribute("value", '');
                opt.innerText = 'Select...';
                selctElm3.appendChild(opt);
                for (agent of data.node) {
                    // show only node which don't have a link with the source
                    if ( source.id != agent.id && agent.type === choices.typeNode[1] ){
                        if ( source.type === choices.typeNode[0] && source.partners.indexOf(agent.id) === -1 && source.administrator.indexOf(agent.id) === -1){
                            var opt = document.createElement("option");
                            opt.setAttribute("value", agent.id);
                            opt.innerText = agent.name;
                            selctElm3.appendChild(opt);

                        } else if ( source.type === choices.typeNode[1] && source.partners.indexOf(agent.id) === -1 && source.administrator.indexOf(agent.id) === -1 && source.communityMember.indexOf(agent.id) === -1 ) {
                            var opt = document.createElement("option");
                            opt.setAttribute("value", agent.id);
                            opt.innerText = agent.name;
                            selctElm3.appendChild(opt);
                        }          
                    }  
                }
                div.appendChild(selctElm3);
                div2.appendChild(div);

                selctElm3.onchange = function(choice2) {
                    this.options[0].disabled = true; // remove the choice select
                    var input1 = document.getElementById("preferenceSource");
                    var input2 = document.getElementById("preferenceDestination");
                    var input3 = document.getElementById("button_add_link")

                    if (input1 !== null){
                        div2.removeChild(input1)
                        div2.removeChild(input2)
                        div2.removeChild(input3)
                    } 
                    var div = document.createElement("div")
                    div.textContent = "Preference of the community manager : ";
                    div.id = "preferenceSource"
                    var inputElm = document.createElement("input");
                    inputElm.type = "number";
                    inputElm.step = "any";
                    inputElm.value = 0;
                    inputElm.id = "inputPreferenceSource";
                    inputElm.min = 0;
                    inputElm.placeholder = 0.0;

                    div.appendChild(inputElm);
                    div2.appendChild(div);


                    var div = document.createElement("div")
                    div.textContent = "Preference of the agent : ";
                    div.id = "preferenceDestination"
                    var inputElm = document.createElement("input");
                    inputElm.type = "number";
                    inputElm.step = "any";
                    inputElm.id = "inputPreferenceDestination";
                    inputElm.min = 0;
                    inputElm.value = 0;
                    inputElm.placeholder = 0.0;
                    div.appendChild(inputElm);
                    div2.appendChild(div);

                    // button to save the choice
                    var div = document.createElement("div");
                    div.id = "button_add_link";
                    var buttonelm = document.createElement("input");

                    buttonelm.type = "button";
                    buttonelm.value = "Add link";
                    buttonelm.onclick = clicAddLink;
                    div.appendChild(buttonelm);
                    div2.appendChild(div);
                }
                wrap.appendChild(div2);
                
            }
            content.appendChild(wrap);
        }
    }
}
function clicAddLink() {
    console.log("saving...")
    var content = document.getElementById("content");
    var selects = content.getElementsByTagName("select");
    var text = document.getElementById("link_name");
    var input1 = document.getElementById("inputPreferenceSource");
    var input2 = document.getElementById("inputPreferenceDestination");

    var type_link = selects[0].options[selects[0].selectedIndex].value; ;
    var first_node = selects[1].options[selects[1].selectedIndex].value;;
    var second_node = selects[2].options[selects[2].selectedIndex].value;;
    var name = text.value;

    if ( data.idLinkUnused.length >0 ) {
        var id_link = data.idLinkUnused.shift();                
    } else {
         var id_link = data.link.length;
    }
    if (type_link == choices.typeLink[0]) {
        var weightSrc = Number(input1.value);
        var weightDest = Number(input2.value);
        var source = Number(first_node);
        var destination = Number(second_node);
    } else if (type_link == choices.typeLink[1]) {
        var weightSrc = Number(input2.value);
        var weightDest = Number(input1.value);
        var source = Number(second_node);
        var destination = Number(first_node);
    }
    
    var link_temp = new Link(id_link,type_link,source,destination,name,weightSrc,weightDest);
    data.link.push(link_temp);
    console.log(data.link);
    if (type_link === choices.typeLink[0]) {
        data.node[source].partners.push(destination);
        data.node[destination].partners.push(source);

    } else if (type_link === choices.typeLink[1]) {
        data.node[destination].administrator.push(destination);
        data.node[source].communityMember.push(source)
    }

}

function addExample() {

}
function addFile() {

}
function modAgCom(nodeId) {
    var content = document.getElementById("content");
    var oldNode = data.node[nodeId];
    content.innerHTML ="";

    // choice of the type of the node
    var div = document.createElement("div");
    div.textContent = "Agent type : ";
    var selctElm1 = document.createElement("select");
    
    for (choice of choices.typeNode){
        var opt = document.createElement("option");
        opt.setAttribute("value", choice);
        opt.innerText = choice;
        selctElm1.appendChild(opt);    
        if(choice == oldNode.type) {
            opt.selected = "selected";
        }
        
    }
    div.appendChild(selctElm1);
    content.appendChild(div);
   
    // choice of the name
    var div = document.createElement("div");
    div.textContent = "Agent name : ";
    var textElm = document.createElement("input");
    textElm.id = "node_name";
    textElm.type = "text";
    textElm.value = oldNode.name;
    //textElm.required = "required";
    textElm.onchange = checkname;
    div.appendChild(textElm);
    content.appendChild(div);
    selctElm1.onchange = function(choice) {
        var content = document.getElementById("content");
        textElm.value = choice.target.value +' ' + String(oldNode.id);
        this.options[0].disabled = true;
        if (choice.target.value == choices.typeNode[1]) {
            // choice of the Community objective:
            var div = document.createElement("div");
            div.textContent = "Community objective : ";
            div.id = "community_objective"
            var selctElm1 = document.createElement("select");
            for (choice of choices.comObjective){
                var opt = document.createElement("option");
                opt.setAttribute("value", choice);
                opt.innerText = choice;
                selctElm1.appendChild(opt);
                if(choice == oldNode.objective){
                    opt.selected = "selected";
                }
            }
            div.appendChild(selctElm1);
            var buttonelm = document.getElementById("button_add_node");
            content.insertBefore(div,buttonelm);
        } else {
            var input = document.getElementById("community_objective");
                if(input != null){
                    content.removeChild(input)
                }
        }
    }
    
    // choice of trading partners
    var div = document.createElement("div");
    div.textContent = "Trading partners : ";
    var selctElm2 = document.createElement("select");
    selctElm2.id = 'trading';
    selctElm2.multiple = "multiple";
    selctElm2.size = 2;
    var opt = document.createElement("option");
    opt.setAttribute("value", undefined);
    opt.innerText = 'None';
    selctElm2.appendChild(opt);
    for (node of data.node) {
        var opt = document.createElement("option");
        opt.setAttribute("value", node.id);
        opt.innerText = node.name;
        selctElm2.appendChild(opt);
        if (oldNode.partners.indexOf(node.id) != -1) {
            opt.selected = "selected";
        }
    }
    div.appendChild(selctElm2);
    content.appendChild(div);
    new SlimSelect({
        select: '#trading'
    })

    // choice of community membership
    var div = document.createElement("div");
    div.textContent = "Community membership : ";
    div.id = "Community_membership_old";
    var selctElm3 = document.createElement("select");
    selctElm3.multiple = "multiple";
    selctElm3.size = 2;
    selctElm3.id = "community"
    var opt = document.createElement("option");
    opt.setAttribute("value", undefined);
    opt.innerText = 'None';
    selctElm3.appendChild(opt);
    for(admin of data.node) {
        if(admin.type == choices.typeNode[1]){
            var opt = document.createElement("option");
            opt.setAttribute("value", admin.id);
            opt.innerText = admin.name;
            selctElm3.appendChild(opt); 
            if(oldNode.administrator.indexOf(admin.id) != -1) {
                opt.selected = "selected";
            }
        }
        
    }
    div.appendChild(selctElm3);
    content.appendChild(div);
    new SlimSelect({
        select: '#community'
    })


    selctElm2.onchange = function(choice) {
        // choice of community membership
        var div = document.getElementById("Community_membership_old")
        var div2 = document.createElement("div");
        div2.textContent = "Community membership : ";
        var selctElm3 = document.createElement("select");
        selctElm3.multiple = "multiple";
        selctElm3.size = 2;
        selctElm3.id ="community";
        var opt = document.createElement("option");
        opt.setAttribute("value", '');
        opt.innerText = 'None';
        selctElm3.appendChild(opt);
        for(admin of data.node) {
            
            if((admin.type === choices.typeNode[1]) && (admin.id != choice.target.value)){
                var opt = document.createElement("option");
                opt.setAttribute("value", admin.id);
                opt.innerText = admin.name;
                selctElm3.appendChild(opt); 
                if(oldNode.administrator.indexOf(admin.id) != -1) {
                    opt.selected = "selected";
                }
            }
            
        }
        div2.appendChild(selctElm3);
        content.replaceChild(div2,div)
        div2.id = "Community_membership_old";
        new SlimSelect({
            select: '#community'
        })
        
    }
    // save of new data
    var div = document.createElement("div");
    div.id = "button_add_node";
    var buttonelm = document.createElement("input");

    buttonelm.type = "button";
    buttonelm.value = "Add node";
    buttonelm.onclick = clicModNode;
    div.appendChild(buttonelm);
    content.appendChild(div);   
    

    
    function clicModNode() {
        console.log('Saving...')
        var content = document.getElementById("content");
        var selects = content.getElementsByTagName("select");
        var text = document.getElementById("node_name");
        var type_node = selects[0].options[selects[0].selectedIndex].value;
        
        var trading_partners = [];
        for (var i=0; i < selects[1].options.length; i++) 
        {
            if (selects[1].options[i].selected) 
            {
                trading_partners.push(selects[1].options[i].value);
            }
        } 
        if (trading_partners[0] == 'undefined'){
            var trading_partners = [];
        }
        else 
        {
            for (var i=0; i< trading_partners.length; i++) {
                trading_partners[i] = Number(trading_partners[i])
            }
        }
        
        var administrators = [];
        for (var i=0; i < selects[2].options.length; i++) 
        {
            if (selects[2].options[i].selected) 
            {
                administrators.push(selects[2].options[i].value);
            }
        }  
        if (administrators[0] == 'undefined'){
            var administrators = [];
        }
        else 
        {
            for (var i=0; i< administrators.length; i++) {
                administrators[i] = Number(administrators[i])
            }
        }
        

        var name = text.value;
        var id_agent = oldNode.id;
        var agent_temp = new Node(id_agent,type_node,name,trading_partners,administrators,[],[] );
        data.node[id_agent] = agent_temp;
        console.log(data.node);
        if (type_node === choices.typeNode[0]) {
            data.nodeAgentName.push(name);
        } else if ( type_node === choices.typeNode[1] ) {
            data.nodeAdministratorName.push(name);
        }
        // remove the old links
        len = data.link.lenght;
        for(var indice =0; indice < len ; i++) {
            var link = data.link[indice];
            console.log(link.source);
            console.log(oldNode);
            if (link.source == oldNode.id || link.destination == oldNode.id)
            {
                delete data.link[indice];
                data.idLinkUnused.push(indice);
            }
        }
        // create the new links 
        for (id of trading_partners) {
            if ( data.idLinkUnused.length >0 ) {
                id_link = data.idLinkUnused.shift();                
            } else {
                 var id_link = data.link.length;
            }
           
            var link_temp = new Link(id_link,choices.typeLink[0],id_agent,id,0,0,'');
            data.link.push(link_temp);
        }
        for (id of administrators) {
            if ( data.idLinkUnused.length >0 ) {
                id_link = data.idLinkUnused.shift();                
            } else {
                 var id_link = data.link.length;
            }
            var link_temp = new Link(id_link,choices.typeLink[0],id_agent,id,0,0,'');
            data.link.push(link_temp);
        }
        //
    }
    

}
function modLink() {
    var content = document.getElementById("content");
    content.innerHTML ="";

    // choice of the type of the link
    var div = document.createElement("div");
    div.textContent = "Link type : ";
    var selctElm1 = document.createElement("select");
    var opt = document.createElement("option");
    opt.setAttribute("value", '');
    opt.innerText = 'Select...';
    selctElm1.appendChild(opt);
    for (choice of choices.typeLink){
        var opt = document.createElement("option");
        opt.setAttribute("value", choice);
        opt.innerText = choice;
        selctElm1.appendChild(opt);
    }
    div.appendChild(selctElm1);
    content.appendChild(div);
    
    selctElm1.onchange = function(choice) {
        this.options[0].disabled = true; // remove the choice select
        
        // remove the elements that we don't need on the page
        var wrapper = document.getElementById("wrap");
        if (wrapper !== null){
            content.removeChild(wrapper)
        } 
        var wrap = document.createElement("div");
        wrap.id = "wrap"

       
        // choice of the first componant
        var div = document.createElement("div");
        div.textContent = "Between : ";
        var selctElm2 = document.createElement("select");
        var opt = document.createElement("option");
        opt.setAttribute("value", '');
        opt.innerText = 'Select...';
        selctElm2.appendChild(opt);
        for (node of data.node) {
            var opt = document.createElement("option");
            opt.setAttribute("value", node.id);
            opt.innerText = node.name;
            selctElm2.appendChild(opt);
        }
        
        div.appendChild(selctElm2);
        wrap.appendChild(div);
        
        
        selctElm2.onchange = function(choice) {
            this.options[0].disabled = true; // remove the choice select
            // remove the elements that we don't need on the page
            var div2er = document.getElementById("div2");
            if (div2er !== null){
                wrap.removeChild(div2er);
            } 
            var div2 = document.createElement("div");
            div2.id = "div2";


            // choice of the second componant
            var div = document.createElement("div");
            div.textContent = "And : ";
            var selctElm3 = document.createElement("select");
            var firstnode = data.node[choice.target.value];
            var opt = document.createElement("option");
            opt.setAttribute("value", '');
            opt.innerText = 'Select...';
            selctElm3.appendChild(opt);
            
            for (link of data.link) {
                // show only node who have a link with the source
                if (link.type==selctElm1.options[selctElm1.selectedIndex].value) {
                    if (link.source == firstnode.id) {
                        var agent = data.node[link.destination]
                        var opt = document.createElement("option");
                        opt.setAttribute("value", link.id); // the value is the link id to find easier the link we change
                        opt.innerText = agent.name;
                        selctElm3.appendChild(opt); 
                    }
                    else if (link.destination == firstnode.id) {
                        var agent = data.node[link.source]
                        var opt = document.createElement("option");
                        opt.setAttribute("value", link.id);
                        opt.innerText = agent.name;
                        selctElm3.appendChild(opt); 
                    }
                }  
            }
            div.appendChild(selctElm3);
            div2.appendChild(div);
            wrap.appendChild(div2);

            selctElm3.onchange = function(choice2) {
                this.options[0].disabled = true; // remove the choice select
                var input1 = document.getElementById("preferenceFirstNode");
                var input2 = document.getElementById("preferenceSecondNode");
                var input3 = document.getElementById("button_add_link")

                if (input1 !== null){
                    div2.removeChild(input1)
                    div2.removeChild(input2)
                    div2.removeChild(input3)
                } 
                var div = document.createElement("div")
                div.textContent = "Preference of the first node : ";
                div.id = "preferenceFirstNode"
                var inputElm = document.createElement("input");
                inputElm.type = "number";
                inputElm.step = "any";
                inputElm.value = 0;
                inputElm.id = "inputPreferenceFirstNode";
                inputElm.min = 0;
                inputElm.placeholder = 0.0;

                div.appendChild(inputElm);
                div2.appendChild(div);


                var div = document.createElement("div")
                div.textContent = "Preference of the second node : ";
                div.id = "preferenceSecondNode"
                var inputElm = document.createElement("input");
                inputElm.type = "number";
                inputElm.step = "any";
                inputElm.id = "InputPreferenceSecondNode";
                inputElm.min = 0;
                inputElm.value = 0;
                inputElm.placeholder = 0.0;
                div.appendChild(inputElm);
                div2.appendChild(div);

                // button to save the choice
                var div = document.createElement("div");
                div.id = "button_mod_link";
                var buttonelm = document.createElement("input");

                buttonelm.type = "button";
                buttonelm.value = "Modify link";
                buttonelm.onclick = clicModLink;
                div.appendChild(buttonelm);
                div2.appendChild(div);
                wrap.appendChild(div2);
            }   
        }
        content.appendChild(wrap);
    }
}
function clicModLink() {
    console.log("saving...")
    var content = document.getElementById("content");
    var selects = content.getElementsByTagName("select");
    var input1 = document.getElementById("inputPreferenceFirstNode");
    var input2 = document.getElementById("InputPreferenceSecondNode");

    var first_node = selects[1].options[selects[1].selectedIndex].value; 
    var id_link = selects[2].options[selects[2].selectedIndex].value; 
    var link = data.link[id_link];

    if (first_node == link.source) {
        link.weightSrc = input1.value;
        link.weightDest = input2.value;
    } else if (first_node == link.destination ) {
        link.weightSrc = input2.value;
        link.weightDest = input1.value;
    }
    data.link[id_link] = link;
     
   
}

function delAgCom() {
// suprimer un agent ou juste certains de ses assets
// supprimer la commununity complète ou juste un community manager 
var content = document.getElementById("content");
content.innerHTML ="";


// choice of the node
var div = document.createElement("div");
div.textContent = "Which agent do you want to delete ? " 

var selctElm1 = document.createElement("select");
var opt = document.createElement("option");
opt.setAttribute("value", '');
opt.innerText = 'Select...';
selctElm1.appendChild(opt);
for (node of data.node) {
    var opt = document.createElement("option");
    opt.setAttribute("value", node.id);
    opt.innerText = node.name;
    selctElm1.appendChild(opt);
}
div.appendChild(selctElm1);
content.appendChild(div);

selctElm1.onchange = function(choice) {
    this.options[0].disabled = true; // remove the choice select
        
    // remove the elements that we don't need on the page
    var wrapper = document.getElementById("wrap");
    if (wrapper !== null){
        content.removeChild(wrapper)
    } 
    var wrap = document.createElement("div");
    wrap.id = "wrap"


    var agent = choice.target.value;
    if (agent.type == choices.typeNode[0]) {

        // choice of what we delete
        var div = document.createElement("div");
        div.textContent = "What do you want to delete?";
        var selctElm2 = document.createElement("select");
        var opt = document.createElement("option");
        opt.setAttribute("value", '');
        opt.innerText = 'Select...';
        selctElm2.appendChild(opt);
        for (choice of choices.deleteAgent){
            var opt = document.createElement("option");
            opt.setAttribute("value", choice);
            opt.innerText = choice;
            selctElm2.appendChild(opt);
        }
        div.appendChild(selctElm1);
        wrap.appendChild(div);
        selctElm2.onchange = function(choice) {
            // remove the elements that we don't need on the page
            var wrapper = document.getElementById("wrap2");
            if (wrapper !== null){
                wrap.removeChild(wrapper)
            } 
            var wrap2 = document.createElement("div");
            wrap2.id = "wrap2";
            if (choice.target.value == choices.deleteAgent[1]) {
                // choice of the assets
                var div = document.createElement("div");
                div.textContent = "Which assets do you want to delete?";
                var selctElm3 = document.createElement("select");
                selctElm3
                var opt = document.createElement("option");
                opt.setAttribute("value", '');
                opt.innerText = 'Select...';
                selctElm3.appendChild(opt);
                for (id_asset of agent.asset) {
                    var asset = data.asset[id_asset];
                    var opt = document.createElement("option");
                    opt.setAttribute("value", asset.id);
                    opt.innerText = asset.name;
                    selctElm3.appendChild(opt);
                }
                div.appendChild(selctElm3);
                wrap2.appendChild(div);
            }


        }
    } else if (agent.type == choices.typeNode[1] ){
        // choice of what we delete
        var div = document.createElement("div");
        div.textContent = "What do you want to delete?";
        var selctElm2 = document.createElement("select");
        var opt = document.createElement("option");
        opt.setAttribute("value", '');
        opt.innerText = 'Select...';
        selctElm2.appendChild(opt);
        for (choice of choices.deleteCom){
            var opt = document.createElement("option");
            opt.setAttribute("value", choice);
            opt.innerText = choice;
            selctElm2.appendChild(opt);
        }
        div.appendChild(selctElm2);
        wrap.appendChild(div);
    }


}

}
function clicModLink() {
    console.log("saving...")
    var content = document.getElementById("content");
    var selects = content.getElementsByTagName("select");
    var input1 = document.getElementById("inputPreferenceFirstNode");
    var input2 = document.getElementById("InputPreferenceSecondNode");

    var first_node = selects[1].options[selects[1].selectedIndex].value; 
    var id_link = selects[2].options[selects[2].selectedIndex].value; 
    var link = data.link[id_link];

    if (first_node == link.source) {
        link.weightSrc = input1.value;
        link.weightDest = input2.value;
    } else if (first_node == link.destination ) {
        link.weightSrc = input2.value;
        link.weightDest = input1.value;
    }
    data.link[id_link] = link;
     
   
}


function delLink() {
    var content = document.getElementById("content");
    content.innerHTML ="";

    // choice of the type of the link
    var div = document.createElement("div");
    div.textContent = "Link type : ";
    var selctElm1 = document.createElement("select");
    var opt = document.createElement("option");
    opt.setAttribute("value", '');
    opt.innerText = 'Select...';
    selctElm1.appendChild(opt);
    for (choice of choices.typeLink){
        var opt = document.createElement("option");
        opt.setAttribute("value", choice);
        opt.innerText = choice;
        selctElm1.appendChild(opt);
    }
    div.appendChild(selctElm1);
    content.appendChild(div);
    
    selctElm1.onchange = function(choice) {
        this.options[0].disabled = true; // remove the choice select
        
        // remove the elements that we don't need on the page
        var wrapper = document.getElementById("wrap");
        if (wrapper !== null){
            content.removeChild(wrapper)
        } 
        var wrap = document.createElement("div");
        wrap.id = "wrap"

       
        // choice of the first componant
        var div = document.createElement("div");
        div.textContent = "Between : ";
        var selctElm2 = document.createElement("select");
        var opt = document.createElement("option");
        opt.setAttribute("value", '');
        opt.innerText = 'Select...';
        selctElm2.appendChild(opt);
        for (node of data.node) {
            var opt = document.createElement("option");
            opt.setAttribute("value", node.id);
            opt.innerText = node.name;
            selctElm2.appendChild(opt);
        }
        
        div.appendChild(selctElm2);
        wrap.appendChild(div);
        
        
        selctElm2.onchange = function(choice) {
            this.options[0].disabled = true; // remove the choice select
            // remove the elements that we don't need on the page
            var div2er = document.getElementById("div2");
            if (div2er !== null){
                wrap.removeChild(div2er);
            } 
            var div2 = document.createElement("div");
            div2.id = "div2";


            // choice of the second componant
            var div = document.createElement("div");
            div.textContent = "And : ";
            var selctElm3 = document.createElement("select");
            var firstnode = data.node[choice.target.value];
            var opt = document.createElement("option");
            opt.setAttribute("value", '');
            opt.innerText = 'Select...';
            selctElm3.appendChild(opt);
            
            for (link of data.link) {
                // show only node who have a link with the source
                console.log(selctElm1.options[selctElm1.selectedIndex].value);
                if (link.type == selctElm1.options[selctElm1.selectedIndex].value) {
                    if (link.source == firstnode.id) {
                        var agent = data.node[link.destination]
                        var opt = document.createElement("option");
                        opt.setAttribute("value", link.id); // the value is the link id to find easier the link we change
                        opt.innerText = agent.name;
                        selctElm3.appendChild(opt); 
                    }
                    else if (link.destination == firstnode.id) {
                        var agent = data.node[link.source]
                        var opt = document.createElement("option");
                        opt.setAttribute("value", link.id);
                        opt.innerText = agent.name;
                        selctElm3.appendChild(opt); 
                    }
                }  
            }
            div.appendChild(selctElm3);
            div2.appendChild(div);
            wrap.appendChild(div2);

            // button to save the choice
            var div = document.createElement("div");
            div.id = "button_del_link";
            var buttonelm = document.createElement("input");

            buttonelm.type = "button";
            buttonelm.value = "Delete link";
            buttonelm.onclick = clicDelLink;
            div.appendChild(buttonelm);
            div2.appendChild(div);
            wrap.appendChild(div2);
        }   
        content.appendChild(wrap);    
    }
        
}
function clicDelLink() {
    console.log("deleting...")
    var content = document.getElementById("content");
    var selects = content.getElementsByTagName("select");
    var id_link = selects[2].options[selects[2].selectedIndex].value; 
    delete data.link[id_link];
    data.idLinkUnused.push(id_link);
}
function save() {

}
function saveAs() {

}

function opNew() {

}

function opExample() {

}

function opFile() {

}

function change_onglet(name) {
    return function() {
        document.getElementById('onglet_'+name).className = 'onglet_1 onglet';
        document.getElementById('contenu_onglet_'+name).style.display = 'block';
        var old = data.old_onglet;
        data.old_onglet = name;
        // si élément supprimé affiche erreur mais fonctionne !
        document.getElementById('onglet_' + old).className = 'onglet_0 onglet';
        document.getElementById('contenu_onglet_'+ old).style.display = 'none';
        
    }
            
}

