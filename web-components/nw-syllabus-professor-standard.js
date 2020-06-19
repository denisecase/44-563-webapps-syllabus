class nwSyllabusProfessorStandard extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
    <!-- Professor Standard  -->

    <h2>Course Expectations</h2>

    This course includes the development of unique, creative applications.
    Students should expect to spend at least 2-3 hours on out-of-class work
    for every one hour of instruction.

    <h2>Course Email</h2>

    <p>Professional email practices are required.</p>

    <ol>
      <li>
      <span class="highlight">Email must include course number and section (e.g.,
        <strong>${this.getAttribute(
          'emailSubject',
        )}</strong>) in the subject line.</span>
      </li>
      <li>
        Email should be professional, politely written, and use proper
        grammar, capitalization, and spelling.
      </li>
    </ol>

    <h2>Course Conduct Guidelines</h2>

    <ol>
      <li>
        Students will behave in a professional manner in all course
        interactions.
      </li>
      <li>
        Devices including cell phones, ear phones, gadgets, and other items
        should be silent and put away during class.
      </li>
      <li>
        Unauthorized use of devices during class may result in reduction in
        scores.
      </li>
      <li>Be ready to work when the class is scheduled to begin.</li>
      <li>
        Be polite and respectful to others in the class. Do not interrupt
        someone during a class discussion, and respect others'
        opinions/comments as you expect them to respect yours.
      </li>
    </ol>

    <h2>Course Citation Requirements</h2>

    <ol>
      <li>
        <span class="highlight"><strong>Cite ALL Sources</strong>. You must provide proper citation
        for any content including text, images, videos, and code
        that you did not personally develop.</span>
      </li>
      <li>Do not copy and paste content for any submissions.</li>
      <li>
        Failing to acknowledge assistance including internet photos,
        clipart, slide content, course files, shared solutions, etc. can be
        expected to result in a 0 on the assignment, a one-half letter grade
        reduction, a 0 in the course, and/or a failing the course with an
        academic integrity violation.
      </li>
    </ol>

    <h2>Course Late Work Policy</h2>

    Graded activities are expected to be completed by due date. If you must
    miss a due date, contact the instructor in advance or as early
    as possible. Due dates get you ready for coming material. Keeping up is
    critical. On rare occasions, special challenges or obligations may make
    it difficult to submit on time. You typically have a one-week grace
    period where the work may still be submitted and graded. Late penalties
    will be described in the rubric. <span class="highlight">
    No late submissions will be accepted for the final submission.</span>

    <h2>Course Submissions</h2>

    All submissions must be your own, creative, unique work. You may be
    asked to explain your work during class, in discussions, or in a
    recorded submission.

    <h2>Course Grading</h2>

    Grades will generally be posted within 2-7 days of the due date. If you
    wish to petition for additional points, please wait 24 hours. Petitions
    must be emailed, and must include the specific changes you are
    requesting, along with your reasoning on why the higher score is
    warranted. Challenges must be raised within seven days of the grade
    being posted; after seven days, grades are considered final.

    <h2>Course Access Ends - Save Your Content</h2>

    The course site will not be available after the end of the semester.
    Save the syllabus and any materials you wish to access after the course,
    you may need to submit this to a potential employer or another
    university in the future. We do not provide materials after completion
    of the course.

      `;
  }
}

window.customElements.define(
  'nw-syllabus-professor-standard',
  nwSyllabusProfessorStandard,
);
