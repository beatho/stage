window.onload = function()
{

    var wrap = document.getElementById("first_selection");
    var button;
    wrap.textContent = "Actions : \n"
    options = [ {
        id: "Add",
        data: [ "Agent", "Community", "Link", "From example", "From file"]
    },
    {
        id: "Modify",
        data: [ "Agent/Community", "Link"]
    },
    {
        id: "Delete",
        data: [ "Agent/Community", "Link"]
    },
    {
        id: "Save",
        data: [ "Save", "Save as"]
    },
    {
        id: "Open",
        data: [ "New", "From example", "From file"],
    }
    ]
    var selector = document.createElement("select");
    for (var option of options)
            {
                option = option.id;
                var opt = document.createElement("option");
                opt.setAttribute("value", option);
                opt.innerText = option;
                selector.appendChild(opt);
            }
    wrap.appendChild(selector);
    counter =0;
    selector.onchange = function(choice) {
        console.log(choice.target.value)
        for (var option of options)
            {
            
            if (option.id === choice.target.value )
            {
               
                /*else  {
                    var test = document.getElementsByTagName("select")[1];
                    console.log(test);
                    wrap.removeChild(test);
                }*/
                var selector2 = document.createElement("select");
                
                for (var dat of option.data) {

                    var opt = document.createElement("option");
                    opt.setAttribute("value", dat);
                    opt.innerText = dat;
                    selector2.appendChild(opt); 
                }
                if (counter == 0) {
                    console.log("ok");
                    var buttonelm = document.createElement("input");
                    buttonelm.type = "button";
                    buttonelm.value = "Select";
                    buttonelm.id = "button_select"
                    buttonelm.setAttribute("onclick", clic());
                    
                    wrap.appendChild(selector2);
                    wrap.appendChild(buttonelm);
                    counter =1;
                    button = document.getElementById("button_select");  
                    
                   
                } else 
                {
                    var test = document.getElementsByTagName("select")[1];
                    console.log(test);
                    wrap.replaceChild(selector2,test);
                } 
            }    
            }
        
        }
        
    
   
}
        
        button.addEventListener("click", clic());
        console.log(button);
        function clic() {
        var valeur1 = document.getElementsByTagName("select");
        console.log("hello");
} 

