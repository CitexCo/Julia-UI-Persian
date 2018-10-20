import { Injectable } from '@angular/core';
import { environment } from "./../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class ImgService {
  serverUrl:string = environment.serverUrl
  constructor() { }

  getImg(imageAddress){
    return `${this.serverUrl}/${imageAddress}`;
  }
}
