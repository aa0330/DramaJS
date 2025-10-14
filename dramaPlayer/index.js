class DramaPlayer extends HTMLElement {
    constructor() {
        super()
        this.template = document.createElement('template');
        this.template.innerHTML = `<div>66666</div>`;
        console.log(111, this.template);
        this.appendChild(this.template.content)
    }

}

customElements.define('drama-player', DramaPlayer);