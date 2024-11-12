import axios from "axios";

const sendReminderForCertificateUpload = () => {
  // Example of sending an email or notification to remind about certificate upload
  axios.post('https://your-notification-service.com/send', {
    message: "Reminder: Please upload your event participation certificate."
  })
  .then(response => {
    console.log("Reminder sent:", response.data);
  })
  .catch(error => {
    console.error("Error sending reminder:", error);
  });
};

export default sendReminderForCertificateUpload;
