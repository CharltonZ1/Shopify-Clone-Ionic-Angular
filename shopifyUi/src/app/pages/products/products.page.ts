import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Product } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  items = [
    { icon: 'pricetag', name: 'All products' },
    { icon: 'pricetags', name: 'Collections' },
    { icon: 'storefront', name: 'Inventory' },
    { icon: 'enter', name: 'Transfers' },
    { icon: 'gift', name: 'Gift cards' },
  ];

  @ViewChild('content') content!: HTMLIonContentElement;
  products: Product[] = [];

  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.loadProducts();

    // IOS only
    window.addEventListener('statusTap', () => {
      this.content.scrollToTop(1000);
    });

    // Display content under transparent status bar (Android only)
    StatusBar.setOverlaysWebView({ overlay: true });
  }

  doRefresh(event: any) {
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  loadProducts() {
    this.http.get<Product[]>('https://fakestoreapi.com/products')
      .subscribe(resp => {
        console.log(
          '🚀 ~ file: products.page.ts ~ line 50 ~ ProductsPage ~ .subscribe ~ resp',
          resp
        );
        this.products = resp;
      });
  }
}
