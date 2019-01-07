import {Injectable} from '@angular/core';
import {UserInterface} from '../Interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class ProcescoService {

  constructor() {}

  createNewUser(data: UserInterface) {
    const users = JSON.parse(localStorage.getItem('acescoUsers')) || [];
    users.push(data);
    console.log(users);
    localStorage.setItem('acescoUsers', JSON.stringify(users));
  }

  validateUser(data) {
    const userList = this.getUserList() || [];
    let response = {};
    if (!userList.find(user => user.name === data.name)) {
      response = {
        error: true,
        errorType: 'username',
        message: 'El usuario no existe'
      };
    } else if (userList.find(user => user.name === data.name) && !userList.find(user => user.password === data.password)) {
      response = {
        error: true,
        errorType: 'password',
        message: 'La contraseña no es correcta',
      };
    } else {
      const currentUser = userList.find(user => user.name === data.name);
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      response = {
        error: false,
        message: 'Login successfully',
        user:  currentUser
      };
    }
    return response;
  }

  getLogedUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  updateUser(user: UserInterface) {
    const userList = this.getUserList();
    const index = userList.findIndex(element => element.name === user.name);
    userList[index] = user;
    console.log(userList);
    localStorage.setItem('acescoUsers', JSON.stringify(userList));
  }

  getUserList() {
    return  JSON.parse(localStorage.getItem('acescoUsers'));
  }
}
