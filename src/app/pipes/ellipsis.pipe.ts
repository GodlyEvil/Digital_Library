import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ellipsis'
})
export class EllipsisPipe implements PipeTransform {

  transform(value: string, len: number): string {
    if(value?.length > len) {
      return value.slice(0,len-2) + '...'
    }
    return value;
  }

}
