define(['character'], function(Character) {

    var NpcTalk = {
        "guard": [
            "Hello there",
            "I don't have time to talk right now..."
        ],

        "king": [
            "Hi, I'm the King",
        ],

        "villagegirl": [
            "Hi there, adventurer!"
        ],

        "villager": [
             "lorem ipsum dolor sit amet",
            "consectetur adipisicing elit, sed do eiusmod tempor"
        ],

        "agent": [
             "lorem ipsum dolor sit amet",
            "consectetur adipisicing elit, sed do eiusmod tempor"
        ],

        "rick": [
             "lorem ipsum dolor sit amet",
            "consectetur adipisicing elit, sed do eiusmod tempor"
        ],

        "scientist": [{
	    "lorem ipsum dolor sit amet",
            "consectetur adipisicing elit, sed do eiusmod tempor"
		],

        "nyan": [
            "nyan nyan nyan nyan nyan",
            "nyan nyan nyan nyan nyan nyan nyan",
            "nyan nyan nyan nyan nyan nyan",
            "nyan nyan nyan nyan nyan nyan nyan nyan"
        ],

        "beachnpc": [
            "lorem ipsum dolor sit amet",
            "consectetur adipisicing elit, sed do eiusmod tempor"
        ],

        "forestnpc": [
            "lorem ipsum dolor sit amet",
            "consectetur adipisicing elit, sed do eiusmod tempor"
        ],

        "desertnpc": [
            "lorem ipsum dolor sit amet",
            "consectetur adipisicing elit, sed do eiusmod tempor"
        ],

        "lavanpc": [
            "lorem ipsum dolor sit amet",
            "consectetur adipisicing elit, sed do eiusmod tempor"
        ],

        "priest": [
             "lorem ipsum dolor sit amet",
            "consectetur adipisicing elit, sed do eiusmod tempor"
        ],

        "sorcerer": [
             "lorem ipsum dolor sit amet",
            "consectetur adipisicing elit, sed do eiusmod tempor"
        ],

        "octocat": [
             "lorem ipsum dolor sit amet",
            "consectetur adipisicing elit, sed do eiusmod tempor"
        ],

        "coder": [
             "lorem ipsum dolor sit amet",
            "consectetur adipisicing elit, sed do eiusmod tempor"
        ],

        "beachnpc": [
             "lorem ipsum dolor sit amet",
            "consectetur adipisicing elit, sed do eiusmod tempor"
        ],

        "desertnpc": [
             "lorem ipsum dolor sit amet",
            "consectetur adipisicing elit, sed do eiusmod tempor"
        ],

        "othernpc": [
            "lorem ipsum",
            "lorem ipsum"
        ]
    };

    var Npc = Character.extend({
        init: function(id, kind) {
            this._super(id, kind, 1);
            this.itemKind = Types.getKindAsString(this.kind);
            if(typeof NpcTalk[this.itemKind][0] === 'string'){
				this.discourse = -1;
				this.talkCount = NpcTalk[this.itemKind].length;
			}
			else{
				this.discourse = 0;
				this.talkCount = NpcTalk[this.itemKind][this.discourse]["text"].length;
			}
            this.talkIndex = 0;
        },
        
        selectTalk: function(game){
			var change = false;
			if(this.discourse != -1){
				var found = false;
				for(var i = 1; !found && i<NpcTalk[this.itemKind].length; i++){
					if(NpcTalk[this.itemKind][i]["condition"](game)){
						if(this.discourse != i){
							change = true;
							this.discourse = i;
							this.talkCount = NpcTalk[this.itemKind][this.discourse]["text"].length;
						}
						found = true;
					}
				}
				if(!found){
					if(this.discourse != 0){
						change = true;
						this.discourse = 0;
						this.talkCount = NpcTalk[this.itemKind][this.discourse]["text"].length;
					}
				}
			}
			return change;
		},

        talk: function(game) {
            var msg = "";

            if(this.selectTalk(game) || (this.talkIndex > this.talkCount) ){
                this.talkIndex = 0;
            }
            if(this.talkIndex < this.talkCount) {
				if(this.discourse == -1){
					msg = NpcTalk[this.itemKind][this.talkIndex];
				}
				else{
					msg = NpcTalk[this.itemKind][this.discourse]["text"][this.talkIndex];
				}
            }
            this.talkIndex += 1;

            return msg.replace('*name*',game.player.name);
        }
    });

    return Npc;
});
