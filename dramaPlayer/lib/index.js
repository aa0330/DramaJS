console.log(11111);

class DramaPlayer extends HTMLElement {
  static observedAttributes = ["width"];

  constructor(props) {
    super();
    this.template = document.createElement("template");
    this.template.innerHTML = `<div>1111</div>`;
    console.log(111, this.template, this.getAttribute("width"));
    this.appendChild(this.template.content);
  }

  connectedCallback() {
    console.log("connectedCallback");
  }
  disconnectedCallback() {
    console.log("disconnectedCallback");
  }
  adoptedCallback() {
    console.log("adoptedCallback");
  }
  attributeChangedCallback(name, oldValue, newValue) {
    console.log("attributeChangedCallback", name, oldValue, newValue);
  }
}

customElements.define("drama-player1", DramaPlayer);
