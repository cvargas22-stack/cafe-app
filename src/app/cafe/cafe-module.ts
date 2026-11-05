import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CafeListComponent } from './cafe-list/cafe-list.component';

@NgModule({
  declarations: [CafeListComponent],
  imports: [CommonModule],
  exports: [CafeListComponent],
})
export class CafeModule {}
