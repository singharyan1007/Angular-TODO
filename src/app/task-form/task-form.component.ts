import { Component, inject, OnInit } from '@angular/core';
import { Task } from '../task.model';
import { TaskService } from '../task.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [FormsModule,NgIf],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent implements OnInit {
task:Task={id:0,title:'',description:'',dueDate:'',isCompleted:false};
taskService:TaskService=inject(TaskService);
route:ActivatedRoute=inject(ActivatedRoute);
router:Router=inject(Router);

isEditMode:boolean=false;

ngOnInit(): void {
  this.route.paramMap.subscribe(param=>{
    const id=Number(param.get('id'));
    const existingTask=this.taskService.getTaskbyId(id);
    if(existingTask)
    {
      this.task=existingTask;
      this.isEditMode=true;
    }
  }  )
}

onSubmit()
{
  console.log("Working");
  if(this.isEditMode==true)
  {
    console.log(this.task)
    this.taskService.updateTask(this.task);
  }
  else{
    this.taskService.addTask(this.task);
  }
    this.router.navigate(['/tasks']);

  
}
cancel():void
{
  this.router.navigate(['tasks'])
}
}
