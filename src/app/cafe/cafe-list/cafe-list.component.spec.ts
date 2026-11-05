import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

import { CafeListComponent } from './cafe-list.component';
import { CafeService } from '../cafe.service';
import { Cafe } from '../cafe';

describe('CafeListComponent', () => {
  let component: CafeListComponent;
  let fixture: ComponentFixture<CafeListComponent>;
  let debug: DebugElement;

  const cafesPrueba: Cafe[] = [
    new Cafe(1, 'Café Especial para ti', 'Blend', 'Angelópolis, Antioquia', 'Panela, Durazno', 1920, 'img1.png'),
    new Cafe(2, 'Café Especial Navegante', 'Café de Origen', 'Guatapé, Antioquia', 'Chocolate', 1850, 'img2.png'),
    new Cafe(3, 'Café Especial El Prístino', 'Blend', 'Chinchiná, Caldas', 'Frutos rojos', 1800, 'img3.png'),
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CafeListComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: CafeService, useValue: { getCafes: () => of(cafesPrueba) } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CafeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debug = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a table with 3 rows plus the header', () => {
    const filasHeader = debug.queryAll(By.css('thead tr'));
    const filasBody = debug.queryAll(By.css('tbody tr'));
    expect(filasHeader.length).toBe(1);
    expect(filasBody.length).toBe(3);
    expect(debug.queryAll(By.css('table tr')).length).toBe(4);
  });

  it('should show the coffee data in each row', () => {
    const filas = debug.queryAll(By.css('tbody tr'));
    filas.forEach((fila, i) => {
      const celdas = fila.queryAll(By.css('td'));
      expect(celdas[0].nativeElement.textContent).toContain(cafesPrueba[i].nombre);
      expect(celdas[1].nativeElement.textContent).toContain(cafesPrueba[i].tipo);
      expect(celdas[2].nativeElement.textContent).toContain(cafesPrueba[i].region);
    });
  });

  it('should count coffees by type', () => {
    expect(component.totalBlend).toBe(2);
    expect(component.totalOrigen).toBe(1);
  });
});
