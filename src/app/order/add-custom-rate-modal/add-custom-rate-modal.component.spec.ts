import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddCustomRateModalComponent } from './add-custom-rate-modal.component';

describe('AddCustomRateModalComponent', () => {
  let component: AddCustomRateModalComponent;
  let fixture: ComponentFixture<AddCustomRateModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCustomRateModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddCustomRateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
