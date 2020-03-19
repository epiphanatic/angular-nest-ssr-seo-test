import { Component, OnInit } from '@angular/core';
import { CustomerDataService } from './customers/customer-data.service';
import { tap } from 'rxjs/operators';
import { SeoService } from './services/seo.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ssr-seo-test';
  private custSub: Subscription;

  constructor(
    public data: CustomerDataService,
    private seo: SeoService,
  ) { }

  ngOnInit() {
    this.getCustomer();

    // this.data.getCustomer('TfTg5MEBFPFiD1TLWNAN').subscribe((snap => {
    //   const docId = snap.id;
    //   const data = snap.data();
    //   console.log({ id: docId, ...data });

    // }));
  }

  getCustomer() {
    this.custSub = this.data.getCustomer('TfTg5MEBFPFiD1TLWNAN')
      .subscribe((cust: { id: string, bio: string, image: string, name: string }) => {
        console.log('got customer: ', cust);
        this.seo.generateTags({
          title: cust.name,
          description: cust.bio,
          image: cust.image,
        });
      });
    // this.data.getCustomer('TfTg5MEBFPFiD1TLWNAN')
    //   .pipe(
    //     tap(cust => {
    //       console.log('got customer: ', cust);
    //       // this.seo.generateTags({
    //       //   title: cust.name,
    //       //   description: cust.bio,
    //       //   image: cust.image,
    //       // });
    //     })
    //   );
    // const cust = await this.data.getCustomer('TfTg5MEBFPFiD1TLWNAN');
    // console.log(cust);
    // const cust = this.data.getCustomer('TfTg5MEBFPFiD1TLWNAN');
    // cust.then((data) => {

    // })
    // const data = cust.data();
    // this.seo.generateTags({
    //   title: cust.name,
    //   description: cust.bio,
    //   image: cust.image,
    // });
  }
}
