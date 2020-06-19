class nwSyllabusHeader extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
    <!-- Fixed navbar -->
    <nav
      class="navbar navbar-expand-md navbar-dark fixed-top bg-dark bg-nw-green p-2">
  
      <!-- Navbar brand -->
      <a rel="noopener" class="navbar-brand bg-nw-green"
        href="#">${this.getAttribute('shortNum')}</a>
  
      <!-- Collapse button -->
      <button class="navbar-toggler bg-nw-green" type="button"
        data-toggle="collapse" data-target="#navbarCollapse"
        aria-controls="navbarCollapse" aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
  
      <!-- Collapsible content -->
      <div class="collapse navbar-collapse" id="navbarCollapse">
  
        <!-- Left Links -->
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a rel="noopener" class="nav-link" href="#">Syllabus <span
                class="sr-only">(current)</span>
            </a>
          </li>
          <li class="nav-item">
            <a rel="noopener" class="nav-link"
              href=${this.getAttribute('courseURL')} target="_blank">Canvas</a>
          </li>
        </ul>
  
        <!-- Right Search - input group by itself makes it look nice -->
        <div class="input-group"></div>
  
        <input name="keyword" class="form-control mr-sm-2 my-1" type="text"
          placeholder="Search" aria-label="Search" />
        <button class="btn btn-outline-success " id="count">0</button>
        <button class="btn btn-success " id="reset">&#8634;</button>
  
      </div>
  
    </nav>
  
    `;
  }
}

window.customElements.define('nw-syllabus-header', nwSyllabusHeader);
