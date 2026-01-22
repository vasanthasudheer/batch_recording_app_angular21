import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandaidateDasboard } from './candaidate-dasboard';

describe('CandaidateDasboard', () => {
  let component: CandaidateDasboard;
  let fixture: ComponentFixture<CandaidateDasboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandaidateDasboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandaidateDasboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
