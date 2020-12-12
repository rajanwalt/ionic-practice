import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RefundExchangePolicyComponent } from './refund-exchange-policy.component';

describe('RefundExchangePolicyComponent', () => {
  let component: RefundExchangePolicyComponent;
  let fixture: ComponentFixture<RefundExchangePolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefundExchangePolicyComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RefundExchangePolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
