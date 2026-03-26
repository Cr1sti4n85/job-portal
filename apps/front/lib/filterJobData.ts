export const locations = [
  "I Región",
  "II Región",
  "III Región",
  "IV Región",
  "V Región",
  "Región Metropolitana",
  "VI Región",
  "VII Región",
  "VIII Región",
  "IX Región",
  "X Región",
  "XI Región",
  "XII Región",
  "XIV Región",
  "XV Región",
];

export const jobsList = [
  "Frontend",
  "Backend",
  "Full Stack",
  "Data Science",
  "DevOps",
  "UI/UX Design",
  "QA",
  "Mobile",
  "Otro",
];

export const experience = ["trainee", "junior", "semi-senior", "senior"];

export const salaries = ["0-499999", "500000-999999", "1000000-1999999"];

export const filterData = [
  {
    filterType: "Ubicación",
    filter: "location",
    opts: locations,
  },
  {
    filterType: "Tipo de empleo",
    filter: "jobType",
    opts: jobsList,
  },
  {
    filterType: "Sueldo",
    filter: "salary",
    opts: salaries,
  },
];
