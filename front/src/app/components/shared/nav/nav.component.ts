import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterOutlet, Routes, RouterLink, RouterLinkActive } from '@angular/router';
import { UserServiceService } from '../../../services/UserService.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule]
})
export class NavComponent implements OnInit {

  constructor(public userService: UserServiceService, private router: Router) { }

  ngOnInit() {
  }


}
