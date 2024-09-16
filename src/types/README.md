# Why types are outside of services?

I'm trying to write all the business login inside of services folder by seperating them from UI.
Codes are placed inside of each service with it's own roles like state, config, action and so on. So with this convention, it's more natural to place types inside of services.
But then you might wonder why I seperate types from services. The purpose of this separation is related to code sharing between multiple projects. What if I create my own backend replacing current firebase db and want to share the types and schemas between frontend and backend? For this case in mind, I'm considering to transfer this project into monorepo setup. To ease that process, I seperate types from services.

```
/apps
    desktop
    mobile
    web
/libs
    client
    server
    shared
        ㄴtypes
```
