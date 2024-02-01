
export class AddressModel {
  private _address_id: number;
  private _owner: number;
  private _longitude: number;
  private _latitude: number;
  private _country: string;
  private _city: string;
  private _address: string;
  private _zip_code: number;

  constructor(
    address_id: number,
    owner: number,
    longitude: number,
    latitude: number,
    country: string,
    city: string,
    address: string,
    zip_code: number
  ) {
    this._address_id = address_id;
    this._owner = owner;
    this._longitude = longitude;
    this._latitude = latitude;
    this._country = country;
    this._city = city;
    this._address = address;
    this._zip_code = zip_code;
  }

  get address_id(): number {
    return this._address_id;
  }

  set address_id(value: number) {
    this._address_id = value;
  }

  get owner(): number {
    return this._owner;
  }

  set owner(value: number) {
    this._owner = value;
  }

  get longitude(): number {
    return this._longitude;
  }

  set longitude(value: number) {
    this._longitude = value;
  }

  get latitude(): number {
    return this._latitude;
  }

  set latitude(value: number) {
    this._latitude = value;
  }

  get country(): string {
    return this._country;
  }

  set country(value: string) {
    this._country = value;
  }

  get city(): string {
    return this._city;
  }

  set city(value: string) {
    this._city = value;
  }

  get address(): string {
    return this._address;
  }

  set address(value: string) {
    this._address = value;
  }

  get zip_code(): number {
    return this._zip_code;
  }

  set zip_code(value: number) {
    this._zip_code = value;
  }

  static fromJson(json: any): AddressModel {
    const { address_id, owner, longitude, latitude, country, city, address, zip_code } = json;
    console.log(json);
    if (!address_id || !owner || !longitude || !latitude || !country || !city || !address || !zip_code) {
      throw new Error('Le JSON ne contient pas toutes les propriétés requises.');
    }

    //const ownerModel = UserModel.fromJson(User);

    return new AddressModel(address_id, owner, longitude, latitude, country, city, address, zip_code);
  }
}
