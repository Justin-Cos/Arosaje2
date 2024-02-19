import {Component, OnInit} from '@angular/core';
import {CareSessionService} from "../../shared/services/ressources/care-session.service";
import {switchMap} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";
import {CareSessionModel} from "../../shared/models/care-session.model";
import {CommentModel} from "../../shared/models/comment.model";
import {PlantModel} from "../../shared/models/plant.model";
import {UserModel} from "../../shared/models/user.model";
import {AddressModel} from "../../shared/models/address.model";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {AuthService} from "../../shared/services/auth.service";
import {ApiService} from "../../shared/services/api.service";

@Component({
  selector: 'app-care-session',
  standalone: true,
  imports: [
    DatePipe,
    NgIf,
    NgForOf
  ],
  templateUrl: './care-session.component.html',
  styleUrl: './care-session.component.scss'
})
export class CareSessionComponent implements OnInit {
  careSession!: CareSessionModel;
  plant!: PlantModel;
  careTaker!: UserModel;
  owner!: UserModel;
  address!: AddressModel;
  comments: {author:UserModel,comment:CommentModel}[] = [];

  constructor(private CareSessionService: CareSessionService, private route: ActivatedRoute, public authService: AuthService, private router: Router) {}
  ngOnInit() {


      this.route.params
        .pipe(
          switchMap(params => {
            const session_id = params['session_id'];
            return this.CareSessionService.getCareSessionById(session_id);
          })).subscribe(data => {
            console.log(data);
        this.careSession = data.careSession;
        this.plant = data.plant.plant;
        this.careTaker = data.user;
        this.address = data.address;
        this.comments = data.comments;
        this.owner = data.plant.owner;
      });
  }
  getRole(user_id: number): string {
    if (this.careTaker?.user_id === user_id) {
      return 'caretaker';
    } else if (this.owner.user_id === user_id) {
      return 'owner';
    } else {
      return '';
    }
  }
  becomeCaretaker() {
    this.careSession.caretaker = this.authService.getUserId();
    this.CareSessionService.updateCareSession(this.careSession).subscribe((response: any) => {
      this.ngOnInit();
    });
  }

  protected readonly ApiService = ApiService;
}
