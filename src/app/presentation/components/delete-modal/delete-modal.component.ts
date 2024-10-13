import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgClass} from '@angular/common';
import {Product} from '../../../domain/models/product';

@Component({
  selector: 'deleteModal',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.css'
})
export class DeleteModalComponent {

  @Input() visible: boolean = false;
  @Input() product: Product = new Product();
  @Output() closeEvent = new EventEmitter<void>();
  @Output() deleteEvent = new EventEmitter<void>();

  close() {
    this.visible = false;
    this.closeEvent.emit();
  }

  deleteProduct() {
    this.deleteEvent.emit();
  }
}
