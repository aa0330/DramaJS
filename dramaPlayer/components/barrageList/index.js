class DanmuList extends HTMLElement {
  constructor() {
    super();
    // 生成大量测试数据
    this.danmuData = this.generateTestData(1000);
    this.filteredData = [...this.danmuData];

    // 虚拟列表相关属性
    this.visibleStartIndex = 0;
    this.visibleCount = 0;
    this.itemHeight = 50; // 每行高度
    this.bufferCount = 5; // 缓冲区行数

    this.attachShadow({ mode: "open" });
  }

  generateTestData(count) {
    const baseData = [
      { userId: "1", time: "00:12", content: "哇喔", sendTime: "10-30 11:33" },
      {
        userId: "1",
        time: "00:00",
        content: "来早了，没有弹幕",
        sendTime: "10-30 11:33",
      },
      {
        userId: "2",
        time: "00:17",
        content: "他出来了就好",
        sendTime: "10-30 11:33",
      },
      {
        userId: "1",
        time: "00:06",
        content: "1分钟前！！！",
        sendTime: "10-30 11:33",
      },
      {
        userId: "3",
        time: "00:14",
        content: "第一次这么前！！！！",
        sendTime: "10-30 11:34",
      },
      {
        userId: "3",
        time: "01:13",
        content: "好家伙，我刚看完",
        sendTime: "10-30 11:34",
      },
      {
        userId: "3",
        time: "00:32",
        content: "超高兴外卖？",
        sendTime: "10-30 11:34",
      },
      {
        userId: "5",
        time: "00:25",
        content: "这哥们不是进去了吗",
        sendTime: "10-30 11:35",
      },
      {
        userId: "3",
        time: "01:18",
        content: "你不看那我也不看了哈哈哈哈...",
        sendTime: "10-30 11:36",
      },
      {
        userId: "4",
        time: "00:03",
        content: "我也等来了你！",
        sendTime: "10-30 11:39",
      },
      {
        userId: "7",
        time: "01:19",
        content: "魔镜号？！",
        sendTime: "10-30 11:39",
      },
      {
        userId: "8",
        time: "01:08",
        content: "东京很像雅克塔迪蒂的电影《玩...",
        sendTime: "10-30 11:39",
      },
      {
        userId: "6",
        time: "01:31",
        content: "期待",
        sendTime: "10-30 11:40",
      },
      {
        userId: "4",
        time: "01:05",
        content: "说到这个我就不困了",
        sendTime: "10-30 11:42",
      },
    ];

    const result = [];
    for (let i = 0; i < count; i++) {
      const baseItem = baseData[i % baseData.length];
      result.push({
        ...baseItem,
        content: `${baseItem.content} (${i + 1})`,
      });
    }
    return result;
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
    this.calculateVisibleCount();
  }

  render() {
    this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    font-family: 'Segoe UI', 'Microsoft YaHei', sans-serif;
                }
                
                .danmu-list-container {
                    height: 500px;
                    overflow-y: auto;
                    border: 1px solid #e0e0e0;
                    border-radius: 4px;
                }
                
                .danmu-list {
                    width: 100%;
                    border-collapse: collapse;
                    position: relative;
                }
                
                .danmu-list-header {
                    position: sticky;
                    top: 0;
                    z-index: 10;
                    background-color: #f8f9fa;
                }
                
                .danmu-list th {
                    padding: 12px 15px;
                    text-align: left;
                    font-weight: 600;
                    color: #333;
                    border-bottom: 2px solid #e0e0e0;
                    cursor: pointer;
                    user-select: none;
                    background-color: inherit;
                }
                
                .danmu-list th:hover {
                    background-color: #e8f0fe;
                }
                
                .danmu-list th.sorted {
                    color: #4285f4;
                }
                
                .danmu-list th.sorted::after {
                    content: " ▼";
                    font-size: 0.8em;
                }
                
                .danmu-list th.sorted.desc::after {
                    content: " ▲";
                }
                
                .danmu-list td {
                    padding: 12px 15px;
                    border-bottom: 1px solid #e0e0e0;
                    height: ${this.itemHeight}px;
                    box-sizing: border-box;
                }
                
                .danmu-list tr:last-child td {
                    border-bottom: none;
                }
                
                .danmu-list tr:hover {
                    background-color: #f5f5f5;
                }
                
                .time-col {
                    width: 15%;
                }
                
                .content-col {
                    width: 60%;
                }
                
                .send-time-col {
                    width: 25%;
                }
                
                .virtual-list-container {
                    position: relative;
                }
                
                .virtual-list-placeholder {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                }
                
                .virtual-list-content {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                }
                
                .search-container {
                    margin-bottom: 20px;
                    display: flex;
                    gap: 10px;
                }
                
                .search-input {
                    flex: 1;
                    padding: 10px 15px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    font-size: 14px;
                }
                
                .search-button {
                    padding: 10px 20px;
                    background-color: #4285f4;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 14px;
                }
                
                .search-button:hover {
                    background-color: #3367d6;
                }
                
                .stats {
                    margin-bottom: 15px;
                    color: #666;
                    font-size: 14px;
                }
                
                .no-results {
                    text-align: center;
                    padding: 20px;
                    color: #888;
                }
                
                @media (max-width: 768px) {
                    .danmu-list {
                        display: block;
                        overflow-x: auto;
                    }
                    
                    .time-col {
                        width: 20%;
                    }
                    
                    .content-col {
                        width: 50%;
                    }
                    
                    .send-time-col {
                        width: 30%;
                    }
                }
            </style>
            
            <div class="search-container">
                <input type="text" class="search-input" placeholder="搜索弹幕内容...">
                <button class="search-button">搜索</button>
            </div>
            
            <div class="stats">共 <span class="count">${
              this.filteredData.length
            }</span> 条弹幕</div>
            
            <div class="danmu-list-container">
                <table class="danmu-list">
                    <thead class="danmu-list-header">
                        <tr>
                            <th class="time-col sorted">时间</th>
                            <th class="content-col">弹幕内容</th>
                            <th class="send-time-col">发送时间</th>
                        </tr>
                    </thead>
                </table>
                
                <div class="virtual-list-container">
                    <div class="virtual-list-placeholder" style="height: ${
                      this.filteredData.length * this.itemHeight
                    }px;"></div>
                    <div class="virtual-list-content">
                        ${this.renderVisibleRows()}
                    </div>
                </div>
            </div>
        `;
  }

  renderVisibleRows() {
    if (this.filteredData.length === 0) {
      return `
                <table class="danmu-list">
                    <tbody>
                        <tr>
                            <td colspan="3" class="no-results">没有找到匹配的弹幕</td>
                        </tr>
                    </tbody>
                </table>
            `;
    }

    // 计算可见区域的起始和结束索引
    const start = Math.max(0, this.visibleStartIndex - this.bufferCount);
    const end = Math.min(
      this.filteredData.length,
      this.visibleStartIndex + this.visibleCount + this.bufferCount
    );

    // 渲染可见行
    const rows = [];
    for (let i = start; i < end; i++) {
      const item = this.filteredData[i];
      const top = i * this.itemHeight;

      rows.push(`
                <table class="danmu-list" style="position: absolute; top: ${top}px; width: 100%;">
                    <tbody>
                        <tr>
                            <td class="time-col">${item.time}</td>
                            <td class="content-col">${item.content}</td>
                            <td class="send-time-col">${item.sendTime}</td>
                        </tr>
                    </tbody>
                </table>
            `);
    }

    return rows.join("");
  }

  calculateVisibleCount() {
    const container = this.shadowRoot.querySelector(".danmu-list-container");
    if (container) {
      this.visibleCount = Math.ceil(container.clientHeight / this.itemHeight);
    } else {
      this.visibleCount = 10; // 默认值
    }
  }

  setupEventListeners() {
    // 搜索功能
    const searchInput = this.shadowRoot.querySelector(".search-input");
    const searchButton = this.shadowRoot.querySelector(".search-button");

    const performSearch = () => {
      const searchTerm = searchInput.value.toLowerCase().trim();

      if (searchTerm === "") {
        this.filteredData = [...this.danmuData];
      } else {
        this.filteredData = this.danmuData.filter((item) =>
          item.content.toLowerCase().includes(searchTerm)
        );
      }

      this.updateTable();
    };

    searchButton.addEventListener("click", performSearch);
    searchInput.addEventListener("keyup", (e) => {
      if (e.key === "Enter") {
        performSearch();
      }
    });

    // 排序功能
    const timeHeader = this.shadowRoot.querySelector("th.time-col");
    timeHeader.addEventListener("click", () => {
      this.toggleSort();
    });

    // 虚拟列表滚动事件
    const container = this.shadowRoot.querySelector(".danmu-list-container");
    container.addEventListener("scroll", () => {
      this.handleScroll();
    });
  }

  handleScroll() {
    const container = this.shadowRoot.querySelector(".danmu-list-container");
    const scrollTop = container.scrollTop;

    // 计算新的可见起始索引
    const newStartIndex = Math.floor(scrollTop / this.itemHeight);

    // 如果可见区域发生变化，更新渲染
    if (newStartIndex !== this.visibleStartIndex) {
      this.visibleStartIndex = newStartIndex;
      this.updateVisibleRows();
    }
  }

  toggleSort() {
    const timeHeader = this.shadowRoot.querySelector("th.time-col");

    if (timeHeader.classList.contains("sorted")) {
      if (timeHeader.classList.contains("desc")) {
        // 已经是降序，改为升序
        timeHeader.classList.remove("desc");
        this.filteredData.sort(
          (a, b) => this.timeToSeconds(a.time) - this.timeToSeconds(b.time)
        );
      } else {
        // 升序改为降序
        timeHeader.classList.add("desc");
        this.filteredData.sort(
          (a, b) => this.timeToSeconds(b.time) - this.timeToSeconds(a.time)
        );
      }
    } else {
      // 初始排序
      timeHeader.classList.add("sorted");
      this.filteredData.sort(
        (a, b) => this.timeToSeconds(a.time) - this.timeToSeconds(b.time)
      );
    }

    this.updateTable();
  }

  timeToSeconds(timeStr) {
    const [minutes, seconds] = timeStr.split(":").map(Number);
    return minutes * 60 + seconds;
  }

  updateTable() {
    const placeholder = this.shadowRoot.querySelector(
      ".virtual-list-placeholder"
    );
    const content = this.shadowRoot.querySelector(".virtual-list-content");
    const countElement = this.shadowRoot.querySelector(".count");

    // 重置滚动位置
    const container = this.shadowRoot.querySelector(".danmu-list-container");
    container.scrollTop = 0;
    this.visibleStartIndex = 0;

    // 更新高度和内容
    placeholder.style.height = `${
      this.filteredData.length * this.itemHeight
    }px`;
    content.innerHTML = this.renderVisibleRows();
    countElement.textContent = this.filteredData.length;
  }

  updateVisibleRows() {
    const content = this.shadowRoot.querySelector(".virtual-list-content");
    content.innerHTML = this.renderVisibleRows();
  }
}

// 注册自定义元素
customElements.define("danmu-list", DanmuList);
