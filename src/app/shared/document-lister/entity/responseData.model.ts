import { Document} from './document.model';
import { BehaviorSubject } from 'rxjs';

export class ResponseData{

  totalCount:BehaviorSubject<any>;
currentPage:number;
pageViewCount:number;
showItems:Array<string>;
    documents:BehaviorSubject<Array<Document>>;


}