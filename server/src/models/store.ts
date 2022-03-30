import { Location } from "./location";
import { Default, Format, Pattern, Required, Description, Name } from "@tsed/schema";
import { Model, ObjectID, Ref } from "@tsed/mongoose";

@Model()
export class Store {
  @ObjectID("id")
  _id: string;

  @Required()
  @Description("Name of the store")
  name: string;

  @Required()
  @Description("Address of the store")
  address: string;

  @Required()
  @Description("Owner surname and name of the store")
  owner: string;

  @Pattern(/^(((\+33\s)|0)[1-9]\s([0-9][0-9]\s){4})$/)
  @Description("Number of the store")
  @Required()
  phone: number;

  @Format("date-time")
  @Description("Date of store creation")
  @Default(Date.now)
  dateCreation: Date = new Date();

  @Required()
  @Description("Belongs to this location")
  @Ref(() => Location)
  location: Ref<Location>;
}
