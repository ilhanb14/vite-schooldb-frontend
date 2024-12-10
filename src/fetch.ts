const url = "http://127.0.0.1:8000/api/";

export async function getCourses() {
    let response = await fetch(url + "courses");
    let result = await response.json();

    for (let course of result) {
        course.type = await getType(course.type_id);
    }
    return result;
}

export async function getCourse(id : number) {
    try {
        let response = await fetch(url + "courses/" + id);
        let result = await response.json();
        result.type = await getType(result.type_id);
        return result;
    } catch(e) {
        console.error("Error fetching course " + e);
    }
}

export async function addCourse(id : number, name : string, price : number, duration : number, start : Date, typeId : number) {
    let newCourse = {
        id: id,
        name: name,
        price: price,
        duration: duration,
        start: start.toJSON().slice(0, 19),
        type_id: typeId
    };

    await fetch(url + "courses", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCourse)
    }).catch(e => console.error(e));
}

export async function editCourse(id : number, name : string, price : number, duration : number, start : Date, typeId : number) {
    let newCourse = {
        name: name,
        price: price,
        duration: duration,
        start: start.toJSON().slice(0, 19),
        type_id: typeId
    };

    await fetch(url + "courses/" + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCourse)
    }).catch(e => console.error(e));
}

export async function deleteCourse(id : number) {
    await fetch(url + "courses/" + id, {
        method: 'DELETE'
    }).then(res => res.json())
    .then(json => json.message)
    .catch(e => console.error(e));
}

async function getType(id : number) {
    if (id) {
        let response = await fetch(url + "types/" + id);
        let result = await response.json();
        return result.name;
    }
    return null;
}