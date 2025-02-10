import { Component, OnDestroy, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit, OnDestroy, AfterViewInit {
  showDefaultText: boolean = true;
  isOverviewActive: boolean = false;
  tooltipVisible = false;
  tooltipData: any;
  tooltipPosition: any;
  chart!: Chart;
  selectedTab: string = 'users';
  currentIndex = 0;
  itemsPerPage = 3;
  autoSlideInterval: any;
  view: [number, number] = [180, 180];
  @ViewChild('chartCanvas') chartCanvas!: ElementRef;

  bestSellingProducts = [
    { title: 'Stylish Cricket &<br> Walking Light <br> Weight Shoes', image: 'assets/Product1.jpg', originalPrice: 280.00, amount: 140.00 },
    { title: 'Combo Pack of 2 <br> Sports Shoes <br> Running Shoes', image: 'assets/Product2.jpg', originalPrice: 320.00, amount: 280 },
    { title: 'Combo Pack of 2 <br> Sports Shoes <br> Running Shoes', image: 'assets/Product3.jpg', originalPrice: 320.00, amount: 280 },
    { title: 'Pack of 2 <br> Sports Shoes ', image: 'assets/Product4.jpg', originalPrice: 250.00, amount: 180 },
    { title: 'Stylish Cricket &<br> Walking Light <br> Weight Shoes', image: 'assets/Product5.jpg', originalPrice: 280.00, amount: 230 },
    { title: 'Combo Pack of 2 <br> Sports Shoes <br> Running Shoes', image: 'assets/Product6.jpg', originalPrice: 320.00, amount: 280 }
  ];
  reviews = [
    { name: "Sally D", time: "2h ago", message: "Great service, highly recommend!", rating: '5/5' },
    { name: "John A", time: "1h ago", message: "Fast delivery, excellent experience.", rating: '2/5' },
    { name: "Lisa K", time: "1h ago", message: "Good quality, will order again!", rating: '5/5' },
    { name: "Mark W", time: "2h ago", message: "Loved the product, 5 stars!", rating: '5/5' },
    { name: "Emma T", time: "3h ago", message: "Quick response and support!", rating: '5/5' },
    { name: "David B", time: "4h ago", message: "Really happy with my purchase.", rating: '5/5' },
    { name: "Sophia M", time: "5h ago", message: "Will recommend to friends!", rating: '4/5' },
    { name: "James L", time: "6h ago", message: "Affordable prices and great quality.", rating: '5/5' },
    { name: "Olivia R", time: "7h ago", message: "Good packaging, arrived safely.", rating: '3/5' },
    { name: "Liam N", time: "8h ago", message: "Superb customer service!", rating: '2/5' },
    { name: "Ethan P", time: "9h ago", message: "Happy with the overall service!", rating: '5/5' },
    { name: "Sally D", time: "2h ago", message: "Great service, highly recommend!", rating: '5/5' },
    { name: "John A", time: "1h ago", message: "Fast delivery, excellent experience.", rating: '2/5' },
    { name: "Lisa K", time: "1h ago", message: "Good quality, will order again!", rating: '5/5' },
    { name: "Mark W", time: "2h ago", message: "Loved the product, 5 stars!", rating: '5/5' },
    { name: "Emma T", time: "3h ago", message: "Quick response and support!", rating: '5/5' },
    { name: "David B", time: "4h ago", message: "Really happy with my purchase.", rating: '5/5' },
    { name: "Sophia M", time: "5h ago", message: "Will recommend to friends!", rating: '4/5' },
    { name: "James L", time: "6h ago", message: "Affordable prices and great quality.", rating: '5/5' },
    { name: "Olivia R", time: "7h ago", message: "Good packaging, arrived safely.", rating: '3/5' },
    { name: "Liam N", time: "8h ago", message: "Superb customer service!", rating: '2/5' },
    { name: "Ethan P", time: "9h ago", message: "Happy with the overall service!", rating: '5/5' }
  ];
  tasks = [
    { data: "iOS App home page", text: "Due on 23 Aug,2019", completed: false },
    { data: "Write a release note for Shreyu", text: "Due on 22 Aug,2019", completed: false },
    { data: "Invite Greeva to a project shreyu admin", text: "Due on 21 Aug,2019", completed: false },
    { data: "Enable analytics tracking for main website", text: "Due on 20 Aug,2019", completed: false },
    { data: "Invite user to a project", text: "Due on 19 Aug,2019", completed: false },
    { data: "Write a release note", text: "Due on 18 Aug,2019", completed: false }
  ];
  conversations = [
    { name: "Geneva", message: "Hello", time: "10:00", profilePic: "assets/alice.jpg" },
    { name: "Dominic", message: "Hi,How are you?<br> What about our next meeting", time: "10:01", profilePic: "assets/bob.jpg" },
    { name: "Geneva", message: "Yeah everything is fine", time: "10:01", profilePic: "assets/alice.jpg" },
    { name: "Dominic", message: "Wow that's great", time: "10:01", profilePic: "assets/bob.jpg" },
  ]

  recentCalls = [
    { name: "Natalie Craig", image: "assets/recents/img1.jpg" },
    { name: "Drew Cano", image: "assets/recents/img2.jpg" },
    { name: "Andi Lane", image: "assets/recents/img3.jpg" },
    { name: "Koray Okumus", image: "assets/recents/img4.jpg" },
    { name: "Kate Morrison", image: "assets/recents/img5.jpg" },
    { name: "Melody Macy", image: "assets/recents/img6.jpg" }
  ];

  users = [
    { image: 'assets/icons/userprofile.png', name: 'Byewind', date: 'Jun 24, 2022', amount: '$942.00', status: 'In-Progress' },
    { image: 'assets/recents/img1.jpg', name: 'Natali Craig', date: 'Mar 10, 2022', amount: '$881.00', status: 'Completed' },
    { image: 'assets/recents/img2.jpg', name: 'Drew Cano', date: 'Nov 10, 2022', amount: '$789.00', status: 'Pending' },
    { image: 'assets/recents/img3.jpg', name: 'Orlando Diggs', date: 'Dec 20, 2022', amount: '$953.00', status: 'Approved' },
    { image: 'assets/recents/img4.jpg', name: 'Andi Lane', date: 'Jul 25, 2022', amount: '$907.00', status: 'Rejected' },
    { image: 'assets/recents/img5.jpg', name: 'Drew Cano', date: 'Nov 10, 2022', amount: '$789.00', status: 'Pending' },
    { image: 'assets/icons/userprofile.png', name: 'Byewind', date: 'Jun 24, 2022', amount: '$942.00', status: 'In-Progress' },
    { image: 'assets/recents/img1.jpg', name: 'Natali Craig', date: 'Mar 10, 2022', amount: '$881.00', status: 'Completed' },
    { image: 'assets/recents/img2.jpg', name: 'Drew Cano', date: 'Nov 10, 2022', amount: '$789.00', status: 'Pending' },
    { image: 'assets/recents/img3.jpg', name: 'Orlando Diggs', date: 'Dec 20, 2022', amount: '$953.00', status: 'Approved' },
    { image: 'assets/recents/img4.jpg', name: 'Andi Lane', date: 'Jul 25, 2022', amount: '$907.00', status: 'Rejected' },
    { image: 'assets/recents/img5.jpg', name: 'Drew Cano', date: 'Nov 10, 2022', amount: '$789.00', status: 'Pending' },
    { image: 'assets/icons/userprofile.png', name: 'Byewind', date: 'Jun 24, 2022', amount: '$942.00', status: 'In-Progress' },
    { image: 'assets/recents/img1.jpg', name: 'Natali Craig', date: 'Mar 10, 2022', amount: '$881.00', status: 'Completed' },
    { image: 'assets/recents/img2.jpg', name: 'Drew Cano', date: 'Nov 10, 2022', amount: '$789.00', status: 'Pending' },
    { image: 'assets/recents/img3.jpg', name: 'Orlando Diggs', date: 'Dec 20, 2022', amount: '$953.00', status: 'Approved' },
    { image: 'assets/recents/img4.jpg', name: 'Andi Lane', date: 'Jul 25, 2022', amount: '$907.00', status: 'Rejected' },
    { image: 'assets/recents/img5.jpg', name: 'Drew Cano', date: 'Nov 10, 2022', amount: '$789.00', status: 'Pending' },
    { image: 'assets/icons/userprofile.png', name: 'Byewind', date: 'Jun 24, 2022', amount: '$942.00', status: 'In-Progress' },
    { image: 'assets/recents/img1.jpg', name: 'Natali Craig', date: 'Mar 10, 2022', amount: '$881.00', status: 'Completed' },
    { image: 'assets/recents/img2.jpg', name: 'Drew Cano', date: 'Nov 10, 2022', amount: '$789.00', status: 'Pending' },
    { image: 'assets/recents/img3.jpg', name: 'Orlando Diggs', date: 'Dec 20, 2022', amount: '$953.00', status: 'Approved' },
    { image: 'assets/recents/img4.jpg', name: 'Andi Lane', date: 'Jul 25, 2022', amount: '$907.00', status: 'Rejected' },
    { image: 'assets/recents/img5.jpg', name: 'Drew Cano', date: 'Nov 10, 2022', amount: '$789.00', status: 'Pending' },

  ];
  slides = [
    { title: 'Profit', value: '$10,000' },
    { title: 'Expenses', value: '$5,000' },
    { title: 'Growth', value: '15%' }
  ];


  pieData = [
    { name: 'Server', value: 20, amount: 100000 },
    { name: 'Hosting', value: 40, amount: 100000 },
    { name: 'Services', value: 15, amount: 100000 },
    { name: 'Others', value: 15, amount: 100000 }
  ];
  ngOnInit() {
    this.startAutoSlide();
  }

  ngOnDestroy() {
    clearInterval(this.autoSlideInterval);
  }
  ngAfterViewInit() {
    this.renderChart();
  }

  setTab(tab: string) {
    this.selectedTab = tab;
    this.renderChart();
  }

  renderChart() {
    if (this.chart) {
      this.chart.destroy();
    }
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    const chartData = this.getChartData();
    this.chart = new Chart(ctx, {
      type: 'line',
      data: chartData,
      options: {
        responsive: true,
        scales: {
          x: {
            title: { display: true, text: 'Months' },
            ticks: { color: '#555' },
            grid: { display: false }
          },
          y: {
            title: { display: true, text: 'Value' },
            suggestedMin: 0,
            suggestedMax: 30,
            ticks: {
              color: '#555',
              callback: (value: any) => {
                return [10, 20, 30].includes(value) ? `$${value}k` : '';
              },
              stepSize: 10,
            },
            grid: { display: false }
          }
        },
        plugins: {
          legend: { display: true }
        }
      }
    });
  }


  getChartData() {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
    return {
      labels: months,
      datasets: [
        {
          label: 'This Year',
          data: [5, 15, 25, 18, 30, 20, 35],
          borderColor: 'black',
          borderWidth: 2,
          tension: 0.4,
          fill: true
        },
        {
          label: 'Previous Year',
          data: [22, 14, 26, 15, 25, 21, 30],
          borderColor: '#b0b0b0',
          borderWidth: 2,
          borderDash: [5, 5],
          tension: 0.4,
          fill: false
        }
      ]
    };
  }


  startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, 3000);
  }

  getVisibleProducts() {
    return this.bestSellingProducts.slice(this.currentIndex, this.currentIndex + this.itemsPerPage);
  }
  showSideNav: boolean = false;
  isRecentCallsOpen: boolean = false;
  isFavCallsOpen: boolean = false;

  toggleRecentCalls() {
    this.isRecentCallsOpen = !this.isRecentCallsOpen;
  }
  toggleFavCalls() {
    this.isFavCallsOpen = !this.isFavCallsOpen;
  }

  toggleSideNav() {
    this.showSideNav = !this.showSideNav;
  }

  nextSlide() {
    if (this.currentIndex + this.itemsPerPage < this.bestSellingProducts.length) {
      this.currentIndex += 1;
    } else {
      this.currentIndex = 0;
    }
  }

  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex -= 1;
    } else {
      this.currentIndex = this.bestSellingProducts.length - this.itemsPerPage;
    }
  }


  onMouseOver(event: any) {
    const index = event.dataIndex;
    this.tooltipData = this.pieData[index];
    this.tooltipData.formattedAmount = this.formatAmount(this.tooltipData.amount);
    this.tooltipVisible = true;
    this.tooltipPosition = {
      top: `${event.event.clientY + 10}px`,
      left: `${event.event.clientX + 10}px`
    };
  }
  formatAmount(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  }

  onMouseLeave() {
    this.tooltipVisible = false;
  }
  colorScheme: Color = {
    domain: ['#0000FF', '#008000', '#FFA500', '#808080'],
    group: ScaleType.Ordinal,
    selectable: true,
    name: 'customScheme'
  };

  navigateToDashboard() {
    this.showDefaultText = false;
  }

  setOverviewActive() {
    this.isOverviewActive = true;
  }

}
