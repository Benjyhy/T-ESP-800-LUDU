import { join } from "path";
import { Configuration, Inject } from "@tsed/di";
import { PlatformApplication } from "@tsed/common";
import "@tsed/platform-express"; // /!\ keep this import
import bodyParser from "body-parser";
import compress from "compression";
import cookieParser from "cookie-parser";
import methodOverride from "method-override";
import cors from "cors";
import "@tsed/ajv";
import "@tsed/swagger";
import "@tsed/mongoose";
import { config } from "./config";
import { paths } from "./path";

const mongoConfig = {
  mongoose: [
    {
      id: "default",
      url: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@cluster0.lyfb9.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
      connectionOptions: {},
    },
  ],
};

console.log(mongoConfig.mongoose[0].url);
@Configuration({
  ...config,
  ...mongoConfig,
  acceptMimes: ["application/json"],
  httpPort: process.env.PORT || 8083,
  httpsPort: false, // CHANGE
  componentsScan: false,
  ...paths,
  swagger: [
    {
      path: "/doc",
      specVersion: "3.0.1",
    },
  ],
  middlewares: [
    cors(),
    cookieParser(),
    compress({}),
    methodOverride(),
    bodyParser.json(),
    bodyParser.urlencoded({
      extended: true,
    }),
  ],
  views: {
    root: join(process.cwd(), "../views"),
    extensions: {
      ejs: "ejs",
    },
  },
  exclude: ["**/*.spec.ts"],
})
export class Server {
  @Inject()
  protected app: PlatformApplication;

  @Configuration()
  protected settings: Configuration;
}
