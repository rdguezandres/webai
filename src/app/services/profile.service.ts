// profile.service.ts
import {Injectable} from '@angular/core';
import {Firestore, doc, getDoc, updateDoc} from '@angular/fire/firestore';
import {Observable, of} from 'rxjs';
import {switchMap, map} from 'rxjs/operators';
import {AuthService} from './auth.service';
import {UserProfile} from "../interfaces/profile";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private authService: AuthService, private firestore: Firestore) {
  }

  getUserProfile(): Observable<UserProfile | null> {
    return this.authService.user$.pipe(
      switchMap(user => {
        if (user) {
          const profileDocRef = doc(this.firestore, 'profiles', user.uid);
          return getDoc(profileDocRef);
        } else {
          return of(null);
        }
      }),
      map(snapshot => {
        if (snapshot && snapshot.exists()) {
          const data = snapshot.data() as UserProfile;
          return {
            uid: snapshot.id,
            bio: data.bio,
            img: data.img,
          };
        } else {
          return null;
        }
      })
    );
  }

  updateBio(uid: string, newBio: string): Promise<void> {
    const profileDocRef = doc(this.firestore, 'profiles', uid);
    return updateDoc(profileDocRef, {bio: newBio});
  }
}
