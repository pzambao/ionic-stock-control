import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  private loading: any;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  public products = new Array<Product>();
  private productsSubscription: Subscription;

  constructor(
    private productsService: ProductService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {
    this.productsSubscription = this.productsService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  ngOnInit() {
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnDestroy(){
    this.productsSubscription.unsubscribe();
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }

  async deleteProduct(id: string) {
    try {
      await this.productsService.deleteProduct(id);
    } catch (error) {
      this.presentToast('Erro ao tentar deletar');
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }
}
