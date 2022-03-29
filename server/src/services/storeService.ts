import { Inject, Service } from "@tsed/common";
import { MongooseModel } from "@tsed/mongoose";
import { $log } from "@tsed/logger";
import { Store } from "../models/store";

@Service()
export class StoreService {
  @Inject(Store)
  private Store: MongooseModel<Store>;
  /**
   * Find a store by his ID.
   * @param id
   * @returns {undefined|Store}
   */
  async find(id: string): Promise<Store | null> {
    $log.debug("Search a store from ID", id);
    const store = await this.Store.findById(id).exec();

    $log.debug("Found", store);
    return store;
  }

  /**
   *
   * @param store
   * @returns {Promise<TResult|TResult2|Store>}
   */
  async save(store: Store): Promise<Store> {
    $log.debug({ message: "Validate store", store });
    const model = new this.Store(store);
    await model.validate();

    $log.debug({ message: "Save store", store });
    await model.updateOne(store, { upsert: true });

    $log.debug({ message: "Store saved", model });

    return model;
  }

  /**
   *
   * @returns {Store[]}
   */
  async query(options = {}): Promise<Store[]> {
    return this.Store.find(options).exec();
  }

  /**
   *
   * @param id
   * @returns {Promise<Store>}
   */
  async remove(id: string): Promise<Store> {
    return await this.Store.findById(id).deleteOne().exec();
  }
}
