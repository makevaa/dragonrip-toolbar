# Dragonrip Toolbar 
![Dragonrip toolbar compact preview](https://i.imgur.com/QMWcNTz.png "Dragonrip toolbar compact preview")


🐵 [Tampermonkey](https://www.tampermonkey.net/) user script to show a shortcut toolbar for the browser game [Dragonrip](https://dragonrip.com/).<br>Which items to show, their order, and layout can be edited manually in the JS file.

🍴 Available on GreasyFork: [greasyfork.org/en/scripts/532949-dragonrip-toolbar](https://greasyfork.org/en/scripts/532949-dragonrip-toolbar)
## 🛠 Customizing the toolbar
To change the toolbar contents, edit the <code>toolbarItems</code> global array. 
See the <code>toolbarItems</code> in the code to see how the keywords are used to create the toolbar.

### Keywords


#### Normal game links
- <code>home, bank, prof, shop, combat, market, quests, daily_quest, events, dungeon, clan, ruins</code>
- <code>mining, smithing, jewels, fishing, hunter, herbs, cooking, crafting, alchemy, slayer, summoning, explo, woodwork, magic, beastmastery</code>
  
#### Spacer and separator
- <code>[]</code> adds an empty square slot
- <code>|</code> adds a shorter separator space
  
#### Action buttons
Action buttons to streamline some cumbersome game actions. Settings for actions can be customized in the <code>settings</code> object.
- <code>pet_explo_end_and_start</code> button to complete and start pet exploration
    - <code>slotToTrain</code> set which pet slot to train
    - <code>trainingToUse</code> which training to use (eg. 2 is "Obedience" training)
    - <code>trainingImage</code> image for the button
- <code>pet_training_end_and_start</code>: button to complete and start pet training
  - <code>explorationTime</code> explore duration in minutes (1-60)
  - <code>explorationImage</code> image for the button  
- <code>enter_raffles</code> to enter all raffles defined in settings



## ⚙️ Other settings
Global object <code>settings</code> has 2 properties for minor layout tweaks:
- <code>removeVanillaNavbar</code>: remove the game's vanilla navbar element
- <code>smallerVanillaTopbars</code>: make the player info and game logo boxes more compact by reducing height






