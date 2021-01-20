import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  blogs: Blog [] = [];
  breakpoint: number;
  constructor() { }

  ngOnInit(): void {
    this.calculateBreakPoint(window.innerWidth);
    for (let i=0; i<19 ; i++){
      this.blogs.push({
        title: 'Seat and Cabin Types on Greece Ferries',
        slug: 'Greece was one of the fastest nation taking measures among countries facing the corona virus outbreak. Following the first cases seen in late February 2020, quarantine measures began to be implemented in the country as of March 22. As a result of the measures that have become more rigid in the country over time, the number of daily cases was reduced to 5-20, and death toll sometimes didn’t change, sometimes increased merely 2. However, as a result of the measures, economic activities in the country, especially tourism, came to a standstill. All other businesses were closed, except for grocery stores, hospitals and pharmacies. After a successful process management, it was thought that re-transition to normal life was necessary both economically and socially. At first, businesses were allowed to open gradually, of course, by protecting various measures such as the use of masks in the public space and inside the businesses, and then sitting in cafes and restaurants on the condition of maintaining social distance. During this time there was no significant increase in the number of cases and deaths. However, after the lifting of flight bans to Europe and some limited countries for tourism purposes, which was launched at the beginning of July 2020 and extended as of July 15, the number of cases started to increase sharply. As of September 23, the average number of cases per day in the last week was 314, while the number of deaths per day was 5.6. The data that remained below 4000 cases and 200 death toll until 15 July shows the total number of cases as 15,928 and the death toll as 352 as of 23 September (https://www.worldometers.info/coronavirus/country/greece/).',
        image: 'https://greeceferries.com/wp-content/uploads/2020/08/people-enjoying-the-beauty-of-the-sea-1024x682-1.jpg'
      });
    }
  }

  onResize(event) {
    this.calculateBreakPoint(event.target.innerWidth);
  }

  calculateBreakPoint(innerWidth: number) {
    if (innerWidth < 1201){
      this.breakpoint = 1;
    } else this.breakpoint = 2;
  }

}

interface Blog {
  title: string,
  slug: string,
  image: string
}
