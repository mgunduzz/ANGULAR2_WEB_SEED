
export class Document {
  id?: number;
  viewDate?: number;
  publishDate?: number;
  title?: string;
  documentTypeId?: number;
  mediaNameId?: number;
  mediaName?: string;
  content?: string;
  docTypeIdName?: string;
  tiraj?: number;
  checked?: boolean;
  rowIndex?: number;
  isReaded?:boolean;
  onDocumentHover?:boolean = false;
}  