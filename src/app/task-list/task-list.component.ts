import { Component, inject, OnInit } from '@angular/core';
import { Task } from '../task.model';
import { TaskService } from '../task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, NgClass, NgFor } from '@angular/common';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [NgFor,NgClass,DatePipe],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit  {

 

  tasks:Task[]=[];
  taskService:TaskService=inject(TaskService);
  router:Router=inject(Router);

  ngOnInit(): void {
   this.tasks=this.taskService.getAllTasks(); 
  }
  createTask(): void {
    // Navigate to the 'new task' form
    this.router.navigate(['/tasks/new']);
  }

  editTask(id: number): void {
    // Navigate to the 'edit task' form for the selected task
    console.log("edit")
    this.router.navigate(['/tasks/edit', id]);
  }


  deleteTask(id: number): void {
    this.taskService.deleteTask(id);
  this.tasks=this.taskService.getAllTasks();
  }

  toggleTaskCompletion(id: number): void {
    this.taskService.toggleCompletion(id);
   this.tasks= this.taskService.getAllTasks();
  }
}
