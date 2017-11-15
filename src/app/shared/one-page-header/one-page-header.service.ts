import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class OnePageHeaderService {

  constructor() { }

  agendaExportClick: EventEmitter<any> = new EventEmitter<any>();

}
