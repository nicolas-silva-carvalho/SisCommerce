import { UserServiceService } from './../../../services/UserService.service';
import { Component, OnInit } from '@angular/core';
import { UserLogin } from '../../../models/identity/UserLogin';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormGroup, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule]
})
export class LoginComponent implements OnInit {

  model = {} as UserLogin;
  constructor(private userService: UserServiceService, private router: Router) { }

  ngOnInit() {
  }

  public login(): void {
    this.userService.login(this.model).subscribe(
      () => { this.router.navigateByUrl('http://localhost:4200/'); },
      (error: any) => {
        if (error.status == 401) console.log('erro ao logar');
        else console.log('erro ao logar');
      }
    )
  }
}
