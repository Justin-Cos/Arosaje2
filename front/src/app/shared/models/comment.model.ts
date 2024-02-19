import {UserRole} from "./user.model";

export class CommentModel {
  private _id_comment: number;
  private _care_session: number;
  private _author: number;
  private _author_role: UserRole;
  private _date: Date;
  private _title: string | null;
  private _content: string | null;
  private _image: string | null;
  constructor(id_comment: number,
              care_session: number,
              author: number,
              author_role: UserRole,
              date: string,
              title: string | null,
              content: string | null,
              image: string | null) {
    this._id_comment = id_comment;
    this._care_session = care_session;
    this._author = author;
    this._author_role = author_role;
    this._date = new Date(date);
    this._title = title;
    this._content = content;
    this._image = image;
  }

  get id_comment() {
    return this._id_comment;
  }

  set id_comment(value) {
    this._id_comment = value;
  }

  get care_session() {
    return this._care_session;
  }

  set care_session(value) {
    this._care_session = value;
  }

  get author() {
    return this._author;
  }

  set author(value) {
    this._author = value;
  }
  get title() {
    return this._title;
  }
  set title(value) {
    this._title = value;
  }
  get author_role() {
    return this._author_role;
  }

  set author_role(value) {
    this._author_role = value;
  }

  get date() {
    return this._date;
  }

  set date(value) {
    this._date = value;
  }

  get content() {
    return this._content;
  }

  set content(value) {
    this._content = value;
  }

  get image() {
    return this._image;
  }

  set image(value) {
    this._image = value;
  }

  static fromJson(json: any) {
    const { id_comment, care_session, author, author_role, date, title, content, image } = json;
    if (!id_comment || !care_session || !author || !author_role || !date) {
      throw new Error('Le JSON ne contient pas toutes les propriétés requises.');
    }

    return new CommentModel(id_comment, care_session, author, author_role, date, title, content, image);
  }
}
