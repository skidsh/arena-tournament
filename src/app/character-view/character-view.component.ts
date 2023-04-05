import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Renderer2, Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { AzerothAPI } from '../shared/api.client.gen';
import { classColors, classes, gender, races } from "../shared/utility";
import { generateModels, getDisplaySlot, findItemsInEquipments } from '../../assets/js/ModelViewer/index.js';

declare var $CoT : any;
declare var LOOKUPS : any;

@Component({
  selector: 'app-character-view',
  templateUrl: './character-view.component.html',
  styleUrls: ['./character-view.component.css']
})
export class CharacterViewComponent implements OnInit {
  loadedScreenshot: boolean = false;
  stillImage: string = "";
  blankImage : string = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
  character : AzerothAPI.CharacterDetail = new AzerothAPI.CharacterDetail;
  loadingItems : boolean[] = [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]
  slots : number[] = [1, 2, 3, 15, 5, 4, 19, 9, 10, 6, 7, 8, 11, 12, 13, 14, 16, 17, 18]
  items : number[] = [0, 0, 0, 0,  0, 0, 0,  0, 0,  0, 0, 0, 0,  0,  0,  0,  0,  0,  0,  0]
  displayIds : number[][] = [[0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0],  [0,0], [0,0], [0,0], [0,0], [0,0], [0,0],  [0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0]]
  enchs : number[] = [0, 0, 0, 0,  0, 0, 0,  0, 0,  0, 0, 0, 0,  0,  0,  0,  0,  0,  0,  0]
  mogs : number[] = [0, 0, 0, 0,  0, 0, 0,  0, 0,  0, 0, 0, 0,  0,  0,  0,  0,  0,  0,  0]
  gems : string[] = ["","","","","","","","","","","","","","","","","","","",""]
  pcs : string[] = ["","","","","","","","","","","","","","","","","","","",""]
  default_icon_path : string = "../../assets/slot-icons/Ui-paperdoll-slot-";
  fullCharName : string = "";
  defaultIcons : string[] = [
    this.default_icon_path+"", // ammo
    this.default_icon_path+"head.webp",
    this.default_icon_path+"neck.webp",
    this.default_icon_path+"shoulder.webp",
    this.default_icon_path+"shirt.webp",
    this.default_icon_path+"chest.webp",
    this.default_icon_path+"waist.webp",
    this.default_icon_path+"legs.webp",
    this.default_icon_path+"feet.webp",
    this.default_icon_path+"wrists.webp",
    this.default_icon_path+"hands.webp",
    this.default_icon_path+"finger.webp",
    this.default_icon_path+"finger.webp",
    this.default_icon_path+"trinket.webp",
    this.default_icon_path+"trinket.webp",
    this.default_icon_path+"chest.webp", // this is for cloak...
    this.default_icon_path+"mainhand.webp",
    this.default_icon_path+"secondaryhand.webp",
    this.default_icon_path+"ranged.webp",
    this.default_icon_path+"tabard.webp"
  ];
  icons : string[] = [];
  model : any;
  constructor(private azerothCore: AzerothAPI.Client, private http: HttpClient,
    public sanitizer: DomSanitizer, private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document)
  {

  }

  public async runModelViewer() {
    var displaySlots = [];
    let i = 0;
    for(let did of this.displayIds) {
      if (this.items[i] > 0
        && !(i >= 11 && i <= 14)
        && (i != 2) && (i != 18)
        && this.displayIds[i][1] > 0 ) {
        displaySlots.push(this.displayIds[i])
      }
      i++;
    }
    const character = {
      "race": this.character?.race ?? 0,
      "gender": this.character?.gender ?? 0,
      "skin": this.character?.skin ?? 0,
      "face": this.character?.face ?? 0,
      "hairStyle": this.character?.hairStyle ?? 0,
      "hairColor": this.character?.hairColor ?? 0,
      "facialStyle": this.character?.faceStyle ?? 0,
      "items": displaySlots
    }
    this.model = await generateModels(295/370, '#model_3d', character);
  }

  async ngOnInit() {
    this.azerothCore.characterByName(location.pathname.split('/').pop(), environment.API_KEY)
    .subscribe(async result => {
      this.character = result;

      var coloredName = "<span style='color:"+classColors.get(this.character?.class ?? 0)+"'>"+this.character?.name+"</span>";

      if (this.character?.title) {
        this.fullCharName = this.character?.title?.replace("%s", coloredName ?? "")
      }
      else {
        this.fullCharName = coloredName ?? ""
      }

      if (result.items != undefined) {
        for (let item of result.items)
        {
          if (item.slot != undefined) {
            var slot = item.slot+1;
            this.items[slot] = item.id ?? 0;
            this.enchs[slot] = item.enchant ?? 0;
            this.gems[slot] = `${(item.gem1 ?? 0)}:${(item.gem2 ?? 0)}:${(item.gem3 ?? 0)}`;
            this.pcs[slot] = item.equipedSetItems?.join(':') ?? ''
            this.mogs[slot] = item.transmog ?? 0;
            this.displayIds[slot] = [item.displaySlot ?? 0, item.displayId ?? 0, item.enchantVisual ? item.enchantVisual : 0];
          }
        }
      }
      this.loadAllItems();
      await this.runModelViewer();
      this.PauseAnimation();
    },
    error => {

    },
    () => {

    })
  }

  public PauseAnimation() {
    setTimeout(() => {
      if (this.loadingItems.includes(true) || !this.model || !this.model.renderer || this.model.renderer.progressShown) {
        this.PauseAnimation();
      }
      else {
        this.model.setAnimPaused(true);
        this.model.renderer.makeDataURL = ["image/png", 1];
        this.model.renderer.screenshotCallback = () => {
          this.stillImage = this.model.renderer.screenshotDataURL;
          this.loadedScreenshot = true;
          delete this.model.renderer.canvas[0]
          this.model.renderer.canvas[0] = null;
          delete this.model;
        }
      }
    }, 500)
  }

  public loadAllItems() {
    setTimeout(() => {
      if ($CoT && $CoT.ajaxRequest) {
        $CoT.Tooltip.setIcon = function() {}
        let i = 0;
        for (let item of this.items) {
          if (item > 0) {
            this.queueItem(i, item);
          }
          else {
            this.loadingItems[i] = false;
          }
          i++;
        }
      }
      else {
        this.loadAllItems();
      }
    }, 100)
  }

  public queueItem(i : number, item : number)
  {
    setTimeout(() => {
      if (!$CoT.IsQueryPending(item)) {
        var ench = this.getEnchantId(i);
        var gems = this.getGems(i);
        var arr = LOOKUPS[3][0];
        var sock = "";
        var fullId = item + (ench ? "e" + ench : "") + (gems ? "g" + gems.split(':').join(',') : "") + (sock ? "s" : "");
        if (!$CoT.fullIdList[item]) {
          $CoT.fullIdList[item] = {};
        }
        if (!$CoT.fullIdList[item][fullId])
        {
          $CoT.fullIdList[item][fullId] = true;
        }
        $CoT.ajaxRequest(`https://wotlk.cavernoftime.com/item=${item}&power=true&ench=${ench}&gems=${gems}`)
        this.initItem(fullId);
        arr[2][fullId].status[0] = 1;
        this.loadItem(i, fullId);
      }
      else {
        this.queueItem(i, item);
      }
    }, 100)
  }

  public loadItem(slot : number, id : string) {
    var arr = LOOKUPS[3][0];
    var expansion = 2;
    var locale = 0

    setTimeout(() => {
      if (arr[expansion][id]["tooltip_enus"]) {
        arr[expansion][id].status[locale] = 4;
        var icon = arr[expansion][id]['icon'];
        this.icons[slot] = `http://cdn.cavernoftime.com/wotlk/icons/large/${icon}.jpg`
        this.loadingItems[slot] = false;
      }
      else {
        this.loadItem(slot, id);
      }
    }, 100)
  }

  public initItem(id : string) {
    var arr = LOOKUPS[3][0];
    var expansion = 2;
    var locale = 0

    if (arr[expansion] == null) {
              arr[expansion] = {};
    }

    if (arr[expansion][id] == null) {
        arr[expansion][id] = {};
    }

    if (arr[expansion][id].status == null) {
        arr[expansion][id].status = {};
    }

    if (arr[expansion][id].response == null) {
        arr[expansion][id].response = {};
    }

    if (arr[expansion][id].status[locale] == null) {
        arr[expansion][id].status[locale] = 0;
    }
  }

  public getItem(slotId : number) {
      return this.items[slotId];
  }

  public getEnchantId(slotId : number) {
    return this.enchs[slotId];
  }

  public getGems(slotId : number) {
    return this.gems[slotId];
  }

  public getBackgroundIcon(slotId : number) {
    return this.defaultIcons[slotId];
  }

  public getIcon(slotId : number) {
    return this.icons[slotId];
  }

  public getPcs(slotId : number) {
    return this.pcs[slotId];
  }

  public getTransmog(slotId : number) {
    return this.mogs[slotId];
  }

}
