
export interface IAuth {
  user: {
  name: string;
  email: string;
  verify: string;
  }
  token: string
}

export interface IContact {
  _id: string,
  userID: string,
  name: string,
  phone: string,
  favorite: boolean,
  avatarURL?: string,
  email?: string,
  surname?: string
}

export interface IQuery {
  userID: string,
  token: string,
  favorite: boolean,
  page: string,
  contactID: string,
  query: string,
  contact: IContact,
  formData: object
}