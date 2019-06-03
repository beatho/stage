 
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
            
            // remove forms that we don't need
            var input = document.getElementById("Number_asset");
            var tab = document.getElementById("onglets")
            var tab2 = document.getElementById("contenu_onglets")
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
            
            data.oldNbAsset = 1;

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
                div2.textContent = "Community membership  :"; 
                content.insertBefore(div2,asset);

            } else if (selctElm1.options[selctElm1.selectedIndex].value == choices.typeNode[1]) {
                div2.textContent = "Community membership  :"; 
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
        var Pmax = Number(inputs[6 + 4* indice].value);
        var Pmin = Number(inputs[7 + 4* indice].value);
        
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
        var textElm = document.getElementById("node_name");
        textElm.value = choice.target.value +' ' + String(oldNode.id);
           

        if (choice.target.value == choices.typeNode[1]) {
            // change the legend if the form exists
            var commuElmt = document.getElementById("Community_membership")
            if (commuElmt != null){
                commuElmt.textContent = "Community membership"
            }
                        
            // remove forms that we don't need
            var input = document.getElementById("Number_asset");
            
            if(input != null){
                content.removeChild(input)
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
                if(choice == oldNode.objective){
                    opt.selected = "selected";
                }
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
            numberElm.value = oldNode.asset.lenght;
            div.appendChild(numberElm);
            var buttonelm = document.getElementById("button_add_node");
            content.insertBefore(div,buttonelm);
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
        if (node != undefined){
            if(node.id =! nodeId){
                var opt = document.createElement("option");
                opt.setAttribute("value", node.id);
                opt.innerText = node.name;
                selctElm2.appendChild(opt);
                if (oldNode.partners.indexOf(node.id) != -1) {
                    opt.selected = "selected";
                }
            }
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

    if(oldNode == choices.typeNode[1]){
        var div = document.createElement("div");
        div.textContent = "Community objective : ";
        div.id = "community_objective"
        var selctElm4 = document.createElement("select");
        for (choice of choices.comObjective){
            var opt = document.createElement("option");
            opt.setAttribute("value", choice);
            opt.innerText = choice;
            selctElm4.appendChild(opt);
            if(choice == oldNode.objective){
                opt.selected = "selected";
            }
        }
        div.appendChild(selctElm4);
        content.appendChild(div);


        var div = document.createElement("div");
        div.textContent = "Community members : ";
        div.id = "Community_members";
        var selctElm3 = document.createElement("select");
        selctElm3.multiple = "multiple";
        selctElm3.size = 2;
        selctElm3.id = "community2"
        var opt = document.createElement("option");
        opt.setAttribute("value", undefined);
        opt.innerText = 'None';
        selctElm3.appendChild(opt);
        for(node of data.node) {
        
            var opt = document.createElement("option");
            opt.setAttribute("value", admin.id);
            opt.innerText = admin.name;
            selctElm3.appendChild(opt); 
            if(oldNode.administrator.indexOf(admin.id) != -1) {
                opt.selected = "selected";
            }
            
            
        } 
        div.appendChild(selctElm3);
        content.appendChild(div);
        new SlimSelect({
            select: '#community2'
        })
    }

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
 
}

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

function addAsset(){
    var content = document.getElementById("content");
    content.innerHTML ="";

    // choice of the node
    var div = document.createElement("div");
    div.textContent = "Agent : ";
    var selctElm1 = document.createElement("select");
    var opt = document.createElement("option");
    opt.setAttribute("value", undefined);
    opt.innerText = 'Select...';
    selctElm1.appendChild(opt);
    for (agent of data.node){
        if (agent.type == choices.typeNode[0]) {
            var opt = document.createElement("option");
            opt.setAttribute("value", agent.id);
            opt.innerText = agent.name;
            selctElm1.appendChild(opt);  
        }
    }
    div.appendChild(selctElm1);
    content.appendChild(div);

    var div = document.createElement("div");
    div.textContent = "Number of added assets : ";
    div.id = "Number_asset";
    var numberElm = document.createElement("input");
    numberElm.type = "number";
    numberElm.step = 1;
    numberElm.min = 1;
    numberElm.value = 1;
    div.appendChild(numberElm);
    content.appendChild(div);

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
    content.appendChild(div2);
    
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
    content.appendChild(div3);
        
    data.oldNbAsset = 1;

    numberElm.onchange = function(choice) {
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

    selctElm1.onchange = function() {
        this.options[0].disabled = true;
    }
    /*  save of new data */
    var div = document.createElement("div");
    div.id = "button_add_node";
    var buttonelm = document.createElement("input");

    buttonelm.type = "button";
    buttonelm.value = "Add Asset";
    buttonelm.onclick = clicAddAsset;
    div.appendChild(buttonelm);
    content.appendChild(div);   
}

function clicAddAsset(){
    console.log('Saving...')
    var content = document.getElementById("content");
    var selects = content.getElementsByTagName("select");
    var inputs = content.getElementsByTagName("input");
    
    var id_agent = selects[0].options[selects[0].selectedIndex].value;

    var nb_asset = inputs[0].value;
    for (var indice=0; indice<nb_asset; indice++){
        if ( data.idAssetUnused.length >0 ) {
            var id_asset = data.idAssetUnused.shift();                
        } else {
         var id_asset = data.asset.length;
        }
        data.node[id_agent].asset.push(id_asset);

        var asset_type = selects[1+2*indice].options[selects[1+2*indice].selectedIndex].value;
        var function_type = selects[2+2*indice].options[selects[2+2*indice].selectedIndex].value;

        var asset_name = inputs[1 + 4*indice].value;
        var Pmax = Number(inputs[3 + 4* indice].value);
        var Pmin = Number(inputs[4 + 4* indice].value);
        
        var chain_features =inputs[2 + 4*indice].value;
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
                        console.log("Warning it was not the good syntax, feature set to 0")
                        asset_name = asset_name + 'syntax error'
                        numer = 0;
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

}

function modAsset(nodeId){
    var content = document.getElementById("content");
    content.innerHTML ="";

    var agent = data.node[nodeId];
    
    var init = true;
    
    var div2 = document.createElement("div");
    div2.className = "onglets";
    div2.id = "onglets";
    for(var indice=0; indice < agent.asset.length; indice++) {
        var asset = data.asset[agent.asset[indice]];
        // creation of the default tab
        var span = document.createElement("span");
        if (init){
            span.className = "onglet_1 onglet";
            data.old_onglet = "asset_1";
            init = false;
        } else {
            span.className = "onglet_0 onglet";
        }
        
        span.id = "onglet_asset_" + String(indice+1);
        span.onclick = change_onglet("asset_" + String(indice+1));
        span.textContent = "Asset n°" + String(indice+1);
        div2.appendChild(span);
    }
    content.appendChild(div2);

    var div3 = document.createElement("div");
    div3.className = "contenu_onglets";
    div3.id = "contenu_onglets";
    init = true;

    for(var indice=0; indice < agent.asset.length; indice++) {
        var asset = data.asset[agent.asset[indice]];
        // creation of the content of the default tab
        
        var div4 = document.createElement("div");
        div4.className = "contenu_onglet";
        div4.id = 'contenu_onglet_asset_' + String(indice+1);
        if (init){
            div4.style = "display: block";
            init = false;
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
            if (asset.type == choice){
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
        textElm.value = asset.name;
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
            if (asset.functionType == choice){
                opt.selected = true;
            }
        }
        div.appendChild(selctElm4);
        div4.appendChild(div);
        
        // features of the cost function
        var div = document.createElement("div");
        div.textContent = "Feature of the cost fonction (see help) ";
        div.id = "Feature";
        var numberElm1 = document.createElement("input");
        numberElm1.type = "texte";
        var feature = asset.functionCharac;
        var feat_chain = '';
        for (feat of feature){
            feat_chain = feat_chain + String(feat) + ' ; ';
        }
        numberElm1.value = feat_chain;
        div.appendChild(numberElm1);
        div4.appendChild(div);

        // Power maximal and minimal
        var div = document.createElement("div");
        div.textContent = "Upper bound (kW) : ";
        div.id = "Power_max";
        var numberElm2 = document.createElement("input");
        numberElm2.type = "number";
        numberElm2.step = "any";
        numberElm2.value = asset.Pmaxcap;
        div.appendChild(numberElm2);
        div4.appendChild(div);

        var div = document.createElement("div");
        div.textContent = "Lower bound (kW) : ";
        div.id = "Number_asset";
        var numberElm3 = document.createElement("input");
        numberElm3.type = "number";
        numberElm3.step = "any";
        numberElm3.value = asset.Pmincap;
        div.appendChild(numberElm3);
        div4.appendChild(div);

        div3.appendChild(div4)
    }
    content.appendChild(div3);
            
    /*  save of new data */
    var div = document.createElement("div");
    div.id = "button_mod_asset";
    var buttonelm = document.createElement("input");

    buttonelm.type = "button";
    buttonelm.value = "Update asset";
    buttonelm.onclick = clicModAsset(nodeId);
    div.appendChild(buttonelm);
    content.appendChild(div);   
}

function clicModAsset(nodeId) {
    return function() {
        console.log('Saving...')
        var content = document.getElementById("content");
        var selects = content.getElementsByTagName("select");
        var inputs = content.getElementsByTagName("input");
        
        var id_agent = nodeId;
        var agent = data.node[id_agent];
        var nb_asset = agent.asset.length;
        for (var indice=0; indice<nb_asset; indice++){
            var id_asset = agent.asset[indice];
            
            var asset_type = selects[2*indice].options[selects[2*indice].selectedIndex].value;
            var function_type = selects[1+2*indice].options[selects[1+2*indice].selectedIndex].value;

            var asset_name = inputs[0 + 4*indice].value;
            var Pmax = Number(inputs[2 + 4* indice].value);
            var Pmin = Number(inputs[3 + 4* indice].value);
            
            var chain_features =inputs[1 + 4*indice].value;
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
                            console.log("Warning it was not the good syntax, feature set to 0")
                            asset_name = asset_name + 'syntax error'
                            numer = 0;
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
            data.asset[id_asset] = asset_temp;
        }

    }
    
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
        if (node != undefined){
            var opt = document.createElement("option");
            opt.setAttribute("value", node.id);
            opt.innerText = node.name;
            selctElm1.appendChild(opt);
        }
        
    }
    div.appendChild(selctElm1);
    content.appendChild(div);

    selctElm1.onchange = function(choice) {
        this.options[0].disabled = true; // remove the choice select
        var buttonelm = document.getElementById("button_del_node")
            
        // remove the elements that we don't need on the page
        var wrapper = document.getElementById("wrap");
        if (wrapper !== null){
            content.removeChild(wrapper)
        } 
        var wrap = document.createElement("div");
        wrap.id = "wrap"


        var agent_id = choice.target.value;
        var agent = data.node[agent_id];
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
            div.appendChild(selctElm2);
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
                    selctElm3.multiple = "multiple";
                    selctElm3.id ="delete_asset";
                    for (id_asset of agent.asset) {
                        var asset = data.asset[id_asset];
                        if (asset != undefined) {
                            var opt = document.createElement("option");
                            opt.setAttribute("value", asset.id);
                            opt.innerText = asset.name;
                            selctElm3.appendChild(opt);
                        }
                        
                    }
                    div.appendChild(selctElm3);
                    wrap2.appendChild(div);
                    wrap.appendChild(wrap2);
                    new SlimSelect({
                        select: '#delete_asset'
                    })
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

            selctElm2.onchange = function() {
                this.options[0].disabled = true;
            }
        }
    content.insertBefore(wrap, buttonelm);
   
    }
     /*  save of new data */
     var div = document.createElement("div");
     div.id = "button_del_node";
     var buttonelm = document.createElement("input");

     buttonelm.type = "button";
     buttonelm.value = "delete Node";
     buttonelm.onclick = clicDelNode;
     div.appendChild(buttonelm);
     content.appendChild(div);   
}
function clicDelNode(){
    console.log('Saving...')
    var content = document.getElementById("content");
    var selects = content.getElementsByTagName("select");
    
    var id_node = selects[0].options[selects[0].selectedIndex].value;
    var node = data.node[id_node];
    var choice = selects[1].options[selects[1].selectedIndex].value;

    if (node.type == choices.typeNode[0]) {
        if (choice ==choices.deleteAgent[0]){
            hDelAgent(id_node)
        } 
        else if (choice ==choices.deleteAgent[1]) {
            for (var i=0; i < selects[2].options.length; i++) 
            {
                if (selects[2].options[i].selected) 
                {
                    var asset = Number(selects[2].options[i].value);
                    data.node[id_node].asset.splice(data.node[id_node].asset.indexOf(asset),1);
                    delete data.asset[asset];
                    data.idAssetUnused.push(asset)
                }
            }
        }

    } 
    else if (node.type == choices.typeNode[0]){
        if (choice ==choices.deleteCom[0]){
            hDelAgent(id_node)
        }

    } else if (choice ==choices.deleteCom[1]) {
        var manager = data.node[id_node];

        for (member of manager.communityMember){
            hDelAgent(member)
        }

        hDelAgent(id_node)

    }
}

function hDelLinks(id_node) {
    for (link of data.link) {
        if (link.source == id_node || link.destination == id_node){
            var id_link = link.id;
            delete data.link[id_link];
            data.idLinkUnused.push(id_link);
        }
    }
}
function hDelAgent(id_node) {
    var agent = data.node[id_node];
    for (partner of agent.partners) {
        data.node[partner].partners.splice(data.node[partner].partners.indexOf(id_node),1);
    }
    for (admin of agent.administrator){
        data.node[admin].communityMember.splice(data.node[admin].communityMember.indexOf(id_node),1);
    }

    if(data.node[id_node].type == choices.typeNode[1]) {
        for (member of agent.communityMember){
            data.node[member].administrator.splice(data.node[member].administrator.indexOf(id_node),1);
        }
    }

    hDelLinks(id_node)

    for (asset of agent.asset ){
        delete data.asset[asset];
        data.idAssetUnused.push(asset)
    }
    delete data.node[id_node];
    data.idNodeUnused.push(id_node);
}
