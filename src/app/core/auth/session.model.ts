export interface User {
  userName: string;
  userId:number;
  customerId: number;
  lang: any;
  customerIdEnc : string;
};
/**
 * localstorage üzerinde session nesnesi durur bu nesne üzerinde clientin  ihtiyaç duyduğu bütün datalar mevcuttur.
 * token expire date vs. 
 * 
 */
export interface ISession{
  token: string;
  user: User;
  hasError: boolean;
  loading: boolean;
  expires: Date;
  /**
   * Right string uuid olur. bu uuidler daha önce sistem tarafından yazılımcılar oluşturur.  
   * Sistem içerisinde bulunan bir directive tarafından takipleri yapılır.
   */
  rights: Array<string> ;
  token_type:string;
} 



export interface UserLogin{
  username:string;
  password:string;
  grant_type:string;
}

export const initialUser: User = {
  userName:'',
  userId:0,
  customerId: 0,
  lang: {},
  customerIdEnc: ''
};


/**
 * ISession interfaceinden inherit olur ve Session sınıfı oluşur.
 * 
 */
export class Session implements  ISession {
  token: string;
  user: User;
  hasError: boolean;
  loading: boolean;
  expires:Date;
  token_type:string;
  rights: Array<string>;
   static initialSession(vals: any = {}): Session {
  return Object.assign({},
    {
      token: null,
      user: initialUser,
      expires:null,
      token_type:"bearer",
      rights:[],
      hasError: false,
      loading: false
    }, vals);
};
};

export class ReadedDocs {
  readedDocuments: Array<number>;
  expires: Date;
  static initialReadedDocs(vals: any = {}): ReadedDocs {
    return Object.assign({},
      {
        expires: null,
        readedDocuments: []           
      }, vals);
  };
}



