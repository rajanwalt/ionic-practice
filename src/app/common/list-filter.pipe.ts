import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'listFilter'
})
export class ListFilterPipe implements PipeTransform {

  transform(value: any, keys: string, searchText: string): any {
    
    if(!searchText)  {
      return value;
    }

    return (value || []).filter(item => keys.split(',').some(key => item.hasOwnProperty(key) && new RegExp(searchText, 'gi').test(item[key])));
  }

}
