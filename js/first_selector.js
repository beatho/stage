// utiliser array.includes(truc) plutôt que array.indexOf(truc) == -1
// rajouter if truc != undefined lors des parcours des options



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
            // remove the element that we don't need on the page
            var select1 = document.getElementById("name_node");
            var select2 = document.getElementById("name_agent");
            var input = document.getElementById("nb_agent");
            if (input !== null){
                wrap.removeChild(input);
            } else if (select1 !==null) {
                wrap.removeChild(select1);
            } else if (select2 !==null) {
                wrap.removeChild(select2);
            }
        } 


});

function changeSelect2() {
    var wrap = document.getElementById("first_selection");
    var selects = document.getElementsByTagName("select");
    var button = document.getElementById("button_select");
    
    var value1 = selects[0].value;
    var value2 = selects[1].value;
    
    // remove the element that we don't need on the page
    var select1 = document.getElementById("name_node");
    var select2 = document.getElementById("name_agent");
    var input = document.getElementById("nb_agent");
    if (input !== null){
        wrap.removeChild(input);
    } else if (select1 !==null) {
        wrap.removeChild(select1);
    } else if (select2 !==null) {
        wrap.removeChild(select2);
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
    } else if (value1 ===options[1].id && value2 === options[1].data[1]) {
        var selector3 = document.createElement("select");
        selector3.id = "name_node";
        var opt = document.createElement("option");
        opt.setAttribute("value", '');
        opt.innerText = 'Select...';
        selector3.appendChild(opt);
        for (agent of data.node) {
            if (agent != undefined) {
                var opt = document.createElement("option");
                opt.setAttribute("value", agent.id);
                opt.innerText = agent.name;
                selector3.appendChild(opt);
            }
        }
        wrap.insertBefore(selector3,button);
    } else if (value1 === options[1].id && value2 === options[1].data[2]) {
        var selector4 = document.createElement("select");
        selector4.id = "name_agent";
        var opt = document.createElement("option");
        opt.setAttribute("value", '');
        opt.innerText = 'Select...';
        selector4.appendChild(opt);
        for (agent of data.node) {
            if (agent != undefined) {
                if (agent.type == choices.typeNode[0]){
                    var opt = document.createElement("option");
                    opt.setAttribute("value", agent.id);
                    opt.innerText = agent.name;
                    selector4.appendChild(opt);
                }
            }
        }
        wrap.insertBefore(selector4,button);

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
                    addAsset();
                break
                case options[0].data[4]:
                    addExample();
                break
                case options[0].data[5]:
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
                    console.log(data.node)
                    modAgCom(value3);
                break
                case options[1].data[2]:
                    var value3 = selects[2].options[selects[2].selectedIndex].value;
                    modAsset(value3);
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
// beware you need the push the button select to update the names when you add several communities


