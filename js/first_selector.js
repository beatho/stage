// utiliser array.includes(truc) plutôt que array.indexOf(truc) == -1
// rajouter if truc != undefined lors des parcours des options

window.addEventListener("load",function()
{   
    initialisation()
})
function initialisation() {
    // Reset everything
    initialisation_data();
    var wrap = document.getElementById("first_selection");
    wrap.textContent="";
    var content = document.getElementById("content");
    content.innerHTML ="";



    var h3 = document.createElement("h3")
    h3.textContent = "Actions : ";
    wrap.appendChild(h3)

    var span = this.document.createElement("span")
    span.className = "first_selection";
    
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
    span.appendChild(selector)
    wrap.appendChild(span);
    selector.id = "first_select"
    new SlimSelect({
        select: '#first_select'
    })

    selector.onchange = function(choice) {
        this.slim.data.data[0].disabled= true;
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
        var select = document.getElementById("second_selector");
        if (select != null){
            wrap.removeChild(select);
        }
        var button = document.getElementById("button_select");
        if (button != null){
            wrap.removeChild(button)
        } 


        //console.log(choice.target.value)
        for (var option of options)
            {
            
            if (option.id === choice.target.value )
            {
                var span = document.createElement("span")
                span.id = "second_selector"
                span.className = "first_selection";
                var selector2 = document.createElement("select");
                selector2.onchange = changeSelect2;
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
                span.appendChild(selector2);
                wrap.appendChild(span)
                selector2.id = "second_select"
                new SlimSelect({
                    select: '#second_select'
                })
            }
        } 


    }

};

function changeSelect2() {
    this.slim.data.data[0].disabled= true;
    var wrap = document.getElementById("first_selection");
    var selects = wrap.getElementsByTagName("select");
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
    if (button != null){
        wrap.removeChild(button)
    } 



    if (value1 ===options[0].id && value2===options[0].data[1]) {
        var span = document.createElement("span")
        span.id = "nb_agent";
        span.className = "first_selection";
        var inputElm = document.createElement("input");
        inputElm.type = "number";
        inputElm.step = 1;
        inputElm.min = 1;
        inputElm.value = 3;
        inputElm.required = "required";
        inputElm.id = "input_nb_agent"
        span.appendChild(inputElm);
        wrap.appendChild(span)

        
    } else if (value1 ===options[1].id && value2 === options[1].data[1]) {
        var span = document.createElement("span")
        span.id = "name_node";
        span.className = "first_selection";
        var selector3 = document.createElement("select");
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
        span.appendChild(selector3);
        wrap.appendChild(span)
        selector3.id = "third_select"
        new SlimSelect({
            select: '#third_select'
        })
    } else if (value1 === options[1].id && value2 === options[1].data[2]) {
        var span = document.createElement("span")
        span.id = "name_agent";
        span.className = "first_selection";
        
        var selector4 = document.createElement("select");
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
        span.appendChild(selector4);
        wrap.appendChild(span)
        selector4.id = "third_select"
        new SlimSelect({
            select: '#third_select'
        })
    } 
    if ((value1 === options[4].id && value2 === options[4].data[2])||(value1 === options[0].id && value2 === options[0].data[5]))  {
        var span = document.createElement("span")
        span.id = "button_select";
        span.className = "first_selection";
        
        var buttonelm = document.createElement("input");
        buttonelm.type = "file";
        buttonelm.onchange = clicSelectChoice;
        //buttonelm.onchange = opFile(buttonelm);
        span.appendChild(buttonelm);
        wrap.appendChild(span)

    } else {
        var span = document.createElement("span")
        span.id = "button_select";
        span.className = "first_selection";
        var buttonelm = document.createElement("input");
        buttonelm.type = "button";
        buttonelm.value = "Select";
        buttonelm.onclick = clicSelectChoice;
        span.appendChild(buttonelm);
        wrap.appendChild(span)

    }
    

}

function clicSelectChoice() {
    var wrap = document.getElementById("first_selection");
    var selects = wrap.getElementsByTagName("select");
    var input = document.getElementById("input_nb_agent")
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
                    addFile(this);
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
                        opFile(this);
                    break
                }
        break
    }
} 



