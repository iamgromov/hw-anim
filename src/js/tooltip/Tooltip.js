import "./tooltip.css";

export default class Tooltip {
  constructor(button, text) {
    this.button = button;
    this.text = text;
    this.tooltip = null;

    this.tooltipShow = this.tooltipShow.bind(this);
    this.tooltipHide = this.tooltipHide.bind(this);
    this.tooltipHideOutSide = this.tooltipHideOutSide.bind(this);

    this.button.addEventListener("click", this.tooltipShow);
  }

  tooltipShow(event) {
    event.preventDefault();

    if (!this.tooltip) {
      this.tooltip = document.createElement("div");
      this.tooltip.classList.add("tooltip");
      this.tooltip.textContent = `${this.text}`;
      document.body.appendChild(this.tooltip);
    } else {
      this.tooltip.classList.remove("hide");
    }

    const { left, bottom } = this.button.getBoundingClientRect();
    this.tooltip.style.left = `${
      left + this.button.offsetWidth / 2 - this.tooltip.offsetWidth / 2
    }px`;
    this.tooltip.style.top = `${bottom + 10}px`;

    window.addEventListener("resize", this.tooltipHide);
    window.addEventListener("click", this.tooltipHideOutSide);

    this.tooltip.classList.add("show");

    this.button.removeEventListener("click", this.tooltipShow);
    this.button.addEventListener("click", this.tooltipHide);
  }

  tooltipHide() {
    this.tooltip.classList.remove("show");
    this.tooltip.classList.add("hide");
    this.button.removeEventListener("click", this.tooltipHide);
    this.button.addEventListener("click", this.tooltipShow);
    window.removeEventListener("resize", this.tooltipHide);
  }

  tooltipHideOutSide(event) {
    if (event.target !== this.button && event.target !== this.tooltip) {
      window.removeEventListener("click", this.tooltipHideOutSide);
      this.tooltipHide();
    }
  }
}
