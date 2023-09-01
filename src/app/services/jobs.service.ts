import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor(private baseService: BaseService) { }


  getJobs(){
    return this.baseService.fetch({ method: 'GET', url: `/chat/jobs`, options: {} });
  }

}
