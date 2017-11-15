import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mailSearch'
})
export class MailSearchPipe implements PipeTransform {

  transform(mails: any, searchWord?: any): any {
    if (!searchWord)
      return mails;
    else {
      if (searchWord.length === 0)
        return mails;
      else {
        return mails.filter(mail => {
          let found = mail.email.toLowerCase().indexOf(searchWord) > -1;
          return found;
        });
      }
    }
  }

}
