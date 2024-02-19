import {Component, OnInit, ViewChild} from '@angular/core';
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
import {getDate} from "date-fns";
import {FormsModule, NgForm} from "@angular/forms";
import {FileUpload, FileUploadModule} from "primeng/fileupload";
import {MessageModule} from "primeng/message";
import {CommentService} from "../../shared/services/ressources/comment.service";

@Component({
  selector: 'app-care-session',
  standalone: true,
  imports: [
    DatePipe,
    NgIf,
    NgForOf,
    FormsModule,
    FileUploadModule,
    MessageModule
  ],
  templateUrl: './care-session.component.html',
  styleUrls: ['./care-session.component.scss', '../profile/form-modal/form-modal.component.scss']})
export class CareSessionComponent implements OnInit {
  careSession!: CareSessionModel;
  plant!: PlantModel;
  careTaker!: UserModel;
  owner!: UserModel;
  address!: AddressModel;
  comments: {author:UserModel,comment:CommentModel}[] = [];
  dateNow!: Date;
  session_id!: number;
  protected readonly ApiService = ApiService;
  content: string = '';
  title: string = '';
  commentFormOpened: boolean = false;

  constructor(private CareSessionService: CareSessionService, private commentService: CommentService, private route: ActivatedRoute, public authService: AuthService, private router: Router) {}
  @ViewChild('fileUpload') fileUpload: FileUpload | undefined;

  ngOnInit() {
    this.route.params
      .pipe(
        switchMap(params => {
          this.session_id = params['session_id'];
          return this.CareSessionService.getCareSessionById(this.session_id);
        }
        )).subscribe(data => {
          this.dateNow = new Date();
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
      return 'Gardien';
    } else if (this.owner.user_id === user_id) {
      return 'Propriétaire';
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
  showCommentForm() {
    this.commentFormOpened = !this.commentFormOpened;
  }
  onSubmit(commentForm: NgForm) {
      this.ngOnInit();

      if (commentForm.valid && this.content !== '' || this.fileUpload?.files[0] !== undefined){
        const formData = new FormData();
        formData.append('content', this.content);
        formData.append('title', this.title);
        formData.append('care_session', this.session_id.toString());
        formData.append('date', this.dateNow.toISOString());
        formData.append('author', this.authService.getUserId().toString());
        formData.append('author_role', this.getRole(this.authService.getUserId()) === '' ? this.authService.getRole() : this.getRole(this.authService.getUserId()));
        if (this.fileUpload && this.fileUpload.files.length > 0) {
          formData.append('image', this.fileUpload.files[0]);
        }
        this.commentService.createComment(formData).subscribe(
          (response) => {
            this.showCommentForm();
            this.ngOnInit();
          });
      }
  }
}
