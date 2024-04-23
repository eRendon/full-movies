import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'yearOnly'
})
export class YearOnlyPipe implements PipeTransform {

  transform(value: string): string | null {
    if (!value) return null;

    const date = new Date(value);
    return String(date.getFullYear());
  }

}
