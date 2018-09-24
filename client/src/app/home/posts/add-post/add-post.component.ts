import { Component, ViewChild, ElementRef } from '@angular/core';
import { AddPostService } from './add-post.service';
import { Post } from '../../../models/post.model';
import { Category } from '../../../models/category.mode';
import { CommonService } from '../../service/common.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
  providers: [AddPostService]
})
export class AddPostComponent {
  @ViewChild('closeBtn') closeBtn: ElementRef;
  public post: Post;
  public allCategories: Category;


  constructor(private addPostService: AddPostService, private router: Router, private commonService: CommonService) {
    this.post = new Post();
    this.allCategories = new Category();
  }
  ngOnInit() {
    this.commonService.postEdit_Observable.subscribe(res => {
      this.post = this.commonService.post_to_be_edited;
    });
    this.getAllCategories(); //поучить из апи список всех категорий
  }
  getAllCategories() {
    this.addPostService.getCategoriesList().subscribe(result => {
      this.allCategories = result['data'];
    });
  }

  addPost() {
    if (this.post.title && this.post.description) {
      if (this.post._id) {
        this.addPostService.updatePost(this.post).subscribe(res => {
          this.closeBtn.nativeElement.click();
          this.commonService.notifyPostAddition();
        });
      } else {
        //писк элемента
        //пробегаем по всему массиву категорий, коорый выбрал пользователь
        this.post.category.forEach(el => {
          // если элемента нет в общем списке категорий 
          if (!this.serchElInArry(this.allCategories, el))//arr1.push(el);
          {
            //елемента нет в базе - добавляем элемент в базу
            this.addPostService.addCategory(el);
          }
        });


        this.addPostService.addPost(this.post).subscribe(res => {
          this.closeBtn.nativeElement.click();
          this.commonService.notifyPostAddition();
        });
      }
    } else {
      alert('Title and Description required');
    }
  }

  addNewCategory = (addNewCategory) => ({ name: addNewCategory });

  serchElInArry = (arryList, value) => {
    for (let i = 0; i < arryList.length; i++) {
      if (arryList[i].name === value) return true;
    }
    return false;
  }
}