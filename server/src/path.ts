import * as location from "./controllers/location";
import * as pages from "./controllers/pages";

export const paths = {
  mount: {
    "/": [...Object.values(pages)],
    "/location": [...Object.values(location)],
  },
};