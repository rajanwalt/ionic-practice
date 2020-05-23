import { Injectable } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';


@Injectable({
  providedIn: 'root'
})
export class SocialMediaSharingService {

  constructor(private socialSharing: SocialSharing) { }

  handleResponse(status)  {
    if(!status)  {
      return 0; // 0 = fail, 1 = success
    }
    return 1;
  }

  async shareViaSMS(message: string, phoneNumber: string)  {
    const status = await this.socialSharing.shareViaSMS(message, phoneNumber);
    return this.handleResponse(status);
    
  }

  async shareViaWhatsApp(url: string)  {
    const status = await  this.socialSharing.shareViaWhatsApp(url);
    return this.handleResponse(status);

  }

  async sharevia(appName, message)  {
    const status =  await this.socialSharing.shareVia('com.facebook.orca', message); //ios -> com.facebook.Messenger

    return this.handleResponse(status);
  }
  

  
}
