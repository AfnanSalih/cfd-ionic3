import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

//user import
import { AngularFireDatabase ,AngularFireList  } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { HomePage } from '../home/home';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  humancaselist: AngularFireList<any>;

  
  constructor(public navCtrl: NavController,public db:AngularFireDatabase) {
    
    this.humancaselist=db.list('/case');

 
  }

 addcase(firstname,lastname,address,phone,details){
    this.humancaselist.push({
     key_id: new Date().getTime(),
        firstname :firstname ,
        lastname :lastname,
        address: address,
        phone: phone,
        details:details
          }).then(newPerson => {
  
            this.navCtrl.push(HomePage);
          });
  }


  }
 

