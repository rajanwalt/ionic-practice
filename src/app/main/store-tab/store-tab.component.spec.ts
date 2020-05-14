import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StoreTabComponent } from './store-tab.component';

describe('StoreTabComponent', () => {
  let component: StoreTabComponent;
  let fixture: ComponentFixture<StoreTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreTabComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StoreTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
