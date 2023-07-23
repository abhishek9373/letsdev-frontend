import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Inpute } from '../interfaces/fetch.inpute';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private baseService: BaseService) { }

  // get initial posts
  bootStrap(){
    try{
      const paramObject: Inpute = { method: "GET", options: { params: { page: 0 } }, url: "/posts"}
      this.baseService.fetch(paramObject).subscribe((data)=>{
        if(data){
          return data.data;
        }
        
      })

    }catch(error){
      throw(error);
    }
  }

}
