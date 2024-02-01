import {PlantModel} from "./plant.model";
import {PlantService} from "../services/ressources/plant.service";
import {UserService} from "../services/ressources/user.service";
import {UserModel} from "./user.model";
import {AddressModel} from "./address.model";
import {AddressService} from "../services/ressources/address.service";

export class CareSessionModel {
  private _session_id: number;
  private _plant: number;
  private _caretaker: number | null;
  private _location: number;
  private _date_start: Date;
  private _date_end: Date;

  constructor(
    session_id: number,
    plant: number,
    caretaker: number | null,
    location: number,
    date_start: Date,
    date_end: Date
  ) {
    this._session_id = session_id;
    this._plant = plant;
    this._caretaker = caretaker;
    this._location = location;
    this._date_start = date_start;
    this._date_end = date_end;
  }

  get session_id(): number {
    return this._session_id;
  }

  set session_id(value: number) {
    this._session_id = value;
  }

  get plant(): number {
    return this._plant;
  }

  set plant(value: number) {
    this._plant = value;
  }

  get caretaker(): number | null {
    return this._caretaker;
  }

  set caretaker(value: number) {
    this._caretaker = value;
  }

  get location(): number {
    return this._location;
  }

  set location(value: number) {
    this._location = value;
  }

  get date_start(): Date {
    return this._date_start;
  }

  set date_start(value: Date) {
    this._date_start = value;
  }

  get date_end(): Date {
    return this._date_end;
  }

  set date_end(value: Date) {
    this._date_end = value;
  }
  get duration(): number {
    return this._date_end.getTime() - this._date_start.getTime();
  }
  /*
  public getPlant(): PlantModel {
    return PlantService.getPlantById(this._plant);
  }
  public geCareTaker(): UserModel {
    return UserService.getUserById(this._caretaker);
  }
  public getLocation(): AddressModel {
    return AddressService.getAddressById(this._location);
  }
*/

  static fromJson(json: any): CareSessionModel {
    const { session_id, plant, caretaker, location, date_start, date_end } = json;
    if (!session_id || !plant || !location || !date_start || !date_end) {
      throw new Error('Le JSON ne contient pas toutes les propriétés requises.');
    }


    return new CareSessionModel(session_id, plant, caretaker, location, date_start, date_end);
  }
}
