interface IParamUpdateAcupuncturePoint extends IAcupuncturePoint { }
interface IParamUpdateMeridian {
  code: string;
  name: string;
  description: string;
  diseases: string;
  points?: Array<string>
}

interface IParamCreateUpdateAccount {
  firebase_id: string;
  email: string;
  image: string;
  name: string;
  roles?: Array<string>
}
