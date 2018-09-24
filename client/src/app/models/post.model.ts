export class Post {
    constructor(){
        this._id = '';
        this.title = '';//название статьи
        this.image = '';//картинка
        this.description = '';//текст статьи
        this.category=[];//категория
    }
    public _id;
    public title;
    public image;
    public description;
    public category;
}

