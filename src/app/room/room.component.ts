import {Component, OnInit} from '@angular/core';
// import { TreeviewConfig, TreeviewItem } from 'ngx-treeview';
import {RoomService} from './room.service';
import {TreeviewConfig, TreeviewItem} from "ngx-treeview2";

@Component({
    selector: 'ngx-room',
    templateUrl: './room.component.html',
    providers: [
        RoomService
    ],
    standalone: false
})
export class RoomComponent implements OnInit {
  rooms: TreeviewItem[];
  values: any[];
  config = TreeviewConfig.create({
    hasAllCheckBox: true,
    hasFilter: true,
    hasCollapseExpand: false,
    maxHeight: 500
  });

  constructor(
    private service: RoomService
  ) { }

  ngOnInit(): void {
    this.service.getRooms().subscribe(rooms => this.rooms = rooms);
  }
}
