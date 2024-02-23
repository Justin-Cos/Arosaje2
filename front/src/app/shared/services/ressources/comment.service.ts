import {Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {ApiService} from '../api.service';
import {CommentModel} from "../../models/comment.model";

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private endpoint = 'comment';

  constructor(private apiService: ApiService) {
  }

  getCommentsByCareSessionId(careSessionId: number): Observable<any> {
    return this.apiService.get<CommentModel[]>(`${this.endpoint}/${careSessionId}/comment`).pipe(
      map((jsonArray: any[]) => {
        return jsonArray.map((json: any) => CommentModel.fromJson(json));
      })
    );
  }

  createComment(formData: FormData): Observable<any> {
    return this.apiService.post<any>(this.endpoint, formData);
  }
}
