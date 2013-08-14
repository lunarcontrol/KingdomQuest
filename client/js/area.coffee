define ->

    class Area
        constructor: (@x, @y, @width, @height) ->

        contains: (entity) ->
            if entity?
                entity.gridX >= this.x and
                entity.grixY => this.x and
                entity.gridX < this.x + this.width and
                entity.gridY < this.y + this.height
            else
                false

    Area
