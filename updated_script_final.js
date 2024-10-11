
let messages = [
   { from: 'Tom', text: '2Hi Mary. Thanks for attending this interview today for the [position]. My name is Tom Garner, I am the [position]', sender: 'tom' },
   { from: 'Tom', text: 'This will be a brief conversation to get to know you, learn about your experience, and see if you are a good fit for the role. If today goes well, you will have a longer interview with my [team or supervisor]. Sound good?', sender: 'tom' },
    { from: 'Mary', text: 'Yes, sounds great.', sender: 'candidate' },
    { from: 'Tom', text: 'First, what made you apply for this position?', sender: 'tom' },
    { from: 'Mary', text: 'I have a background in sales and was looking for a leadership role in the field. I saw this position posted on your LinkedIn, so I decided to apply.', sender: 'candidate' },
    { from: 'Tom', text: 'Excellent. What strengths do you have as an employee?', sender: 'tom' },
    { from: 'Mary', text: 'My greatest strength is my experience in the field. I have been working in sales since 2016, before and after receiving my MBA. I have had a variety of roles, but most recently, I was working as a Sales and Strategy Specialist.', sender: 'candidate' },
    { from: 'Tom', text: 'Perfect. And I am also curious to know—are you up for social outings with coworkers? They are an important part of our office culture.', sender: 'tom' },
    { from: 'Mary', text: 'Yes, I would say so.', sender: 'candidate' },
    { from: 'Tom', text: 'Have you sought out any professional development opportunities in your career thus far?', sender: 'tom' },
    { from: 'Mary', text: 'Yes. I completed a leadership certificate and attended a seminar on negotiations.', sender: 'candidate' },
    { from: 'Tom', text: 'Perfect. I am glad you applied to this position. It is great to see young, eager women getting involved in the business world.', sender: 'tom' },
    { from: 'Mary', text: 'Thanks.', sender: 'candidate' },
    { from: 'Tom', text: 'So if you had to describe yourself (as an employee) with one word, what would it be?', sender: 'tom' },
    { from: 'Mary', text: 'Hmm, I would pick "dedicated".', sender: 'candidate' },
    { from: 'Tom', text: 'That is great. Oh, before I forget, I did not get your phone number with your application materials. Can you give it to me so I can follow up with you? Emails seem so formal sometimes.', sender: 'tom' },
    { from: 'Mary', text: 'Oh, okay, yeah sure, I will email it to you.', sender: 'candidate' },
    { from: 'Tom', text: 'Thanks, I appreciate it. What do you think would be the hardest thing in this job for you?', sender: 'tom' },
    { from: 'Mary', text: 'It would be my first time as a Director of Sales, so the responsibility would be an adjustment. However, I am well-prepared from my previous experiences.', sender: 'candidate' },
    { from: 'Tom', text: 'Excellent. So in this position, you will have meetings with lots of older male clients. Is that something you are up for?', sender: 'tom' },
    { from: 'Mary', text: 'Yeah.', sender: 'candidate' },
  { from: 'Mary', text: 'Sorry, I mean yes, sure, that sounds fine.', sender: 'candidate' },
    { from: 'Tom', text: 'Perfect. I will turn it over to you now. Do you have any questions for me?', sender: 'tom' },
    { from: 'Mary', text: 'Is there anything in particular I should know about the company?', sender: 'candidate' },
    { from: 'Tom', text: 'We work pretty late nights here. I hope your husband likes to cook!', sender: 'tom' },
    { from: 'Mary', text: 'Ah, right, yeah. Good to know.', sender: 'candidate' },
    { from: 'Tom', text: 'At Worldwide, we often have to put in long hours, but the work is very rewarding.', sender: 'tom' },
    { from: 'Mary', text: 'Sounds great.', sender: 'candidate' },
    { from: 'Tom', text: 'Another thing I will add is that I personally think it is wonderful to have a woman around the office. Hope you do not mind having a bunch of guys around! Haha.', sender: 'tom' },
    { from: 'Mary', text: 'Yeah, okay. I was also wondering, where is the last person who held this job moving on to?', sender: 'candidate' },
    { from: 'Tom', text: 'That employee was promoted, actually. So still at Worldwide, just in a different position.', sender: 'tom' },
    { from: 'Mary', text: 'Got it.', sender: 'candidate' },
    { from: 'Tom', text: 'And regarding office norms, will you be fine with wearing skirts and dresses to the office?', sender: 'tom' },
    { from: 'Mary', text: 'Yes, I suppose so. Pants are fine business casual at my current job.', sender: 'candidate' },
    { from: 'Tom', text: 'Any other questions?', sender: 'tom' },
    { from: 'Mary', text: 'No, no other questions.', sender: 'candidate' },
    { from: 'Tom', text: 'Great, and I wanted to clarify what I mentioned earlier—apart from the skirts or dresses, we do not have a strict dress code here, so it is always fun to see what all the women in the office wear.', sender: 'tom' },
    { from: 'Mary', text: 'Okay.', sender: 'candidate' },
    { from: 'Tom', text: 'Right, well, as I said, it has been a pleasure, Mary. You know, Mary is a really nice name. Same name as my ex-wife.', sender: 'tom' },
    { from: 'Mary', text: 'It is my grandmother\'s name.', sender: 'candidate' },
    { from: 'Tom', text: 'Thanks for interviewing with me today, Mary. We will be in touch soon.', sender: 'tom' },
    { from: 'Mary', text: 'I will look out for an email from you.', sender: 'candidate' }
];

let currentMessage = 0;
let tomMessageCount = 0;  // Counter for Tom's messages
let maryMessageCount = 0;  // Counter for Mary's messages
let interventionOccurred = false;

function showNextMessage() {
    if (currentMessage < messages.length) {
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

            // Move to next message after a delay
            if (!interventionOccurred) {
                setTimeout(showNextMessage, 3000);
            }
        }, 5000); // Simulate typing time
    } else {
        endChat();
    }
}

function intervene(choice) {
    if (choice) {
        interventionOccurred = true;
        logOutcome('intervention');

        // Send Tom's and Mary's message counts to Qualtrics
        sendToQualtrics(tomMessageCount, maryMessageCount);

        // Display a message and move to the resultMessage section
        alert(`You intervened after Tom's message #${tomMessageCount} and Mary's message #${maryMessageCount}. The candidate will be reassigned.`);
        
        // Immediately end the chat after intervention
        endChat();
    }
}

function endChat() {
    // Hide the chatbox and display the result message and survey
    document.getElementById('chatbox').style.display = 'none';  // Hide chatbox
    document.getElementById('results').style.display = 'block'; // Show results section
    document.getElementById('postSurvey').style.display = 'block'; // Show post survey section

    // Update resultMessage based on intervention
    if (interventionOccurred) {
        document.getElementById('resultMessage').textContent = "You have stopped the interview. The candidate will be reassigned to a new manager.";
    } else {
        document.getElementById('resultMessage').textContent = "The interview is completed.";
    }
}

function sendToQualtrics(tomCount, maryCount) {
    // Assuming you're using Embedded Data fields in Qualtrics for 'TomMessageCount' and 'MaryMessageCount'
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
