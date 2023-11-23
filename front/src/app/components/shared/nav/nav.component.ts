import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, Routes, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive]
})
export class NavComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
