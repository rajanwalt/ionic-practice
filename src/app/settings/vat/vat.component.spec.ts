import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VatComponent } from './vat.component';

describe('VatComponent', () => {
  let component: VatComponent;
  let fixture: ComponentFixture<VatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VatComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
