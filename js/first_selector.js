// problème avec addAgent et addLink, je n'arrive pas à récuperer la valeur du select car c'est un object avant quand je mettais juste le nom
// je pouvais juste faire select.value ou choice.target.value lors d'un change 

window.onload = function()
{   var wrap = document.getElementById("first_selection");
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


}
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
        for (agent of data.nodeName) {
            var opt = document.createElement("option");
            opt.setAttribute("value", agent);
            opt.innerText = agent;
            selector3.appendChild(opt);
        }
        for(admin of data.nodeAdministratorName) {
            var opt = document.createElement("option");
            opt.setAttribute("value", admin);
            opt.innerText = admin;
            selector3.appendChild(opt);
        }
        wrap.insertBefore(selector3,button);
    }
    

}

function clicSelectChoice() {
    var selects = document.getElementsByTagName("select");
    var value1 = selects[0].value;
    var value2 = selects[1].value;
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
                    value3 = document.getElementById("name_node")
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
    opt.setAttribute("value", '');
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
    selctElm1.onchange = function(choice) {
        textElm.value = choice.target.value +' ' + String(data.counter);
    }
    textElm.onchange = checkname;
    div.appendChild(textElm);
    content.appendChild(div);
    
   
    
    // choice of trading partners
    var div = document.createElement("div");
    div.textContent = "Trading partners : ";
    var selctElm2 = document.createElement("select");
    selctElm2.id = 'trading';
    var opt = document.createElement("option");
    opt.setAttribute("value", undefined);
    opt.innerText = 'None';
    //selctElm2.appendChild(opt);
    for (node of data.node) {
        var opt = document.createElement("option");
        opt.setAttribute("value", node);
        opt.innerText = node.name;
        selctElm2.appendChild(opt);
    }
    div.appendChild(selctElm2);
    content.appendChild(div);


    // choice of community membership
    var div = document.createElement("div");
    div.textContent = "Community membership : ";
    div.id = "Community_membership_old"
    var selctElm3 = document.createElement("select");
    var opt = document.createElement("option");
    opt.setAttribute("value", '');
    opt.innerText = 'None';
    selctElm3.appendChild(opt);
    for(admin of data.node) {
        if(admin.type == choices.typeNode[1]){
            var opt = document.createElement("option");
            opt.setAttribute("value", admin);
            opt.innerText = admin.name;
            selctElm3.appendChild(opt); 
        }
        
    }
    div.appendChild(selctElm3);
    content.appendChild(div)
    selctElm2.onchange = function(choice) {
        //var selctElm2 = document.getElementById("trading");
        console.log(selctElm2.value.id);
        // choice of community membership
        var div = document.getElementById("Community_membership_old")
        var div2 = document.createElement("div");
        div2.textContent = "Community membership : ";
        var selctElm3 = document.createElement("select");
        var opt = document.createElement("option");
        opt.setAttribute("value", '');
        opt.innerText = 'None';
        selctElm3.appendChild(opt);
        for(admin of data.node) {
            if(admin.type == choices.typeNode[1] && admin.id !== choice.target.value.id){
                
                var opt = document.createElement("option");
                opt.setAttribute("value", admin);
                opt.innerText = admin.name;
                selctElm3.appendChild(opt); 
            }
            
        }
        div2.appendChild(selctElm3);
        content.replaceChild(div2,div)
        div2.id = "Community_membership_old";
        
    }
    // save of new data
    var div = document.createElement("div");
    var buttonelm = document.createElement("input");

    buttonelm.type = "button";
    buttonelm.value = "Add node";
    buttonelm.id = "button_select";
    buttonelm.onclick = clic2;
    div.appendChild(buttonelm);
    content.appendChild(div);   
    

    
    function clic2() {
        var content = document.getElementById("content");
        var selects = content.getElementsByTagName("select");
        var text = document.getElementById("node_name");
        var type_node = selects[0].value;
        var trading_partners = selects[1].value;
        var administrators = selects[2].value;

        var id_partner = [];
        var id_admin = [];
        for (partner of trading_partners)
        {
            id_partner.push(partner.id);
        }
        for (admin of administrators)
        {
            id_admin.push(admin.id);
        }


        var name = text.value;
        var agent_temp = new Node(data.counter,type_node,name,id_partner,id_admin,[],[] );
        data.node[data.counter] = agent_temp;
        console.log(data.node);
        if (type_node === choices.typeNode[0]) {
            data.nodeAgentName.push(name);
        } else if ( type_node === choices.typeNode[1] ) {
            data.nodeAdministratorName.push(name);
        }
        
        
        // create the links 
        for (id of id_partner) {
            var k = data.link.length;
            var link_temp = new Link(k,choices.typeLink[0],data.counter,id,0,0,'');
            data.link.push(link_temp);
        }
        for (id of id_admin) {
            var k = data.link.length;
            var link_temp = new Link(k,choices.typeLink[0],data.counter,id,0,0,'');
            data.link.push(link_temp);
        }
        data.counter += 1;
        //
    }
    
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
    console.log('ok pour ' + String(nb_agent) + ' Agent');
    var content = document.getElementById("content");
    content.innerHTML ="";
       
    // choice of the name of the community
    var div = document.createElement("div");
    div.textContent = "Community name : ";
    var textElm = document.createElement("input");
    textElm.id = "community_name";
    textElm.type = "text";
    textElm.value = choices.typeNode[1]+ ' ' + String(data.counter)
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
    var opt = document.createElement("option");
    opt.setAttribute("value", '');
    opt.innerText = 'None';
    selctElm2.appendChild(opt);
    for (node of data.node) {
        var opt = document.createElement("option");
        opt.setAttribute("value", node);
        opt.innerText = node.name;
        selctElm2.appendChild(opt);
    }
    div.appendChild(selctElm2);
    content.appendChild(div);
    
    // choice of the names of the agent
    var div = document.createElement("div");
    div.textContent = "Community member names : ";
    var textElm = document.createElement("input");
    textElm.id = "community_member_name";
    textElm.type = "text";
    var Chain_name =choices.typeNode[0]+ ' ' + String(data.counter +1);;
    for(var i = 1; i < nb_agent; i++ ) {
        Chain_name = Chain_name + ',' + choices.typeNode[0]+ ' ' + String(data.counter + 1 + i);
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
    buttonelm.onclick = clicAddComm;
    div.appendChild(buttonelm);
    content.appendChild(div);

    
    function clicAddComm() {
        var content = document.getElementById("content");
        var selects = content.getElementsByTagName("select");
        var text1 = document.getElementById("community_name");
        var text2 = document.getElementById("community_member_name");
        var community_objective = selects[0].value; 
        var trading_partners = selects[1].value;
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
        for (partner of trading_partners)
        {
            id_partner.push(partner.id);
        }
        var id_community_merber = [];
        for(var i = 0; i < nb_agent; i++ ) {
            id_community_merber.push(data.counter+1+i)
        }
        id_admin = data.counter;
        var admin = new Node(id_admin,choices.typeNode[1], name_admin, id_partner, [], [], [],community_objective, id_community_merber);
        data.nodeAdministratorName.push(name_admin);
        data.node.push(admin);

        for(var i = 0; i < nb_agent; i++ ) {
            data.counter = data.counter +1;
            var name = names[i];
            var agent_temp = new Node(data.counter,choices.typeNode[0],name,[],id_admin,[],[]);
            data.node.push(agent_temp);
            
            data.nodeAgentName.push(name);
        }
        data.counter += 1;
     
        
        // create the links 
        for (id of id_partner) {
            var k = data.link.length;
            var link_temp = new Link(k,choices.typeLink[0],id_admin,id,0,0,'');
            data.link.push(link_temp);
        }
        for (id of id_community_merber) {
            var k = data.link.length;
            var link_temp = new Link(k,choices.typeLink[1],id_admin,id,0,0,'');
            data.link.push(link_temp);
        }
    }

}
  
function addLink() {
    var content = document.getElementById("content");
    content.innerHTML ="";

    // choice of the type of the node
    var div = document.createElement("div");
    div.textContent = "Link type : ";
    var selctElm1 = document.createElement("select");
    /*var opt = document.createElement("option");
    opt.setAttribute("value", '');
    opt.innerText = 'Select...';
    selctElm1.appendChild(opt);*/
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
            /*var opt = document.createElement("option");
            opt.setAttribute("value", '');
            opt.innerText = 'Select...';
            selctElm2.appendChild(opt);*/
            for (node of data.node) {
                var opt = document.createElement("option");
                opt.setAttribute("value", node);
                opt.innerText = node.name;
                selctElm2.appendChild(opt);
            }
            
            div.appendChild(selctElm2);
            wrap.appendChild(div);
            
            
            selctElm2.onchange = function(choice) {
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
                var source = choice.target.value;
                /*var opt = document.createElement("option");
                opt.setAttribute("value", '');
                opt.innerText = 'Select...';
                selctElm3.appendChild(opt);*/
                for (agent of data.node) {
                    // show only node who don't have a link with the source
                    if ( source.id !== agent.id){
                        console.log(source)
                        console.log(agent)
                        if ( source.type === choices.typeNode[0] && source.partner.indexOf(agent.id) === -1 && source.administrator.indexOf(agent.id) === -1){
                            var opt = document.createElement("option");
                            opt.setAttribute("value", agent);
                            opt.innerText = agent;
                            selctElm3.appendChild(opt);

                        } else if ( source.type === choices.typeNode[0] && source.partner.indexOf(agent.id) === -1 && source.administrator.indexOf(agent.id) === -1 && source.communityMember.indexOf(agent.id) === -1 ) {
                            var opt = document.createElement("option");
                            opt.setAttribute("value", agent);
                            opt.innerText = agent;
                            selctElm3.appendChild(opt);
                        }          
                    }  
                }
                div.appendChild(selctElm3);
                div2.appendChild(div);
                wrap.appendChild(div2);

                selctElm3.onchange = function(choice2) {
                    var input1 = document.getElementById("preferenceSource");
                    var input2 = document.getElementById("preferenceDestination");

                    if (input1 !== null){
                        div2.removeChild(input1)
                        div2.removeChild(input2)
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
                    inputElm.id = "InputPreferenceDestination";
                    inputElm.min = 0;
                    inputElm.value = 0;
                    inputElm.placeholder = 0.0;
                    div.appendChild(inputElm);
                    div2.appendChild(div);

                    // button to save the choice
                    var div = document.createElement("div");
                    var buttonelm = document.createElement("input");

                    buttonelm.type = "button";
                    buttonelm.value = "Add link";
                    buttonelm.id = "button_add_link";
                    buttonelm.onclick = clicAddLink;
                    div.appendChild(buttonelm);
                    content.appendChild(div);
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
                opt.setAttribute("value", node);
                opt.innerText = node.name;
                selctElm2.appendChild(opt);
            }
            
            div.appendChild(selctElm2);
            wrap.appendChild(div);
            
            
            selctElm2.onchange = function(choice) {
                // remove the elements that we don't need on the page
                var div2er = document.getElementById("div2");
                if (div2er !== null){
                    wrap.removeChild(div2er);
                } 
                var div2 = document.createElement("div");
                div2.id = "div2";


                // choice of the community manager
                var div = document.createElement("div");
                div.textContent = "destination : ";
                var selctElm3 = document.createElement("select");
                var source = choice.target.value;
                var opt = document.createElement("option");
                opt.setAttribute("value", '');
                opt.innerText = 'Select...';
                selctElm3.appendChild(opt);
                for (agent of data.node) {
                    // show only node which don't have a link with the source
                    if ( source.id!== agent.id && agent.type === choices.typeNode[0] ){
                        if ( source.type === choices.typeNode[0] && source.partner.indexOf(agent.id) === -1 && source.administrator.indexOf(agent.id) === -1){
                            var opt = document.createElement("option");
                            opt.setAttribute("value", agent);
                            opt.innerText = agent;
                            selctElm3.appendChild(opt);

                        } else if ( source.type === choices.typeNode[1] && source.partner.indexOf(agent.id) === -1 && source.administrator.indexOf(agent.id) === -1 && source.communityMember.indexOf(agent.id) === -1 ) {
                            var opt = document.createElement("option");
                            opt.setAttribute("value", agent);
                            opt.innerText = agent;
                            selctElm3.appendChild(opt);
                        }          
                    }  
                }
                div.appendChild(selctElm3);
                div2.appendChild(div);
                wrap.appendChild(div2);
                 // button to save the choice
                var div = document.createElement("div");
                var buttonelm = document.createElement("input");

                buttonelm.type = "button";
                buttonelm.value = "Add link";
                buttonelm.id = "button_add_link";
                buttonelm.onclick = clicAddLink;
                div.appendChild(buttonelm);
                content.appendChild(div);
            }
            content.appendChild(wrap);
        }
    }
}
function clicAddLink() {
    var content = document.getElementById("content");
    var selects = content.getElementsByTagName("select");
    var text = document.getElementById("link_name");
    var input1 = document.getElementById("inputPreferenceSource");
    var input2 = document.getElementById("inputPreferenceDestination");

    var type_link = selects[0].value;
    var source = selects[1].value;
    var destination = selects[2].value;
    var name = text.value;
    var counter = data.link.length;
    var weightSrc = input1.value;
    var weightDest = input2.value;
    var link_temp = new Link(counter,type_link,source.id,destination.id,name,weightSrc,weightDest);
    data.link.push(link_temp);
    console.log(data.link);
    if (type_link === choices.typeLink[0]) {
        data.node[source.id].partner.push(destination.id);
        data.node[destination.id].partner.push(source.id);

    } else if (type_link === choices.typeLink[1]) {
        data.node[source.id].administrator.push(destination.id);
        data.node[destination.id].communityMember.push(source.id)
    }
}




function addExample() {

}
function addFile() {

}
function modAgCom(nodeName) {

}
function modLink() {

}
function delAgCom() {

}
function delLink() {

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


