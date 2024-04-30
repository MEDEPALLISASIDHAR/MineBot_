document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("chatbot-form");
    const responsesDiv = document.getElementById("responses");

    // Fetch data from data.json
    fetch("/static/data.json")
        .then(response => response.json())
        .then(data => {
            form.addEventListener("submit", function (event) {
                event.preventDefault();
                const keyword = document.getElementById("keyword").value.trim();
                if (!keyword) {
                    alert("Please enter a keyword.");
                    return;
                }

                // Filter questions and get responses
                const filteredQuestions = data.questions.filter(q => q.toLowerCase().includes(keyword.toLowerCase()));
                if (filteredQuestions.length === 0) {
                    responsesDiv.innerHTML = "No questions found related to '" + keyword + "'";
                    return;
                }

                // Display the responses
                responsesDiv.innerHTML = filteredQuestions.map(q => data.answers[data.questions.indexOf(q)]).join("<br>");
            });
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
});
