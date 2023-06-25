export const getSanitizedConfig = <Config extends {}>(
  config: Config
): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined || value === null || value === "") {
      console.log("missing value:", value);
      throw new Error(`Missing key ${key} in config.env`);
    }
  }
  return config as Config;
};
