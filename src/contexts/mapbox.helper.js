// How we did this when we downloaded from dataset

// map.addSource("feature-points", {
//   type: "vector",
//   url: "mapbox://nmaciver.cl3khnq9t01f121qugzked87v-02mb5",
//   promoteId: "id",
//   maxzoom: 22,
//   minzoom: 0,
// });

// map.addLayer({
//   id: "points",
//   type: "symbol",
//   source: "feature-points",
//   "source-layer": "points",
//   layout: {
//     "text-field": pointTextFieldStatement,
//     "icon-image": iconChoiceStatement,
//     "text-offset": [0, 1.2],
//     "text-size": 12,
//     "icon-allow-overlap": true,
//     "text-allow-overlap": true,
//   },
// });

const updateModernLayers = (bool, MODERN_LAYERS, map) => {
  const visibilityExpression = bool ? "visible" : "none";
  Object.keys(MODERN_LAYERS).map((id) =>
    map.setLayoutProperty(id, "visibility", visibilityExpression)
  );
};

const generateZoomLevelCaseStatement = (
  mapName,
  stepsUSE_WHEN_DONE_CHANGE_NAME
) => {
  const steps = [
    //SAVE IN DATA LATER AND REMOVE FROM HERE
    { step: 0, zoom: 0.5, fade: 0 },
    { step: 3.3, zoom: 0.5, fade: 0 },
    { step: 5.5, zoom: 5.5, fade: 0 },
    { step: 6.5, zoom: 5.5, fade: 0 },
    { step: 7.3, zoom: 7.3, fade: 0 },
    { step: 8.3, zoom: 8.3, fade: 0 },
    { step: 9, zoom: 9.0, fade: 0.5 },
    { step: 9.5, noFilterNeeded: true },
    { step: 22, noFilterNeeded: true },
  ];

  const generateStepStatement = (stepObj) => {
    const { step, noFilterNeeded } = stepObj;

    if (noFilterNeeded) return [step, mapFilterStatement(1, pinStatement())];
    return [
      step,
      mapFilterStatement(filterZoomStatement(stepObj), pinStatement()),
    ];
  };

  const baseStatement = ["interpolate", ["linear"], ["zoom"]];

  const mapFilterStatement = (zoomStatement, pinStatement) => [
    "match",
    ["get", "map"],
    [mapName],
    zoomStatement,
    pinStatement, //Was 0
  ];

  const pinStatement = () => [
    "case",
    [
      "any",
      ["==", ["feature-state", "pinned"], true],
      ["==", ["feature-state", "selected"], true],
    ],
    1,
    0,
  ];

  const filterZoomStatement = ({ zoom, fade = 0, coalesce }) => {
    const caseStatment = [
      "case",
      [
        "any",
        ["==", ["feature-state", "selected"], true],
        ["==", ["feature-state", "pinned"], true],
        ["<=", ["feature-state", "zoom"], zoom],
      ],
      1,
      fade,
    ];

    return coalesce ? ["coalesce", 0, ...caseStatment] : [...caseStatment];
  };

  const statement = [
    ...baseStatement,
    ...steps.reduce((acc, step) => {
      return [...acc, ...generateStepStatement(step)];
    }, []),
  ];
  return statement;
};

const generateIconCaseStatement = (pinnedFeatureIdsArr = ["IDS_HERE"]) => {
  const idCaseArr = pinnedFeatureIdsArr.reduce((acc, id) => {
    return [...acc, ["==", ["get", "id"], id]];
  }, []);

  const statement = [
    "case",
    ["any", ...idCaseArr],
    //Match against icon types for pinned features
    [
      "match",
      ["get", "icon"],
      ["refuge", "decapolis"],
      "insert-pin-32-red",
      ["revelation-city"],
      "insert-pin-32-yellow",
      ["simeon", "simeon-uncertain"],
      "insert-pin-32-green",
      [
        "judgeOthniel",
        "judgeEhud",
        "judgeShamgar",
        "judgeBarak",
        "judgeGideon",
        "judgeTola",
        "judgeJair",
        "judgeJephthah",
        "judgeIbzan",
        "judgeElon",
        "judgeAbdon",
        "judgeSamson",
      ],
      "insert-pin-32-teal",
      ["water point"],
      "insert-pin-32-blue",
      ["manasseh"],
      "insert-pin-32-purple",
      "insert-pin-32-black",
    ],
    //Match against icon types
    [
      "match",
      ["get", "icon"],
      ["refuge", "decapolis"],
      "red-dot",
      ["manasseh"],
      "purple-dot",
      ["simeon"],
      "green-dot",
      ["simeon-uncertain"],
      "green-dot-outline",
      ["water point"],
      "blue-dot",
      ["revelation-city"],
      "yellow-dot-outline",
      ["mountain"],
      "mountain",
      ["uncertain"],
      "white-dot-outline",
      ["unknown"],
      "question-mark",
      //Match against Judges of Isreal
      ["judgeOthniel"],
      "teal-1",
      ["judgeEhud"],
      "teal-2",
      ["judgeShamgar"],
      "teal-3",
      ["judgeBarak"],
      "teal-4",
      ["judgeGideon"],
      "teal-5",
      ["judgeTola"],
      "teal-6",
      ["judgeJair"],
      "teal-7",
      ["judgeJephthah"],
      "teal-8",
      ["judgeIbzan"],
      "teal-9",
      ["judgeElon"],
      "teal-10",
      ["judgeAbdon"],
      "teal-11",
      ["judgeSamson"],
      "teal-12",
      "black-dot",
    ],
  ];
  return statement;
};

const generatePointTextFieldStatement = ["to-string", ["get", "name"]];

const generateTextOffsetStatement = [
  "case",
  ["any", ["!=", ["get", "textOffsetY"], 0], ["!=", ["get", "textOffsetX"], 0]],
  ["get", "textOffset"],
  ["literal", [0, 1.2]],
];

const generateHaloShowStatement = (successValue) => [
  "case",
  [
    "any",
    ["==", ["feature-state", "selected"], true],
    ["==", ["feature-state", "pinned"], true],
  ],
  successValue,
  0,
];

const generateHaloPaintColorStatement = () => {
  const haloSelectedPaintColor = "hsl(59, 100%, 61%)";
  const haloPinnedPaintColor = "hsl(79, 100%, 61%)";
  const fallbackPaintColor = "hsl(39, 100%, 61%)";

  return [
    "case",
    ["==", ["feature-state", "pinned"], true],
    haloPinnedPaintColor,
    [
      "case",
      ["==", ["feature-state", "selected"], true],
      haloSelectedPaintColor,
      fallbackPaintColor,
    ],
  ];
};

const haloColorMatchStatement = [
  "match",
  ["feature-state", "pinned"],
  [true],
  "hsl(79, 100%, 61%)",
  [
    "match",
    ["feature-state", "selected"],
    [true],
    "hsl(79, 100%, 61%)",
    "hsl(79, 100%, 61%)",
  ],
];

const generatePointLayerProperties = () => {
  return {
    id: "points",
    type: "symbol",
    source: "feature-points",
    //"source-layer": "points",
    layout: {
      "text-field": generatePointTextFieldStatement,
      "icon-image": generateIconCaseStatement(),
      "text-offset": generateTextOffsetStatement,
      "text-size": 12,

      "icon-allow-overlap": true,
      "text-allow-overlap": true,
    },
    paint: {
      "text-halo-width": generateHaloShowStatement(1),
      "text-halo-color": generateHaloPaintColorStatement(),
      "text-halo-blur": generateHaloShowStatement(1),
    },
  };
};

export {
  generatePointLayerProperties,
  generateIconCaseStatement,
  generateZoomLevelCaseStatement,
  updateModernLayers,
};
