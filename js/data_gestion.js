
data = {
    link: [],
    asset: [],
    node: [],
    idLinkUnused: [],
    idAssetUnused: [],
    idNodeUnused: [],
    old_onglet: "asset_1",
    old_onglet2: "Market",
    oldNbAsset: 1,
    timeMax: 3

}
simopt = {}


options = [ {
    id: "Add",
    data: [ "Agent", "Community", "Link", "Asset", "From example", "From file"]
},
{
    id: "Modify",
    data: ["Link", "Agent/Community", "Asset"]
},
{
    id: "Delete",
    data: [ "Agent/Community", "Link"]
},
{
    id: "Save",
    data: [ "Save"]
},
{
    id: "Open",
    data: [ "New", "From example", "From file"],
}
]

choices = {
    typeNode : [ "Agent", "Manager"],
    typeLink : [ "Partnership", "Community membership","FullP2P","prodToConsumer"],
    typeAgent : ['Consumer', 'Productor', 'Prosumer'],
    comObjective : ["Lowest Price", "Autonomy"],
    deleteAgent : ["The agent", "Some of its assets"],
    deleteCom : ["All Community", "Only the community manager"],
    typeAsset : ["Flexible", "uncontrollable", "uncertain"],
    functionType : ["Quadratic"],
    nbFeature : {"Quadratic" : 3},
    examples : ["community", "ptoP", "onecommunity", "threecommunities", "fullPToP","proToCons"],
    nbFormAsset: [2, 4], // number of each type of forms for the asset tab , select\input 
    parameters: [ 
    {
        id: "General characterisitcs, Market",
        legend: [ "Is the market stochastic ? ", "What counter measures are proposed ? ",
         "What type of reserve trading do you want to consider ? ","What is the confidence level that they should cover ? ",
         "How reserve confidence levels should be spread? ","Can the market treat multiple time steps ? "],
        type: ["select", "select","select", "number","select","select"],
        display: [true, false, false, false, false, true, false],
        feature: [ [ {value:false, text:"No"}, {value:true, text:"Yes"} ],
          [ {value:'Balancind', text:"Balancing"}, {value:'Reserves', text:"Reserves"},{value:'Stochastic', text:"Stochastic"}],
          [ {value:'P2P', text:"P2P"}, {value:'Sup', text:"Sup"},{value:'Pool', text:"Pool"}],
          {value:0.95, step:"any"},
          [ {value:'Fairly', text:"Fairly"}, {value:'Heterogenously', text:"Heterogenously"},{value:'Homogenous', text:"Homogenous"},{value:'Globally', text:"Globally"}],
          [ {value:false, text:"No"}, {value:true, text:"Yes"}],
          [ {value:"Sequentially", text:"Sequentially"}, {value:'Completly', text:"Completly"}],
        ] ,
        name_id: 'market',
        names: ['stochastique', 'reserves', 'reserve_type','confidence_level', 'confidence_repartition','multiple_time_step','treat_multiple_times'],
    },
    {
        id: "General characterisitcs, Network",
        legend: ["Do you want the market to consider power system's presence ? ",
         "How do you want the market to include power system \'s limitations ? ",
         "How do you want network charges to be estimated ? ",
         "What is the unit fee level ($/MWh) ? ",
         "What power line model do you want to use ? "],
        type: ["select", "select", "select", "number", "select"],
        display: [true, false, false, false, false],
        feature: [ [ {value:false, text:"No"}, {value:true, text:"Yes"}],
        [ {value:'Exogenous', text:"Exogenous"}, {value:'Integrated', text:"Integrated"},{value:'Nested', text:"Nested"}],
        [ {value:'Uniform', text:"Uniform"}, {value:'NumZone', text:"NumZone"},{value:'Distance', text:"Distance"}],
         {value:1, step:"any"},
        [ {value:'DC', text:"DC"}, {value:'AC', text:"AC"},{value:'SDP', text:"SDP"},{value:'SOCP', text:"SOCP"}] ],
        name_id: "network",
        names: ['present', 'integration', 'charges', 'unit_fee', 'model'],
    },
    {
        id: "General characteristics - Optimizer",
        legend: [ "Should the optimization be solved using a unique centralized global solver ? ",
         "Can the optimizer overwrite already exiting results ? ",
        "Should the computed results of each time step (if existing) be saved in seperate files ?"],
        type: ["select", "select", "select"],
        display: [true, true, true],
        feature: [ [ {value:false, text:"No"}, {value:true, text:"Yes"}],
        [ {value:false, text:"No"}, {value:true, text:"Yes"}],
        [ {value:false, text:"No"}, {value:true, text:"Yes"}] ],
        name_id: "optimizer",
        names: ['centralisez_optimization', 'overwrite', 'save_in_multiple_files'],
    },
    {
        id: "General characteristics - Test case",
        legend: [ "What import fees should be applied ? (in $/MWh)","What export fees should be applied ? (in $/MWh) ",
        "What transaction fees should be applied ? (in $/MWh)", "All time steps shoud be tested ? "],
        type: ["number", "number", "number","select"],
        display: [true, true, true, false],
        feature: [ {value:0, step:"any"},
        {value:0, step:"any"},
        {value:0, step:"any"},
        [ {value:true, text:"Yes"}, {value:false, text:"No"}],
        ],
        name_id: "testcase",
        names: ['Imp_fee', 'Exp_fee', 'P2P_fee', 'selected_time'],
    },
    /*{
        id: "Simulation parameters - P2P Market",
            legend: [ " What is the maximum number of iterations of the P2P negociation mechanism ?",
            "What is the penalty factor of the P2P negociation mechanism ?",
            "What type of stopping criterion should be used ?",
            "What are primal residuals' tolerance of the P2P negociation mechanism (*1e-3) ?",
            "What are dual residuals' tolerances of the P2P negociation mechanism (*1e-3) ?",
            "What is the tolerance of the local optimization (*1e-6) ?",
        ],
            type: ["number", "number", "select","number", "number","number"],
            display: [true, true, false, true, false, false, false],
            feature: [ {value:500, step:"1"},
            {value:1, step:"any"},
            [ {value:'Global', text:"Global"}, {value:'None', text:"None"},{value:'AgentAbs', text:"AgentAbs"}, {value:'AgentRel', text:"AgentRel"},{value:'AgentRel', text:"AgentRel"},{value:'TradeRel', text:"TradeRel"}],
            {value:1, step:"any"},
            {value:1, step:"any"},
            {value:1, step:"any"},

        ] 
    },*/
    {
        id: "Simulation parameters - System operator , decentralised resolution and grid",
            legend: [ " What is the maximum number of iterations of the the coordination with the system operator ? ",
            "What is the penalty factor of the coordination with the system operator ? ",
            "What are primal residuals' tolerance of the P2P negociation mechanism (*1e-3) ? ",
            "What are dual residuals' tolerances of the P2P negociation mechanism (*1e-3) ? "],
        
            type: ["number", "number", "number","number"],
            display: [true, true, true, true],
            feature: [ {value:200, step:"1"},
            {value:1, step:"any"},
            {value:1, step:"any"},
            {value:1, step:"any"},
                    ],
            name_id: "SOparams",
            names: ['maxit', 'penalty', 'espPrimR', 'espDualR'],
    }
]
}
