import { Location } from "./location";
import { Default, Format, Pattern, Required } from "@tsed/schema";
import { Model, ObjectID, Ref } from "@tsed/mongoose";

@Model()
export class Store {
  @ObjectID("id")
  _id: string;

  @Required()
  name: string;

  @Required()
  address: string;

  @Required()
  owner: string;

  @Pattern(/^(((\+33\s)|0)[1-9]\s([0-9][0-9]\s){4})$/)
  @Required()
  phone: number;

  @Format("date-time")
  @Default(Date.now)
  dateCreation: Date = new Date();

  // @Ref(() => Location)
  // location: Ref<Location>;
}
