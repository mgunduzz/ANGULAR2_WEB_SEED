import { DocumentHelperService } from './../../documents/services/helpers/document-helper.service';
import { Injectable, EventEmitter} from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { DocumentModel } from './entity/document.model';
import { StreamModel } from './entity/stream.model';

import { NewsService } from '../../documents/news/news-service.service'
import { NewsDocumentModel, DocumentSearchModel, KeyModel, DocumentTypeEnum, ContentTypeModel } from "../../core/model"
import { environment } from "../../../environments/environment"


@Injectable()
export class DocViewerServiceService {

  documents: DocumentModel[];
  streamaApiUrl: string = environment.STREAM_API_URL;
  changeDocStream: EventEmitter<number> = new EventEmitter<number>();

  constructor(private newsService: NewsService, private documentHelperService: DocumentHelperService) {
    this.documents = new Array<DocumentModel>();

  }

  public selectedStreamTab :string = '';

  public documentChangedSource = new Subject<DocumentModel>();
  public documentChangedStream$ = this.documentChangedSource.asObservable();

  public docViewerToolBoxProcessChangedSource = new Subject<string>();
  public docViewerToolBoxProcessChangedStream$ = this.docViewerToolBoxProcessChangedSource.asObservable();

  public documentStreamIndexChangedSource = new Subject<number>();
  public documentStreamIndexChangedStream$ = this.documentStreamIndexChangedSource.asObservable();

  public keywordClickedSource = new Subject<any>();
  public keywordClickedStream$ = this.keywordClickedSource.asObservable();

  public keywordCheckedChangeSource = new Subject<Array<number>>();
  public keywordCheckedChangeStream$ = this.keywordCheckedChangeSource.asObservable();

  public selectedPageIndex: number = 1;

  public currentZoomProcessType: string = 'full';

  /**
   * fileUUID'ler kullan�larak d�k�manlar�n  mecra bazl� streamleri olu�turulur.
   * @param document
   */
  getDocumentStreams(document: DocumentModel): StreamModel[] {
    let streams = new Array<StreamModel>();


    let i: number = 0;
    var textContent: string;

    let content = document.content[Object.keys(document.content)[0]];
    if (content) {
      textContent = content;
    }


    if (document.documentTypeId == DocumentTypeEnum.Internet || document.documentTypeId == DocumentTypeEnum.Social || document.documentTypeId == DocumentTypeEnum.Agenda || document.documentTypeId == DocumentTypeEnum.NewsAgency) {
      streams.push({ mimeType: 3, text: textContent });

    }
    else {
      // burada d�k�mandan dosyaalar� ��kart�l�r.
      if (document.fileUUIDs) {
        for (let fileUUID of document.fileUUIDs) {

          var stringUrl: string = this.streamaApiUrl + "streamfile.ashx?uuid=" + fileUUID;
          var contentType = document.fileContentTypes[i];

          let stream: StreamModel = new StreamModel();
          stream.url = stringUrl;
          stream.diaUrl = stringUrl + "&node=1";
          stream.text = textContent;

          if (ContentTypeModel.jpeg.value === contentType) {

            stream.mimeType = 2;
            streams.push(stream);
          } else if (ContentTypeModel.mp4.value === contentType || ContentTypeModel.wma.value === contentType || ContentTypeModel.mp3.value === contentType) {


            stream.mimeType = 1;
            streams.push(stream);
          } else if (ContentTypeModel.txt.value === contentType || ContentTypeModel.serialized.value === contentType) {
            stream.mimeType = 3;
            streams.push(stream);
          }


          i++;
        }

      }


    }

    return streams;
  }


  /**
   * d�k�man�n belli fieldlar�n� �eker
   * @param docId
   * @param loadStaticFields
   */
  loadDocumentFieldsForStream(doc: DocumentModel, loadStaticFields: boolean = false, isDocumentListSimpleList: boolean = false, searchForPublic: boolean = false): Observable<DocumentModel> {
    return Observable.create(observer => {
      let fieldList: string[] = [];

      if (loadStaticFields) {
        fieldList.push("Id");
        fieldList.push("DocumentTypeId");
        fieldList.push("PublishDate");
        fieldList.push("MediaName");
        fieldList.push("Title");
        fieldList.push("RowIndex");
        fieldList.push("MediaNameId");
      }

      if (!isDocumentListSimpleList) {
        fieldList.push("FileDetails");
      }

      fieldList.push("FileUUIDs");
      fieldList.push("Content");
      fieldList.push("FileContentTypes");
      fieldList.push("MediaName");
      fieldList.push("DocContent");
      fieldList.push("City");
      fieldList.push("CityId");
      fieldList.push("BroadcastName");
      fieldList.push("BroadcastNameId");
      fieldList.push("ViewDate");
      fieldList.push("PageNumber");
      fieldList.push("Sales");
      fieldList.push("Stxcm");
      fieldList.push("Duration");
      fieldList.push("ContentDetail");
      fieldList.push("Link");
      fieldList.push("UUID");
      fieldList.push("Period");
      fieldList.push("PeriodId");
      fieldList.push("Coverage");
      fieldList.push("CoverageId");
      fieldList.push("MediaType");
      fieldList.push("MediaTypeId");


      let model = {};

      if (!searchForPublic) {
        model = { Ids: [{ key: doc.id }], fieldList: fieldList, documentTypes: [{ key: doc.documentTypeId }] };
      } else {
        model = { uuids: [doc.uuid], fieldList: fieldList, customerIdEnc: doc.custoUUID };
      }

      this.newsService.searchDocument(model).subscribe(response => {
        let docs: DocumentModel[] = <DocumentModel[]>response.results.documents;

        observer.next(docs[0]);
      });
    });
  }

  getDocumentKeywords(fileDetails: any[], mimeType: number): any {
    let keywords: Array<any> = new Array();
    let colors = this.documentHelperService.getColorPalette();
    let itemDetailIndex = 0;
    let regions = new Array<any>();


    if (fileDetails != undefined) {
      let fileIndex = 0;
      fileDetails.forEach(detail => {
        fileIndex++;
        //  let detail = this.document.fileDetails[this.currentStreamIndex];
        if (detail.layout != null) {

          detail.layout.layoutDetails.forEach(itemDetail => {
            if (itemDetail.layoutData != null) {
              let foundedKeywords = keywords.filter(item => item.keywordId == itemDetail.keywordId && item.pageIndex == fileIndex);

              let str = itemDetail.layoutData;
              let res = str.split(":", 1);
              res = res * 1;
              let minutes = Math.floor(res / 60);
              let seconds = (res % 60);
              let videoDuration = minutes + ":" + (seconds < 10 ? '0' : '') + seconds;

              if (foundedKeywords.length === 0) {



                keywords.push({
                  keyword: itemDetail.keyword,
                  keywordId: itemDetail.keywordId,
                  color: colors[itemDetailIndex],
                  layoutData: itemDetail.layoutData,
                  pageIndex: fileIndex,
                  duration: videoDuration,
                  isChecked: true,
                  index: keywords.length,
                  highlights: []
                });
                itemDetailIndex++;

                if (itemDetailIndex >= colors.length) {
                  itemDetailIndex = 0;
                }
              }

              let i = 0;
              let obj: any = {};
              obj.layDatas = { x: Number, y: Number, w: Number, h: Number };


              itemDetail.layoutData.split(';').forEach(layData => {
                if (layData !== "") {
                  if (i === 0) {
                    obj.layDatas.x = +layData;
                  } else if (i === 1) {
                    obj.layDatas.y = +layData;
                  } else if (i === 2) {
                    obj.layDatas.w = +layData;
                  } else if (i === 3) {
                    obj.layDatas.h = +layData;
                  }

                  i++;
                  if ((i % 4) == 0) {
                    let index = keywords.map(e => e.keyword).indexOf(itemDetail.keyword);

                    index = keywords.findIndex(keyword => {
                      let found = keyword.keyword === itemDetail.keyword && keyword.pageIndex === fileIndex;

                      return found;
                    });



                    let keyword = keywords[index];



                    obj.keywordPageIndex = keyword.pageIndex;
                    obj.index = regions.length + 1;
                    obj.color = keyword.color;

                    let regionIndex = regions.findIndex(region => {
                      let found = region.layDatas.x === obj.layDatas.x &&
                        region.layDatas.y === obj.layDatas.y &&
                        region.layDatas.w === obj.layDatas.w &&
                        region.layDatas.h === obj.layDatas.h &&
                        region.keywordPageIndex === obj.keywordPageIndex;

                      return found;
                    });

                    if (regionIndex < 0) {
                      regions.push(<any>JSON.parse(JSON.stringify(obj)));
                      keyword.highlights.push(<any>JSON.parse(JSON.stringify(obj)));
                    }

                    i = 0;
                  }
                }
              });
            }
          });
        }
      });
    }

    if (mimeType !== 1) {
      keywords = keywords.filter(e => {
        return e.highlights.length > 0;
      });
    }

    return { keywords: keywords, regions: regions };

  }
}
