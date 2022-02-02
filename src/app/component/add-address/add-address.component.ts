import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss']
})
export class AddAddressComponent implements OnInit {

addressBookFormGroup: FormGroup;

userForm = new FormGroup({
  firstName : new FormControl('', [Validators.required])
});

City=["Pune","Bengaluru","Mandya","Mysore","Chennai","Chikkaballapura","Hassan","Hyderabad","Vishaakpatanam","Delhi","BBSR","Pune","Raipur","Mumbai"];
State=["Maharashtra","Karnataka","Andra Pradesh","TamilNadu",,"Madhya Pradesh","Odisha","Telangana","Rajasthan"];


  constructor(private formBuilder: FormBuilder,public dialogRef: MatDialogRef<AddAddressComponent>,
    private httpService: ServiceService ,private router: Router, @Inject(MAT_DIALOG_DATA) public data: any) {
      
      this.addressBookFormGroup = new FormGroup({
        fullName : new FormControl('', [Validators.required, Validators.pattern("^[A-Z][a-zA-z\\s]{2,}$")]),
        phoneNumber : new FormControl('',Validators.required),
        address : new FormControl('',Validators.required),
        city: new FormControl('',Validators.required),
        state: new FormControl('',Validators.required),
        zipCode: new FormControl('',[Validators.required, Validators.pattern("^[0-9]{3}\\s{0,1}[0-9]{3}$")]),
      });

    }
    public checkError = (controlName: string, errorName: string) => {
      return this.addressBookFormGroup.controls[controlName].hasError(errorName);
    }
    
    ngOnInit(): void {
      console.log(this.data.value);
      if (this.data != null) {
        this.addressBookFormGroup.patchValue({
          fullName: this.data.fullName,
          phoneNumber: this.data.phoneNumber,
          address: this.data.address,
          city: this.data.city,
          state: this.data.state,
          zipCode: this.data.zipCode
        });
       
      }
    
    }

  
  onSubmit(): void {
    this.httpService.addAddressData(this.addressBookFormGroup.value).subscribe(response=> {
      console.log(response);
      console.log(this.addressBookFormGroup.value);
      this.router.navigate(['']);
    
     
    });
    this.dialogRef.close();
    this.router.navigate(['']);
  }
}
