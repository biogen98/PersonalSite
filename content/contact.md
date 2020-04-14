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

### Contact form

<br>
<form class="form" name="contact" method="POST" data-netlify="true">
  <form action="/action_page.php">
  <div class="row">
    <div class="col-25">
      <label for="fname">First Name</label>
    </div>
    <div class="col-75">
      <input type="text" id="fname" name="firstname" placeholder="Your name..">
    </div>
  </div>
  <div class="row">
    <div class="col-25">
      <label for="lname">Last Name</label>
    </div>
    <div class="col-75">
      <input type="text" id="lname" name="lastname" placeholder="Your last name..">
    </div>
  </div>
  <div class="row">
    <div class="col-25">
      <label for="Message subject">Message subject</label>
    </div>
    <div class="col-75">
      <select id="country" name="country">
        <option value="Request">Request</option>
        <option value="Proposal">Proposal</option>
        <option value="Suggestion">Suggestion</option>
        <option value="Other">Other</option>
      </select>
    </div>
  </div>
  <div class="row">
    <div class="col-25">
      <label for="subject">Subject</label>
    </div>
    <div class="col-75">
      <textarea id="subject" name="subject" placeholder="Write something.." style="height:200px"></textarea>
    </div>
  </div>
  <div class="row">
    <button type="submit">Send</button>
  </div>
  </form>
</form>