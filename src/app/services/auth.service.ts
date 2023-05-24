import {Injectable} from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  User,
  onAuthStateChanged
} from "@angular/fire/auth";
import {Firestore, collection, doc, setDoc, getDoc} from '@angular/fire/firestore';
import {BehaviorSubject, of} from "rxjs";
import {switchMap} from "rxjs/operators";
import { from } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable();

  constructor(private auth: Auth, private firestore: Firestore) {
    onAuthStateChanged(this.auth, (user) => {
      this.userSubject.next(user);
    });
  }

  login({email, password}: any) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  loginWithGoogle() {
    return from(signInWithPopup(this.auth, new GoogleAuthProvider())).pipe(
      switchMap((result) => {
        if (result.user) {
          return this.createProfileIfNotExists(result.user);
        } else {
          return of(result);
        }
      })
    );
  }

  private createProfileIfNotExists(user: User) {
    const defaultBio = 'My biography';
    const defaultProfileImg = 'assets/img/Default_Profile_Picture.svg.png';

    const profilesCollection = collection(this.firestore, 'profiles');
    const profileDocRef = doc(profilesCollection, user.uid);

    return from(getDoc(profileDocRef)).pipe(
      switchMap((docSnap) => {
        if (!docSnap.exists()) {
          return setDoc(profileDocRef, {
            bio: defaultBio,
            img: defaultProfileImg,
          });
        } else {
          return of(docSnap);
        }
      })
    );
  }


  logout() {
    return signOut(this.auth);
  }

  register({ email, password, firstName, lastName }: any) {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then(async (result) => {
        const { user } = result;
        if (user) {
          const defaultBio = 'My biography';
          const defaultProfileImg = 'assets/img/Default_Profile_Picture.svg.png';
  
          const profilesCollection = collection(this.firestore, 'profiles');
          const profileDocRef = doc(profilesCollection, user.uid);
  
          await setDoc(profileDocRef, {
            firstName: firstName,
            lastName: lastName,
            bio: defaultBio,
            img: defaultProfileImg,
          });
  
          return result;
        } else {
          throw new Error('Error al registrar el usuario');
        }
      });
  }
}  

