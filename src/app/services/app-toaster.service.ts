import { inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AppToasterService {
  toaster = inject(ToastrService);

  critical(message: string) {
    this.toaster.error(message, "", { closeButton: true, timeOut: 4000, progressBar: true, enableHtml: true });
  }

  success(message: string) {
    this.toaster.success(message, "", { closeButton: true, timeOut: 4000, progressBar: true, enableHtml: true });
  }
}
