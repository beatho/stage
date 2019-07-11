// this function look at if the name is already used for node (return true) or not (return false)
// choice can be the name or the input where we write the name

function checkname(choice) {
    //var text = document.getElementById("node_name");
    if (choice.target == undefined){
        var node_name = choice;
    } else {
        var node_name = choice.target.value;
    }
    for (node of data.node ) {
        if (node != undefined){
            if (node_name === node.name){
                console.log("Beware name already used");
                return true;
            }
        }
    }
    return false
}

// this fonction change the visible tab for the asset
function change_tab(name) {
    return function() {
        document.getElementById('tab_'+name).className = 'tab_1 tab';
        document.getElementById('content_tab_'+name).style.display = 'block';
        var old = data.old_tab;
        data.old_tab = name;
        // si élément supprimé affiche erreur mais fonctionne !
        document.getElementById('tab_' + old).className = 'tab_0 tab';
        document.getElementById('content_tab_'+ old).style.display = 'none';
        
    }
            
} 

// this function delete all links of the node which have this id (but don't change the nodes).
//So this function is not made to be used alone (because even if the link disappear, the nodes remind partners or in  the community) 
function hDelLinks(Id_node) {
    id_node = Number(Id_node)
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

// this function delete the node who have this id; this will called the function hDelLinks; this will remove this id of all other partner's, admin's, member's nodes
function hDelAgent(Id_node, flag_asset =true ) {
    id_node = Number(Id_node)
    var agent = data.node[id_node];
    if (agent != undefined) {
        for (partner of agent.partners) {
            if (data.node[partner] != undefined){
                if ( data.node[partner].partners.indexOf(id_node) != -1 ) {
                    data.node[partner].partners.splice(data.node[partner].partners.indexOf(id_node),1);
                }
            }
            
           
        }
        for (admin of agent.administrator){
            if (data.node[admin] != undefined){
                if ( data.node[admin].communityMember.indexOf(id_node) != -1 ) {
                    data.node[admin].communityMember.splice(data.node[admin].communityMember.indexOf(id_node),1);
                }
            }
        }
        if(data.node[id_node].type == choices.typeNode[1]) {
            for (member of agent.communityMember){
                if (data.node[member]!= undefined){
                    if (data.node[member].administrator.indexOf(id_node) != -1 ) {
                        data.node[member].administrator.splice(data.node[member].administrator.indexOf(id_node),1);
                    }
                }
            }
        }
    
        hDelLinks(id_node);
        if (flag_asset) {
            for (asset of agent.asset ){
                delete data.asset[asset];
                data.idAssetUnused.push(asset);
            }
        }
        
        delete data.node[id_node];
        data.idNodeUnused.push(Number(id_node));
        var node = cy.getElementById(String(id_node));
        cy.remove(node);
    }

    
} 

// this fonction change the visible tab between parameters and Market
function change_tab2(name) {
    //console.log("changement")
    var div = document.getElementById("parameters_selection")
    div2 = document.getElementById("content_tab2_Parameters")
    
    /*if (div != null){
        div2.removeChild(div);
    }*/
    
    
    if(name == "Parameters"){
        parameters()
    }
    
    
    
    document.getElementById('tab_'+name).className = 'tab2_1 tab';
    document.getElementById('content_tab2_'+name).style.display = 'block';
    var old = data.old_tab2;
    data.old_tab2 = name;
    
    if (name != old){
        document.getElementById('tab_' + old).className = 'tab2_0 tab';
        document.getElementById('content_tab2_'+ old).style.display = 'none';
    }
    
    
    
    
            
} 


// this function create a object data_export which contain data and simopt (if the user clic on save parametters) 
function clicSaveEverything() {
    var data_export = {};
    data_export["market"] = data;
    data_export["simulation"] = simopt;
    var save = JSON.stringify(data_export);
    document.location="data:text/csv;base64,"+btoa(save);

} 

// this function offer to save everything and after confirmation set every_thing to their default value
function clicResetEverything(){
    var save = confirm("Do you want to save before ?")
    if(save){
        clicSaveEverything()
    }
    var confirmation = confirm("Do you really want to reset everything ?")
    if (confirmation){
        initialisation();
        change_tab2('Parameters');
        parametersReset();
        change_tab2('Market');
        resetGraph();
    }
    
} 