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

getCameraOption(sourceType: string) : CameraOptions {
  if(sourceType == 'CAMERA')  {
    return {
      quality: 100,
      correctOrientation: true,
      sourceType:  this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.JPEG,
      destinationType: this.camera.DestinationType.FILE_URI
    }
  }
  else {
    return {
      quality: 100,
      allowEdit: true,
      saveToPhotoAlbum: true,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
  }
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

   getFileReader(): FileReader {
    const fileReader = new FileReader();
    const zoneOriginalInstance = (fileReader as any)["__zone_symbol__originalInstance"];
    return zoneOriginalInstance || fileReader;
  }

  makeFileIntoBlob(_imagePath) {
    return new Promise((resolve, reject) => {
            this.file.resolveLocalFilesystemUrl(_imagePath).then( (fileEntry : FileEntry) => {
    
              fileEntry.file(resFile => {
                let reader: FileReader = this.getFileReader();
                reader.onloadend = () => {
                  var imgBlob: any = new Blob([reader.result], { type: resFile.type });
                  console.log(imgBlob);
                  resolve(imgBlob);
                };
    
                reader.onerror = (e) => {
                  console.log('Failed file read: ' + e.toString());
                  reject(e);
                };
    
                reader.readAsArrayBuffer(resFile);
              });
            });
          });
    }

  async getPicture(sourceType:string)  {

    let options: CameraOptions = this.getCameraOption(sourceType)

    try {
      const imgData = await this.camera.getPicture(options);

      let tempImage = await this.filePath.resolveNativePath(imgData);
      
      var tempFilename = tempImage.substr(tempImage.lastIndexOf('/') + 1);
      var tempBaseFilesystemPath =  tempImage.substr(0, tempImage.lastIndexOf('/') + 1);

      const newBaseFilesystemPath = this.file.dataDirectory;

      await this.file.copyFile(tempBaseFilesystemPath, tempFilename, newBaseFilesystemPath, tempFilename);

      const storedPhoto = newBaseFilesystemPath + tempFilename;

      const webviewPath = this.webview.convertFileSrc(storedPhoto);
      
      const imgBlob = await this.makeFileIntoBlob(storedPhoto);
      // const imgBlob = null

      return {
        webviewPath,
        imgBlob
      };  

    }
    catch(err) {
      return err;
    }
     
     
  }
      
}
