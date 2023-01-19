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

interface ILanguageSlice {
  currentLanguage: "VI" | "EN";
}

interface IMeridian {
  code: string;
  name: string;
  description: string;
  diseases: string;
  points?: Array<IAcupuncturePointSimple>
}

interface IAcupuncturePointSimple {
  code: string;
  name: string;
}

interface IAcupuncturePoint extends IAcupuncturePointSimple {
  code: string;
  name: string;
  description: string;
  anatomy?: string;
  functionalities: Array<string>;
  technique?: string;
  caution?: string;
}

interface IInformationBlock {
  isPoint?: boolean;
  itemInformation?: IMeridian | IAcupuncturePoint
}
