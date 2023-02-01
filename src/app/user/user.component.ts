import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

// name = "";
// email = "";
// mobno = "";
posting = false;
id:any;

formgroup:any;

constructor(private api:ApiService ,private router:Router ,private route:ActivatedRoute){

}

  ngOnInit(): void {

    this.formgroup =new FormGroup({
      name:new FormControl("" , Validators.required),
      email:new FormControl("" ,Validators.compose([Validators.required,Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")])),
      mobno: new FormControl("")

    })
     this.id=this.route.snapshot.params["id"];
    if(this.id != undefined){
      this.api.get("https://63c90a79c3e2021b2d4e1377.mockapi.io/api/v1/users/" +this.id).subscribe((result:any)=>{
        this.formgroup =new FormGroup({
          name:new FormControl(result.name , Validators.required),
          email:new FormControl(result.email ,Validators.compose([Validators.required,Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")])),
          mobno: new FormControl(result.mobno)
      
        

      })})
    }
     
   
  }

  // submit(){
  //   let data = {name:this.name,email:this.email,mobno:this.mobno};
  //   this.posting = true;
  //   this.api.post("https://63c90a79c3e2021b2d4e1377.mockapi.io/api/v1/users",data).subscribe((result)=>{
  //     alert("success")
  //   })
  // }

  submit(data:any){
    this.posting = true;
   
    if(this.id==undefined){
    this.api.post("https://63c90a79c3e2021b2d4e1377.mockapi.io/api/v1/users",data).subscribe((result)=>{
      this.router.navigate(['']);
    
  })}
  else{
    
      this.api.put("https://63c90a79c3e2021b2d4e1377.mockapi.io/api/v1/users/" + this.id ,data).subscribe((result)=>{
        this.router.navigate(['']);
        console.log(data);
      
    })

  
}}


}
