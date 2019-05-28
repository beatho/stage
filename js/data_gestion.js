
data = {
    nodeAgentName: [],
    nodeAdministratorName: [],
    link: [],
    asset: [],
    node: [],
    idLinkUnused: [],
    idAssetUnused: [],
    idNodeUnused: [],
    old_onglet: "asset_1",
    oldNbAsset: 1
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
    comObjective : ["Lowest Price", "Autonomy"],
    deleteAgent : ["The agent", "Some of its assets"],
    deleteCom : ["All Community", "Only the community manager"],
    typeAsset : ["Flexible", "uncontrollable", "uncertain"],
    functionType : ["Quadratic"],
    nbFeature : {"Quadratic" : 3}
}
