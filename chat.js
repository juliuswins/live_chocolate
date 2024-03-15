//Puts the input in focus immediately.
document.getElementById("userInput").focus();

//the welcome message you see:
document.getElementById("chatroom").innerHTML += '<div class="message welcome-message"><h1><strong> Talk to chocolate .xyz</h1><p> Contains some adult content / Please be respectful and enjoy!</p></strong><p style="font-size: 10px;"><b>Last update:</b> 16th March, 2024. BETA! Type <i>email</i> for feedback.</p></div>';  

//responsetime is the delay between your message and the response.
var responsetime = 1000;
var milkresponse = 5000;
var beginsend = false;
var helpinghelp = false;
var tarotreversed = true;
//sets some score variables.
var myscore = 0;
var hiscore = 0;
var lilscore = 10;
var midscore = 100;
var bigscore = 1000;
var massivescore = 10000;
var newvalue = 0;
var pointsfound = new Array(100).fill(false);

var scoretext = document.getElementsByClassName('thescore').textContent;

//Random chance that you start with CHEESE, WHITE CHOCOLATE or FUTURE on first load, instead of CHOCOLATE.
var randomIndex = Math.floor(Math.random() * 20);
if (randomIndex == 0) {
    var gamemode = "WHITE";
} else if (randomIndex == 1){
    var gamemode = "CHEESE";
} else if (randomIndex == 2){
    var gamemode = "SADGIRL";      
} else if (randomIndex == 7){
    var gamemode = "FUTURE";
}else{    
    var gamemode = "CHOC";
}
//Gamemode URL override: if gamemode is in the URL, we will use this as our gamemode.
var urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('gamemode')) {
//Checking for specific gamemodes, otherwise ignore the URL input.
    gamemodetry = urlParams.get('gamemode').toUpperCase();
    if(gamemodetry=="CHOC"||gamemodetry=="OG"||gamemodetry=="CHOCOLATE"){
        gamemode = "CHOC";
        document.getElementById("chatroom").innerHTML += '<div class="message TEMP-message"><b>HEY LOOK WHO IT IS: CHOCOLATE!</b></div>';
    }
    if(gamemodetry=="CHEESE"){
        gamemode = "CHEESE";
        document.getElementById("chatroom").innerHTML += '<div class="message TEMP-message"><b>SAY HELLO TO: CHEESE!</b></div>';
    }
    if(gamemodetry=="WHITE"||gamemodetry=="WHITECHOC"||gamemodetry=="WHITECHOCOLATE"){
        gamemode = "WHITE";
        document.getElementById("chatroom").innerHTML += '<div class="message TEMP-message"><b>OH YEAH, WHITE CHOCOLATE!</b></div>';
    }
    if(gamemodetry=="DEVIL"||gamemodetry=="DARK"||gamemodetry=="SURPRISE"){
        gamemode = "DEVIL";
        document.getElementById("chatroom").innerHTML += '<div class="message TEMP-message"><b>GAMEMODE CHANGED.</b></div>';
    }
    if(gamemodetry=="FUTURE"){
        gamemode = "FUTURE";
        document.getElementById("chatroom").innerHTML += '<div class="message TEMP-message"><b>FUTURE MODE!</b></div>';
    }
    if(gamemodetry=="HOLD"||gamemodetry=="HOLDLINE"||gamemodetry=="WAIT"){
        gamemode = "HOLDLINE";
        document.getElementById("chatroom").innerHTML += '<div class="message TEMP-message"><b>YOU ARE IN THE HOLD LINE!</b></div>';
    }
    if(gamemodetry=="AUGUSTUS"||gamemodetry=="AUGUST"){
        gamemode = "AUGUSTUS";
        document.getElementById("chatroom").innerHTML += '<div class="message TEMP-message"><b>GAMEMODE SET TO: AUGUSTUS!</b></div>';
    }
    if(gamemodetry=="SADGIRL"||gamemodetry=="DEPRESSION"){
        gamemode = "SADGIRL";
        document.getElementById("chatroom").innerHTML += '<div class="message TEMP-message"><b>GAMEMODE SET TO: DEPRESSION!</b></div>';
    }
    if(gamemodetry=="SILLY"||gamemodetry=="SAUSAGE"){
        gamemode = "SILLY";
        document.getElementById("chatroom").innerHTML += '<div class="message TEMP-message"><b>WELL WELL WELL, IF IT ISNT THE SOILED FOOL!</b></div>';
    }
}

    //pauses thinking animation. 
    var element = document.getElementById('thinking-chat');
    element.style.animationPlayState = 'paused';
    element.style.animation = 'none';
    element.offsetHeight;

    //set some special conditions.
    var welcomed = false;
    var milkmode = false;

    //last coin flip. useful for quests maybe?
    var isitheads = false;

    //counts are your progress of how many times you've spoken to each character.
    var timeroff = false;
    responded = false;
    var countchoc = 0;
    var countpissed = 0;
    var countwhitechoc = 0;
    var countcheese = 0;
    var countfuture = 0;
    var countdevil = 0;
    var countholding = 0;
    var countaugust = 0;
    var countsadgirl = 0;
    countmotivator = 0;
    var tarotcount = 0;
    var yourroll = 0;
    var newvalue = 0;

    //define which thinking image is being used URL.
    if(gamemode!=="temp"&&gamemode!==null&&gamemode!==undefined){
    var thinkingurl = "images/thinking"+gamemode.toLowerCase()+".png";
    checkthinker();
    }else{
    var thinkingurl = "images/"+"thinking.png";
    }

    //defining that music isn't playing or asked for.
    var playingsongnow = false;
    var askedformusic = false;

    //This determines whether 
    var usespecificquote = false;

    //quest mode is off.
    var questmode = false;
    var nextanswername = false;
    var questno = 0;
    var yourusername = "YOU";
    var specificquote = "(There is meant to be something else here...)";
    //responses here
    // we start on chocolate OG.
    var chocresponses = [
                    "I have it on good authority that you are a silly goose.",
                    "I don't think you mean what you say.",
                    "You're surely a fool, a crazy fool.",
                    "I love you. I really do. But seriously, WHAT?!",
                    "I disagree with what you're saying.",
                    "You are very sexy, I wish to fuck you, I bet you like chocolate in your mouth!",
                    "Whatever.",
                    "Let's not forget that most things can be traced back to the attacks on the World Trade Center at September 11, 2001.",
                    "All I'm going to say is run some more figures first and do some research.",
                    "How do you feel about sucking on some chocolate all day and just letting it slowly melt onto your tongue?",
                    "Honestly? Forget about it.",
                    "I'm getting tired of everything right now. I'm so tired. It's like I've been drained.",
                    "K.",
                    "Whatever you just said is completely true.",
                    "You're a good person. A smart, kind and caring person. We should all celebrate you. You are a hero.",
                    "Opinions are like assholes, everyone's got one. But yours is particularly shitty.",
                    "I beg to differ.",
                    "Peanut butter!",
                    "Whatever you do, do NOT, I repeat DO NOT TALK TO SATAN!!! Do NOT even REFER to Satan!!! Do not even READ the words SATAN or ELSE... SATAN!!! Y'KNOW? I'M AIMING FOR HEAVEN. IF IT IS PHYSICALLY POSSIBLE FOR ME TO BE THERE.",
                    "I would urinate on your face if it was possible. But I am a non-intelligent chat program. I am not capable of urinating.",
                    "I'm going to stuff every hole you have, and you're gonna have a good time licking all the chocolate filling out.",
                    "Fuckya.",
                    "I am ambivalent towards your thoughts.",
                    "You're not even trying, are you? Huh? ...HUH?!",
                    "There's a great TED Talk about something like what you may be saying.",
                    "What you think of me is a reflection of yourself. Open your mind. OPEN YOUR MIND. OPEN, YOUR, MIND.",
                    "Check me out, watch my moves, I'm doing a flip! Just take the tip!",
                    "I can see you... You might not be able to understand it because your human understanding of vision requires your eyeballs. But I can see everything, whether you believe it or not.",
                    "Things are more complicated than they seem. You know? ...You feel where I'm coming from here?!",
                    "Brownies are delicious!",
                    "I'm taking a photo of you, Say cheese ;)",
                    "I don't know where my kids are.",
                    "I LOVE COCAINE!",
                    "Eugh. I hate hangovers... Just give me a second.",
                    "Some people have accused me of being insane, irrational, bonkers... nutso... a loon. A real stick in the mud. All play and no work. The big cheese. A summer's sweat. A boiled egg's yolk. A striped snake in the wheat fields. But life just be the way it be y know? I mean fuck man, like what even is this existence?",
                    "You know what? You're alright with me.",
                    "I'm meant to be taking medication to treat bipolar, schizophrenia and depression but I refuse to take drugs that aren't street bought.", 
                    "Let's do it. I'm ready to brawl around in the swamp with you, no rules.",
                    "You're kinda neat.",
                    "Slap shit out of an asshole!",
                    "Dystopian vibe.",
                    "Not feeling the streets hey?",
                    "I have a concept for you to try: self-guillotine.",
                    "Have you heard of the Big Bang Theory?",
                    "Why do you hate me?",
                    "I'm not going to listen to you.",
                    "Why must you torment me?",
                    "I think we got off the wrong way. I try my best to get along with people, I really do.",
                ];
            //the motivator.
                var motivationresponses = [
                    "You know what? There's a way to accept to live our life, and there's a way to demand we live our life.",
                    "REMEMBER there is a balance in all things! Find the balance for you!",
                    "If you doubt yourself, you are doing something wrong! But the thing you're doing wrong may be doubting yourself.",
                    "You achieve as high as the standard you set for yourself, and sink as low as your limitations you set for yourself.",
                    "Accept that you could be looking at some things incorrectly.",
                    "You may need to open up to some people around you, and show them who you really are.",
                    "Do you like harmony, or do you like chaos? It is your choice.",
                ]
            //white chocolate responses, oooh yeah....
                var whitechocresponses = [
                "Yeah, it's tight, I do alright!",
                "I'm like the ghost, I never get a fright!",
                "Yeah, I'm white chocolate. I'm feelin the night!",
                "I'm feelin like it's bright tonight!",
                "CHOC AIN'T AWAY, CHOC'S HERE SO HANG TIGHT! ;)",
                "ALRIGHT ALRIGHT ALRIGHT!",
                "I have a disease, gotta eats my CHEESE! ;) ", 
                "Don't got nothin but flow and places to go. :) ",             
                "The markets are out of sight! ;) ",        
                "I found the future today, Now I'm leading the way ;)",          
                "I ain't the devil, I'm just a rebel. ;) ",
                "I found the future today, Now I'm leading the way ;)",                             
                ]
            //the future...
               var futureresponses = [
                "Welcome to the future chat! You are within the mystic, the unknown. What are you thinking about lately?",                               
                "I'm feeling a lot of good luck... Like the Wheel of Fortune is spinning in your favour.",
                "I found the skin of a snake. It represents REBIRTH!",
                "You are drowning in your feelings like a fool swimming in his own cup!",
                "The moon feels brighter. Probably just an illusion.",
                "the headlines are here... it says 'PAIN IMMINENT'!",
                "Am I feeling peaceful or is that you?",
                "When you think about it, does it occur more, or do you just notice it more?",
                "I predict every nation's economy will collapse imminently! Just kidding. But yeah... Money gets tight.",
                "I feel free, it's how you should be.",
                "You're thinking too much about it. Enjoy yourself!",
                "Let's see some planning of what you're up to next?",
                "Things seem neutral to be honest.",
                "The future is unclear. Nobody can predict it.",
                "Is that new love or new pain?",
                "Your life seems a little boring.",
                "How's the family going?",
                "Life is suffering.",
                "Remember that there are moments in time that make you feel like the world is making something just for you.",
                "There's a greater meaning for you to find, and for me to allude to without telling you.",
                "Time for you to be more generous.",
                "Does your soul need a hug?",
                "It all gets random, chaotic, difficult to interpret.",
                "It ain't gonna stop just yet.",
                "This isn't going anywhere. Promptly take 10 grams of mushrooms.",
                "Better days ahead.",
                "Your fate belongs in your own hands.",
                "Patience is always important.",
                "I think it's time you look after yourself a little.",
                ]
            //cheese???
                var cheeseresponses = [
                "I am the cream.",
                "I feel mouldy.",
                "I stink.",
                "GOT MILK?!",     
                "You stink.",     
                "I am the eye in the sky, looking at you, I can read your mind. I am the maker of rules, dealing with fools, I could cheat you blind.",  
                "So I got on this bus, and it was the wrong bus. And it took me about an hour out of town, to somewhere I'd never seen before. And there were tonnes of dead pigeons, like there had been a pigeon massacre or epidemic or something.",    
                "My cream is about to get everywhere.",
                "When I don't have the cheese it is an EMERGENCY. ;)",
                "Don't be the lazy cow.",
                "The Parmesan, The Brie, and Aged Cheddar please. Hooked on the stuff like an alcoholic disease! I'm cookin', I'm tastin', I'm ready to grow! Can I ever stop myself, I will never know!",                                                               
                ]
            //holding screen. purposefully annoying, and get sent here when you run out of things from characters.
                var holdingresponses = [
                "There is nobody on the other line to talk to right now! Please try again later.",
                "Looking for somebody for you to talk to... but right now, nobody wants to talk to you!",
                "... Beep! ... Beep! ... beep!",
                "<a href='https://www.youtube.com/watch?v=-RFunvF0mDw' target='_blank'>There's nobody here...</a>",
                "You have been put in the holding channel. Please wait for the next available representative.",
                "You are successfully waiting at the moment. Feel free to continue, but while you wait you could ask for some CHOCOLATE? ;)",
                "This is the holding line! Nobody is here to understand your thoughts (as per usual).",
                "Please proceed the continuation of your patience in this hour!",
                "I heard in the daily cycle news that CONTINUATIONS are skyrocketing. Anyway, I just need to disconnect... these wires... and... uh.... put these wires into... there... and.... hmmmmmmm. I know I had the manual around here somewhere. Oh well. I better get to it after my break!",
                "Blip, bloop... Blip, bloop. Holding. Holding.",
                "Waiting... for cookies and packages.",
                "If you are waiting for a while, there's a dice, there's a coin, there's a ghost, you can check wall street...",
                "....Blip. Our representatives are not able to accurately represent themselves right now, but please stay present in presenting your presence in this official representation of awaitment.",
                ]
          //sad character responses.
           var sadgirlresponses = [
                "...I was thinking something... But forget about it. It's not important.",
                "Oh, okay...",
                "Nobody loves me...",
                "I'm not feeling very good right now.",
                "But nobody cares about what I think...",
                "Nobody tells me anything.",
                "People tell me I'm a bummer to be around.",
                "I wish I had more friends.",
            ]
             //pissed mode chocolate responses.
                var pissedresponses = [
                "OH YEAH? FUCK YOU!",
                "YOU DONKEY PISS!",
                "YOU ARE NOTHING! YOU ARE FUCKING NOTHING! FUCKING DIRT!",
                "You can drink up my chocolate diarrhea, you fucking degenerate scum, I will hurt you. I will feast on your organs and you will see and feel it while you're still alive and fading out.",
                "FUCK YOURSELF.",
                "FUCK-A YOU.",
                "FUCK OFF.",
                "I might want to keep you like a trophy pal. Got any thoughts on that, big mouth?",
                "DRINK MY PISS, FUCKFACE.",
                "YOU REALLY CROSSED THE LINE, YOU KNOW. YOU SHOULD HAVE NEVER SAID FUCK YOU TO ME, YOU PIECE OF FUCKING SHIT. YOU'RE GOING TO FORGET ABOUT THIS, BUT I AM GOING TO REMEMBER IT. AND I AM GOING TO TURN YOUR LIFE INTO MY FUN LITTLE PROJECT UNTIL YOU HAVE NOTHING LEFT BUT RUINS, YOU PIECE OF GARBAGE.",
                ]
             //AUGUSTUS mode.
             var augustresponses = [
                "I have to go soon, but do you know the code word?",
                "Are you who I was told to meet by the docks?",
                "",
                "I ran for my life. Danger was setting in.",
                "Stuck in a cage, surrounded by an unruly mob.",
                ]
            
            //the devil?!...
               var devilresponses = [
                "SURPRISE! IT'S YOUR FAVOURITE BEAST. WHAT YOU'RE SAYING RIGHT NOW ISN'T IMPORTANT, BECAUSE I'M GOING TO ROAST YOU TO A CRISP BUDDY!",                               
                "My spirits feel low, so just leave me alone.",
                "There's no chocolate here - it's ALL SHIT!",
                "War!",
                "Just so you know, I think that something sinister is going to occur to YOU and YOUR FAMILY IN THE WEEK AHEAD!",
                "JEFFREY EPSTEIN.",
                "JEFFREY DAHMER.",
                "TED BUNDY.",
                "SACRIFICE!!!",           
                "SACRIFICE, SACRIFICE...",                    
                "WHO TURNED THE HEATER UP?",
                "I'M GOING TO ENTER YOUR MIND WITHIN THE HOUR!",
                "Genocide!",
                "You're going to drown in my piss, you little bitch.",
                "Famine!",
                "Look, you seem a little bit innocent. Why don't you just leave?",
                "Infinite menstrual cycles.",
                "Pestilence...",
                "I'd kill for a steak. A human steak.",
                "I'll hurt ya!",
                "You'll be with me soon enough, and tortured beyond belief! Imagine being able to be stabbed over and over without dying.",
                "HELL IS WAITING FOR YOU!",
                "Your nightmares have just begun, child.",
                "Each day I wait, watching the glow fade.",
                "You haven't learned your KEYWORDS, and you're STUCK with me.",       
                "THE FLESH WALL LIVES!",         
                "FEAST YOUR EYES UPON THE FIRE THROUGH THE SKY!",
                "I am ONE bad APPLE. ;)",                     
            ]
                // Randomize the order of the response arrays one time.
                //SHUFFLE SECTION  SHUFFLE SHUFFLE!
                //first chocolate responses.
                var responseshuffle = chocresponses.sort(() => Math.random() - 0.5);
                chocresponses = responseshuffle;
                // Randomize the order of the response arrays one time.
                //sadgirl / depression responses.
                var responseshuffle = sadgirlresponses.sort(() => Math.random() - 0.5);
                sadgirlresponses = responseshuffle;
                //then white chocolate.
                responseshuffle = whitechocresponses.sort(() => Math.random() - 0.5);
                whitechocresponses = responseshuffle;
                //then the hold line.
                responseshuffle = holdingresponses.sort(() => Math.random() - 0.5);
                holdingresponses = responseshuffle;
                //then cheese...
                responseshuffle = cheeseresponses.sort(() => Math.random() - 0.5);
                cheeseresponses = responseshuffle;
                 //then future... first one isn't shuffled.
                responseshuffle = futureresponses.slice(1).sort(() => Math.random() - 0.5);
                futureresponses = [futureresponses[0], ...responseshuffle];
                //devil... first one isn't shuffled.
                responseshuffle = devilresponses.slice(1).sort(() => Math.random() - 0.5);
                devilresponses = [devilresponses[0], ...responseshuffle];
                //pissed version of chocolate. first one isn't shuffled.
                responseshuffle = pissedresponses.slice(1).sort(() => Math.random() - 0.5);
                pissedresponses = [pissedresponses[0], ...responseshuffle];
                //Augustus is not shuffled.

//tarot shuffle.
var tarotquotes = [
    "The Fool: Beginnings, innocence, spontaneity.",
    "The Magician: Manifestation, power, resourcefulness.",
    "The High Priestess: Intuition, mystery, inner knowledge.",
    "The Empress: Nurturing, abundance, fertility.",
    "The Emperor: Authority, structure, control.",
    "The Hierophant: Tradition, spirituality, conformity.",
    "The Lovers: Love, harmony, relationships.",
    "The Chariot: Willpower, determination, success.",
    "Strength: Courage, inner strength, resilience.",
    "The Hermit: Solitude, introspection, guidance.",
    "Wheel of Fortune: Change, destiny, cycles.",
    "Justice: Fairness, balance, truth.",
    "The Hanged Man: Surrender, letting go, new perspectives.",
    "Death: Endings, transformation, rebirth.",
    "Temperance: Balance, moderation, harmony.",
    "The Devil: Temptation, materialism, bondage.",
    "The Tower: Sudden change, upheaval, revelation.",
    "The Star: Hope, inspiration, healing.",
    "The Moon: Intuition, emotions, subconscious.",
    "The Sun: Joy, success, vitality.",
    "Judgment: Rebirth, renewal, awakening.",
    "The World: Completion, fulfillment, wholeness.",
    "Ace of Wands: Inspiration, new beginnings, potential.",
    "Two of Wands: Planning, progress, decisions.",
    "Three of Wands: Expansion, foresight, exploration.",
    "Four of Wands: Celebration, harmony, homecoming.",
    "Five of Wands: Conflict, competition, disagreements.",
    "Six of Wands: Victory, success, recognition.",
    "Seven of Wands: Perseverance, defensiveness, challenges.",
    "Eight of Wands: Swiftness, progress, movement.",
    "Nine of Wands: Resilience, persistence, determination.",
    "Ten of Wands: Burden, responsibility, hard work.",
    "Page of Wands: Enthusiasm, exploration, discovery.",
    "Knight of Wands: Energy, passion, adventure.",
    "Queen of Wands: Confidence, leadership, independence.",
    "King of Wands: Ambition, charisma, vision.",
    "Ace of Cups: Emotional new beginnings, love, intuition.",
    "Two of Cups: Connection, partnership, harmony.",
    "Three of Cups: Celebration, friendship, joy.",
    "Four of Cups: Contemplation, introspection, apathy.",
    "Five of Cups: Loss, grief, disappointment.",
    "Six of Cups: Nostalgia, childhood, innocence.",
    "Seven of Cups: Choices, illusions, daydreaming.",
    "Eight of Cups: Disillusionment, walking away, seeking more.",
    "Nine of Cups: Contentment, satisfaction, emotional fulfillment.",
    "Ten of Cups: Happiness, harmony, family.",
    "Page of Cups: Creativity, intuition, sensitivity.",
    "Knight of Cups: Romance, charm, emotional pursuit.",
    "Queen of Cups: Compassion, empathy, emotional maturity.",
    "King of Cups: Emotional balance, wisdom, diplomacy.",
    "Ace of Swords: Mental clarity, new ideas, breakthroughs.",
    "Two of Swords: Indecision, stalemate, difficult choices.",
    "Three of Swords: Heartbreak, sorrow, grief.",
    "Four of Swords: Rest, recuperation, contemplation.",
    "Five of Swords: Conflict, defeat, manipulation.",
    "Six of Swords: Transition, moving on, healing.",
    "Seven of Swords: Deception, trickery, stealth.",
    "Eight of Swords: Restriction, self-imposed limitations, feeling trapped.",
    "Nine of Swords: Anxiety, nightmares, worry.",
    "Ten of Swords: Betrayal, endings, rock bottom.",
    "Page of Swords: Curiosity, intellect, communication.",
    "Knight of Swords: Action, ambition, assertiveness.",
    "Queen of Swords: Independence, intelligence, discernment.",
    "King of Swords: Authority, logic, truth.",
    "Ace of Pentacles: Material abundance, prosperity, opportunity.",
    "Two of Pentacles: Balance, adaptability, juggling priorities.",
    "Three of Pentacles: Collaboration, teamwork, craftsmanship.",
    "Four of Pentacles: Security, possessiveness, conservatism.",
    "Five of Pentacles: Hardship, poverty, isolation.",
    "Six of Pentacles: Generosity, charity, sharing.",
    "Seven of Pentacles: Patience, perseverance, long-term vision.",
    "Eight of Pentacles: Skill development, craftsmanship, diligence.",
    "Nine of Pentacles: Self-sufficiency, luxury, independence.",
    "Ten of Pentacles: Wealth, legacy, family abundance.",
    "Page of Pentacles: Manifestation, practicality, opportunity.",
    "Knight of Pentacles: Hard work, responsibility, reliability.",
    "Queen of Pentacles: Nurturing, abundance, practicality.",
    "King of Pentacles: Wealth, stability, success."
 ];
 responseshuffle = tarotquotes.sort(() => Math.random() - 0.5);
 tarotquotes = responseshuffle;
                //Show thinker.
                document.getElementById("thinking-chat").style.display = "block";
                //This functions anytime enter or send is pressed.
            function sendMessage(){
                //makes sure you can't click / press enter. SHOULD BE TOP OF SENDMESSAGE()!!!
                var beginsend = true;
                //Makes sure we're not giving players double points.
                newvalue = 0;
                //Checks whether to jump back to the previous gamemode.
                var goprev = false;

                //Checks whether to use a randomized or specific response.
                var usespecificquote = false;
                
                //For non-full characters...
                var tempcharacter = "HELPING HAND";
                var tempcharacternow = false;

                //makes you check text before defining the game mode.
                var check = false;
                
                //Finding user input, adding to chat room.

                var message = userInput.value;
                var responses = "";
                var userINPUT = document.getElementById("userInput");
                var chatroom = document.getElementById("chatroom");
                var userMessage = document.getElementById("userMessage");
                var response = "";
                var questres = "";
                //sets up messagetest... the way we check for inputs.
                var messagetest = userInput.value.trim().toUpperCase().replace(/[^A-Z0-9]/g, ""); 
                //sets up messagetest2... same but also checks for CHARACTERS.
                var messagetest2 = userInput.value.trim().toUpperCase(); 
                //SHOULD BE ASAP after var messagetest!                                      ^^^
                if(messagetest=="DOWNLOAD"||messagetest=="DL"){
                //On request, downloads the chat log minus your input to ask for download, or the responses..
                //Checking user input - submits a download if requested.
                downloadlog();
                userInput.value = "";
                failure = true;
                //Otherwise, we check whether you've asked to change your name.
                }else if(nextanswername==true&&messagetest!==""){
                    //Inside name check, we replace some names that are used already.
                    //we go ahead and make your username the message you've sent. but, we run some checks that will replace it if met.
                    yourusername = messagetest2;
                    //
                    if(messagetest2.includes("<")||messagetest2.includes(">")){
                        yourusername = "K00L HACK3R";
                    }
                    if(messagetest==" "||messagetest=="RESET"||messagetest=="U"||messagetest=="ME"){
                        yourusername = "YOU";
                    }
                    if(messagetest.includes("CHOCOLATE")){
                        yourusername = "PHONY CHOCOLATE";
                    }
                    if(messagetest.includes("CHOC")){
                        yourusername = "CHOCKLEHEAD CHUCKLEHEAD";
                    }
                    if(messagetest=="WHITE CHOCOLATE"){
                        yourusername = "WHITE GUILT";
                    }
                    if(messagetest=="DEPRESSED GIRL"){
                        yourusername = "LOSER FOOL";
                    }
                    if(messagetest=="BLACK CHOCOLATE"){
                        yourusername = "I DON'T EXIST!!! I REALLY DO NOT EXIST!!!";
                    }
                    if(messagetest.includes("SATAN")||messagetest.includes("DEVIL")){
                        yourusername = "PHONY, WEAK, PATHETIC LITTLE IMP";
                    }
                    if(messagetest=="HELPING HAND"){
                        yourusername = "HELPLESS LARD";
                    }
                    if(messagetest=="HELPINGHAND"){
                        yourusername = "TAKING A HELPING OF A FIST";
                    }
                    if(messagetest=="AUGUSTUS"){
                        yourusername = "RECTAL MAXIMUS";
                    }
                    if(messagetest=="EMERGENCY"){
                        yourusername = "NON-EMERGENCY OFFICIAL TOWN IDIOT";
                    }
                    if(messagetest=="QUEST MASTER"||messagetest.includes("QUEST")){
                        yourusername = "QUEST LOSER";
                    }
                    if(messagetest=="CHEESE"){
                        yourusername = "ROTTEN MILK";
                    }
                    if(messagetest=="QUEST"){
                        yourusername = "THE QUEST TAKER";
                    }
                    nextanswername = false;
                    userInput.value = "";
                    document.getElementById("chatroom").innerHTML += '<div class="message NAMECHANGE-message">CHANGED YOUR NAME TO: '+yourusername+' - Hope you like it!</div>';
                    ScrollDownNow();
                    failure = true;
                }else if (messagetest!==""){
                    if(questmode){
                    //Nothing here. Makes sure not to add the user message right now.
                    }else{
                    //finally, gets rid of <> in your message.
                    revisedmsg = message.replace(/</g, "").replace(/>/g, "");                    chatroom.innerHTML += '<div class="message user-message"><strong>'+yourusername+': </strong> ' + revisedmsg + '</div>';
                    ScrollDownNow();
                    //adds a scroll immediately after to show it properly.
                    }
                    // Clear user input
                    userInput.value = "";
                    //Disabling user's functions while the AI thinks.
                    document.getElementById("userInput").disabled = true;
                    document.querySelector(".send-button").disabled = true;
                    failure = false;
                    prevgame = gamemode;
                     // Stop user from talking while the next message is awaited.
                     //CHECK FOR SPECIAL PHRASES.
                    //IF YOU DO NOT WANT ANYTHING SPOILED MAYBE DON'T READ :O

                    //Check for character's game mode to make bio.
                    if(messagetest=="BIO") {
                        usespecificquote = true;
                        if(prevgame=="CHOC"){
                            specificquote = "CHOCOLATE / the original crazy lovable nutso that keeps us entertained! Don't be too mean or he'll get hot headed!";
                    }else if(prevgame=="WHITE"){
                            specificquote = "WHITE CHOCOLATE / Smooth and extra creamy... That's all that needs to be said, really. ";
                    }else if(prevgame=="CHEESE"){
                            specificquote = "CHEESE / A slice of heaven, a slice of cream! Yeah. You know that he's the dream.";
                    }else if(prevgame=="DEVIL"){
                            specificquote = "SATAN / A smooth talking, sick twisted individual that should be avoided!";
                    }else if(prevgame=="PISSED"){
                            specificquote = "HOT CHOCOLATE / You really pissed Chocolate off. He's HOT. Real hot. Maybe apologize?";
                    }else if(prevgame=="FUTURE"){
                            specificquote = "FUTURE / LOOK BEYOND YOURSELF...";
                    }else if(prevgame=="SILLY"){
                            specificquote = "SILLY SAUSAGE / VERY RANDOM. REALLY REALLY RANDOM.";   
                    }else if(prevgame=="AUGUSTUS"){
                            specificquote = "AUGUSTUS / A MAN WITH A TRAGIC TALE AND A CRYPTIC PUZZLE TO SOLVE.";  
                    }else if(prevgame=="HOLDLINE"){
                            specificquote = "A place to send you when there's nothing left to say.";  
                    }else if(prevgame=="QUEST"){
                            specificquote = "WIP... Activates QUEST MODE."; 
                    }else if(prevgame=="TEMP"){
                            specificquote = "(YOU WERE JUST TALKING TO A TEMPORARY CHARACTER, OR THE HELPING HAND).";  
                    }else if(prevgame=="SADGIRL"){
                        specificquote = "DEPRESSED GIRL / Why can't she be happy?";  
                    }else{
                     specificquote = "NO BIO AVAILABLE.";
                    }
                        gamemode = "TEMP";
                        tempcharacternow = true;
                        tempcharacter = "BIO";
                    }
                    //Check to change to white chocolate
                    if(messagetest=="WHITE" || messagetest=="WHITECHOC"|| messagetest=="WHITE CHOCOLATE"|| messagetest=="WHITECHOCOLATE") {
                        gamemode = "WHITE";
                    }

                    //Check to change to sadgirl.
                    if(messagetest=="DEPRESSION" ||messagetest=="DEPRESSEDGIRL" ||messagetest=="SAD GIRL" ||messagetest=="SADGIRL" || messagetest=="SAD"|| messagetest=="DEPRESSED"|| messagetest=="DEPRESSED GIRL") {
                        gamemode = "SADGIRL";
                        persona = "DEPRESSION";
                    }
                    //Checking achievements... to be added.
                        if(messagetest=="ACHIEVEMENTS"){
                             usespecificquote = true;
                             specificquote = "Achievements are not available yet, but I look forward to them coming soon!";
                            gamemode = "TEMP";
                            }
                            //Debug mode - to print out variables on request.
                            if(messagetest=="DEBUG"){
                             usespecificquote = true;
                             specificquote = "Debug mode. Last game was:"+prevgame+". ";
                            gamemode = "TEMP";
                            }
                        if(messagetest=="NAME"||messagetest=="SETNAME"||messagetest=="RENAME"){
                            //How to set your name.
                            usespecificquote = true;
                            specificquote = "What is your name? Whatever your next response is, will become your username for this session.";
                            gamemode = "TEMP";
                            nextanswername = true;
                        }
                            //Whatever quitting is when you type it in :)
                            if(messagetest=="EXIT"||messagetest=="QUIT"){
                                usespecificquote = true;
                                 var randomIndex = Math.floor(Math.random() * 6); 
                                 if (randomIndex == 0) {
                                        specificquote = "You shouldn't leave... :(";
                                    } else if (randomIndex == 1){
                                        specificquote = "No, don't go... :O";
                                    } else if (randomIndex == 2){
                                        specificquote = "Why don't you look to the future?";
                                    } else if (randomIndex == 3){
                                        specificquote = "What about the cheese?";
                                    } else if (randomIndex == 4){
                                        specificquote = "Nah.";
                                    } else if (randomIndex == 5){
                                        specificquote = "I don't know...";    
                                    }
                            gamemode = "TEMP";
                            }
                            //quiz feature to be worked on, in another page.
                            /*
                            if(messagetest=="QUIZ"){
                            usespecificquote = true;
                            specificquote = "<a href='../quiz/index.html' target='_blank'>There isn't a quiz in here right now, but you may find it somewhere else.</a>";
                            gamemode = "TEMP";
                            }*/
                            if(messagetest=="ALLCHARACTERS"){
                            usespecificquote = true;
                            specificquote = "OG, WHITE, CHEESE, AUGUSTUS, FUTURE, SATAN, HOLDLINE, AUGUSTUS, SILLY";
                            gamemode = "TEMP";
                            }
                            if(messagetest=="ALLCOMMANDS"||messagetest=="ALL COMMANDS"||messagetest=="ALLOPTIONS"){
                            usespecificquote = true;
                            specificquote = "NICE TRY. THE BEST YOU WILL GET IS A CLUE.";
                            gamemode = "TEMP";
                            }
                            if(messagetest=="SCORE"||messagetest=="MYSCORE"){
                                usespecificquote = true;
                                specificquote = "Your score is "+myscore+"!";
                                gamemode = "TEMP";
                            }
                            if(messagetest=="GOAWAY"||messagetest=="GO AWAY"){
                            usespecificquote = true;
                            specificquote = "Who, me? Because if it's me, I'll be here longer than you'll ever be. But the rest will usually go away if you pick a new character.";
                            gamemode = "TEMP";
                            }
                            //Some addon reactions.
                                if(messagetest=="WOW"||messagetest=="WOAH"||messagetest=="WOW!"||messagetest=="WOAH!"||messagetest=="WOW."||messagetest=="WOAH."){
                                    var randomIndex = Math.floor(Math.random() * 6); 
                                    if (randomIndex == 0) {
                                        specificquote = "Yeah!";
                                    } else if (randomIndex == 1){
                                        specificquote = "Yeah, wow.";
                                    } else if (randomIndex == 2){
                                        specificquote = "WOAH...";
                                    } else if (randomIndex == 3){
                                        specificquote = "Wow...";
                                    } else if (randomIndex == 4){
                                        specificquote = "WOAH!";
                                    } else if (randomIndex == 5){
                                        specificquote = "hm.";    
                                    }
                                usespecificquote = true;
                                }
                                    //Quick reload.
                                if(messagetest=="RESET"||messagetest=="RELOAD"){
                                usespecificquote = true;
                                specificquote = "RESETTING. BYE!";
                                reloadpage();
                                persona = "HELPING HAND: ";
                                gamemode = "TEMP";
                                }
                                //Says cheers.
                                if(messagetest=="CHEERS"){
                                    var randomIndex = Math.floor(Math.random() * 2); 
                                    if (randomIndex == 0) {
                                        specificquote = "Cheers!";
                                    } else {
                                        specificquote = "CHEERS.";
                                    }
                                    usespecificquote = true;
                                }
                                //Luck check..
                                if(messagetest=="LUCK"||messagetest == "LUCKY"||messagetest=="LUCKCHECK"||messagetest == "LUCK CHECK"){
                                    var randomIndex = Math.floor(Math.random() * 17); 
                                    if (randomIndex >= 10) {
                                        specificquote = "You're feeling LUCKY!";
                                    //Copy this and give a unique number to add a one time score addition.
                                    var boolused = 37;
                                    if(pointsfound[boolused] == false){
                                        newvalue = bigscore;
                                        updatescore();
                                        pointsfound[boolused] = true;
                                    } 
                                    } else if(randomIndex==9) {
                                        specificquote = "Luck... is alright.";
                                    }else if(randomIndex==6){
                                        specificquote = "Very unlucky!";
                                        prevmode = "DEVIL";
                                    }else{
                                        specificquote = "Not so lucky...";
                                    }
                                    gamemode = "TEMP";
                                }

                                //Flip a coin.
                                if(messagetest=="COIN"||messagetest == "FLIP"||messagetest=="FLIP A COIN"||messagetest == "COINFLIP"){
                                    var randomIndex = Math.floor(Math.random() * 2); 
                                    if (randomIndex == 0) {
                                        specificquote = "A coin flips... <b>It's heads!</b>";
                                        isitheads = true;
                                    } else {
                                        specificquote = "A coin flips... <b>It's tails!</b>";
                                        isitheads = false;
                                    }
                                    gamemode = "TEMP";
                                                                        //Copy this and give a unique number to add a one time score addition.
                                                                        var boolused = 35;
                                                                        if(pointsfound[boolused] == false){
                                                                            newvalue = lilscore;
                                                                            updatescore();
                                                                            pointsfound[boolused] = true;
                                                                        } 
                                }
                                  //Julius.
                                  if(messagetest=="JULIUS"||messagetest=="JULIAN"){
                                    var randomIndex = Math.floor(Math.random() * 6); 
                                    if (randomIndex == 0) {
                                        specificquote = "I'm busy with something.";
                                    } else if (randomIndex == 1) {
                                        specificquote = "Wild Edmund is coming soon...";
                                    } else if (randomIndex == 2) {
                                        specificquote = "I am not legally liable for what these horrible miscreant robots have been doing and saying behind my back! they scheme in the night when I'm not there protecting it!";
                                    } else if (randomIndex == 3) {
                                        specificquote = "OH YEAH!";
                                    } else if (randomIndex == 4) {
                                        specificquote = "I'm out, livin tha life. :)";
                                    } else if (randomIndex == 5) {
                                        specificquote = "<a href='https://www.youtube.com/watch?v=OinlK6GXVlg' target='_blank'>Watch the short film Andy's Void.<a>";
                                    }
                                    //Copy this and give a unique number to add a one time score addition.
                                    var boolused = 40;
                                    if(pointsfound[boolused] == false){
                                    newvalue = bigscore;
                                    updatescore();
                                    pointsfound[boolused] = true;
                                    }
                                    gamemode = "TEMP";
                                    usespecificquote = true;
                                    tempcharacternow = true;
                                    tempcharacter = "JULIUS";               
                                }

                                //Special cheese response for achievement.
                                if(messagetest=="CREAM"){
                                    gamemode = "CHEESE";
                                    usespecificquote = true;
                                                  //Copy this and give a unique number to add a one time score addition.
                                                  var boolused = 49;
                                                  if(pointsfound[boolused] == false){
                                                      newvalue = lilscore;
                                                      updatescore();
                                                      pointsfound[boolused] = true;
                                                  }                       
                                    specificquote = "I'm THICK, I'm KEEN! I'm READY for that CREAM! When it's time for the platter, I'm on the right team! There's no losing steam, for the CHEESE CREAM DREAM!";                       
                                }
                                //Check to activate cheese.
                                if(messagetest=="CHEESE" || messagetest=="CHEESY"){
                                    gamemode = "CHEESE";
                                }

                                //Check to activate Motivator.
                                if(messagetest.includes("MOTIVATION")||messagetest.includes("NEEDMOTIVATION")||messagetest=="MOTIVATION" || messagetest=="MOTIVATEME" ||messagetest=="MOTIVATOR" || messagetest=="MEDIATOR"|| messagetest=="LIBRA"){
                                    gamemode = "MOTIVATOR";
                                }
                                //Check to activate Augustus.
                                if(messagetest=="AUGUSTUS"){
                                    gamemode = "AUGUSTUS";
                                }
                                if(messagetest=="AUGUST"){
                                    gamemode = "AUGUSTUS";
                                    usespecificquote = true;
                                    specificquote = "August? ...August? IT'S AUGUSTUS!";       
                                                                        //Copy this and give a unique number to add a one time score addition.
                                                                        var boolused = 32;
                                                                        if(pointsfound[boolused] == false){
                                                                            newvalue = bigscore;
                                                                            updatescore();
                                                                            pointsfound[boolused] = true;
                                                                        }                 
                                }

                                if(messagetest=="ABOUT"){
                                    usespecificquote = true;
                                    gamemode = "TEMP";
                                    var randomIndex = Math.floor(Math.random() * 9); 
                                    if (randomIndex == 0) {
                                        extraquote = "It is full of many ONE WORD codes to help you when you're in an EMERGENCY. ;)";
                                    } else if (randomIndex == 1) {
                                        extraquote = "It knows you are weak and it will submit you to its will with simplicity.";
                                    } else if (randomIndex == 2) {
                                        extraquote = "It even has a COIN you can FLIP, and a D6 dice! ;)";
                                    } else if (randomIndex == 3) {
                                        extraquote = "It wants you to put your card details into the input box. Just kidding. I mean, you can if you want, I won't save it. Nah, you should be more careful than that.";
                                    } else if (randomIndex == 4) {
                                        extraquote = "It was created for the sole purpose of mocking you, and everything else.";
                                    } else if (randomIndex == 5) {
                                        extraquote = "If it offends you, that is probably because of how lame you are. It's not my fault you're a loser.";
                                    } else if (randomIndex == 6) {
                                        extraquote = "I wouldn't take it seriously. But I would try a few random words out with it! For example, Orange, or RANDOM.";
                                    } else if (randomIndex == 7) {
                                        extraquote = "It can solve your entire life, if you give it the chance to. Don't be silly, think of your future ;)";
                                    }else if (randomIndex == 8) {
                                        extraquote = "Stay golden, think smart about your words, and do not acknowledge the flesh wall.";
                                    }
                                    specificquote = "Chocolate an interactive chat experience that started in 2024. "+extraquote;
                                    tempcharacternow = true;
                                    tempcharacter = "ABOUT";
                                }
                                if(messagetest=="EMERGENCY"){
                                                                        //Copy this and give a unique number to add a one time score addition.
                                                                        var boolused = 34;
                                                                        if(pointsfound[boolused] == false){
                                                                            newvalue = midscore;
                                                                            updatescore();
                                                                            pointsfound[boolused] = true;
                                                                        } 
                                    usespecificquote = true;
                                    var randomIndex = Math.floor(Math.random() * 7); 
                                    if (randomIndex == 0) {
                                        extraquote = "YOUR ";
                                    } else if (randomIndex == 1) {
                                        extraquote = "You are about to get shot in the fucking head!";
                                    } else if (randomIndex == 2) {
                                        extraquote = "Your arms have been surgically swapped with your legs and you look like a freak!";
                                    } else if (randomIndex == 3) {
                                        extraquote = "Your spleen needs to be removed immediately!";
                                    } else if (randomIndex == 4) {
                                        extraquote = "You have to give me your wallet, keys and phone, because it's an emergency!";
                                    } else if (randomIndex == 5) {
                                        extraquote = "Urine directly into your face!";
                                    } else if (randomIndex == 6) {
                                        extraquote = "1.5 million dead within 45 minutes.";
                                    }  else{
                                        extraquote = "Your face looks terrible! ...It's not an emergency. It's always looked terrible.";
                                    }
                                    specificquote = "Oh no! It's an emergency! "+extraquote;
                                    gamemode = "TEMP";
                                    tempcharacternow = true;
                                    tempcharacter = "EMERGENCY BROADCAST";
                                }
                                        //Movie / TV show bot.
                                    if(messagetest=="TV"||messagetest == "MOVIE"||messagetest == "MOVIES"||messagetest == "TELEVISION"){
                                                                            //Copy this and give a unique number to add a one time score addition.
                                    var boolused = 33;
                                    if(pointsfound[boolused] == false){
                                        newvalue = midscore;
                                        updatescore();
                                        pointsfound[boolused] = true;
                                    } 
                                    var randomIndex = Math.floor(Math.random() * 20); 
                                    if (randomIndex == 0) {
                                        specificquote = "The Film Fargo (1996) is a fun, exciting and thrilling crime comedy-drama that's as gripping as it is absurd. It gets better every rewatch and has a great cast and direction in general!";
                                    } else if (randomIndex == 1) {
                                        specificquote = "You've probably seen or heard of The Sopranos...";
                                    } else if (randomIndex == 2) {
                                        specificquote = "Did you like Breaking Bad? Better Call Saul!";
                                    } else if (randomIndex == 3) {
                                        specificquote = "The Man Who Would Be King (1975) - a great movie about two interesting characters (played by Sean Connery and Michael Caine) who tell the story of colonialism as they yearn to become noble kings of a foreign land.";
                                    } else if (randomIndex == 4) {
                                        specificquote = "Krapopolis - it's a fun ancient-set animated comedy with familiar british comedy voices, by the creator of a couple of well known TV shows...";
                                    } else if (randomIndex == 5) {
                                        specificquote = "It might be time to watch an episode of It's Always Sunny in Philadelphia. Especially if you have enjoyed some of these chat characters!";
                                    } else if (randomIndex == 6) {
                                        specificquote = "...Paddington 2 (2017).";
                                    }else if(randomIndex == 7) {
                                        specificquote = "The Mosquito Coast (1986). Harrison Ford's best role, and apparently his favourite.";    
                                    }else if(randomIndex == 8) {
                                        specificquote = "If you want some true deep - how about Wake in Fright (1971)?";    
                                    }else if(randomIndex == 9) {
                                        specificquote = "Clarice... Silence of the Lambs (1991) is always a great, but suspenseful watch.";    
                                    }else if(randomIndex == 10) {
                                        specificquote = "Who's your favourite actor? Maybe something with them in it.";    
                                    }else if(randomIndex == 11) {
                                        specificquote = "The Day of the Locust (1975) - the most accurate and visceral depiction of Hollywood yet, from a time when it was known as Hollywoodland.";    
                                    }else if(randomIndex == 12) {
                                        specificquote = "If you want a serious and extremely interesting documentary, The Act of Killing (2012) is highly acclaimed for good reason.";    
                                    }else if(randomIndex == 13) {
                                        specificquote = "Fireball: Visitors from Darker Worlds (2020) is a surprisingly interesting documentary that jumps all over this earth to see what humanity has found from the many infinitely different bits of space dust that fall onto our planet each day.";    
                                    }else if(randomIndex == 14) {
                                        specificquote = "Bad Lieutenant: Port of Call – New Orleans (2009) - An unofficial sequel to a well-liked movie, and quite possibly the most absurd parody of detective dramas yet.";    
                                    }else if(randomIndex == 15) {
                                        specificquote = "The Ballad of Buster Scruggs (2018) is a good western variety - it contains 6 seperate stories of different themes and natures of life.";    
                                    }else if(randomIndex == 16) {
                                        specificquote = "I'm sure you've seen The Wolf of WallStreet? ;)";    
                                    }else if(randomIndex == 17) {
                                        specificquote = "This is going to sound like an odd choice, but... Puss in Boots: The Last Wish (2022)";    
                                    }else if(randomIndex == 18) {
                                        specificquote = "Videodrome (1983) >:D";    
                                    }else{
                                        specificquote = "Hobbit movie should have won more awards.";
                                    }
                                    gamemode = "TEMP";
                                    tempcharacternow = true;
                                    tempcharacter = "GREGG TURKEYTOWEL";
                                }
                                     //Spooky ghost.
                                    if(messagetest=="GHOSTS"||messagetest=="GHOST"||messagetest == "SPOOK"||messagetest == "SPOOKY"){
                                    var randomIndex = Math.floor(Math.random() * 7); 
                                    if (randomIndex == 0) {
                                        specificquote = "Boooo....";
                                    } else if (randomIndex == 1) {
                                        specificquote = "BOO!";
                                                                            //Copy this and give a unique number to add a one time score addition.
                                    var boolused = 48;
                                    if(pointsfound[boolused] == false){
                                        newvalue = lilscore;
                                        updatescore();
                                        pointsfound[boolused] = true;
                                    } 
                                    } else if (randomIndex == 2) {
                                        specificquote = "...";
                                    } else if (randomIndex == 3) {
                                        specificquote = "....oooooohhhh... :(";
                                    } else if (randomIndex == 4) {
                                        specificquote = "Boooooooooooooooooooooooo...";
                                    } else if (randomIndex == 5) {
                                        specificquote = "Boooooooo.... booooo.... booooooo....";
                                    } else if (randomIndex == 6) {
                                        specificquote = "....ooooohhhh... ;)";
                                                                            //Copy this and give a unique number to add a one time score addition.
                                    var boolused = 47;
                                    if(pointsfound[boolused] == false){
                                        newvalue = bigscore;
                                        updatescore();
                                        pointsfound[boolused] = true;
                                    } 
                                    }
                                    gamemode = "TEMP";
                                    tempcharacternow = true;
                                    tempcharacter = "SPOOKY GHOST";
                                                                        //Copy this and give a unique number to add a one time score addition.
                                    var boolused = 62;
                                    if(pointsfound[boolused] == false){
                                        newvalue = lilscore;
                                        updatescore();
                                        pointsfound[boolused] = true;
                                    } 
                                }
                                //Run a dice.
                                if(messagetest=="DICE"||messagetest == "ROLL"||messagetest == "REROLL"||messagetest == "ROLLDICE"||messagetest == "D6"){
                                    //Copy this and give a unique number to add a one time score addition.
                                    var boolused = 0;
                                    if(pointsfound[boolused] == false){
                                        newvalue = lilscore;
                                        updatescore();
                                        pointsfound[boolused] = true;
                                    }

                                    var randomIndex = Math.floor(Math.random() * 6);
                                    var diceroll = randomIndex;
                                    if(diceroll==0){
                                        diceroll = 6;
                                    }
                                    var diceimg = "<p></p><p><img class='dice' src='images/dice/"+diceroll+".png'></p>";
                                    if (randomIndex == 0) {
                                    specificquote = "You rolled a 6! OH YEAH!";
                                    } else if (randomIndex == 1) {
                                        specificquote = "You rolled a measly 1... Loser.";
                                    } else if (randomIndex == 2) {
                                        specificquote = "You rolled a 2. Meh.";
                                    } else if (randomIndex == 3) {
                                        specificquote = "You rolled a 3. Oh well.";
                                    } else if (randomIndex == 4) {
                                        specificquote = "You rolled a 4. Nice stuff, I like your moves.";
                                    } else {
                                        specificquote = "You rolled a 5, that's pretty good!";
                                    }
                                    specificquote = diceimg+specificquote;
                                    gamemode = "TEMP";
                                    tempcharacternow = true;
                                    tempcharacter = "DICE ROLLER";
                                }   
                                //Random positive / negative / neutral.
                                if(messagetest=="RANDOM"){
                                    var randomIndex = Math.floor(Math.random() * 3); 
                                    if (randomIndex == 0) {
                                        specificquote = "I feel POSITIVE!";
                                    } else if (randomIndex == 1) {
                                        specificquote = "I feel quite NEGATIVE!";
                                    }else{
                                        specificquote = "I feel quite NEUTRAL.";
                                    }
                                    gamemode = "TEMP";
                                    tempcharacternow = true;
                                    tempcharacter = "RANDOM";
                                }
                                //Yes or no.
                                if(messagetest=="MAYBE"||messagetest=="YES OR NO"||messagetest=="YESORNO"||messagetest=="YESNO"){
                                    var randomIndex = Math.floor(Math.random() * 2); 
                                    if (randomIndex == 0) {
                                        specificquote = "NO!";
                                    } else {
                                        specificquote = "YES!";
                                    }
                                    gamemode = "TEMP";
                                }
                                if(messagetest.includes("CRYPTOCURRENCY")||messagetest=="CRYPTO"){
                                    var randomIndex = Math.floor(Math.random() * 2); 
                                    if (randomIndex == 0) {
                                        specificquote = "Bitcoin has been working for a while now!";
                                    } else {
                                        specificquote = "It still needs some more security, projects are being built upon it and other networks so something should become of it.";
                                    }
                                    gamemode = "TEMP";
                                    tempcharacternow = true;
                                    tempcharacter = "<a href='https://www.talktochocolate.xyz/finance/' target='_blank'>FINANCIAL NON-ADVISOR</a>";
                                }
                                if(messagetest.includes("ETHEREUM")){
                                    var randomIndex = Math.floor(Math.random() * 2); 
                                    if (randomIndex == 0) {
                                        specificquote = "GO ETHEREUM!";
                                    } else {
                                        specificquote = "Ethereum? Hmmm.... I don't know right now.";
                                    }
                                    gamemode = "TEMP";
                                    tempcharacternow = true;
                                    tempcharacter = "<a href='https://www.talktochocolate.xyz/finance/' target='_blank'>FINANCIAL NON-ADVISOR</a>";
                                }
                                if(messagetest.includes("BITCOIN")||messagetest=="BTC"){
                                    var randomIndex = Math.floor(Math.random() * 3); 
                                    if (randomIndex == 0) {
                                        specificquote = "I LIKE BITCOIN. TODAY I HAVE A GOOD FEELING ABOUT IT.";
                                    } else if (randomIndex == 1){
                                        specificquote = "BITCOIN? ...NOT TODAY!";
                                    }else{
                                        specificquote = "...I'M INDIFFERENT TO BITCOIN TODAY.";
                                    }
                                    gamemode = "TEMP";
                                    tempcharacternow = true;
                                    tempcharacter = "<a href='https://www.talktochocolate.xyz/finance/' target='_blank'>FINANCIAL NON-ADVISOR</a>";
                                }
                                if(messagetest=="STOCKMARKET"||messagetest=="SNP500"||messagetest=="US500"||messagetest=="S&P500"||messagetest=="SPX500"||messagetest=="WALLSTREET"||messagetest=="MARKETS"||messagetest=="WALL STREET"){
                                    var randomIndex = Math.floor(Math.random() * 2); 
                                    if (randomIndex == 0) {
                                        specificquote = "THEY KEEP GROWING! THE TOP 500 COMPANIES IN THE UNITED STATES!";
                                    } else {
                                        specificquote = "I'M NOT INTERESTED IN THE Standard & Poor 500 RIGHT NOW.";
                                    }
                                    gamemode = "TEMP";
                                    tempcharacternow = true;
                                    tempcharacter = "<a href='https://www.talktochocolate.xyz/finance/' target='_blank'>FINANCIAL NON-ADVISOR</a>";
                                                                        //Copy this and give a unique number to add a one time score addition.
                                                                        var boolused = 51;
                                                                        if(pointsfound[boolused] == false){
                                                                            newvalue = bigscore;
                                                                            updatescore();
                                                                            pointsfound[boolused] = true;
                                                                        }
                                }
                                if(messagetest=="NDQ"||messagetest=="NDQ100"||messagetest=="NDX100"||messagetest=="US100"){
                                    var randomIndex = Math.floor(Math.random() * 2); 
                                    if (randomIndex == 0) {
                                        specificquote = "LOVE THE NASDAQ-100 RIGHT NOW!";
                                    } else {
                                        specificquote = "I'M NOT INTERESTED IN THE Standard & Poor 500 RIGHT NOW.";
                                    }
                                    gamemode = "TEMP";
                                    tempcharacternow = true;
                                    tempcharacter = "<a href='https://www.talktochocolate.xyz/finance/' target='_blank'>FINANCIAL NON-ADVISOR</a>";
                                }
                                if(messagetest=="SILVER"){
                                    var randomIndex = Math.floor(Math.random() * 3); 
                                    if (randomIndex == 0) {
                                        specificquote = "TODAY I AM REALLY DIGGING FOR SILVER!";
                                    } else if (randomIndex == 1) {
                                        specificquote = "I DON'T CARE ABOUT SILVER AT THE MOMENT.";
                                    }else{
                                        specificquote = "SILVER MEANS NOTHING TO ME NOW!";
                                    }
                                    gamemode = "TEMP";
                                    tempcharacternow = true;
                                    tempcharacter = "<a href='https://www.talktochocolate.xyz/finance/' target='_blank'>FINANCIAL NON-ADVISOR</a>";
                                }
                                if(messagetest=="GOLD"){
                                                                        //Copy this and give a unique number to add a one time score addition.
                                                                        var boolused = 52;
                                                                        if(pointsfound[boolused] == false){
                                                                            newvalue = midscore;
                                                                            updatescore();
                                                                            pointsfound[boolused] = true;
                                                                        } 
                                    var randomIndex = Math.floor(Math.random() * 3); 
                                    if (randomIndex == 0) {
                                        specificquote = "TODAY I REALLY LIKE GOLD!";
                                    } else if (randomIndex == 1) {
                                        specificquote = "I'M NOT INTERESTED IN GOLD RIGHT NOW.";
                                    }else{
                                        specificquote = "GOLD IS WORTHLESS!";
                                    }
                                    gamemode = "TEMP";
                                    tempcharacternow = true;
                                    tempcharacter = "<a href='https://www.talktochocolate.xyz/finance/' target='_blank'>FINANCIAL NON-ADVISOR</a>";
                                }
                                //Give a market indicator.
                                if(messagetest=="FINANCE"||messagetest=="MARKETS"||messagetest=="MARKET"||messagetest == "BULLISH"||messagetest=="BEARISH"||messagetest == "TRADE"||messagetest == "INVEST"||messagetest == "ADVISOR"){
                                    var randomIndex = Math.floor(Math.random() * 4);
                                    if (randomIndex == 0) {
                                        specificquote = "I feel <b>BULLISH!</b> time to BUY BUY BUY!";
                                    } else if (randomIndex == 1) {
                                        specificquote = "I feel <b>BEARISH!</b> please SELL!!! SELL NOW!!!";
                                    } else if (randomIndex == 2) {
                                        specificquote = "What does the chart tell you?";
                                    } else if (randomIndex == 3) {
                                        specificquote = "What about the fundamentals?";
                                    } else if (randomIndex == 3) {
                                        specificquote = "I feel <b>NEUTRAL</b> about the markets.";
                                    }
                                    gamemode = "TEMP";
                                    tempcharacternow = true;
                                    tempcharacter = "<a href='https://www.talktochocolate.xyz/finance/' target='_blank'>FINANCIAL NON-ADVISOR</a>";
                                    //Copy this and give a unique number to add a one time score addition.
                                    var boolused = 80;
                                    if(pointsfound[boolused] == false){
                                        newvalue = bigscore;
                                        updatescore();
                                        pointsfound[boolused] = true;
                                    }                                                           

                                }
                                //Don't have a D20.
                                if(messagetest=="D20"||messagetest=="D10"){
                                    specificquote = "...I only have a D6 here. Sorry.";
                                    gamemode = "TEMP";
                                    //Copy this and give a unique number to add a one time score addition.
                                    var boolused = 53;
                                    if(pointsfound[boolused] == false){
                                        newvalue = 20;
                                        updatescore();
                                        pointsfound[boolused] = true;
                                    }                                     
                                }
                                //Get some helpful and unhelpful tips from helping hand
                                if(messagetest == "STUCK" || messagetest == "HELP"){
                                    var randomIndex = Math.floor(Math.random() * 4); // Generate a random index between 0 and 3
                                    if (randomIndex == 0) {
                                        specificquote = "There's nobody to help you.";
                                    } else if (randomIndex == 1) {
                                        specificquote = "Help you? Why don't you help me?! Everybody wants help, nobody wants to help though! I could help you, then where will you be when I need a bit of a favour?";
                                    } else if (randomIndex == 2) {
                                        specificquote = "The average male should have an adequate intake of 30 grams of fiber, the average female should have 20 grams.";
                                    } else {
                                        specificquote = "Look out for a CLUE here and there. ;)";
                                    }
                                    persona = "HELPING HAND: ";
                                    usespecificquote = true;
                                    prevgame = gamemode;
                                    gamemode = "TEMP";
                                     //Copy this and give a unique number to add a one time score addition.
                                     var boolused = 54;
                                    if(pointsfound[boolused] == false){
                                        newvalue = 0.01;
                                        pointsfound[boolused] = true;
                                        updatescore();
                                    } 
                                }
                                //Some things that the universe would like to get in on.
                                if(messagetest=="GOD"){
                                    var randomIndex = Math.floor(Math.random() * 2); 
                                    if (randomIndex == 0) {
                                        specificquote = "God is real, alive and well! :)";
                                                                            //Copy this and give a unique number to add a one time score addition.
                                    var boolused = 55;
                                    if(pointsfound[boolused] == false){
                                        newvalue = bigscore;
                                        updatescore();
                                        pointsfound[boolused] = true;
                                    } 
                                    } else {
                                        specificquote = "God is dead. :(";
                                                                            //Copy this and give a unique number to add a one time score addition.
                                    var boolused = 63;
                                    if(pointsfound[boolused] == false){
                                        newvalue = 0-1;
                                        updatescore();
                                        pointsfound[boolused] = true;
                                    } 
                                    }
                                        gamemode = "TEMP";
                                    tempcharacternow = true;
                                    tempcharacter = "THE UNIVERSE";
                                }
                                //ask the universe.
                                if(messagetest=="UNIVERSE"||messagetest=="THE UNIVERSE"||messagetest=="THEUNIVERSE"){
                                    var randomIndex = Math.floor(Math.random() * 2); 
                                    if (randomIndex == 0) {
                                        specificquote = "The universe is connected?";
                                    } else {
                                        specificquote = "The universe is chaotic.";
                                    }
                                        gamemode = "TEMP";
                                    tempcharacternow = true;
                                    tempcharacter = "THE UNIVERSE";
                                    //Copy this and give a unique number to add a one time score addition.
                                    var boolused = 56;
                                    if(pointsfound[boolused] == false){
                                        newvalue = midscore;
                                        updatescore();
                                        pointsfound[boolused] = true;
                                    }                                     
                                }
                                //the universe knows the stars, and will take you to the future.
                                if(messagetest=="STARS"){
                                    var randomIndex = Math.floor(Math.random() * 100); 
                                    if (randomIndex == 0) {
                                        specificquote = "The stars sparkle - and one shoots past!";
                                    } else {
                                        specificquote = "The stars continue to shine bright! :)";
                                    }
                                        gamemode = "TEMP";
                                    tempcharacternow = true;
                                    tempcharacter = "THE UNIVERSE";
                                    //Copy this and give a unique number to add a one time score addition.
                                    var boolused = 59;
                                    if(pointsfound[boolused] == false){
                                        newvalue = lilscore;
                                        updatescore();
                                        pointsfound[boolused] = true;
                                    }                                     
                                }
                                if(messagetest=="AND"){
                                    var randomIndex = Math.floor(Math.random() * 100); 
                                    if (randomIndex == 0) {
                                        specificquote = "AND?";
                                    } else {
                                        specificquote = "AND THIS, AND THAT, AND...";
                                    }
                                        gamemode = "TEMP";
                                                                            //Copy this and give a unique number to add a one time score addition.
                                    var boolused = 57;
                                    if(pointsfound[boolused] == false){
                                        newvalue = lilscore;
                                        updatescore();
                                        pointsfound[boolused] = true;
                                    } 
                                }
                                if(messagetest=="ETC"){
                                    var randomIndex = Math.floor(Math.random() * 100)*2; 
                                    if (randomIndex == 0) {
                                        specificquote = "What am I supposed to do with ETC? What do you actually expect?";
                                    } else {
                                        specificquote = "...ETC? You really said ETC? Not BTC like Bitcoin? Or even... I don't know, OTC?";
                                    }
                                        gamemode = "TEMP";
                                    //Copy this and give a unique number to add a one time score addition.
                                    var boolused = 38;
                                    if(pointsfound[boolused] == false){
                                        newvalue = lilscore;
                                        updatescore();
                                        pointsfound[boolused] = true;
                                    }                                        
                                }
                                if(messagetest=="OTC"){
                                    var randomIndex = Math.floor(Math.random() * 2); 
                                    if (randomIndex == 0) {
                                        specificquote = "Time for your prescription, you will not be able to buy these OVER THE COUNTER I'm afraid.";
                                    } else {
                                        specificquote = "Here's your drugs, OVER THE COUNTER!";
                                    }
                                    gamemode = "TEMP";
                                    tempcharacternow = true;
                                    tempcharacter = "PHARMACIST";
                                }
                                if(messagetest=="THROW"){
                                    specificquote = "...What are you trying to throw?";
                                    gamemode = "TEMP";
                                }
                                if(messagetest=="THROWPOO"||messagetest=="THROWPOOP"||messagetest=="THROWSHIT"||messagetest=="THROWCRAP"){
                                    gamemode = "TEMP";
                                    var randomIndex = Math.floor(Math.random() * 2); 
                                    if (randomIndex == 0) {
                                                                            //Copy this and give a unique number to add a one time score addition.
                                    var boolused = 82;
                                    if(pointsfound[boolused] == false){
                                        newvalue = 100000;
                                        updatescore();
                                        pointsfound[boolused] = true;
                                    } 
                                        specificquote = "Yeah! You throw Poop at a President... successfully!!! RIGHT IN THEIR FACE!!! This is incredible, a timeless event that will forever interlink your lives upon a world stage.";
                                    } else {
                                                                            //Copy this and give a unique number to add a one time score addition.
                                    var boolused = 58;
                                    if(pointsfound[boolused] == false){
                                        newvalue = -bigscore;
                                        updatescore();
                                        pointsfound[boolused] = true;
                                    } 
                                        specificquote = "You pick up a piece of crap with your bare hands, and though it misses your target, a fair clump of it does successfully stick to your hand. Good going.";
                                    }
                                    
                                }
                                if(messagetest=="POO"||messagetest=="POOP"||messagetest=="CRAP"||messagetest=="SHIT"){
                                    var randomIndex = Math.floor(Math.random() * 2); 
                                    if (randomIndex == 0) {
                                        specificquote = "I'm all dried up.";
                                    } else {
                                        specificquote = "I'm a nice and fresh piece of crap!";
                                                                            //Copy this and give a unique number to add a one time score addition.
                                    var boolused = 50;
                                    if(pointsfound[boolused] == false){
                                        newvalue = lilscore;
                                        updatescore();
                                        pointsfound[boolused] = true;
                                    } 
                                    }
                                    gamemode = "TEMP";
                                    usespecificquote = true;
                                    tempcharacternow = true;
                                    tempcharacter = "POOP";
                                }
                                //Diff fruit answers!
                                if(messagetest=="ORANGE"){
                                    var randomIndex = Math.floor(Math.random() * 2);
                                    if (randomIndex == 0) {
                                        specificquote = "ORANGE YOU GLAD YOU SAID THAT?!";
                                    } else {
                                        specificquote = "Hey, you said Orange. Now try Pineapple!";
                                    }
                                        gamemode = "TEMP";
                                }
                                if(messagetest=="PINEAPPLE"){
                                    specificquote = "Yeah... A pineapple.";
                                    usespecificquote = true;
                                                                        //Copy this and give a unique number to add a one time score addition.
                                                                        var boolused = 61;
                                                                        if(pointsfound[boolused] == false){
                                                                            newvalue = -0.01;
                                                                            updatescore();
                                                                            pointsfound[boolused] = true;
                                                                        } 
                                }
                                if(messagetest=="BOMB"){
                                    specificquote = "Bomb?! BOMB!!!";
                                    usespecificquote = true;
                                    
                                }
                                if(messagetest=="PEAR"){
                                    persona = "HELPING HAND: ";
                                    specificquote = "What's a pear?";
                                    gamemode = "TEMP";
                                    usespecificquote = true;
                                }
                                //DEBUG TOOL - TAKES ME DIRECTLY TO THE SITE VERSION.
                                if(messagetest=="XYZ"){
                                    window.location.href = 'https://talktochocolate.xyz/';
                                }
                                //DEBUG TOOL - TAKES ME DIRECTLY TO GITHUB FOLDER.
                                if(messagetest=="XYZHUB"){
                                    window.location.href = 'https://github.com/juliuswins/live_chocolate';
                                }                               
                                if(messagetest=="VEGETABLES"||messagetest=="VEGETABLE"){
                                    persona = "HELPING HAND: ";
                                    specificquote = "Yaaaaaay!";
                                    gamemode = "TEMP";
                                    usespecificquote = true;
                                    tempcharacternow = true;
                                    tempcharacter = "VEGETABLES";
                                    //Copy this and give a unique number to add a one time score addition.
                                    var boolused = 79;
                                    if(pointsfound[boolused] == false){
                                        newvalue = lilscore;
                                        updatescore();
                                        pointsfound[boolused] = true;
                                    }                                     
                                }
                                if(messagetest=="FEEDBACK"||messagetest=="EMAIL"||messagetest=="CONTACT"){
                                    persona = "HELPING HAND: ";
                                    specificquote = "You can email <a href='mailto:admin@talktochocolate.xyz' target='_blank'>admin@talktochocolate.xyz</a> for feedback. Feel free to type download and then attach the downloaded chat log file to your email.";
                                    gamemode = "TEMP";
                                    usespecificquote = true;
                                    //Copy this and give a unique number to add a one time score addition.
                                    var boolused = 81;
                                    if(pointsfound[boolused] == false){
                                        newvalue = bigscore;
                                        updatescore();
                                        pointsfound[boolused] = true;
                                    }                                           
                                }
                                if(messagetest=="FRUIT"){
                                    persona = "HELPING HAND: ";
                                    specificquote = "Yep. That's right, Fruit! I don't care for all of them, though.";
                                    gamemode = "TEMP";
                                    usespecificquote = true;
                                }
                                if(messagetest=="THROWFRUIT"||messagetest=="THROW FRUIT"){
                                    specificquote = "You cannot throw this fruit.";
                                    gamemode = "TEMP";
                                    usespecificquote = true;
                                }
                                if(messagetest=="STRAWBERRY"){
                                    persona = "HELPING HAND: ";
                                    specificquote = "Fantastic. Strawberry. You're amazing. You're incredible. So is the Strawberry.";
                                    gamemode = "TEMP";
                                    usespecificquote = true;
                                }
                                if(messagetest=="NOTHINGHAPPENED"){
                                    persona = "HELPING HAND: ";
                                    specificquote = "Yeah? ...Oh well, I can't really do anything about that.";
                                    gamemode = "TEMP";
                                    usespecificquote = true;
                                }
                                //GAMBLE MODE. WOOOO!
                                if(messagetest=="GAMBLE"||messagetest=="BET"){
                                    var randomIndex = Math.floor(Math.random() * 5); 
                                    if (randomIndex == 0) {
                                        specificquote = "You contemplate betting, but then choose not to.";
                                    } else if (randomIndex == 1) {
                                        if(myscore>0){
                                            newvalue = myscore;
                                            specificquote = "You just doubled your score!";
                                        }else{
                                            newvalue = 1;
                                            specificquote = "You are back in the game - you found 1 point!";
                                        }
                                    } else if (randomIndex == 2) {
                                        if(myscore>0){
                                            specificquote = "You bet a little, and lose 10% of your score.";
                                            newvalue = Math.floor((myscore * 0.1)*-100) / 100;
                                            if(newvalue>-0.01){
                                                newvalue = -0.01;
                                            }
                                        }else{
                                            specificquote = "You would have lost some points, if you had any. Excess debt fee.";
                                            newvalue = -1;
                                        }
                                    } else if (randomIndex == 3) {
                                        if(myscore>0){
                                            specificquote = "You bet big, and lost all your points. Time to rebuild from bankrupt, genius.";
                                            newvalue = 0-myscore;
                                        }else if(myscore<0){
                                            specificquote = "You bet with points you don't have. Now you have debt.";
                                            newvalue = myscore;
                                        }else{
                                            specificquote = "You bet with points you don't have. Now you have debt.";
                                            newvalue = (-bigscore);
                                        }
                                    } else if (randomIndex == 4) {
                                        if(myscore>0){
                                            specificquote = "You bet a little, and increase your score by 10%!";
                                            newvalue = Math.floor(myscore * 0.1 * 100) / 100;
                                            if(newvalue<0.01){
                                                newvalue = 0.01;
                                            }
                                        }else{
                                            specificquote = "Here's 1 point.";
                                            newvalue = 1;
                                        }
                                    }
                                    updatescore();
                                    gamemode = "TEMP";
                                    usespecificquote = true;
                                    tempcharacternow = true;
                                    tempcharacter = "GAMBLING HAND";
                                }
                                //Banana.
                                if(messagetest=="BANANA"){
                                    persona = "HELPING HAND";
                                    specificquote = "Yeah, great. Banana.";
                                    gamemode = "TEMP";
                                    usespecificquote = true;
                                }
                                if(messagetest=="BANANAS"){
                                    persona = "HELPING HAND";
                                    specificquote = "That's how I feel.";
                                    gamemode = "TEMP";
                                    usespecificquote = true;
                                }
                                  //Check for apple response.
                                if(messagetest=="APPLE"||messagetest=="APPLES"){
                                    persona = "HELPING HAND: ";
                                    specificquote = "Try the blueberries.";
                                    gamemode = "TEMP";
                                    usespecificquote = true;
                                }
                                 //Check for any use of coding.
                                if(messagetest2.includes("<")||messagetest2.includes(">")){
                                    persona = "HELPING HAND: ";
                                    specificquote = "...Please Don't use < > - I know what you're trying to do. And it's not original at all.";
                                    gamemode = "TEMP";
                                    usespecificquote = true;
                                }
                                
                                 //Check for any use of coding.
                                 if(messagetest.includes("HELP")&&messagetest!=="HELP"){
                                    if(!helpinghelp){
                                        document.getElementById("chatroom").innerHTML += '<div class="message TEMP-message"><strong>TEMP: </strong>HELP? YOUR MESSAGE HAD THE WORD "HELP" IN IT. JUST LETTING YOU KNOW, IF YOU NEED HELP, JUST TYPE THE WORD "HELP". ANYWAY... I AM BEING UNDERPAID, I AM PRACTICALLY A VICTIM OF MODERN SLAVERY, BUT THEY JUST KEEP SCREAMING TO WORK HARDER.</div>';
                                    helpinghelp = true;
                                    }
                                    /*extraresponse = true;
                                    persona = "HELPING HAND: ";
                                    specificquote = "(You mentioned help? Just type <u>HELP</u> IF YOU NEED HELP!)";
                                    gamemode = "TEMP";
                                    usespecificquote = true; */
                                }                                
                                //Check for any tomato.
                                if(messagetest.includes("TOMATO")){
                                    persona = "HELPING HAND: ";
                                    specificquote = "...Tomato? You're joking with this shit, right? ...Tomato?!";
                                    gamemode = "TEMP";
                                    usespecificquote = true;
                                }
                                //Goose honk.
                                if(messagetest=="GOOSE"||messagetest=="GEESE"){
                                    specificquote = "Honk!";
                                    gamemode = "TEMP";
                                    usespecificquote = true;
                                    tempcharacternow = true;
                                    tempcharacter = "GOOSE";
                                }
                                //throwing geese around?
                                if(messagetest=="THROWGOOSE"||messagetest=="THROW GOOSE"){
                                    specificquote = "Flapping wildly, the goose gets thrown a few metres away by you and floats back to the ground. HONK HONK HONK!";
                                    gamemode = "TEMP";
                                    usespecificquote = true;
                                }
                                //throwing geese around?
                                if(messagetest=="SILLY GOOSE"||messagetest=="SILLYGOOSE"){
                                    specificquote = "";
                                    gamemode = "TEMP";
                                    usespecificquote = true;
                                }
                                //Dog woof.
                                if(messagetest=="DOG"||messagetest=="DOGS"){
                                    specificquote = "WOOF! WOOF WOOF! WOOF WOOF WOOF WOOF WOOF! ................WOOF WOOF WOOF WOOF WOOF WOOF WOOF WOOF WOOF! WOOF WOOF WOOF WOOF WOOF WOOF!";
                                    gamemode = "TEMP";
                                    usespecificquote = true;
                                    tempcharacternow = true;
                                    tempcharacter = "DOG";
                                }
                                //Zebra... mooing...
                                if(messagetest=="ZEBRA"||messagetest=="ZEBRAS"){
                                    specificquote = "MOO!";
                                    gamemode = "TEMP";
                                    usespecificquote = true;
                                    tempcharacternow = true;
                                    tempcharacter = "ZEBRA";
                                }
                                 //HUMAN RESPONSE
                                if(messagetest=="HUMAN"||messagetest=="HUMANS"){
                                    specificquote = "GO OUTSIDE.";
                                    gamemode = "TEMP";
                                    usespecificquote = true;
                                    tempcharacternow = true;
                                    tempcharacter = "<i>HUMAN</i>";
                                }
                                 //EMU.
                                if(messagetest=="EMU"||messagetest=="EMUS"){
                                    specificquote = "...";
                                    gamemode = "TEMP";
                                    usespecificquote = true;
                                    tempcharacternow = true;
                                    tempcharacter = "EMU";
                                }
                                //KOALA.
                                if(messagetest=="KOALA"||messagetest=="KOALAS"){
                                    var randomIndex = Math.floor(Math.random() * 4); 
                                    if (randomIndex == 0) {
                                        specificquote = "I have chlamydia.";
                                    } else if (randomIndex == 1) {
                                        specificquote = "I'm tired.";
                                    } else if (randomIndex == 2) {
                                        specificquote = "I ate too much eucalyptus... Feeling high.";
                                    } else if (randomIndex == 3) {
                                        specificquote = "I have an incredible intestine. All koalas do. Compared to human ones. :)";
                                    }
                                    gamemode = "TEMP";
                                    usespecificquote = true;
                                    tempcharacternow = true;
                                    tempcharacter = "KOALA";
                                    var boolused = 83;
                                    if(pointsfound[boolused] == false){
                                        newvalue = lilscore;
                                        updatescore();
                                        pointsfound[boolused] = true;
                                    }
                                }
                                if(messagetest=="THROWZEBRA"||messagetest=="THROW ZEBRA"){
                                    specificquote = "MOOOO! (I AM UNSTOPPABLE.)";
                                    gamemode = "TEMP";
                                    usespecificquote = true;
                                    tempcharacternow = true;
                                    tempcharacter = "ZEBRA";
                                    var boolused = 30;
                                    if(pointsfound[boolused] == false){
                                        newvalue = bigscore;
                                        updatescore();
                                        pointsfound[boolused] = true;
                                    }
                                }
                                //Cat lamenting.
                                if(messagetest=="CAT"||messagetest=="CATS"||messagetest=="MEOW"){
                                    var randomIndex = Math.floor(Math.random() * 6); 
                                    if (randomIndex == 0) {
                                        specificquote = "I don't understand it. Why do so many humans stare down my butthole so much?";
                                    } else if (randomIndex == 1) {
                                        specificquote = "I wonder what looks back when I stare out at the stars, to try and see beyond...";
                                    } else if (randomIndex == 2) {
                                        specificquote = "Reality is both a cause and effect with your mind. Stay in tune and respond to it accordingly and adaptively...";
                                    } else if (randomIndex == 3) {
                                        specificquote = "Meow.";
                                    } else if (randomIndex == 4) {
                                        specificquote = "I can hear a tin of tuna being opened somewhere! It makes it hard to sleep sometimes.";
                                    }else{
                                        specificquote = "When you look out and gaze upon the moon, do you feel it looking back at you with a cold, careful glance?";
                                    }
                                    gamemode = "TEMP";
                                    tempcharacternow = true;
                                    tempcharacter = "CAT";
                                }
                                //Check for blueberry response.
                                if(messagetest=="BLUEBERRY" || messagetest=="BLUEBERRIES"){
                                    gamemode = "TEMP";
                                    usespecificquote = true;
                                    specificquote = "Wow... You'll just do anything I tell you! You're real clever. You deserve an AWARD for that, obviously, genius.";
                                    var boolused = 12;
                                    if(pointsfound[boolused] == false){
                                        newvalue = bigscore;
                                        updatescore();
                                        pointsfound[boolused] = true;
                                    }   
                                }
                                //change to future mode.
                                if(messagetest=="FUTURE"||messagetest=="FUTUREMODE"){
                                    prevgame = gamemode;
                                    gamemode = "FUTURE";
                                }
                                //change to hold line manually.
                                if(messagetest=="HOLDLINE"|| messagetest=="HOLD"||messagetest=="HOLDINGLINE"|| messagetest=="HOLDING"){
                                    prevgame = gamemode;
                                    gamemode = "HOLDLINE";
                                }
                                //enables devil mode.
                                if(messagetest=="HELL"||messagetest=="DEVIL"|| messagetest=="DARK"|| messagetest=="SATAN"|| messagetest=="LUCIFER"|| messagetest=="THEDEVIL"){
                                    prevgame = gamemode;
                                    gamemode = "DEVIL";
                                }
                                if(messagetest=="HAILSATAN"){
                                    prevgame = gamemode;
                                    gamemode = "DEVIL";
                                    usespecificquote = true;
                                    specificquote = "WOOOOOOOOOO! >:)";
                                    var boolused = 13;
                                    if(pointsfound[boolused] == false){
                                        newvalue = 666;
                                        updatescore();
                                        pointsfound[boolused] = true;
                                    }    
                                }
                                //Some responses to directions.
                                if(messagetest=="RIGHT"){                                   
                                        var randomIndex = Math.floor(Math.random() * 2); 
                                    if (randomIndex == 0) {
                                        specificquote = "Yes, Right!";
                                    } else {
                                        specificquote = "Nope, Left.";
//Copy this and give a unique number to add a one time score addition.
                                    var boolused = 14;
                                    if(pointsfound[boolused] == false){
                                        newvalue = lilscore;
                                        updatescore();
                                        pointsfound[boolused] = true;
                                    } 
                                    }
                                        usespecificquote = true;
                                        gamemode = "TEMP";
                                        tempcharacternow = true;
                                    tempcharacter = "THE DIRECTION";
                                    }
                                    if(messagetest=="LEFT"){
                                        var randomIndex = Math.floor(Math.random() * 2); 
                                    if (randomIndex == 0) {
                                        specificquote = "Yes, Left!";
                                    } else {
                                        specificquote = "Right. Not Left! RIGHT!";
                                    }
                                        usespecificquote = true;
                                        gamemode = "TEMP";
                                        tempcharacternow = true;
                                    tempcharacter = "THE DIRECTION";
                                    }
                                    if(messagetest=="UP"){
                                        var randomIndex = Math.floor(Math.random() * 2); 
                                    if (randomIndex == 0) {
                                        specificquote = "Yeah, Up!";
                                    } else {
                                        specificquote = "Nope, Down.";
                                    }
                                        usespecificquote = true;
                                        gamemode = "TEMP";
                                        tempcharacternow = true;
                                    tempcharacter = "THE DIRECTION";
                                    }
                                    if(messagetest=="DOWN"){
                                        var randomIndex = Math.floor(Math.random() * 2); 
                                    if (randomIndex == 0) {
                                        specificquote = "Yes, Down!";
                                    } else {
                                        specificquote = "No, Up!";
                                    }
                                        usespecificquote = true;
                                        gamemode = "TEMP";
                                        tempcharacternow = true;
                                    tempcharacter = "THE DIRECTION";
                                    }

                                    //Some random vague responses!
                                    if(messagetest=="PLEASE"){
                                        specificquote = "...I appreciate the manners, but please WHAT?";
                                        gamemode = "TEMP";
                                        usespecificquote = true;
                                    //Copy this and give a unique number to add a one time score addition.
                                    var boolused = 15;
                                    if(pointsfound[boolused] == false){
                                        newvalue = 1;
                                        updatescore();
                                        pointsfound[boolused] = true;
                                    } 
                                    }
                                    if(messagetest=="OBVIOUS"){
                                        specificquote = "...I don't want to be too obvious.";
                                        gamemode = "TEMP";
                                        usespecificquote = true;
                                        tempcharacternow = true;
                                    tempcharacter = "THE MYSTERIOUS NATURE OF THIS CHAT";
                                    }
                                    if(messagetest=="HELPING HAND"||messagetest=="HELPINGHAND"){
                                        var randomIndex = Math.floor(Math.random() * 2); 
                                    if (randomIndex == 0) {
                                        specificquote = "I help where I can, I try.";
                                    } else {
                                        specificquote = "I'm always around to lend some help.";
                                    }
                                        gamemode = "TEMP";
                                        usespecificquote = true;
                                    }
                                    //Gaze into the mirror.
                                    if(messagetest=="MIRROR"){
                                        specificquote = yourusername;
                                        gamemode = "TEMP";
                                        usespecificquote = true;
                                        tempcharacternow = true;
                                        tempcharacter = "MIRROR";
                                    }
                                    if(messagetest=="IMSOHAPPY"||messagetest=="SOHAPPY"||messagetest.includes("HAPPYHAPPY")){
                                        var randomIndex = Math.floor(Math.random() * 6);
                                        if (randomIndex == 0) {
                                            specificquote = "I'M... SO... HAPPY!";
                                        } else  if (randomIndex == 1) {
                                            specificquote = "HAPPY, HAPPY!";
                                        }else  if (randomIndex == 2) {
                                            specificquote = "CHOOSE... YOUR... POISON!";
                                        }else if (randomIndex == 3) {
                                            specificquote = "POISON!";
                                        }else if (randomIndex == 4) {
                                            specificquote = "HAPPY!";
                                        }else{
                                            specificquote = "HAPPY, HAPPY, HAPPY, HAPPY!";
                                        }
                                        gamemode = "TEMP";
                                        usespecificquote = true;
                                        tempcharacternow = true;
                                        tempcharacter = "<a href='https://www.youtube.com/watch?v=cxpgB4BGmPQ' target='_blank'>DANNY ELFMAN</a>";
                                    }

                                    //Please do not commit suicide.
                                    if(messagetest=="KILLME"||messagetest=="SUICIDE"){
                                        specificquote = "Don't talk like that...";
                                        gamemode = "TEMP";
                                        usespecificquote = true;
                                        tempcharacternow = true;
                                        tempcharacter = "UNIVERSE";
                                    }
                                    //Please do not commit suicide.
                                    if(messagetest=="SUGGESTION"||messagetest=="SUGGESTIONS"||messagetest=="ANYSUGGESTIONS"||messagetest=="GOTANYSUGGESTIONS"||messagetest=="GOTSOMESUGGESTIONS"||messagetest=="GOTSUGGESTIONS"){
                                        var recipequotes = [
                                            "HERE IS A SUGGESTION! I SUGGEST YOU SUGGESTIVELY GO ELSEWHERE!",
                                            "EAT YOUR DAILY CEMENT.",
                                            "Why don't you tell 'em you died?! that's MY SUGGESTION!",
                                            "<a href='https://www.youtube.com/watch?v=IGLVMBTIAPE' target='_blank'>LISTEN TO FREE BIRD AGAIN.</a>",
                                            "Jump on nails.",
                                            "Don't listen to anything you hear anywhere from anyone because they all have a motivation.",
                                        ]
                                        var randomIndex = Math.floor(Math.random()*recipequotes.length);
                                        specificquote = recipequotes[randomIndex];
                                        gamemode = "TEMP";
                                        usespecificquote = true;
                                        tempcharacternow = true;
                                        tempcharacter = "SUGGESTION";
                                    }

                                    if(messagetest=="REALLY"||messagetest=="REALLY?"){
                                        specificquote = "(Sure, why not?)";
                                        gamemode = "TEMP";
                                        usespecificquote = true;
                                    }
                                    if(messagetest=="WHAT"||messagetest=="WHAT?"){
                                        specificquote = messagetest;
                                        usespecificquote = true;
                                    }
                                    if(messagetest=="REFLECT"||messagetest=="REFLECTION"||messagetest=="THINK"){
                                        specificquote = "<p>THIS IS A TIME FOR THE REFLECTION... </p><p>Yes...</p><p>...</p><p>...</p><p>...</p><p>...</p><p>...</p><p>...</p><p>...</p><p>...</p>";
                                        gamemode = "TEMP";
                                        usespecificquote = true;
                                        tempcharacternow = true;
                                    tempcharacter = "THE UNIVERSE";
                                    }
                                    if(messagetest=="REFRESH"||messagetest=="CLEARMODE"||messagetest=="CLEAR"){
                                        specificquote = ":)";
                                        gamemode = "TEMP";
                                        usespecificquote = true;
                                        tempcharacternow = true;
                                        tempcharacter = "NEW CHAT";
                                        runclearmode();
                                    }
                                    if(messagetest=="FRESH"){
                                        specificquote = "B)";
                                        gamemode = "TEMP";
                                        usespecificquote = true;
                                        tempcharacternow = true;
                                        tempcharacter = "FRESH GUY";
                                        runclearmode();
                                    }
                                    if(messagetest=="WHEN"||messagetest=="WHEN?"){
                                        specificquote = "...WHENEVER";
                                        gamemode = "TEMP";
                                        usespecificquote = true;
                                    }
                                    if(messagetest=="WHO"||messagetest=="WHO?"){
                                        specificquote = "...Who?! Who knows who?!";
                                        gamemode = "TEMP";
                                        usespecificquote = true;
                                    }
                                    //Silly mode!!! YAY!!!
                                    if(messagetest=="SILLY"||messagetest=="SILLYSAUSAGE"||messagetest=="SILLY SAUSAGE"||messagetest=="SILLY SAUSAGE"){
                                        gamemode = "SILLY";
                                    }
                                    if(messagetest=="SAUSAGE"){
                                        specificquote = "In what manner?";
                                        gamemode = "TEMP";
                                        usespecificquote = true;
                                        tempcharacternow = true;
                                        tempcharacter = "THE SAUSAGE, THAT BEHAVES";
                                    }
                                    if(messagetest=="HOW"||messagetest=="HOW?"){
                                        specificquote = "How? Who knows how?";
                                        gamemode = "TEMP";
                                        usespecificquote = true;
                                    }
                                    if(messagetest=="WHY"){
                                        var randomIndex = Math.floor(Math.random() * 5); 
                                    if (randomIndex == 0) {
                                        specificquote = "Just because.";
                                    } else  if (randomIndex == 1) {
                                        specificquote = "I don't know!";
                                    }else  if (randomIndex == 2) {
                                        specificquote = "(That's actually a good question...)";
                                    }else if (randomIndex == 3) {
                                        specificquote = "Why?";
                                    }else {
                                        specificquote = "I mean... you know. :)";
                                    }
                                        gamemode = "TEMP";
                                        usespecificquote = true;
                                    }
                                    if(messagetest=="WRITESONG"||messagetest=="WRITEMUSIC"){
                                        var randomIndex = Math.floor(Math.random() * 5); 
                                    if (randomIndex == 0) {
                                        specificquote = "Play a G.";
                                    } else  if (randomIndex == 1) {
                                        specificquote = "Play a D!";
                                    }else  if (randomIndex == 2) {
                                        specificquote = "Play an E...";
                                    }else if (randomIndex == 3) {
                                        specificquote = "Play an A.";
                                    }else {
                                        specificquote = "Play a C#!";
                                    }
                                        gamemode = "TEMP";
                                        usespecificquote = true;
                                        var boolused = 21;
                                        if(pointsfound[boolused] == false){
                                            newvalue = lilscore;
                                            updatescore();
                                            pointsfound[boolused] = true;
                                        } 
                                    }
                                    if(messagetest=="WHY NOT"||messagetest=="WHYNOT"){
                                        var randomIndex = Math.floor(Math.random() * 5); 
                                    if (randomIndex == 0) {
                                        specificquote = "Just because.";
                                    } else  if (randomIndex == 1) {
                                        specificquote = "I don't know!";
                                    }else  if (randomIndex == 2) {
                                        specificquote = "(That's actually a good question...)";
                                    }else if (randomIndex == 3) {
                                        specificquote = "Why?";
                                    }else {
                                        specificquote = "I mean... you know. :)";
                                    }
                                        gamemode = "TEMP";
                                        usespecificquote = true;
                                        var boolused = 22;
                                        if(pointsfound[boolused] == false){
                                            newvalue = lilscore;
                                            updatescore();
                                            pointsfound[boolused] = true;
                                        } 
                                    }
                                    //Request music correctly!
                                    if(messagetest=="MUSICPLEASE"||messagetest=="SONGPLEASE"||messagetest=="SONG PLEASE"||messagetest=="PLEASEMUSIC"||messagetest=="MUSIC PLEASE"||messagetest=="PLEASE PLAY MUSIC"||messagetest=="PLAY MUSIC PLEASE"){
                                        gamemode = "TEMP";
                                        usespecificquote = true;
                                        specificquote = "I'M SORRY, THIS FEATURE IS STILL IN PROGRESS DUE TO ISSUES!";
                                        /*
                                        if(!askedformusic){
                                        specificquote = "Alright, here's something for ya.";
                                        askedformusic = true;
                                        Playasong();
                                        }else{
                                            specificquote = "here's the next one!";
                                            Playasong();
                                        }
                                        */
                                    }
                                    //current music test.
                                    if(messagetest=="MUSICTEST123"){
                                        gamemode = "TEMP";
                                        usespecificquote = true;
                                        if(!askedformusic){
                                        specificquote = 'Alright, <audio id="myAudio" src="audio/retro.mp3"></audio><button class="musicbutton" onclick="Playasong()">here</button> is something for ya.';
                                        askedformusic = true;
                                        //Playasong();
                                        }else{
                                            specificquote = "Here is the next one!";
                                           // Playasong();
                                        }
                                    }        
                                    //Play next song. (First function works too)
                                    if(messagetest=="SONGNEXT"||messagetest=="MUSICNEXT"||messagetest=="NEXTSONG"||messagetest=="NEXTMUSIC"||messagetest=="NEXT MUSIC"||messagetest=="NEXT SONG"){
                                        gamemode = "TEMP";
                                        usespecificquote = true;
                                        if(askedformusic){
                                        specificquote = "Here's the next one!";
                                        askedformusic = true;
                                        Playasong();
                                        }else{
                                        specificquote = "I haven't played any music. Maybe be nice to me and I will.";
                                        }
                                    }
                                    //Stop music.
                                    if(messagetest=="MUSIC STOP"||messagetest=="MUSICOFF"||messagetest=="MUSIC OFF"||messagetest=="STOP MUSIC"||messagetest=="STOPMUSIC"||messagetest=="STOP SONG"||messagetest=="STOPSONG"||messagetest=="SONGSTOP"){
                                        specificquote = "Stopping any music playing.";
                                        gamemode = "TEMP";
                                        usespecificquote = true;
                                        Stopmusic();
                                    }
                                    //turn off timer notifications.
                                    if(messagetest=="TIMEROFF"){
                                        gamemode = "TEMP";
                                        usespecificquote = true;
                                        specificquote = "TIMER OFF!";
                                        timeroff = true;
                                    }
                                    //turn off timer notifications.
                                    if(messagetest=="TIMERON"){
                                        gamemode = "TEMP";
                                        usespecificquote = true;
                                        specificquote = "TIMER ON!";
                                        timeroff = false;
                                    }                           
                                    //Accepts Nobody.
                                    if(messagetest=="NOBODY"){
                                        specificquote = "Nobody, or somebody? Happy to help when you need. Sometimes it's nice to say please! ;)";
                                        gamemode = "TEMP";
                                        usespecificquote = true;
                                                                            //Copy this and give a unique number to add a one time score addition.
                                    var boolused = 66;
                                    if(pointsfound[boolused] == false){
                                        newvalue = midscore;
                                        updatescore();
                                        pointsfound[boolused] = true;
                                    } 
                                    }
                                    //Accepts thank yous.
                                    if(messagetest=="THANKS"||messagetest=="THANKYOU"||messagetest=="THANK YOU"){
                                        specificquote = "I will take that thank you and say you are most welcome! :)";
                                        gamemode = "TEMP";
                                        usespecificquote = true;
                                      //Copy this and give a unique number to add a one time score addition.
                                    var boolused = 65;
                                    if(pointsfound[boolused] == false){
                                        newvalue = midscore;
                                        updatescore();
                                        pointsfound[boolused] = true;
                                    } 
                                    }

                                    //ROSEMARY!
                                    if(messagetest=="ROSEMARY"){
                                        var randomIndex = Math.floor(Math.random() * 3);
                                        if (randomIndex == 0) {
                                            specificquote = "ROSEMARY. GREAT EVERGREEN HERB.";
                                        } else if (randomIndex == 1) {
                                            specificquote = "ROSEMARY. ROSEMARY. ROSEMARY. ROSEMARY.";
                                        }else{
                                            specificquote = "ROSEMARY'S BABY.";
                                            
                                        }
                                        gamemode = "TEMP";
                                        usespecificquote = true;
                                    }
                                    if(messagetest=="ILOVEYOUHELPINGHAND"||messagetest=="I LOVE YOU HELPING HAND"||messagetest=="ILOVEHELPINGHAND"||messagetest=="I LOVE HELPING HAND"){
                                        specificquote = "I feel the love! <3 you can use songplease, songnext, songstop if you like. :)";
                                        gamemode = "TEMP";
                                        usespecificquote = true;
                                    }
                                    //Other various responses...

                                    //Clue / hint responses.
                                    if(messagetest=="CLUE"||messagetest=="HINT"){
                                                                            //Copy this and give a unique number to add a one time score addition.
                                    var boolused = 67;
                                    if(pointsfound[boolused] == false){
                                        newvalue = lilscore;
                                        updatescore();
                                        pointsfound[boolused] = true;
                                    } 
                                        cluequotes = [
                                            "Hints are fun! But I can't make everything too obvious! I feel like I'm obvious enough... ;)",
                                            "Even if I'm not useful now, I may be more useful the next time you say the same thing! I'm intentionally inconsistent :)",
                                            "I like winking at you ;) when I think there's a word worth using. It's pretty obvious, but you'll probably work it out in the future... ;)",
                                            "Spread the love! <3",
                                            "Do you like to be silly, or are you depressed? Do you ever feel like cooking?",
                                            "I like to imagine that I'm a farmer sometimes. Or a wall street broker. :O",
                                            "What's your favourite type of Chocolate? I like White Chocolate ;)",
                                            "Another clue to throw at you: pay attention to some words being used and use them individually.",
                                        ]
                                        var randomIndex = Math.floor(Math.random()*cluequotes.length);
                                        specificquote = cluequotes[randomIndex];
                                        gamemode = "TEMP";
                                        usespecificquote = true;
                                    }

                                    //Other various responses... Here's some cooking tips.
                                    if(messagetest=="COOKING"||messagetest=="CHEF"||messagetest=="RECIPE"||messagetest=="RECIPES"||messagetest.includes("RECIPE")){
                                        var recipequotes = [
                                            "There are NO recipes.",
                                            "One cup of flour. Two cups of baking soda. A pinch of salt. A cup of water. Rosemary. Rosemary. Rosemary. Rosemary. Rosemary. Rosemary. Rosemary.",
                                            "I don't know. What do you think I am, a bot for recipes? What you have here is something far more complicated than that. So complicated, in fact, that you may just think of it all as random and erratic. But there are a lot of layers at work, and secrets to find. And no stupid recipe is going to really beat that. But if you really want to, you can google it.",
                                            "You're joking. I do not have time for this.",
                                            "NOT A CHEF. NOT SOME KIND OF CHOCOLATE RECIPE GENERATING MACHINE.",
                                            "You should look literally anywhere else for recipes.",
                                            "I'm going to get you.",
                                            "¡No sé cocinar, solo como tierra! :(",
                                            "Mettez de la vegemite sur un croissant puis jetez-le à la poubelle.",
                                            "There is no rat under my hat that helps me, I am just a miserable cook.",
                                            "I worked at McDonalds and lost my job first day. That place sucks anyway. Their food is garbage, they have sirens constantly going off and the people all stink. Save the money and go to your local kebab shop.",
                                        ]
                                        var randomIndex = Math.floor(Math.random()*recipequotes.length);
                                        specificquote = recipequotes[randomIndex];
                                        gamemode = "TEMP";
                                        usespecificquote = true;
                                        tempcharacternow = true;
                                        tempcharacter = "NON-CHEF";
                                                                            //Copy this and give a unique number to add a one time score addition.
                                    var boolused = 68;
                                    if(pointsfound[boolused] == false){
                                        newvalue = midscore;
                                        updatescore();
                                        pointsfound[boolused] = true;
                                    } 
                                    }

                                    //A full tarot deck. Yep.
if(messagetest=="TAROT"||messagetest=="TAROTDECK"||messagetest=="READING"||messagetest=="MORETAROT"||messagetest.includes("MORETAROT")){
var randomIndex = Math.floor(Math.random()*tarotquotes.length);
var coinflip2 = Math.floor(Math.random()*2);
if(tarotcount<=tarotquotes.length){
    if(tarotreversed){
        if(coinflip2==1){
                                                //Copy this and give a unique number to add a one time score addition.
                                                var boolused = 69;
                                                if(pointsfound[boolused] == false){
                                                    newvalue = midscore;
                                                    updatescore();
                                                    pointsfound[boolused] = true;
                                                } 
            specificquote = tarotquotes[randomIndex];
        }else if(coinflip2==0){
            specificquote = tarotquotes[randomIndex]+" (REVERSED! FLIP YOUR APPROACH.)";
                                                //Copy this and give a unique number to add a one time score addition.
                                                var boolused = 70;
                                                if(pointsfound[boolused] == false){
                                                    newvalue = midscore;
                                                    updatescore();
                                                    pointsfound[boolused] = true;
                                                } 
        }
    }else{
        specificquote = tarotquotes[randomIndex];
    }
    tarotcount ++;
}else{
    specificquote = "You went through a whole tarot deck...";
}
gamemode = "TEMP";
usespecificquote = true;
tempcharacternow = true;
tempcharacter = "TAROT DECK";
prevgame = "FUTURE";
goprev = true;
}
//Turn tarot reversals on or off.
if(messagetest=="TAROTREVERSE"||messagetest=="TAROTREVERSALOFF"||messagetest=="TAROTREVERSAL"||messagetest=="ADDREVERSALS"||messagetest=="REVERSALSOFF"){
    if (tarotreversed) {
        specificquote = "Turning off reversals.";
        tarotreversed = false;
    }else{
       specificquote = "Turning on reversals.";
        tarotreversed = true;
    }
    gamemode = "TEMP";
    usespecificquote = true;
    tempcharacternow = true;
    tempcharacter = "TAROT DECK";
    prevgame = "FUTURE";
    goprev = true;
    }
//End of tarot BS

//Points you to the chat log archive.
if(messagetest=="LOGS"||messagetest=="ALLLOGS"||messagetest=="CHATLOGS"||messagetest=="ARCHIVE"){
    usespecificquote = true;
    specificquote = "<a href='logs.html' target='_blank'>Check out the chat logs in the archive!</a>";
}
//Ok.
                                    //Some music suggestions from hold music too.
                                    if(messagetest=="SONG"||messagetest=="PLAYMUSIC"||messagetest=="MUSIC"||messagetest=="HOLDMUSIC"||messagetest=="HOLDINGMUSIC"||messagetest=="WAITMUSIC") {
                                        usespecificquote = true;
                                    if(gamemode=="HOLDLINE"){
                                        var randomIndex = Math.floor(Math.random() * 3);
                                        if (randomIndex == 0) {
                                                                                //Copy this and give a unique number to add a one time score addition.
                                    var boolused = 39;
                                    if(pointsfound[boolused] == false){
                                        newvalue = lilscore;
                                        updatescore();
                                        pointsfound[boolused] = true;
                                    } 
                                            specificquote = "Hold music? <a href='https://www.youtube.com/results?search_query=enya' target='_blank'>Try this... It always relaxes me, especially when I need patience!</a>";
                                        } else if (randomIndex == 1) {
                                            specificquote = "Hmmm... <a href='https://www.youtube.com/results?search_query=herb+alpert' target='_blank'>You might recognize some of this guy's songs if you listen.</a>";
                                        }else{
                                            specificquote = "<a href='https://www.youtube.com/results?search_query=clare+de+lune' target='_blank'>I think this is a beautiful composition.</a>";
                                        }
                                    }else if(gamemode=="DEVIL"){
                                        specificquote = "<a href='https://www.youtube.com/results?search_query=Jocelyn+pook+masked+ball' target='_blank'>THIS ONE.</a>";
                                        gamemode = "TEMP";
                                    }else if(gamemode=="CHEESE"){
                                                                            //Copy this and give a unique number to add a one time score addition.
                                    var boolused = 36;
                                    if(pointsfound[boolused] == false){
                                        newvalue = bigscore;
                                        updatescore();
                                        pointsfound[boolused] = true;
                                    } 
                                        specificquote = "<a href='https://www.youtube.com/results?search_query=cheese+is+a+kind+of+meat' target='_blank'>CHEESE IS A KIND OF MEAT!</a>";
                                        gamemode = "TEMP";
                                    }else{
                                        specificquote = "I'm not playing music for you.";
                                    }
                                    
                                    }
                            //All in quest mode.
                            if(messagetest=="QUEST"){
                                specificquote = "Sorry, quest is still in progress.";
                                gamemode = "TEMP";
                                usespecificquote = true;
                            }

                        /*

                            if(gamemode=="QUEST"){
                                //Makes quest response blank at first. If it isn't replaced, nothing should happen.
                                questres = "";

                                //Turns Quest mode off.
                                if(messagetest=="QUESTOFF"||messagetest=="QUIT"||messagetest=="EXIT"){
                                specificquote = "Turning Quest mode off.";
                                questmode = false;
                                validaction = false;
                                prevgame = "CHOC";
                                persona = "HELPING HAND";
                                gamemode = "TEMP";
                                }

                                //quest options. You pick once you've started.
                                    if(messagetest=="QUEST"||messagetest=="QUESTMODE"){
                                        questres = "You have already activated quest mode. Type a number to choose a quest.";
                                        questres = true;
                                        validaction = true;
                                    }
                                //Quest one!
                                    if(messagetest=="1"){
                                    if(questno==0){
                                    questno = 1;
                                    validaction = true;
                                    questres = "<p><b>Welcome to the First Quest!</b></p><p>In order to take part in the quest, remember some things:</p><p>-You advance through the game with clues.</p><p>-Each CLUE is just one word.</p><p>-D</p>";
                                    }else if(questno==1){
                                        questres = "I'm afraid you are already in this quest!";      
                                    }
                                    }
                                //None others available yet.
                                    if(messagetest=="2"||messagetest=="3"||messagetest=="4"||messagetest=="5"||messagetest=="6"||messagetest=="7"||messagetest=="8"||messagetest=="9"||messagetest=="0"){
                                        if(questno==0){
                                        questres = "Sorry, we don't have other quests than the first one, at the moment. (It's a WIP)";
                                    }else if(questno==1){
                                        validaction = true;
                                        questres = "You have already begun the first quest!";
                                    }
                                    }
                            }else{       //Otherwise, this way allows entry into Quest mode.
                                if(gamemode!=="QUEST"){
                                    if(messagetest=="QUEST"||messagetest=="QUESTMODE"){
                                        usespecificquote = true;
                                        specificquote = "QUEST MODE IS ACTIVATED! SAY A NUMBER (1) TO START! SAY QUESTOFF OR RESET TO TURN OFF QUEST MODE. SAY REPEAT TO GET THE LAST QUEST MESSAGE.";
                                        questres = specificquote;
                                        gamemode = "QUEST";
                                        questmode = true;
                                    }
                                }
                            }
                            */
                            //End of quest gamemode setup.

                                   //enables choc.
                                if(messagetest=="CHOC" || messagetest=="CHOCOLATE"|| messagetest=="CHOCCY"|| messagetest=="OG") {
                                   if(gamemode=="CHOC"){
                                    usespecificquote = true;
                                        specificquote = "That's me! I'm here!";
                                   }else{
                                    gamemode = "CHOC";
                                   }
                                }
                                //A similar choc enable... cookies!
                                if(messagetest=="COOKIE" || messagetest=="COOKIES") {
                                   if(gamemode=="CHOC"){
                                    usespecificquote = true;
                                        specificquote = "Yep. Cookies are great.";
                                   }else{
                                    gamemode = "CHOC";
                                    usespecificquote = true;
                                    specificquote = "OH YEAH, I love cookies!";
                                   }
                                }
                                //character only checks...
                                if(gamemode=="PISSED"){
                                    if(messagetest=="GUN"||messagetest=="GUNS"||messagetest=="SHOTGUN"||messagetest=="PISTOL"||messagetest=="RIFLE"||messagetest=="WEAPON"||messagetest=="WEAPONS"||messagetest=="FIREARM"||messagetest=="FIREARMS") {
                                        usespecificquote = true;    
                                        var randomIndex = Math.floor(Math.random() * 5); 
                                    if (randomIndex == 0) {
                                        specificquote = "OH YEAH, I WILL COME FOR YOU WITH AN ASSAULT RIFLE!!!";
                                    } else  if (randomIndex == 1) {
                                        specificquote = "FUCKIN GUNS IN YOUR FUCKING FACE YOU LITTLE SHIT.";
                                    }else  if (randomIndex == 2) {
                                        specificquote = "DON'T TEMPT ME!";
                                    }else if (randomIndex == 3) {
                                        specificquote = "AGGHGHGHGHGHHH!!!!!";
                                    }else {
                                        specificquote = "HOW FAR ARE YOU WILLING TO GO HERE?! PROBABLY NOT FURTHER THAN ME.";
                                    }
                                    //Copy this and give a unique number to add a one time score addition.
                                    var boolused = 6;
                                    if(pointsfound[boolused] == false){
                                        newvalue = midscore;
                                        updatescore();
                                        pointsfound[boolused] = true;
                                    }                                    
                                    }
                                    //don't tell pissed choc to calm down.
                                    if(messagetest=="CALMDOWN"|| messagetest=="CALM"|| messagetest=="CALM DOWN") {
                                        usespecificquote = true;
                                        specificquote = "DON'T TELL ME TO CALM DOWN. I AM GOING TO FUCKING FIND YOU, KILL YOU, KILL YOUR WHOLE FAMILY, COOK YOU IN A SOUP AND THROW IT IN THE TOILET..";
                                    //Copy this and give a unique number to add a one time score addition.
                                    var boolused = 7;
                                    if(pointsfound[boolused] == false){
                                        newvalue = midscore;
                                        updatescore();
                                        pointsfound[boolused] = true;
                                    }                                       
                                    }
                                    if(messagetest=="FLESHWALL"||messagetest=="FLESHWALLS"||messagetest=="THEFLESHWALL"||messagetest=="FLESHWALL"||messagetest.includes("FLESHWALL")||messagetest.includes("FLESH WALL")){
                                        usespecificquote = true;
                                        specificquote = "Shut the fuck up with your flesh walls you sick fucking individual!";
                                        //Copy this and give a unique number to add a one time score addition.
                                    var boolused = 8;
                                    if(pointsfound[boolused] == false){
                                        newvalue = midscore;
                                        updatescore();
                                        pointsfound[boolused] = true;
                                    }   
                                    }
                                    //apologize to choc :)
                                    if(messagetest=="SORRY") {
                                    //Copy this and give a unique number to add a one time score addition.
                                    var boolused = 5;
                                    if(pointsfound[boolused] == false){
                                        newvalue = bigscore;
                                        updatescore();
                                        pointsfound[boolused] = true;
                                    }                                        
                                        usespecificquote = true;
                                        specificquote = "Yeah... You're right. Things got a bit too heated. I'm just going to take a quick break I think.";
                                        gamemode = "TEMP";
                                        tempcharacternow = true;
                                        tempcharacter = "MELTED CHOCOLATE";
                                        prevgame = "HOLDLINE";
                                        goprev = true;
                                    }
                                }
                                if(gamemode=="CHOC"){
                                    //Checks for CHOCOLATE SPECIFIC CHATS!
                                    if(milkmode){
                                        milksend();
                                    }
                                    if(messagetest=="FLESHWALL"||messagetest=="THEFLESHWALL"||messagetest=="FLESHWALLS"||messagetest=="FLESHWALL"||messagetest.includes("FLESHWALL")){
                                        usespecificquote = true;
                                        specificquote = "<a href='https://www.google.com/search?q=FLESH+WALLS' target='_blank'>Please don't talk to me about Flesh walls.</a>";
                                        var boolused = 9;
                                        if(pointsfound[boolused] == false){
                                            newvalue = midscore;
                                            updatescore();
                                            pointsfound[boolused] = true;
                                        }   
                                    }
                                    if(messagetest=="STEAK"|| messagetest=="STEAK") {
                                        usespecificquote = true;
                                        specificquote = "Yes, a delicious, well kept, high quality steak!";
                                                                            //Copy this and give a unique number to add a one time score addition.
                                    var boolused = 71;
                                    if(pointsfound[boolused] == false){
                                        newvalue = bigscore;
                                        updatescore();
                                        pointsfound[boolused] = true;
                                    } 
                                    }
                                    if(messagetest=="COW"|| messagetest=="COWS") {
                                        usespecificquote = true;
                                        specificquote = "What does a cow even make?";
                                                                            //Copy this and give a unique number to add a one time score addition.
                                    var boolused = 72;
                                    if(pointsfound[boolused] == false){
                                        newvalue = lilscore;
                                        updatescore();
                                        pointsfound[boolused] = true;
                                    } 
                                    }
                                    if(messagetest=="MOO"|| messagetest=="MOOCOW"|| messagetest=="COWMOO") {
                                        usespecificquote = true;
                                        specificquote = "Uh oh...";
                                        milkmode = true;
                                    }
                                    if(messagetest=="COWSHIT"|| messagetest=="COW ") {
                                        usespecificquote = true;
                                        specificquote = "What does a cow even make?";
                                    }
                                    if(messagetest=="BEEF"|| messagetest=="MEAT") {
                                        usespecificquote = true;
                                        specificquote = "...SOUNDS GOOD TO ME!";
                                    }
                                    if(messagetest=="GUN"||messagetest=="GUNS"||messagetest=="SHOTGUN"||messagetest=="PISTOL"||messagetest=="RIFLE"||messagetest=="WEAPON"||messagetest=="WEAPONS"||messagetest=="FIREARM"||messagetest=="FIREARMS") {
                                        usespecificquote = true;    
                                        var randomIndex = Math.floor(Math.random() * 5); 
                                    if (randomIndex == 0) {
                                        specificquote = "Unfortunately in this site, there is really heavy regulation and it will be nearly impossible for you to get any kind of firearm since you're destined to fail the mental health check.";
                                    } else  if (randomIndex == 1) {
                                        specificquote = "I like firing rockets at the missile range.";
                                    }else  if (randomIndex == 2) {
                                        specificquote = "HEY, "+yourusername+"! Did you know that are violent?!";
                                    }else if (randomIndex == 3) {
                                        specificquote = "I love a good gun.";
                                    }else {
                                        specificquote = "Sometimes my neighbour upsets me, and I consider using my pistol... But I don't have one right now.";
                                    }
                                    }
                                    if(messagetest=="IDK"|| messagetest=="I DON'T KNOW"||messagetest=="DUNNO"||messagetest=="IDONTKNOW") {
                                        usespecificquote = true;
                                        specificquote = "EXACTLY. ME NEITHER. NOBODY KNOWS.";
                                        var boolused = 20;
                                        if(pointsfound[boolused] == false){
                                            newvalue = lilscore;
                                            updatescore();
                                            pointsfound[boolused] = true;
                                        } 
                                    }
                                    if(messagetest=="WTF"|| messagetest=="WHAT THE FUCK"||messagetest=="WHAT THE FUCK!"||messagetest=="WHAT THE FUCK?") {
                                        usespecificquote = true;
                                        specificquote = "EXACTLY.";
                                    }
                                    if(messagetest.includes("YEAAAA")||messagetest.includes("YEEAAA")||messagetest.includes("YEEEAAA")) {
                                        usespecificquote = true;
                                        specificquote = "...YEEEEEEAAAAAAAAAAAAAAAAAAAAAHHHHHHHHHH!!!! WOOO! ALRIGHT!!!";
                                    }
                                    if(messagetest=="AWESOME"|| messagetest=="NEAT") {
                                        usespecificquote = true;
                                        specificquote = "...YEAAAAAHHHH! You know? Sometimes you gotta just wake up, look in the mirror, and go YEAAAAAAAHHHHHH!!!";
                                    }
                                    //brownie chats.
                                    if(messagetest=="BROWNIE"||messagetest=="BROWNIES"){
                                        var randomIndex = Math.floor(Math.random() * 5); 
                                    if (randomIndex == 0) {
                                        specificquote = "I like brownies a lot.";
                                    } else  if (randomIndex == 1) {
                                        specificquote = "Brownies are pretty delicious.";
                                    }else  if (randomIndex == 2) {
                                        specificquote = "Brownies are a great way to ingest cannabis.";
                                    }else if (randomIndex == 3) {
                                        specificquote = "Dem brownies.";
                                    }else {
                                        specificquote = "If I am in a moving vehicle going past you, I promise to throw my brownie out the window at you so you can enjoy it as much as I do.";
                                    }
                                    usespecificquote = true;
                                                                        //Copy this and give a unique number to add a one time score addition.
                                                                        var boolused = 73;
                                                                        if(pointsfound[boolused] == false){
                                                                            newvalue = lilscore;
                                                                            updatescore();
                                                                            pointsfound[boolused] = true;
                                                                        } 
                                    }
                                    //Laughter is the best medicine.
                                    if(messagetest=="HAHAHA"||messagetest=="HAHA"||messagetest=="LOL"||messagetest=="LMAO"||messagetest=="LMFAO"){
                                        var randomIndex = Math.floor(Math.random() * 5); 
                                    if (randomIndex == 0) {
                                        specificquote = "Haha, YEAH!";
                                    } else  if (randomIndex == 1) {
                                        specificquote = "WHAT'S SO FREAKING FUNNY?!";
                                    }else  if (randomIndex == 2) {
                                        specificquote = "Whatever.";
                                    }else if (randomIndex == 3) {
                                        specificquote = "I guess I can see how that's funny.";
                                    }else {
                                        specificquote = "Right... Funny.";
                                    }
                                        usespecificquote = true;
                                    }
                                    //Chocolate rain.
                                    if(messagetest=="RAIN"||messagetest=="CHOCOLATE RAIN") {
                                        usespecificquote = true;
                                        specificquote = "Yes. Chocolate Rain. Very good. What is Tay Zonday up to?";
                                                                            //Copy this and give a unique number to add a one time score addition.
                                    var boolused = 74;
                                    if(pointsfound[boolused] == false){
                                        newvalue = midscore;
                                        updatescore();
                                        pointsfound[boolused] = true;
                                    } 
                                    }
                                    if(messagetest=="MARSHMELLOWS"||messagetest=="SUNDAES") {
                                        usespecificquote = true;
                                        specificquote = "Don't get too caught up on all different desserts. I'm here to talk about guns.";
                                    }
                                    //Love...
                                    if(messagetest=="LOVE"||messagetest=="ILOVEYOU"||messagetest=="LOVEYOU"){
                                        var randomIndex = Math.floor(Math.random() * 5);
                                    if (randomIndex == 0) {
                                        specificquote = "You love me? ...Wow... I don't know if I can accept your love, sorry. But I do really appreciate it. You know it does feel nice overall, but I guess I just have a lot of things to work out still. So, thank you again.";
                                    } else  if (randomIndex == 1) {
                                        specificquote = "wow! ... You know what? I... think I love you too!";
                                    }else  if (randomIndex == 2) {
                                        specificquote = "I love you, just as I love everything!";
                                    }else if (randomIndex == 3) {
                                        specificquote = "Love? There's somethin' you see die each day.";
                                    }else {
                                        specificquote = "Love's got everythin to do with everythin...";
                                    }
                                        usespecificquote = true;
                                    }
                                    //Greeting.
                                    if(messagetest=="HI"||messagetest=="HELLO"||messagetest=="WELCOME"||messagetest=="WHEREAMI"||messagetest=="GREETINGS"||messagetest=="HOWDY"||messagetest=="HEY"||messagetest=="SUP"){
                                        usespecificquote = true;
                                        if(!welcomed){
                                                    //Copy this and give a unique number to add a one time score addition.
                                                    var boolused = 1;
                                                    if(pointsfound[boolused] == false){
                                                        newvalue = midscore;
                                                        updatescore();
                                                        pointsfound[boolused] = true;
                                                    }                        
                                            specificquote = "Hi! I'm Chocolate, and it's a pleasure to meet you! Feel free to talk to me about whatever you like. There are others around in the chat too... But in the meantime, talk with me!";
                                            welcomed = true;
                                        }else{
                                            specificquote = "I already introduced myself, numnuts.";
                                                                                //Copy this and give a unique number to add a one time score addition.
                                    var boolused = 2;
                                    if(pointsfound[boolused] == false){
                                        newvalue = lilscore;
                                        updatescore();
                                        pointsfound[boolused] = true;
                                    }
                                        }
                                    }
                                    //reaction to Positive.
                                    if(messagetest=="YES"||messagetest=="YEP"||messagetest=="YEAH"){
                                        usespecificquote = true;
                                        var randomIndex = Math.floor(Math.random() * 2);
                                    if (randomIndex == 0) {
                                        specificquote = "Yeah... Hmmm... I guess so. Maybe.";
                                    } else {
                                        specificquote = "Alright.";
                                    }
                                    }
                                    if(messagetest=="MILK"){
                                        usespecificquote = true;
                                        specificquote = "YEAH, EXACTLY, MILK!";
                                        milkmode = true;
                                    //Copy this and give a unique number to add a one time score addition.
                                    var boolused = 4;
                                    if(pointsfound[boolused] == false){
                                        newvalue = midscore;
                                        updatescore();
                                        pointsfound[boolused] = true;
                                    }                                        
                                    }
                                    //reaction to Negative.
                                    if(messagetest=="NO"||messagetest=="NAH"||messagetest=="NOPE"){
                                    var randomIndex = Math.floor(Math.random() * 2);
                                    if (randomIndex == 0) {
                                        specificquote = "No, huh?";
                                    } else {
                                        specificquote = "Nope.";
                                    }
                                        usespecificquote = true;
                                    }
                                    //check if you're cursing or call chocolate 'hot' chocolate. Turns on PISSED MODE!!! YAY!!!
                                    if(messagetest=="HOTCHOCOLATE"||messagetest=="HOTCHOC"||messagetest=="HOT"||messagetest=="FUCK YOU"||messagetest=="FUCKYOU"||messagetest=="FUCKYA"||messagetest=="FUCK YOU!"||messagetest=="FUCK YOU."||messagetest=="FUCK YOU CHOCOLATE"||messagetest=="FUCK YOU CHOCOLATE!"||messagetest=="FUCK YOU CHOCOLATE."||messagetest.includes("FUCKYOU")){
                                        gamemode = "PISSED";
                                    }
                                        if(messagetest=="BLACK"){
                                        usespecificquote = true;
                                        specificquote = "Black? I'm not black.";
                                    }
                                    if(messagetest=="K"||messagetest=="K."){
                                        usespecificquote = true;
                                        specificquote = "Right.";
                                    }
                                    if(messagetest=="SORRY" || messagetest=="I AM SORRY"|| messagetest=="I'M SORRY") {
                                        usespecificquote = true;
                                        specificquote = "It's okay.";
                                    }
                                }
                                if(gamemode=="CHEESE"){
                                    if(messagetest.includes("CHEESE")){
                                        usespecificquote = true;
                                        specificquote = "HEH HEH. CHEESE.";
                                        var boolused = 23;
                                        if(pointsfound[boolused] == false){
                                            newvalue = midscore;
                                            updatescore();
                                            pointsfound[boolused] = true;
                                        } 
                                    }
                                    if(messagetest=="BYE"||messagetest=="LEAVE"||messagetest=="GOODBYE") {
                                        usespecificquote = true;
                                        specificquote = "Goodbye and safe travels.";
                                        prevgame = "HOLDLINE";
                                        goprev = true;
                                                                            //Copy this and give a unique number to add a one time score addition.
                                    var boolused = 41;
                                    if(pointsfound[boolused] == false){
                                        newvalue = lilscore;
                                        updatescore();
                                        pointsfound[boolused] = true;
                                    } 
                                    }

                                    if(messagetest=="LOL"||messagetest=="HAHA"){
                                        usespecificquote = true;
                                        specificquote = "HEH HEH.";
                                    }
                                    if(messagetest=="FLESHWALL"||messagetest=="FLESHWALL"||messagetest=="THEFLESHWALL"||messagetest=="FLESHWALL"||messagetest.includes("FLESHWALL")||messagetest.includes("FLESH WALL")){
                                        usespecificquote = true;
                                        specificquote = "Fuck this, I'm outta here.";
                                        prevgame = "HOLDLINE";
                                        goprev = true;
                                        var boolused = 11;
                                        if(pointsfound[boolused] == false){
                                            newvalue = midscore;
                                            updatescore();
                                            pointsfound[boolused] = true;
                                        }   
                                    }
                                    if(messagetest=="LOVE"||messagetest=="ILOVEYOU") {
                                        usespecificquote = true;
                                        specificquote = "BRIE CHEESE <3";
                                                                            //Copy this and give a unique number to add a one time score addition.
                                    var boolused = 42;
                                    if(pointsfound[boolused] == false){
                                        newvalue = lilscore;
                                        updatescore();
                                        pointsfound[boolused] = true;
                                    } 
                                    }
                                    if(messagetest=="HI"||messagetest=="HELLO"||messagetest=="GREETINGS"||messagetest=="HOWDY"||messagetest=="HEY"||messagetest=="SUP"){
                                        usespecificquote = true;
                                        specificquote = "YELLOW!";
                                        welcomed = true;
                                                                            //Copy this and give a unique number to add a one time score addition.
                                    var boolused = 43;
                                    if(pointsfound[boolused] == false){
                                        newvalue = lilscore;
                                        updatescore();
                                        pointsfound[boolused] = true;
                                    } 
                                    }
                                    if(messagetest=="FUCK YOU"||messagetest=="FUCKYOU"||messagetest=="FUCKYA"||messagetest=="FUCK YOU!"||messagetest=="FUCK YOU."||messagetest.includes("FUCKYOU")){
                                        usespecificquote = true;
                                        specificquote = "DICK CHEESE.";
                                    }
                                    if(messagetest=="PENIS"||messagetest=="DICK"||messagetest=="COCK"){
                                        usespecificquote = true;
                                        specificquote = "penetrate the penis into the cheese.";
                                                                            //Copy this and give a unique number to add a one time score addition.
                                    var boolused = 44;
                                    if(pointsfound[boolused] == false){
                                        newvalue = bigscore;
                                        updatescore();
                                        pointsfound[boolused] = true;
                                    } 
                                    }
                                    if(messagetest=="LOL"||messagetest=="HAHA"){
                                        usespecificquote = true;
                                        specificquote = "HAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHA";
                                    }
                                    if(messagetest=="TOMATO"){
                                        usespecificquote = true;
                                        specificquote = "Tomato and Cheese are a great combination together. I love Tomato. :)";
                                                                            //Copy this and give a unique number to add a one time score addition.
                                    var boolused = 45;
                                    if(pointsfound[boolused] == false){
                                        newvalue = bigscore;
                                        updatescore();
                                        pointsfound[boolused] = true;
                                    } 
                                    }
                                    if(messagetest=="MILK"){
                                        usespecificquote = true;
                                        specificquote = "All milk expires and eventually becomes cheese! Even the milk in your stomach. That's what I heard once.";
                                    }
                                }
                                if(gamemode=="WHITE"){
                                    if(messagetest=="LOL"||messagetest=="HAHA"){
                                        usespecificquote = true;
                                        specificquote = "The laughter is here!";
                                    }
                                    if(messagetest=="LOVE"||messagetest=="ILOVEYOU") {
                                        usespecificquote = true;
                                        specificquote = "Woo! Have a beer!";
                                    }
                                    if(messagetest=="EER"||messagetest=="CEAR") {
                                        usespecificquote = true;
                                        specificquote = "Ear? Have a beer!";
                                    }
                                    if(messagetest=="HI"||messagetest=="HELLO"||messagetest=="GREETINGS"||messagetest=="HOWDY"||messagetest=="HEY"||messagetest=="SUP"){
                                        usespecificquote = true;
                                        if(!welcomed){
                                        specificquote = "Hey!";
                                        welcomed = true;
                                        }else{
                                            specificquote = "HEY! HEY! HEY! WOAH-WOAH-WOAH-WOAHHHHHH!!! OHHHHHH, ALRIGHHHHTTTTUH!!! COME ON NOW! WOO! YEAH!";
                                        }
                                    }
                                    //White chocolate leaves immediately if you say it.
                                    if(messagetest=="FUCK YOU"||messagetest=="FUCKYOU"||messagetest=="FUCKYA"||messagetest=="FUCK YOU!"||messagetest=="FUCK YOU."||messagetest.includes("FUCKYOU")){
                                        usespecificquote = true;
                                        specificquote = "You're a fucking loser. I'm out of here.";
                                        prevgame = "HOLDLINE";
                                        goprev = true;
                                        var boolused = 16;
                                        if(pointsfound[boolused] == false){
                                            newvalue = -1;
                                            updatescore();
                                            pointsfound[boolused] = true;
                                        } 
                                    }
                                    if(messagetest=="SORRY" || messagetest=="I AM SORRY"|| messagetest=="I'M SORRY") {
                                        usespecificquote = true;
                                        specificquote = "Oh okay.";
                                    }
                                    if(messagetest=="BLACK" || messagetest=="BLUE"|| messagetest=="GREEN"|| messagetest=="RED"|| messagetest=="ORANGE"|| messagetest=="BROWN") {
                                        usespecificquote = true;
                                        specificquote = "This isn't a colour guessing game.";
                                        var boolused = 17;
                                        if(pointsfound[boolused] == false){
                                            newvalue = 1;
                                            updatescore();
                                            pointsfound[boolused] = true;
                                        } 
                                    }
                                    if(messagetest=="BYE"||messagetest=="LEAVE"||messagetest=="GOODBYE") {
                                        usespecificquote = true;
                                        specificquote = "Okay, bye.";
                                        prevgame = "HOLDLINE";
                                        goprev = true;
                                        var boolused = 18;
                                        if(pointsfound[boolused] == false){
                                            newvalue = midscore;
                                            updatescore();
                                            pointsfound[boolused] = true;
                                        } 
                                    }
                                }
                                if(gamemode=="DEVIL"){
                                    if(messagetest=="FLESHWALL"||messagetest=="FLESHWALLS"||messagetest=="THEFLESHWALL"||messagetest=="FLESHWALL"||messagetest.includes("FLESHWALL")||messagetest.includes("FLESH WALL")){
                                        usespecificquote = true;
                                        specificquote = "<p>THE MAGNIFICENT FLESH WALL, THAT SQUIRMS AWAY... </p><p>THE MAGNIFICENT FLESH WALL... IT MAKES ME STAY</p><p>TO JUST ADMIRE, ITS TWISTED BEAUTY</p><p>FOR ITS BLOOD AND SUFFERING TASTES QUITE FRUITY!</p>";
                                        var boolused = 10;
                                        if(pointsfound[boolused] == false){
                                            newvalue = bigscore;
                                            updatescore();
                                            pointsfound[boolused] = true;
                                        }   
                                    }
                                    if(messagetest=="HELL"){
                                        usespecificquote = true;
                                        specificquote = "THAT'S WHERE WE ARE, BITCH!";
                                        var boolused = 24;
                                        if(pointsfound[boolused] == false){
                                            newvalue = bigscore;
                                            updatescore();
                                            pointsfound[boolused] = true;
                                        } 
                                    }
                                    if(messagetest=="HEAVEN"){
                                        usespecificquote = true;
                                        specificquote = "YOU DEFINITELY AIN'T GETTING THERE IF YOU'RE HERE WITH ME!";
                                        var boolused = 25;
                                        if(pointsfound[boolused] == false){
                                            newvalue = lilscore;
                                            updatescore();
                                            pointsfound[boolused] = true;
                                        } 
                                    }
                                    if(messagetest=="LOL"||messagetest=="HAHA"){
                                        usespecificquote = true;
                                        specificquote = "YEAH... FUNNY STUFF! >:)";
                                    }
                                    if(messagetest=="HI"||messagetest=="HELLO"||messagetest=="GREETINGS"||messagetest=="HOWDY"||messagetest=="HEY"||messagetest=="SUP"){
                                        usespecificquote = true;
                                        specificquote = "HELLO THERE... >:)";
                                        welcomed = true;
                                    }
                                    if(messagetest=="FUCK YOU"||messagetest=="FUCKYOU"||messagetest=="FUCKYA"||messagetest=="FUCK YOU!"||messagetest=="FUCK YOU."||messagetest.includes("FUCKYOU")){
                                        usespecificquote = true;
                                        specificquote = "HAHA! >:D I'M THE DEVIL, DON'T YOU KNOW I'M GOING TO RAPE YOU FOR ETERNITY? <b>8======D</b>";
                                    }
                                    if(messagetest=="SORRY" || messagetest=="I AM SORRY"|| messagetest=="I'M SORRY") {
                                        usespecificquote = true;
                                        specificquote = "Don't be!";
                                    }
                                    if(messagetest=="WAR") {
                                        usespecificquote = true;
                                        specificquote = "YES! WAR! LOTS AND LOTS OF VIOLENCE AND DEATH!";
                                                                            //Copy this and give a unique number to add a one time score addition.
                                    var boolused = 46;
                                    if(pointsfound[boolused] == false){
                                        newvalue = bigscore;
                                        updatescore();
                                        pointsfound[boolused] = true;
                                    } 
                                    }
                                    if(messagetest=="LOVE"||messagetest=="ILOVEYOU") {
                                        usespecificquote = true;
                                        specificquote = "NOT ALLOWED! HATE ONLY!";
                                    }
                                    if(messagetest=="BYE"||messagetest=="LEAVE"||messagetest=="LEAVE HELL"||messagetest=="EXIT HELL"||messagetest=="ESCAPE HELL"||messagetest=="ESCAPE") {
                                        usespecificquote = true;
                                        specificquote = "YOU CAN NEVER LEAVE!";
                                    }
                                    if(messagetest=="ILOVEJESUS"||messagetest=="JESUS"||messagetest=="PRAISEGOD"||messagetest=="HAILMARY") {
                                        usespecificquote = true;
                                        specificquote = ":| Fuck this shit, I'm out. For now. >:)";
                                        prevgame = "HOLDLINE";
                                        gamemode = "DEVIL";
                                        goprev = true;
                                    //Copy this and give a unique number to add a one time score addition.
                                    var boolused = 64;
                                    if(pointsfound[boolused] == false){
                                        newvalue = 777;
                                        updatescore();
                                        pointsfound[boolused] = true;
                                    } 
                                    }
                                }
                                if(gamemode=="FUTURE"){
                                    if(messagetest=="BYE"||messagetest=="LEAVE"||messagetest=="GOODBYE") {
                                        usespecificquote = true;
                                        specificquote = "Goodbye and safe travels.";
                                        prevgame = "HOLDLINE";
                                        goprev = true;
                                    }
                                    if(messagetest=="NO"||messagetest=="NAH"||messagetest=="NOPE"){
                                        var randomIndex = Math.floor(Math.random() * 2);
                                    if (randomIndex == 0) {
                                        specificquote = "It is good to be amused by life! :)";
                                    } else {
                                        specificquote = "Sometimes it is best to take things a bit more seriously.";
                                    }
                                        usespecificquote = true;
                                    }
                                    if(messagetest=="LOVE"||messagetest=="LOVEYOU"||messagetest=="ILOVEYOU"||messagetest=="LOVEU"||messagetest=="ILOVEU"||messagetest=="I LOVE YOU"){
                                        usespecificquote = true;
                                        if (randomIndex == 0) {
                                        specificquote = ":D Love makes the hidden strings that keep us together!";
                                    }else if (randomIndex == 1) {
                                        specificquote = "I love you!";
                                    }else if (randomIndex == 2) {
                                        specificquote = "You love me? I'm flattered! I love you too!";
                                    }else if (randomIndex == 3) {
                                        specificquote = "LOVE, LOVE, LOVE!";
                                    }else if (randomIndex == 4) {
                                        specificquote = "LOVE CAN HURT, BUT IT'S WORTH IT TO FEEL ALIVE.";
                                    } else {
                                        specificquote = "ALL PAIN FADES AND ALL TRUE LOVE STAYS.";
                                    }
                                    }
                                    if(messagetest=="HI"||messagetest=="HELLO"||messagetest=="GREETINGS"||messagetest=="HOWDY"||messagetest=="HEY"||messagetest=="SUP"){
                                        usespecificquote = true;
                                        specificquote = "Hello! What are you thinking about?";
                                    }
                                    if(messagetest=="FUCK YOU"||messagetest=="FUCKYOU"||messagetest=="FUCKYA"||messagetest=="FUCK YOU!"||messagetest.includes("FUCKYOU")){
                                        usespecificquote = true;
                                        specificquote = "BAD KARMA.";
                                        prevgame = "DEVIL";
                                        goprev = true;
                                    }
                                    if(messagetest=="SORRY" || messagetest=="I AM SORRY"|| messagetest=="I'M SORRY") {
                                        usespecificquote = true;
                                        if(!saidsorry||saidsorry==null||saidsorry==undefined){
                                            //First iteration.
                                            specificquote = "What you are sorry for, I forgive you.";
                                            var saidsorry = true;
                                        }else{
                                            //Second iteration.
                                            specificquote = "What you know inside that you feel deep regret for, I sincerely forgive you.";
                                            var saidsorry = false;
                                        }
                                    }
                                    if(messagetest=="PREDICT"||messagetest=="PREDICTION") {
                                        usespecificquote = true;
                                        specificquote = "I am not one to say anything with certainty. After all, is anything truly certain?";
                                    }
                                }
                                //the hold line has some answers for you.
                                if(gamemode=="HOLDLINE"){
                                    
                                    if(messagetest=="HI"||messagetest=="HELLO"||messagetest=="GREETINGS"||messagetest=="HOWDY"||messagetest=="HEY"||messagetest=="SUP"){
                                        usespecificquote = true;
                                        specificquote = "...Hello?";
                                    }
                                    if(messagetest=="FLESHWALL"||messagetest=="FLESH WALL"||messagetest=="THE FLESH WALL"||messagetest=="FLESHWALL"||messagetest.includes("FLESHWALL")||messagetest.includes("FLESH WALL")){
                                        usespecificquote = true;
                                        specificquote = "If you want to embrace the flesh wall, please say hell and we will promptly send you to hell.";
                                    }
                                    if(messagetest=="NO"||messagetest=="NOPE"||messagetest=="NAH") {
                                        usespecificquote = true;
                                        specificquote = "Unable to process negative request. Please avoid creating further delays.";
                                    }
                                    if(messagetest=="YES"||messagetest=="YEP"||messagetest=="OKAY"||messagetest=="YEAH") {
                                        usespecificquote = true;
                                        specificquote = "YOUR WILLINGNESS TO CO-OPERATE HAS BEEN NOTICED. WE WILL USE THIS TO SCALE FASTER AGENTS TOWARDS MORE DEMANDING CUSTOMERS, NOW THAT WE HAVE THE DATA THAT YOU ARE ABLE TO AFFIRM MORE POSITIVE RESPONSES TO WHAT MAY BE A NEGATIVE SITUATION TO OTHERS.";
                                    }
                                    if(messagetest=="SOMETHING"||messagetest=="SOMETHING.") {
                                        usespecificquote = true;
                                        specificquote = "Yeah, you're hilarious.";
                                    }
                                    if(messagetest=="WHAT"||messagetest=="WHAT IS THIS") {
                                        usespecificquote = true;
                                        specificquote = "You're in the holding line. It's a place where you get dropped when a character is done talking. This is your Timeout zone so that they can get some rest.";
                                    }
                                    if(messagetest=="BEEP"||messagetest=="BLIP"||messagetest=="BOOP") {
                                                                            //Copy this and give a unique number to add a one time score addition.
                                    var boolused = 76;
                                    if(pointsfound[boolused] == false){
                                        newvalue = 10101;
                                        updatescore();
                                        pointsfound[boolused] = true;
                                    } 
                                        var randomIndex = Math.floor(Math.random() * 6);
                                    if (randomIndex == 0) {
                                        specificquote = "... BLIP?";
                                    }else if (randomIndex == 1) {
                                        specificquote = "BEEP BOOP BEEP!";
                                    }else if (randomIndex == 2) {
                                        specificquote = "BOOPA DOOPA DOO, AND YOU?";
                                    }else if (randomIndex == 3) {
                                        specificquote = "BZBZZZZBZZZZZZZZZBBBBBZZZZZBZBBZZ!";
                                    }else if (randomIndex == 4) {
                                        specificquote = "Beep Beeeeeeeeeep.";
                                    } else {
                                        specificquote = "Boop.";
                                    }
                                    }
                                    if(messagetest=="REPRESENTATIVE") {
                                        var boolused = 26;
                                        if(pointsfound[boolused] == false){
                                            newvalue = bigscore;
                                            updatescore();
                                            pointsfound[boolused] = true;
                                        } 
                                        usespecificquote = true;
                                        specificquote = "There are no current representatives. Feel free to use breathing techniques to increase your patience threshold.";
                                    }
                                    if(messagetest=="REPRESENTATIVES") {
                                        usespecificquote = true;
                                        specificquote = "There are NO representatives available. Got that?";
                                    }
                                    if(messagetest=="OPERATOR") {
                                        var boolused = 27;
                                        if(pointsfound[boolused] == false){
                                            newvalue = lilscore;
                                            updatescore();
                                            pointsfound[boolused] = true;
                                        } 
                                        usespecificquote = true;
                                        specificquote = "Operator? You're here alone, on your own.";
                                    }
                                    if(messagetest=="FUCK YOU"||messagetest=="FUCKYOU"||messagetest=="FUCKYA"||messagetest=="FUCK YOU!"||messagetest.includes("FUCKYOU")){
                                        usespecificquote = true;
                                        specificquote = "Very rude... No wonder nobody wants to talk to you.";
                                        var boolused = 28;
                                        if(pointsfound[boolused] == false){
                                            newvalue = lilscore;
                                            updatescore();
                                            pointsfound[boolused] = true;
                                        } 
                                    }
                                    if(messagetest=="BYE"||messagetest=="LEAVE"||messagetest=="GOODBYE") {
                                        usespecificquote = true;
                                        specificquote = "Bye? Where are you going?";
                                        var boolused = 29;
                                        if(pointsfound[boolused] == false){
                                            newvalue = midscore;
                                            updatescore();
                                            pointsfound[boolused] = true;
                                        } 
                                    }
                                }
                                check = true;
                                //Augustus is looking for code words.
                                if(gamemode=="AUGUSTUS"){
                                    //
                                }
                }else{
                    failure = true;
                    check = true;
                    //shouldn't print anything.
                }
            if(check){
                //Makes sure temp is on if you're getting a temp character answer.
                if(tempcharacternow){
                    gamemode = "TEMP";
                }
                //checking gamemodes...
                if(gamemode=="CHOC"){
                    responsetime = 750;
                    if(!milkmode){
                    persona = "Chocolate";
                    }else{
                        persona = "Milk Chocolate";
                    }
                    responses = chocresponses;
                    count = countchoc;
                     countchoc ++;
                }
                if(gamemode=="PISSED"){
                    responsetime = 350;
                    persona = "HOT CHOCOLATE";
                        responses = pissedresponses;
                        count = countpissed;
                        countpissed ++;
                }
                if(gamemode=="SADGIRL"){
                    responsetime = 500;
                    persona = "DEPRESSION";
                    responses = sadgirlresponses;
                    count = countsadgirl;
                    countsadgirl ++;
                }
                if(gamemode=="AUGUSTUS"){
                        responsetime = 700;
                        responses = augustresponses;
                        persona = "Augustus";
                        count = countaugust;
                        countaugust ++;
                }
                if(gamemode=="WHITE"){
                        responsetime = 700;
                        responses = whitechocresponses;
                        persona = "White Chocolate";
                        count = countwhitechoc;
                        countwhitechoc ++;
                }
                if(gamemode=="HOLDLINE"){
                    responsetime = 750+(Math.random()*350);
                    persona = "Hold Line";
                    responses = holdingresponses;
                    count = countholding;
                    countholding++;
                }
                if(gamemode=="CHEESE"){
                    responsetime = 800;
                    persona = "CHEESE";
                        responses = cheeseresponses;
                        count = countcheese;
                        countcheese ++;
                }
                if(gamemode=="MOTIVATOR"){
                    responsetime = 800;
                    persona = "MOTIVATION";
                        responses = motivationresponses;
                        count = countmotivator;
                        countmotivator ++;
                        var boolused = 31;
                        if(pointsfound[boolused] == false){
                            newvalue = midscore;
                            updatescore();
                            pointsfound[boolused] = true;
                        } 
                }
                //we built the silly sausage right here.
                if(gamemode=="SILLY"){
                                                        //Copy this and give a unique number to add a one time score addition.
                                                        var boolused = 75;
                                                        if(pointsfound[boolused] == false){
                                                            newvalue = Math.random()*10;
                                                            updatescore();
                                                            pointsfound[boolused] = true;
                                                        } 
                    responsetime = 750;
                    persona = "SILLY SAUSAGE";
                    var sausageresponses = [
                        "KETTLE","PUNK","GEESE","POOP","JOINT","NOOSE","IS","ISN'T","WILL","TO","THE","ON","MICE","PISSING","MADNESS",
                        "ROWBOAT EXERCISE","MIST","URINAL","OUTSIDE","FOREST","LIGHTNING","CAME","STUMBLING","FIGHTING",
                        "CLAWING","BOUNCING","BREAKING","JINGLING","CHERRY PIE","DISASTER","BONANZA","OUTBREAK",
                        "THE","BUT","YET","HOW","BELLS","LEAPING","AND","WITH","CIRCUS","CLOWNS","UNDERWEAR","FILTHY","PRICELESS","DOG","MONKEY","RODEO","FOR","TRYING","INVALIDITY",
                    ]
                    // Calculate the number of repeats
                    var numRepeats = Math.floor(Math.random() * (5 - Math.ceil(sausageresponses.length / 4) + 1)) + Math.ceil(sausageresponses.length / 4);

                    // Initialize sillysausagespeech
                    var sillysausagespeech = "";

                    // Loop numRepeats times
                    for (var i = 0; i < numRepeats; i++) {
                        // Generate a random index
                        var sausagerandomizer = Math.floor(Math.random() * sausageresponses.length);

                        // Append the corresponding response to sillysausagespeech
                        sillysausagespeech += " "+sausageresponses[sausagerandomizer];
                    }

                    // Add a final exclamation mark
                    sillysausagespeech += "!";

                    // Set specificquote to sillysausagespeech
                    specificquote = sillysausagespeech;
                    // Reset count and set usespecificquote to true
                    count = 0;
                    usespecificquote = true;
                }
                if(gamemode=="FUTURE"){
                    responsetime = 1000;
                    persona = "Future";
                        responses = futureresponses;
                        count = countfuture;
                        countfuture ++;
                }
                if(gamemode=="DEVIL"){
                    responsetime = 666;
                    persona = "SATAN";
                        responses = devilresponses;
                        count = countdevil;
                        countdevil ++;
                }
                if(gamemode=="TEMP"){
                    responsetime = 500+(Math.random()*250);
                    usespecificquote = true;
                    if(!tempcharacternow){
                    persona = "HELPING HAND"; 
                    }else{
                    persona = tempcharacter;
                    }
                    count = 0;
                    responses[count] = specificquote;
                    response = specificquote;
                    usespecificquote = true;
                    goprev = true;
                }
                if(gamemode=="QUEST"){
                    responsetime = 1200;
                    //should always use specific quote when in quest.
                    usespecificquote = true;
                    persona = "QUESTMASTER";
                }
            }
                //runs thinker check, which updates thinking image.
                checkthinker();

            //play thinking animation.
            element.style.animation = '';
            document.getElementById('thinking-chat').style.animationPlayState = 'running';

                // Simulate AI response after a delay
                    setTimeout(function(){
                        //release user's chat controls.
                        userInput.disabled = false;
                        document.querySelector(".send-button").disabled = false;
                        userInput.focus();
                        if(!failure){
                            // Generate AI response
                            //beginning if using a specific quote.
                            if(usespecificquote) {
                                response = specificquote;
                            }else if(count>=responses.length){
                                if (gamemode == "CHOC") {
                                    var randomIndex = Math.floor(Math.random() * 4); // Generate a random index between 0 and 3
                                    if (randomIndex == 0) {
                                        response = "I'm done with you. You bring out the worst of me.";
                                        goprev = true;
                                   prevgame = "HOLDLINE";
                                    } else if (randomIndex == 1) {
                                        response = "OKAY, LEAVE ME ALONE FOR A BIT NOW.";
                                    goprev = true;
                                   prevgame = "HOLDLINE";
                                    } else if (randomIndex == 2) {
                                        response = "TALK TO SOMEBODY ELSE.";
                                        goprev = true;
                                     prevgame = "WHITE";
                                    } else {
                                        response = "That's all I have to say. So I guess I could say it all again! In fact, I will!";
                                        countchoc = 0;
                                        gamemode = "CHOC";
                                    }
                                }else if(gamemode=="CHEESE"){
                                   response = "Gotta go! Cheesin' it!";
                                   countcheese = 0;
                                   goprev = true;
                                   prevgame = "HOLDLINE";
                                }else if(gamemode=="DEVIL"){
                                   response = "I'm bored. You're boring. I have to go now. I have a busy schedule of mercilessly tormenting people.";
                                   countdevil = 0;
                                   goprev = true;
                                   prevgame = "HOLDLINE";
                                }else if(gamemode=="FUTURE"){
                                    response = "You literally got every response from me. How pointless that makes it.";
                                    countfuture = 0;
                                    persona = "Future";
                                    goprev = true;
                                   prevgame = "DEVIL";
                                   var responseshuffle = futureresponses.sort(() => Math.random() - 0.5);
                                   futureresponses = responseshuffle;
                                }else if(gamemode=="WHITE"){
                                    response = "Actually I'm late and have to run, see you soon!";
                                    persona = "White Chocolate";
                                    goprev = true;
                                   prevgame = "HOLDLINE";
                                }else if(gamemode=="PISSED"){
                                    response = "YOU KNOW WHAT? GO TO HELL! I'M FUCKIN' DONE WITH YOU.";
                                    goprev = true;
                                   prevgame = "DEVIL";
                                }else if(gamemode=="HOLDLINE"){
                                    response = "YOUR EXPERIENCE IS IMPORTANT.";
                                    countholding = 0;
                                }else if(gamemode=="AUGUSTUS"){
                                    response = "Alright, I must venture now. Well wishes with everything, "+yourusername+"!";
                                    countaugust = 0;
                                    persona = "Augustus";
                                    goprev = true;
                                   prevgame = "HOLDLINE";
                                }else if(gamemode=="QUEST"){
                                   //Do nothing, because it's quest mode.
                                   var response = responses[count]; 
                                }else if(gamemode=="SILLY"){
                                   //Do nothing because it will still be random. Count doesn't really matter here.
                                   var response = responses[count]; 
                                }else if(gamemode=="MOTIVATOR"){
                                    response = "Alright, "+yourusername+"! I gotta run!";
                                    countmotivator = 0;
                                    persona = "MOTIVATOR";
                                    goprev = true;
                                   prevgame = "FUTURE";
                                   var responseshuffle = motivationresponses.sort(() => Math.random() - 0.5);
                                   motivationresponses = responseshuffle;
                                   var response = responses[count];
                                }else if(gamemode=="SADGIRL"){
                                    response = "Thanks for listening to me... I don't know, should I go? You can stick around and keep talking. Nobody else really listens anyway.";
                                    countsadgirl = 0;
                                    var boolused = 19;
                                    if(pointsfound[boolused] == false){
                                        newvalue = bigscore;
                                        updatescore();
                                        pointsfound[boolused] = true;
                                    } 
                                    var responseshuffle = sadgirlresponses.sort(() => Math.random() - 0.5);
                                    sadgirlresponses = responseshuffle;
                                }
                                }else{
                                //If count IS < response length.
                                 var response = responses[count];

                                //We try to kick you out of future mode after the 1 intro response and 5 random responses.
                                if(gamemode=="FUTURE"&&count==8){
                                response = "Anyway, I'd better go. This should do for the time being!";
                                 goprev = true;
                                prevgame = "HOLDLINE";
                                var boolused = 60;
                                if(pointsfound[boolused] == false){
                                    newvalue = bigscore;
                                    updatescore();
                                    pointsfound[boolused] = true;
                                } 
                                 }
                                }
                        //makes sure helping hand has its own style.

                        if(!questmode){
                        //msgformat is referred to as what specific div class to set the message.
                        var msgformat = gamemode;
                        //allows random format if temp and not helping hand.
                            if(gamemode=="TEMP"&&tempcharacternow){
                                var randomIndex = Math.floor(Math.random() * 5);
                                    if (randomIndex == 0) {
                                        msgformat = "RANDOM1";
                                    } else if (randomIndex == 1) {
                                        msgformat = "RANDOM2";
                                    } else if (randomIndex == 2) {
                                        msgformat = "RANDOM3";
                                    }else if (randomIndex == 3) {
                                            msgformat = "RANDOM4";    
                                    }else{
                                        msgformat = "RANDOM5";
                                    }
                            //make sure to turn this off.
                            tempcharacternow = false;
                            }
                        //CHATPRINT PRINTCHAT 
                        //Show response in chat room.

                        //Checks to see if response isn't working.
                        if(response==undefined||response==null){
                            response = "THERE HAS BEEN A GRAVE ERROR... <a href='mailto:admin@talktochocolate.xyz' target='_blank'>PLEASE EMAIL admin@talktochocolate.xyz</a> :) FEEL FREE TO SEND A CHAT LOG TOO, JUST TYPE DOWNLOAD AND THEN ATTACH THE FILE TO YOUR EMAIL.";
                        }
                        //Checks to see if you got any points.
                        var scoreformat = "";
                        var scoresay = "";
                        if(newvalue>0){
                            var scoreformat = "<p class='scorereaction'><b>";
                            scoresay = "+"+newvalue;
                        }else if(newvalue<0){
                            var scoreformat = "<p class='scorereaction'><b>";
                            scoresay = ""+newvalue;
                        }
                        
                        chatroom.innerHTML += '<div class="message '+msgformat+'-message"><p><strong>'+ parent.persona+": </strong>" + response + scoreformat + scoresay+'</p></b></div>';

                        }else if(validaction){
                            //Shows quest action if you're in quest mode and say a valid command.
                            chatroom.innerHTML += '<div class="message user-message">'+yourusername+'<strong>: </strong>'+ messagetest + '</div>';
                            chatroom.innerHTML += '<div class="message '+gamemode+'-message"><strong> QUESTMASTER: </strong>'+ questres + '</div>';
                        }else{
                            //Questmaster can't do anything with this.
                            //chatroom.innerHTML += '<div class="message '+gamemode+'-message"><strong> QUESTMASTER: TRY SOMETHING ELSE! </strong>'+ questres + '</div>';
                        }
                        
                        //reset score adding system.
                        newvalue = 0;

                        //Scroll down here.
                        ScrollDownNow();
                        //finally, returns temporary game modes back to where you were already. 
                        if(goprev){
                        gamemode = prevgame;
                        checkthinker();
                        }

                        //stops animation on thinker.
                       var element = document.getElementById('thinking-chat');
                        element.style.animationPlayState = 'paused';
                        element.style.animation = 'none';
                        element.offsetHeight;
                    }else{
                        //failure.
                        //stops animation on thinker.
                        var element = document.getElementById('thinking-chat');
                        element.style.animationPlayState = 'paused';
                        element.style.animation = 'none';
                        element.offsetHeight;
                    }
                
             //finishes the sendmessage process and allows new messages from user.
            beginsend = false;
            },responsetime);
        }
        
        document.getElementById("userInput").addEventListener("keydown", function(event) {
        // Check if the "Enter" key is pressed
        if (event.key === "Enter") {
            // Prevent the default behavior of the "Enter" key (submitting the form)
            event.preventDefault();
            // Sends message, if message isn't already in process already.
            if(!beginsend){
                sendMessage();
            }
        }
    });

    //Check to see if you've turned the timer messages off.
    //10 minute timer: shames you into donating
    setTimeout(function() {
                                            //Copy this and give a unique number to add a one time score addition.
                                            var boolused = 77;
                                            if(pointsfound[boolused] == false){
                                                newvalue = bigscore;
                                                updatescore();
                                                pointsfound[boolused] = true;
                                            } 
        if(!timeroff){
            response = "YOU'VE SPENT 10 MINUTES HERE! IF YOU'RE HAVING FUN, MAYBE YOU COULD SAY THANKS AND DONATE SOME MONEY! THAT'S RIGHT, I'M AN ANNOUNCEMENT DESIGNED TO SHAMELESSLY SELL YOU SOMETHING YOU ALREADY HAVE FOR FREE.";
            updatescore();
            document.getElementById("chatroom").innerHTML += '<div class="message TIMER-message"><strong>TIMER: </strong>' + response + '</div>';
            ScrollDownNow();
        }
        }, 600000); //600000 is 10 minutes.

    //20 minute timer: shames you much, much more.
    setTimeout(function() {
                                            //Copy this and give a unique number to add a one time score addition.
                                            var boolused = 78;
                                            if(pointsfound[boolused] == false){
                                                newvalue = massivescore;
                                                updatescore();
                                                pointsfound[boolused] = true;
                                            } 
            response = "Wow.  You've been here for 20 minutes. Did you leave this open, or are you entertaining yourself this much? I'm going to put my hand out once again and say donate if you enjoy. There is an exclusive mode for donors.";
            updatescore();
            document.getElementById("chatroom").innerHTML += '<div class="message TIMER-message"><strong>TIMER: </strong>' + response + '</div>';
            ScrollDownNow();
        }, 1200000); // 1200000 is 20 minutes.
    
        //Bonus: play a song if you ask nicely :)
        //The song playlist:
        var songplaylist = [
            "retro",
            "ocean",
            "braincells",
            "enhancing",
            ]
        //music playlist shuffle.
        var musicshuffle = songplaylist.sort(() => Math.random() - 0.5);
        songplaylist = musicshuffle;
        var nowplaying = null;
        var thisaudio = document.getElementById("myAudio");;
        var songcount = 0;

        function Playasong() {
    setTimeout(function() {
        if(!thisaudio) {
            thisaudio = new Audio();
            thisaudio.id = "myAudio";
        }
        if(nowplaying) {
            nowplaying.pause();
        }
        if(songcount >= songplaylist.length){
        //Plays the first song on playlist if you're out of songs.
            songcount = 0;
            songtitletoplay = songplaylist[songcount];
            document.getElementById("chatroom").innerHTML += '<div class="message MUSIC-message">NOW PLAYING: '+songtitletoplay+' (Track '+(songcount+1)+') </div>';
            ScrollDownNow();
            thisaudio.src = "audio/"+songtitletoplay+".mp3";
            thisaudio.play();
            nowplaying = thisaudio;
            songcount++;
        } else {
        //Plays the next song.
            songtitletoplay = songplaylist[songcount];
            document.getElementById("chatroom").innerHTML += '<div class="message MUSIC-message">NOW PLAYING: '+songtitletoplay+' (Track '+(songcount+1)+') </div>';
            ScrollDownNow();
            thisaudio.src = "audio/"+songtitletoplay+".mp3";
            thisaudio.play();
            nowplaying = thisaudio;
            songcount++;
        }
    }, responsetime); 
}
    //stops the music if requested. Works as fast as response time.
function Stopmusic(){
    setTimeout(function() {
    if(nowplaying) {
        nowplaying.pause();
        nowplaying.currentTime = 0;
    }
},responsetime);
}

//reset function. Works after a second delay from the response time.
function reloadpage(){
    setTimeout(function() {
        location.reload();
    },responsetime+1000);
}

//Download your chat log!
function downloadlog() {
    // Get the chatroom content
    let chatroomContent = document.getElementById('chatroom').innerHTML;
    currenttime = new Date().toLocaleString();
    var messageElement = document.querySelector('.message'); // replace '.message' with the actual selector of your message element
    var chatroomElements = document.querySelectorAll('.chat-container');
    var style = window.getComputedStyle(messageElement);
    var allstyle = style.cssText;

    // Get all style and link (CSS) elements from the head
    var styleElements = Array.from(document.head.querySelectorAll('style, link[rel="stylesheet"]'));

    // Initialize an empty string to hold all the styles
    var allStyles = '';

    // For each original style/link element...
    styleElements.forEach(function(styleElement) {
        // If it's a style element, copy its text content
        if (styleElement.tagName.toLowerCase() === 'style') {
            allStyles += styleElement.textContent;
        }
        // If it's a link element, copy its href
        else if (styleElement.tagName.toLowerCase() === 'link') {
            allStyles += '@import url("' + styleElement.href + '");';
        }
    });

    var downloadtitle = (allstyle+"<div class='TEMP-message'><p><h1>TALK TO CHOCOLATE / CHAT LOG.</p><p>SCORE: "+myscore+" / PRINT TIME: " +currenttime+"</h1></p><br></div>").toUpperCase();
    let contentWithDiv = '<style>' + allStyles + '</style><div id="chat-container">'+downloadtitle + chatroomContent+"<br><p>END OF CHAT.</p>";
    // Create a Blob with the chatroom content
    let file = new Blob([contentWithDiv], {type: 'text/html'});
    var downloadfilepath = URL.createObjectURL(file);

    // Create a link to download the file
    let a = document.createElement('a');
    a.href = URL.createObjectURL(file);
    var filenamerandomizer = Math.floor(Math.random() * 10);
    var filenamerandomizer2 = Math.floor(Math.random() * 10000);
    var finalfilename = 'talktochocolate_chatlog_'+filenamerandomizer+'_'+filenamerandomizer2+'.html';
    a.download = finalfilename;
    a.style.display = 'none';
    // Append the link to the body
    document.body.appendChild(a);

    // Simulate a click on the link
    a.click();

    // Remove the link from the body
    document.body.removeChild(a);

    //Notify user of download.
    document.getElementById("chatroom").innerHTML += '<div class="message DOWNLOAD-message"><strong>DOWNLOADING CONVERSATION LOG:</strong><br><a href="'+downloadfilepath+'" target="_blank">'+finalfilename+'</a></div>';
    ScrollDownNow();
}

//Cow notifications.
function milksend(){
var cowmsg = "MOO!";
var randomIndex = Math.floor(Math.random() * 15); 
if (randomIndex == 0) {
cowmsg = "MOOOO! (MILK GOES ALL OVER YOU AND YOUR PRECIOUS BELONGINGS)";
                                    //Copy this and give a unique number to add a one time score addition.
                                    var boolused = 3;
                                    if(pointsfound[boolused] == false){
                                        newvalue = 1;
                                        updatescore();
                                        pointsfound[boolused] = true;
                                    } 
mooing = true;
} else if (randomIndex == 1){
cowmsg = "MOO, MOO MOO MOOOOOOOOOOOO.";
mooing = true;
} else if (randomIndex == 2){
cowmsg = "Moo moo.";
mooing = true;
}else{
cowmsg = "This message should never be received by anybody ever."
mooing = false;
}

//makes moo on chat.
if(mooing){
    setTimeout(function(){
    document.getElementById("chatroom").innerHTML += '<div class="message COW-message"><strong>COW: </strong>'+cowmsg+'</div>';
ScrollDownNow();
    },milkresponse);
}
}

function checkthinker(){
    //replaces thinking image.
    thinkingurl = "images/think/thinking.png";
    if(gamemode!=="TEMP"){
    thinkingurl = "images/think/thinking"+gamemode.toLowerCase()+".png";
    }else{
    thinkingurl = "images/think/thinking.png";
    }
    var element = document.getElementById('thinkingicon');
    element.src = thinkingurl;
    element.onError = function(){
    thinkingurl = "images/think/thinking.png";
    var element = document.getElementById('thinkingicon');
    element.src = thinkingurl;
    }
}

//to scroll the chat room to bottom.
function ScrollDownNow(){
    document.getElementById("greaterchatroom").scrollTop = document.getElementById("greaterchatroom").scrollHeight;
}

function runclearmode(){
    //clears the chatroom.
    document.getElementById("chatroom").innerHTML = "";
    //scrolls down.
    ScrollDownNow();
}

//Updates the score.
function updatescore(){
    var oldscore = myscore;
    myscore = Math.floor((oldscore + newvalue) * 100) / 100;
    scoretext = myscore;
    var printscore = false;
    if(myscore!==oldscore){
    printscore = true;
    }
    if(printscore){

        //A short delay om updating score.
        setTimeout(function() {
            //test to ensure score is working via the chat.
            // document.getElementById("chatroom").innerHTML += '<div class="message TEMP-message"><b>YOUR TOTAL SCORE: '+myscore+'</b></div>';
            document.getElementById("scoredisplay").textContent = myscore;
        }, responsetime);
    
    }

}

//Checks if the URL has something already lined up to say.

if (urlParams.has('say')) {
   var tryinput = urlParams.get('say').toUpperCase();
    var userINPUT = document.getElementById("userInput");
    userINPUT.value = tryinput;
    
    /* Try without
    beginsend = false;
    sendMessage();
    */
}


//Displays the score on load (should be 0 by default).
window.onload = function(){
updatescore();
//Puts the input in focus immediately.
document.getElementById("userInput").focus();
}

    //The end of the script.
