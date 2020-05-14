import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PopupContentComponent } from './popup-content.component';

describe('PopupContentComponent', () => {
  let component: PopupContentComponent;
  let fixture: ComponentFixture<PopupContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupContentComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PopupContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
