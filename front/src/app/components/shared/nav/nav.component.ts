import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AccountService } from '../../../services/Account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule]
})
export class NavComponent implements OnInit {

  constructor(private router: Router, public accountService: AccountService) { }

  ngOnInit() {
  }


}
