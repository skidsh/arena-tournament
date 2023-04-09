import { AfterContentInit, Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AzerothAPI } from '../shared/api.client.gen';
import { DatePipe } from '@angular/common';
import { Editor, Toolbar, toHTML, toDoc } from 'ngx-editor';
import { schema } from 'ngx-editor/schema';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../shared/auth.service';
import { MatLegacyDialog as MatDialog, MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { ConfirmDialogModel, ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  posts : AzerothAPI.PostDTO[] = [];
  pipe = new DatePipe('en-US');
  editors : Editor[] = [];
  toolbar : Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  html : object[] = [];
  editing : boolean[] = [];
  loading : boolean = false;

  constructor(public azerothClient: AzerothAPI.Client, public sanitizer: DomSanitizer,
              public authService: AuthService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadPosts();
  }

  ngAfterContentChecked(): void {

  }

  clearData() {
    this.html = [];
    this.editing = [];
    this.editors = [];
    this.posts = [];
  }

  loadPosts() {
    this.clearData();
    this.loading = true;
    this.azerothClient.getPosts(10, 0, environment.API_KEY)
    .subscribe(
      result => {
        this.posts = result;
        this.loading = false;
      },
      error => {
        this.loading = false;
      },
      () => {
        this.loading = false;
      })
  }

  editSave(i : number) {
    if (this.editing[i] && this.editors[i]) {
      this.loading = true;
      this.azerothClient.upsertPost(environment.API_KEY,
         new AzerothAPI.CreatePostRequest({
           title: this.posts[i].title,
           text: this.posts[i].text,
           jwt: this.authService.getToken() ?? "",
           id: this.posts[i].id,
        })
        ).subscribe(
          result => {
            this.loading = false;
            this.loadPosts();
          },
          error => {
            this.loading = false;
            this.loadPosts();
          },
          () => {
            this.loading = false;
            this.loadPosts();
          }
        )
    }
    if (!this.editors[i]) {
      this.editors[i] = new Editor({
        content: this.posts[i].text,
        history: true,
        keyboardShortcuts: true,
        inputRules: false,
        plugins: [],
        schema,
        nodeViews: {},
        attributes: {},
      });
    }
    this.editing[i] = this.editing[i] ? false : true;
  }

  newPost() {
    this.posts.unshift(new AzerothAPI.PostDTO({
      userId: 11,
      userName: "Jax",
      title: "",
      text: ""
    }));
    this.editSave(0);
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  deleteByIdAPI(id: number) {
    this.loading = true;
    this.azerothClient.deletePost(id, this.authService.getToken() ?? "", environment.API_KEY).subscribe(
      result => {
        this.loading = false;
        this.loadPosts();
      },
      error => {
        this.loading = false;
        this.loadPosts();
      },
      () => {
        this.loading = false;
        this.loadPosts();
      }
    );
  }

  deletePost(i : number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: new ConfirmDialogModel("Confirm delete", "Are you sure you want to delete this post?", "Delete", "Cancel")
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        if (this.posts[i] != undefined && this.posts[i].id)
        {
          this.deleteByIdAPI(this.posts[i].id ?? 0);
        }
        else {
          this.loadPosts();
        }
      }
    });
  }

}
