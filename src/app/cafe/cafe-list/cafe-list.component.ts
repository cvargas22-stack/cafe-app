import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Cafe } from '../cafe';
import { CafeService } from '../cafe.service';

@Component({
  selector: 'app-cafe-list',
  standalone: false,
  styleUrl: './cafe-list.component.css',
  templateUrl: './cafe-list.component.html',
})
export class CafeListComponent implements OnInit {
  cafes: Cafe[] = [];
  totalOrigen: number = 0;
  totalBlend: number = 0;

  constructor(
    private cafeService: CafeService,
    private cdr: ChangeDetectorRef
  ) {}

  getCafes(): void {
    this.cafeService.getCafes().subscribe((cafes) => {
      this.cafes = cafes;
      this.contarTipos();
      this.cdr.markForCheck();
    });
  }

  contarTipos(): void {
    this.totalOrigen = this.cafes.filter((c) => c.tipo === 'Café de Origen').length;
    this.totalBlend = this.cafes.filter((c) => c.tipo === 'Blend').length;
  }

  ngOnInit(): void {
    this.getCafes();
  }
}
