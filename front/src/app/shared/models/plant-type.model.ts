export class PlantTypeModel {
  private _plant_type_id: number;
  private _name: string;

  constructor(plant_type_id: number, name: string) {
    this._plant_type_id = plant_type_id;
    this._name = name;
  }

  get plant_type_id(): number {
    return this._plant_type_id;
  }

  set plant_type_id(value: number) {
    this._plant_type_id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  static fromJson(json: any): PlantTypeModel {
    const {plant_type_id, name} = json;
    if (!plant_type_id || !name) {
      throw new Error('Le JSON ne contient pas toutes les propriétés requises.');
    }
    return new PlantTypeModel(plant_type_id, name);
  }
}
