import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../services/UserService.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menuLateral',
  templateUrl: './menuLateral.component.html',
  styleUrls: ['./menuLateral.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class MenuLateralComponent implements OnInit {

  constructor(public userService: UserServiceService, private router: Router) { }

  ngOnInit() {
  }

  logout(): void {
    this.userService.logout();
    this.router.navigateByUrl('/');
  }

}
