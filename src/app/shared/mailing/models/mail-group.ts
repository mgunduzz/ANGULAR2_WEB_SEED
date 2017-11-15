export class MailGroup {
  name: string;
  mailList: Array<Mail>;
  isAllMailsSelected: boolean;
  selectedCount: number = 0;
  isShow: boolean = false;
  userMailIds: Array<number>;
  id: number;
  isMainGroup : boolean = false;
}

export  class Mail {
  email: string;
  name: string;
  isSelected: boolean;
  id: number;

}
