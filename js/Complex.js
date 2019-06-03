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
        data.nodeAdministratorName.push(name_admin);
        data.node.push(admin);

        
        for(var i = 0; i < nb_agent; i++ ) {
            var name = names[i];
            var agent_temp = new Node(data.node.length,choices.typeNode[0],name,[],[id_admin],[],[]);
            nodes.push({ data: { id: data.node.length, name: name } });
            data.node.push(agent_temp);
            data.nodeAgentName.push(name);
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
    } 
} 

function addExample() {

}
function addFile() {

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

