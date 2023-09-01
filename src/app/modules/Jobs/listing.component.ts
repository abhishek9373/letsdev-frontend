import { Component, OnInit } from '@angular/core';
// import puppeteer, { Browser } from 'puppeteer';


import { JobsService } from 'src/app/services/jobs.service';
import { LoaderService } from 'src/app/services/loader.service';


@Component({
  selector: 'app-placements',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class PlacementsComponent implements OnInit{

  constructor(private jobService: JobsService){ }

  filterVisibility: boolean = false;
  jobs: any = [{ title: "", company_name: "", location : "", ctc: "", start_date: "", experience: "", posted_time: "", logo_url: "" }];

  ngOnInit(): void {
    LoaderService.loader(true);
    this.jobService.getJobs().subscribe((dt: any)=>{
      this.jobs = dt.data;
      LoaderService.loader(false);
    })
    // this.getInitialJobs().then((res)=>{ });
  }


  filterHideShow(){
    const divEle: any = document.getElementById('fs');
    divEle.style = `display: ${this.filterVisibility ? "none" : "block"};`;
    this.filterVisibility = !this.filterVisibility;
  }

  async getInitialJobs(): Promise<any>{
    // try{
    //   const browser: Browser = await puppeteer.launch({ headless: true });
    //   const page = await browser.newPage();
    //   await page.goto('https://internshala.com/jobs');
    //   const jobs = await page.evaluate(() => {
    //     const jobList: any = [];
    //     document.querySelectorAll('.internship_meta').forEach((job: any) => {
    //       const title: any = job.querySelector('.profile')?.innerText ?? 'N/A';
    //       const company_name: any = job.querySelector('.company_name')?.innerText ?? 'N/A';
    //       const location: any = job.querySelector('.location_link')?.innerText ?? 'N/A';
    //       const ctc: any = job.querySelector('.salary')?.innerText ?? 'N/A';
    //       const start_date: any = job.querySelector('#start-date-first')?.innerText ?? 'N/A';
    //       const posted_time: any = job.querySelector('.tags_container_outer .status')?.innerText ?? 'N/A';
    //       const experience: any = job.querySelector('.job-experience-item .desktop-text')?.innerText ?? 'N/A';
    //       const logo_url: any = job.querySelector('.internship_logo img')?.src ?? 'N/A';
    //       jobList.push({ title, company_name, location, ctc, start_date, experience, posted_time, logo_url });
    //     });
    //     return jobList;
    //   });
    //   console.log(jobs);
    //   await browser.close();
    //   return jobs;
    // }catch(error){
    //   throw(error);
    // }
  }
}
