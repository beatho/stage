function parameters()
{
    console.log("update")
    var tab = document.getElementById("contenu_onglet2_Parameters")
    var wrap = document.getElementById("parameters_selection");
    
    
    for(var indice_id =0; indice_id<choices.parameters.length; indice_id++) {
        var feat = choices.parameters[indice_id];
        
        var h2 = document.getElementById(feat.id);
        if (h2 == null) {
            var h2 = document.createElement("h2")
            h2.textContent = feat.id;
            h2.id = feat.id;
            wrap.appendChild(h2)
        }
            
       
        

        var div = document.createElement("div")
        div.id = feat.id;

        for (var indice =0; indice < feat.legend.length; indice++ ){
            if (feat.display[indice]) {
                var div2_old = document.getElementById('div ' + feat.id + String(indice));
                if (div2_old == null){
                    var div2 = document.createElement("div");
                    div2.textContent = feat.legend[indice];
                    div2.id = 'div ' + feat.id + String(indice);
                    if (feat.type[indice] == "select") {
                        var form = document.createElement("select");
                        form.id = feat.id + String(indice);
                        for (option of feat.feature[indice]) {
                            var opt = document.createElement("option");
                            opt.setAttribute("value", option.value);
                            opt.innerText = option.text;
                            form.appendChild(opt)
                        }
                        
                    } else if (feat.type[indice] == "number") {
                        var form = document.createElement("input");
                        form.id = feat.id + String(indice);
                        form.type = "number";
                        form.step = feat.feature[indice].step;
                        form.value = feat.feature[indice].value;
                    }
                    div2.append(form);
                    var find = false;
                    for(var indice_next = indice; indice_next<feat.legend.length; indice_next++){
                        div2_next = document.getElementById('div ' + feat.id + String(indice_next))
                        if (div2_next != null){
                            wrap.insertBefore(div2,div2_next);
                            find = true;        
                        }
                    }
                    if (!find){
                        if ((indice_id +1) < choices.parameters.length){
                            div2_next = document.getElementById(choices.parameters[indice_id+1].id);
                        } else {
                            div2_next = document.getElementById("button_parameters");
                        }
                        
                        if (div2_next != null){
                            wrap.insertBefore(div2,div2_next);
                            find = true;        
                        }
                    }
                    if (!find){
                        wrap.appendChild(div2);
                    }                
                }
                
            } else {
                div2 = document.getElementById('div ' + feat.id + String(indice));
                if (div2 != null){
                    wrap.removeChild(div2);
                }
            }            
        }
    }

    /*  save of new data */
    var div = document.getElementById("button_parameters");
    if (div == null) {
        var div = document.createElement("div");
        div.id = "button_parameters";
        var buttonelm = document.createElement("input");

        buttonelm.type = "button";
        buttonelm.value = "Save parameters";
        buttonelm.onclick = clicSaveParameters;
        div.appendChild(buttonelm);
        wrap.appendChild(div);   
    }
    

    var wrap_old = document.getElementById("parameters_selection");
    if (wrap_old == null){
        tab.appendChild(wrap)
        wrap.id= "parameters_selection";     
    } 
    associateFunction();            
}

function associateFunction() {
    var selct = document.getElementById(choices.parameters[0].id + '0');
    if (selct != null) {
        selct.onchange = changeStochastic;
    }
    

    var selct = document.getElementById(choices.parameters[0].id + '1');
    if (selct != null) {
        selct.onchange = changeStochasticMesure;
    }

    var selct = document.getElementById(choices.parameters[0].id + '2');
    if (selct != null) {
        selct.onchange = changeReserveType;
    }

    var selct = document.getElementById(choices.parameters[0].id + '5');
    if (selct != null) {
        selct.onchange = changeMultipleStep;
    }

    var selct = document.getElementById(choices.parameters[1].id + '0');
    if (selct != null) {
        selct.onchange = changeNetwork;
    }

    var selct = document.getElementById(choices.parameters[1].id + '1');
    if (selct != null) {
        selct.onchange = changeNetworkIntegration;
    }
    var selct = document.getElementById(choices.parameters[3].id + '3')
    if (selct != null) {
        selct.onchange = changeSelectStep;
    }
}

function changeStochastic() {
    var value = this.options[this.selectedIndex].value;
    if (value == "true"){
        choices.parameters[0].display[1] = true;
    } else {
        choices.parameters[0].display[1] = false;
        choices.parameters[0].display[2] = false;
        choices.parameters[0].display[3] = false;
        choices.parameters[0].display[4] = false;
    }
    parameters()
}

function changeStochasticMesure(){
    var value = this.options[this.selectedIndex].value;
    if (value == "Reserves"){
        choices.parameters[0].display[2] = true;
        choices.parameters[0].display[3] = true;
        choices.parameters[0].display[4] = true;

    } else {
        choices.parameters[0].display[2] = false;
        choices.parameters[0].display[3] = false;
        choices.parameters[0].display[4] = false;
    }
    parameters()
}

function changeReserveType(){
    var value = this.options[this.selectedIndex].value;
    if (value=="P2P"){
        choices.parameters[0].display[4] = true;
    } else {
        choices.parameters[0].display[4] = false;        
    }
    parameters()
}


function changeMultipleStep(){
    var value = this.options[this.selectedIndex].value;
    if (value== "true"){
        choices.parameters[0].display[6] = true;
        choices.parameters[2].display[2] = true;
        choices.parameters[3].display[3] = true;    
    } else {
        choices.parameters[0].display[6] = false;
        choices.parameters[2].display[2] = true;
        choices.parameters[3].display[3] = false;   
        var slide = document.getElementById("slide");
        var wrap = document.getElementById("parameters_selection");
        if (slide != null){
             wrap.removeChild(slide);  
        }
        
    }
    parameters()
}


function changeNetwork(){
    var value = this.options[this.selectedIndex].value;
    if (value== "true"){
        choices.parameters[1].display[1] = true;
        choices.parameters[1].display[2] = true;
        choices.parameters[1].display[3] = true;
    } else {
        choices.parameters[1].display[1] = false;
        choices.parameters[1].display[2] = false;
        choices.parameters[1].display[3] = false;
        choices.parameters[1].display[4] = false;    
    }
    parameters()
}
function changeSelectStep(){
    var value = this.options[this.selectedIndex].value;
    if (value== "true"){
        var slide = document.getElementById("slide");
        var wrap = document.getElementById("parameters_selection");
        wrap.removeChild(slide);

    } else {
        var slide = document.createElement("div");
        slide.id = "slide";
        var div_next = document.getElementById(choices.parameters[4].id);
        var wrap = document.getElementById("parameters_selection");
        wrap.insertBefore(slide,div_next);

        

        var slider = document.getElementById('slide');
        slider.style.cursor = 'pointer';
       

        noUiSlider.create(slider, {
            start: [1, data.timeMax],
            connect: true,
            range: {
                'min': 1,
                'max': data.timeMax
            },
            step: 1, 
            pips: {
                mode: 'count',
                values:  data.timeMax
            },
                        
        });

    }
}


function changeNetworkIntegration(){
    var value = this.options[this.selectedIndex].value;
    if (value == "Exogenous"){
        choices.parameters[1].display[2] = true;
        choices.parameters[1].display[3] = true;
        choices.parameters[1].display[4] = false;

    } else if (value == "Integrated") {
        choices.parameters[1].display[2] = false;
        choices.parameters[1].display[3] = false;
        choices.parameters[1].display[4] = true;
    }
    else {
        choices.parameters[1].display[2] = false;
        choices.parameters[1].display[3] = false;
        choices.parameters[1].display[4] = false;
    }
    parameters();

}

function clicSaveParameters(){
    console.log("Saving");
    var wrap = document.getElementById("parameters_selection");
    var selects = wrap.getElementsByTagName("select");
    var inputs = wrap.getElementsByTagName("input");

    var indice_select =0;
    var indice_input =0;
    
    for (var indice1 =0; indice1 < choices.parameters.length; indice1++){
        var feat = choices.parameters[indice1];
        var name1 = feat.name_id;
        simopt[name1] = {};
        for (var indice =0; indice < feat.type.length; indice++){
            if (feat.display[indice]){
                var name2 = feat.names[indice];
                if(feat.type[indice]=="select"){
                    var value = selects[indice_select].options[selects[indice_select].selectedIndex].value
                    simopt[name1][name2] = value;
                    indice_select++;
                    if (indice1==3 && indice ==3 && value == 'false'){
                        var slide = document.getElementById('slide');
                        values_str = slide.noUiSlider.get();
                        if (values_str[0] == values_str[1] ){
                            value = Number(values_str[0]);
                        } else {
                            var value=[];
                            value[0] = Number(values_str[0]);
                            value[1] = Number(values_str[1]);
                        }
                        
                        simopt[name1][name2] = value;
                    } else if (indice1==3 && indice ==3 && value == 'true'){
                        simopt[name1][name2] = 0;
                    }
                    
                } else if (feat.type[indice]=="number"){
                    simopt[name1][name2] = Number(inputs[indice_input].value);
                    indice_input++;
                } 
            }
        }
    }
    var selct = document.getElementById(choices.parameters[3].id + '3')
    if (selct != null) {
        selct.onchange = changeSelectStep;
    }
    var save = JSON.stringify(simopt);
    document.location="data:text/csv;base64,"+btoa(save);





}

