class WorkoutDashboard {
  constructor() {
    this.dataPath = './data.json';
    this.activeFilter = 'weekly';
    this.dayMapper = {
      'daily': 'day',
      'weekly': 'week',
      'monthly': 'month'
    }
  }

  loadData(path, contentType) {
    return new Promise((resolve, reject) => {
      fetch(path, {
          method: 'GET',
          headers: {
            'Content-Type': contentType,
          },
        })
        .then(response => response.text())
        .then((data) => {
          if (contentType.match('json')) {
            resolve(JSON.parse(data));
          } else {
            resolve(data);
          }
        });
    });
  }

  async initialize() {
    this.data = await this.loadData(this.dataPath, 'application/json');
    this.loadCards();
    this.bindEvents();
  }

  bindEvents() {
    // attach filter buttons event listeners
    document.querySelectorAll('[data-filter]').forEach(elem => {
      elem.addEventListener('click', (e) => {
        e.preventDefault();
      
        // remove active class from all filter buttons
        document.querySelectorAll('[data-filter]').forEach(element => {
          element.classList.remove('btn-active');
        });
      
        // add active class to the button and store filter value
        elem.classList.add('btn-active');
        this.activeFilter = elem.getAttribute('data-filter');
      
        this.loadCards();
      });
    });
  }

  loadCards() {
    const parent =  document.querySelector('#cards-display');

    // delete cards
    var child = parent.lastElementChild; 
    while (child) {
        parent.removeChild(child);
        child = parent.lastElementChild;
    }

    // create cards
    this.data.forEach(item => {
      const html = `
      <div class="card card--${this.slugify(item.title)}">
      <div class="card__content">
        <h2>${item.title}</h2>
        <h1>${item.timeframes[this.activeFilter].current}hrs</h1>
        <p>Last ${this.dayMapper[this.activeFilter]} - ${item.timeframes[this.activeFilter].previous}hrs</p>
        <button>
          <img src="../images/icon-ellipsis.svg" width="16" alt="options">
        </button>
      </div>
      </div>
      `;

      const placeholder = document.createElement("div");
      placeholder.innerHTML = html;
      const card = placeholder.firstElementChild;

      parent.appendChild(card);
    });
  }

  slugify(str) {
    return str.toLowerCase().replace(/\s+/g, '-');
  }
}

window.onload = function() {
  const dashboard = new WorkoutDashboard();
  dashboard.initialize();
}