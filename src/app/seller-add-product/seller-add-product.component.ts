import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { product } from '../data-type';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent {
addproductmessage:string | undefined;
  constructor(private product:ProductsService) { }

  AddProduct(data:product){
//  console.log(data);
 this.product.addproduct(data).subscribe((result )=>{
  console.log(result);

  if(result){
    Swal.fire({
      icon: 'success',
      // title: 'Oops...',
      text: 'New Product Successfully Added',
      // footer: '<a href="">Why do I have this issue?</a>'
    })
    // this.addproductmessage="Product Successfully Added"
  }
  setTimeout(()=> (this.addproductmessage=undefined),3000);
 });
  }
}
