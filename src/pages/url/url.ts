import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage';
import { Injectable } from '@angular/core';

@Injectable()
export class Url{
    constructor(private secureStorage:SecureStorage){}

    url:string = "http://13.209.19.233:9000";
    
    capitals=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    
    
    token(){
        this.secureStorage.create("tokenStorage")
        .then((storage:SecureStorageObject)=>{
            storage.get('token').then(data => {
            return data
            })
        })
    }
    
}