import {Component, OnInit, ViewChild} from '@angular/core';
import {DropdownTreeviewComponent, TreeviewI18n} from 'ngx-treeview2';
import {City, CityService} from './city.service';
import {CityTreeviewI18n} from './city-treeview-i18n';

@Component({
    selector: 'ngx-city',
    templateUrl: './city.component.html',
    providers: [
        CityService,
        { provide: TreeviewI18n, useClass: CityTreeviewI18n }
    ],
    standalone: false
})
export class CityComponent implements OnInit {
  @ViewChild(DropdownTreeviewComponent, { static: false }) dropdownTreeviewComponent: DropdownTreeviewComponent;
  cities: City[];
  selectedCities: City[];
  unselectedCities: City[];

  constructor(
    private service: CityService
  ) { }

  ngOnInit(): void {
    this.service.getCities().subscribe(cities => {
      this.cities = cities;
    });
  }

  onSelectedChange(selectedCities: City[]): void {
    this.selectedCities = selectedCities;
    const uncheckedItems = this.dropdownTreeviewComponent.treeviewComponent.selection.uncheckedItems;
    this.unselectedCities = uncheckedItems.map(item => item.value);
  }
}
