import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteComicsComponent } from './favorite-comics.component';

describe('FavoriteComicsComponent', () => {
  let component: FavoriteComicsComponent;
  let fixture: ComponentFixture<FavoriteComicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoriteComicsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteComicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
