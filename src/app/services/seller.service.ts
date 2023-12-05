import { EventEmitter, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { SignUP, login } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import {Router} from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class SellerService {
isSellerLoggedIn =new BehaviorSubject<boolean>(false)
isSellerLoginError = new EventEmitter<boolean>(false)

  constructor(private http:HttpClient, private router:Router) { }
  userSignUp(data:SignUP){
    console.log("service call");
     this.http.post('http://localhost:3000/seller',data,{observe: 'response'})
     .subscribe((result)=>{
      this.isSellerLoggedIn.next(true);
      localStorage.setItem('seller',JSON.stringify(result.body));
      this.router.navigate(["sellerHome"])
      console.log("result", result);
     });
  }
  reloadSeller(){
    if(localStorage.getItem('seller')){
      this.isSellerLoggedIn.next(true);
      this.router.navigate(["sellerHome"])

    }
  }

  sellerlogin(data:login){
    // console.log(data)
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,{observe: 'response'})
    .subscribe((result:any)=>{
      // console.log(result)
      if(result && result.body && result.body.length){
        console.log("Sucessfully Logged in")

        localStorage.setItem('seller',JSON.stringify(result.body));
      this.router.navigate(["sellerHome"])
      }
      else{
        console.log("Logged In Failed!")
        this.isSellerLoginError.emit(true)
      }

    });
  }
}
 