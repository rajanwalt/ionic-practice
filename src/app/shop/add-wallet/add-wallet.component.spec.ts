import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddWalletComponent } from './add-wallet.component';

describe('AddWalletComponent', () => {
  let component: AddWalletComponent;
  let fixture: ComponentFixture<AddWalletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddWalletComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
