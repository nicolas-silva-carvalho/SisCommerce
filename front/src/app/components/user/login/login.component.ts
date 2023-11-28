import { UserServiceService } from './../../../services/UserService.service';
import { Component, OnInit } from '@angular/core';
import { UserLogin } from '../../../models/identity/UserLogin';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

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
    this.userService.login(this.model).subscribe({
      next: () => { this.router.navigateByUrl('/produtos'); },
      error: (error: any) => {
        if (error.status == 401) console.log('Usuário ou senha inválidos');
        else console.log(error);
      }
    })
  }
}
