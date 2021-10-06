export default class DoubleSlider {
  element;
  range = 0;
  className = "filter-item";
  isActive = { activeLeft: false, activeRight: false };

  constructor({
    min = 100,
    max = 200,
    formatValue = value => value,
    selected = {
      from: min,
      to: max
    },
    precision = 1,
    filterName = '',
    tag = ''
  } = {}) {
    this.min = min;
    this.max = max;
    this.precision = precision;
    if(this.max > this.min) this.range = this.max - this.min;
    this.formatValue = formatValue;
    this.selected = selected;
    this.title = filterName;
    this.tag = tag;
    this.calcLeftInPercents(this.selected.from);
    this.calcRightInPercents(this.selected.to);

    this.render();
    this.addEvents();
  }

  get template () {
    return `<h4 class="filter-item__title">${this.title}</h4>
    <div class="range-slider">
      <span data-element="from">${this.formatValue(this.selected.from)}</span>
      <div class="range-slider__inner" data-element="slider">
        <span data-element="progress" class="range-slider__progress" style="left: ${this.left}; right: ${this.right}"></span>
        <span data-element="thumbLeft" class="range-slider__thumb-left" style="left: ${this.left}"></span>
        <span data-element="thumbRight" class="range-slider__thumb-right" style="right: ${this.right}"></span>
      </div>
      <span data-element="to">${this.formatValue(this.selected.to)}</span>
    </div>`
  }

  calcLeftInPercents (from) {
    if(from < this.min) return;
    const res = from - this.min;
    if(this.selected.to - res <= this.min) {
      this.selected.from = this.selected.to;
    } else {
      this.selected.from = this.roundValue(from);
    };
    const left = (this.selected.from - this.min) / this.range * 100;
    this.left = `${left}%`;
  }

  calcRightInPercents (to) {
    if(to > this.max) return;
    const res = this.max - to;
    if(this.selected.from + res >= this.max) {
      this.selected.to = this.selected.from;
    } else {
      this.selected.to = this.roundValue(to);
    };
    const right = (this.max - this.selected.to) / this.range * 100;
    this.right = `${right}%`;
  }

  render () {
    this.element = document.createElement(this.tag? this.tag : "div");
    this.element.className = this.className;
    this.element.innerHTML = this.template;
    this.subelements = this.getSubelements();
  }

  getSubelements () {
    const progress = this.element.querySelector('[data-element="progress"]');
    const thumbLeft = this.element.querySelector('[data-element="thumbLeft"]');
    const thumbRight = this.element.querySelector('[data-element="thumbRight"]');
    const slider = this.element.querySelector('[data-element="slider"]');
    const toIndicator = this.element.querySelector('[data-element="to"]');
    const fromIndicator = this.element.querySelector('[data-element="from"]');
    return {
      progress,
      thumbLeft,
      thumbRight,
      slider,
      toIndicator,
      fromIndicator
    };
  }

  getSliderProps () {
    const { slider } = this.subelements;
    const fullWidth = slider.getBoundingClientRect().width;
    const leftBoundry = slider.getBoundingClientRect().left;
    const rightBoundry = slider.getBoundingClientRect().right;
    const bottomBoundry = slider.getBoundingClientRect().y;
    return {
      fullWidth,
      leftBoundry,
      rightBoundry,
      bottomBoundry
    };
  }

  addEvents () {
    const { thumbLeft, thumbRight } = this.subelements;
    thumbLeft.addEventListener("pointerdown", this.onActiveLeft);
    thumbRight.addEventListener("pointerdown", this.onActiveRight);
  }

  onActiveLeft = (event) => {
    event.preventDefault();
    this.isActive.activeLeft = true;
    event.target.classList.add("range-slider_dragging");
    this.element.addEventListener("pointermove", this.onMouseMove);
    this.element.addEventListener("pointerup", this.onMouseUp);
  }

  onActiveRight = (event) => {
    event.preventDefault();
    this.isActive.activeRight = true;
    event.target.classList.add("range-slider_dragging");
    this.element.addEventListener("pointermove", this.onMouseMove);
    this.element.addEventListener("pointerup", this.onMouseUp);
  }

  onMouseMove = (event) => {
    const { thumbLeft, thumbRight, progress, toIndicator, fromIndicator } = this.subelements;
    const thumbHeight = thumbLeft.getBoundingClientRect().height;
    const { activeLeft, activeRight } = this.isActive;
    const { fullWidth, leftBoundry, rightBoundry, bottomBoundry} = this.getSliderProps();
    if(activeLeft) {
      let newLeft = event.clientX - leftBoundry;
      let newFrom;
      if(newLeft < 0) {
        newLeft = 0;
        newFrom = this.min;
      } else {
        newFrom = this.min + (newLeft / fullWidth * this.range);
        if(newFrom >= this.selected.to) {
          newFrom = this.selected.to;
        }
      }
      this.calcLeftInPercents(newFrom);
      thumbLeft.style.left = this.left;
      progress.style.left = this.left;
      fromIndicator.innerHTML = this.formatValue(this.selected.from);
    } else if(activeRight) {
      let newRight = rightBoundry - event.clientX;
      let newTo;
      if(newRight < 0) {
        newRight = 0;
        newTo = this.max;
      } else {
        newTo = this.max - (newRight / fullWidth * this.range);
        if(newTo <= this.selected.from) {
          newTo = this.selected.from;
        }
      }
      this.calcRightInPercents(newTo);
      thumbRight.style.right = this.right;
      progress.style.right = this.right;
      toIndicator.innerHTML = this.formatValue(this.selected.to);
    }

    if(event.clientY - thumbHeight / 2  > bottomBoundry) {
      this.element.dispatchEvent(new MouseEvent('pointerup', { bubbles: true }));
    }
  }

  onMouseUp = () => {
    const { thumbLeft, thumbRight } = this.subelements;
    if(this.isActive.activeLeft) {
      this.isActive.activeLeft = false;
      thumbLeft.classList.remove("range-slider_dragging");
    }
    if(this.isActive.activeRight) {
      this.isActive.activeRight = false;
      thumbRight.classList.remove("range-slider_dragging");
    }
    this.element.removeEventListener("pointermove", this.onMouseMove);
    this.element.removeEventListener("pointerup", this.onMouseUp);

    this.dispatchRangeEvent();
  }

  roundValue (value) {
    const newValue = value * Math.pow(10, this.precision);
    const res = Math.round(newValue) / Math.pow(10, this.precision)
    return res;
  }

  reset = () => {
    this.calcLeftInPercents(this.min);
    this.calcRightInPercents(this.max);
    const { thumbLeft, thumbRight, progress, toIndicator, fromIndicator } = this.subelements;

    thumbLeft.style.left = this.left;
    progress.style.left = this.left;
    fromIndicator.innerHTML = this.formatValue(this.selected.from);

    thumbRight.style.right = this.right;
    progress.style.right = this.right;
    toIndicator.innerHTML = this.formatValue(this.selected.to);
  }

  removeEvents () {
    const { thumbLeft, thumbRight } = this.subelements;
    thumbLeft.removeEventListener("pointerdown", this.onActiveLeft);
    thumbRight.removeEventListener("pointerdown", this.onActiveRight);
    this.element.removeEventListener("pointermove", this.onMouseMove);
    this.element.removeEventListener("pointerup", this.onMouseUp);
  }

  dispatchRangeEvent() {
    const newEvent = new CustomEvent("range-selected", { bubbles: true, detail: {filterName: this.title, value: this.selected} });
    this.element.dispatchEvent(newEvent);
  }

  remove () {
    if (this.element) {
      this.element.remove();
      this.removeEvents();
    }
  }

  destroy () {
    this.remove();
    this.element = null;
  }
}
