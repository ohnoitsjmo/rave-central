import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'memberFilter'
})
export class MemberFilterPipe implements PipeTransform {

  transform(value: any, name:any, num:any, phone:any, date:any): any {
    if (!value) {
      return value;
    }
    return value.filter(item => {
      return item.name.toLowerCase().includes(name.toLowerCase()) && item.num.includes(num) && item.phone.includes(phone) && item.date.toLowerCase().includes(date.toLowerCase())
    })
  }

}
