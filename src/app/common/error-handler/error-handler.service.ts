import { ErrorHandler, Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements ErrorHandler {

  constructor(public alertController: AlertController, public toastController: ToastController) { }

  async handleError(error)  {
    // var message = (error['error'] && error['error']['msg']) ? error['error']['msg'] : (error['statusText'] ? error['statusText'] : error['message'])
    let errorMsg: string;
    
    if (error.error instanceof ErrorEvent) {
      errorMsg = `Error: ${error.error.message}`;
    }
    else {
      errorMsg = this.getServerErrorMessage(error);
    }
    this.presentToast(errorMsg);
    

  }

  private getServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
        case 404: {
            return `Not Found: ${error.message}`;
        }
        case 403: {
            return `Access Denied: ${error.message}`;
        }
        case 401: {
          return `Unauthorized: ${error.message}`;
        }
        case 500: {
            return `Internal Server Error: ${error.message}`;
        }
        default: {
            return `Unknown Server Error: ${error.message}`;
        }

    }
}

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
}
