import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-emailverification',
  templateUrl: './emailverification.component.html',
  styleUrls: ['./emailverification.component.css']
})
export class EmailverificationComponent implements OnInit, OnDestroy{
  constructor(private userService: UserService, private router: Router) {}
  interval: any;
  ngOnInit(): void {
    this.interval = setInterval(()=>{
      try{
        this.userService.getOnly().subscribe((data: any)=>{
          if(data){
            if(data.isVerified){
              ToastService.toast("Email verified! onboarding...");
              setTimeout(()=>{
                this.router.navigate(['/auth/onboard'])
              }, 5000)
            }
          }
        })
      }catch(err: any){
        ToastService.toast(err.message)
      }

    }, 3000)
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}
