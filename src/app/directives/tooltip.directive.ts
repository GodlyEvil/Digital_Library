import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[tooltip]'
})
export class TooltipDirective {

  tooltip: HTMLElement;
  @Input("tooltip") tooltipTitle: string;
  delay = 500;
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener("mouseenter", ["$event"]) onMouseEnter(event) {
    // console.log(event)
    this.showTooltip(event);
  }

  @HostListener("mouseleave") onMouseLeave() {
    this.renderer.removeClass(this.tooltip, "tooltip_show");
  }

  showTooltip(event) {
    this.tooltip = this.renderer.createElement("span"); 
    this.tooltip.appendChild(this.renderer.createElement("span")); 
    
    this.renderer.appendChild(
      this.tooltip,
      this.renderer.createText(this.tooltipTitle) 
    );
    // const hostPos = this.el.nativeElement.getBoundingClientRect();
    console.log(document.body.clientHeight, event.view.scrollY, document.body.scrollHeight)
    let top:number;
    let left:number;
    // top = document.body.scrollHeight - ;
    // left = hostPos.left + hostPos.width / 2;
    // top = document.body.clientHeight - 
    this.renderer.setStyle(this.tooltip, "top", `${top}px`); 
    this.renderer.setStyle(this.tooltip, "left", `${left}px`); 
    this.renderer.appendChild(document.body, this.tooltip);
    this.renderer.addClass(this.tooltip, "tooltip");
    this.renderer.addClass(this.tooltip, "tooltip_show"); 
  }
}
