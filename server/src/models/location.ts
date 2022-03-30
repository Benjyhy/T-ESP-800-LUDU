import { Store } from "./store";
import {
  CollectionOf,
  Default,
  Format,
  MaxLength,
  MinLength,
  Required,
  Description
} from "@tsed/schema";
import { Model, ObjectID, Ref, Unique } from "@tsed/mongoose";

@Model()
export class Location {
  @ObjectID("id")
  _id: string;

  @Unique()
  @Description("Name of the location")
  @Required()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @Format("date-time")
  @Description("Date of location creation")
  @Default(Date.now)
  dateCreation: Date = new Date();

  @Description("Stores belonging  to this location")
  @Ref(() => Store)
  @CollectionOf(() => Store)
  stores?: Ref<Store>[];
}
