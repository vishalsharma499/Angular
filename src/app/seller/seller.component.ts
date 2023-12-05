import { Component } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { SignUP, login } from '../data-type';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent {
  constructor(private seller:SellerService, private router:Router){}
 showlogin=false;
 authError:string='';

  ngOnInit():void{
    this.seller.reloadSeller()
  }

  async signUP(data:SignUP):Promise<void>{
// console.table(data);
setTimeout(() => {
  this.seller.userSignUp(data)
  
}, 2000);
const Toast = Swal.mixin({
  toast: true,
  position: 'top-right',
  iconColor: 'white',
  customClass: {
    popup: 'colored-toast'
  },
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true
})
await Toast.fire({
  icon: 'success',
  title: 'Success'
})

  }
  async logIn(data:login):Promise<void>{
    this.authError="";
    console.table(data);
    // this.seller.userSignUp(data)
    this.seller.sellerlogin(data);
  
    this.seller.isSellerLoginError.subscribe(async (isError)=>{
      if(isError){
        // this.authError="Incorrect Email or Password";
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-right',
          iconColor: 'white',
          
          customClass: {
            popup: 'colored-toast'
          },
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true
        })
        await Toast.fire({
          icon: 'error',
          title: 'Incorrect Email or Password '
        })
      }
    })
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-right',
      iconColor: 'white',
      customClass: {
        popup: 'colored-toast'
      },
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true
    })
    await Toast.fire({
      icon: 'success',
      title: 'Successfully LogIn'
    })
    
      }

  openLogin(){
    this.showlogin=true
  }
  openSignup(){
    this.showlogin=false
  }

}
 