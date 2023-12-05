import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { cart, product } from '../data-type';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  productData: undefined | product;
  productQuantity: number = 1;
  quantity: number = 1;
  removeCart = false;
  cartData: product | undefined;

  constructor(private activeRoute: ActivatedRoute, private products: ProductsService) { }
  ngOnInit(): void {
    let productId = this.activeRoute.snapshot.paramMap.get('productsId');
    console.log(productId);
    productId && this.products.getProduct(productId).subscribe((result) => {
      console.log(result);
      this.productData = result;

      let cartData = localStorage.getItem('localCart');
      if (productId && cartData) {
        let items = JSON.parse(cartData);
        items = items.filter((items: product) => productId == items.id.toString());
        if (items.length) {
          this.removeCart = true;
        } else {
          this.removeCart = false;
        }
      }
      let user = localStorage.getItem('user');
      if (user) {
        let userId = user && JSON.parse(user).id;
        this.products.getCartList(userId)
        this.products.cartData.subscribe((result) => {
          let item = result.filter((item: product) => productId?.toString() === item.productId?.toString())
          if (item.length) {
            this.cartData=item[0];
            this.removeCart = true;

          }

        })

      }
    });


  }
  handleQuantity(val: string) {
    if (this.productQuantity < 20 && val === 'max') {
      this.productQuantity += 1;
    } else if (this.productQuantity > 1 && val === 'min') {
      this.productQuantity -= 1;
    }
  }
  addToCard() {
    if (this.productData) {
      this.productData.quantity = this.productQuantity;

      if (!localStorage.getItem('user')) {
        console.log(this.productData);
        this.products.localAddToCart(this.productData)
        this.removeCart = true
      } else {
        // console.log("user is login");
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        // console.log(userId);
        let cartData: cart = {
          ...this.productData,
          userId,
          productId: this.productData.id
        }
        delete cartData.id;
        this.products.addToCart(cartData).subscribe(async (result) => {
          if (result) {
            // alert("product is added in cart")

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
              title: 'Successfully added in cart'
            })
          
            this.products.getCartList(userId)
            this.removeCart = true
          }
        })
      }

    }
  }

  removeToCard(productId: number) {
    if (!localStorage.getItem('user')) {
    this.products.removeitem(productId);
    this.removeCart = false;
  }else{
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    console.log(this.cartData);
    this.cartData && this.products.removeToCart(this.cartData.id).subscribe((result)=>{
      if(result){
        this.products.getCartList(userId);
      }
    })
    this.removeCart = false;

  }
  }

}
