import zdog from "zdog"
/* eslint-disable no-new */

const fourTree = (offset, color, illustration) => {
  const group = new zdog.Group({
    addTo: illustration,
    translate: offset
  })

  // Ground
  new zdog.Shape({
    addTo: group,
    path: [
      { x: -30, y: 50 },
      { x: 30, y: 50 }
    ],
    closed: false,
    stroke: 5,
    color,
  })

  // Tree
  new zdog.Shape({
    addTo: group,
    path: [
      { x: -10, y: 50 },
      { x:  -10, y: -50 },
      { bezier: [
        { x: -10, y: -50 },
        { x: -50, y: 20 },
        { x: -10, y: 20 }
      ] },
      { move: { x: 0, y: 50 } },
      { x: 0, y: -30 },
      { bezier: [
        { x: 0, y: -30 },
        { x: 30, y: 20 },
        { x: 0, y: 20 }
      ] },
    ],
    closed: false,
    stroke: 5,
    fill: true,
    color,
  })

  return group
}

const roundTree = (offset, colors, illustration) => {
  const group = new zdog.Group({
    addTo: illustration,
    translate: offset
  })

  // Ground
  new zdog.Shape({
    addTo: group,
    path: [
      { x: -30, y: 50 },
      { x: 30, y: 50 }
    ],
    translate: { x: 0 },
    closed: false,
    stroke: 5,
    color: colors[0],
  });

  // Backward leaves
  new zdog.Ellipse({
    addTo: group,
    diameter: 15,
    translate: { x: 10, y: 10, z: -10 },
    stroke: 5,
    fill: true,
    color: colors[2],
  });

  //  Backward Branch
  new zdog.Shape({
    addTo: group,
    path: [
      { x: 0, y: 25 },
      { x:  20, y: 10, z: -10 },
    ],
    translate: { x: -10 },
    closed: false,
    stroke: 5,
    fill: true,
    color: colors[2],
  });

  // Tree Trunk
  new zdog.Shape({
    addTo: group,
    path: [
      { x: 0, y: 50 },
      { x:  0, y: -40 },
    ],
    translate: { x: -10 },
    closed: false,
    stroke: 5,
    fill: true,
    color: colors[0],
  });
  
  // Main leaves
  new zdog.Ellipse({
    addTo: group,
    diameter: 50,
    translate: { x: -10, y: -20 },
    stroke: 5,
    fill: true,
    color: colors[0],
  });

    // Forward leaf
    new zdog.Ellipse({
      addTo: group,
      diameter: 15,
      translate: { x: -30, y: 0, z: 10 },
      stroke: 5,
      fill: true,
      color: colors[1],
    });
  
    // Forward Branch 
    new zdog.Shape({
      addTo: group,
      path: [
        { x: 0, y: 15 },
        { x: -20, y: 0, z: 10 },
      ],
      translate: { x: -10 },
      closed: false,
      stroke: 5,
      fill: true,
      color: colors[1],
    });

  return group
}

export { fourTree, roundTree }