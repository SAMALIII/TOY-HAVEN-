
// CONTACT PAGE //


const form = document.getElementById("feedbackForm");
const messageBox = document.getElementById("message");
const charCount = document.getElementById("charCount");


messageBox?.addEventListener("input", () => {
    const len = messageBox.value.length;
    charCount.textContent = `${len} / 500 characters`;
    charCount.style.color = len > 500 ? "#dc3545" : "#666";
});


const inputs = document.querySelectorAll("#name, #email, #subject, #message");
inputs.forEach(input => {
    input.addEventListener("input", () => {
        const draft = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            subject: document.getElementById("subject").value,
            message: document.getElementById("message").value
        };
        localStorage.setItem("feedbackDraft", JSON.stringify(draft));
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const draft = JSON.parse(localStorage.getItem("feedbackDraft"));
    if (draft) {
        document.getElementById("name").value = draft.name || "";
        document.getElementById("email").value = draft.email || "";
        document.getElementById("subject").value = draft.subject || "";
        document.getElementById("message").value = draft.message || "";
        if (messageBox) {
            charCount.textContent = `${messageBox.value.length} / 500 characters`;
        }
    }
});

//Submit//
form?.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !subject || !message) {
        showNotification("Please fill in all fields", true);
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        showNotification("Please enter a valid email", true);
        return;
    }

    if (message.length > 500) {
        showNotification("Message is too long (max 500 characters)", true);
        return;
    }

    const feedback = {
        id: Date.now(),
        name,
        email,
        subject,
        message,
        date: new Date().toLocaleString()
    };

    let list = JSON.parse(localStorage.getItem("feedbackList")) || [];
    list.push(feedback);
    localStorage.setItem("feedbackList", JSON.stringify(list));
    localStorage.removeItem("feedbackDraft");

    showNotification("Thank you! Your message has been sent.");
    form.reset();
    charCount.textContent = "0 / 500 characters";
});
