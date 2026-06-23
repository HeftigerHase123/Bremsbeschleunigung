export const GravitationalPull = 9.80665 // m/s^2

export const BRAKE_TYPES = [
    { id: "abs_disc", name: "ABS Scheibenbremse", mu: 0.85, note: "Modern" },
    { id: "disc",     name: "Scheibenbremse",     mu: 0.70, note: "Ohne ABS" },
    { id: "drum",     name: "Trommelbremse",       mu: 0.55, note: "Älter" },
    { id: "hand",     name: "Handbremse",          mu: 0.40, note: "Hinterräder" },
];

export const ROAD_CONDITIONS = [
    { id: "dry",   label: "Trocken", factor: 1.00 },
    { id: "wet",   label: "Nass",    factor: 0.60 },
    { id: "snow",  label: "Schnee",  factor: 0.30 },
    { id: "ice",   label: "Eis",     factor: 0.15 },
];