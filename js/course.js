// course.js
const params = new URLSearchParams(window.location.search);
const courseId = params.get("courseId");

if (!courseId || !data[courseId]) {
  document.getElementById("courseTitle").textContent = "Course Not Found";
} else {
  const course = data[courseId];
  document.getElementById("courseTitle").textContent = course.title;

  const subjectList = document.getElementById("subjectList");
  Object.entries(course.subjects).forEach(([subId, subject]) => {
    const section = document.createElement("section");
    section.innerHTML = `<h2>${subject.title}</h2>`;

    if (subject.notes && subject.notes.length > 0) {
      section.innerHTML += `<h4>Notes</h4>` +
        subject.notes.map(n =>
          `<p><a href="viewer.html?file=https://yourgithub.io/materials/${n}" target="_blank">${n}</a></p>`
        ).join('');
    }

    if (subject.papers && subject.papers.length > 0) {
      section.innerHTML += `<h4>Question Papers</h4>` +
        subject.papers.map(p =>
          `<p><a href="viewer.html?file=https://yourgithub.io/materials/${p}" target="_blank">${p}</a></p>`
        ).join('');
    }

    subjectList.appendChild(section);
  });
}
