import "colors";
const objectLog = (obj) => {
  console.log(`${JSON.stringify(obj, null, 2)}`.rainbow);
};
const warn = (log: string) => {
  console.log("⚠️ 😨 ", " WARN ".bgYellow.white, `${log}`, "⚠️");
};
const error = (log: string) => {
  console.log("❌😢 ", " ERROR ".bgRed.yellow, `${log}`, "");
};
const info = (log: string) => {
  console.log("👉", " INFO ".bgGreen.white, `${log}`, "");
};

export default { warn, objectLog, error, info };
