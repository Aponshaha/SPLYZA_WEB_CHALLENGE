import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'SPLYZA';
  user = {
    id: 'xxxxx0',
    name: 'Tanaka Shigeru',
    pictureUrl: 'http://localhost:3000/images/tanaka-icon.png',
  };

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}
}
