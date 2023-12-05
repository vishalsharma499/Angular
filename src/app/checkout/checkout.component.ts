import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { cart, order } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  totalPrice:number | undefined
  cartData:cart[] | undefined
  orderMsg:string | undefined

  constructor(private product:ProductsService , private router:Router){}
ngOnInit(){

  this.product.currentCart().subscribe((result)=>{
    
    let price=0;
    this.cartData=result ;
    result.forEach((item)=>{
      if(item.quantity){
        price=price + (+item.price* + item.quantity)
       
      }
    });
      this.totalPrice=price+(price/10)+100-(price/10);
      // console.log(this.totalPrice)
  });
  }

  ordernow(data:{email:string, address:string, contact:string}){
    let user=localStorage.getItem('user');
    let userId=user && JSON.parse(user).id;
    if(this.totalPrice){
      let orderData:order ={
        ...data,
        totalPrice:this.totalPrice,
        userId,
        id:undefined
      }
      this.cartData?.forEach((item)=>{
        setTimeout(() => {
         item.id && this.product.removeCartItems(item.id)

        }, 1500);
      })

      this.product.orderNow(orderData).subscribe((result)=>{
        if(result){
          this.orderMsg="your order has been Placed";

          setTimeout(() => {
            this.router.navigate(['myorder'])
            // this.orderMsg=undefined
          }, 4000);
        }
      })
    }
    
  }
}
