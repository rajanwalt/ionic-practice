import { ErrorHandler, Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements ErrorHandler {

  constructor(public alertController: AlertController, public toastController: ToastController) { }

  async handleError(error)  {
    var message = (error['error'] && error['error']['msg']) ? error['error']['msg'] : (error['statusText'] ? error['statusText'] : error['message'])

    this.presentToast(message);
    

  }
  // async presentAlert() {
  //   const alert = await this.alertController.create({
  //     // cssClass: 'my-custom-class',
  //     header: 'An Error Has Occurred',
  //     subHeader: 'Subtitle',
  //     message: 'This is an alert message.',
  //     buttons: ['OK']
  //   });

  //   await alert.present();
  // }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
}
