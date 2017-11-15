import { Component, OnInit, Input } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'feedback-modal',
    templateUrl: './feedback-modal.component.html',
    styleUrls: ['./feedback-modal.component.scss']
})
export class FeedbackModalComponent implements OnInit {

    @Input() document;

    constructor(public activeModal: NgbActiveModal) { }

    ngOnInit() {
    }

}
