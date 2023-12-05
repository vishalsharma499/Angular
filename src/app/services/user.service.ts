import { EventEmitter, Injectable } from '@angular/core';
import { SignUP, login } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  invalidUserAuth=new EventEmitter<boolean>(false)

  constructor(private http:HttpClient , private router:Router) { }

  userSignUp(user:SignUP){
    this.http.post('http://localhost:3000/user',user,{observe:'response'})
    .subscribe((result)=>{
      console.log(result)
      if(result)
      {
        localStorage.setItem('user',JSON.stringify(result.body))
        this.router.navigate(['/'])
      }
    })
  }
  userlogin(data:login){
this.http.get<SignUP[]>(`http://localhost:3000/user?email=${data.email}&password=${data.password}`,{observe:'response'})
.subscribe((result)=>{
  if(result && result.body?.length){
    this.invalidUserAuth.emit(false)

    localStorage.setItem('user',JSON.stringify(result.body[0]))
    this.router.navigate(['/'])  
  }else{
    this.invalidUserAuth.emit(true)
  }
})
  }
  userAuthReload(){
    if(localStorage.getItem('user')){
      this.router.navigate(['/']);  
    }
  }
}
