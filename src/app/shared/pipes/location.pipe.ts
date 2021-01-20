import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'locationPipe'
})
export class LocationPipe implements PipeTransform {

  transform(value: any, filterString: string, propName: string): any {
    if (filterString === null || filterString === '' || value.length === 0) {
      return value;
    }
    filterString = filterString.toUpperCase();
    const resultArray = [];
    for (const item of value) {
      if (item[propName].toUpperCase().includes(filterString)) {
        resultArray.push(item);
      }
    }
    return resultArray;
  }
}
