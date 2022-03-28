import {Inject, Service} from "@tsed/common";
import {MongooseModel} from "@tsed/mongoose";
import {$log} from "@tsed/logger";
import {Location} from "../models/location";


@Service()
export class LocationService {
    @Inject(Location)
    private Location: MongooseModel<Location>;
/**
   * Find a location by his ID.
   * @param id
   * @returns {undefined|Location}
   */
  async find(id: string): Promise<Location | null> {
    $log.debug("Search a location from ID", id);
    const location = await this.Location.findById(id).exec();

    $log.debug("Found", location);
    return location;
  }

  /**
   *
   * @param location
   * @returns {Promise<TResult|TResult2|Location>}
   */
  async save(location: Location): Promise<Location> {
    $log.debug({message: "Validate location", location});

    // const m = new CModel(location);
    // console.log(m);
    // await m.update(location, {upsert: true});

    const model = new this.Location(location);
    $log.debug({message: "Save location", location});
    await model.updateOne(location, {upsert: true});

    $log.debug({message: "Location saved", model});

    return model;
  }

  /**
   *
   * @returns {Location[]}
   */
  async query(options = {}): Promise<Location[]> {
    return this.Location.find(options).exec();
  }

  /**
   *
   * @param id
   * @returns {Promise<Location>}
   */
  async remove(id: string): Promise<Location> {
    return await this.Location.findById(id).deleteOne().exec();
  }

}