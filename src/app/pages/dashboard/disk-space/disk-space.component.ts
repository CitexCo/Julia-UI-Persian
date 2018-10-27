import { Component, ViewEncapsulation } from '@angular/core';
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';
import { disk_space } from '../dashboard.data';
import { Router } from '@angular/router';
import { AuthService } from "../../../services/auth-service.service";
@Component({
  selector: 'app-disk-space',
  templateUrl: './disk-space.component.html',
  styleUrls: ['./disk.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DiskSpaceComponent {
  public router: Router;
  KYCVerified:boolean=false;
  public data: any[];
 
  public showLegend = false;
  public gradient = true;
  public colorScheme = {
    domain: ['#2F3E9E', '#D22E2E', '#378D3B']
  }; 
  public showLabels = true;
  public explodeSlices = true;
  public doughnut = false;
 
  public previousShowMenuOption:boolean;
  public previousMenuOption:string;
  public previousMenuTypeOption:string;
  public settings: Settings;
  constructor(router:Router,public appSettings:AppSettings,public authService:AuthService) {
    this.router = router;

    this.settings = this.appSettings.settings;
    this.initPreviousSettings(); 
    // getting all user information and check verified KYC or not
    this.authService.getProfile().subscribe(data=>{

      let user = data['user'];

      if (user.KYCVerified) {
          this.KYCVerified=true;

      }
  })
  }

  ngOnInit(){
    this.data = disk_space;  


  }
  
  public onSelect(event) {
    //console.log(event);
  }

   public ngDoCheck() {
    if(this.checkAppSettingsChanges()) {
      setTimeout(() => this.data = [...disk_space] ); 
      this.initPreviousSettings();
    }
  }
public kyc(){
  this.router.navigate(['pages/form-elements/UserKYC']);
}
  public checkAppSettingsChanges(){
    if(this.previousShowMenuOption != this.settings.theme.showMenu ||
      this.previousMenuOption != this.settings.theme.menu ||
      this.previousMenuTypeOption != this.settings.theme.menuType){
      return true;
    }
    return false;
  }

  public initPreviousSettings(){
    this.previousShowMenuOption = this.settings.theme.showMenu;
    this.previousMenuOption = this.settings.theme.menu;
    this.previousMenuTypeOption = this.settings.theme.menuType;
  }

}
