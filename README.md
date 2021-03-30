# members-only

How this works

You can sign up as a user, but you are not granted membership status, only by enterting a secret password will you be able to do this.
users have the ability to write messages Everyone can see messages that are created, but only people who are members can see the author.

There is also another level of admin which can be by entering another secret password, they can then delete messages. 

This secret page can be accessed by going to:

1. Memberlist When logged in
2. Select a Personal profile
3. add /adminrequest to the end of the desired url.
4. e.g. /members/user/60638c2e48a1745a914a6707/adminrequest
5. Enter the password and obtain the almight admin status

This allows you to delete messages.


The following tech stack is used for this:

Mongo DB for the backend a NoSQL database.
Backend: NodeJS & Express.
Frontend: HTML & CSS, EJS is used as a templating language

Important concepts tackled here:
- Authentication
- Data validation & Cleaning
- How to interact with databases
- CRUD functionality.
