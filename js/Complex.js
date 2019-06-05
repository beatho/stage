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
        if (node != undefined) {
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
        var id_partners = [];

        var nodes = [];
        var links =[];
        
        for (var i=0; i < selects[1].options.length; i++) 
        {
            if (selects[1].options[i].selected) 
            {
                id_partners.push(selects[1].options[i].value);
            }
        }
        if (id_partners[0] == "undefined"){
            id_partners = [];
        } else 
        {
            for (var i=0; i< id_partners.length; i++) {
                id_partners[i] = Number(id_partners[i])
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
        
       
        var id_community_merber = [];
        for(var i = 0; i < nb_agent; i++ ) {
            id_community_merber.push(data.node.length+1+i)
        }
        id_admin = data.node.length;
        var admin = new Node(id_admin,choices.typeNode[1], name_admin, id_partners, [], [], [],community_objective, id_community_merber);
        
        nodes.push({ data: { id: id_admin, name: name_admin } });
    
        data.node.push(admin);

        
        for(var i = 0; i < nb_agent; i++ ) {
            var Name = names[i];
            var agent_temp = new Node(data.node.length,choices.typeNode[0],Name,[],[id_admin],[],[]);
            nodes.push({ data: { id: Number(data.node.length), name: Name } });
            data.node.push(agent_temp);
        }
     
        
        // create the links 
        for (id of id_partners) {
            if ( data.idLinkUnused.length >0 ) {
                var id_link = data.idLinkUnused.shift();                
            } else {
                 var id_link = data.link.length;
            }
            var name = 'Link ' + String(data.link.length);
            var link_temp = new Link(id_link,choices.typeLink[0],id_admin,id,name,0,0);
            links.push({data: { id: 'l'+id_link, source: id_admin, target: id }});
            data.link.push(link_temp);
            var agent_temp = data.node[id];
            agent_temp.partners.push(id_admin);
            data.node[id] = agent_temp; 
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
            links.push({data: { id: 'l'+id_link, source: id_admin, target: id }});
        }
        // update the graph
        cy.add(nodes)
        cy.add(links);
        cy.center();
        var layout = cy.elements().layout({
            name: 'cose'
          });
        layout.run();

        // actualise the page
        addCom(nb_agent)
    } 
} 

function addExample() {
    var content = document.getElementById("content");
    content.innerHTML ="";

    // choice of the example
    var div = document.createElement("div");
    div.textContent = "Example : ";
    var selctElm1 = document.createElement("select");
    var opt = document.createElement("option");
    opt.setAttribute("value", '');
    opt.innerText = 'Select...';
    selctElm1.appendChild(opt);
    for (choice of choices.examples){
        var opt = document.createElement("option");
        opt.setAttribute("value", choice);
        opt.innerText = choice;
        selctElm1.appendChild(opt);
    }
    div.appendChild(selctElm1);
    content.appendChild(div);

    selctElm1.onchange = function() {
        this.options[0].disabled = true;
        // button to save the choice
        var div = document.createElement("div");
        div.id = "button_add_link";
        var buttonelm = document.createElement("input");

        buttonelm.type = "button";
        buttonelm.value = "Add link";
        buttonelm.onclick = clicAddExample;
        div.appendChild(buttonelm);
        content.appendChild(div);

    }


}

function clicAddExample() {
    var content = document.getElementById("content");
    var selects = content.getElementsByTagName("select");
    var value1 = selects[0].options[selects[0].selectedIndex].value
    switch(value1) {
        case choices.examples[0]:
            concatData(JSON.parse(JSON.stringify(examplesCommunity))); // to have a clone of the object
            updateGraph();
        break
        case choices.examples[1]:
            concatData(JSON.parse(JSON.stringify(examplesPToP))); // to have a clone of the object
            updateGraph();
        break

    }
    addExample();
}


function addFile(input) {
    var reader=new FileReader();
    reader.onload=function() {
        data_added=JSON.parse(reader.result);
        console.log("download");
        //console.log(data_added);
        concatData(data_added)
        
        
        updateGraph();
	};
    reader.readAsText(input.files[0]);
}

function save() {
    save();
}
function saveAs() {
}

function concatData(data_added) {
    console.log(data_added)
    // we need to add a off for all the id
    var len_node = data.node.length;
    var len_link = data.link.length;
    var len_asset = data.asset.length;
    
    // The nodes
    for (element of data_added.node){
        element.id = element.id + len_node;
        var len_admins = element.administrator.length;
        var len_part = element.partners.length;
        var len_assets = element.asset.length;
        var len_assets_active = element.asset.length;
        if (element.type == choices.typeNode[1]) {
            var len_community = element.communityMember.length;
        }

        for (var indice = 0; indice < len_part; indice++){
            element.partners[indice] = element.partners[indice] + len_node; 
        }
        for (var indice = 0; indice < len_admins; indice++){
            element.administrator[indice] = element.administrator[indice] + len_node; 
        }
        for (var indice = 0; indice < len_assets; indice++){
            element.asset[indice] = element.asset[indice] + len_asset; 
        }
        for (var indice = 0; indice < len_assets_active; indice++){
            element.asset[indice] = element.asset[indice] + len_asset; 
        }
        if (element.type == choices.typeNode[1]) {
            for (var indice = 0; indice < len_community; indice++){
                element.communityMember[indice] = element.communityMember[indice] + len_node; 
            }
        }
        
        if (checkname(element.name)){
            element.name = element.type +' '+ String(element.id);
        }
        data.node.push(element);
    }
    // The Links
    for (element of data_added.link){
        element.id = element.id + len_link;
        element.source = element.source + len_node; 
        element.destination = element.destination + len_node; 
        element.name = 'Link ' + String(element.id);
        
        data.link.push(element);
    }

    // The Asset
    
    for (element of data_added.asset){
        element.id = element.id + len_asset;
        data.asset.push(element);
    }

    // the id unused
    for (id of data_added.idNodeUnused) {
        data.idNodeUnused.push(id + len_node)
    }
    for (id of data_added.idLinkUnused) {
        data.idLinkUnused.push(id + len_link)
    }
    for (id of data_added.idAssetUnused) {
        data.idAssetUnused.push(id + len_asset)
    }

}



function opNew() {
    data = {
        nodeAgentName: [],
        nodeAdministratorName: [],
        link: [],
        asset: [],
        node: [],
        idLinkUnused: [],
        idAssetUnused: [],
        idNodeUnused: [],
        old_onglet: "asset_1",
        oldNbAsset: 1
    }
    resetGraph();
}

function opExample() {
    var content = document.getElementById("content");
    content.innerHTML ="";

    // choice of the example
    var div = document.createElement("div");
    div.textContent = "Example : ";
    var selctElm1 = document.createElement("select");
    var opt = document.createElement("option");
    opt.setAttribute("value", '');
    opt.innerText = 'Select...';
    selctElm1.appendChild(opt);
    for (choice of choices.examples){
        var opt = document.createElement("option");
        opt.setAttribute("value", choice);
        opt.innerText = choice;
        selctElm1.appendChild(opt);
    }
    div.appendChild(selctElm1);
    content.appendChild(div);

    selctElm1.onchange = function() {
        this.options[0].disabled = true;
        // button to save the choice
        var div = document.createElement("div");
        div.id = "button_add_link";
        var buttonelm = document.createElement("input");

        buttonelm.type = "button";
        buttonelm.value = "Add link";
        buttonelm.onclick = clicOpExample;
        div.appendChild(buttonelm);
        content.appendChild(div);

    }

}

function clicOpExample() {
    var content = document.getElementById("content");
    var selects = content.getElementsByTagName("select");
    var value1 = selects[0].options[selects[0].selectedIndex].value
    switch(value1) {
        case choices.examples[0]:
            data = examplesCommunity;
            updateGraph();
        break
        case choices.examples[1]:
            data = examplesPToP;
            updateGraph();
        break
    }
}


function opFile(input) {
    console.log(input);
    var reader=new FileReader();
    reader.onload=function() {
        data=JSON.parse(reader.result);
        console.log("download");
        updateGraph();
	};
    reader.readAsText(input.files[0]);
}


function save() {
    var save = JSON.stringify(data);
    document.location="data:text/csv;base64,"+btoa(save);
}