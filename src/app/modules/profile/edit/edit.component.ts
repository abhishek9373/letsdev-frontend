import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit{

  constructor(private userModelService: UserService, private router: Router){ }
  user!: any;
  ngOnInit(): void {
    // @ts-ignore
    let name = localStorage.getItem('name');
    // @ts-ignore
    let email = localStorage.getItem('email')
    // @ts-ignore
    let branch = localStorage.getItem('branch')
    // @ts-ignore
    let gender = localStorage.getItem('gender')
    // @ts-ignore
    let Tmpuser: any = { name, email, branch, gender, isVerified: true, _id:"" }
    this.user = Tmpuser;

    if (name && email && branch && gender) {
      // Create the user object
      this.user = { name, email, branch, gender, isVerified: true, _id: '' };

      // Initialize the form with user data
      this.updateUserForm.setValue({
        name: this.user.name,
        email: this.user.email,
        branch: this.user.branch,
        gender: this.user.gender
      });
    }
  }

  updateUserForm = new FormGroup({
    name: new FormControl(``, [Validators.required]),
    email: new FormControl(``, [Validators.required]),
    branch: new FormControl(``, [Validators.required]),
    gender: new FormControl(``, [Validators.required])
  })

  get name(){
    return this.updateUserForm.get('name')
  }
  get email(){
    return this.updateUserForm.get('email')
  }
  get branch(){
    return this.updateUserForm.get('branch')
  }
  get gender(){
    return this.updateUserForm.get('gender')
  }

  update(): boolean{
    if(this.updateUserForm.invalid){
      return false;
    }
    try{
      let name: any = this.updateUserForm.value.name;
      let email: any = this.updateUserForm.value.email;
      let gender: any = this.updateUserForm.value.gender;
      let branch: any = this.updateUserForm.value.branch;
      this.userModelService.update({ name, email, gender, branch }).subscribe((data: any)=>{
        ToastService.toast("profile updated");
        // update loacalstorage values;
        localStorage.setItem('name', name);
        localStorage.setItem('email', email);
        localStorage.setItem('gender', gender);
        localStorage.setItem('branch', branch);
        this.router.navigate(['/profile']);
      })
      return true;
    }
    catch(error: any){
      throw(error);
    }
  }

}
