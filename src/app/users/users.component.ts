import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
users:any;

constructor(private api:ApiService){

}

  ngOnInit(): void {
    this.lode();
    
  }
lode(){
  this.api.get("https://63c90a79c3e2021b2d4e1377.mockapi.io/api/v1/users").subscribe((result:any)=>{
      this.users=result;
    })
    
}

  deleteuser(id:any){
    if(confirm("sure to delete"))
    this.api.delete("https://63c90a79c3e2021b2d4e1377.mockapi.io/api/v1/users/" +id).subscribe((result:any)=>{
      this.lode();
    })
  }

}
