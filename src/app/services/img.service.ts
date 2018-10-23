import { Injectable } from '@angular/core';
import { environment } from "./../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class ImgService {
  //getting server URL
  serverUrl:string = environment.serverUrl
  constructor() { }
  //add image name after server URL
  getImg(imageAddress){
    return `${this.serverUrl}/${imageAddress}`;
  }
}
