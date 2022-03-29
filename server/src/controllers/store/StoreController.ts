import { Store } from "../../models/store";
import { StoreService } from "../../services/storeService";
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
export class StoreController {
  constructor(private StoreService: StoreService) {}

  /**
   *
   * @returns {Promise<Store[]>}
   */
  @Get("/")
  @Summary("Return all store")
  @Status(200, {
    description: "Success",
    type: Store,
    collectionType: Array,
  })
  async getAllStore(): Promise<Store[] | []> {
    return this.StoreService.query();
  }

  /**
   *
   * @param {string} id
   * @returns {Promise<IStore>}
   */
  @Get("/:id")
  @Summary("Return a store from his ID")
  @Status(200, { description: "Success", type: Store })
  async get(@Required() @PathParams("id") id: string): Promise<Store> {
    const store = await this.StoreService.find(id);

    if (store) {
      return store;
    }

    throw new NotFound("Store not found");
  }

  /**
   *
   * @param {Store} store
   * @returns {Promise<Store>}
   */
  @Post("/")
  @Summary("Create a new Store")
  @Status(201, { description: "Created", type: Store })
  save(
    @Description("Store model")
    @BodyParams(Store)
    @Required()
    store: Store,
  ) {
    return this.StoreService.save(store);
  }

  /**
   *
   * @param id
   * @param store
   * @returns {Promise<Store>}
   */
  @Put("/:id")
  @Summary("Update store information")
  @Status(200, { description: "Success", type: Store })
  async update(
    @PathParams("id") @Required() id: string,
    @BodyParams() @Required() store: Store,
  ): Promise<Store> {
    store._id = id;

    return this.StoreService.save(store);
  }

  /**
   *
   * @param id
   * @returns {{id: string, name: string}}
   */
  @Delete("/:id")
  @Summary("Remove a store.")
  @Status(204, { description: "No content" })
  async remove(@PathParams("id") id: string): Promise<void> {
    await this.StoreService.remove(id);
  }
}
