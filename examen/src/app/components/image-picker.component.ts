// import { Component, EventEmitter, Output } from '@angular/core';
// import { Plugins } from '@capacitor/core';
// import { CameraResultType, CameraSource } from '@capacitor/camera';

// const { Camera } = Plugins;

// @Component({
//   selector: 'app-image-picker',
//   templateUrl: './image-picker.component.html',
//   styleUrls: ['./image-picker.component.scss'],
// })
// export class ImagePickerComponent {
//   @Output() imageSelected = new EventEmitter<string>();

//   async takePicture() {
//     const image = await Camera['getPhoto']({
//       quality: 90,
//       allowEditing: false,
//       resultType: CameraResultType.DataUrl,
//       source: CameraSource.Camera,
//     });
  
//     this.imageSelected.emit(image.dataUrl);
//   }
  
//   async selectFromGallery() {
//     const image = await Camera['getPhoto']({
//       quality: 90,
//       allowEditing: false,
//       resultType: CameraResultType.DataUrl,
//       source: CameraSource.Photos,
//     });
  
//     this.imageSelected.emit(image.dataUrl);
//   }
  
// }
