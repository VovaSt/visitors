import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortDates',
  pure: false
})
export class SortDatesPipe implements PipeTransform {

  transform(dates: Date[]): unknown {
    console.log(dates)
    return dates.sort((date1, date2) => date2.getTime() - date1.getTime());
  }
}
