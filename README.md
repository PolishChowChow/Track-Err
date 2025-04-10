# Trakc-Err application 
## 1. Goal
My goal was to create an mobile application which can store records about machine, when did it stop on which condition and why/what's wrong with that
## 2. Concept
Contept is also simple: NodeJS with ExpressJS framework works for the backend. With prisma as an ORM and postgresql as a database. Everything finds it's own place in docker.

On the frontend I used react-native to make development fast and effective. 

## 3. Functionality
On the first login user is asked for otp code, which is sent on the phone number in order to verify if the user should be allowed to use the appplication.
If verification is passed user is granted with sortable by reference list of records. He can change the theme of the application to dark (for his preference).
He can switch tab to "creation" in order to create a new record.




