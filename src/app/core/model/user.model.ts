export interface User {
	id: string;
	email: string;
	phoneNumber: string;
	displayName: string;
	roles: Roles;
	creationDate: Date;
	modificationDate: Date;
}

export interface Roles {
	subscriber?: boolean;
	editor?: boolean;
	admin?: boolean;
}

// export class User {
// 	id: string;
// 	creationDate: Date;
// 	modificationDate: Date;
// 	password: string;

// 	constructor(
// 		public email: string,
// 		public phoneNumber: string,
// 		public displayName?: string,
// 		public roles: Roles = new Roles()
// 	) {}
// }

// export class Roles {
// 	subscriber?: boolean;
// 	editor?: boolean;
// 	admin?: boolean;

// 	constructor() {
// 		this.subscriber = true;
// 		this.admin = true;
// 		this.editor = true;
// 	}
// }
