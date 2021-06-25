let users = [
    {
        name: "Ketaki",
        age: 23,
        city: "Mumbai",
        gender: "Female",
        zipcode: 34567,
        qualification: "Bachelors",
        company: {
            name: "Google",
            role: "Web Developer",
            salary: 7.5,
        },
    },
    {
        name: "Aaron",
        age: 27,
        city: "Aleppy",
        gender: "Male",
        zipcode: 87089,
        qualification: "Masters",
        company: {
            name: "Facebook",
            role: "System Engineer",
            salary: 12.7,
        },
    },
    {
        name: "Jitendra",
        age: 30,
        city: "New Delhi",
        gender: "Male",
        zipcode: 879879,
        qualification: "Bachelors",
        company: {
            name: "Cognizant",
            role: "Software Developer",
            salary: 11,
        },
    },
    {
        name: "Ibrahim",
        age: 22,
        city: "California",
        gender: "Male",
        zipcode: 867679,
        qualification: "Bachelors",
        company: {
            name: "Oracle",
            role: "Web Designer",
            salary: 9,
        },
    },
    {
        name: "Sireesha",
        age: 23,
        city: "Goa",
        gender: "Female",
        zipcode: 2432432,
        qualification: "Bachelors",
        company: {
            name: "TCS",
            role: "Web Developer",
            salary: 8,
        },
    },
    {
        name: "Saurabh",
        age: 34,
        city: "Mumbai",
        gender: "Male",
        zipcode: 878979,
        qualification: "PHD",
        company: {
            name: "Letsupgrade",
            role: "Trainer",
            salary: 4,
        },
    },
];

function renderUsers(users) {
    let rows = "";
    for (let i = 0; i < users.length; i++) {
        rows += `
        <tr>
        <td> ${users[i].name} </td>
        <td> ${users[i].age} </td>
        <td> ${users[i].city} </td>
        <td> ${users[i].gender} </td>
        <td> ${users[i].qualification} </td>
        <td> ${users[i].company.name} </td>
        <td> ${users[i].company.role} </td>
        <td> ${users[i].company.salary} </td>
        </tr>`;
    }
    document.getElementById("tbody").innerHTML = rows;
}
renderUsers(users);

let filters = {
    nameFilter: {
        status: false,
        value: "",
    },
    cityFilter: {
        status: false,
        value: "",
    },
    genderFilter: {
        status: false,
        value: "",
    },
    qualificationFilter: {
        status: false,
        value: "",
    },
    ageFilter: {
        status: false,
        value: "",
    },
    salFilter: {
        status: false,
        value: "",
    },
    roleFilter: {
        status: false,
        value: "",
    },
};

function filter(searchValue, filterName) {
    let usersDisplay = Object.create(users);
    if (searchValue !== "") {
        filters[filterName].status = true;
        filters[filterName].value = searchValue;
    } else {
        filters[filterName].status = false;
        filters[filterName].value = "";
    }

    if (filters.nameFilter.status === true) {
        usersDisplay = searchData(
            filters.nameFilter.value,
            usersDisplay,
            "name"
        );
    }

    if (filters.cityFilter.status === true) {
        usersDisplay = searchData(
            filters.cityFilter.value,
            usersDisplay,
            "city"
        );
    }

    if (filters.genderFilter.status === true) {
        usersDisplay = searchData(
            filters.genderFilter.value,
            usersDisplay,
            "gender"
        );
    }

    if (filters.qualificationFilter.status === true) {
        usersDisplay = searchData(
            filters.qualificationFilter.value,
            usersDisplay,
            "qualification"
        );
    }

    if (filters.ageFilter.status === true) {
        usersDisplay = sortAge(usersDisplay, filters.ageFilter.value);
    }

    if (filters.salFilter.status === true) {
        usersDisplay = sortSalary(usersDisplay, filters.salFilter.value);
    }

    if (filters.roleFilter.status === true) {
        usersDisplay = searchData(
            filters.roleFilter.value,
            usersDisplay,
            "company",
            "role"
        );
    }

    renderUsers(usersDisplay);
}

function searchData(searchValue, users, property1, property2) {
    filteredUsers = users.filter((user) => {
        if (property2) {
            return (
                user[property1][property2]
                    .toLowerCase()
                    .indexOf(searchValue.toLowerCase()) === 0
            );
        } else {
            return (
                user[property1]
                    .toLowerCase()
                    .indexOf(searchValue.toLowerCase()) === 0
            );
        }
    });
    return filteredUsers;
}

function clearFilter() {
    document.getElementById("name").value = "";
    document.getElementById("city").value = "";
    document.getElementById("gender").value = "";
    document.getElementById("qualification").value = "";

    for (const prop in filters) {
        filters[prop].status = false;
        filters[prop].value = "";
    }
    renderUsers(users);
}

function sortAge(data, way) {
    data.sort(function (a, b) {
        if (way === "asc") {
            return a.age - b.age;
        } else if (way === "dsc") {
            return b.age - a.age;
        }
    });

    return data;
}

function sortSalary(data, way) {
    data.sort(function (a, b) {
        if (way === "asc") {
            return a.company.salary - b.company.salary;
        } else if (way === "dsc") {
            return b.company.salary - a.company.salary;
        }
    });

    return data;
}
