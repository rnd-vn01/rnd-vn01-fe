interface ICameraQuaternionSlice {
  x: number;
  y: number;
  z: number;
  w: number;
}

interface IUser {
  name?: string;
  email?: string;
  profileImage?: string;
  firebaseId?: string;
  isAdmin?: boolean;
}

interface IAuthSlice {
  isLoggedIn: boolean;
  user: IUser;
}

interface IQuickSearchResults {
  query: string;
}
