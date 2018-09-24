import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ShowPostService } from './show-post.service';
import { CommonService } from '../../service/common.service';
import { Post } from '../../../models/post.model';


@Component({
  selector: 'app-show-post',
  templateUrl: './show-post.component.html',
  styleUrls: ['./show-post.component.css'],
  providers: [ShowPostService]
})
export class ShowPostComponent implements OnInit {

  public posts: any[]; //результат вызова API
  public post_to_delete;
  @ViewChild('addPost') addBtn: ElementRef;
  @ViewChild('closeBtn') closeBtn: ElementRef;

  constructor(private showPostService: ShowPostService, private commonService: CommonService) {
    this.commonService.postEdit_Observable.subscribe(res => {
      this.addBtn.nativeElement.click();
    });
  }

  ngOnInit() {
    this.getAllPost();
    this.commonService.postAdded_Observable.subscribe(res => {
      this.getAllPost();
    });
  }
  setDelete(post: Post) {
    this.post_to_delete = post;
  }
  unsetDelete() {
    this.post_to_delete = null;
  }
  deletePost() {
    this.showPostService.deletePost(this.post_to_delete._id).subscribe(res => {
      this.getAllPost();
      this.closeBtn.nativeElement.click();
    })
  }
  getAllPost() {
    this.showPostService.getAllPost().subscribe(result => {
      this.posts = result['data'];
    });
  }

  editPost(post: Post) {
    this.commonService.setPostToEdit(post);
  }

}