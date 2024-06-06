import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, RendererStyleFlags2, ViewChild } from '@angular/core';
import { DomController, Gesture, GestureController, GestureDetail, IonRouterOutlet, Platform, isPlatform } from '@ionic/angular';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit, AfterViewInit {
  loading = true;
  presentingElement: HTMLIonRouterOutletElement;
  @ViewChild('bottomSheet') bottomSheet!: ElementRef;
  @ViewChild('dropdownBtn') dropdownBtn!: ElementRef;
  bottomSheetPosition: number = -170;
  gesture?: Gesture;
  tabsHeight: number = isPlatform('ios') ? 51 : 56;

  constructor(
    private routerOutlet: IonRouterOutlet,
    private gestureCtrl: GestureController,
    private domCtrl: DomController,
    private renderer: Renderer2,
    private platform: Platform
  ) {
    this.presentingElement = this.routerOutlet.nativeEl;
  }

  ngOnInit() {
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }

  ngAfterViewInit() {
    this.gesture = this.gestureCtrl.create({
      el: this.bottomSheet.nativeElement,
      gestureName: 'swipe',
      threshold: 0,
      onStart: ev => this.onStart(),
      onMove: ev => this.onMove(ev),
      onEnd: ev => this.onEnd()
    }, true);

    this.gesture.enable(true);
  }

  onStart() {
    this.renderer.setStyle(this.bottomSheet.nativeElement,
      '--transition-duration',
      '0ms',
      RendererStyleFlags2.DashCase
    );
  }

  onMove(ev: GestureDetail) {
    const bottom = this.getBottom(ev.deltaY);

    this.domCtrl.write(() => {
      this.renderer.setStyle(this.bottomSheet.nativeElement,
        'bottom',
        `${bottom}px`
      );

      this.renderer.setStyle(this.dropdownBtn.nativeElement,
        'rotate',
        `${bottom < -90 ? -180 : 0}deg`
      );
    });
  }

  onEnd() {

    this.bottomSheetPosition = this.getDivBottom();
    let move = 0;

    if (this.bottomSheetPosition < -65) {
      move = -170;
    }


    this.domCtrl.write(() => {
      this.renderer.setStyle(this.bottomSheet.nativeElement,
        '--transition-duration',
        '300ms ease-out',
        RendererStyleFlags2.DashCase
      );

      this.renderer.setStyle(this.bottomSheet.nativeElement,
        'bottom',
        `${move}px`
      );

    });
  }


  toggleDropdown() {
    this.domCtrl.write(() => {
      this.renderer.setStyle(this.bottomSheet.nativeElement,
        '--transition-duration',
        '300ms ease-out',
        RendererStyleFlags2.DashCase
      );

      this.renderer.setStyle(
        this.bottomSheet.nativeElement,
        'bottom',
        `${this.getDivBottom() < -90 ? 0 : -170}px`
      );

      this.renderer.setStyle(this.dropdownBtn.nativeElement,
        'rotate',
        `${this.getDivBottom() < -90 ? -180 : 0}deg`
      );
    });
  }

  private getDivBottom() {
    return (
      this.platform.height() -
      this.tabsHeight -
      this.bottomSheet.nativeElement.getBoundingClientRect().bottom
    )
  }

  private getBottom(deltaY: number) {
    let bottom = this.bottomSheetPosition - deltaY;
    if (bottom > 0) return 0;
    if (bottom < -170) return -170;
    return bottom;
  }
}
