import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-question-modal-content',
  standalone: true,
  imports: [],
  templateUrl: './question-modal-content.component.html',
  styleUrl: './question-modal-content.component.css'
})
export class QuestionModalContentComponent {
  actionName = input<string>();
  cancelClick = output();
  confirmClick = output();

  handleCancelClick() {
    this.cancelClick.emit();
  }

  handleConfirmClick() {
    this.confirmClick.emit();
  }
}
