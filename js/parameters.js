function parameters()
{
    //console.log("update")
    var tab = document.getElementById("content_tab2_Parameters")
    var wrap = document.getElementById("parameters_selection");
    if (wrap == null){
        var wrap = document.createElement("div");
        wrap.id = "parameters_selection";
        tab.appendChild(wrap)
    } 
    
    for(var index_id =0; index_id<choices.parameters.length; index_id++) {
        var feat = choices.parameters[index_id];
        
        
        var div = document.getElementById(feat.id);
        if (div == null) {
            var div = document.createElement("div")
            wrap.appendChild(div)
            var h2 = document.createElement("h2")
            h2.textContent = feat.title;
            div.appendChild(h2)
            div.id = feat.id;
        }
        

        for (var index =0; index < feat.legend.length; index++ ){
            if (feat.display[index]) {
                var div2_old = document.getElementById('div ' + feat.id + String(index));
                if (div2_old == null){
                    var div2 = document.createElement("div");
                    var h4 = document.createElement("h4");
                    h4.textContent = feat.legend[index];
                    div2.appendChild(h4);
                    div2.className = "form";
                    div2.id = 'div ' + feat.id + String(index);
                    if (feat.class_expert[index]){
                        div2.className = "expert_0";
                    }
                    if (feat.type[index] == "select") {
                        var form = document.createElement("select");
                        form.id = feat.id + String(index);
                        for (option of feat.feature[index]) {
                            var opt = document.createElement("option");
                            opt.setAttribute("value", option.value);
                            opt.innerText = option.text;
                            form.appendChild(opt)
                        }
                        div2.append(form);
                        
                        
                    } else if (feat.type[index] == "number") {
                        var form = document.createElement("input");
                        form.id = feat.id + String(index);
                        form.type = "number";
                        form.step = feat.feature[index].step;
                        form.value = feat.feature[index].value;
                        div2.append(form);
                    }

                    var find = false;
                    for(var index_next = index; index_next<feat.legend.length; index_next++){
                        div2_next = document.getElementById('div ' + feat.id + String(index_next))
                        if (div2_next != null){
                            div.insertBefore(div2,div2_next);
                            find = true;        
                        }
                    }
                    /*f (!find){
                        if ((index_id +1) < choices.parameters.length){
                            div2_next = document.getElementById(choices.parameters[index_id+1].id);
                        } else {
                            div2_next = document.getElementById("button_parameters");
                        }
                        
                        if (div2_next != null){
                            div.insertBefore(div2,div2_next);
                            find = true;        
                        }
                    }*/
                    if (!find){
                        div.appendChild(div2);
                    } 
                    if (feat.type[index] == "select") {
                        new SlimSelect({
                            select: '#' + String(form.id)
                        })     
                    }  
                }
                
            } else {
                div2 = document.getElementById('div ' + feat.id + String(index));
                if (div2 != null){
                    div.removeChild(div2);
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
        buttonelm.id = "button_parameters1";
        div.appendChild(buttonelm);
        
        var buttonelm = document.createElement("input");
        buttonelm.type = "button";
        buttonelm.value = "Expert mode";
        buttonelm.onclick = clicExpertMode;
        buttonelm.id = "button_parameters2";
        div.appendChild(buttonelm);

        var buttonelm = document.createElement("input");
        buttonelm.type = "button";
        buttonelm.value = "Export parameters";
        buttonelm.onclick = clicExportParameters;
        buttonelm.id = "button_parameters3";
        div.appendChild(buttonelm);
        wrap.appendChild(div); 

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

    var index_select =0;
    var index_input =0;
    
    for (var index1 =0; index1 < choices.parameters.length; index1++){
        var feat = choices.parameters[index1];
        var name1 = feat.name_id;
        simopt[name1] = {};
        for (var index =0; index < feat.type.length; index++){
            if (feat.display[index]){
                var name2 = feat.names[index];
                if(feat.type[index]=="select"){
                    var value = selects[index_select].options[selects[index_select].selectedIndex].value
                    simopt[name1][name2] = value;
                    index_select++;
                    if (index1==3 && index ==3 && value == 'false'){
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
                    } else if (index1==3 && index ==3 && value == 'true'){
                        simopt[name1][name2] = 0;
                    }
                    
                } else if (feat.type[index]=="number"){
                    simopt[name1][name2] = Number(inputs[index_input].value);
                    index_input++;
                } 
            }
        }
    }
    
}
    
function clicExportParameters() {
    var save = JSON.stringify(simopt);
    document.location="data:text/csv;base64,"+btoa(save);
}



function clicExpertMode(){
    var divs = document.getElementsByClassName("expert_0");
    if (divs.length !=0){
        for (div of divs){
            div.className = "expert_1";
        }
    } else {
        var divs = document.getElementsByClassName("expert_1");
        for (div of divs){
            div.className = "expert_0";
        }
    }
}

function parametersReset(){ // must be use AFTER intialisation_data() to set display at his default value
    var wrap = document.getElementById("parameters_selection");
    var selects = wrap.getElementsByTagName("select");
    var inputs = wrap.getElementsByTagName("input");

    for(select of selects){
        select.selectedIndex = 0;
    }
    for (var index=0; index<inputs.length; index++){
        input = inputs[index];
        if (input.type != "button" && input.type != "files" ) {
            input.value = choices.parameters_default[index];
        }  
    }
}