import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input, Output, EventEmitter, } from '@angular/core';
import { ShareButton, ShareProvider } from '../../helpers/index';
var ShareButtonsComponent = (function () {
    function ShareButtonsComponent() {
        /** Show count on share-buttons, disabled by default */
        this.showCount = false;
        /** Indicates weather default style is applied to the buttons */
        this.defaultStyle = true;
        /** Add default class to all buttons */
        this.buttonClass = '';
        /** Buttons default templates */
        this.facebook = '<i class="fa fa-facebook"></i>';
        this.twitter = '<i class="fa fa-twitter"></i>';
        this.google = '<i class="fa fa-google-plus"></i>';
        this.whatsApp = '<i class="fa fa-whatsapp"></i>';
        this.linkedIn = '<i class="fa fa-linkedin"></i>';
        this.tumblr = '<i class="fa fa-tumblr"></i>';
        this.pinterest = '<i class="fa fa-pinterest-p"></i>';
       // this.stumbleUpOn = '<i class="fa fa-stumbleupon"></i>';
       // this.reddit = '<i class="fa fa-reddit-alien"></i>';
        this.count = new EventEmitter();
        this.popUpClosed = new EventEmitter();
        /** Total Count: the sum of all buttons share count */
        this.tCount = 0;
    }
    ShareButtonsComponent.prototype.ngOnInit = function () {
        this.buttons = [];
        if (this.facebook) {
            this.buttons.push(new ShareButton(ShareProvider.FACEBOOK, this.facebook, "facebook " + this.buttonClass));
        }
        if (this.twitter) {
            this.buttons.push(new ShareButton(ShareProvider.TWITTER, this.twitter, "twitter " + this.buttonClass));
        }
        if (this.google) {
            this.buttons.push(new ShareButton(ShareProvider.GOOGLEPLUS, this.google, "googleplus " + this.buttonClass));
        }
        if (this.pinterest) {
            this.buttons.push(new ShareButton(ShareProvider.PINTEREST, this.pinterest, "pinterest " + this.buttonClass));
        }
        if (this.linkedIn) {
            this.buttons.push(new ShareButton(ShareProvider.LINKEDIN, this.linkedIn, "linkedin " + this.buttonClass));
        }
        if (this.tumblr) {
            this.buttons.push(new ShareButton(ShareProvider.TUMBLR, this.tumblr, "tumblr " + this.buttonClass));
        }
        //if (this.reddit) {
        //    this.buttons.push(new ShareButton(ShareProvider.REDDIT, this.reddit, "reddit " + this.buttonClass));
        //}
        //if (this.stumbleUpOn) {
        //    this.buttons.push(new ShareButton(ShareProvider.STUMBLEUPON, this.stumbleUpOn, "stumbleupon " + this.buttonClass));
        //}
        if (this.whatsApp) {
            this.buttons.push(new ShareButton(ShareProvider.WHATSAPP, this.whatsApp, "whatsapp " + this.buttonClass));
        }
    };
    /** Reset total count on URL changes */
    ShareButtonsComponent.prototype.ngOnChanges = function (changes) {
        if (changes['url']) {
            var currUrl = changes['url'].currentValue;
            var prevUrl = changes['url'].previousValue;
            if (currUrl && currUrl !== prevUrl) {
                this.tCount = 0;
            }
        }
    };
    /** Sum all buttons count & emits total */
    ShareButtonsComponent.prototype.counter = function (count) {
        this.count.emit(count);
    };
    /** emits closed button type: so user can tell which button has been clicked */
    ShareButtonsComponent.prototype.shareClosed = function (provider) {
        this.popUpClosed.emit(provider);
    };
    return ShareButtonsComponent;
}());
export { ShareButtonsComponent };
ShareButtonsComponent.decorators = [
    { type: Component, args: [{
                selector: 'share-buttons',
                template: "\n      <div class=\"sb-buttons\" [ngClass]=\"(defaultStyle) ? ['sb-style', 'sb-style-colors']: ''\">\n        <share-button class=\"sb-button\" *ngFor=\"let button of buttons\"\n                      [ngClass]=\"button.classes\"\n                      [button]=\"button\"\n                      [url]=\"url\"\n                      [image]=\"image\"\n                      [title]=\"title\"\n                      [description]=\"description\"\n                      [tags]=\"tags\"\n                      [showCount]=\"showCount\"\n                      (count)=\"counter($event)\"\n                      (popUpClosed)=\"shareClosed($event)\"></share-button>\n      </div>\n    ",
                styles: ["\n      .sb-style.sb-style-colors .facebook button{background:#4267b2}.sb-style.sb-style-colors .facebook button:hover{background:#35528e}.sb-style.sb-style-colors .twitter button{background:#00acee}.sb-style.sb-style-colors .twitter button:hover{background:#008abe}.sb-style.sb-style-colors .googleplus button{background:#db4437}.sb-style.sb-style-colors .googleplus button:hover{background:#af362c}.sb-style.sb-style-colors .stumbleupon button{background:#eb4924}.sb-style.sb-style-colors .stumbleupon button:hover{background:#bc3a1d}.sb-style.sb-style-colors .linkedin button{background:#006fa6}.sb-style.sb-style-colors .linkedin button:hover{background:#005985}.sb-style.sb-style-colors .pinterest button{background:#bd081c}.sb-style.sb-style-colors .pinterest button:hover{background:#970616}.sb-style.sb-style-colors .reddit button{background:#ff4006}.sb-style.sb-style-colors .reddit button:hover{background:#cc3305}.sb-style.sb-style-colors .tumblr button{background:#36465d}.sb-style.sb-style-colors .tumblr button:hover{background:#2b384a}.sb-style.sb-style-colors .whatsapp button{background:#25d366}.sb-style.sb-style-colors .whatsapp button:hover{background:#1ea952}share-buttons{width:100%}.sb-style{display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;margin:1em auto;-ms-flex-wrap:wrap;flex-wrap:wrap}.sb-style .sb-button{min-width:60px;padding:5px;-webkit-box-orient:vertical;-ms-flex-direction:column;flex-direction:column}.sb-style .sb-button,.sb-style button{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-direction:normal}.sb-style button{-webkit-box-orient:horizontal;-ms-flex-direction:row;flex-direction:row;-webkit-box-align:center;-ms-flex-align:center;align-items:center;background-color:transparent;border-radius:.2em;padding:.5em .9em;font-size:1em;color:#fff}.sb-style button:hover{-webkit-transition:all .3s ease;transition:all .3s ease}.sb-style .sb-show-count{-ms-flex-pack:distribute;justify-content:space-around;max-width:6em}.sb-style .sb-template{margin:0 auto}.sb-style .sb-count{margin-left:.8em;font-size:.75em;font-family:Tahoma;text-align:center;position:relative;color:#fff;font-weight:700}a:hover,button{cursor:pointer;outline:0;border:0}.facebook{-webkit-box-ordinal-group:2;-ms-flex-order:1;order:1}.twitter{-webkit-box-ordinal-group:3;-ms-flex-order:2;order:2}.googleplus{-webkit-box-ordinal-group:4;-ms-flex-order:3;order:3}.pinterest{-webkit-box-ordinal-group:6;-ms-flex-order:5;order:5}.linkedin{-webkit-box-ordinal-group:5;-ms-flex-order:4;order:4}.tumblr{-webkit-box-ordinal-group:9;-ms-flex-order:8;order:8}.reddit{-webkit-box-ordinal-group:8;-ms-flex-order:7;order:7}.stumbleupon{-webkit-box-ordinal-group:10;-ms-flex-order:9;order:9}.whatsapp{-webkit-box-ordinal-group:7;-ms-flex-order:6;order:6}\n    "],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
ShareButtonsComponent.ctorParameters = function () { return []; };
ShareButtonsComponent.propDecorators = {
    'url': [{ type: Input },],
    'title': [{ type: Input },],
    'description': [{ type: Input },],
    'image': [{ type: Input },],
    'tags': [{ type: Input },],
    'showCount': [{ type: Input },],
    'defaultStyle': [{ type: Input },],
    'buttonClass': [{ type: Input },],
    'facebook': [{ type: Input },],
    'twitter': [{ type: Input },],
    'linkedIn': [{ type: Input },],
    'tumblr': [{ type: Input },],
    'google': [{ type: Input },],
    'pinterest': [{ type: Input },],
    //'stumbleUpOn': [{ type: Input },],
   // 'reddit': [{ type: Input },],
    'whatsApp': [{ type: Input },],
    'count': [{ type: Output },],
    'popUpClosed': [{ type: Output },],
};
//# sourceMappingURL=share-buttons.component.js.map