import { T } from '../theme';

const kpis = [
  { label: "Total incidents",     value: "248", sub: "Jan 21 – Apr 1, 2026"           },
  { label: "Per school day",      value: "5.5", sub: "45 logged days, calendar-adj."  },
  { label: "Color chart used",    value: "41%", sub: "102 of 248 incidents"            },
  { label: "Home contacted",      value: "14%", sub: "35 of 248 incidents", flag: true },
  { label: "Incident time known", value: "57%", sub: "142 confirmed · 106 excluded"   },
];

const dq = [
  { label: "Behavior type missing",  pct: 28,  n: 70,  color: T.amber },
  { label: "Specials class missing", pct: 9,   n: 22,  color: T.amber },
  { label: "Incident time unknown",  pct: 43,  n: 106, color: T.alert },
  { label: "Student name missing",   pct: 0.4, n: 1,   color: T.green },
];

// Calendar-corrected per-day rates (WSA 2025-26 calendar)
const weekly = [
  { week:"Jan W4",  rate:7.67, ma:8.21, days:3, note:"Post-Q2 reentry · MLK Day Mon"       },
  { week:"Jan W5",  rate:8.75, ma:5.87, days:4, note:"WD Fri Jan 30"                        },
  { week:"Feb W6",  rate:1.2,  ma:5.18, days:5, note:"Low confidence — 1 of 5 days logged"  },
  { week:"Feb W7",  rate:5.6,  ma:3.52, days:5, note:""                                      },
  { week:"Feb W8",  rate:3.75, ma:4.78, days:4, note:"WD Mon Feb 16"                        },
  { week:"Feb W9",  rate:5.0,  ma:5.32, days:4, note:"WD Fri Feb 27"                        },
  { week:"Mar W10", rate:7.2,  ma:4.87, days:5, note:""                                      },
  { week:"Mar W11", rate:2.4,  ma:4.87, days:5, note:""                                      },
  { week:"Mar W12", rate:5.0,  ma:3.93, days:4, note:"WD Fri Mar 20"                        },
  { week:"Mar W13", rate:4.4,  ma:6.58, days:5, note:"End of Q3"                            },
  { week:"W14",     rate:10.33,ma:7.37, days:3, note:"Mon–Wed only · spring break Apr 3"    },
];

const calFlags = { lowConf:["Feb W6"], preBreak:["W14"] };

const grades = [
  { grade:"Kinder", n:49 },{ grade:"1st", n:29 },{ grade:"2nd", n:48 },
  { grade:"3rd",    n:29 },{ grade:"4th", n:37 },{ grade:"5th", n:49 },
];

const specialsNorm = [
  { name:"P.E.",       perDay:3.73, days:26 },
  { name:"Technology", perDay:3.59, days:22 },
  { name:"Music",      perDay:2.71, days:7  },
  { name:"Art",        perDay:1.63, days:19 },
];

const dow = [
  { day:"Mon", rate:8.67 },{ day:"Tue", rate:5.56 },{ day:"Wed", rate:5.91 },
  { day:"Thu", rate:5.33 },{ day:"Fri", rate:4.71 },
];

const behaviors = [
  { type:"Verbal disruption",  n:76 },{ type:"Noncompliance",     n:65 },
  { type:"Off-task",           n:61 },{ type:"Emotional distress", n:59 },
  { type:"Peer conflict",      n:51 },{ type:"Physical behavior",  n:36 },
  { type:"Out of seat",        n:29 },{ type:"Device misuse",      n:12 },
  { type:"Unspecified",        n:70 },
];

const timeBlocks = [
  { block:"Before 9am (confirmed)", n:30, uncertain:false },
  { block:"Before 9am (uncertain)", n:18, uncertain:true  },
  { block:"9–10am",  n:18 },{ block:"10–11am", n:27 },
  { block:"11–12pm", n:8  },{ block:"12–1pm",  n:7  },
  { block:"1–2pm",   n:23 },{ block:"2–3pm",   n:27 },
  { block:"3pm+",    n:2  },
];

const heatmap = [
  { block:"9–10am",  Mon:4, Tue:3, Wed:6, Thu:3, Fri:2 },
  { block:"10–11am", Mon:7, Tue:5, Wed:8, Thu:5, Fri:2 },
  { block:"11–12pm", Mon:2, Tue:2, Wed:3, Thu:1, Fri:0 },
  { block:"12–1pm",  Mon:0, Tue:2, Wed:2, Thu:2, Fri:1 },
  { block:"1–2pm",   Mon:3, Tue:8, Wed:7, Thu:4, Fri:1 },
  { block:"2–3pm",   Mon:7, Tue:6, Wed:6, Thu:6, Fri:2 },
];

const topClasses = [
  { cls:"2nd – Clark",   n:22 },{ cls:"4th – Edwards", n:22 },
  { cls:"5th – Smith",   n:22 },{ cls:"K – Wing",      n:19 },
  { cls:"5th – Davis",   n:18 },{ cls:"K – Fortner",   n:17 },
  { cls:"3rd – Mello",   n:12 },{ cls:"2nd – Kennedy", n:11 },
];

const monthly = [
  { month:"Jan", PE:15, Technology:12, Art:3,  Music:5  },
  { month:"Feb", PE:10, Technology:38, Art:9,  Music:13 },
  { month:"Mar", PE:66, Technology:28, Art:16, Music:0  },
  { month:"Apr", PE:6,  Technology:1,  Art:3,  Music:1  },
];

const consistency = [
  { name:"Technology", active:11, pct:100, perWk:7.2,  perDay:3.59, lag:1.9, chart:44, pattern:"Consistent"   },
  { name:"P.E.",       active:10, pct:91,  perWk:9.7,  perDay:3.73, lag:2.4, chart:46, pattern:"Mar surge"    },
  { name:"Art",        active:10, pct:91,  perWk:3.1,  perDay:1.63, lag:3.1, chart:32, pattern:"Low volume"   },
  { name:"Music",      active:4,  pct:36,  perWk:4.8,  perDay:2.71, lag:6.8, chart:11, pattern:"Intermittent" },
];

const students = [
  { name:"London German",            n:9 },{ name:"Austin Crowder",           n:8 },
  { name:"Gabriel Smith",            n:7 },{ name:"Eternity Deitz-Hutchison", n:5 },
  { name:"Jaxon / Jaxson Anderson",  n:5 },{ name:"Kaiden Horlback",          n:4 },
  { name:"Ibrie Stanley",            n:4 },{ name:"Chester King",              n:4 },
  { name:"Kamarri Douglas",          n:4 },{ name:"Lafayette Joyner",         n:4 },
  { name:"Foster Langdon",           n:4 },{ name:"Osiel Lopez",               n:4 },
];

const roadmap = [
  { title:"EOG testing window (May 19–21)",
    body:"Grades 3–5 EOG testing falls outside the current data window. If logging continues, marking that window in the trend would separate test-prep stress from baseline behavior." },
  { title:"Incidents per 100 class meetings",
    body:"Per-day rates assume equal exposure. Once a specials schedule is available, normalizing by class meetings rather than calendar days would make cross-teacher comparisons more accurate." },
  { title:"Coded consequence field",
    body:"The consequences column is free text. 'Sidelined,' 'sideline,' and 'asked to sideline' are the same action. A controlled vocabulary upstream would make consequence tracking usable." },
  { title:"Student ID instead of name",
    body:"'Jaxon' and 'Jaxson Anderson' were caught manually. A stable student ID would make repeat-student counts reliable rather than dependent on name-matching." },
];

// ─── Specials color map ───────────────────────────────────────────────────────
const classrooms = [
  { id:"1-Beckett", label:"1st – Beckett", grade:"1", total:5, chart:60, home:0,
    behaviors:[{type:"Verbal disruption",n:2},{type:"Noncompliance",n:1},{type:"Peer conflict",n:1},{type:"Out of seat",n:1},{type:"Sleeping",n:1},{type:"Unspecified",n:2}],
    students:[{name:"Lucas Pulley",n:2},{name:"Seneca Jackson",n:2},{name:"Infinity Deitz-Hutchison",n:1}],
    weekly:[{week:"Jan W4",n:2},{week:"Mar W13",n:1},{week:"W14",n:2}],
    byDow:{Mon:1,Tue:2,Wed:0,Thu:2,Fri:0},
    specials:{PE:2,Technology:0,Art:1,Music:0,Unknown:2} },
  { id:"1-Cosetti", label:"1st – Cosetti", grade:"1", total:6, chart:33, home:17,
    behaviors:[{type:"Verbal disruption",n:2},{type:"Noncompliance",n:3},{type:"Off-task",n:1},{type:"Emotional distress",n:1},{type:"Physical behavior",n:1},{type:"Out of seat",n:1},{type:"Device misuse",n:1},{type:"Sleeping",n:1},{type:"Unspecified",n:1}],
    students:[{name:"Tyon Buckner",n:2},{name:"Zayana Fisher",n:1},{name:"James Champion",n:1}],
    weekly:[{week:"Jan W4",n:1},{week:"Feb W8",n:1},{week:"Feb W9",n:1},{week:"Mar W10",n:1},{week:"Mar W13",n:1},{week:"W14",n:1}],
    byDow:{Mon:0,Tue:0,Wed:2,Thu:3,Fri:1},
    specials:{PE:0,Technology:2,Art:3,Music:0,Unknown:1} },
  { id:"1-Smith", label:"1st – Smith", grade:"1", total:12, chart:25, home:17,
    behaviors:[{type:"Verbal disruption",n:4},{type:"Noncompliance",n:3},{type:"Off-task",n:1},{type:"Emotional distress",n:2},{type:"Peer conflict",n:4},{type:"Physical behavior",n:1},{type:"Unspecified",n:4}],
    students:[{name:"Sophia Cherry",n:3},{name:"Tiwuan Hardy",n:3},{name:"Reigna Prensa",n:1},{name:"Other",n:5}],
    weekly:[{week:"Jan W4",n:1},{week:"Jan W5",n:3},{week:"Feb W9",n:3},{week:"Mar W10",n:3},{week:"Mar W11",n:1},{week:"W14",n:1}],
    byDow:{Mon:4,Tue:0,Wed:4,Thu:2,Fri:2},
    specials:{PE:5,Technology:4,Art:0,Music:2,Unknown:1} },
  { id:"1-Worsely", label:"1st – Worsely", grade:"1", total:6, chart:17, home:17,
    behaviors:[{type:"Verbal disruption",n:1},{type:"Noncompliance",n:2},{type:"Off-task",n:4},{type:"Emotional distress",n:1},{type:"Peer conflict",n:1},{type:"Out of seat",n:1},{type:"Sleeping",n:1}],
    students:[{name:"Juelz Crawford",n:2},{name:"Kailee Williams",n:2},{name:"Delilah Zeigler",n:1},{name:"Barrett Boutte",n:1}],
    weekly:[{week:"Feb W7",n:2},{week:"Mar W10",n:1},{week:"W14",n:3}],
    byDow:{Mon:1,Tue:2,Wed:3,Thu:0,Fri:0},
    specials:{PE:0,Technology:2,Art:3,Music:1,Unknown:0} },
  { id:"2-Clark", label:"2nd – Clark", grade:"2", total:22, chart:64, home:18,
    behaviors:[{type:"Verbal disruption",n:8},{type:"Noncompliance",n:7},{type:"Off-task",n:8},{type:"Emotional distress",n:8},{type:"Peer conflict",n:3},{type:"Physical behavior",n:4},{type:"Out of seat",n:2},{type:"Device misuse",n:1},{type:"Unspecified",n:5}],
    students:[{name:"Austin Crowder",n:8},{name:"Mila Moran",n:4},{name:"Noah Hartman",n:2},{name:"Eli Gonzalez",n:2},{name:"Other",n:6}],
    weekly:[{week:"Jan W5",n:4},{week:"Feb W7",n:1},{week:"Feb W8",n:1},{week:"Feb W9",n:3},{week:"Mar W10",n:2},{week:"Mar W11",n:4},{week:"Mar W12",n:1},{week:"Mar W13",n:1},{week:"W14",n:5}],
    byDow:{Mon:9,Tue:1,Wed:7,Thu:2,Fri:3},
    specials:{PE:10,Technology:10,Art:1,Music:1,Unknown:0} },
  { id:"2-Ham", label:"2nd – Ham", grade:"2", total:8, chart:62, home:25,
    behaviors:[{type:"Noncompliance",n:1},{type:"Off-task",n:1},{type:"Emotional distress",n:2},{type:"Peer conflict",n:2},{type:"Physical behavior",n:2},{type:"Out of seat",n:1},{type:"Unspecified",n:4}],
    students:[{name:"Kaiden Horlback",n:4},{name:"Aurelia Gonzalez",n:1},{name:"Travis Oates",n:1},{name:"Ava Cumberlander",n:1},{name:"Isaiah Calcek",n:1}],
    weekly:[{week:"Jan W4",n:1},{week:"Jan W5",n:1},{week:"Feb W6",n:1},{week:"Feb W7",n:1},{week:"Mar W10",n:3},{week:"Mar W11",n:1}],
    byDow:{Mon:4,Tue:0,Wed:2,Thu:0,Fri:2},
    specials:{PE:4,Technology:3,Art:0,Music:0,Unknown:1} },
  { id:"2-Kennedy", label:"2nd – Kennedy", grade:"2", total:13, chart:31, home:15,
    behaviors:[{type:"Verbal disruption",n:3},{type:"Noncompliance",n:2},{type:"Off-task",n:1},{type:"Emotional distress",n:5},{type:"Peer conflict",n:5},{type:"Physical behavior",n:3},{type:"Out of seat",n:2},{type:"Unspecified",n:2}],
    students:[{name:"Lafayette Joyner",n:6},{name:"Avangeline King",n:1},{name:"Avalynn Lawson",n:1},{name:"Zandarius Hall",n:1},{name:"Other",n:4}],
    weekly:[{week:"Jan W5",n:2},{week:"Feb W7",n:3},{week:"Feb W9",n:1},{week:"Mar W10",n:3},{week:"Mar W12",n:2},{week:"Mar W13",n:2}],
    byDow:{Mon:2,Tue:2,Wed:2,Thu:4,Fri:3},
    specials:{PE:6,Technology:1,Art:4,Music:2,Unknown:0} },
  { id:"2-Pollard", label:"2nd – Pollard", grade:"2", total:5, chart:0, home:0,
    behaviors:[{type:"Verbal disruption",n:2},{type:"Noncompliance",n:1},{type:"Off-task",n:1},{type:"Emotional distress",n:1},{type:"Peer conflict",n:1},{type:"Unspecified",n:2}],
    students:[{name:"Brandon Richardson",n:2},{name:"Henry Brown",n:1},{name:"Jordan Jones",n:1}],
    weekly:[{week:"Jan W4",n:2},{week:"Mar W10",n:1},{week:"Mar W13",n:1},{week:"W14",n:1}],
    byDow:{Mon:0,Tue:3,Wed:0,Thu:2,Fri:0},
    specials:{PE:3,Technology:0,Art:0,Music:0,Unknown:2} },
  { id:"3-DanisMcClain", label:"3rd – Danis/McClain", grade:"3", total:11, chart:36, home:27,
    behaviors:[{type:"Verbal disruption",n:1},{type:"Noncompliance",n:1},{type:"Off-task",n:2},{type:"Emotional distress",n:1},{type:"Peer conflict",n:1},{type:"Out of seat",n:2},{type:"Unspecified",n:6}],
    students:[{name:"Ayden Bazemore",n:2},{name:"Trace Corum",n:2},{name:"Colton Whitt",n:1},{name:"Alexia Hernandez",n:1},{name:"Other",n:5}],
    weekly:[{week:"Jan W4",n:6},{week:"Feb W7",n:1},{week:"Feb W9",n:1},{week:"Mar W13",n:2},{week:"W14",n:1}],
    byDow:{Mon:0,Tue:1,Wed:3,Thu:1,Fri:6},
    specials:{PE:3,Technology:0,Art:1,Music:1,Unknown:6} },
  { id:"3-Jones", label:"3rd – Jones", grade:"3", total:6, chart:50, home:0,
    behaviors:[{type:"Verbal disruption",n:1},{type:"Noncompliance",n:3},{type:"Off-task",n:1},{type:"Peer conflict",n:1},{type:"Device misuse",n:1},{type:"Unspecified",n:1}],
    students:[{name:"King Artist",n:2},{name:"Kameron Batts",n:1},{name:"Harper Hall",n:1},{name:"Arayah Boutte",n:1},{name:"Oliva Sugg",n:1}],
    weekly:[{week:"Jan W5",n:1},{week:"Feb W7",n:1},{week:"Mar W12",n:3},{week:"Mar W13",n:1}],
    byDow:{Mon:0,Tue:2,Wed:0,Thu:3,Fri:1},
    specials:{PE:2,Technology:3,Art:1,Music:0,Unknown:0} },
  { id:"3-Mello", label:"3rd – Mello", grade:"3", total:12, chart:50, home:25,
    behaviors:[{type:"Verbal disruption",n:6},{type:"Noncompliance",n:5},{type:"Off-task",n:1},{type:"Emotional distress",n:4},{type:"Peer conflict",n:7},{type:"Physical behavior",n:2},{type:"Out of seat",n:2},{type:"Unspecified",n:2}],
    students:[{name:"Chester King",n:4},{name:"Ezra Morado",n:3},{name:"Maya Spriggs",n:2},{name:"Noah Thomas",n:1},{name:"Other",n:2}],
    weekly:[{week:"Jan W5",n:2},{week:"Feb W6",n:2},{week:"Feb W7",n:3},{week:"Feb W8",n:1},{week:"Mar W10",n:1},{week:"Mar W12",n:2},{week:"Mar W13",n:1}],
    byDow:{Mon:1,Tue:2,Wed:3,Thu:3,Fri:3},
    specials:{PE:4,Technology:2,Art:3,Music:3,Unknown:0} },
  { id:"4-Bridgers", label:"4th – Bridgers", grade:"4", total:7, chart:14, home:0,
    behaviors:[{type:"Noncompliance",n:1},{type:"Emotional distress",n:4},{type:"Peer conflict",n:3},{type:"Unspecified",n:3}],
    students:[{name:"Indi Coley",n:2},{name:"Kymere McCoy",n:1},{name:"Gideon Allen",n:1},{name:"Other",n:3}],
    weekly:[{week:"Jan W4",n:3},{week:"Feb W6",n:1},{week:"Mar W10",n:3}],
    byDow:{Mon:0,Tue:0,Wed:1,Thu:5,Fri:1},
    specials:{PE:3,Technology:0,Art:0,Music:1,Unknown:3} },
  { id:"4-Dohar", label:"4th – Dohar", grade:"4", total:8, chart:88, home:38,
    behaviors:[{type:"Verbal disruption",n:3},{type:"Noncompliance",n:1},{type:"Off-task",n:1},{type:"Emotional distress",n:2},{type:"Peer conflict",n:1},{type:"Physical behavior",n:4},{type:"Unspecified",n:4}],
    students:[{name:"Braxton Wrestler",n:3},{name:"Declan Costello",n:2},{name:"Travonte Coley",n:1},{name:"Mattix Mooring",n:1},{name:"Chavar Prince",n:1}],
    weekly:[{week:"Jan W5",n:4},{week:"Mar W10",n:3},{week:"W14",n:1}],
    byDow:{Mon:0,Tue:6,Wed:0,Thu:2,Fri:0},
    specials:{PE:6,Technology:2,Art:0,Music:0,Unknown:0} },
  { id:"4-Edwards", label:"4th – Edwards", grade:"4", total:22, chart:36, home:14,
    behaviors:[{type:"Verbal disruption",n:7},{type:"Noncompliance",n:4},{type:"Off-task",n:6},{type:"Emotional distress",n:4},{type:"Peer conflict",n:5},{type:"Physical behavior",n:2},{type:"Out of seat",n:2},{type:"Unspecified",n:7}],
    students:[{name:"London German",n:9},{name:"Ibrie Stanley",n:4},{name:"Doll Brown",n:2},{name:"Connor Sigmund",n:1},{name:"Other",n:6}],
    weekly:[{week:"Jan W4",n:2},{week:"Jan W5",n:1},{week:"Feb W7",n:4},{week:"Feb W9",n:3},{week:"Mar W11",n:3},{week:"Mar W12",n:3},{week:"W14",n:6}],
    byDow:{Mon:8,Tue:6,Wed:6,Thu:0,Fri:2},
    specials:{PE:6,Technology:8,Art:6,Music:0,Unknown:2} },
  { id:"5-Coles", label:"5th – Coles", grade:"5", total:9, chart:33, home:0,
    behaviors:[{type:"Verbal disruption",n:2},{type:"Noncompliance",n:2},{type:"Off-task",n:4},{type:"Emotional distress",n:3},{type:"Physical behavior",n:2},{type:"Sleeping",n:1},{type:"Unspecified",n:2}],
    students:[{name:"Elijah Sanders",n:2},{name:"Lacey Musser",n:1},{name:"Kendra Champion",n:1},{name:"Fynntynn VandenBroeke",n:1},{name:"Other",n:4}],
    weekly:[{week:"Jan W5",n:1},{week:"Feb W6",n:1},{week:"Feb W7",n:2},{week:"Mar W10",n:5}],
    byDow:{Mon:1,Tue:1,Wed:1,Thu:5,Fri:1},
    specials:{PE:6,Technology:1,Art:1,Music:1,Unknown:0} },
  { id:"5-Davis", label:"5th – Davis", grade:"5", total:18, chart:28, home:0,
    behaviors:[{type:"Verbal disruption",n:7},{type:"Noncompliance",n:5},{type:"Off-task",n:6},{type:"Emotional distress",n:2},{type:"Peer conflict",n:6},{type:"Physical behavior",n:3},{type:"Out of seat",n:2},{type:"Device misuse",n:1},{type:"Unspecified",n:7}],
    students:[{name:"Osiel Lopez",n:4},{name:"Liam Howell",n:4},{name:"Jeremiah Edwards",n:2},{name:"Sophia Ponce",n:2},{name:"Kaitlyn Sigmon",n:2},{name:"Other",n:4}],
    weekly:[{week:"Jan W4",n:1},{week:"Jan W5",n:6},{week:"Feb W8",n:4},{week:"Mar W12",n:3},{week:"Mar W13",n:2},{week:"W14",n:2}],
    byDow:{Mon:0,Tue:6,Wed:3,Thu:6,Fri:3},
    specials:{PE:8,Technology:8,Art:0,Music:1,Unknown:1} },
  { id:"5-Smith", label:"5th – Smith", grade:"5", total:22, chart:32, home:23,
    behaviors:[{type:"Verbal disruption",n:9},{type:"Noncompliance",n:6},{type:"Off-task",n:5},{type:"Emotional distress",n:3},{type:"Peer conflict",n:4},{type:"Physical behavior",n:1},{type:"Out of seat",n:1},{type:"Device misuse",n:2},{type:"Sleeping",n:1},{type:"Unspecified",n:5}],
    students:[{name:"Gabriel Smith",n:6},{name:"Reagan Best",n:3},{name:"Braiden Roa",n:1},{name:"Other",n:12}],
    weekly:[{week:"Jan W4",n:1},{week:"Jan W5",n:1},{week:"Feb W7",n:3},{week:"Feb W8",n:2},{week:"Feb W9",n:4},{week:"Mar W10",n:2},{week:"Mar W12",n:2},{week:"Mar W13",n:7}],
    byDow:{Mon:11,Tue:3,Wed:7,Thu:0,Fri:1},
    specials:{PE:7,Technology:11,Art:3,Music:0,Unknown:1} },
  { id:"EC", label:"EC (Price)", grade:"EC", total:6, chart:67, home:17,
    behaviors:[{type:"Verbal disruption",n:1},{type:"Noncompliance",n:2},{type:"Off-task",n:2},{type:"Emotional distress",n:3},{type:"Peer conflict",n:1},{type:"Physical behavior",n:2},{type:"Out of seat",n:1},{type:"Sleeping",n:1},{type:"Unspecified",n:1}],
    students:[{name:"Vincent Newberry",n:4},{name:"Cally Boseman",n:1},{name:"Wizdom Grantham",n:1}],
    weekly:[{week:"Feb W6",n:1},{week:"Feb W7",n:2},{week:"Mar W10",n:1},{week:"Mar W11",n:1},{week:"W14",n:1}],
    byDow:{Mon:1,Tue:0,Wed:0,Thu:2,Fri:3},
    specials:{PE:4,Technology:0,Art:2,Music:0,Unknown:0} },
  { id:"K-Fortner", label:"K – Fortner", grade:"K", total:17, chart:47, home:6,
    behaviors:[{type:"Verbal disruption",n:5},{type:"Noncompliance",n:6},{type:"Off-task",n:6},{type:"Emotional distress",n:8},{type:"Peer conflict",n:3},{type:"Physical behavior",n:5},{type:"Out of seat",n:4},{type:"Device misuse",n:1},{type:"Unspecified",n:4}],
    students:[{name:"Jaxon / Jaxson Anderson",n:8},{name:"Kamarri Douglas",n:4},{name:"Knowledge Grantham",n:3},{name:"Caleb Carter",n:1},{name:"Other",n:1}],
    weekly:[{week:"Jan W4",n:1},{week:"Jan W5",n:3},{week:"Feb W7",n:1},{week:"Feb W8",n:1},{week:"Feb W9",n:1},{week:"Mar W10",n:2},{week:"Mar W11",n:2},{week:"Mar W12",n:1},{week:"Mar W13",n:2},{week:"W14",n:3}],
    byDow:{Mon:5,Tue:2,Wed:7,Thu:3,Fri:0},
    specials:{PE:7,Technology:6,Art:2,Music:1,Unknown:1} },
  { id:"K-Helms", label:"K – Helms", grade:"K", total:6, chart:67, home:0,
    behaviors:[{type:"Verbal disruption",n:4},{type:"Noncompliance",n:4},{type:"Off-task",n:1},{type:"Emotional distress",n:2},{type:"Out of seat",n:1},{type:"Device misuse",n:2},{type:"Sleeping",n:1}],
    students:[{name:"Trayvon / Travon Williams",n:4},{name:"Acestin Britton",n:1},{name:"Dontae Champion",n:1}],
    weekly:[{week:"Feb W7",n:1},{week:"Feb W8",n:1},{week:"Feb W9",n:1},{week:"Mar W10",n:2},{week:"Mar W12",n:1}],
    byDow:{Mon:1,Tue:3,Wed:0,Thu:2,Fri:0},
    specials:{PE:2,Technology:3,Art:0,Music:1,Unknown:0} },
  { id:"K-McCormick", label:"K – McCormick", grade:"K", total:7, chart:57, home:0,
    behaviors:[{type:"Verbal disruption",n:2},{type:"Off-task",n:4},{type:"Emotional distress",n:1},{type:"Physical behavior",n:1},{type:"Unspecified",n:2}],
    students:[{name:"Monroe Bush",n:2},{name:"Emilia Fishman",n:1},{name:"Brielle Haskill",n:1},{name:"Christopher Jackson",n:1},{name:"Montonio Hall",n:1},{name:"Other",n:1}],
    weekly:[{week:"Jan W5",n:2},{week:"Mar W10",n:3},{week:"Mar W13",n:1},{week:"W14",n:1}],
    byDow:{Mon:0,Tue:5,Wed:1,Thu:1,Fri:0},
    specials:{PE:5,Technology:1,Art:0,Music:1,Unknown:0} },
  { id:"K-Wing", label:"K – Wing", grade:"K", total:19, chart:63, home:21,
    behaviors:[{type:"Verbal disruption",n:6},{type:"Noncompliance",n:5},{type:"Off-task",n:5},{type:"Emotional distress",n:2},{type:"Peer conflict",n:2},{type:"Physical behavior",n:3},{type:"Out of seat",n:6},{type:"Device misuse",n:3},{type:"Sleeping",n:3},{type:"Unspecified",n:5}],
    students:[{name:"Eternity Deitz-Hutchison",n:5},{name:"Dominic Hardy",n:4},{name:"Foster Langdon",n:4},{name:"Alivia Best",n:1},{name:"Other",n:5}],
    weekly:[{week:"Jan W4",n:2},{week:"Jan W5",n:3},{week:"Feb W7",n:3},{week:"Feb W8",n:4},{week:"Feb W9",n:2},{week:"Mar W12",n:2},{week:"W14",n:3}],
    byDow:{Mon:3,Tue:3,Wed:12,Thu:0,Fri:1},
    specials:{PE:3,Technology:12,Art:0,Music:3,Unknown:1} },
  { id:"K-Wingenroth", label:"K – Wingenroth", grade:"K", total:0, chart:0, home:0, noData:true,
    behaviors:[], students:[], weekly:[],
    byDow:{Mon:0,Tue:0,Wed:0,Thu:0,Fri:0},
    specials:{PE:0,Technology:0,Art:0,Music:0,Unknown:0} },
]

// ─── Classroom view (teacher-facing) ─────────────────────────────────────────

export const staticData = {
  kpis,
  dq,
  weekly,
  calFlags,
  grades,
  specialsNorm,
  dow,
  behaviors,
  timeBlocks,
  heatmap,
  topClasses,
  monthly,
  consistency,
  students,
  roadmap,
  classrooms,
};
