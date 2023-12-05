import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { product } from '../data-type';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-seller-updata-product',
  templateUrl: './seller-updata-product.component.html',
  styleUrls: ['./seller-updata-product.component.css']
})
export class SellerUpdataProductComponent {

  productData:undefined | product;
  productmessage:undefined | string;

  constructor(private  route:ActivatedRoute, private product:ProductsService) { }

  ngOnInit(): void {
    let productId=this.route.snapshot.paramMap.get('id');
    // console.log(productId);
    productId && this.product.getProduct(productId).subscribe((data)=>{
      console.log(data);
      this.productData=data;

    })
  }
  updateProduct(data:any){
    // console.log(data);
    if(this.productData){
      data.id=this.productData.id;
    }
    this.product.updateProduct(data).subscribe((result)=>{
      if(result){
        // this.productmessage= " Product Updated";
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your product has been ubdated',
          showConfirmButton: false,
          timer: 1500
        })
      }
    });
    setTimeout(() => {
      this.productmessage=undefined;
    },3000);
  }
}
