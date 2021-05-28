import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stdCase'
})
export class StandardCasePipe implements PipeTransform {

  transform(value: string ): string {
    if(value.length > 1) {
      return value[0].toUpperCase() + value.slice(1);
    }
    return value[0].toUpperCase();
  }

}
