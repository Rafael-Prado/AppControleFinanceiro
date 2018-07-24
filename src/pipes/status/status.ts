import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusPgto',
})
export class StatusPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    return value == 'true' ? "Pago" : "Não pago"
  }
}
