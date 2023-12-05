import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { product } from '../data-type';
import {faTrash ,faEdit} from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent {
  productlist: undefined | product[];
  productMessage: undefined | string;
  icon=faTrash;
  editIcon=faEdit;

  constructor(private product: ProductsService) { }

  ngOnInit(): void {
    // this.product.productList().subscribe((result) => {
    //   console.log(result)
    //   this.productlist = result;
    // })
   this.productRefresh();

  }
  deleteProduct(id: number) {
    console.log(id)
    this.product.deleteProduct(id).subscribe((result) => {

      if (result) {
        // this.productMessage = "Product Deleted";
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              'Deleted!',
              'Your product has been deleted.',
              'success'
            )
          }
        })
        setTimeout(() => {
          
          this.productRefresh();
        }, 2000);
      }
    })
    setTimeout(()=>{

      this.productMessage=undefined
    },3000);
  }
  productRefresh(){
    this.product.productList().subscribe((result) => {
      // console.log(result);
      this.productlist = result;
    })
  }
}



