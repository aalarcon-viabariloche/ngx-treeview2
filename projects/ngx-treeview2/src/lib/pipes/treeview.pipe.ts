﻿import {Pipe, PipeTransform} from '@angular/core';
import {isNil} from 'lodash';
import {TreeviewItem} from '../models/treeview-item';

@Pipe({
    name: 'ngxTreeview',
    standalone: false
})
export class TreeviewPipe implements PipeTransform {
  transform(objects: any[], textField: string): TreeviewItem[] | undefined {
    if (isNil(objects)) {
      return undefined;
    }

    return objects.map(object => new TreeviewItem({ text: object[textField], value: object }));
  }
}
