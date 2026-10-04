export interface SpecSection {
  id: string;
  title: string;
  subtitle?: string;
  standard: string;
  sizes: string;
  materials: MaterialGroup[];
  additionalInfo?: Record<string, string>;
}

export interface MaterialGroup {
  category: string;
  grades: string[];
}

export const pipingSpecs: SpecSection[] = [
  {
    id: "pipes",
    title: "Industrial Pipes",
    subtitle: 'Sizes from 1/8" through 64" Nominal Bore',
    standard: "ASME, ASTM, BS, DIN/WERKSTOFFE",
    sizes: '1/8" – 64" NB',
    materials: [
      {
        category: "Stainless Steel",
        grades: [
          "A312 304/L",
          "310",
          "316/L",
          "321/H",
          "347/H",
          "410",
          "440",
          "904L",
        ],
      },
      {
        category: "Carbon Steel",
        grades: ["A106 Gr.B", "A106 Gr.C", "API 5LB"],
      },
      {
        category: "Alloy Steel",
        grades: ["A335 P1", "P5", "P9", "P11", "P12", "P22", "P91"],
      },
      {
        category: "Duplex & Super Duplex",
        grades: [
          "UNS S31254 (6% Moly)",
          "UNS S31803 / S32205",
          "UNS S32760",
          "UNS S32750",
          "UNS S32507",
        ],
      },
      {
        category: "Nickel Alloys",
        grades: ["200", "400", "K500", "600", "625", "800", "825"],
      },
      {
        category: "Low Temperature",
        grades: ["ASTM A333 Gr.6", "ASTM A333 Gr.3"],
      },
      {
        category: "High Yield",
        grades: ["API 5L X42", "X52", "X60", "X65", "X70"],
      },
      {
        category: "Aluminium",
        grades: ["5083", "5154", "5251", "6061", "6063", "6082"],
      },
      {
        category: "Special Alloys",
        grades: [
          "Alloy 20",
          "Alloy C",
          "Alloy C276",
          "Alloy B2",
          "Bronze",
          "Brass",
          "Copper",
          "Cupro Nickel",
          "Titanium",
        ],
      },
    ],
  },
  {
    id: "buttweld",
    title: "Buttweld Fittings",
    subtitle: "Seamless, EFW, ERW, DSAW & Forged",
    standard: "BS 1640 / ANSI ASME B16.9, B16.28, B16.25",
    sizes: '1/4" – Any Size',
    materials: [
      {
        category: "Stainless Steel",
        grades: [
          "A403 304/L",
          "310",
          "316/L",
          "321/H",
          "347/H",
          "410",
          "440",
          "904L",
        ],
      },
      {
        category: "Carbon Steel",
        grades: ["A234 WPB", "WPC"],
      },
      {
        category: "Alloy Steel",
        grades: ["A234 WP1", "WP5", "WP9", "WP11", "WP12", "WP22", "WP91"],
      },
      {
        category: "Duplex & Super Duplex",
        grades: [
          "A815 UNS 31803",
          "UNS 31254",
          "UNS S32750",
          "UNS S32760",
        ],
      },
      {
        category: "Nickel Alloys",
        grades: ["200", "400", "K500", "600", "625", "800", "825"],
      },
      {
        category: "Low Temperature",
        grades: ["A420 WPL6", "WPL3"],
      },
      {
        category: "High Yield",
        grades: ["WPHY42", "52", "60", "65", "70"],
      },
      {
        category: "Special Alloys",
        grades: [
          "Alloy 20",
          "Alloy C",
          "Alloy C276",
          "Alloy B2",
        ],
      },
    ],
    additionalInfo: {
      "Wall Thickness": "Schedule 5s through Schedule XXS and heavier",
    },
  },
  {
    id: "screwed",
    title: "Screwed Fittings",
    standard: "BS 3799, ANSI B16.11",
    sizes: '1/8" – 4"',
    materials: [
      {
        category: "Stainless Steel",
        grades: ["A182 F304/L", "F310", "F316/L", "F410", "F440"],
      },
      {
        category: "Carbon Steel",
        grades: ["A105"],
      },
      {
        category: "Alloy Steel",
        grades: ["A182 F1", "F5", "F9", "F11", "F12", "F22", "F91"],
      },
      {
        category: "6% Moly / Duplex & Super Duplex",
        grades: [
          "A182 F44",
          "A182 F51",
          "A182 F53",
          "F55",
          "UNS S32750",
          "UNS S32760",
        ],
      },
      {
        category: "Nickel Alloys",
        grades: ["200", "400", "K500", "600", "625", "800", "825"],
      },
      {
        category: "Low Temperature",
        grades: ["A350 LF2", "LF3", "LF6"],
      },
      {
        category: "High Yield",
        grades: ["A694 F42", "F52", "F60", "F65", "F70"],
      },
    ],
    additionalInfo: {
      "Pressure Ratings": "3,000 lb through 9,000 lb",
      "Schedule Range": "Sch 10s through Sch XXS and heavier",
      "Thread Types": "NPT, BSPT, BSPP",
      "Branch Outlets": '1/4" through 24"',
    },
  },
  {
    id: "socket-weld",
    title: "Socket Weld Fittings",
    standard: "BS 3799, ANSI B16.11",
    sizes: '1/8" – 4"',
    materials: [
      {
        category: "Stainless Steel",
        grades: ["A182 F304/L", "F310", "F316/L", "F321/H", "F347/H"],
      },
      {
        category: "Carbon Steel",
        grades: ["A105"],
      },
      {
        category: "Alloy Steel",
        grades: ["A182 F1", "F5", "F9", "F11", "F12", "F22", "F91"],
      },
      {
        category: "6% Moly / Duplex & Super Duplex",
        grades: [
          "A182 F44",
          "A182 F51",
          "A182 F53",
          "F55",
          "UNS S32750",
          "UNS S32760",
        ],
      },
      {
        category: "Nickel Alloys",
        grades: ["200", "400", "K500", "600", "625", "800", "825"],
      },
      {
        category: "Low Temperature",
        grades: ["A350 LF2", "LF3", "LF6"],
      },
      {
        category: "High Yield",
        grades: ["A694 F42", "F52", "F60", "F65", "F70"],
      },
      {
        category: "Aluminium",
        grades: ["5083", "5154", "5251", "6061", "6063", "6082"],
      },
      {
        category: "Special Alloys",
        grades: [
          "Alloy 20",
          "Alloy C",
          "Alloy C276",
          "Alloy B2",
          "Bronze",
          "Brass",
          "Copper",
          "Cupro Nickel",
          "Titanium",
        ],
      },
    ],
    additionalInfo: {
      "Pressure Ratings": "3,000 lb through 9,000 lb",
      "Schedule Range": "Sch 10s through Sch XXS and heavier",
      "Branch Outlets": '1/4" through 24"',
    },
  },
  {
    id: "grooved",
    title: "Grooved Fittings",
    standard: "Relevant grooved-end standards",
    sizes: "Various",
    materials: [
      {
        category: "Standard",
        grades: ["Carbon Steel", "Ductile Iron", "Stainless Steel"],
      },
    ],
    additionalInfo: {
      "Types":
        "Rigid & Flexible Couplings, Snap-Lock, Elbows (90°/45°/22½°/11¼°), Tees, Reducers, End Caps, Mechanical Branchlets, Flange Adapters",
    },
  },
  {
    id: "malleable",
    title: "Malleable Iron Fittings",
    standard: "ASTM A-197, ANSI/ASME B1.20.1, B16.3, B16.39, B16.14",
    sizes: '1/8" – 6"',
    materials: [
      {
        category: "Black Finish",
        grades: ["For oil, gas, and fluid applications"],
      },
      {
        category: "Galvanized Finish",
        grades: [
          "For water, air, and steam installations",
          "Hot-dip galvanized per ASTM A-153",
        ],
      },
    ],
    additionalInfo: {
      "Pressure Ratings": "150 PSI and 300 PSI",
      "Available in": "13 diameters",
    },
  },
  {
    id: "valves",
    title: "Industrial Valves",
    standard: "ASME, ASTM, BS, DIN/WERKSTOFFE",
    sizes: '1/2" – 14" (all schedules, larger on request)',
    materials: [
      {
        category: "Carbon Steel",
        grades: ["A105", "ASME SA216 Grade WCB"],
      },
      {
        category: "Stainless Steel",
        grades: ["CF8M", "LF2", "304", "316"],
      },
      {
        category: "Other",
        grades: ["Cast Iron", "Bronze"],
      },
    ],
    additionalInfo: {
      "Valve Types":
        "Gate, Ball, Globe, Check, Butterfly, Safety, Needle",
      "Pressure Ratings":
        "CL150, CL300, CL600, CL800, PN10, PN16, PN25, PN40, 1000/2000/3000 PSI",
      "End Connections": "NPT, SW (Socket Weld), Flanged",
    },
  },
];
