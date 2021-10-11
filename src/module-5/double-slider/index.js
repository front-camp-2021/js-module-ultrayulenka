export default class DoubleSlider {
  element;
  subElements = {};
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
    this.left = this.calcLeft(this.selected.from);
    this.right = this.calcRight(this.selected.to);
    this.thumbProps = null;
    this.sliderProps = null;

    this.render();
    this.addEvents();
  }

  get template () {
    return `<h4 class="filter-item__title">${this.title}</h4>
    <div class="range-slider">
      <span data-element="from">${this.formatValue(this.selected.from)}</span>
      <div class="range-slider__inner" data-element="slider">
        <span data-element="progress" class="range-slider__progress" style="left: ${this.left}%; right: ${this.right}%"></span>
        <span data-element="thumbLeft" class="range-slider__thumb-left" style="left: ${this.left}%"></span>
        <span data-element="thumbRight" class="range-slider__thumb-right" style="right: ${this.right}%"></span>
      </div>
      <span data-element="to">${this.formatValue(this.selected.to)}</span>
    </div>`
  }


  updateFromValue (from) {
    if(from < this.min) {
      this.selected.from = this.min;
      return;
    } 
    const res = from - this.min;
    if(this.selected.to - res <= this.min) {
      this.selected.from = this.selected.to;
    } else {
      this.selected.from = this.roundValue(from);
    }
  }

  updateToValue (to) {
    if(to > this.max) {
      this.selected.to = this.max
      return;
    }
    const res = this.max - to;
    if(this.selected.from + res >= this.max) {
      this.selected.to = this.selected.from;
    } else {
      this.selected.to = this.roundValue(to);
    };
  }

  calcLeft ({min = this.min, from = this.selected.from, range = this.range}) {
    const left = from - min <= 0? 0 : (from - min) / range * 100;
    if(left + this.right > 100) return 100 - this.right;
    return left;
  }

  calcRight ({max = this.max , to = this.selected.to, range = this.range}) {
    const right = max - to <= 0? 0 : (max - to) / range * 100;
    if(right + this.left > 100) return 100 - this.left;
    return right;
  }

  updateLeftValues () {
    const { thumbLeft, progress, fromIndicator } = this.subElements;
    thumbLeft.style.left = `${this.left}%`;
    progress.style.left = `${this.left}%`;
    fromIndicator.innerHTML = this.formatValue(this.selected.from);
  }

  updateRightValues () {
    const { thumbRight, progress, toIndicator } = this.subElements;
    thumbRight.style.right = `${this.right}%`;
    progress.style.right = `${this.right}%`
    toIndicator.innerHTML = this.formatValue(this.selected.to);
  }

  render () {
    this.element = document.createElement(this.tag? this.tag : "div");
    this.element.className = this.className;
    this.element.innerHTML = this.template;
    this.subElements = this.getSubElements();
  }

  getSubElements () {
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

  setSliderProps () {
    const { slider } = this.subElements;
    const fullWidth = slider.getBoundingClientRect().width;
    const leftBoundry = slider.getBoundingClientRect().left;
    const rightBoundry = slider.getBoundingClientRect().right;
    const bottomBoundry = slider.getBoundingClientRect().y;
    this.sliderProps = {
      fullWidth,
      leftBoundry,
      rightBoundry,
      bottomBoundry
    }
  }

  setThumbProps () {
    const { thumbLeft } = this.subElements;
    const thumbWidth = thumbLeft.getBoundingClientRect().width;
    const thumbHeight = thumbLeft.getBoundingClientRect().height;
    this.thumbProps = {
      thumbWidth,
      thumbHeight
    }
  }

  addEvents () {
    const { thumbLeft, thumbRight } = this.subElements;
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
    const { activeLeft, activeRight } = this.isActive;

    if(!this.thumbProps) this.setThumbProps();
    const { thumbWidth, thumbHeight } = this.thumbProps;

    if(!this.sliderProps) this.setSliderProps();
    const { fullWidth, leftBoundry, rightBoundry, bottomBoundry} = this.sliderProps;

    if(activeLeft) {
      const shiftX = event.clientX - leftBoundry;
      this.left = this.calcLeft({ min: leftBoundry, from: (event.clientX + thumbWidth), range: fullWidth });
      const newFrom = this.min + (shiftX / fullWidth * this.range);
      this.updateFromValue(newFrom);
      this.updateLeftValues();
    }
    
    if(activeRight) {
      const shiftX = rightBoundry - event.clientX;
      this.right = this.calcRight({ max: rightBoundry, to: event.clientX, range: fullWidth })
      const newTo = this.max - (shiftX / fullWidth * this.range)
      this.updateToValue (newTo);
      this.updateRightValues();
    }

    if(event.clientY - thumbHeight / 2  > bottomBoundry) {
      this.element.dispatchEvent(new MouseEvent('pointerup', { bubbles: true }));
    }
  }

  onMouseUp = () => {
    const { thumbLeft, thumbRight } = this.subElements;
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
    this.selected.from = this.min;
    this.selected.to = this.max;
    this.left = this.calcLeft({ from: this.min});
    this.right = this.calcRight({ to: this.max });
    this.updateLeftValues();
    this.updateRightValues();
  }

  removeEvents () {
    const { thumbLeft, thumbRight } = this.subElements;
    thumbLeft.removeEventListener("pointerdown", this.onActiveLeft);
    thumbRight.removeEventListener("pointerdown", this.onActiveRight);
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

    for(let element of Object.values(this.subElements)) {
      element = null;
    }

    this.subElements = {};
  }
}
