import { Component, OnInit ,Input} from '@angular/core';

import { OurServicesService} from "./services/our-services.service"
@Component({
  selector: 'our-services',
  templateUrl: './our-services.component.html',
  styleUrls: ['./our-services.component.scss']
})
export class OurServicesComponent implements OnInit {

  ourServicesItems: string[] = ["basket", "agenda", "analysis", "columnist", "tvArchive", "pressArchive"];

  @Input() selectedDocument?: any;
  @Input() isRowView?: boolean;
  iconWidth:number;
  constructor(private ourServicesService: OurServicesService) { }
  ngOnInit() {
    if (this.isRowView) {
      this.iconWidth = 25;
    } else {
      this.iconWidth = 45;
    }
  }

  /**
   * bu fonksiyon ile hizmetler popoupudan týklanan hizmet ve selected documentlar ile servise gönderilir.
   * @param serviceItem
   */
  serviceClick(serviceItem) {
    this.ourServicesService.serviceClick(serviceItem, this.selectedDocument);
    
  }



}
