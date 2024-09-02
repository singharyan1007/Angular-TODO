import { inject, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

 private route:ActivatedRoute=inject(ActivatedRoute);
  private storageKey="tasks"

 //get all the tasks
 getAllTasks():Task[]
 {
  const tasks=localStorage.getItem(this.storageKey);
  return tasks?JSON.parse(tasks):[];
 }

 //add a task first
 addTask(task :Task):void{
  const tasks=this.getAllTasks();
  task.id=new Date().getTime();
  tasks.push(task);
  localStorage.setItem("tasks",JSON.stringify(tasks));
 }

 //get a task by id
 //tasks/:id
 getTaskbyId(taskId:number):Task|undefined
 {
  const tasks=this.getAllTasks();
  const task=tasks.find(task=>task.id==taskId);
  return task;

 }

 updateTask(uptask:Task):void
 {
  console.log(uptask);
    const tasks=this.getAllTasks();
    const taskIndex=tasks.findIndex(c=>c.id==uptask.id);
    if(taskIndex!==-1)
    {
      tasks[taskIndex]=uptask;
      localStorage.setItem(this.storageKey,JSON.stringify(tasks));
    }

 }

 deleteTask(taskId:number):void
 {
  const tasks=this.getAllTasks();
  const nTasks=tasks.filter(t=>t.id!=taskId);
  localStorage.setItem(this.storageKey,JSON.stringify(nTasks));
 }

 toggleCompletion(taskId: number): void {
  const tasks = this.getAllTasks();
  const taskIndex = tasks.findIndex(t => t.id === taskId);
  if (taskIndex !== -1) {
    tasks[taskIndex].isCompleted = !tasks[taskIndex].isCompleted;
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
  }
}



}
