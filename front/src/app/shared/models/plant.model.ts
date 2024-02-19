import {UserModel} from "./user.model";

export class PlantModel {
  private _plant_id: number;
  private _plant_type: number;
  private _owner: number;
  private _name: string;
  private _image: string | null;
  private _indoor: boolean;

  constructor(
    plant_id: number,
    plant_type: number,
    owner: number,
    name: string,
    image: string | null,
    indoor: boolean
  ) {
    this._plant_id = plant_id;
    this._plant_type = plant_type;
    this._owner = owner;
    this._name = name;
    this._image = image;
    this._indoor = indoor;
  }

  get plant_id(): number {
    return this._plant_id;
  }

  set plant_id(value: number) {
    this._plant_id = value;
  }

  get plant_type(): number {
    return this._plant_type;
  }

  set plant_type(value: number) {
    this._plant_type = value;
  }

  get owner(): number {
    return this._owner;
  }

  set owner(value: number) {
    this._owner = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get image(): string | null {
    return this._image;
  }

  set image(value: string | null) {
    this._image = value;
  }

  get indoor(): boolean {
    return this._indoor;
  }

  set indoor(value: boolean) {
    this._indoor = value;
  }

  static fromJson(json: any): PlantModel {
    const { plant_id, plant_type, owner, name, image, indoor } = json;
    if (!plant_id || !plant_type || !owner || !name || indoor === undefined) {
      throw new Error('Le JSON ne contient pas toutes les propriétés requises.');
    }
    return new PlantModel(plant_id, plant_type, owner, name, image, indoor);
  }
}

