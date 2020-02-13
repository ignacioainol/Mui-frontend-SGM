import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import { Network, Node, Edge } from 'react-vis-network';
import Graph from "react-graph-vis";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  graphStyle: {
    width: '100%',
    height: '100vh'
  }
});

const MyNetwork = () => {
  {
    const graph = {
      nodes: [
        {id: 0, label: "0", group: 'source'},
        {id: 1, label: "1", group: 'icons'},
        {id: 2, label: "2", group: 'icons'},
        {id: 3, label: "3", group: 'icons'},
        {id: 4, label: "4", group: 'icons'},
        {id: 5, label: "5", group: 'icons'},
        {id: 6, label: "6", group: 'icons'},
        {id: 7, label: "7", group: 'icons'},
        {id: 8, label: "8", group: 'icons'},
        {id: 9, label: "9", group: 'icons'},
        {id: 10, label: "10", group: 'mints'},
        {id: 11, label: "11", group: 'mints'},
        {id: 12, label: "12", group: 'mints'},
        {id: 13, label: "13", group: 'mints'},
        {id: 14, label: "14", group: 'mints'},
        {id: 15, group: 'dotsWithLabel'},
        {id: 16, group: 'dotsWithLabel'},
        {id: 17, group: 'dotsWithLabel'},
        {id: 18, group: 'dotsWithLabel'},
        {id: 19, group: 'dotsWithLabel'},
        {id: 20, label: "diamonds", group: 'diamonds'},
        {id: 21, label: "Ignacio", group: 'diamonds'},
        {id: 22, label: "diamonds", group: 'diamonds'},
        {id: 23, label: "diamonds", group: 'diamonds'},
        {id: 24, label: "diamonds", group: 'diamonds'},
        {id: 25, label: "diamonds", group: 'diamonds'},
        {id: 26, label: "diamonds", group: 'diamonds'},
        {id: 27, label: "diamonds", group: 'diamonds'},
        {id: 28, label: "Misael", group: 'mints'},
        {id: 29, label: "Camilo", group: 'mints'},
        {id: 30, label: "16", group: 'mints'},
        {id: 31, label: "20", group: 'mints'}


      ],
      edges: [
        {from: 1, to: 0},
        {from: 2, to: 0},
        {from: 4, to: 3},
        {from: 5, to: 4},
        {from: 4, to: 0},
        {from: 7, to: 6},
        {from: 8, to: 7},
        {from: 7, to: 0},
        {from: 10, to: 9},
        {from: 11, to: 10},
        {from: 10, to: 4},
        {from: 13, to: 12},
        {from: 14, to: 13},
        {from: 13, to: 0},
        {from: 16, to: 15},
        {from: 17, to: 15},
        {from: 15, to: 10},
        {from: 19, to: 18},
        {from: 20, to: 19},
        {from: 21, to: 4},
        {from: 22, to: 21},
        {from: 23, to: 22},
        {from: 24, to: 5},
        {from: 25, to: 8},
        {from: 26, to: 9},
        {from: 27, to: 10},
        {from: 28, to: 11},
        {from: 29, to: 14},
        {from: 30, to: 15},
        {from: 31, to: 19}
      ]
    };

    const options =  {
      nodes: {
          shape: 'dot',
          size: 20,
          font: {
              size: 15,
              color: '#ffffff'
          },
          borderWidth: 2
      },
      edges: {
          width: 2
      },
      groups: {
          diamonds: {
              color: {background:'red',border:'white'},
              shape: 'diamond'
          },
          dotsWithLabel: {
              label: "I'm a dot!",
              shape: 'dot',
              color: 'cyan'
          },
          mints: {color:'rgb(0,255,140)'},
          icons: {
              shape: 'icon',
              icon: {
                  face: 'FontAwesome',
                  code: '\uf0c0',
                  size: 50,
                  color: 'orange'
              }
          },
          source: {
              color:{border:'white'}
          }
      },
      width: "100%",
      height: "550px"
  };

    const events = {
      select: function (event) {
        var { nodes, edges } = event;
      }
    };
    return (
      <Graph
        graph={graph}
        options={options}
        events={events}
        getNetwork={network => {
          //  if you want access to vis.js network api you can set the state in a parent component using this property
          network.focus(18, {scale: 0.8})
        }}
      />
    );
  }
}

function Home() {

  const classes = useStyles;
  return (
    <div>
      <MyNetwork />
    </div>

  );
}

export default Home;