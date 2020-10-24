import { createMuiTheme } from "@material-ui/core/styles";
import variant from "./variant";
import typography from "./typography";
import breakpoints from "./breakpoints";

const theme = variant => {
  return createMuiTheme(
    {
      spacing: 4,
      breakpoints: breakpoints,
      typography: typography,
      palette: variant.palette,
    },
    variant.name
  );
};

export default theme(variant);
