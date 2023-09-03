import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { onboard } from 'src/app/interfaces/common.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-onboard',
  templateUrl: './onboard.component.html',
  styleUrls: ['./onboard.component.css']
})
export class OnboardComponent {
  constructor(private authenticationService: AuthService, private router: Router){}
  onboardForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    branch: new FormControl('', [Validators.required])
  });

  branchOptions: any = {
    option1: "Computer",
    option2: "IT",
    option3: "ENTC",
    option4: "Civil",
    option5: "Aerospace",
    option6: "MBA",
    option7: "BSC",
    option8: "BCA",
  }

  genderOptions: any = {
    option1: "Male",
    option2: "Female",
    option3: "Prefer Not to say"
  }

  onboard(){
    if(this.onboardForm.invalid){
      ToastService.toast("Please fill required fields");
      return 0;
    }
    const data: any = this.onboardForm.value;
    data.gender = this.genderOptions[data.gender];
    data.branch = this.branchOptions[data.branch];
    try{
      this.authenticationService.onboard(data).subscribe((data)=>{
        this.router.navigate(['/posts']);
      });
    }catch(error: any){
      ToastService.toast(error.message);
    }
  }

  get name(){
    return this.onboardForm.get('name');
  }
  get gender(){
    return this.onboardForm.get('gender');
  }
  get branch(){
    return this.onboardForm.get('branch');
  }
}
