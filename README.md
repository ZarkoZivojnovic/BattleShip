# BattleShip 

### You can see online demo version [Here.](https://zarkozivojnovic.github.io/BattleShip/)

At the start you can choose positions of your ships, if you want to generate random
positions you can use *"random position"* button, otherwise you can move or rotate ships individually.
For rotating press left mouse button and for moving use drag and drop technique.
When you are satisfied with the positions click on *"confirm position"* button and the battle has begun.
Shooting is alternating. Select the field when it's your turn and the field will be colored depending on
whether you hit the boat or not.

* *green: hit*
* *red: submerged*
* *gray: miss, but close*
* *light gray: miss*

There is three Javascript files. In the main.js are the listeners and functions for rendering on page. 
In tableSetup.js are methods for positioning of ships, wrotten with object literal notation.
And in the last JS file called hits.js is logic for shooting and checking whether the ship has been hit.