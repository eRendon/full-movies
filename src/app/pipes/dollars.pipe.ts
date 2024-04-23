import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dolars'
})
export class DollarsPipe implements PipeTransform {

  transform(value: number): string {
    if (isNaN(value) || value === null) {
      return '0.00';
    }

    // Convertir el número a formato de dólares
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    });

    return formatter.format(value);
  }

}
