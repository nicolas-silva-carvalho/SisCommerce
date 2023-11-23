import { Component, OnInit } from '@angular/core';
import { NavComponent } from '../../shared/nav/nav.component';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css'],
  standalone: true,
  imports: [NavComponent]
})
export class RegistrarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
