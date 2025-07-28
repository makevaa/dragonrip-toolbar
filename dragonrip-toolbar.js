// ==UserScript==
// @name         Dragonrip Toolbar
// @namespace    http://tampermonkey.net/
// @version      1.0.22
// @description  Shortcut toolbar for Dragonrip.com
// @author       Kronos1
// @match         *://*.dragonrip.com/*
// @icon         https://i.imgur.com/Vn0ku7D.png
// @grant        none
// @license      GPLv3 
// ==/UserScript==

(() => {
    'use strict';
    /*  
    */
    const toolbarItems = [
            'home', 'bank', 'shop', 'market', 'combat', '[]', '|',  'mining', 'smithing', 'fishing', 'hunter', 'herbs', 'cooking', 'crafting', '[]','[]', 'raffles', 'pet_explo_end_and_start',
            'daily_quest', 'quests', 'dungeon','events', 'clan', 'ruins', '|', 'alchemy', 'woodwork', 'beastmastery', 'summoning', 'jewels', 'slayer', 'explo', 'magic', '[]', 'enter_raffles', 'pet_training_end_and_start'
    ]

    const settings = {
        removeVanillaNavbar: true, // Remove game's original navbar element
        smallerVanillaTopbars: true, // Make the player and game logo boxes smaller height

        pets: {
            slotToTrain: 1, // Which pet slot to train
            trainingToUse: 4, // Which training to use, eg. slot 2 is the 2nd training ("obedience")
            trainingImage: "/game/images/peti/2.png",
            startTrainingUrl:-1, // set automatically
    
            explorationTime:60, // 1-60 minutes
            explorationImage:'/game/images/peti/12.png',
        },

        // Enter daily/weekly/monthly raffles with a single button (with enough Gold Pieces in inv)
        raffles: {
            rafflesToEnter: [ 'daily1', 'daily2', 'daily3', 'daily4', 'weekly1' ],
            urls: {
                daily1:'https://dragonrip.com/game/raffle.php',
                daily2:'https://dragonrip.com/game/raffle.php?go=6',
                daily3:'https://dragonrip.com/game/raffle.php?go=7',
                daily4:'https://dragonrip.com/game/raffle.php?go=9',
                weekly1:'https://dragonrip.com/game/raffle.php?go=1',
            }
        }
    }


    
    // Data for link items
    const data = {
        links: {
            'pet_explo_end_and_start': { 
                label:'Re-explore', icon:'', runFunction:'restartExploration',
            },
            'pet_training_end_and_start': { 
                label:'Re-train', icon:'', runFunction:"restartTraining",
            },
            'enter_raffles': { 
                label:'Enter raffles', icon:'/game/images/itemaa/gembag.png', runFunction:"enterRaffles",
            },

            'home': { 
                label:'Home', url:'https://dragonrip.com/game/play.php', icon:'https://i.imgur.com/Vn0ku7D.png'
            },
            'bank': {
                label:'Bank', url:'https://dragonrip.com/game/bank.php', icon:'/game/images/icons/bank.png'
            },
            'prof': { // Professions/skills
                label:'Skills', url:'https://dragonrip.com/game/prof.php', icon:'/game/images/icons/prof.png'
            },
            'shop': { // General store
                label:'Shop', url:'https://dragonrip.com/game/shop.php', icon:'/game/images/icons/shop.png'
            },
            'combat': { //Fighting fields
                label:'Combat', url:'https://dragonrip.com/game/fighting.php', icon:'/game/images/icons/kova.png'
            },
            'quests': { 
                label:'Quests', url:'https://dragonrip.com/game/quest.php', icon:'/game/images/icons/quest.png'
            },
            'market': { 
                label:'Market', url:'https://dragonrip.com/game/market.php', icon:'/game/images/icons/market.png'
            },
            'events': { 
                label:'Events', url:'https://dragonrip.com/game/event.php', icon:'/game/images/icons/events.png'
            },
            'dungeon': { 
                label:'Dungeon', url:'https://dragonrip.com/game/dungeon.php', icon:'/game/images/icons/dung.png'
            },
            'clan': { 
                label:'Clan', url:'https://dragonrip.com/game/clan.php', icon:'/game/images/icons/clan.png'
            },
            'daily_quest': { 
                label:'Daily quest', url:'https://dragonrip.com/game/dquest.php', icon:'/game/images/imci/quest.png'
            },
            'ruins': { 
                label:'Ruins', url:'https://dragonrip.com/game/ruins.php', icon:'/game/images/icons/ruins.png'
            },
            'raffles': { 
                label:'Raffles', url:'https://dragonrip.com/game/mini.php', icon:'/game/images/itemaa/gembag.png'
            },
            'mining': {
                label:'Mining', url:'https://dragonrip.com/game/miningter.php', icon:'/game/images/bigicons/pick.png'
            },
            'smithing': {
                label:'Smith', url:'https://dragonrip.com/game/blacksm.php', icon:'/game/images/bigicons/anvil.png'
            },
            'fishing': {
                label:'Fish', url:'https://dragonrip.com/game/fish.php', icon:'/game/images/bigicons/fish.png'
            },
            'hunter': {
                label:'Hunter', url:'https://dragonrip.com/game/hunter.php', icon:'/game/images/bigicons/hunter.png'
            },
            'herbs': {
                label:'Herbs', url:'https://dragonrip.com/game/herbalism.php', icon:'/game/images/bigicons/herb.png'
            },
            'cooking': {
                label:'Cook', url:'https://dragonrip.com/game/cook.php', icon:'/game/images/bigicons/cook.png'
            },
            'crafting': {
                label:'Craft', url:'https://dragonrip.com/game/crafting.php', icon:'/game/images/bigicons/crafting.png'
            },
            'alchemy': {
                label:'Alch', url:'https://dragonrip.com/game/alchemy.php', icon:'/game/images/bigicons/poto.png'
            },
            'woodwork': {
                label:'Wood<br>work', url:'https://dragonrip.com/game/woodwork.php', icon:'/game/images/bigicons/wood.png'
            },
            'beastmastery': { 
                label:'Pets', url:'https://dragonrip.com/game/bmastery.php', icon:'/game/images/bigicons/petb.png'
            },
            'slayer': { 
                label:'Slayer', url:'https://dragonrip.com/game/slayer.php', icon:'/game/images/bigicons/slayme.png'
            },
            'summoning': { 
                label:'Summon', url:'https://dragonrip.com/game/summoning.php', icon:'/game/images/bigicons/sumo.png'
            },
            'explo': { 
                label:'Explore', url:'https://dragonrip.com/game/explo.php', icon:'/game/images/bigicons/explo.png'
            },
            'magic': { 
                label:'Magic', url:'https://dragonrip.com/game/magic.php', icon:'/game/images/bigicons/ench.png'
            },
            'jewels': { 
                label:'Jewels', url:'https://dragonrip.com/game/jewel.php', icon:'/game/images/bigicons/jewel.png'
            }
        }
    }


    const toolbarCss = `
        .dragonrip-toolbar-cont * {
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            user-select:none;
        }

        .dragonrip-toolbar-cont {
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            border-color: rgba(255,255,255,0.15);
            border-width:0px 1px;
            border-style:solid;
            width:100%;
            height:120px; 
            display:flex;
            xflex-direction:column;
            flex-wrap:wrap;
            align-items:center;
            justify-content:start;
            background-image: url('https://i.imgur.com/vjJ8ugC.jpeg');
            background-size:contain;
            padding:5px;
            box-shadow:
                inset 0px 0px 5px 3px rgba(0,0,0,0.99),
                inset 0px 0px 0px 1px rgba(255, 255, 255, 0.15) 
            ;
        }

        .dragonrip-toolbar-separator {
            width: 20px;
            height:20px;
        }

        .dragonrip-toolbar-separator-large {
            width: 50px;
            height:50px;
            margin: 2px;
        }

        .dragonrip-toolbar-link-item {
            position:relative;
            width:50px;
            height:50x;
            aspect-ratio:1/1;
            margin: 2px;
            display:flex;
            flex-direction:column;
            align-items: end;
            justify-content: space-between;
            cursor:pointer;
            border-style: solid;
            border-image-source: url('https://i.imgur.com/c7Oeu0F.png');
            border-image-slice: 70;
            border-image-width: 1em 1em;
            border-image-outset: 0;
            border-image-repeat: stretch;
            background-color:rgb(24, 24, 31);
            box-shadow: 2px 2px 2px 0px rgba(0,0,0,0.99);
            transition: background-color 0.05s, outline 0.05s, transform 0.05s;
            border-radius:2px;
        }

        .dragonrip-toolbar-link-item:hover {
            background-color: #0b0b2d;
            outline: 1px solid #00c867;
        }

        .dragonrip-toolbar-link-item.selected,
        .dragonrip-toolbar-link-item.selected:hover {
            background-color:#001f4d;
        }

        .dragonrip-toolbar-link-item:active {
            transform: translateY(3px);
        }

        .dragonrip-toolbar-link-item > .image-cont {
            position:absolute;
            width:100%;
            height:100%;
            padding:5px;
        }

        .dragonrip-toolbar-link-item > .image-cont > .image {
            height:70%;
            aspect-ratio:1/1;
            filter: drop-shadow(0px 0px 2px aqua) drop-shadow(0px 0px 3px rgba(0, 0 , 0, 0.0));
        }

        .dragonrip-toolbar-link-item > .image-cont > .image:after {
            xpositon:absolute;
            width:100%;
            height:100%;
            background-color:red;
        }

        .dragonrip-toolbar-link-item > .label {
            width:100%;
            padding:1px 0px 3px 0px;
            text-align:center;
            color: white;
            text-shadow: 
                0px 0px 3px black,
                0px 0px 3px black,
                0px 0px 3px black,
                0px 0px 3px black,
                0px 0px 3px black,
                0px 0px 3px black,
                0px 0px 3px black
            ;
            z-index:1;
            font-size:0.7em;
            font-family:consolas,monospace;
            line-height:0.8;
        }
         .dragonrip-toolbar-link-item > .action-label {
            width:100%;
            padding:1px 0px 3px 0px;
            text-align:center;
            color:lime;
            text-shadow: 
                0px 0px 3px black,
                0px 0px 3px black,
                0px 0px 3px black,
                0px 0px 3px black,
                0px 0px 3px black,
                0px 0px 3px black,
                0px 0px 3px black
            ;
            z-index:1;
            font-size:0.7em;
            font-family:consolas,monospace;
            line-height:0.8;
        }
    `;

    const removeVanillaNavbarCss = `
        ul.navbar {
            display:none;
        }
    `;

    const smallerVanillaTopbarsCss = `
        div.player {
            height:68px;
        }
        div.player > div.picture {
            width: 50px!important;
            height:50px!important;
            margin-right:30px!important;
        }
        div.player > div.picture > a > div.kovsd {
            background-size:contain!important;
            width: 50px!important;
            height:50px!important;
            max-height: 50px!important;
            min-height: 50px!important;
            display:flex;
            flex-direction:column;
            justify-content: end;
        }

        div.player > div.picture > a > div.kovsd > span.amoutina {
            width:100%!important;
            margin-top: 0px!important;
            color: lime!important;
            color:rgb(111, 111, 255)!important;
            font-family:consolas,monospace;
        }

        div.player > div.bar {
            padding-top:0px!important;
        }

        div.logo {
            height:68px;
            display:flex;
            align-items:center;
            justify-content:center;
        }

        div.logo > br {
            height:0px!important;
        }

        div.logo > img {
            height:80%;
        }
    `;

    const log = console.log;
    const error = console.error;

    // Set pet exploration and training urls in data based settings
    const setPetActionData = () => {
        const petTrainingStartUrl = `https://dragonrip.com/game/bmaster.php?go=10&sl=${settings.pets.slotToTrain}&tr=${settings.pets.trainingToUse}`;

        data.links["pet_training_end_and_start"].icon = settings.pets.trainingImage;
        data.links["pet_explo_end_and_start"].icon = settings.pets.explorationImage;

        settings.pets.startTrainingUrl = petTrainingStartUrl;
    }

    const setExplorationTime = () => {
        const fieldElem = document.querySelector('body > div.into > div > table:nth-child(7) > tbody > tr > td:nth-child(2) > form > table > tbody > tr > #market > input[type=number]');

        if (fieldElem !== undefined && fieldElem !== null) {
            fieldElem.value = settings.pets.explorationTime;
        }
    }

    // Send POST request with the training time to game server
    const startExploration = () => {
        fetch("https://dragonrip.com/game/explo.php?go=1", {
            method: "POST",
            body: `time=${settings.pets.explorationTime}`,
            headers: {
              "Content-type": "application/x-www-form-urlencoded",
              "Cookie": "PHPSESSID=e9c8092265e0016efff70fa80f043938",
            }
        }) 
        //.then((res) => log(res) )
        .then((res) => goToUrl(res.url) )
    }

    // Complete exploration, then start it again
    const restartExploration = () => {
        sendGetRequest('https://dragonrip.com/game/explo.php?go=4', startExploration);
    }

    // Complete training, then start it again
    const restartTraining = () => {
        sendGetRequest('https://dragonrip.com/game/bmaster.php', startTraining);
    }

    // Go to training url to start training
    const startTraining = () => {
        goToUrl(settings.pets.startTrainingUrl);
    }


    // Enter all raffles (based on data in settings)
    const enterRaffles = async () => {
        const raffleUrls = [];

        // Populate raffleUrls with data from settings
        for (const raffleName of settings.raffles.rafflesToEnter) {
            raffleUrls.push(settings.raffles.urls[raffleName]);
        }


        // Send GET requests for each raffle url to enter the raffles
        for (const url of raffleUrls) {
            await fetchUrl(url);
        }

        goToUrl('https://dragonrip.com/game/mini.php');
    }


    const goToUrl = url => {
        window.location.href = url;
    }


    // GET request with a callback function
    const sendGetRequest = (reqUrl, callback) => {
        const req = new XMLHttpRequest();
        const requestUrl = reqUrl;
        
        req.onreadystatechange = function() { 
            if (req.readyState == 4 && req.status == 200) {
                //processRequest(req.responseText);
                callback(); 
            }
        }
        req.open("GET", requestUrl, false); // true for asynchronous     
        req.send(null);      
    }


   const fetchUrl = async url => {
        try {
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error(`Response status: ${res.status}`);
            }

            //const json = await res.json();
            log(res);
        } catch (error) {
            error(error.message);
        }
    }



    const setItemHighlight = () => {
        const currentUrl = document.location.href;
        const dataItemIds = Object.getOwnPropertyNames(data.links);

        for (const itemId of dataItemIds) {
            const itemUrl = data.links[itemId].url;

            if (itemUrl !== undefined && currentUrl.includes(itemUrl)) {
                //Find item in HTML and add highlight class
                const domItems = document.querySelectorAll('.dragonrip-toolbar-cont > .dragonrip-toolbar-link-item');
                for (const domItem of domItems) {
                    const domItemId = domItem.getAttribute('data-id');
                    if (domItemId === itemId) {
                        domItem.classList.add('selected');
                    }
                }
            }
        }
    }
    

    const createToolbarItem = id => {
        // Toolbar items are link elements, create it
        const item = document.createElement('a');
        item.classList.add('dragonrip-toolbar-link-item');

        // Create action label element
        const actionLabel = document.createElement('div');
        actionLabel.classList.add('action-label');


        if (data.links[id].hasOwnProperty("runFunction")) {
            item.addEventListener("click", e => {
                eval(data.links[id].runFunction).call()
            }); 
            actionLabel.innerHTML ='Action';

        } else {
            item.href = data.links[id].url;
        }

  
        item.setAttribute('data-id', id);

        // Create image element
        const imageCont = document.createElement('div');
        imageCont.classList.add('image-cont');
        const image = document.createElement('img');
        image.classList.add('image');
        image.src = data.links[id].icon;
        imageCont.append(image);

        // Create text label element
        const label = document.createElement('div');
        label.classList.add('label');
        label.innerHTML = data.links[id].label;
        
        // Append image and text to link element
        item.append(imageCont);

        if (actionLabel !== undefined && actionLabel !== null) {
            item.append(actionLabel);
        }

        item.append(label);

        return item;
    }

    const createSeparatorElem = () => {
        const elem = document.createElement('div');
        elem.classList.add('dragonrip-toolbar-separator');
        return elem;
    }

    const createLargeSeparatorElem = () => {
        const elem = document.createElement('div');
        elem.classList.add('dragonrip-toolbar-separator-large');
        return elem;
    }
    
    const createToolbar = () => {
        // Create toolbar container element
        const toolbarCont = document.createElement('div');
        toolbarCont.classList.add('dragonrip-toolbar-cont');

        // Insert toolbar after the vanilla navbar
        const refNode = document.querySelector('body > ul.navbar');
        refNode.parentNode.insertBefore(toolbarCont, refNode.nextSibling);

        // Add link items based on the ordering specified in toolbarItems array
        for (const id of toolbarItems) {
            let item;

            if (id === '|') {
                item = createSeparatorElem();
            } else if (id === '[]') {
                item = createLargeSeparatorElem();
            } else {
                item = createToolbarItem(id)
            }

            toolbarCont.append(item);
        }
    }

    // Wait for game UI to load, then insert toolbar elem
    const waitForElem = () => {
        const checkElem = setInterval( () => {
            if (document.querySelector('ul.navbar') !== null) {
                clearInterval(checkElem); 
                createToolbar();
                setItemHighlight();
                setExplorationTime();
            }
        }, 5);
    }
    
    const setCustomCss = str => {
        const styleElem = document.createElement("style");
        styleElem.textContent = str;
        document.body.appendChild(styleElem);
    }


    setPetActionData();
    setCustomCss(toolbarCss);
    if (settings.removeVanillaNavbar) { setCustomCss(removeVanillaNavbarCss); }
    if (settings.smallerVanillaTopbars) { setCustomCss(smallerVanillaTopbarsCss); }
    
    waitForElem();
})();
