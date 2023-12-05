import { Component } from '@angular/core';
import { SignUP, cart, login, product } from '../data-type';
import { UserService } from '../services/user.service';
import { ProductsService } from '../services/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent {
  showlogin: boolean = true;
  authError: string = "";

  constructor(private user: UserService, private product: ProductsService) { }

  ngOnInit() {
    this.user.userAuthReload();
  }

  async userrSignUP(data: SignUP) {
    this.user.userSignUp(data)
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
      title: 'Successfully Signup'
    })
  }

  async userrlogIn(data: login) {
    this.user.userlogin(data)
    this.user.invalidUserAuth.subscribe(async (result) => {
      // console.log(result);
      if (result) {
        // this.authError="Enter valid user details";
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
          title: 'Enter valid user details'
        })

      } else {
        this.romoveCart();
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
      title: 'Successfully login'
    })
  }
  openSignup() {
    this.showlogin = false;
  }
  openLogin() {
    this.showlogin = true;
  }

  romoveCart() {
    let data = localStorage.getItem('localcart');

    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;


    if (data) {

      let cartDatalist: product[] = JSON.parse(data);

      cartDatalist.forEach((product: product, index) => {
        let cartData: cart = {
          ...product,
          productId: product.id,
          userId,
        };

        delete cartData.id;

        setTimeout(() => {
          this.product.addToCart(cartData).subscribe((result) => {

            if (result) {
              console.log("item store in DB");
            }
          });


        }, 500);

        if (cartDatalist.length === index + 1) {
          localStorage.removeItem('localCart');
        }

      });
    }
    setTimeout(() => {
      this.product.getCartList(userId);

    }, 2000);
  }
}
