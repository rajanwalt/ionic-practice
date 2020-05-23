import { Injectable } from '@angular/core';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import {File, IWriteOptions, FileEntry} from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(
    private camera: Camera,
    private file: File,
    private webview: WebView) { 
}

readFileAsBlob(file: any): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imgBlob = new Blob([reader.result], { type: 'image/jpeg' });
        resolve(imgBlob);
      };
      reader.readAsArrayBuffer(file);
    })  
}

async getFile(path: string): Promise<FileEntry> {
  return this.file.resolveLocalFilesystemUrl(path)
    .then(entry => {
      if (entry.isFile) {
        return Promise.resolve(<FileEntry>entry);
      } else {
        // let err = new FileError(13);
        // err.code = 404;
        let err1 = this.file.cordovaFileError(13);         
        return Promise.reject(err1);
      }
    });
}

  async convertImageUriToBlob(imagePath)  {
    const fileEntry = await this.getFile(imagePath);
    const blob = await this.readFileAsBlob(fileEntry);
    
    return blob;
  }

  removeFromTempFile(name)  {
    this.file.removeFile(this.file.dataDirectory, name);
  }

   async getPicture(options)  {
      const tempImage = await this.camera.getPicture(options);
      // const tempImage = "file:///C:/Users/f3r30y2/Desktop/profile-pic.jpg"; // file:///var/mobile/Containers/Data/Application/E4A79B4A-E5CB-4E0C-A7D9-0603ECD48690/tmp/cdv_photo_003.jpg
      const tempFilename = tempImage.substr(tempImage.lastIndexOf('/') + 1);
      const tempBaseFilesystemPath = tempImage.substr(0, tempImage.lastIndexOf('/') + 1);
      
      // Can use Data URL in UI instead of webviewPath
      const dataURL = await this.file.readAsDataURL(tempBaseFilesystemPath, tempFilename);

      const newBaseFilesystemPath = this.file.dataDirectory;
      await this.file.copyFile(tempBaseFilesystemPath, tempFilename,
                                newBaseFilesystemPath, tempFilename);
      
      const storedPhotoPath = newBaseFilesystemPath + tempFilename;
      const webviewPath =  this.webview.convertFileSrc(storedPhotoPath);

      return {
        "webviewPath" : webviewPath,
        "filePath" : storedPhotoPath
      }
     
  }
}
