window.addEventListener('DOMContentLoaded', function(){

    var cy = window.cy = cytoscape({
        container: document.getElementById('cy'),

        ready: function(){
        },

        style: [
            {
                selector: 'node',
                css: {
                    'content': 'data(name)'
                }
            },

            {
                selector: 'edge',
                css: {
                    'curve-style': 'bezier',
                    'target-arrow-shape': 'triangle'
                }
            }
        ],

        elements: {
            nodes: [
                { data: { id: '2', name: 'Jerry' } },
                { data: { id: 'e', name: 'Elaine' } },
                { data: { id: 'k', name: 'Kramer' } },
                { data: { id: 'g', name: 'George' } }
            ],
            edges: [
                { data: { source: '2', target: 'e' } },
                { data: { source: '2', target: 'k' } },
                { data: { source: '2', target: 'g' } },
                { data: { source: 'e', target: '2' } },
                { data: { source: 'e', target: 'k' } },
                { data: { source: 'k', target: '2' } },
                { data: { source: 'k', target: 'e' } },
                { data: { source: 'k', target: 'g' } },
                { data: { source: 'g', target: '2' } }
            ]
        }
    });

    cy.cxtmenu({
        selector: 'node, edge',

        commands: [
            {
                content: 'modify',
                select: function(ele){
                    console.log( ele.group() );
                    if (ele.group() == 'nodes' ) {
                        modAgCom(ele.id());
                    } else if (ele.group() == edges){
                        modLink(ele.id());
                    }
                    
                }
            },

            {
                content: 'name',
                select: function(ele){
                    console.log( ele.data('name') );
                },
                enabled: false
            },

            {
                content: 'Feature',
                select: function(ele){
                    console.log(ele)
                    if (ele.group() == 'nodes' ) {
                        console.log(data.node[ele.id()]);
                    } else if (ele.group() == 'edges'){
                        console.log(data.link[ele.id()]);
                    }
                    //console.log( ele.position() );
                }
            },
            {
                content: 'Asset',
                select: function(ele){
                    if (ele.group() == 'nodes' ) {
                        enabled: true
                        var assets = data.node[ele.id()].asset;
                        for (asset of assets){
                            console.log(data.asset[asset]);
                        }    
                    } else if (ele.group() == 'edges'){
                        enabled: false
                    }
                    //console.log( ele.position() );
                }
            }

        ]
    });

    cy.cxtmenu({
        selector: 'core',

        commands: [
            {
                content: 'bg1',
                select: function(){
                    console.log( 'bg1' );
                }
            },

            {
                content: 'bg2',
                select: function(){
                    console.log( 'bg2' );
                }
            }
        ]
    });

});

function updateGraph(element) {

}