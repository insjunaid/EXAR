export interface Category {
  slug: string;
  name: string;
  division: string;
  divisionSlug: string;
  description: string;
  catalogPage: number;
  items?: string[];
  brands?: string[];
  image?: string;
}

export interface Division {
  slug: string;
  name: string;
  description: string;
  categories: string[]; // category slugs
}

export const divisions: Division[] = [
  {
    slug: "tools-machinery",
    name: "Tools & Machinery",
    description:
      "Professional-grade power tools, hand tools, spare parts, and heavy machinery for industrial and construction applications.",
    categories: [
      "power-tools",
      "hand-tools",
      "accessories-spare-parts",
      "machinery",
    ],
  },
  {
    slug: "measurement-instrumentation",
    name: "Measurement & Instrumentation",
    description:
      "Precision measuring instruments from Mitutoyo, welding gauges, instrumentation tube fittings, and pressure gauges for quality-critical applications.",
    categories: [
      "measuring-instruments",
      "instrumentation-tube-fittings",
      "magnetic-drilling-machines",
      "taps-carbide-burrs",
    ],
  },
  {
    slug: "welding-fabrication",
    name: "Welding, Abrasive and Non-Sparking Tools",
    description:
      "Complete welding solutions, abrasives, and non-sparking safety tools for industrial and hazardous environment applications.",
    categories: ["welding-equipment", "abrasives", "non-sparking-tools"],
  },
  {
    slug: "safety-lifting",
    name: "Safety & Lifting",
    description:
      "Personal protective equipment, safety signage, and industrial lifting and rigging equipment for safe workplace operations.",
    categories: ["safety-equipment", "lifting-rigging"],
  },
  {
    slug: "electrical-lighting",
    name: "Electrical & Lighting",
    description:
      "Industrial and domestic lighting, cables, wiring products, switches, sockets, and electrical accessories from leading brands.",
    categories: ["lighting", "cables-wire", "electrical-accessories"],
  },
  {
    slug: "building-materials",
    name: "Building Materials",
    description:
      "Gypsum boards, ceiling systems, paints, adhesives, tapes, industrial sealants, building fixtures, sanitary ware, and water heaters.",
    categories: [
      "gypsum-boards-ceiling",
      "paints-adhesives-tapes",
      "industrial-adhesives-heat-resistant",
      "building-sanitary-ware",
      "water-heaters",
    ],
  },

];

export const categories: Category[] = [
  // Tools & Machinery
  {
    slug: "power-tools",
    name: "Power Tools",
    division: "Tools & Machinery",
    divisionSlug: "tools-machinery",
    description:
      "High-caliber power tools including hammer drills, angle grinders, circular saws, demolition hammers, miter saws, band saws, and cordless drills. Featuring DeWalt, Bosch, Makita, Hilti, Metabo, Stanley, and more.",
    catalogPage: 3,
    items: [
      "Hammer Drills",
      "Angle Grinders",
      "Circular Saws",
      "Miter Saws",
      "Band Saws",
      "Demolition Hammers",
      "Jigsaws",
      "Table Saws",
      "Track Saws",
      "Cordless Drills",
      "Die & Straight Grinders",
      "Bench Grinders",
      "Heat Guns",
      "Blowers",
      "Planers",
      "Screw Guns",
      "Caulk Guns",
      "Grease Guns",
      "Cable Cutters",
      "Crimping Tools",
      "Concrete Vibrators",
      "Air Compressors",
      "Air Impact Wrenches",
      "Air Sanders",
      "Air Ratchets",
      "Air Drills",
      "Air Grinders",
      "Air Hammers",
    ],
    brands: ["DeWalt", "Bosch", "Makita", "Hilti", "Metabo", "Stanley", "CAT", "Kobalt"],
  },
  {
    slug: "hand-tools",
    name: "Hand Tools",
    division: "Tools & Machinery",
    divisionSlug: "tools-machinery",
    description:
      "Professional hand tools including combination spanners, socket sets, pliers, pipe wrenches, hammers, adjustable wrenches, files, and pry bars for every trade.",
    catalogPage: 4,
    items: [
      "Combination Spanners",
      "Impact Socket Sets",
      "Socket Sets",
      "Pipe Wrenches",
      "Hammers",
      "Adjustable Wrenches",
      "Circlip Plier Sets",
      "Long Nose Pliers",
      "Side Cutting Pliers",
      "Combination Pliers",
      "Lock Grip Pliers",
      "Wire Rope Crimpers",
      "Wire Strippers",
      "Gasket Scrapers",
      "Fencing Pliers",
      "Files",
      "Pry Bars",
    ],
    brands: ["Stanley", "Proto", "DeWalt"],
  },
  {
    slug: "non-sparking-tools",
    name: "Non-Sparking Tools",
    division: "Welding, Abrasive and Non-Sparking Tools",
    divisionSlug: "welding-fabrication",
    description:
      "Beryllium copper and aluminium bronze non-sparking tools for use in hazardous environments, oil & gas facilities, refineries, and chemical plants where flammable vapours may be present.",
    catalogPage: 6,
    items: [
      "Non-Sparking Wrenches",
      "Non-Sparking Hammers",
      "Non-Sparking Pliers",
      "Non-Sparking Screwdrivers",
      "Non-Sparking Chisels",
    ],
    brands: ["Exar Weld"],
  },
  {
    slug: "accessories-spare-parts",
    name: "Accessories & Spare Parts",
    division: "Tools & Machinery",
    divisionSlug: "tools-machinery",
    description:
      "Genuine spare parts and accessories for DeWalt, Makita, Bosch, and Metabo power tools. Drills, hammers, saws, sanders, cordless tools, compressors, and more.",
    catalogPage: 5,
    items: [
      "DeWalt Spares & Parts",
      "Makita Spares & Parts",
      "Bosch Spares & Parts",
      "Metabo Spares & Parts",
      "Drill Bits",
      "Chisels & Adaptors",
      "Hose Clips",
    ],
    brands: ["DeWalt", "Makita", "Bosch", "Metabo"],
  },
  {
    slug: "machinery",
    name: "Machinery",
    division: "Tools & Machinery",
    divisionSlug: "tools-machinery",
    description:
      "Heavy-duty construction and industrial machinery including compactors, vibratory rollers, asphalt cutters, power generators, and air compressors.",
    catalogPage: 21,
    items: [
      "Diesel Jumping Compactors",
      "Gasoline Jumping Compactors",
      "Vibratory Road Rollers",
      "Diesel Asphalt Cutting Machines",
      "Power Generators",
      "Air Compressors",
    ],
    brands: [],
  },

  // Measurement & Instrumentation
  {
    slug: "measuring-instruments",
    name: "Measuring & Precision Instruments",
    division: "Measurement & Instrumentation",
    divisionSlug: "measurement-instrumentation",
    description:
      "Mitutoyo precision measuring tools with over 75 years of Japanese engineering excellence. Digital calipers, micrometers, height gauges, bore gauges, hardness testers, profile projectors, and welding gauges.",
    catalogPage: 7,
    items: [
      "Digital Calipers",
      "Vernier Calipers",
      "Dial Calipers",
      "Digimatic Micrometers",
      "Outside Micrometers",
      "Inside Micrometers",
      "Depth Micrometers",
      "Digital Height Gauges",
      "Digital Depth Gauges",
      "Bore Gauges",
      "Dial Indicators",
      "Digital Indicators",
      "Hardness Testers",
      "Roughness Testers",
      "Profile Projectors",
      "Gauge Block Sets",
      "Granite Surface Plates",
      "Spirit Levels",
      "Welding Gauges",
      "Fillet Gauges",
      "Pit Gauges",
    ],
    brands: ["Mitutoyo"],
  },
  {
    slug: "instrumentation-tube-fittings",
    name: "Instrumentation Tube Fittings & Pressure Gauges",
    division: "Measurement & Instrumentation",
    divisionSlug: "measurement-instrumentation",
    description:
      'Tube fittings from 1/16" to 2" OD in SS 304, SS 316, brass, and special alloys. Pressure gauges in dry and liquid-filled configurations. Thread types: NPT, BSP, BSPT, UNF, ISO, SAE.',
    catalogPage: 8,
    items: [
      "Instrumentation Tube Fittings",
      "Dry Pressure Gauges",
      "Liquid-Filled Pressure Gauges",
      "Gauge Accessories",
    ],
    brands: ["Swagelok", "WIKA", "Hy-Lok"],
  },
  {
    slug: "magnetic-drilling-machines",
    name: "Magnetic Drilling Machines & Cutters",
    division: "Measurement & Instrumentation",
    divisionSlug: "measurement-instrumentation",
    description:
      "Portable magnetic drilling machines, annular cutters, TCT hole saws, cutting lubricants, and tapping tools for on-site metal fabrication and structural steel work.",
    catalogPage: 9,
    items: [
      "Magnetic Drilling Machines",
      "Annular Cutters",
      "TCT Hole Saws",
      "Cutting Lubricants",
      "Tapping Tools",
      "Drilling Sets",
      "Drilling Accessories",
    ],
    brands: ["Exar"],
  },
  {
    slug: "taps-carbide-burrs",
    name: "Taps & Carbide Burrs",
    division: "Measurement & Instrumentation",
    divisionSlug: "measurement-instrumentation",
    description:
      "Totem hand taps in metric, UNC, UNF, NPT, and BSPT threads. Premium tungsten carbide rotary burrs with five-axis CNC precision-cut flutes for vibration-free cutting and faster stock removal.",
    catalogPage: 10,
    items: [
      "Hand Taps — Metric",
      "Hand Taps — UNC/UNF",
      "Hand Taps — NPT/BSPT",
      "Tungsten Carbide Rotary Burrs",
      "Double-Cut Burrs",
    ],
    brands: ["Totem"],
  },

  // Welding, Abrasive and Non-Sparking Tools
  {
    slug: "welding-equipment",
    name: "Welding Equipment",
    division: "Welding, Abrasive and Non-Sparking Tools",
    divisionSlug: "welding-fabrication",
    description:
      "Complete welding solutions: MIG, TIG, and arc welding machines, consumables, electrodes, regulators (oxygen, acetylene, argon, CO₂, nitrogen), torches, helmets, PPE, gas cylinders, and accessories.",
    catalogPage: 12,
    items: [
      "Welding Electrodes",
      "Welding Rods",
      "Contact Tips",
      "Tungsten Electrodes",
      "Ceramic Nozzles",
      "TIG Torches & Kits",
      "MIG Welding Equipment",
      "Arc Welding Equipment",
      "Oxygen Regulators",
      "Acetylene Regulators",
      "Argon Regulators",
      "CO₂ Regulators",
      "Nitrogen Regulators",
      "LPG Regulators",
      "Cutting Attachments",
      "Welding Helmets & Masks",
      "Auto-Darkening Helmets",
      "Welding Gloves",
      "Welding Aprons",
      "Fire Blankets",
      "Welding Curtains",
      "Electrode Holders",
      "Ground Clamps",
      "Cable Connectors",
      "Welding Goggles",
      "Welding Ovens",
      "Cylinder Trolleys",
      "Gas Cylinders",
    ],
    brands: ["Victor", "Tweco", "Exar Weld"],
  },
  {
    slug: "abrasives",
    name: "Abrasives",
    division: "Welding, Abrasive and Non-Sparking Tools",
    divisionSlug: "welding-fabrication",
    description:
      "Cutting discs, grinding discs, flap discs, sanding discs, wire brushes, cup brushes, mounted stones, and flap wheels for metalworking, deburring, and surface preparation.",
    catalogPage: 11,
    items: [
      "Metal Cutting Discs",
      "Stone Cutting Discs",
      "Steel Cutting Discs",
      "Flap Discs",
      "Sanding Discs",
      "Sanding Paper",
      "Semi-Flexible Discs",
      "Flap Wheels",
      "Cup Brushes — Carbon Steel",
      "Cup Brushes — Stainless Steel",
      "Wheel Brushes",
      "Mounted Stones",
    ],
    brands: ["Sun Flex", "Exar"],
  },

  // Safety & Lifting
  {
    slug: "safety-equipment",
    name: "Safety Equipment (PPE)",
    division: "Safety & Lifting",
    divisionSlug: "safety-lifting",
    description:
      "Personal protective equipment against workplace hazards. Safety coveralls, goggles, helmets, shoes, masks, gloves, harnesses, high-visibility vests, ear protection, and traffic safety products.",
    catalogPage: 15,
    items: [
      "Safety Helmets",
      "Safety Goggles",
      "Face Shields",
      "Safety Shoes",
      "Safety Coveralls",
      "High-Visibility Vests",
      "Safety Gloves",
      "Respirators & Masks",
      "Ear Protection",
      "Safety Harnesses",
      "Traffic Cones",
      "Barrier Tapes",
      "Warning Signs",
      "First Aid Kits",
    ],
    brands: ["3M"],
  },
  {
    slug: "lifting-rigging",
    name: "Lifting & Rigging",
    division: "Safety & Lifting",
    divisionSlug: "safety-lifting",
    description:
      "Industrial lifting and rigging equipment for safe material handling. Chain slings, wire rope slings, shackles, hoists, lever blocks, pallet trucks, lifting clamps, and load-securing hardware for construction and industrial operations.",
    catalogPage: 19,
    items: [
      "Chain Slings",
      "Wire Rope Slings",
      "Webbing Slings",
      "Shackles",
      "Manual Hoists",
      "Electric Hoists",
      "Lever Blocks",
      "Pallet Trucks",
      "Lifting Clamps",
      "Turnbuckles",
      "Eye Bolts",
      "Snatch Blocks",
    ],
    brands: [],
  },

  // Electrical & Lighting
  {
    slug: "lighting",
    name: "Lighting",
    division: "Electrical & Lighting",
    divisionSlug: "electrical-lighting",
    description:
      "Premium industrial and domestic lighting accessories from FSL, T&M, FC Lighting, Philips, Osram, and more. LED panels, floodlights, high-bay lights, and emergency lighting solutions.",
    catalogPage: 16,
    items: [
      "LED Panels",
      "Floodlights",
      "High-Bay Lights",
      "Emergency Lights",
      "Exit Sign Lights",
      "Street Lights",
      "Downlights",
      "Tube Lights",
    ],
    brands: ["Philips", "Osram", "FSL"],
  },
  {
    slug: "cables-wire",
    name: "Cables & Wire",
    division: "Electrical & Lighting",
    divisionSlug: "electrical-lighting",
    description:
      "Extensive selection of cable brands including CU, XLPE, STA, SWA, CPVC, THHN AWG, NYA MM², PVC insulated and sheathed, and shielded wires for industrial and commercial installations.",
    catalogPage: 16,
    items: [
      "XLPE Cables",
      "SWA Cables",
      "PVC Insulated Cables",
      "THHN AWG Cables",
      "Shielded Wires",
      "Control Cables",
      "Instrumentation Cables",
    ],
    brands: ["Belden"],
  },
  {
    slug: "electrical-accessories",
    name: "Electrical Accessories",
    division: "Electrical & Lighting",
    divisionSlug: "electrical-lighting",
    description:
      "Switches, sockets, industrial fans, exhaust fans, insect killers, PVC pipes and fittings, EMT pipes and fittings, cable trays, service boxes, waterproof enclosures, and wire connectors.",
    catalogPage: 16,
    items: [
      "Switches & Sockets",
      "Industrial Fans",
      "Exhaust Fans",
      "PVC Pipes & Fittings",
      "EMT Pipes & Fittings",
      "Flexible Hose & Fittings",
      "Cable Trays",
      "Service Boxes",
      "Cable Ties",
      "Wire Connectors",
      "Waterproof Enclosures",
    ],
    brands: ["Schneider Electric", "Legrand"],
  },

  // Building Materials
  {
    slug: "gypsum-boards-ceiling",
    name: "Gypsum Boards & Ceiling Systems",
    division: "Building Materials",
    divisionSlug: "building-materials",
    description:
      "Regular, moisture-resistant, and fire-resistant gypsum boards with complete ceiling system accessories including channels, brackets, clips, joint tape, and corner tape.",
    catalogPage: 17,
    items: [
      "Regular Gypsum Board",
      "Moisture-Resistant Board",
      "Fire-Resistant Board",
      "Main Channels",
      "Ceiling Brackets",
      "Mount Brackets",
      "Wire Clips",
      "Hanging Clips",
      "Joint Tape",
      "Corner Tape",
    ],
    brands: ["Mada Gypsum"],
  },
  {
    slug: "paints-adhesives-tapes",
    name: "Paints, Adhesives & Tapes",
    division: "Building Materials",
    divisionSlug: "building-materials",
    description:
      "Essential finishing materials including paints, paintbrushes, rollers, scrapers, spray paints, adhesives, warning tapes, and masking tapes from trusted brands.",
    catalogPage: 17,
    items: [
      "Paints",
      "Paintbrushes",
      "Rollers & Refills",
      "Scrapers",
      "Spray Paints",
      "Adhesives",
      "Warning Tapes",
      "Masking Tapes",
    ],
    brands: ["Pattex"],
  },
  {
    slug: "industrial-adhesives-heat-resistant",
    name: "Industrial Adhesives & Heat-Resistant Products",
    division: "Building Materials",
    divisionSlug: "building-materials",
    description:
      "High-performance industrial adhesives, thread lockers, anti-seize compounds, gasket makers, and heat-resistant sealants for demanding industrial applications.",
    catalogPage: 18,
    items: [
      "Thread Lockers",
      "Retaining Compounds",
      "Gasket Makers",
      "Anti-Seize Compounds",
      "Pipe Sealants",
      "Instant Adhesives",
      "Epoxy Adhesives",
      "Heat-Resistant Sealants",
    ],
    brands: ["Loctite", "Permatex", "Molykote", "CRC", "M-Seal"],
  },
  {
    slug: "building-sanitary-ware",
    name: "Building & Sanitary Ware",
    division: "Building Materials",
    divisionSlug: "building-materials",
    description:
      "Bathroom and kitchen fittings including mixers, basin taps, shower heads, angle valves, sanitary chrome fittings, and bathroom accessories.",
    catalogPage: 23,
    items: [
      "Bath Mixers",
      "Bridge Mixers",
      "Kitchen Mixers",
      "Basin Mixers",
      "Sink Cock Bends",
      "Hose Bibs",
      "Angle Valves",
      "Perineal Sprays",
      "Shower Heads",
      "Sanitary Fittings — Chrome",
      "Bathroom Accessories",
    ],
    brands: ["Saudi Ceramics"],
  },
  {
    slug: "water-heaters",
    name: "Water Heaters",
    division: "Building Materials",
    divisionSlug: "building-materials",
    description:
      "Reliable water heaters delivering quality, performance, and eco-friendliness. Electric and gas models for residential and commercial use.",
    catalogPage: 24,
    items: [
      "Electric Water Heaters",
      "Gas Water Heaters",
      "Commercial Water Heaters",
    ],
    brands: ["Bradford White", "A.O. Smith", "Ariston"],
  },
];

