import { Component, Input, OnInit } from '@angular/core';
import { AzerothAPI } from '../shared/api.client.gen';
import { classColors, classes, gender, races } from '../shared/utility';

@Component({
  selector: 'app-character-row',
  templateUrl: './character-row.component.html',
  styleUrls: ['./character-row.component.css']
})
export class CharacterRowComponent implements OnInit {

  @Input() char : any;

  readonly classColors = classColors;
  readonly classes = classes;
  readonly gender = gender;
  readonly races = races;

  constructor() { }

  ngOnInit(): void {
  }

}
