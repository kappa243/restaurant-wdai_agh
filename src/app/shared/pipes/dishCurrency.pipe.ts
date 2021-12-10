import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceCurrency'
})
export class DishCurrencyPipe implements PipeTransform {

  transform(value: number, unit: DishCurrencyUnit): string {
    return unit.toString() + value;
  }

}

export enum DishCurrencyUnit {
    USD='$',
    EUR='€'
}
