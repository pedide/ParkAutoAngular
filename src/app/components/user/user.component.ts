import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { User } from '../../models/user/user';
import { publishFacade } from '@angular/compiler';
import { UserService } from '../../services/user/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationType } from '../../enum/notification-type.enum';
import { NotificationService } from '../../services/notification/notification.service';
import { AppSettings } from '../../settings/app.settings';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {


  private titleSubject = new BehaviorSubject<string>('Users');
  public titleAction$ = this.titleSubject.asObservable();
  public users!: User[];
  public refreshing!: boolean;
  public subscriptions:Subscription[]=[];
  public showLoading!: boolean;
 declare public fileName:string;
 declare public profilImage:File;
  urlPict = AppSettings.APP_URL;
  public selectedUser!: User;
  
constructor( private userService:UserService,private notificationService:NotificationService){}

public changeTitle(title : string) : void{
  this.titleSubject.next(title);

}

ngOnInit(): void{
  this.getUsers(true);
}

public getUsers(showNotification : boolean):void{
  this.refreshing = true;
  this.subscriptions.push(
    this.userService.getUsers().subscribe({
      next:
          (response:User[]) => {
        this.userService.addUsersToLocalCache(response);
        this.users = response;
        this.refreshing = false;
        if(showNotification){
          this.sendErrorNotification(NotificationType.SUCCESS, `${response.length} user(s) loaded successfully !`);
        }
      }
    ,
    error:
    (errorResponse: HttpErrorResponse) => {
      //console.log(errorResponse);
      this.sendErrorNotification(NotificationType.ERROR, errorResponse.error.message);
      this.refreshing = false;
    }
  }
  )
  );
}
private sendErrorNotification(notificationType: NotificationType, message: string):void {
  if(message){
   this.notificationService.notify(notificationType,message); 
  }else{
    this.notificationService.notify(notificationType,"AN ERROR OCCURED. PLEASE TRY AGAIN");
  }
}
public onSelectUser(selectedUser:User):void{
this.selectedUser = selectedUser;
this.clickButton('openUserInfo');

}

public onAddNewUser(userForm: NgForm):void {
 const formData = this.userService.createUserFormData(userForm.value, this.profilImage as any);
 this.subscriptions.push(
  this.userService.addUser(formData).subscribe(
    {
      next:
          (response:User) => {      
            this.clickButton('new-user-close');  
            
            this.getUsers(false);
            //Je vide mes champs
            this.fileName = null as any;
            this.profilImage=null as any;
            userForm.reset();
            this.sendErrorNotification(NotificationType.SUCCESS, 
              `${response.firstname} ${response.lastname} updated successfully !`);
      }
    ,
    error:
    (errorResponse: HttpErrorResponse) => {
            this.sendErrorNotification(NotificationType.ERROR, errorResponse.error.message);
            this.profilImage=null as any;
      
    }
  }
  )
 );
  }

  public onProfileImageChange(fileName:string,profilImage: File):void {
  //console.log(fileName,file);
  this.fileName = fileName;
  this.profilImage=profilImage;

  }

  public saveNewUser():void {
    this.clickButton('new-user-save');
    
  }

  public clickButton(buttonId:string):void{
    document.getElementById(buttonId)?.click();

  }
ngOnDestroy(): void {
  this.subscriptions.forEach(sub => sub.unsubscribe());
}

  
}




