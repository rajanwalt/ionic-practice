import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddPayoutMethodComponent } from './add-payout-method.component';

describe('AddPayoutMethodComponent', () => {
  let component: AddPayoutMethodComponent;
  let fixture: ComponentFixture<AddPayoutMethodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPayoutMethodComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddPayoutMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
