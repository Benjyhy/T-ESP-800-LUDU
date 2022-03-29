import { Store } from "./store";
import {
  CollectionOf,
  Default,
  Format,
  MaxLength,
  MinLength,
  Required,
} from "@tsed/schema";
import { Model, ObjectID, Ref, Unique } from "@tsed/mongoose";

@Model()
export class Location {
  @ObjectID("id")
  _id: string;

  @Unique()
  @Required()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @Format("date-time")
  @Default(Date.now)
  dateCreation: Date = new Date();

  // @Ref(() => Store)
  // @CollectionOf(() => Store)
  // contracts?: Ref<Store>[];
}
