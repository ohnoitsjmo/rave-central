import { Pipe, PipeTransform } from '@angular/core';
import { MemberSearchComponent } from './member-search.component';

@Pipe({
  name: 'memberFilter'
})
export class MemberFilterPipe implements PipeTransform {

  constructor(private member:MemberSearchComponent) { }

  transform(value: any, name:any, mail:any, membernum:any, expdate:any) {
    if (!value) {
      return value;
    }
    return value.filter(item => {
      if (item.displayName && item.mail && item.ieeeMemberNumber && item.ieeeExpiration) {
        return item.displayName.toLowerCase().includes(name.toLowerCase()) && item.mail.toLowerCase().includes(mail) && item.ieeeMemberNumber.includes(membernum) && item.ieeeExpiration.toLowerCase().includes(expdate.toLowerCase())
      }
    });
  }

}
