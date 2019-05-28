window.onload = function()
{
    class formPicker{
        constructor(descriptifs, parent){
            this.descriptifs = descriptifs;
            this.parent = parent;

            this.forms = {};
            var options = [];
            for (var descriptif of descriptifs)
            {
                var form = this.createForm(descriptif);
                this.forms[form.id] = form;
                options.push(form);
            }
            var selector = document.createElement("select");
            for (var option of options)
            {
                option = option.id;
                var opt = document.createElement("option");
                opt.setAttribute("value", option);
                opt.innerText = option;
                selector.appendChild(opt);
            }
            selector.formPicker = this; 
            this.parent.appendChild(selector);
            this.currentForm = this.forms[Object.keys(this.forms)[0]];
            this.parent.appendChild(this.currentForm);
            selector.onchange = function(choice){
                var formPicker = choice.target.formPicker;
                choice = choice.target.value;
                formPicker.parent.removeChild(formPicker.currentForm);
                formPicker.currentForm = formPicker.forms[choice];
                formPicker.parent.appendChild(formPicker.currentForm);
            }
        }
        /**
         * not meant to be used (private for the class)
         * @param {*} descriptif 
         */
        createForm(descriptif)
        {   
            var form = document.createElement("form");
            form.setAttribute("id", descriptif.id);
            for (var input of descriptif.data)
            {
                var curInput = document.createElement("input");
                for(var key of Object.keys(input))
                {
                    curInput.setAttribute(key, input[key]);
                }
                form.appendChild(curInput);
            }

            return form;
        }
    }
    descriptifs = [{
        id:"first",
        data:[
        {
            type:"text",
            id:1,
            placeholder:"premier"
        },
        {
            type:"text",
            id:2,
            placeholder:"second"
        },
        {
            type:"button",
            value:"add agent",
            style:"color:red;",
        }
    ]}, {
        id:"second",
        data:[
        {
            type:"text",
            id:1,
            placeholder:"bonjour"
        },
        {
            type:"text",
            id:2,
            placeholder:"truc"
        },
        {
            type:"button",
            value:"add link",
            style:"color:red;",
        }
    ]}]
    var counter = 0;
    var picker = new formPicker(descriptifs,document.body);
    var form = document.getElementsByTagName("form");
    var button = form[0][2]
    button.addEventListener("click", clic(counter));
    function clic(counter) {
        counter = counter +1;
        console.log(counter);
    }
    
}