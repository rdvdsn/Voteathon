class Entrant {
    constructor(id, name, link, category){
        this.id = id;
        this.name = name;
        this.link = link;
        this.category = category;
        this.catID = null;
        this.viewed_times = 0;
        this.points_awarded = 0;
    }
}

module.exports = {
    Entrant
}