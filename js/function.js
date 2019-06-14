function checkname(choice) {
    //var text = document.getElementById("node_name");
    if (choice.target == undefined){
        var node_name = choice;
    } else {
        var node_name = choice.target.value;
    }
    for (node of data.node ) {
        if (node_name === node.name){
            console.log("Beware name already used");
            return true;
        }
    }
    return false
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


function hDelLinks(id_node) {
    for (link of data.link) {
        if (link !=undefined) {
            if (link.source == id_node || link.destination == id_node){
                var id_link = link.id;
                delete data.link[id_link];
                data.idLinkUnused.push(id_link);
                var edge = cy.getElementById('l'+id_link);
                cy.remove(edge);
            }
        }
        
    }
}
function hDelAgent(id_node) {
    
    var agent = data.node[id_node];
    if (agent != undefined) {
        for (partner of agent.partners) {
            if ( data.node[partner].partners.indexOf(id_node) != -1 ) {
                data.node[partner].partners.splice(data.node[partner].partners.indexOf(id_node),1);
            }
        }
        for (admin of agent.administrator){
            if ( data.node[admin].communityMember.indexOf(id_node) != -1 ) {
                data.node[admin].communityMember.splice(data.node[admin].communityMember.indexOf(id_node),1);
            }
        }
        if(data.node[id_node].type == choices.typeNode[1]) {
            for (member of agent.communityMember){
                if (data.node[member].administrator.indexOf(id_node) != -1 ) {
                    data.node[member].administrator.splice(data.node[member].administrator.indexOf(id_node),1);
                }
            }
        }
    
        hDelLinks(id_node);
    
        for (asset of agent.asset ){
            delete data.asset[asset];
            data.idAssetUnused.push(asset)
        }
        delete data.node[id_node];
        data.idNodeUnused.push(Number(id_node));
        var node = cy.getElementById(String(id_node));
        cy.remove(node);
    }

    
}


function change_onglet2(name) {
    
    var div = document.getElementById("parameters_selection")
    div2 = document.getElementById("contenu_onglet2_Parameters")
    
    /*if (div != null){
        div2.removeChild(div);
    }*/
    
    
    if(name == "Parameters"){
        parameters()
    }
    
    
    
    document.getElementById('onglet_'+name).className = 'onglet2_1 onglet';
    document.getElementById('contenu_onglet2_'+name).style.display = 'block';
    var old = data.old_onglet2;
    data.old_onglet2 = name;
    
    document.getElementById('onglet_' + old).className = 'onglet2_0 onglet';
    document.getElementById('contenu_onglet2_'+ old).style.display = 'none';
    
    
    
            
}

function changeCommission(select) {
    console.log(select.options[select.selectedIndex].value);
}