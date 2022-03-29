import { Location } from "../../models/location";
import { LocationService } from "../../services/locationService";
import {
  BodyParams,
  Controller,
  Delete,
  Get,
  PathParams,
  Post,
  Put,
} from "@tsed/common";
import { Required, Status, Description, Summary } from "@tsed/schema";
import { NotFound } from "@tsed/exceptions";

@Controller("/")
export class LocationController {
  constructor(private LocationService: LocationService) {}

  /**
   *
   * @returns {Promise<Location[]>}
   */
  @Get("/")
  @Summary("Return all location")
  @Status(200, {
    description: "Success",
    type: Location,
    collectionType: Array,
  })
  async getAllLocation(): Promise<Location[] | []> {
    return this.LocationService.query();
  }

  /**
   *
   * @param {string} id
   * @returns {Promise<ILocation>}
   */
  @Get("/:id")
  @Summary("Return a location from his ID")
  @Status(200, { description: "Success", type: Location })
  async get(@Required() @PathParams("id") id: string): Promise<Location> {
    const location = await this.LocationService.find(id);

    if (location) {
      return location;
    }

    throw new NotFound("Location not found");
  }

  /**
   *
   * @param {Location} location
   * @returns {Promise<Location>}
   */
  @Post("/")
  @Summary("Create a new Location")
  @Status(201, { description: "Created", type: Location })
  save(
    @Description("Location model")
    @BodyParams(Location)
    @Required()
    location: Location,
  ) {
    return this.LocationService.save(location);
  }

  /**
   *
   * @param id
   * @param location
   * @returns {Promise<Location>}
   */
  @Put("/:id")
  @Summary("Update location information")
  @Status(200, { description: "Success", type: Location })
  async update(
    @PathParams("id") @Required() id: string,
    @BodyParams() @Required() location: Location,
  ): Promise<Location> {
    location._id = id;

    return this.LocationService.save(location);
  }

  /**
   *
   * @param id
   * @returns {{id: string, name: string}}
   */
  @Delete("/:id")
  @Summary("Remove a location.")
  @Status(204, { description: "No content" })
  async remove(@PathParams("id") id: string): Promise<void> {
    await this.LocationService.remove(id);
  }
}
