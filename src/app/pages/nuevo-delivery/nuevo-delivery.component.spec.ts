import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoDeliveryComponent } from './nuevo-delivery.component';

describe('NuevoDeliveryComponent', () => {
  let component: NuevoDeliveryComponent;
  let fixture: ComponentFixture<NuevoDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevoDeliveryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevoDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
