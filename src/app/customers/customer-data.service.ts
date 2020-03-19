
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerDataService {

  customers = null;
  custsSubscription;
  custSubscription;
  // private db = firebase.firestore();

  constructor(
    // private db: AngularFirestore
  ) { }

  subscribeToCustomers() {
    // if (!this.customers) {
    //   const ref = this.db.collection('customers-portobello');
    //   this.custsSubscription = ref.onSnapshot((snap) => {
    //     snap.docs.forEach(doc => {
    //       this.customers.push({ id: doc.id, ...doc.data() });
    //     });
    //   });
    //   // this.subscription = .valueChanges({ idField: 'id' })
    //   //   .subscribe(customers => {
    //   //     this.customers = customers;
    //   //   });
    // }
  }

  getCustomer(id: string) {
    if (this.customers) {
      const cached = this.customers.find(v => v.id === id);
      console.log('use cached');
      return of(cached);
    } else {
      console.log('use db');
      // ** for promise - would need to make function async //
      // const x = await this.db.collection('customers-portobello').doc(id).get();
      // const cust = { id: x.id, ...x.data() };
      // return cust;
      return Observable.create(observer => {
        const db = firebase.firestore();
        this.custSubscription = db.collection('customers-portobello').doc(id).onSnapshot((snap => {
          const docId = snap.id;
          const data = snap.data();
          if (docId && data) {
            observer.next({ id: docId, ...data });
          }
        }));
      });
    }

  }

  dispose() {
    this.custsSubscription.unsubscribe();
    this.custSubscription.unsubscribe();
    this.customers = null;
  }

}
