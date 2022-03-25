import {Controller} from "@tsed/di";
import {Get} from "@tsed/schema";
import {Location} from "../../models/location";

@Controller("/")
export class LocationController {
  @Get("/")
  get() {
    return "location";
  }
}
