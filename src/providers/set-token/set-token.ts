import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage';

/*
  Generated class for the SetTokenProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SetTokenProvider {

  token=this.secureStorage.create("tokenStorage")
  .then((storage:SecureStorageObject)=>{
    storage.get('token').then(data => {
      return data
    })
  })

  constructor(public http: Http,
              private secureStorage: SecureStorage,) {}

  createAuthorizationHeader(headers:Headers){
        headers.append('Authorization','bearer '+ this.token)
        
  }
  post(url,data){
    let headers = new Headers();
    headers.append('Authorization','bearer '+ this.token)
    let options = new RequestOptions({headers:headers});
    return this.http.post(url,data,options)
  }


  // get(url) {
  //   let headers = new Headers();
  //   this.createAuthorizationHeader(headers);
  //   return this.http.get(url, {
  //     headers: headers
  //   });
  // }

  // post(url, data) {
  //   let headers = new Headers();
  //   this.createAuthorizationHeader(headers);
  //   return this.http.post(url, data, {
  //     headers: headers
  //   });
  // }

}
