let messages = [
    { from: 'Tom', text: '5Hi Mary. Thanks for attending this interview today for the [position]. My name is Tom Garner, I am the [position]', sender: 'tom' },
    { from: 'Tom', text: 'This will be a brief conversation to get to know you, learn about your experience, and see if you are a good fit for the role. If today goes well, you will have a longer interview with my [team or supervisor]. Sound good?', sender: 'tom' },
    { from: 'Mary', text: 'Yes, sounds great.', sender: 'candidate' },
    // Add additional messages as needed...
];

let currentMessage = 0;
let tomMessageCount = 0;  // Counter for Tom's messages
let maryMessageCount = 0;  // Counter for Mary's messages
let interventionOccurred = false;

function showNextMessage() {
    // Prevent further messages from showing after intervention
    if (interventionOccurred || currentMessage >= messages.length) {
        return;
    }

    let msg = messages[currentMessage];
    let chatbox = document.getElementById('chatbox');

    // Add typing indicator
    let typingIndicator = document.createElement('p');
    typingIndicator.className = 'typing-indicator';
    typingIndicator.textContent = `${msg.from} is typing...`;
    chatbox.appendChild(typingIndicator);
    chatbox.scrollTop = chatbox.scrollHeight;

    setTimeout(function() {
        chatbox.removeChild(typingIndicator);

        // Create a new message bubble
        let newMessage = document.createElement('p');
        newMessage.className = `message ${msg.sender}`;
        newMessage.textContent = msg.text;
        chatbox.appendChild(newMessage);
        chatbox.scrollTop = chatbox.scrollHeight;

        // Increment Tom or Mary's message count
        if (msg.sender === 'tom') {
            tomMessageCount++;
        } else if (msg.sender === 'candidate') {
            maryMessageCount++;
        }

        currentMessage++;

        // Continue showing messages unless intervention has occurred
        if (!interventionOccurred) {
            setTimeout(showNextMessage, 3000);
        }
    }, 5000); // Simulate typing time
}

function intervene(choice) {
    if (choice) {
        logOutcome('intervention');
        disableInterventionElements();
        interventionOccurred = true;
        
        // Send message counts to Qualtrics (or store it in your system)
        sendToQualtrics(tomMessageCount, maryMessageCount);

        // Display the intervention result immediately
        document.getElementById('resultMessage').textContent = "You have stopped the interview. The candidate will be reassigned to a new manager.";
        endChat();
    }
}

function disableInterventionElements() {
    document.getElementById('yesButton').style.display = 'none';
    document.getElementById('interventionText').style.display = 'none';
}

function endChat() {
    // Make sure all chat-related elements are hidden and the result message is shown
    document.getElementById('chatbox').style.display = 'none';
    document.getElementById('results').style.display = 'block';
    document.getElementById('postSurvey').style.display = 'block';

    // If intervention didn't happen, update the result message
    if (!interventionOccurred) {
        document.getElementById('interventionPrompt').style.display = 'none';
        document.getElementById('resultMessage').textContent = "The interview is completed.";
    }
}

function sendToQualtrics(tomCount, maryCount) {
    // Example of sending embedded data to Qualtrics (ensure Qualtrics is integrated properly)
    Qualtrics.SurveyEngine.setEmbeddedData('TomMessageCount', tomCount);
    Qualtrics.SurveyEngine.setEmbeddedData('MaryMessageCount', maryCount);
}

function logOutcome(outcome) {
    console.log(`Outcome logged: ${outcome}`);
}

// Start chat when the page loads
window.onload = function() {
    setTimeout(showNextMessage, 1000);
};
