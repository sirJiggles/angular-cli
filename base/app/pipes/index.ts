import {Pipe, PipeTransform} from 'angular2/core';

@Pipe({
  name: 'CONSTANTTWO'
})
export class CONSTANTONE implements PipeTransform {
  transform(value: string): string {
    return `${value} CONSTANTONE`;
  }
}
