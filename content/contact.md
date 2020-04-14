---
title: Contact
#feature: contact.webp
#caption: "Sunset over the valley. Sedona, AZ."
summary: Contact Jan Stevens. Physics student, GNU / Linux, Python.
---

To get in touch, send an email to the address below, or connect via social media.

{{< email-svg >}} {{< param "brand.email" >}}

Social: [Twitter](https://twitter.com/jhaurawachsman), [Instagram](https://instagram.com/jhaurawachsman), [LinkedIn](https://www.linkedin.com/in/jhaurawachsman/), [Github](https://github.com/jhauraw)

## Have a question regarding an article or code project?

For articles (blog posts), please ask your question on [Twitter](https://twitter.com/jhaurawachsman), with the post link. For code projects, ask questions on [Stack Overflow](https://stackoverflow.com/users/1535514), and use [Github](https://github.com/jhauraw) to submit bugs, issues, or improvements. Sharing your feedback in this way allows others to benefit from our conversation.

<form name="contact" method="POST" data-netlify="true">
  <p>
    <label>Your Name: <input type="text" name="name" /></label>   
  </p>
  <p>
    <label>Your Email: <input type="email" name="email" /></label>
  </p>
  <p>
    <label>Your Role: <select name="role[]" multiple>
      <option value="leader">Leader</option>
      <option value="follower">Follower</option>
    </select></label>
  </p>
  <p>
    <label>Message: <textarea name="message"></textarea></label>
  </p>
  <p>
    <button type="submit">Send</button>
  </p>
</form>