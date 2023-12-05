import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellerComponent } from './seller/seller.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { sellerAuthGuard } from './seller-auth.guard';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerUpdataProductComponent } from './seller-updata-product/seller-updata-product.component';
import { SearchComponent } from './search/search.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MyorderComponent } from './myorder/myorder.component';
import { ChatroomComponent } from './chatroom/chatroom.component';


const routes: Routes = [
  {
    path:'', component : HomeComponent,
  },
  {
    path:'saller', component : SellerComponent
  },
  {
  path: 'sellerHome'  , component : SellerHomeComponent,
  canActivate : [sellerAuthGuard]
  },
  {
    path: 'seller-add-product',
    component: SellerAddProductComponent,
    canActivate : [sellerAuthGuard]

  }, 
   {
    path: 'seller-updata-product/:id',
    component: SellerUpdataProductComponent,
    canActivate : [sellerAuthGuard]

  },
  {
    component:SearchComponent,
    path: 'search/:query'
  },
  {
    component:ProductDetailsComponent,
    path: 'details/:productsId'
  },
  {
    component:UserAuthComponent,
    path:'userAuth'
  },
  {
    component:CartPageComponent,
    path:'cartPage'
  },
  {
    component:CheckoutComponent,
    path: 'checkout'
  },
  {
    component:MyorderComponent,
    path: 'myorder'
  },
  {
    component:ChatroomComponent,
    path: 'chatroom'
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
