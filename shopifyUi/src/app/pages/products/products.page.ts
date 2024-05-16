import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  items = [
    { icon: 'pricetag', name:'All products' },
    { icon: 'pricetags', name:'Collections' },
    { icon: 'storefront', name:'Inventory' },
    { icon: 'enter', name:'Transfers' },
    { icon: 'gift', name:'Gift cards' },
  ];

  constructor() { }

  ngOnInit() {
    window.addEventListener('statusTap', () => {
      console.log('status tap');
    });
  }

  doRefresh(event: any) {
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }
}
