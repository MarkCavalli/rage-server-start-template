# Rage Server Start Template
This is RageMP start server template. It's using typescript (server-side and client-side), Vue.js for CEF and including simple log in/sign up system.


Thanks CocaColaBear for typescript types:

Server-side: https://github.com/CocaColaBear/types-ragemp-s

Client-side: https://github.com/CocaColaBear/types-ragemp-c



![Login screen](https://i.imgur.com/8TLX5O1.jpg)
![Loading screen](https://i.imgur.com/GuQMeYt.jpg)
![First Spawn](https://i.imgur.com/7l4KY5T.jpg)


# Installation:
1. Install Ragemp server.
2. Put all files in server-files directory.
3. Run `npm i` by cmd inside `server-files`, `server-files/app/server`, `server-files/app/client`, `server-files/app/cef`.
4. Server using MySQL as a database. So you have to import sql structure file in to your database. Import sql structure file `structure.sql` into it.      
5. Modify your account data inside `app/server/Options/` in files `sDB.ts` and `sNodemailer.ts`
6. Run `build-server.bat` file inside `server-files` directory with `server.exe`.
7. Now you can modify src code in `app` and test your server!