import {Component, DebugElement} from '@angular/core';
import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {BrowserModule, By} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {TreeviewComponent} from '../treeview/treeview.component';
import {DropdownTreeviewComponent} from './dropdown-treeview.component';
import {TreeviewItemComponent} from '../treeview-item/treeview-item.component';
import {TreeviewConfig} from '../../models/treeview-config';
import {TreeviewItem} from '../../models/treeview-item';
import {DefaultTreeviewI18n, TreeviewI18n} from '../../models/treeview-i18n';
import {DefaultTreeviewEventParser, TreeviewEventParser} from '../../helpers/treeview-event-parser';
import {createGenericTestComponent, expect} from '../../../testing';

interface FakeData {
  config: TreeviewConfig;
  items: TreeviewItem[];
  selectedChange: (data: any[]) => void;
  hide: () => void;
}

const fakeData: FakeData = {
  config: undefined,
  items: undefined,
  selectedChange: (data: any[]) => { },
  hide: () => { }
};

@Component({
    selector: 'ngx-test',
    template: '',
    standalone: false
})
class TestComponent {
  config = fakeData.config;
  items = fakeData.items;
  selectedChange = fakeData.selectedChange;
  hide = fakeData.hide;
}

const createTestComponent = (html: string) =>
  createGenericTestComponent(html, TestComponent) as ComponentFixture<TestComponent>;

describe('DropdownTreeviewComponent', () => {
  const template = '<ngx-dropdown-treeview [items]="items" (selectedChange)="selectedChange($event)"></ngx-dropdown-treeview>';
  let spy: jasmine.Spy;
  let button: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        BrowserModule
      ],
      declarations: [
        TestComponent,
        TreeviewComponent,
        TreeviewItemComponent,
        DropdownTreeviewComponent
      ],
      providers: [
        TreeviewConfig,
        { provide: TreeviewI18n, useClass: DefaultTreeviewI18n },
        { provide: TreeviewEventParser, useClass: DefaultTreeviewEventParser }
      ]
    });
    spy = spyOn(fakeData, 'selectedChange');
  });

  beforeEach(fakeAsync(() => {
    spy.calls.reset();
    fakeData.items = [new TreeviewItem({ text: '1', value: 1 })];
    const fixture = createTestComponent(template);
    fixture.detectChanges();
    tick();
    button = fixture.debugElement.query(By.css('button'));
  }));

  it('should initialize with default config', () => {
    const defaultConfig = new TreeviewConfig();
    const component = TestBed.createComponent(DropdownTreeviewComponent).componentInstance;
    expect(component.config).toEqual(defaultConfig);
  });

  it('should raise event selectedChange when initializing', () => {
    expect(spy.calls.any()).toBeTruthy();
  });

  it('should display button text "All"', () => {
    expect(button.nativeElement).toHaveTrimmedText('All');
  });
});
