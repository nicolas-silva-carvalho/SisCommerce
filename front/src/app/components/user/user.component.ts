import { RouterOutlet } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NavComponent } from '../shared/nav/nav.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  standalone: true,
  imports: [RouterOutlet, NavComponent]
})
export class UserComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
