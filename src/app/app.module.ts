import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SellerComponent } from './seller/seller.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SellerUpdataProductComponent } from './seller-updata-product/seller-updata-product.component';
import { SearchComponent } from './search/search.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MyorderComponent } from './myorder/myorder.component';
import { FooterComponent } from './footer/footer.component';
import { ChatroomComponent } from './chatroom/chatroom.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SellerComponent,
    SellerHomeComponent,
    SellerAddProductComponent,
    SellerUpdataProductComponent,
    SearchComponent,
    ProductDetailsComponent,
    UserAuthComponent,
    CartPageComponent,
    CheckoutComponent,
    MyorderComponent,
    FooterComponent,
    ChatroomComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
