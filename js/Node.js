 
function addAgent() {
    var content = document.getElementById("content");
    content.innerHTML ="";
    data.oldNbAsset = 0;
    data.old_tab = "asset_1";

    // choice of the type of the node
    var div = document.createElement("div");
    var h3 = document.createElement("h3");
    h3.textContent = "Agent type : ";
    div.appendChild(h3);
    div.className = "form";
    
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
    selctElm1.id = "agent_type"
    new SlimSelect({
        select: '#agent_type'
    })
   
    // choice of the name
    var div = document.createElement("div");
    var h3 = document.createElement("h3");
    h3.textContent = "Agent name : ";
    div.appendChild(h3);
    div.className = "form";
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
        if ( data.idNodeUnused.length >0 ) {
            var id_node = data.idNodeUnused[0];                
        } else {
            var id_node = data.node.length;
        }
        textElm.value = choice.target.value +' ' + String(id_node);
        this.slim.data.data[0].disabled= true;

        

        if (choice.target.value == choices.typeNode[1]) {
            
            // remove forms that we don't need
            var input = document.getElementById("Number_asset");
            var tab = document.getElementById("tabs")
            if(input != null){
                content.removeChild(input)
            }
            if(tab != null) {
                content.removeChild(tab);
                data.oldNbAsset = 0;
                data.old_tab = "asset_1";  
            }
            // choice of the Community objective:
            var div = document.createElement("div");
            var h3 = document.createElement("h3");
            h3.textContent = "Community objective : ";
            div.appendChild(h3);
            div.className = "form";
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
            selctElm1.id = "select_community_objective"
            new SlimSelect({
                select: '#select_community_objective'
            })

        } else if (choice.target.value == choices.typeNode[0]){
            var input = document.getElementById("community_objective");
                if(input != null) {
                    content.removeChild(input);
                }
            var div = document.createElement("div");
            var h3 = document.createElement("h3");
            h3.textContent = "Number of assets : ";
            div.appendChild(h3);
            div.className = "form";

            div.id = "Number_asset";
            var numberElm = document.createElement("input");
            numberElm.type = "number";
            numberElm.step = 1;
            numberElm.min = 1;
            numberElm.value = 1;
            numberElm.id = "nb_asset";
            div.appendChild(numberElm);
            var buttonelm = document.getElementById("button_add_node");
            content.insertBefore(div,buttonelm);

            var div = document.createElement("div");
            div.appendChild(document.createElement("br"));
            div.className = "tabs";
            div.id = "tabs";
            div.nb = 1;
            buttonelm = document.getElementById("button_add_node")
            content.insertBefore(div,buttonelm);
            window.tabs.apply();  
            data.oldNbAsset = 1;  

            numberElm.onchange = function(choice) {
                //console.log(data.oldNbAsset)
                
                var nb_asset = Number(choice.target.value);
                var wrap_tab = document.getElementById("tab");
                var wrap_tabcontent = document.getElementById("content_tab")
                if (nb_asset < Number(data.oldNbAsset)) {
                    for (var index= Number(nb_asset)+1; index < Number(data.oldNbAsset)+1; index++) {
                        
                        var tabs = document.getElementById('tab_asset_' + String(index));
                        var tabs2 = document.getElementById('content_tab_asset_' + String(index));
                        if(tabs != null){
                            wrap_tab.removeChild(tabs);
                            wrap_tabcontent.removeChild(tabs2);
                        }
                    }
                } else if (nb_asset > Number(data.oldNbAsset)) {
                    //console.log(nb_asset);
                    var div = document.getElementById("tabs");
                    div.className = "tabs";
                    div.nb = nb_asset;
                    content.insertBefore(div,buttonelm);
                    
                    window.tabs.apply();
                    
                }
                data.oldNbAsset = nb_asset;        
            }
        }
    }
    
    // choice of trading partners
    var div = document.createElement("div");
    var h3 = document.createElement("h3");
    h3.textContent = "Trading partners : ";
    div.appendChild(h3);
    div.className = "form";
    
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
            var opt = document.createElement("option");
            opt.setAttribute("value", node.id);
            opt.innerText = node.name;
            selctElm2.appendChild(opt);
        }
        
    }
    div.appendChild(selctElm2);
    content.appendChild(div);
    new SlimSelect({
        select: '#trading'
    })

    selctElm2.onchange = function(choice) {
        var input = document.getElementById("community_objective")
        var asset = document.getElementById("Number_asset")
        // choice of community membership

        var div = document.getElementById("Community_membership");
        var div2 = document.createElement("div");
        var h3 = document.createElement("h3");
        div2.appendChild(h3);
        div2.className = "form";
        h3.textContent = "Community membership  :"; 
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
            if((admin != undefined) && (admin.type === choices.typeNode[1]) && (trading.indexOf(admin.id))== -1)
            {
                var opt = document.createElement("option");
                opt.setAttribute("value", admin.id);
                opt.innerText = admin.name;
                selctElm3.appendChild(opt); 
            } 
        }
        if (div != null) {
            content.replaceChild(div2,div);
        } else {
            if (selctElm1.options[selctElm1.selectedIndex].value == choices.typeNode[0]){
                content.insertBefore(div2,asset);
            } else if (selctElm1.options[selctElm1.selectedIndex].value == choices.typeNode[1]) {  
                content.insertBefore(div2,input);
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
    var input_name = document.getElementById("node_name");
    var input_asset = document.getElementById("nb_asset");

    var links = []; // { data: {id :'', source: '', target: '' } },

       
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
    //console.log(community);
    if (community[0] == 'undefined'){
        community = [];
    } else 
    {
        for (var i=0; i< community.length; i++) {
            community[i] = Number(community[i])
        }
    }

    
    var name = input_name.value;
    if ( data.idNodeUnused.length >0 ) {
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
    

    
    
    
    //console.log(data.node);
       
    
    // create the links 
    for (id of trading_partners) {
        if ( data.idLinkUnused.length >0 ) {
            var id_link = data.idLinkUnused.shift();                
    }   else {
         var id_link = data.link.length;
    }
        var link_temp = new Link(id_link,choices.typeLink[0],id_node,id,0,0,'');
        links.push({data: { id: 'l'+id_link, source: id_node, target: id, group: choices.typeLink[0] } });
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
            links.push({data: { id: 'l'+id_link, source: id, target: id_node, group: choices.typeLink[1] }});
        } else if (type_node == choices.typeNode[1]) {
            var link_temp = new Link(id_link,choices.typeLink[0],id_node,id,0,0,'');
            links.push({data: { id: 'l'+id_link, source: id_node, target: id, group: choices.typeLink[1] }});
        }
        
        
        data.link.push(link_temp);
    }
    var group_node = type_node;

    // Create the assets
    var typeAgent ='';
    if (type_node == choices.typeNode[0]){
        var nb_asset = input_asset.value;             

        
        for (var index=0; index<nb_asset; index++){
            flag_power = true;
            if ( data.idAssetUnused.length >0 ) {
                var id_asset = data.idAssetUnused.shift();                
            } else {
                var id_asset = data.asset.length;
            }
            agent_temp.asset.push(id_asset);
            var asset_temp = new Asset(id_asset,'','', '', '', 0, 0,  [], [],  '', '',[]);

            for (key of choices.featAsset){
                var form = document.getElementById(key + String(index));
                if (form != null){
                    if (key == "type" || key =="functionType" || key =="uncertaintyType" ){
                        asset_temp[key] = form.options[form.selectedIndex].value;
                    } else if ( key == "name"){
                        asset_temp[key] = form.value;
                    } else if (form.type == "text"){
                        
                        if (key == "functionCharac"){
                            function_type = asset_temp.functionType;
                        }
                        else if (key == "uncertainCharac"){
                            function_type = asset_temp.uncertaintyType;
                        }
                        var chain_features = form.value;
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
                                console.log("Warning it was not the good syntax");
                                number =0;
                            }
                            feat.push(number);
                        }
                        asset_temp[key] = feat;
                    } else if (form.type == "number"){
                        if(flag_power){
                            asset_temp.Pmaxcap = form.value;
                            flag_power = false;
                        } else {
                            asset_temp.Pmincap = form.value;
                            flag_power = true;
                        }

                    }

                }
            }
            if(!flag_power){
                asset_temp.Pmincap = asset_temp.Pmaxcap;
            }

            var Pmax = Number(asset_temp.Pmaxcap);
            var Pmin = Number(asset_temp.Pmincap);

            if (Pmin > Pmax) {
                console.log("beware we have Pmin>Pmax, Pmin and Pmax will be exchange, you can rectify by modify asset or agent");
                var P_temp = Pmax;
                Pmax = Pmin;
                Pmin = P_temp;
            }
            asset_temp.Pmaxcap = Pmax;
            asset_temp.Pmincap = Pmin;

            if (typeAgent != choices.typeAgent[2]){
                if ((typeAgent == choices.typeAgent[0] && Pmax >0) || (typeAgent == choices.typeAgent[1] && Pmin < 0)) {
                    typeAgent = choices.typeAgent[2];
                } else if (typeAgent == '') {
                    if (Pmax<=0){
                        typeAgent = choices.typeAgent[0];
                    } else if (Pmin>= 0) {
                        typeAgent = choices.typeAgent[1];
                    } else {
                        typeAgent = choices.typeAgent[2];
                    }
                }
            }
            
            if (asset_temp.type == choices.typeAsset[0]){
                if (data.multipleStep_1[index] != undefined){
                    var Pmaxt = [];
                    for (pow of data.multipleStep_1[index]){
                        Pmaxt.push(Number(pow));
                    }
                    asset_temp.Pmaxt = Pmaxt;
                    var len = data.multipleStep_1[index].length;
                    if (len > data.timeMax){
                        data.timeMax = len;
                    }
                } 
                if (data.multipleStep_2[index] != undefined){
                    var Pmint = [];
                    for (pow of data.multipleStep_2[index]){
                        Pmint.push(Number(pow));
                    }
                    asset_temp.Pmint = Pmint;
                    var len = data.multipleStep_2[index].length;
                    if (len > data.timeMax){
                        data.timeMax = len;
                    }
                }  
            } else if (asset_temp.type == choices.typeAsset[1]){
                if (data.multipleStep_1[index] != undefined){
                    var Pt = [];
                    for (pow of data.multipleStep_1[index]){
                        Pt.push(Number(pow));
                    }
                    asset_temp.Pmt = Pt;
                    var len = data.multipleStep_1[index].length;
                    if (len > data.timeMax){
                        data.timeMax = len;
                    }
                } 
            }
            data.multipleStep_1[index] = [];
            data.multipleStep_2[index] = [];
            data.asset[id_asset] = asset_temp;
        }
        agent_temp.typeAgent = typeAgent;
        group_node = typeAgent;
    }
    
    data.node[id_node] = agent_temp;

    // update the graph
    //console.log(group_node)
    cy.add({ data: { id: id_node, name: name, group: group_node} })
    console.log(links);
    if (links.length >0) {
        cy.add(links);
    }
    cy.center()
    
    var layout = cy.elements().layout({
        name: 'cose'
        });
    layout.run();
    
    // update the page 
    addAgent();
}

function modAgCom(NodeId) {
    var content = document.getElementById("content");
    var nodeId = Number(NodeId);
    var oldNode = data.node[nodeId];
    
    content.innerHTML ="";
    data.oldNbAsset = 0;
    data.old_tab = "asset_1";

    // choice of the type of the node
    var div = document.createElement("div");
    var h3 = document.createElement("h3");
    h3.textContent = "Agent type : ";
    div.appendChild(h3);
    div.className = "form";
    
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
    selctElm1.id = "node_type"
    new SlimSelect({
        select: '#node_type'
    })
   
    // choice of the name
    var div = document.createElement("div");
    div.className = "form";
    var h3 = document.createElement("h3");
    h3.textContent = "Agent name : ";
    div.appendChild(h3);
    
    var textElm = document.createElement("input");
    textElm.id = "node_name";
    textElm.type = "text";
    textElm.value = oldNode.name;
    //textElm.required = "required";
    textElm.onchange = checkname;
    div.appendChild(textElm);
    content.appendChild(div);

    // choice of trading partners 
    var div = document.createElement("div");
    var h3 = document.createElement("h3");
    h3.textContent = "Trading partners : ";
    div.appendChild(h3);
    div.className = "form";
    
    var selctElm2 = document.createElement("select");
    selctElm2.id = 'trading';
    selctElm2.multiple = "multiple";
    var opt = document.createElement("option");
    opt.setAttribute("value", undefined);
    opt.innerText = 'None';
    selctElm2.appendChild(opt);
    for (node of data.node) {
        if (node != undefined && node.id != nodeId ){
            var opt = document.createElement("option");
            opt.setAttribute("value", node.id);
            opt.innerText = node.name;
            selctElm2.appendChild(opt);
            if (oldNode.partners.includes(node.id)) {
                opt.selected = "selected";
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
    var h3 = document.createElement("h3");
    h3.textContent = "Community membership : ";
    div.appendChild(h3);
    div.className = "form";
    div.id = "Community_membership";
    var selctElm3 = document.createElement("select");
    selctElm3.multiple = "multiple";
    selctElm3.size = 2;
    selctElm3.id = "community"
    var opt = document.createElement("option");
    opt.setAttribute("value", undefined);
    opt.innerText = 'None';
    selctElm3.appendChild(opt);
    for(admin of data.node) {
        if (admin != undefined) {
            if(admin.type == choices.typeNode[1] && !oldNode.partners.includes(node.id) && admin.id != oldNode.id ){
                var opt = document.createElement("option");
                opt.setAttribute("value", admin.id);
                opt.innerText = admin.name;
                selctElm3.appendChild(opt); 
                if(oldNode.administrator.includes(admin.id)) {
                    opt.selected = "selected";
                }
            }
        }
        
        
    } 
    div.appendChild(selctElm3);
    content.appendChild(div);
    new SlimSelect({
        select: '#community'
    })

    if(oldNode.type == choices.typeNode[1]){
        var div = document.createElement("div");
        var h3 = document.createElement("h3");
        h3.textContent = "Community objective : ";
        div.appendChild(h3);
        div.className = "form";
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
        selctElm4.id = "select_community_objective"
        new SlimSelect({
            select: '#select_community_objective'
        })

        var div = document.createElement("div");
        var h3 = document.createElement("h3");
        h3.textContent = "Community members : ";
        div.appendChild(h3);
        div.className = "form";
        
        div.id = "Community_members";
        var selctElm5 = document.createElement("select");
        selctElm5.multiple = "multiple";
        selctElm5.size = 2;
        selctElm5.id = "members"
        var opt = document.createElement("option");
        opt.setAttribute("value", undefined);
        opt.innerText = 'None';
        selctElm5.appendChild(opt);
        for(node of data.node) {
            if (!oldNode.partners.includes(node.id) && oldNode.administrator.includes(node.id)  && node.id != oldNode.id  ){
                var opt = document.createElement("option");
                opt.setAttribute("value", node.id);
                opt.innerText = node.name;
                selctElm5.appendChild(opt); 
                if(oldNode.communityMember != undefined && oldNode.communityMember.includes(node.id)) {
                    opt.selected = "selected";
                }
            }
        } 
        div.appendChild(selctElm5);
        content.appendChild(div);
        new SlimSelect({
            select: '#members'
        })
    } else if (oldNode.type == choices.typeNode[0]){
        
        var div = document.createElement("div");
        div.appendChild(document.createElement("br"));
        div.id = "tabs"
        div.className = "tabs";
        div.nb = oldNode.asset.length;
        div.agent = oldNode;
        content.appendChild(div);
        
        window.tabs.apply();

    }

    // save of new data
    var div = document.createElement("div");
    div.id = "button_mod_node";
    var buttonelm = document.createElement("input");

    buttonelm.type = "button";
    buttonelm.value = "update node";
    buttonelm.onclick = clicModNode(nodeId);
    div.appendChild(buttonelm);
    content.appendChild(div);   
 
    selctElm1.onchange = function(choice) {
        var content = document.getElementById("content");
        var textElm = document.getElementById("node_name");
        textElm.value = choice.target.value + ' ' + String(oldNode.id);
        var buttonelm = document.getElementById("button_mod_node");

        if (choice.target.value == choices.typeNode[1]) {
            
            // remove forms that we don't need
            var tab = document.getElementById("tabs");
            
            if(tab != null){
                content.removeChild(tab)
            }
           
            // choice of the Community objective:
            var div = document.createElement("div");
            var h3 = document.createElement("h3");
            h3.textContent =  "Community objective : ";
            div.appendChild(h3);
            div.className = "form";
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
            
            content.insertBefore(div,buttonelm);
            selctElm1.id = "select_community_objective"
            new SlimSelect({
                select: '#select_community_objective'
            })

            var div = document.createElement("div");
            var h3 = document.createElement("h3");
            h3.textContent =  "Community members : ";
            div.appendChild(h3);
            div.className = "form";
            div.id = "Community_members";
            var selctElm4 = document.createElement("select");
            selctElm4.multiple = "multiple";
            selctElm4.size = 2;
            selctElm4.id = "members"
            var opt = document.createElement("option");
            opt.setAttribute("value", undefined);
            opt.innerText = 'None';
            selctElm4.appendChild(opt);
            for(node of data.node) {
                if(!oldNode.partners.includes(node.id) && !oldNode.administrator.includes(node.id)  && node.id != oldNode.id ){
                    var opt = document.createElement("option");
                    opt.setAttribute("value", node.id);
                    opt.innerText = node.name;
                    selctElm4.appendChild(opt); 
                    if(oldNode.communityMember != undefined && oldNode.communityMember.includes(node.id)) {
                        opt.selected = "selected";
                    }
                }  
            } 
            div.appendChild(selctElm4);
            content.insertBefore(div,buttonelm);
            new SlimSelect({
                select: '#members'
            })


        } else if (choice.target.value == choices.typeNode[0]){
            

            var input = document.getElementById("community_objective");
            var input2 = document.getElementById("Community_members")
                if(input != null) {
                    content.removeChild(input);
                    content.removeChild(input2);
                }

            var div = document.createElement("div");
            div.appendChild(document.createElement("br"));
            div.id = "tabs"
            div.className = "tabs";
            div.nb = oldNode.asset.length;
            content.insertBefore(div,buttonelm);
            
            window.tabs.apply();

            
            
        }
    }

    selctElm2.onchange = function(choice) {
        // choice of community membership
        var div = document.getElementById("Community_membership")

        var partners = [];
        for (var i=0; i < this.options.length; i++) 
        {
            if (this.options[i].selected) 
            {
                partners.push(this.options[i].value);
            }
        }
        
        var div2 = document.createElement("div");
        var h3 = document.createElement("h3");
        h3.textContent =  "Community membership : ";
        div2.appendChild(h3);
        div2.className = "form";
        var selctElm3 = document.createElement("select");
        selctElm3.multiple = "multiple";
        selctElm3.id ="community";
        var opt = document.createElement("option");
        opt.setAttribute("value", '');
        opt.innerText = 'None';
        selctElm3.appendChild(opt);
        for(admin of data.node) {
            if((admin.type === choices.typeNode[1]) && !(partners.includes(admin.id))  && admin.id != oldNode.id ){
                var opt = document.createElement("option");
                opt.setAttribute("value", admin.id);
                opt.innerText = admin.name;
                selctElm3.appendChild(opt); 
                if(oldNode.administrator.includes(admin.id)) {
                    opt.selected = "selected";
                }
            }
            
        }
        div2.appendChild(selctElm3);
        content.replaceChild(div2,div)
        div2.id = "Community_membership";
        new SlimSelect({
            select: '#community'
        })
        
    }

    selctElm3.onchange = function(choice) {
        if(oldNode == choices.typeNode[1]){
            var select = document.getElementById("trading")
            var trading_partners = [];
            for (var i=0; i < select.options.length; i++) 
            {
                if (select.options[i].selected) 
                {
                    trading_partners.push(select.options[i].value);
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
            
            
            var admins = [];
            for (var i=0; i < this.options.length; i++) 
            {
                if (this.options[i].selected) 
                {
                    admins.push(this.options[i].value);
                }
            }
            if (admins[0] == 'undefined'){
                var admins = [];
            }

            var div = document.getElementById("Community_members");

            var div2 = document.createElement("div");
            var h3 = document.createElement("h3");
            h3.textContent =  "Community members : ";
            div.appendChild(h3);
            div.className = "form";
            
            var selctElm5 = document.createElement("select");
            selctElm5.multiple = "multiple";
            selctElm5.size = 2;
            selctElm5.id = "members"
            var opt = document.createElement("option");
            opt.setAttribute("value", undefined);
            opt.innerText = 'None';
            selctElm5.appendChild(opt);
            for(node of data.node) {
                if (!trading_partners.includes(node.id) && admins.includes(node.id)  && node.id != oldNode.id ) {
                    var opt = document.createElement("option");
                    opt.setAttribute("value", node.id);
                    opt.innerText = node.name;
                    selctElm5.appendChild(opt); 
                    if(oldNode.communityMember.includes(node.id)) {
                        opt.selected = "selected";
                    } 
                }
            } 
            div2.appendChild(selctElm5);
            content.replaceChild(div2,div)
            div2.id = "Community_members";
            new SlimSelect({
                select: '#members'
            })
        }
    }
}

function clicModNode(nodeId) {
    return function() {
        console.log('Saving...')
        var content = document.getElementById("content");
        var selects = content.getElementsByTagName("select");
        var text = document.getElementById("node_name");

        var name = text.value;
        var id_agent = Number(nodeId);
        var oldNode = data.node[id_agent];
        var asset = oldNode.asset; // the id of asset won't change
        
        // remove the old element

        hDelAgent(id_agent,false);
        data.idNodeUnused.pop(); // we must keep the id as used 
            
        // create the new element

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
        if (type_node == choices.typeNode[1]){
            var objective = selects[3].options[selects[3].selectedIndex].value;
            
            var members = [];
            for (var i=0; i < selects[4].options.length; i++) 
            {
                if (selects[4].options[i].selected) 
                {
                    members.push(selects[4].options[i].value);
                }
            }  
            if (members[0] == 'undefined'){
                var members = [];
            }
            else 
            {
                for (var i=0; i< members.length; i++) {
                    members[i] = Number(members[i])
                }
            }
            
            var agent_temp = new Node(id_agent,type_node,name,trading_partners,administrators,[],[],objective, members);
        } else if (type_node == choices.typeNode[0]){
            var agent_temp = new Node(id_agent,type_node,name,trading_partners,administrators,asset,[] );
        }
            
        data.node[id_agent] = agent_temp;
        //console.log(data.node);
        
        

        // create the new links 
        var links = [];
        for (id of trading_partners) {
            if ( data.idLinkUnused.length >0 ) {
                id_link = data.idLinkUnused.shift();                
            } else {
                var id_link = data.link.length;
            }
            var name_link = 'Link ' + String(id_link);
            var link_temp = new Link(id_link,choices.typeLink[0],id_agent,id,name_link,0,0);
            data.link[id_link] = link_temp;
            links.push({data: { id: 'l'+ id_link, source: id_agent, target: id, group:choices.typeLink[0] }});
        }
        for (id of administrators) {
            if ( data.idLinkUnused.length >0 ) {
                id_link = data.idLinkUnused.shift();                
            } else {
                var id_link = data.link.length;
            }
            var name_link = 'Link ' + String(id_link);
            var link_temp = new Link(id_link,choices.typeLink[1],id,id_agent,name_link,0,0);
            data.link[id_link] = link_temp;
            links.push({data: { id: 'l'+id_link, source: id, target: id_agent,group:choices.typeLink[1]  }});
        }
        if (type_node == choices.typeNode[1]){
            for (id of members) {
                if ( data.idLinkUnused.length >0 ) {
                    id_link = data.idLinkUnused.shift();                
                } else {
                    var id_link = data.link.length;
                }
                var name_link = 'Link ' + String(id_link);
                var link_temp = new Link(id_link,choices.typeLink[1],id_agent,id,name_link,0,0);
                data.link[id_link] = link_temp;
                links.push({data: { id: 'l'+id_link, source: id_agent, target: id ,group:choices.typeLink[0]  }});
            }

        }
        var node_group = type_node;
        
        console.log(agent_temp)
        
        //update the assets
        var typeAgent = '';
        if (type_node == choices.typeNode[0]){
            var nb_asset = agent_temp.asset.length;
            for (var index=0; index<nb_asset; index++){
                flag_power = true;
                var id_asset = agent_temp.asset[index];

                var asset_temp = data.asset[id_asset];
    

                for (key of choices.featAsset){
                    var form = document.getElementById(key + String(index));
                    if (form != null){
                        if (key == "type" || key =="functionType" || key =="uncertaintyType" ){
                            asset_temp[key] = form.options[form.selectedIndex].value;
                        } else if (key == "name"){
                            asset_temp[key] = form.value;
                        } else if (form.type == "text"){
                            
                            if (key == "functionCharac"){
                                function_type = asset_temp.functionType;
                            }
                            else if (key == "uncertainCharac"){
                                function_type = asset_temp.uncertaintyType;
                            }
                            var chain_features = form.value;
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
                                    console.log("Warning it was not the good syntax");
                                    number =0;
                                }
                                feat.push(number);
                            }
                            asset_temp[key] = feat;
                        } else if (form.type == "number"){
                            if(flag_power){
                                asset_temp.Pmaxcap = form.value;
                                flag_power = false;
                            } else {
                                asset_temp.Pmincap = form.value;
                                flag_power = true;
                            }
    
                        }
    
                    }
                }
                if(!flag_power){
                    asset_temp.Pmincap = asset_temp.Pmaxcap;
                }
                var Pmax = Number(asset_temp.Pmaxcap);
                var Pmin = Number(asset_temp.Pmincap);

                if (Pmin > Pmax) {
                    console.log("beware we have Pmin>Pmax, Pmin and Pmax will be exchange, you can rectify by modify asset or agent");
                    var P_temp = Pmax;
                    Pmax = Pmin;
                    Pmin = P_temp;
                }
                asset_temp.Pmaxcap = Pmax;
                asset_temp.Pmincap = Pmin;

                if (typeAgent != choices.typeAgent[2]){
                    if ((typeAgent == choices.typeAgent[0] && Pmax >0) || (typeAgent == choices.typeAgent[1] && Pmin < 0)) {
                        typeAgent = choices.typeAgent[2];
                    } else if (typeAgent == '') {
                        if (Pmax<=0){
                            typeAgent = choices.typeAgent[0];
                        } else if (Pmin>= 0) {
                            typeAgent = choices.typeAgent[1];
                        } else {
                            typeAgent = choices.typeAgent[2];
                        }
                    }
                }
                
                if (asset_temp.type == choices.typeAsset[0]){
                    if (data.multipleStep_1[index] != undefined){
                        var Pmaxt = [];
                        for (pow of data.multipleStep_1[index]){
                            Pmaxt.push(Number(pow));
                        }
                        asset_temp.Pmaxt = Pmaxt;
                        var len = data.multipleStep_1[index].length;
                        if (len > data.timeMax){
                            data.timeMax = len;
                        }
                    } 
                    if (data.multipleStep_2[index] != undefined){
                        var Pmint = [];
                        for (pow of data.multipleStep_2[index]){
                            Pmint.push(Number(pow));
                        }
                        asset_temp.Pmint = Pmint;
                        var len = data.multipleStep_2[index].length;
                        if (len > data.timeMax){
                            data.timeMax = len;
                        }
                    }  
                } else if (asset_temp.type == choices.typeAsset[1]){
                    if (data.multipleStep_1[index] != undefined){
                        var Pt = [];
                        for (pow of data.multipleStep_1[index]){
                            Pt.push(Number(pow));
                        }
                        asset_temp.Pmt = Pt;
                        var len = data.multipleStep_1[index].length;
                        if (len > data.timeMax){
                            data.timeMax = len;
                        }
                    } 
                }
                data.multipleStep_1[index] = [];
                data.multipleStep_2[index] = [];
                data.asset[id_asset] = asset_temp;
                data.node[nodeId].typeAgent = typeAgent;  
            }
            node_group = typeAgent;
        }
        // update the graphe
        cy.add({ data: { id: id_agent, name: name, group:node_group } })
        cy.add(links);
        cy.center()
        
        var layout = cy.elements().layout({
            name: 'cose'
            });
        layout.run();

        // update the page

        modAgCom(nodeId)
    }
}

function addAsset(){
    var content = document.getElementById("content");
    content.innerHTML ="";
    data.oldNbAsset = 0;
    data.old_tab = "asset_1";

    // choice of the node
    var div = document.createElement("div");
    var h3 = document.createElement("h3");
    h3.textContent =  "Agent : ";
    div.appendChild(h3);
    div.className = "form"; 
    var selctElm1 = document.createElement("select");
    var opt = document.createElement("option");
    opt.setAttribute("value", undefined);
    opt.innerText = 'Select...';
    selctElm1.appendChild(opt);
    selctElm1.id = "node";
    for (agent of data.node){
        if (agent != undefinded) {
            if (agent.type == choices.typeNode[0]) {
            var opt = document.createElement("option");
            opt.setAttribute("value", agent.id);
            opt.innerText = agent.name;
            selctElm1.appendChild(opt);  
            }
        }
    }
    div.appendChild(selctElm1);
    content.appendChild(div);
    new SlimSelect({
        select: '#node'
    })

    // choice of the number of asset 
    var div = document.createElement("div");
    var h3 = document.createElement("h3");
    h3.textContent =  "Number of assets : ";
    div.appendChild(h3);
    div.className = "form"; 

    div.id = "Number_asset";
    var numberElm = document.createElement("input");
    numberElm.type = "number";
    numberElm.step = 1;
    numberElm.min = 1;
    numberElm.value = 1;
    numberElm.id = "nb_asset";
    div.appendChild(numberElm);
    
    content.appendChild(div);

    var div = document.createElement("div");
    div.appendChild(document.createElement("br"));
    div.className = "tabs";
    div.id = "tabs";
    div.nb = 1;
    
    content.appendChild(div);
    window.tabs.apply();  
    data.oldNbAsset = 1;  

    numberElm.onchange = function(choice) {
        var buttonelm = document.getElementById("button_add_asset");
        //console.log(data.oldNbAsset)
        
        var nb_asset = Number(choice.target.value);
        var wrap_tab = document.getElementById("tab");
        var wrap_tabcontent = document.getElementById("content_tab")
        if (nb_asset < Number(data.oldNbAsset)) {
            for (var index= Number(nb_asset)+1; index < Number(data.oldNbAsset)+1; index++) {
                var tabs = document.getElementById('tab_asset_' + String(index));
                var tabs2 = document.getElementById('content_tab_asset_' + String(index));
                if(tabs != null){
                    wrap_tab.removeChild(tabs);
                    wrap_tabcontent.removeChild(tabs2);
                }
            }
        } else if (nb_asset > data.oldNbAsset) {
            var div = document.getElementById("tabs");
            div.className = "tabs";
            div.nb = nb_asset;
            content.insertBefore(div,buttonelm);
            
            window.tabs.apply();
            
        }
        data.oldNbAsset = nb_asset;        
    }
    /*save of new data */
    
   
    var div = document.createElement("div");
    div.id = "button_add_asset";
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
    var input = document.getElementById("nb_asset");
    
    var id_agent = selects[0].options[selects[0].selectedIndex].value;

    var nb_asset = input.value;

    
    var typeAgent = data.node[id_agent].typeAgent;
    for (var index=0; index<nb_asset; index++){
        flag_power = true;
        if ( data.idAssetUnused.length >0 ) {
            var id_asset = data.idAssetUnused.shift();                
        } else {
            var id_asset = data.asset.length;
        }
        var asset_temp = new Asset(id_asset,'','', '', '', 0, 0, 0, [], [], [], '', '',[]);

        for (key of choices.featAsset){
            var form = document.getElementById(key + String(index));
            if (form != null){
                if (key == "type" || key =="functionType" || key =="uncertaintyType" ){
                    asset_temp[key] = form.options[form.selectedIndex].value;
                } else if (key == "name"){
                    asset_temp[key] = form.value;
                } else if (form.type == "text"){
                    
                    if (key == "functionCharac"){
                        function_type = asset_temp.functionType;
                    }
                    else if (key == "uncertainCharac"){
                        function_type = asset_temp.uncertaintyType;
                    }
                    var chain_features = form.value;
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
                            console.log("Warning it was not the good syntax");
                            number =0;
                        }
                        feat.push(number);
                    }
                    asset_temp[key] = feat;
                } else if (form.type == "number"){
                    if(flag_power){
                        asset_temp.Pmaxcap = form.value;
                        flag_power = false;
                    } else {
                        asset_temp.Pmincap = form.value;
                        flag_power = true;
                    }

                }

            }
        }
        if(!flag_power){
            asset_temp.Pmincap = asset_temp.Pmaxcap;
        }
        var Pmax = Number(asset_temp.Pmaxcap);
        var Pmin = Number(asset_temp.Pmincap);

        if (Pmin > Pmax) {
            console.log("beware we have Pmin>Pmax, Pmin and Pmax will be exchange, you can rectify by modify asset or agent");
            var P_temp = Pmax;
            Pmax = Pmin;
            Pmin = P_temp;
        }
        asset_temp.Pmaxcap = Pmax;
        asset_temp.Pmincap = Pmin;

        if (typeAgent != choices.typeAgent[2]){
            if ((typeAgent == choices.typeAgent[0] && Pmax >0) || (typeAgent == choices.typeAgent[1] && Pmin < 0)) {
                typeAgent = choices.typeAgent[2];
            } else if (typeAgent == '') {
                if (Pmax<=0){
                    typeAgent = choices.typeAgent[0];
                } else if (Pmin>= 0) {
                    typeAgent = choices.typeAgent[1];
                } else {
                    typeAgent = choices.typeAgent[2];
                }
            }
        }
        
        if (asset_temp.type == choices.typeAsset[0]){
            if (data.multipleStep_1[index] != undefined){
                var Pmaxt = [];
                for (pow of data.multipleStep_1[index]){
                    Pmaxt.push(Number(pow));
                }
                asset_temp.Pmaxt = Pmaxt;
                var len = data.multipleStep_1[index].length;
                if (len > data.timeMax){
                    data.timeMax = len;
                }
            } 
            if (data.multipleStep_2[index] != undefined){
                var Pmint = [];
                for (pow of data.multipleStep_2[index]){
                    Pmint.push(Number(pow));
                }
                asset_temp.Pmint = Pmint;
                var len = data.multipleStep_2[index].length;
                if (len > data.timeMax){
                    data.timeMax = len;
                }
            }  
        } else if (asset_temp.type == choices.typeAsset[1]){
            if (data.multipleStep_1[index] != undefined){
                var Pt = [];
                for (pow of data.multipleStep_1[index]){
                    Pt.push(Number(pow));
                }
                asset_temp.Pmt = Pt;
                var len = data.multipleStep_1[index].length;
                if (len > data.timeMax){
                    data.timeMax = len;
                }
            } 
        }
        data.multipleStep_1[index] = [];
        data.multipleStep_2[index] = [];
        data.asset[id_asset] = asset_temp;
        data.node[id_agent].typeAgent = typeAgent;  
        data.node[id_agent].asset.push(id_asset)
    }
    node_group = typeAgent;

    // update the graphe

    //console.log(typeAgent)
    var node = cy.getElementById(String(id_agent));

    var links1 = cy.edges('[source = '+ '\"' + String(id_agent) +'\"' +']');
    var links2 = cy.edges('[target = ' +'\"' + String(id_agent)+ '\"' +']');
    //console.log(links1);
    //console.log(links2)
    cy.remove(node);
    cy.add({ data: { id: id_agent, name: data.node[id_agent].name, group: typeAgent} })
    links1.restore();
    links2.restore();
    var layout = cy.elements().layout({
        name: 'cose'
        });
    layout.run();

    // update the page
    addAsset();
}

function modAsset(nodeId){
    var content = document.getElementById("content");
    content.innerHTML ="";
    data.oldNbAsset = 0;
    data.old_tab = "asset_1";


    var div = document.createElement("div");
    div.appendChild(document.createElement("br"));
    div.className = "tabs";
    div.agent = data.node[nodeId]
    div.nb = data.node[nodeId].asset.length;
    
    content.appendChild(div);
    
    window.tabs.apply();
                    
    
            
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
        var agent_temp = data.node[id_agent];
                
        var nb_asset = agent_temp.asset.length;
        typeAgent ='';
        for (var index=0; index<nb_asset; index++){
            var id_asset = agent_temp.asset[index];
            var flag_power = true;
            var asset_temp = data.asset[id_asset];

            for (key of choices.featAsset){
                var form = document.getElementById(key + String(index));
                if (form != null){
                    if (key == "type" || key =="functionType" || key =="uncertaintyType" ){
                        asset_temp[key] = form.options[form.selectedIndex].value;
                    } else if ( key == "name"){
                        asset_temp[key] = form.value;
                    } else if (form.type == "text"){
                        
                        if (key == "functionCharac"){
                            function_type = asset_temp.functionType;
                        }
                        else if (key == "uncertainCharac"){
                            function_type = asset_temp.uncertaintyType;
                        }
                        var chain_features = form.value;
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
                                console.log("Warning it was not the good syntax");
                                number =0;
                            }
                            feat.push(number);
                        }
                        asset_temp[key] = feat;
                    } else if (form.type == "number"){
                        if(flag_power){
                            asset_temp.Pmaxcap = form.value;
                            flag_power = false;
                        } else {
                            asset_temp.Pmincap = form.value;
                            flag_power = true;
                        }
                    }
                }
            }
            if(!flag_power){
                asset_temp.Pmincap = asset_temp.Pmaxcap;
            }
            var Pmax = Number(asset_temp.Pmaxcap);
            var Pmin = Number(asset_temp.Pmincap);

            if (Pmin > Pmax) {
                console.log("beware we have Pmin>Pmax, Pmin and Pmax will be exchange, you can rectify by modify asset or agent");
                var P_temp = Pmax;
                Pmax = Pmin;
                Pmin = P_temp;
            }
            asset_temp.Pmaxcap = Pmax;
            asset_temp.Pmincap = Pmin;

            if (typeAgent != choices.typeAgent[2]){
                if ((typeAgent == choices.typeAgent[0] && Pmax >0) || (typeAgent == choices.typeAgent[1] && Pmin < 0)) {
                    typeAgent = choices.typeAgent[2];
                } else if (typeAgent == '') {
                    if (Pmax<=0){
                        typeAgent = choices.typeAgent[0];
                    } else if (Pmin>= 0) {
                        typeAgent = choices.typeAgent[1];
                    } else {
                        typeAgent = choices.typeAgent[2];
                    }
                }
            }
            
            if (asset_temp.type == choices.typeAsset[0]){
                if (data.multipleStep_1[index] != undefined){
                    var Pmaxt = [];
                    for (pow of data.multipleStep_1[index]){
                        Pmaxt.push(Number(pow));
                    }
                    asset_temp.Pmaxt = Pmaxt;
                    var len = data.multipleStep_1[index].length;
                    if (len > data.timeMax){
                        data.timeMax = len;
                    }
                } 
                if (data.multipleStep_2[index] != undefined){
                    var Pmint = [];
                    for (pow of data.multipleStep_2[index]){
                        Pmint.push(Number(pow));
                    }
                    asset_temp.Pmint = Pmint;
                    var len = data.multipleStep_2[index].length;
                    if (len > data.timeMax){
                        data.timeMax = len;
                    }
                }  
            } else if (asset_temp.type == choices.typeAsset[1]){
                if (data.multipleStep_1[index] != undefined){
                    var Pt = [];
                    for (pow of data.multipleStep_1[index]){
                        Pt.push(Number(pow));
                    }
                    asset_temp.Pmt = Pt;
                    var len = data.multipleStep_1[index].length;
                    if (len > data.timeMax){
                        data.timeMax = len;
                    }
                } 
            }
            data.multipleStep_1[index] = [];
            data.multipleStep_2[index] = [];
            data.asset[id_asset] = asset_temp;
            data.node[nodeId].typeAgent = typeAgent;  
        }
        
        // update the graphe
        var node = cy.getElementById(String(id_agent));

        var links1 = cy.edges('[source = '+ '\"' + String(id_agent) +'\"' +']');
        var links2 = cy.edges('[target = ' +'\"' + String(id_agent)+ '\"' +']');
        
        cy.remove(node);
        cy.add({ data: { id: id_agent, name: data.node[id_agent].name, group: typeAgent} })
        links1.restore();
        links2.restore();
        var layout = cy.elements().layout({
            name: 'cose'
            });
        layout.run();

        // update the page
        modAsset(nodeId)
    }
    
}

function delAgCom(NodeId = undefined) {
// suprimer un agent ou juste certains de ses assets
// supprimer la commununity complète ou juste un community manager 
    var content = document.getElementById("content");
    content.innerHTML ="";
   

    // choice of the node
    var div = document.createElement("div");
    var h3 = document.createElement("h3");
    h3.textContent = "Which agent do you want to delete ? "
    div.appendChild(h3);
    div.className = "form";

    var selctElm1 = document.createElement("select");
    var opt = document.createElement("option");
    opt.setAttribute("value", '');
    opt.innerText = 'Select...';
    if (NodeId == undefined){
        selctElm1.appendChild(opt);
    }
    for (node of data.node) {
        if (node != undefined){
            var opt = document.createElement("option");
            opt.setAttribute("value", node.id);
            opt.innerText = node.name;
            selctElm1.appendChild(opt);
            if (NodeId != undefined){
                if (NodeId == node.id){
                    opt.selected = true;
                }
            }
        
        }
        
    }
    div.appendChild(selctElm1);
    content.appendChild(div);
    selctElm1.id = "agent"
    new SlimSelect({
        select: '#agent'
    })
    if (NodeId != undefined){
        var wrap = document.createElement("div");
        wrap.id = "wrap"
        content.appendChild(wrap)

        var agent_id = NodeId
        var agent = data.node[agent_id];
        if (agent.type == choices.typeNode[0]) {

            // choice of what we delete
            var div = document.createElement("div");
            var h3 = document.createElement("h3");
            h3.textContent = "What do you want to delete ? ";
            div.appendChild(h3);
            div.className = "form";
            
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
            div.appendChild(selctElm1);
            content.appendChild(div);
            selctElm2.id = "choice1"
            new SlimSelect({
                select: '#choice1'
            })
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
                    var h3 = document.createElement("h3");
                    h3.textContent = "Which assets do you want to delete ? ";
                    div.appendChild(h3);
                    div.className = "form";
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
            var h3 = document.createElement("h3");
            h3.textContent = "What do you want to delete ? ";
            div.appendChild(h3);
            div.className = "form";
            
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
            selctElm2.id = "choice1"
            new SlimSelect({
                select: '#choice1'
            })
        }
        
    }
    selctElm1.onchange = function(choice) {
        this.slim.data.data[0].disabled= true; // remove the choice select
        var buttonelm = document.getElementById("button_del_node")
            
        // remove the elements that we don't need on the page
        var wrapper = document.getElementById("wrap");
        if (wrapper !== null){
            content.removeChild(wrapper)
        } 
        var wrap = document.createElement("div");
        wrap.id = "wrap"
        content.insertBefore(wrap, buttonelm);

        var agent_id = choice.target.value;
        var agent = data.node[agent_id];
        if (agent.type == choices.typeNode[0]) {

            // choice of what we delete
            var div = document.createElement("div");
            var h3 = document.createElement("h3");
            h3.textContent = "What do you want to delete ? ";
            div.appendChild(h3);
            div.className = "form";
        
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
            selctElm2.id = "choice1"
            new SlimSelect({
                select: '#choice1'
            })

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
                    var h3 = document.createElement("h3");
                    h3.textContent = "Which assets do you want to delete ? "; 
                    div.appendChild(h3);
                    div.className = "form";
        
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
            var h3 = document.createElement("h3");
            h3.textContent = "What do you want to delete ? ";
            div.appendChild(h3);
            div.className = "form";
           
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
            selctElm2.id = "choice1"
            new SlimSelect({
                select: '#choice1'
            })

            selctElm2.onchange = function() {
                this.slim.data.data[0].disabled= true;
            }
        }
    
   
    }
     /*  save of new data */
     var div = document.createElement("div");
     div.id = "button_del_node";
     var buttonelm = document.createElement("input");

     buttonelm.type = "button";
     buttonelm.value = "Delete Node";
     buttonelm.onclick = clicDelNode;
     div.appendChild(buttonelm);
     content.appendChild(div);   
}
function clicDelNode(){
    console.log('deleting...')
    var content = document.getElementById("content");
    var selects = content.getElementsByTagName("select");
    
    var id_node = selects[0].options[selects[0].selectedIndex].value;
    var node = data.node[id_node];
    var choice = selects[1].options[selects[1].selectedIndex].value;
    var typeAgent = '';
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
                else {
                    var asset = Number(selects[2].options[i].value);
                    var Pmax = data.asset[asset].Pmaxcap;
                    var Pmin = data.asset[asset].Pmincap;
                    if (typeAgent != choices.typeAgent[2]){
                        if ((typeAgent == choices.typeAgent[0] && Pmax >0) || (typeAgent == choices.typeAgent[1] && Pmin < 0)) {
                            typeAgent = choices.typeAgent[2];
                        } else if (typeAgent == '') {
                            if (Pmax<=0){
                                typeAgent = choices.typeAgent[0];
                            } else if (Pmin>= 0) {
                                typeAgent = choices.typeAgent[1];
                            } else {
                                typeAgent = choices.typeAgent[2];
                            }
                        }
                    }
                }             
            }
            console.log()
            data.node[id_node].typeAgent = typeAgent;
        }

    } 
    else if (node.type == choices.typeNode[1]){
        if (choice ==choices.deleteCom[1]){
            hDelAgent(id_node)
        }

        else if (choice ==choices.deleteCom[0]) {
            var manager = data.node[id_node];
            
            while (manager.communityMember.length >0) {
                member = manager.communityMember.shift();
                hDelAgent(member);
            }
            hDelAgent(id_node)
            
        }

    }

    // Update the graph
    cy.center()
    
    var layout = cy.elements().layout({
        name: 'cose'
        });
    layout.run();
    
    // update the page
    delAgCom();

}
