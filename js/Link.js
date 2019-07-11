  
function addLink() {
    var content = document.getElementById("content");
    content.innerHTML ="";

    // choice of the type of the link
    var div = document.createElement("div");
    var h3 = document.createElement("h3");
    h3.textContent = "Link type : ";
    div.appendChild(h3);
    div.className = "form";
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
    selctElm1.id = "link_type"
    new SlimSelect({
        select: '#link_type'
    })
    
    selctElm1.onchange = function(choice) {
        this.slim.data.data[0].disabled= true; // remove the choice select
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
            var h3 = document.createElement("h3");
            h3.textContent = "Source : ";
            div.appendChild(h3);
            div.className = "form";
             
            var selctElm2 = document.createElement("select");
            var opt = document.createElement("option");
            opt.setAttribute("value", '');
            opt.innerText = 'Select...';
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
            wrap.appendChild(div);
            content.appendChild(wrap);
            selctElm2.id = "first";
            new SlimSelect({
                select: '#first'
            })
            
            selctElm2.onchange = function(choice) {
                this.slim.data.data[0].disabled= true; // remove the choice select
                // remove the elements that we don't need on the page
                var div2er = document.getElementById("div2");
                if (div2er !== null){
                    wrap.removeChild(div2er);
                } 
                var div2 = document.createElement("div");
                div2.id = "div2";


                // choice of the new partners
                var div = document.createElement("div");
                var h3 = document.createElement("h3");
                h3.textContent = "New partners : ";
                div.appendChild(h3);
                div.className = "form";
                
                var selctElm3 = document.createElement("select");
                selctElm3.id = 'members';
                selctElm3.multiple = "multiple";
                selctElm3.size = 2;

                var source = data.node[choice.target.value];
                var opt = document.createElement("option");
                opt.setAttribute("value", 'All');
                opt.innerText = 'All';
                selctElm3.appendChild(opt);
                for (agent of data.node) {
                    // show only node who don't have a link with the source
                    if (agent != undefined){
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
                }
                div.appendChild(selctElm3);
                div2.appendChild(div);
                wrap.appendChild(div2)
                new SlimSelect({
                    select: '#members'
                })

                selctElm3.onchange = function(choice2) {
                    /*if (this.options[0].selected){
                        for (opt of this.options){
                            opt.selected = true;
                        }
                    } this is not compatible with the navigator edge...*/
                    
                    if (this.options[0].selected){
                        for (opt of Object.keys(this.options)){
                            this.options[Number(opt)].selected = true;
                        }
                    }

                    
                    var input1 = document.getElementById("preferenceSource");
                    var input2 = document.getElementById("preferenceDestination");
                    var input3 = document.getElementById("button_add_link")

                    if (input1 !== null){
                        div2.removeChild(input1)
                        div2.removeChild(input2)
                        div2.removeChild(input3)
                    } 
                    var div = document.createElement("div")
                    var h3 = document.createElement("h3");
                    h3.textContent = "Preference of the source : ";
                    div.appendChild(h3);
                    div.className = "form";
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
                    var h3 = document.createElement("h3");
                    h3.textContent = "Preference of the destinations : ";
                    div.appendChild(h3);
                    div.className = "form";
                    
                    div.id = "preferenceDestination"
                    var inputElm = document.createElement("input");
                    inputElm.type = "text";
                    inputElm.id = "inputPreferenceDestination";

                    var nb_members = 0;
                    for (var i=1; i < this.options.length; i++) 
                    {
                        if (this.options[i].selected) 
                        {
                            nb_members = nb_members +1;
                        }
                    }

                    var Chain = '0 ;';
                    for (var index =1; index < nb_members; index ++) {
                        Chain = Chain + ' 0 ;';
                    }
                    inputElm.value = Chain;
                    div.appendChild(inputElm);
                    div2.appendChild(div);

                    // button to save the choice
                    var div = document.createElement("div");
                    div.id = "button_add_link";
                    var buttonelm = document.createElement("input");

                    buttonelm.type = "button";
                    buttonelm.value = "Add links";
                    buttonelm.onclick = clicAddLink;
                    div.appendChild(buttonelm);
                    div2.appendChild(div);
                }
                
            }
            
            
            

        } else if (choice.target.value === choices.typeLink[1]){
            // choice of the community manager
            var div = document.createElement("div");
            var h3 = document.createElement("h3");
            h3.textContent = "Community manager : ";
            div.appendChild(h3);
            div.className = "form";
            var selctElm2 = document.createElement("select");
            
            var opt = document.createElement("option");
            opt.setAttribute("value", '');
            opt.innerText = 'Select...';
            selctElm2.appendChild(opt);
            for (admin of data.node) {
                if (admin != undefined){
                    if (admin.type == choices.typeNode[1]){
                        var opt = document.createElement("option");
                        opt.setAttribute("value", admin.id);
                        opt.innerText = admin.name;
                        selctElm2.appendChild(opt);
                    }
                }
            }
            
            div.appendChild(selctElm2);
            wrap.appendChild(div);
            content.appendChild(wrap);
            selctElm2.id = "first"
            new SlimSelect({
                select: '#first'
            })
                   
            
            selctElm2.onchange = function(choice) {
                this.slim.data.data[0].disabled= true; // remove the choice select
                // remove the elements that we don't need on the page
                var div2er = document.getElementById("div2");
                if (div2er !== null){
                    wrap.removeChild(div2er);
                } 
                var div2 = document.createElement("div");
                div2.id = "div2";


                // choice of the new community members
                var div = document.createElement("div");
                var h3 = document.createElement("h3");
                h3.textContent = "New community members : ";
                div.appendChild(h3);
                div.className = "form";
                var selctElm3 = document.createElement("select");
                selctElm3.id = 'members';
                selctElm3.multiple = "multiple";
                selctElm3.size = 2;

                var source = data.node[choice.target.value];
                var opt = document.createElement("option");
                opt.setAttribute("value", '');
                opt.innerText = 'All';
                selctElm3.appendChild(opt);
                for (agent of data.node) {
                    if (agent != undefined) {
                        if ( source.id != agent.id ){
                            if (source.partners.indexOf(agent.id) === -1 && source.administrator.indexOf(agent.id) === -1 && source.communityMember.indexOf(agent.id) === -1 ) {
                                var opt = document.createElement("option");
                                opt.setAttribute("value", agent.id);
                                opt.innerText = agent.name;
                                selctElm3.appendChild(opt);
                            }          
                        }  
                    }
                    // show only node which don't have a link with the source  
                }
                div.appendChild(selctElm3);
                div2.appendChild(div);
                wrap.appendChild(div2);
                new SlimSelect({
                    select: '#members'
                })    

                selctElm3.onchange = function() {
                    if (this.options[0].selected){
                        for (opt of this.options){
                            console.log("hello")
                            opt.selected = true;
                        }
                    } // remove the choice select
                    var input1 = document.getElementById("preferenceSource");
                    var input2 = document.getElementById("preferenceDestination");
                    var input3 = document.getElementById("button_add_link")

                    if (input1 !== null){
                        div2.removeChild(input1)
                        div2.removeChild(input2)
                        div2.removeChild(input3)
                    } 
                    var div = document.createElement("div")
                    var h3 = document.createElement("h3");
                    h3.textContent = "Preference of the community manager : ";
                    div.appendChild(h3);
                    div.className = "form";
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
                    var h3 = document.createElement("h3");
                    h3.textContent = "Preference of the agents : ";
                    div.appendChild(h3);
                    div.className = "form";
                    div.id = "preferenceDestination"
                    var inputElm = document.createElement("input");
                    inputElm.type = "text";
                    inputElm.id = "inputPreferenceDestination";

                    var nb_members = 0;
                    for (var i=1; i < this.options.length; i++) 
                    {
                        if (this.options[i].selected) 
                        {
                            nb_members = nb_members +1;
                        }
                    }

                    var Chain = '0 ;';
                    for (var index =1; index < nb_members; index ++) {
                        Chain = Chain + ' 0 ;';
                    }
                    inputElm.value = Chain;
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
                
            }
            
        } else if (choice.target.value === choices.typeLink[2]){
            
            wrap.textContent = "This action is irreversible, this will delete all community manager and create partnership links between all agents";
            // button to save the choice
            var div = document.createElement("div");
            div.id = "button_add_link";
            var buttonelm = document.createElement("input");

            buttonelm.type = "button";
            buttonelm.value = "Add link";
            buttonelm.onclick = clicAddLink;
            div.appendChild(buttonelm);

            wrap.appendChild(div);
            content.appendChild(wrap);
        } else if (choice.target.value === choices.typeLink[3]){
            wrap.textContent = "This action is irreversible, this will delete all community manager and create partnership links agents of different types";
            // button to save the choice
            var div = document.createElement("div");
            div.id = "button_add_link";
            var buttonelm = document.createElement("input");

            buttonelm.type = "button";
            buttonelm.value = "Add link";
            buttonelm.onclick = clicAddLink;
            div.appendChild(buttonelm);

            wrap.appendChild(div);
            content.appendChild(wrap);
        }
    }
}
function clicAddLink() {
    console.log("saving...")
    var content = document.getElementById("content");
    var selects = content.getElementsByTagName("select");
    var inputs = content.getElementsByTagName("input");
    
    var links = [];

    var type_link = selects[0].options[selects[0].selectedIndex].value;
    console.log(type_link)
    if (type_link == choices.typeLink[2]){ 
        
        // delete all the community managers
        for (admin of data.node){
            if (admin != undefined && admin.type == choices.typeNode[1]){
                hDelAgent(admin.id)

            }
        }
         // add all link need
        var len = data.node.length;
        for(var index1 = 0; index1 < len-1; index1++){
            var source = data.node[index1];
            if (source != undefined) {
                for (var index2 = index1+1; index2<len; index2++){
                    var destination = data.node[index2];
                    if (destination != undefined && !source.partners.includes(destination.id)){
                        if ( data.idLinkUnused.length >0 ) {
                            var id_link = data.idLinkUnused.shift();                
                        } else {
                            var id_link = data.link.length;
                        }
                        name = 'Link ' + String(id_link);
                        var link_temp = new Link(id_link,choices.typeLink[0],source.id,destination.id,name,0,0);
                        links.push({data: { id: 'l'+id_link, source: source.id, target: destination.id, group: choices.typeLink[0]}});
                        data.node[index1].partners.push(destination.id);
                        data.node[index2].partners.push(source.id);
                        data.link[id_link] = link_temp;
                    }
                }
            }
            
        }
       
    } else if (type_link == choices.typeLink[3]){
         // delete all the community managers
         for (admin of data.node){
            if (admin != undefined && admin.type == choices.typeNode[1]){
                hDelAgent(admin.id)

            }
        }
        // add all link need
        var len = data.node.length;
        for(var index1 = 0; index1 < len-1; index1++){
            var source = data.node[index1];
            if (source != undefined) {
                var type_source = source.typeAgent;
                for (var index2 = index1+1; index2<len; index2++){
                    var destination = data.node[index2];
                    if (destination != undefined && !source.partners.includes(destination.id)){
                        var type_destination = destination.typeAgent;
                        if (type_source == choices.typeAgent[2] || type_destination == choices.typeAgent[2] || type_source != type_destination ){
                            if ( data.idLinkUnused.length >0 ) {
                                var id_link = data.idLinkUnused.shift();                
                            } else {
                                var id_link = data.link.length;
                            }
                            name = 'Link ' + String(id_link);
                            var link_temp = new Link(id_link,choices.typeLink[0],source.id,destination.id,name,0,0);
                            links.push({data: { id: 'l'+id_link, source: source.id, target: destination.id, group:choices.typeLink[0]}});
                            data.node[index1].partners.push(destination.id);
                            data.node[index2].partners.push(source.id);
                            data.link[id_link] = link_temp;
                            }
                        
                    }
                }
            }
            
        }


    }
    
    else {
        var source = Number(selects[1].options[selects[1].selectedIndex].value);
        var members = [];
        for (var i=1; i < selects[2].options.length; i++) 
        {
            if (selects[2].options[i].selected) 
            {
                members.push(Number(selects[2].options[i].value));
            }
        }
        var weightSrc = Number(inputs[1].value);
        var chain_weightDest =inputs[2].value;
        var weightDest =[];
        var weightDest_temp ='';
        k = 0;
        for (chiffre of chain_weightDest) {
            if (k < members.length) {
                if (chiffre !== ';') {
                    weightDest_temp = weightDest_temp + chiffre;
                } else {
                    number = Number(weightDest_temp);
                    if (number != number) {
                        console.log("Warning it was not the good syntax, preference set at 0");
                        number = 0;
                    }
                    weightDest.push(number);
                    weightDest_temp = '';
                    k = k+1;
                }
            }
        }
        if (k < members.length){
            number = Number(weightDest_temp);
            if (number != number) {
                console.log("Warning it was not the good syntax preference set at 0");
                number = 0;
            }
            weightDest.push(number);
        }
        
        for (member of members) {
            if ( data.idLinkUnused.length >0 ) {
                var id_link = data.idLinkUnused.shift();                
            } else {
                var id_link = data.link.length;
            }
            name = 'Link' + String(id_link);
            var link_temp = new Link(id_link,type_link,source,member,name,weightSrc,weightDest.shift());
            data.link[id_link] = link_temp;
            links.push({data: { id: 'l'+id_link, source: source, target: member, group: type_link }});
            if (type_link == choices.typeLink[1]){
                data.node[source].communityMember.push(member);
                data.node[member].administrator.push(source);
            } else if (type_link == choices.typeLink[0]){ 
                data.node[source].partners.push(member);
                data.node[member].partners.push(source);
            }
        }
    }
   
    // update the graph

    cy.add(links);
    cy.center()
    
    var layout = cy.elements().layout({
        name: 'cose'
        });
    layout.run();

    // update the page

    addLink();
}

function modLink(linkId = undefined ) {
    var content = document.getElementById("content");
    content.innerHTML ="";
    if (linkId != undefined){
        var oldLink = data.link[linkId];
    }

    // choice of the type of the link
    var div = document.createElement("div");
    var h3 = document.createElement("h3");
    h3.textContent = "Link type : ";
    div.appendChild(h3);
    div.className = "form";
    var selctElm1 = document.createElement("select");
    var opt = document.createElement("option");
    opt.setAttribute("value", '');
    opt.innerText = 'Select...';
    selctElm1.appendChild(opt);
    for (choice of choices.typeLinkMod){
        var opt = document.createElement("option");
        opt.setAttribute("value", choice);
        opt.innerText = choice;
        selctElm1.appendChild(opt);
        if (linkId != undefined){
            if (choice == oldLink.type){
                opt.selected = true;
            }
        }
    }
    selctElm1.id = "link_type";
    div.appendChild(selctElm1);
    content.appendChild(div);
    new SlimSelect({
        select: '#link_type'
    })

    //console.log(linkId)
    if (linkId != undefined){
        
        var source = data.node[oldLink.source];
        var wrap = document.createElement("div");
        wrap.id = "wrap"
        var div = document.createElement("div");
        var h3 = document.createElement("h3");
        h3.textContent = "Between : ";
        div.appendChild(h3);
        div.className = "form";
        var selctElm2 = document.createElement("select");
        var opt = document.createElement("option");
        opt.setAttribute("value", oldLink.source);
        opt.innerText = source.name;
        selctElm2.appendChild(opt);
        div.appendChild(selctElm2);
        wrap.appendChild(div);
        content.appendChild(wrap);
        selctElm2.id = "source"
        new SlimSelect({
            select: '#source'
        })
              
        var div2 = document.createElement("div");
        div2.id = "div2";
        var div = document.createElement("div");
        var h3 = document.createElement("h3");
        h3.textContent = "And : ";
        div.appendChild(h3);
        div.className = "form";
        
        var selctElm3 = document.createElement("select");
        var opt = document.createElement("option");
        opt.setAttribute("value", oldLink.id);
        var destination = data.node[oldLink.destination];
        opt.innerText = destination.name ;
        selctElm3.appendChild(opt);
        div.appendChild(selctElm3);
        div2.appendChild(div);
        wrap.appendChild(div2);
        selctElm3.id = "dest"
        new SlimSelect({
            select: '#dest'
        })

        var div = document.createElement("div")
        var h3 = document.createElement("h3");
        h3.textContent = "Preference of the first node : ";
        div.appendChild(h3);
        div.className = "form";
        
        div.id = "preferenceFirstNode"
        var inputElm = document.createElement("input");
        inputElm.type = "number";
        inputElm.step = "any";
        inputElm.value = oldLink.weightSrc;
        inputElm.id = "inputPreferenceFirstNode";
        inputElm.min = 0;

        div.appendChild(inputElm);
        div2.appendChild(div);


        var div = document.createElement("div")
        var h3 = document.createElement("h3");
        h3.textContent = "Preference of the second node : ";
        div.appendChild(h3);
        div.className = "form";
        
        div.id = "preferenceSecondNode"
        var inputElm = document.createElement("input");
        inputElm.type = "number";
        inputElm.step = "any";
        inputElm.id = "InputPreferenceSecondNode";
        inputElm.min = 0;
        inputElm.value = oldLink.weightDest;
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

    
    selctElm1.onchange = function(choice) {
        this.slim.data.data[0].disabled= true; // remove the choice select
        
        // remove the elements that we don't need on the page
        var wrapper = document.getElementById("wrap");
        if (wrapper !== null){
            content.removeChild(wrapper)
        } 
        var wrap = document.createElement("div");
        wrap.id = "wrap"

       
        // choice of the first componant
        var div = document.createElement("div");
        var h3 = document.createElement("h3");
        h3.textContent = "Between : ";
        div.appendChild(h3);
        div.className = "form";

        var selctElm2 = document.createElement("select");
        var opt = document.createElement("option");
        opt.setAttribute("value", '');
        opt.innerText = 'Select...';
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
        wrap.appendChild(div);
        content.appendChild(wrap);
        selctElm2.id = "first"
        new SlimSelect({
            select: '#first'
        })

        selctElm2.onchange = function(choice) {
            this.slim.data.data[0].disabled= true; // remove the choice select
            // remove the elements that we don't need on the page
            var div2er = document.getElementById("div2");
            if (div2er !== null){
                wrap.removeChild(div2er);
            } 
            var div2 = document.createElement("div");
            div2.id = "div2";


            // choice of the second componant
            var div = document.createElement("div");
            var h3 = document.createElement("h3");
            h3.textContent = "And : ";
            div.appendChild(h3);
            div.className = "form";
        
            var selctElm3 = document.createElement("select");
            var firstnode = data.node[choice.target.value];
            var opt = document.createElement("option");
            opt.setAttribute("value", '');
            opt.innerText = 'Select...';
            selctElm3.appendChild(opt);
            
            for (link of data.link) {
                if (link != undefined){
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
            }
            div.appendChild(selctElm3);
            div2.appendChild(div);
            wrap.appendChild(div2);
            selctElm3.id = "second"
            new SlimSelect({
                select: '#second'
            })

            selctElm3.onchange = function(choice2) {
                this.slim.data.data[0].disabled= true; // remove the choice select
                var input1 = document.getElementById("preferenceFirstNode");
                var input2 = document.getElementById("preferenceSecondNode");
                var input3 = document.getElementById("button_mod_link")

                if (input1 !== null){
                    div2.removeChild(input1)
                    div2.removeChild(input2)
                    div2.removeChild(input3)
                } 
                var div = document.createElement("div");
                var h3 = document.createElement("h3");
                h3.textContent = "Preference of the first node : ";
                div.appendChild(h3);
                div.className = "form";
                
                div.id = "preferenceFirstNode";
                var inputElm = document.createElement("input");
                inputElm.type = "number";
                inputElm.step = "any";
                inputElm.value = 0;
                inputElm.id = "inputPreferenceFirstNode";
                inputElm.min = 0;
                inputElm.placeholder = 0.0;

                div.appendChild(inputElm);
                div2.appendChild(div);


                var div = document.createElement("div");
                var h3 = document.createElement("h3");
                h3.textContent = "Preference of the second node : ";
                div.appendChild(h3);
                div.className = "form";
                
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
    console.log(link)
    data.link[id_link] = link;
    
    // update the page
    modLink()
   
}


function delLink() {
    var content = document.getElementById("content");
    content.innerHTML ="";

    // choice of the type of the link
    var div = document.createElement("div");
    var h3 = document.createElement("h3");
    h3.textContent = "Link type : ";
    div.appendChild(h3);
    div.className = "form";
    
    var selctElm1 = document.createElement("select");
    var opt = document.createElement("option");
    opt.setAttribute("value", '');
    opt.innerText = 'Select...';
    selctElm1.appendChild(opt);
    for (choice of choices.typeLinkMod){
        var opt = document.createElement("option");
        opt.setAttribute("value", choice);
        opt.innerText = choice;
        selctElm1.appendChild(opt);
    }
    div.appendChild(selctElm1);
    content.appendChild(div);
    selctElm1.id = "type_link"
        new SlimSelect({
            select: '#type_link'
        })
    
    selctElm1.onchange = function(choice) {
        this.slim.data.data[0].disabled= true; // remove the choice select
        
        // remove the elements that we don't need on the page
        var wrapper = document.getElementById("wrap");
        if (wrapper !== null){
            content.removeChild(wrapper)
        } 
        var wrap = document.createElement("div");
        wrap.id = "wrap"

       
        // choice of the first componant
        var div = document.createElement("div");
        var h3 = document.createElement("h3");
        h3.textContent = "Between : ";
        div.appendChild(h3);
        div.className = "form";
        
        var selctElm2 = document.createElement("select");
        var opt = document.createElement("option");
        opt.setAttribute("value", '');
        opt.innerText = 'Select...';
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
        wrap.appendChild(div);
        selctElm2.id = "first"
        new SlimSelect({
            select: '#first'
        })
        
        selctElm2.onchange = function(choice) {
            this.slim.data.data[0].disabled= true; // remove the choice select
            // remove the elements that we don't need on the page
            var div2er = document.getElementById("div2");
            if (div2er !== null){
                wrap.removeChild(div2er);
            } 
            var div2 = document.createElement("div");
            div2.id = "div2";


            // choice of the second componant
            var div = document.createElement("div");
            var h3 = document.createElement("h3");
            h3.textContent = "And : ";
            div.appendChild(h3);
            div.className = "form";
            
            var selctElm3 = document.createElement("select");
            var firstnode = data.node[choice.target.value];
            var opt = document.createElement("option");
            opt.setAttribute("value", '');
            opt.innerText = 'Select...';
            selctElm3.appendChild(opt);
            
            for (link of data.link) {
                if (link != undefined) {
                    // show only node who have a link with the source
                    //console.log(selctElm1.options[selctElm1.selectedIndex].value);
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
            }
            div.appendChild(selctElm3);
            div2.appendChild(div);
            wrap.appendChild(div2);
            selctElm3.id = "second"
            new SlimSelect({
                select: '#second'
            })

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
    var link = data.link[id_link];

    if (link.type == choices.typeLink[0]){
        data.node[link.source].partners.splice(data.node[link.source].partners.indexOf(link.destination),1);
        data.node[link.destination].partners.splice(data.node[link.destination].partners.indexOf(link.source),1);
    } else if (link.type == choices.typeLink[1]){
        data.node[link.source].communityMember.splice(data.node[link.source].communityMember.indexOf(link.destination),1);
        data.node[link.destination].administrator.splice(data.node[link.destination].administrator.indexOf(link.source),1);
    }
    delete data.link[id_link];
    data.idLinkUnused.push(id_link);

    // update the graph
    var id = 'l' + id_link; 
    var elem = cy.getElementById(id);
    cy.remove( elem );

    var layout = cy.elements().layout({
        name: 'cose'
        });
    layout.run();

    // update the page

    delLink();


}
