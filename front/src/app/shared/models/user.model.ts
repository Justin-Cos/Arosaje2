export class UserModel{
  private _user_id: number;
  private _username: string;
  private _email: string;
  private _profile_picture: string;
  private _bio: string;
  private _role: UserRole | undefined;
  constructor(
    user_id: number,
    username: string,
    email: string,
    profile_picture: string,
    bio: string,
    role?: UserRole
  ) {
    this._user_id = user_id;
    this._username = username;
    this._email = email;
    this._profile_picture = profile_picture;
    this._bio = bio;
    this._role = role;
  }
  get user_id(): number {
    return this._user_id;
  }

  set user_id(value: number) {
    this._user_id = value;
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
    const { user_id, username, email, profile_picture, bio, role } = json;
    if (!username || !email || !profile_picture) {
      throw new Error('Le JSON ne contient pas toutes les propriétés requises.');
    }

    return new UserModel(user_id, username, email, profile_picture, bio, role);
  }
}

export enum UserRole {
  admin="admin",
  botanist="botanist",
}
