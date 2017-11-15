export class CustomerPress {
  name: string;
  viewType: boolean;
  cssStyles: KeyValue[]=[];
  documents: any[] = [];
  pagginationLists: PagginationList[]=[];
}




interface KeyValue {
 name :string;
 value :string;

}

interface PagginationList {
  pageYear: string;
  pageno: string;

}


export class CssSettting {
  textColor: string;
  backgroundColor: string;
  titleColor: string;
  titleBackgroundColor: string;
  textFont: string;
  fontSize: string;
  listBackgroundColor: string;
  linkColor: string;
}


