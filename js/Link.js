  
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
                if (node != undefined) {
                    var opt = document.createElement("option");
                    opt.setAttribute("value", node.id);
                    opt.innerText = node.name;
                    selctElm2.appendChild(opt);
                }
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
            // choice of the community manager
            var div = document.createElement("div");
            div.textContent = "Community manager : ";
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
            
            
            
            
            selctElm2.onchange = function(choice) {
                this.options[0].disabled = true; // remove the choice select
                // remove the elements that we don't need on the page
                var div2er = document.getElementById("div2");
                if (div2er !== null){
                    wrap.removeChild(div2er);
                } 
                var div2 = document.createElement("div");
                div2.id = "div2";


                // choice of the new community members
                var div = document.createElement("div");
                div.textContent = "New community members : ";
                var selctElm3 = document.createElement("select");
                selctElm3.id = 'members';
                selctElm3.multiple = "multiple";
                selctElm3.size = 2;

                var source = data.node[choice.target.value];
                var opt = document.createElement("option");
                opt.setAttribute("value", '');
                opt.innerText = 'Select...';
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
                    div.textContent = "Preference of the agents : ";
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
                    for (var indice =1; indice < nb_members; indice ++) {
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
                wrap.appendChild(div2);
                new SlimSelect({
                    select: '#members'
                })
                
            }
            
        }
    }
}
function clicAddLink() {
    console.log("saving...")
    var content = document.getElementById("content");
    var selects = content.getElementsByTagName("select");
    var text = document.getElementById("link_name");
    var inputs = content.getElementsByTagName("input");
    

    var type_link = selects[0].options[selects[0].selectedIndex].value;
    
    if (type_link == choices.typeLink[0]) {
        var first_node = selects[1].options[selects[1].selectedIndex].value;
        var second_node = selects[2].options[selects[2].selectedIndex].value;
        var name = text.value;

        if ( data.idLinkUnused.length >0 ) {
            var id_link = data.idLinkUnused.shift();                
        } else {
            var id_link = data.link.length;
        }
        var weightSrc = Number(inputs[1].value);
        var weightDest = Number(inputs[2].value);
        var source = Number(first_node);
        var destination = Number(second_node);
        var link_temp = new Link(id_link,type_link,source,destination,name,weightSrc,weightDest);
        data.link.push(link_temp);
        console.log(data.link);
        
        data.node[source].partners.push(destination);
        data.node[destination].partners.push(source);

    } else if (type_link == choices.typeLink[1]) {
        var admin = Number(second_node);
        var members = [];
        for (var i=0; i < selects[2].options.length; i++) 
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
            var link_temp = new Link(id_link,type_link,admin,member,name,weightSrc,weightDest.shift());
            data.link.push(link_temp);
            data.node[admin].communityMember.push(member);
            data.node[member].administrator.push(admin);
        }
    }

}

function modLink(linkId = undefined ) {
    var content = document.getElementById("content");
    content.innerHTML ="";
    if (linkId != undefined){
        var oldLink = data.link[linkId];
    }

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
        if (linkId != undefined){
            if (choice == oldLink.type){
                opt.selected = true;
            }
        }
    }
    div.appendChild(selctElm1);
    content.appendChild(div);

    console.log(linkId)
    if (linkId != undefined){
        
        var source = data.node[oldLink.source];
        var wrap = document.createElement("div");
        wrap.id = "wrap"
        var div = document.createElement("div");
        div.textContent = "Between : ";
        var selctElm2 = document.createElement("select");
        var opt = document.createElement("option");
        opt.setAttribute("value", oldLink.source);
        opt.innerText = source.name;
        selctElm2.appendChild(opt);
        div.appendChild(selctElm2);
        wrap.appendChild(div);
              
        var div2 = document.createElement("div");
        div2.id = "div2";
        var div = document.createElement("div");
        div.textContent = "And : ";
        var selctElm3 = document.createElement("select");
        var opt = document.createElement("option");
        opt.setAttribute("value", oldLink.destination);
        var destination = data.node[oldLink.destination];
        opt.innerText = destination.name ;
        selctElm3.appendChild(opt);
        div.appendChild(selctElm3);
        div2.appendChild(div);
        wrap.appendChild(div2);

        var div = document.createElement("div")
        div.textContent = "Preference of the first node : ";
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
        div.textContent = "Preference of the second node : ";
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

        content.appendChild(wrap);

    }

    
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
            if (node != undefined) {
                var opt = document.createElement("option");
                opt.setAttribute("value", node.id);
                opt.innerText = node.name;
                selctElm2.appendChild(opt);
            } 
            
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
            if (node != undefined){
                var opt = document.createElement("option");
                opt.setAttribute("value", node.id);
                opt.innerText = node.name;
                selctElm2.appendChild(opt);
            }
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
}
