SideBar
TODO: sidebar - start new conversation
TODO: sidebar - search
TODO: sidebar - all chats vs historic chats
TODO: sidebar - open/close using store & create header toggle sidebar button
TODO: ~~onclick sidebar message go to chats/username~~
TODO: ~~Highlight sidebarItem if at that URL~~

Auth
TODO: move login/signup to mainLayout?
TODO: login page - card too big on desktop
TODO: Authstore - scenarios/pre-populated "loading" state
TODO: Odd behaviour if two tabs open (both logged out) then both sign up - on second sign up new user created, but log in as first sign up user

Common
TODO: audit components - dumb components only (inc. events)
TODO: restructure app once dumbify is complete

db
TODO: never use db in vue files???

Stores
TODO: create messagesWithUsers store
TODO: conversation add button
TODO: search conversations
TODO: Only show users that have been messaged (low priority)
TODO: stores are for storing (and getting)!!! not fetching
TODO: API responseS stores???
TODO: store-driven scenarios
TODO: should currentsuserStore have a loading scenario?

Routes
TODO: block routes if not logged in

API
TODO: handle api errors
TODO: decide where is the most appropriate place to populate stores
TODO: clean up useCurrentPocketbaseUser - src/boot/initStores

Admin
TODO: email verification
TODO: admin UI

Microservices
TODO: sendMessage microservice - use JWT and admin, create "recent contact" table - change createMessage apiRule

Deploy
TODO: deploy app - linode

Rewrite
TODO: Next 13
