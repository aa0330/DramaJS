/**
 * 进度条组件
 * 提供播放控制、进度拖拽、时间显示等功能
 */

class ProgressBar extends HTMLElement {
  constructor(props) {
    super();
    this.initElements();
  }

  initElements() {
    this.innerHTML = `
   <div class="progress-wrapper">
    <div class="progress-container">
      <div class="progress-bar">啊</div>
    </div>
   </div>
   `;
  }
}

customElements.define("progress-bar", ProgressBar);
