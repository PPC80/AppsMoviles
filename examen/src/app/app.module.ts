import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FirebaseService } from './services/firebase.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Camera } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Firebase } from '@ionic-native/firebase/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

//import { ImagePickerComponent } from './components/image-picker.component';

@NgModule({
  declarations: [AppComponent],
  //entryComponents: [ImagePickerComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [FirebaseService,
    Camera,
    File,
    FilePath,
    Firebase,
    ImagePicker],
  bootstrap: [AppComponent],
})
export class AppModule {}

