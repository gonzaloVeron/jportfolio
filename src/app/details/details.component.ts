import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  goToFacebook(){
    this.goTo("https://www.facebook.com");
  }

  goToLinkedin(){
    this.goTo("https://www.linkedin.com");
  }

  goToGithub(){
    this.goTo("https://www.github.com");
  }

  goTo(url) {
    window.open(url, "_blank");
  }

}
