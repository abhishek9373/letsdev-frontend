import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainselectionComponent } from './domainselection.component';

describe('DomainselectionComponent', () => {
  let component: DomainselectionComponent;
  let fixture: ComponentFixture<DomainselectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DomainselectionComponent]
    });
    fixture = TestBed.createComponent(DomainselectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
