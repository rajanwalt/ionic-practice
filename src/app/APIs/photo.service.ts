import { Injectable } from '@angular/core';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import {File, IWriteOptions, FileEntry} from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';


@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(
    private camera: Camera,
    private file: File,
    private webview: WebView,
    private filePath: FilePath) { 
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
      const imgData = await this.camera.getPicture(options);

      let tempImage = await this.filePath.resolveNativePath(imgData);
      
      var tempFilename = tempImage.substr(tempImage.lastIndexOf('/') + 1);
      var tempBaseFilesystemPath =  tempImage.substr(0, tempImage.lastIndexOf('/') + 1);
      
      const newBaseFilesystemPath = this.file.dataDirectory;
      
      await this.file.copyFile(tempBaseFilesystemPath, tempFilename, newBaseFilesystemPath, tempFilename);
      
      const storedPhotoPath = newBaseFilesystemPath + tempFilename;
      
      const webviewPath =  this.webview.convertFileSrc(storedPhotoPath);

      return {
        "webviewPath" : webviewPath,
        "filePath" : storedPhotoPath
      }
     
  }
}
