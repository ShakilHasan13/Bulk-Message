document.addEventListener("DOMContentLoaded", () => {
    const phoneNumberInput = document.getElementById("phoneNumber");
    const messageInput = document.getElementById("message");
    const sendButton = document.getElementById("send-button");

    sendButton.addEventListener("click", () => {
        const phoneNumber = phoneNumberInput.value;
        const message = messageInput.value;

        if (phoneNumber && message) {
            // You should replace these placeholders with your actual Twilio credentials
            const twilioAccountSID = "YOUR_ACCOUNT_SID";
            const twilioAuthToken = "YOUR_AUTH_TOKEN";

            // Use the Twilio API to send SMS
            fetch(`https://api.twilio.com/2010-04-01/Accounts/${twilioAccountSID}/Messages.json`, {
                method: "POST",
                headers: {
                    "Authorization": `Basic ${btoa(`${twilioAccountSID}:${twilioAuthToken}`)}`,
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    "To": phoneNumber,
                    "From": "YOUR_TWILIO_PHONE_NUMBER",
                    "Body": message,
                }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === "sent") {
                    alert("Message sent successfully!");
                    phoneNumberInput.value = "";
                    messageInput.value = "";
                } else {
                    alert("Failed to send message. Please check your Twilio settings.");
                }
            })
            .catch(error => {
                console.error("Error sending message:", error);
                alert("An error occurred. Please try again later.");
            });
        } else {
            alert("Please enter both phone number and message.");
        }
    });
});
