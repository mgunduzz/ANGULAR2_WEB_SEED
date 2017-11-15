import {StreamModel} from "./stream.model";
export class DocumentModel {

  id?: number;
  title?: string;
  publishDate?: any;
  viewDate?: any;
  fileDetails?: any[];
  link? : string;
  any?: any;
  streams?: Array<StreamModel>;
  uuid? : string;
  custoUUID?: string;
  extendedType?:string;
  /**
   * Foto modelleri
   */
  pageNumber?: number;
  sales?: any;
  stxcm?: any;

  duration?: any;
  broadcastName?: string;
  broadcastContent?: string; 
  city?: string;
  documentType?: string;

  /**
   * text modelleri
   */
  dateUpdate?: any;
  broadcastType?: string;
  status?: string;

  mediaName?: string;
  coverage?: string;
  docContent?: any;
  content?: any;
  documentTypeId?: number;
  fileUUIDs?: Array<string>;
  fileContentTypes?: Array<number>;
  contentDetail?: any;
  cityId?: number;
  mediaNameId?: number;
  rowIndex?: number;
  broadcastNameId?: number;


}