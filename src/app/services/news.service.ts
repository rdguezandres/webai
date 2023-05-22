import {New} from "../interfaces/new";
import {Injectable} from "@angular/core";
import {collection, collectionData, doc, Firestore, getDoc, getDocs} from "@angular/fire/firestore";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
  })
export class NewService {
  
  constructor(private firestore: Firestore) { }
  getNews(): Observable<New[]> {
    const newsCollectionRef = collection(this.firestore, 'news')
        return collectionData(newsCollectionRef, {idField: 'id'}) as Observable<New[]>;
      }
    
    
 }
  