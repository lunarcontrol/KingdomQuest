define(['entity'], -> (Entity)
    class Item extends Entity
        constructor: (id, kind, type) ->
            super id, kind

            this.itemKind = Types.getKindAsString kind
            this.type = type
            this.wasDropped = false

        hasShadow: -> true

        onLoot: (player) ->
            if this.type == "weapon"
                player.switchWeapon this.itemKind
            else if this.type == "armor"
                player.armorloot_callback this.itemKind

        getSpriteName: ->
            "item-" + this.itemKind

        getLootMessage: ->
            this.lootMessage

    Item
