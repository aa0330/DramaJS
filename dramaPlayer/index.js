/***
 * 抓马播放器组件
 *
 */
import "./components/progressBar/index.js";

class DramaPlayer extends HTMLElement {
  static observedAttributes = ["width"];

  #doms = {
    dramaPlayer: "#drama-player",
    coverContainer: "#cover-container",
    videoPlayer: "#video-player",
    pauseIconWrapper: "#pause-icon-wrapper",
    controlWrapper: "#control-wrapper",
  };

  constructor(props) {
    super(props);
    this.coverImgUrl = this.getAttribute("posterUrl");
    this.pauseIconSvg = this.getAttribute("pauseIconSvg");
    this.src = this.getAttribute("src");
    this.initElements();
  }

  initElements() {
    this.template = document.createElement("template");
    this.template.innerHTML = `
    <style>
      .drama-player {
        position: relative;
        z-index: 1;
        user-select: none;
        aspect-ratio: 16 / 9;
        border-radius: 8px;
        overflow: hidden;
      }

     .cover-container {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
      }

      .cover-container img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        image-rendering: -webkit-optimize-contrast;
        image-rendering: crisp-edges;
      }


      video {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        object-fit: cover;
        aspect-ratio: 16 / 9;
      }

      .video-player-wrapper {
        width: 100%;
        height: 100%;
        position: absolute;
        bottom: 0;
        z-index: 99;
        overflow: hidden;
      }
      
      .pause-icon-wrapper {
        width: 50px;
        height: 50px;
        position: absolute;
        right: 37px;
        bottom: 68px;
        z-index: 99;
      }

      .pause-icon-wrapper svg {
        width: 100%;
        height: 100%;
        fill: #dbdbdb;
        opacity: 0.7;
        z-index: 99;
      }

      .control-wrapper {
        width: 100%;
        height: 100%;
        position: absolute;
        bottom: 0;
        z-index: 99;
      } 

    </style>

      <div id="drama-player" class="drama-player">
      <div id="cover-container" class="cover-container">
        <img src="${this.coverImgUrl}" alt="封面图">
      </div>
      <video id="video-player" src="${this.src}"></video>
      <div id="video-player-wrapper" class="video-player-wrapper">
        <div id="pause-icon-wrapper" class="pause-icon-wrapper">
          ${this.pauseIconSvg}
        </div>
        <div id="control-wrapper" class="control-wrapper">
          <progress-bar></progress-bar>
        </div>
      </div>
    </div>
    `;
    this.appendChild(this.template.content);

    doms.forEach((dom) => {
      this.shadowRoot.querySelector(dom).addEventListener("click", () => {
        this.shadowRoot.querySelector(dom).style.display = "none";
      });
    });
  }

  connectedCallback() {}

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

customElements.define("drama-player", DramaPlayer);
