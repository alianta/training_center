import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../../../models/post.model';
import { Category } from '../../../models/category.mode'

 
@Injectable()
export class AddPostService {
    postDate = new Date().toJSON().slice(0,16).replace(/-/g,'.').replace(/T/g,' ')
    constructor(private http: HttpClient){
 
    }
    addPost(post: Post){
        
        return this.http.post('/api/post/createPost',{
            date: this.postDate,
            title : post.title,
            description : post.description,
            category: post.category,
            image: post.image
        })
    }

    updatePost(post: Post){
        return this.http.post('/api/post/updatePost',{
            id: post._id,
            title : post.title,
            description : post.description,
            date: this.postDate,
            category: post.category,
            image: post.image
        })
    }
    getCategoriesList(){
        return this.http.post('/api/post/getPostCategoryList',{})
    }
    addCategory(catName: String){
        
        return this.http.post('/api/post/addCategory',catName)
    }
}