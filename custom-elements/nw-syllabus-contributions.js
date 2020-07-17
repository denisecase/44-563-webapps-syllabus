// import default object with a local camelCase name
import initContributions from '../init-contributions.js';

export default class nwSyllabusContributions extends HTMLElement {
  constructor() {
    super();

    // console.error('data - before : ', JSON.stringify(initContributions));

    const cleanDataObject = Object.fromEntries(
      Object.entries(initContributions).map(([k, v]) => [
        k.replace(/[^a-zA-Z0-9-, ]/g, ''),
        parseInt(v, 10),
      ]),
    );

    // console.error('data - after : ', JSON.stringify(cleanDataObject));

    this.innerHTML = `
    <br>
    <h2>Grading and Evaluation</h2>

    <div class="contribution-container">
     <div class="contribution-row">
      <div class="contribution-column">

      <p>Graded contributions</p>

      <table id="contributions-table" class="tg">
        <tr>
          <th>Category</th>
          <th>Contribution</th>
        </tr>
      </table>

    </div>

    <div class="contribution-column">

      <div id="contributions-chart"></div>

    </div></div></div>

    <br>
    `;

    Object.entries(cleanDataObject).forEach(([key, value]) => {
      const newTableRow = document.createElement('tr');

      const newKeyNode = document.createElement('td');
      newKeyNode.innerHTML = key;

      const newValueNode = document.createElement('td');
      newValueNode.innerHTML = `${value}%`;

      newTableRow.appendChild(newKeyNode);
      newTableRow.appendChild(newValueNode);

      this.querySelector('#contributions-table').appendChild(newTableRow);
    });

    // summation row
    const newTableRow = document.createElement('tr');
    const newKeyNode = document.createElement('td');
    newKeyNode.innerHTML = 'All';
    const newValueNode = document.createElement('td');
    newValueNode.innerHTML = `${Object.values(cleanDataObject).reduce(
      (sum, curr) => sum + curr,
    )}%`;
    newTableRow.appendChild(newKeyNode);
    newTableRow.appendChild(newValueNode);
    this.querySelector('#contributions-table').appendChild(newTableRow);

    // pie chart.........................................

    // Draw the chart and set the chart values
    function drawChart() {
      // Create the data table.
      const data = new google.visualization.DataTable();
      data.addColumn('string', 'Contribution');
      data.addColumn('number', 'Percent');

      Object.entries(cleanDataObject).forEach(([key, value]) => {
        const arr = [key, value];
        data.addRow(arr);
      });

      const options = {};

      // Display the chart inside the <div> element with id="piechart"
      const chart = new google.visualization.PieChart(
        document.querySelector('#contributions-chart'),
      );
      chart.draw(data, options);
    }

    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(drawChart);
  }
}

window.customElements.define(
  'nw-syllabus-contributions',
  nwSyllabusContributions,
);
