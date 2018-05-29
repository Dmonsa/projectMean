
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe extends DatePipe implements PipeTransform {

    static readonly DATE_FMT = 'dd/MMM/yyyy';
    static readonly DATE_TIME_FMT = "${Constants.DATE_FMT} hh:mm:ss}";
  transform(value: any, args?: any): any {
    return super.transform(value, "Constants.DATE_FMT");
  }
}