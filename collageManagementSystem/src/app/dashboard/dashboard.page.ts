import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MenuController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Role } from '../entity/role.enum';
import { Router } from '@angular/router';
import * as d3 from 'd3';
import { Strength } from '../entity/strength';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  // data: Observable<Strength>;
  @ViewChild('chart',{static: true}) private chartContainer: ElementRef;
  title = 'Line Chart';
    data: any[] = [
    {date: new Date('2010-01-01'), value: 80},
    {date: new Date('2010-01-04'), value: 90},
    {date: new Date('2010-01-05'), value: 95},
    {date: new Date('2010-01-06'), value: 100},
    {date: new Date('2010-01-07'), value: 110},
    {date: new Date('2010-01-08'), value: 120},
    {date: new Date('2010-01-09'), value: 130},
    {date: new Date('2010-01-10'), value: 140},
    {date: new Date('2010-01-11'), value: 150},
    ];

    margin = {top: 20, right: 20, bottom: 30, left: 40};

  toast: any;
  public calenderEvent = [
    {
      date: '01/01/2020',
      event: 'Happy New Year',
    },
    {
      date: '14/01/2020',
      event: 'Santranti',
    },
    {
      date: '26/01/2020',
      event: 'Republic Day',
    },
    {
      date: '24/12/2020',
      event: 'Chrismas',
    },
  ];

  constructor( public menuCtrl: MenuController,
    private storage: Storage,
    private router: Router,
    private toastCtrl: ToastController) {}

  presentToast(message) {
      this.toast = this.toastCtrl.create({
        message: message,
        duration: 3000,
        position: 'top'
    }).then((toastData)=>{
        console.log(toastData);
        toastData.present();
      });
  }

  HideToast(){
    this.toast = this.toastCtrl.dismiss();
  }

  openMenu(){
    this.menuCtrl.toggle();
  }

  toggleMenu(): void{
    this.menuCtrl.toggle('dashboardMenu');
  }

  private createChart(): void {
    d3.select('svg').remove();

    const element = this.chartContainer.nativeElement;
    console.log(element,element.offsetWidth, element.offsetHeight);
    const data = this.data;

    const svg = d3.select(element).append('svg')
        .attr('width', 500)
        .attr('height', 500);

    const contentWidth = 500 - this.margin.left - this.margin.right;
    const contentHeight = 500 - this.margin.top - this.margin.bottom;

    console.log(contentWidth,contentWidth);

    const x = d3
      .scaleBand()
      .rangeRound([0, contentWidth])
      .padding(0.1)
      .domain(data.map(d => d.date));

    const y = d3
      .scaleLinear()
      .rangeRound([contentHeight, 0])
      .domain([0, d3.max(data, d => d.value)]);

    const g = svg.append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

    g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + contentHeight + ')')
      .call(d3.axisBottom(x));

    g.append('g')
      .attr('class', 'axis axis--y')
      .call(d3.axisLeft(y).ticks(10, '%'))
      .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '0.71em')
        .attr('text-anchor', 'end')
        .text('Interval');

    g.selectAll('.bar')
      .data(data)
      .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', d => x(d.date))
        .attr('y', d => y(d.value))
        .attr('width', x.bandwidth())
        .attr('height', d => contentHeight - y(d.value));
  }

  authenticateUser(){
    // Or to get a key/value pair
    this.storage.get('role').then((val) => {
      if(val!== null){
        switch(val){
          case Role.admin : console.log('logged in as admin');
                            this.presentToast('logged in as admin');
                            break;
          case Role.staff : console.log('logged in as staff');
                            this.presentToast('logged in as staff');
                            break;
          case Role.student : console.log('logged in as student');
                              this.presentToast('logged in as student');
        }
      }else{
        this.router.navigate(['/login']);
      }
    });
  }

  onResize() {
    this.createChart();
  }

  ngOnInit() {
    this.authenticateUser();
    this.createChart();
  }

}
