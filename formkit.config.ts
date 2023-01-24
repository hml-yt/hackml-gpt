import { generateClasses } from "@formkit/themes";
import theme from "./formkit.theme";

import { DefaultConfigOptions } from "@formkit/vue";

const config: DefaultConfigOptions = {
  config: {
    classes: generateClasses(theme),
  },
};

export default config;
