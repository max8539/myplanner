// v0.1.0: Use localStorage for data
// v1.0.0: Use backend API with login system.

/**
 * Initialises local storagee if not done before.
 * Should be called when web app first starts.
 */
export function init () {
    if (!localStorage.getItem("cookiePolicy")) {
        localStorage.setItem("cookiePolicy", "false");
        localStorage.setItem("eventsJSON", "[]");
        localStorage.setItem("tasksJSON", "[]");
    }
}

/**
 * Checks if the cookie policy was agreed to before,
 * @returns {boolean} Cookie policy has beeen agreed to?
 */
export function checkCookiePolicy () {
    if (localStorage.getItem("cookiePolicy") == "true") return true;
    else return false;
}

/**
 * Marks the cookie policy as being agreed to.
 */
export function agreeCookiePolicy () {
    localStorage.setItem("cookiePolicy", "true");
}

function getEvents () {
    return JSON.parse(localStorage.getItem("eventsJSON"));
}

function getTasks () {
    return JSON.parse(localStorage.getItem("eventsJSON"));
}

function setEvents (events) {
    localStorage.setItem("eventsJSON", JSON.stringify(events));
}

function setTasks (tasks) {
    localStorage.setItem("tasksJSON", JSON.stringify(tasks));
}

function sortEventsArr (events) {
    events.sort((a, b) => a.time - b.time);
}

function sortTasksArr (tasks) {
    tasks.sort((a, b) => a.time - b.time);
}

function newEventId () {
    let valid = false;
    let eid;
    while (!valid) {
        valid = true;
        eid = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
        if (getEvents().find(e => e.id == eid)) valid = false;
    }
    return eid;
}

function newTaskId () {
    let valid = false;
    let tid;
    while (!valid) {
        valid = true;
        tid = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
        if (getEvents().find(t => t.id == tid)) valid = false;
    }
    return tid;
}

/**
 * Returns a summary of events, including their id, title and time.
 * @returns {Array.<object>} Summary of events
 */
export function getEventsSummary () {
    return getEvents().map((e) => {
        return {
            eid: e.id,
            title: e.title,
            time: e.time
        }
    });
}

/**
 * Returns a summary of tasks, including their id, title, time and done status.
 * @returns {Array.<object>} Summary of tasks
 */
export function getTasksSummary() {
    return getTasks().map((t) => {
        return {
            tid: t.id,
            title: t.title,
            time: t.time,
            done: t.done
        }
    });
}

/**
 * Returns all data associated with the given event.
 * @param {number} eid Event ID
 * @returns {object} Event data
 */
export function getEventById(eid) {
    return getEvents().find((e => e.id == eid));
}

/**
 * Returns all data assocuated with the given task.
 * @param {number} tid Task ID
 * @returns {object} Task data
 */
export function getTaskById(tid) {
    return getEvents().find((t => t.id == tid));
}

/**
 * Adds an event with the given data.
 * @param {object} edata Event data
 */
export function addEvent (edata) {
    let eid = newEventId();
    let events = getEvents();
    events.push({
        id: eid,
        description: edata.description,
        time: edata.time
    })
    sortEventsArr(events);
    setEvents(events);
}

/**
 * Adds a task with the given data.
 * @param {object} tdata Task data
 */
export function addTask (tdata) {
    let tid = newTaskId();
    let tasks = getTasks();
    tasks.push({
        id: tid,
        description: tdata.description,
        time: tdata.time,
        done: false
    })
}

/**
 * Modifies the given event to store the updated data.
 * @param {number} eid Event's ID
 * @param {object} edata New event's data
 */
export function editEvent (eid, edata) {
    let events = getEvents();
    for (e of events) {
        if (e.id == eid) {
            e.title = edata.title,
            e.description = edata.description,
            e.time = edata.time
        }
    }
    sortEventsArr(events);
    setEvents(events);
}

/**
 * Modifies the given task to store the updated data.
 * @param {number} tid Task's ID
 * @param {object} tdata New task's data
 */
export function editTask (tid, tdata) {
    let tasks = getTasks();
    for (t of tasks) {
        if (t.id == tid) {
            t.title = tdata.title;
            t.description = tdata.description;
            t.time = tdata.time;
        }
    }
    sortTasksArr(tasks);
    setTasks(tasks);
}

/**
 * Deletes the given event.
 * @param {number} eid Event's ID
 */
export function deleteEvent (eid) {
    setEvents(getEvents().filter(e => e.id != eid));
}

/**
 * Deletes the given task.
 * @param {number} tid Task's ID
 */
export function deleteTask (tid) {
    setTasks(getTasks().filter(t => t.id != tid));
}