import { Component, OnInit, ViewEncapsulation, HostListener } from '@angular/core';
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';
import { MenuService } from '../menu/menu.service';
import { AdminsService } from "../../../services/admins.service";
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [MenuService]
})
export class SidebarComponent implements OnInit {
  public settings: Settings;
  public menuItems: Array<any>;
  isUser;
  isAdmin;

  isExchanger;

  adminRole=[];
  Roles=[]

  constructor(public appSettings: AppSettings, public menuService: MenuService , public adminService: AdminsService) {
    this.settings = this.appSettings.settings;
    this.menuItems = this.menuService.getVerticalMenuItems();



  }

  ngOnInit() {

    let newArr = [];

    const roles = localStorage.getItem('roles');

    const role = JSON.parse(roles)
    
    this.isAdmin = this.IsAdmin(role);
    this.isUser = this.IsUser(role);
    this.isExchanger = this.IsExchanger(role)
    


    if (this.isAdmin) {
      this.adminService.roles().subscribe(data=>{
        this.adminRole = data['roles'];
        this.adminRole.forEach(i => {
          this.Roles.push(i.roleTitle);
        });
        //console.log(this.Roles);
  
      });

      
      for (const item in this.menuItems) {
        let newMenuItem = this.menuItems.filter(item => item.guard == 'admin' || item.guard == 'any')

        newArr.push(newMenuItem[0]);
        //console.log(this.menuItems);
        
       return this.menuItems = newMenuItem;
        
      }
    }
    if (this.isUser) {



      for (const item in this.menuItems) {
        let newMenuItem = this.menuItems.filter(item => item.guard == 'user' || item.guard == 'any')

        newArr.push(newMenuItem[0]);
        this.menuItems = newMenuItem;
      }

    } if (this.isExchanger) {


      for (const item in this.menuItems) {
        let newMenuItem = this.menuItems.filter(item => item.guard == 'exchanger' || item.guard == 'any')

        
        newArr.push(newMenuItem[0]);
        this.menuItems = newMenuItem;

        
      }

    }


  }
  IsAdmin(roleTitle) {

    let adminAccess = document.querySelector('#admin');
    if (roleTitle == 'Admin') {
      return true
    }
    else {
      return false
    }
  }
  IsUser(roleTitle) {


    if (roleTitle == 'User') {
      return true
    }
    else {
      return false
    }
  }
  IsExchanger(roleTitle) {


    if (roleTitle == 'Exchanger') {
      return true
    }
    else {
      return false
    }
  }


  public closeSubMenus() {
    let menu = document.querySelector("#menu0");
    for (let i = 0; i < menu.children.length; i++) {
      let child = menu.children[i].children[1];
      if (child) {
        if (child.classList.contains('show')) {
          child.classList.remove('show');
          menu.children[i].children[0].classList.add('collapsed');
        }
      }
    }
  }


}