export class UserModel{
  private _username: string;
  private _email: string;
  private _profile_picture: string;
  private _bio: string;
  private _role: UserRole | undefined;
  constructor(
    username: string,
    email: string,
    profile_picture: string,
    bio: string,
    role?: UserRole
  ) {
    this._username = username;
    this._email = email;
    this._profile_picture = profile_picture;
    this._bio = bio;
    this._role = role;
  }
  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get profile_picture(): string {
    return this._profile_picture;
  }

  set profile_picture(value: string) {
    this._profile_picture = value;
  }

  get bio(): string {
    return this._bio;
  }

  set bio(value: string) {
    this._bio = value;
  }

  get role(): UserRole | undefined {
    return this._role;
  }

  set role(value: UserRole | undefined) {
    this._role = value;
  }
  static fromJson(json: any) {
    const { username, email, profile_picture, bio, role } = json;
console.log(json)
    // Assurez-vous que toutes les propriétés requises sont présentes dans le JSON
    if (!username || !email || !profile_picture) {
      throw new Error('Le JSON ne contient pas toutes les propriétés requises.');
    }

    return new UserModel(username, email, profile_picture, bio, role);
  }
}

export enum UserRole {
  admin="admin",
  botanist="botanist",
}
