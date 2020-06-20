class nwSyllabusOutline extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
    <h2>Course Outline</h2>

    <p>The course is divided into seven content modules.</p>

    <table class="table table-bordered">
    <thead class="thead-dark">
      <tr class="d-flex">
        <th class="col-2 ">Module</th>
        <th class="col-2 ">Weeks</th>
        <th class="col-8 ">Topics</th>
      </tr>
      </thead>
      <tr class="d-flex">
        <td class="col-2 ">1</td>
        <td class="col-2 ">1-3</td>
        <td class="col-8 "> Course intro, environment, Markdown, Git, publishing  </td>
      </tr>
      <tr class="d-flex">
        <td class="col-2 ">2</td>
        <td class="col-2 ">4-5</td>
        <td class="col-8 ">
        HTML, concepts, CSS, responsive design, JavaScript, jQuery, DOM,
        AJAX, fetch, axios
        </td>
      </tr>
      <tr class="d-flex">
        <td class="col-2 ">3</td>
        <td class="col-2 ">6-7</td>
        <td class="col-8 ">Storage, testing, debugging, client-side frameworks, two-way data binding, Vue.js
        </td>
      </tr>
      <tr class="d-flex">
        <td class="col-2">4</td>
        <td class="col-2">8-10</td>
        <td class="col-8">JSON, progressive web apps (PWA), server-side, Node/Express, HTTP
        request/response, frameworks, patterns</td>
      </tr>
      <tr class="d-flex">
        <td class="col-2">5</td>
        <td class="col-2">11-12</td>
        <td class="col-8"> MVC, middleware, routing, data, models, services, sockets</td>
      </tr>
      <tr class="d-flex">
        <td class="col-2">6</td>
        <td class="col-2">13-14</td>
        <td class="col-8">  APIs, CRUD, controllers, views, view engines
        </td>
      </tr>
      <tr class="d-flex">
        <td class="col-2">7</td>
        <td class="col-2">15-17</td>
        <td class="col-8"> Demonstrations and peer review, final submission
        </td>
      </tr>
    </table>

    <h3>Schedule Subject to Change</h3>

    The schedule is subject to change with instructor notification and
    students will be responsible for abiding by these changes.

    <h3>Schedule Links</h3>

    <ul class="text-left">
      <li class="tap-target-li">
        <a target="_blank" rel="noopener" href="https://www.nwmissouri.edu/academics/calendar.htm">Academic
          Calendar</a>
      </li>
      <li class="tap-target-li">
        <a target="_blank" rel="noopener" href="https://www.nwmissouri.edu/registrar/finals.htm">Final Exams
          Schedule</a>
      </li>
      <li class="tap-target-li">
        <a target="_blank" rel="noopener" href="http://calendar.nwmissouri.edu/">University Events</a>
      </li>
    </ul>

    
    
    `;
  }
}

window.customElements.define('nw-syllabus-outline', nwSyllabusOutline);
