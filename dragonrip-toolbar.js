// ==UserScript==
// @name         Dragonrip Toolbar
// @namespace    http://tampermonkey.net/
// @version      1.0.11
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
        Items in the tool bar.
        Items created in 2 rows.
        The order and layout can be customized with empty slots (brackets []) or smaller spearator spaces (pipe |).
        Possible items: 
            - home, bank, prof, shop, combat, market, quests, events, dungeon
            - mining, smithing, jewels, fishing, hunter, herbs, cooking, crafting, alchemy, slayer, summoning, explo, woodwork, magic, beastmastery, slayer, explo, magic
            - | = separator space
            - [] = large spearator space

    */
    const toolbarItems = [
            'home', 'bank', 'prof','shop', 'combat', '|', 

            'mining', 'smithing',  'fishing',  'hunter', 'herbs', 'cooking', 
            'crafting', 'alchemy', 'woodwork', 'beastmastery', 'summoning', 'jewels', 
            
            '[]','market', 'quests', 'dungeon','events',

            '|','[]','[]','[]','[]','[]','[]','[]','[]','[]',
            'slayer', 'explo','magic',

    ]

    const settings = {
        removeVanillaNavbar: true, // Remove game's original navbar element
        smallerVanillaTopbars: true, // Make the player and game logo boxes smaller height
    }
    
    // Data for link items
    const data = {

        links: {
            'home': { 
                label:'Home',
                url:'https://dragonrip.com/game/play.php',
                icon:'https://i.imgur.com/Vn0ku7D.png'
            },
            'bank': {
                label:'Bank',
                url:'https://dragonrip.com/game/bank.php',
                icon:'/game/images/icons/bank.png'
            },
            'prof': { // Professions/skills
                label:'Skills',
                url:'https://dragonrip.com/game/prof.php',
                icon:'/game/images/icons/prof.png'
            },
            'shop': { // General store
                label:'Shop',
                url:'https://dragonrip.com/game/shop.php',
                icon:'/game/images/icons/shop.png'
            },
            'combat': { //Fighting fields
                label:'Combat',
                url:'https://dragonrip.com/game/fighting.php',
                icon:'/game/images/icons/kova.png'
            },
            'quests': { 
                label:'Quests',
                url:'https://dragonrip.com/game/quest.php',
                icon:'/game/images/icons/quest.png'
            },
            'market': { 
                label:'Market',
                url:'https://dragonrip.com/game/market.php',
                icon:'/game/images/icons/market.png'
            },
            'events': { 
                label:'Events',
                url:'https://dragonrip.com/game/event.php',
                icon:'/game/images/icons/events.png'
            },
            'dungeon': { 
                label:'Dungeon',
                url:'https://dragonrip.com/game/dungeon.php',
                icon:'/game/images/icons/dung.png'
            },

       
            'mining': {
                label:'Mining',
                url:'https://dragonrip.com/game/miningter.php',
                icon:'/game/images/bigicons/pick.png'
            },
            'smithing': {
                label:'Smith',
                url:'https://dragonrip.com/game/blacksm.php',
                icon:'/game/images/bigicons/anvil.png'
            },
            'fishing': {
                label:'Fish',
                url:'https://dragonrip.com/game/fish.php',
                icon:'/game/images/bigicons/fish.png'
            },
            'hunter': {
                label:'Hunter',
                url:'https://dragonrip.com/game/hunter.php',
                icon:'/game/images/bigicons/hunter.png'
            },
            'herbs': {
                label:'Herbs',
                url:'https://dragonrip.com/game/herbalism.php',
                icon:'/game/images/bigicons/herb.png'
            },
            'cooking': {
                label:'Cook',
                url:'https://dragonrip.com/game/cook.php',
                icon:'/game/images/bigicons/cook.png'
            },
            'crafting': {
                label:'Craft',
                url:'https://dragonrip.com/game/crafting.php',
                icon:'/game/images/bigicons/crafting.png'
            },
            'alchemy': {
                label:'Alch',
                url:'https://dragonrip.com/game/alchemy.php',
                icon:'/game/images/bigicons/poto.png'
            },
            'woodwork': {
                label:'Wood<br>work',
                url:'https://dragonrip.com/game/woodwork.php',
                icon:'/game/images/bigicons/wood.png'
            },

            'beastmastery': { 
                label:'Pets',
                url:'https://dragonrip.com/game/bmastery.php',
                icon:'/game/images/bigicons/petb.png'
            },
            'slayer': { 
                label:'Slayer',
                url:'https://dragonrip.com/game/slayer.php',
                icon:'/game/images/bigicons/slayme.png'
            },
            'summoning': { 
                label:'Summon',
                url:'https://dragonrip.com/game/summoning.php',
                icon:'/game/images/bigicons/sumo.png'
            },
            'explo': { 
                label:'Explore',
                url:'https://dragonrip.com/game/explo.php',
                icon:'/game/images/bigicons/explo.png'
            },
            'magic': { 
                label:'Magic',
                url:'https://dragonrip.com/game/magic.php',
                icon:'/game/images/bigicons/ench.png'
            },
            'jewels': { 
                label:'Jewels',
                url:'https://dragonrip.com/game/jewel.php',
                icon:'/game/images/bigicons/jewel.png'
            },
        }
    }


    const toolbarCss = `
        .dragonrip-toolbar-cont > * {
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            user-select:none;
        }

        .dragonrip-toolbar-cont {
            border-color: rgba(255,255,255,0.15);
            border-width:0px 1px;
            border-style:solid;
            width:100%;
            height:120px; 
            display:flex;
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
            xheight:100%;
        }

        .dragonrip-toolbar-separator-large {
            width: 50px;
            height:50px;
            xheight:100%;
            margin: 2px;
        }

        .dragonrip-toolbar-link-item {
            position:relative;
            width:50px;
            height:50x;
            aspect-ratio:1/1;
            margin: 2px;
            display:flex;
            align-items: end;
            justify-content: center;
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
            background-color:#0b0b2d;
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
            filter: drop-shadow(0px 0px 2px aqua) drop-shadow(0px 0px 1px rgba(255,255,255, 0.0));
        }

        .dragonrip-toolbar-link-item > .label {
            width:100%;
            padding:1px 0px 3px 0px;
            text-align:center;
            color:white;
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
            xborder:1px solid lime!important;
        }
        div.player > div.picture {
            width: 50px!important;
            height:50px!important;
            margin-right:30px!important;
        }
        div.player > div.picture > a > div.kovsd {
            xborder:1px solid lime!important;
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
            color:lime!important;
            color:#b133ff!important;
            font-family:consolas,monospace;
        }

        div.player > div.bar {
            padding-top:0px!important;
        }


        div.logo{
            xborder:1px solid lime!important;
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


    const setItemHighlight = () => {
        const currentUrl = document.location.href;
        log(currentUrl)

        const dataItemIds = Object.getOwnPropertyNames(data.links);

        for (let i=0; dataItemIds.length; i++) {
            const itemId = dataItemIds[i];
            const itemUrl = data.links[itemId].url;

            if (currentUrl.includes(itemUrl)) {
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
        const item = document.createElement('a');
        item.classList.add('dragonrip-toolbar-link-item');
        item.href = data.links[id].url;
        item.setAttribute('data-id', id);

        // Create image elem
        const imageCont = document.createElement('div');
        imageCont.classList.add('image-cont');
        const image = document.createElement('img');
        image.classList.add('image');
        image.src = data.links[id].icon;
        imageCont.append(image);

        // Create text label
        const label = document.createElement('div');
        label.classList.add('label');
        label.innerHTML = data.links[id].label;

        item.append(imageCont);
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
            }
        }, 5);
    }


    const setCustomCss = str => {
        const styleElem = document.createElement("style");
        styleElem.textContent = str;
        document.body.appendChild(styleElem);
    }



    setCustomCss(toolbarCss);

    if (settings.removeVanillaNavbar) { 
        setCustomCss(removeVanillaNavbarCss); 
    }

    if (settings.smallerVanillaTopbars) { 
        setCustomCss(smallerVanillaTopbarsCss); 
    }
    

    waitForElem();
})();
