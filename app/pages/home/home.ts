import {Page, NavController, Alert} from 'ionic-angular';
import {FirebaseAuth, AuthProviders, AuthMethods, FirebaseRef, AngularFire, FirebaseListObservable} from 'angularfire2';
import {Component} from "@angular/core";
 
@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  todoList: FirebaseListObservable<any>;
  userImage: String = '';
 
  constructor(public af: AngularFire, public auth: FirebaseAuth, public nav: NavController) {}
 
  public createTodo() {
    this.editTodo(null, true);
  }
 
  public openTodo(todo) {
    this.editTodo(todo, false);
  }
 
  public removeTodo(item) {
    this.todoList.remove(item);
  }
 
  editTodo(todo, isNew: boolean) {
    let prompt = Alert.create({
      title: isNew ? 'Create Todo' : 'Update Todo',
      inputs: [
        {
          name: 'title',
          placeholder: 'Title',
          value: todo ? todo.todo : ''
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: todo ? 'Update' : 'Add',
          handler: data => {
            if (isNew) {
              this.todoList.push({'todo': data.title});
            } else {
              this.todoList.update(todo, {todo: data.title});
            }
          }
        }
      ]
    });
    this.nav.present(prompt);
  }
 
  ngOnInit() {
    this.auth.subscribe((data) => {
      if (data) {
        console.log(data);
        if(data.auth.provider === 'google'){
          console.log("Inside google if:::"+ data.uid);
          this.todoList = this.af.list('/todoList');
          this.userImage = data.google.profileImageURL;
        }else{
          console.log("Inside email if");
          this.todoList = this.af.list('/todoList');
          this.userImage = data.password.profileImageURL;
        }
      }
    })
  }
}

 
