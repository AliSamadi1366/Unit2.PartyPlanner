/**
 * @typedef Party
 * @property {number} id
 * @property {string} name
 * @property {string} description
 * @property {string} date
 * @property {string} location
 */

// === Constants ===
const BASE = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "/2412-ftb-er-web-am";
const RESOURCE = "/events";
const API = BASE + COHORT + RESOURCE;

// === State ===
let events = [
  {
    id: 1,
    name: "Fullstack Gala",
    description: "A night of celebration and networking",
    date: "2021-09-15T00:00:00.000Z",
    location: "Main Ballroom",
  },
];
let selectedEvent;
async function getEvents() {
  try {
    const response = await fetch(API);
    const result = await response.json();
    events = result.data;
    render();
  } catch (error) {
    console.error(error);
  }
}
async function getEvent(id) {
  try {
    try {
      const response = await fetch(API + "/" + id);
      const result = await response.json();
      selectedEvent = result.data;
      render();
    } catch (e) {
      console.error(e);
    }
  } catch (e) {
    console.error(e);
  }
}

//=== component ===
function detailParty(event) {
  const $li = document.createElement("li");
  $li.innerHTML = `
<a href="#selected">${event.name}</a>
`;
  $li.addEventListener("click", () => getEvent(event.id));
  return $li;
}

function listParties() {
  const $ul = document.createElement("ul");
  $ul.classList.add("lineup");

  const $events = events.map(detailParty);
  $ul.replaceChildren(...$events);

  return $ul;
}
function partyInformation() {
  if (!selectedEvent) {
    const $p = document.createElement("p");
    $p.textContent = "Please select an event to learn more.";
    return $p;
  }

  const $event = document.createElement("section");
  $event.classList.add("event");
  $event.innerHTML = `
    <h3>${selectedEvent.name} #${selectedEvent.id}</h3>
      <span>${selectedEvent.date}</span> 
      <span>${selectedEvent.location}</span>
      <p>${selectedEvent.description}</p>
  `;
  return $event;
}

// === Render ===
function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
    <h1>Party Planner</h1>
    <hr>
    <main>
      <section>
        <h2>Upcoming Parties</h2>
        <listParties></listparties>
      </section>
      <section id="selected">
        <h2>Party Details</h2>
        <partyInformation></partyInformation>
      </section>
    </main>
  `;
  $app.querySelector("listParties").replaceWith(listParties());
  $app.querySelector("partyInformation").replaceWith(partyInformation());
}

async function init() {
  await getEvents();
  render();
}

init();
