import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
//user import

import { AngularFireDatabase ,AngularFireList ,AngularFireAction } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';
import firebase from 'firebase';

import { ContactPage } from '../contact/contact';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  itemsRef: AngularFireList<any>;
  humancases: Observable<any[]>;

  items$: Observable<AngularFireAction<Firebase.database.DataSnapshot>[]>; 
  size$: BehaviorSubject<string|null>;
  
   
  
  
constructor(public navCtrl: NavController,public db:AngularFireDatabase) {


  this.itemsRef =  db.list('/case')
  this.humancases = this.itemsRef.valueChanges() ;
  this.size$ = new BehaviorSubject(null); 
  this.items$ = this.size$.switchMap(size =>  
    db.list('/case', ref =>  
      size ? ref.orderByChild('size').equalTo(size) : ref  
    ).snapshotChanges()
  );

  this.items$.subscribe(actions => {
   actions.forEach(action => {
     console.log(action.type);
     console.log(action.key);
     console.log(action.payload.val());
   })  ; 

 });

}

itemSelected(key, firstname, lastname, address,phone, details){
  // console.log(key, firstName, lastName, address,phone, details);
  this.navCtrl.push(ContactPage,{
    key : key,
    firstname : firstname,
    lastname : lastname,
    address : address,
    phone : phone , 
    details : details , 
    
        });
 }




//  initializeItems(username: string){
//   let results: any; 
//   let firstname:string='';
//   results = this.db.object('/users/'+firstname).valueChanges().subscribe(user => {
//   console.log('a');
//   return user; 
//   }); 
//   console.log('b');
//   return results; 
  

//  }

// getItems(ev) {
//     // Reset items back to all of the items
//     this.initializeItems();

//     // set val to the value of the ev target
//     var val = ev.target.value;

//     // if the value is an empty string don't filter the items
//     if (val && val.trim() != '') {
//       this.results = this.results.filter((result) => {
//         return (result.toLowerCase().indexOf(val.toLowerCase()) > -1);
//       })
//     }
//   }



}