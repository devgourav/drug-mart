export interface User{
  id: string;
  username: string;
  email:string;
  displayName?: string;
  roles: Roles;
  creationDate: Date;
  modificationDate: Date;

  // constructor(id: string,username: string,email: string){
  //   this.id = id;
  //   this.username = username;
  //   this.email = email;
  // }
}

export interface Roles{
  subscriber?: boolean;
  editor?: boolean;
  admin?: boolean;
}
