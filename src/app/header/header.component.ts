import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import { ProductsService } from '../services/products.service';
import { product } from '../data-type';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  menuType:string="default";
  sellerName:string='';
  searchResult:undefined | product[];
  userName:string='';
  cartitem=0;

  constructor(private router:Router , private product:ProductsService){}

ngOnInit():void{
//  
this.router.events.subscribe((val: any) => {
  if (val.url) {
    if (localStorage.getItem('seller') && val.url.includes('seller')) {
     let sellerStore=localStorage.getItem('seller');
     let sellerData =sellerStore && JSON.parse(sellerStore)[0];
     this.sellerName=sellerData.name;
      this.menuType = 'seller';
    }
    else if(localStorage.getItem('user')){
      let userStore = localStorage.getItem('user');
      let userData = userStore && JSON.parse(userStore);
      this.userName= userData.name;
      this.menuType='user';
      this.product.getCartList(userData.id);
    }
     else {
      this.menuType = 'default';
    }
  }
});
  let cartData=localStorage.getItem('localCart');
  if(cartData){
    this.cartitem=JSON.parse(cartData).length;
  }
  this.product.cartData.subscribe((items)=>{
    this.cartitem=items.length;
  })
}


  async logout(){
  localStorage.removeItem('seller')
  setTimeout(() => {
    this.router.navigate(['/'])
    
  }, 1700);
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
    title: 'Successfully Logout'
  })
}
  async userLogout(){
  localStorage.removeItem('user')
  this.product.cartData.emit([]);
  setTimeout(() => {
    
    this.router.navigate(['userAuth']) 
  }, 1700);
  
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
    title: 'Successfully Logout'
  })


}
searchproduts(query:KeyboardEvent){
if(query){
  const element=query.target as HTMLInputElement;
  this.product.searchProduct(element.value).subscribe((result)=>{

    // console.log(result);
    result.length=5;
    this.searchResult=result;


  })

}
}
hidesearch(){
  this.searchResult=undefined
}
redirectToDetails(id:number){
  this.router.navigate(['/details/'+id])
}
submitSearch(val:string){
  // console.log(val);
  this.router.navigate([`search/${val}`]);
}
}
