import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ListSchoolComponent } from 'src/app/components/list-school/list-school.component';
import { AtuhService } from 'src/app/services/auth/atuh.service';
import { MatSnackBar } from "@angular/material/snack-bar"
import { SchoolSelectionService } from 'src/app/services/school-selection/school-selection.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  private formGroupeLogInBldr= inject(FormBuilder)
  formGroupLogIn!: FormGroup;

  constructor(
    private _snackBar: MatSnackBar, 
    public authService: AtuhService,
    public dialog: MatDialog,
    private schoolSelectionService: SchoolSelectionService
  ) { }

  ngOnInit() {
    
    this.initFormLogIn()
  }

  initFormLogIn(){

    this.formGroupLogIn = this.formGroupeLogInBldr.group({
      email: [],
      password: []
    });

  }
  
  onLogIn(){
    this.authService.logIn(this.formGroupLogIn.value).subscribe((response :any) => {
      if(response.code === 1){

        this._snackBar.open(response.message, "Fermer")

      }else{

        this._snackBar.open(response.message, "Fermer")

        localStorage.setItem('access_token', response.data.token);

        this.authService.userSubject.next(response.data);

        if(response.data.roles.find((role: any) => role.id === 1)){
          
          const dialogRef = this.dialog.open(ListSchoolComponent, {
            data: response.data,
          });

          dialogRef.afterClosed().subscribe((schoolSelected: any) => {
            this.schoolSelectionService.schoolSelectedSubject.next(schoolSelected)
          });
          
        }else{
          console.log("PAS ADMIN");
          
        }
        
      }
    })
  }

}
