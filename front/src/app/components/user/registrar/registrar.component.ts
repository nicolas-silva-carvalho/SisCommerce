import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/identity/User';
import { UserServiceService } from '../../../services/UserService.service';
import { Router, RouterOutlet } from '@angular/router';
import {
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css'],
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, ReactiveFormsModule],
})
export class RegistrarComponent implements OnInit {
  user = {} as User;
  form!: FormGroup;

  constructor(
    private userService: UserServiceService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  get f(): any {
    return this.form.controls;
  }

  ngOnInit() {
    this.validation();
  }

  private validation(): void {

    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
      username: ['', Validators.required],
      primeiroNome: ['', Validators.required],
      ultimoNome: ['', Validators.required],
      confirmarSenha: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  register(): void {
    this.user = { ...this.form.value };
    this.userService.registrar(this.user).subscribe({
      next: () => {
        this.router.navigateByUrl('/produtos');
      },
      error: (error: any) => {
        if (error.status == 401) console.log('Usuário ou senha inválidos');
        else console.log(error);
      },
    });
  }
}
