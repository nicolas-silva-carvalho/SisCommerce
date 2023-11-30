import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserLogin } from '../../../models/identity/UserLogin';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../../services/Account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule]
})
export class LoginComponent implements OnInit {

  model = {} as UserLogin;

  form!: FormGroup;

  constructor(private accountService: AccountService, private router: Router, private formBuilder: FormBuilder, private toastr: ToastrService) { }

  ngOnInit() {
    this.validation();
  }

  get f(): any {
    return this.form.controls;
  }

  private validation(): void {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]]
    })
  }

  public login(): void {
    this.model = { ...this.form.value };
    this.accountService.login(this.model).subscribe({
      next: () => { this.router.navigateByUrl('/produtos'); },
      error: (error: any) => {
        if (error.status == 401) this.toastr.error('Usuário ou senha inválidos', 'Erro!');
        else console.log(error);
      }
    })
  }
}
