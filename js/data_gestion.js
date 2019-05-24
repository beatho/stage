
data = {
    nodeAgentName: [],
    nodeAdministratorName: [],
    link: [],
    Asset: [],
    node: [],
    idLinkUnused: [],
    idNodeUnused: []
}
options = [ {
    id: "Add",
    data: [ "Agent", "Community", "Link", "From example", "From file"]
},
{
    id: "Modify",
    data: ["Link", "Agent/Community"]
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

choices = {
    typeNode : [ "Agent", "Community Manager"],
    typeLink : [ "Partnership", "Community membership"],
    comObjective : ["Lowest Price", "Autonomy"]
}
