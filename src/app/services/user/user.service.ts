import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../../settings/app.settings';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../../models/user/user';
import { CustomHttpResponse } from '../../models/custom-http-response';
@Injectable({
  providedIn: 'root'
})
export class UserService {
 

  private host = AppSettings.APP_URL;
  constructor(private http:HttpClient) { }

  public getUsers():Observable<User[] >{
    return this.http.get<User[]>(`${this.host}api/user/list`)
  }

public addUser(formData:FormData):Observable<User>{
  return this.http.post<User>(`${this.host}api/user/add`,formData);
}
public updateUser(formData:FormData):Observable<User | HttpErrorResponse>{
  return this.http.put<User>(`${this.host}api/user/update`,formData);
}

  public deleteUsers(id:number):Observable<CustomHttpResponse>{
    return this.http.delete<CustomHttpResponse>(`${this.host}api/user/delete/${id}`);
  }  
  addUsersToLocalCache(users: User[]):void {
    localStorage.setItem('users',JSON.stringify(users));
    
  }

  public getUsersFromLocalCache(): User[]{

    if(localStorage.getItem('users')){
      return JSON.parse(localStorage.getItem('users')!);
    } else {
      return [];
    }

  }
  createUserFormData(user: User, profilImage: File):FormData {
    const formData = new FormData();
    formData.append('firstName',user.firstname);
    formData.append('lastName',user.lastname);
    formData.append('email',user.email);
    formData.append('password',user.password);
    formData.append('role',user.role);
    formData.append('active',JSON.stringify(user.active));
    formData.append('isNotLocked',JSON.stringify(user.isNotLocked));

    return formData;
   
  }
}
