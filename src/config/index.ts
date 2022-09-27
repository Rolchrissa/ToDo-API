import development from "./development";
import prod from "./prod";

const config = () => {
  const configs: any = {
    prod,
    development,
  };
  return configs[process.env.NODE_ENV || "development"];
};

export = config();
