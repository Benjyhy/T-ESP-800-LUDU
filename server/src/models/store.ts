import { Location } from "./location";
import {
    Default,
    Format,
    Pattern,
    Required,
  } from "@tsed/schema";
  import { Model, ObjectID, Ref } from "@tsed/mongoose";
  
  const phone_regex : string = "^(0|\+33 )[1-9]([-. ]?[0-9]{2} ){3}([-. ]?[0-9]{2})$";

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

    @Pattern(phone_regex)
    @Required()
    phone: number;

    @Format("date-time")
    @Default(Date.now)
    dateCreation: Date = new Date();

    @Ref(() => Location)
    location: Ref<Location>

  }
  