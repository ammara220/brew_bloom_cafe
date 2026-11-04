

const feedbackForm = document.getElementById("feedback-form");

feedbackForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();

    const feedbackMessage = document.getElementById("feedback-message");
    const discountMessage = document.getElementById("discount-message");

    if (username !== "" && email !== "") {
        feedbackMessage.textContent =
            "Thank you for visiting, " + username +
            "! We will contact you at " + email + ".";

        feedbackMessage.style.color = "green";
    } else {
        feedbackMessage.textContent =
            "Please fill in your name and email.";

        feedbackMessage.style.color = "red";
    }

    
    const birthYearText = document.getElementById("birth-year").value.trim();
    const birthYear = parseInt(birthYearText, 10);
    const currentYear = 2026;
    const age = currentYear - birthYear;

    if (birthYearText === "" || isNaN(birthYear) ||
        !/^\d{4}$/.test(birthYearText) ||
        birthYear < 1900 || birthYear > currentYear) {

        discountMessage.textContent =
            "Please enter a valid birth year.";

        discountMessage.style.color = "red";

    } else if (age >= 60) {
        discountMessage.textContent =
            "You qualify for our senior discount!";

        discountMessage.style.color = "green";

    } else if (age >= 18 && age <= 25) {
        discountMessage.textContent =
            "You qualify for our student-age discount!";

        discountMessage.style.color = "green";

    } else {
        discountMessage.textContent =
            "Sorry, you do not qualify for these age-based discounts.";

        discountMessage.style.color = "red";
    }
});



const menuRows = document.querySelectorAll("#menu-table tbody tr");

menuRows.forEach(function (row) {
    row.addEventListener("mouseover", function () {
        row.style.backgroundColor = "#f3e3d3";
    });

    row.addEventListener("mouseout", function () {
        row.style.backgroundColor = "";
    });
});



const themeButton = document.getElementById("theme-button");

themeButton.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
});



const menuCheckboxes = document.querySelectorAll(".menu-check");
const totalDisplay = document.getElementById("total");

function calculateTotal() {
    let total = 0;

    menuCheckboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
            total += parseInt(checkbox.dataset.price, 10);
        }
    });

    totalDisplay.textContent = "Order Total: Rs. " + total;
}

menuCheckboxes.forEach(function (checkbox) {
    checkbox.addEventListener("change", calculateTotal);
});



const readMoreButton = document.getElementById("read-more-button");
const extraStory = document.getElementById("extra-story");

readMoreButton.addEventListener("click", function () {
    if (extraStory.hidden) {
        extraStory.hidden = false;
        readMoreButton.textContent = "Read Less";
    } else {
        extraStory.hidden = true;
        readMoreButton.textContent = "Read More";
    }
});




const filterButtons = document.querySelectorAll(".filter-button");

filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const selectedCategory = button.dataset.filter;

        menuRows.forEach(function (row) {
            const category = row.dataset.category;

            if (selectedCategory === "All" ||
                category === selectedCategory) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        });
    });
});




function updateOpeningStatus() {
    const now = new Date();
    const currentHour = now.getHours();
    const day = now.getDay();

    // Sunday: 9 AM to 9 PM
    // Monday-Thursday: 8 AM to 10 PM
    // Friday-Saturday: 8/9 AM to 11 PM
    let openingHour = 8;
    let closingHour = 22;

    if (day === 0) {
        openingHour = 9;
        closingHour = 21;
    } else if (day === 5) {
        openingHour = 8;
        closingHour = 23;
    } else if (day === 6) {
        openingHour = 9;
        closingHour = 23;
    }

    const status = document.getElementById("opening-status");

    if (currentHour >= openingHour && currentHour < closingHour) {
        status.textContent = "We are Open!";
        status.style.color = "green";
    } else {
        status.textContent = "Closed - Open at " +
            (openingHour === 9 ? "9 AM" : "8 AM");

        status.style.color = "red";
    }
}

updateOpeningStatus();




const specialNotes = document.getElementById("special-notes");
const characterCount = document.getElementById("character-count");

specialNotes.addEventListener("input", function () {
    const remaining = 100 - specialNotes.value.length;

    characterCount.textContent =
        remaining + " characters remaining";
});
