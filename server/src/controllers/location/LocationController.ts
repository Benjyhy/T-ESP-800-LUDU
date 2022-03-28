import { Controller } from "@tsed/di";
import { Get } from "@tsed/schema";
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
  async getAllLocation(): Promise<Location[] | null> {
    return this.LocationService.query();
  }
}
