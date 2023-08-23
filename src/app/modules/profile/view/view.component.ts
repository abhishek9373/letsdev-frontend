import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute, private userService: UserService) { }

  userId!: string;
  user: any = { _id: "", branch: "", email: "", gender: 0, isVerified: true, name: "", stars: 0 };
  ngOnInit(): void {
    try {
      LoaderService.loader(true);
      this.activatedRoute.params.subscribe((param: any) => {
        this.userId = param.userId;
        if (this.userId) {
          this.userService.getById(this.userId).subscribe(data => {
            this.user = data;
          })
        } else {
          this.userService.getOnly().subscribe(data => {
            this.user = data;
          })
        }
        LoaderService.loader(false);
      });
    } catch (error: any) {
      throw (error);
    }
  }

  logout() {
    try {
      const con: boolean = confirm("Are you sure!");
      con && this.authService.logout().subscribe(data => {
        ToastService.toast("logout successfully");
      });
      return 0;
    } catch (error) {
      throw (error);
    }
  }
}
