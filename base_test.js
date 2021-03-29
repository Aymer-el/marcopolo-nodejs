export default {
    "stories": [
        {
            "_id": 1,
            "name" : "The unexplored East Land",
            "description": "In the far homeland, dream of expeditions...",
            "game-master" : ["id_player_sql"],
            "game-player" : ["5"]
        }
    ],
    "assets": [
        {
            "_id": "1",
            "story": 1,
            "name": "The Sword of Betgoodman",
            "type": "sword",
            "workingWith": ["characters"],
            "skills": [{"magic-attack": 12}, {"phyicsal-protection": "14"}],
            "players": ["2", "3", "4"]
        },
        {
            "_id": "2",
            "story": "1",
            "name": "The shield of Sabrousar",
            "type": "shield",
            "workingWith": ["characters"],
            "skills": [{"magic-protection": 12}, {"physical-protection": 14}],
            "assets": ["3"],
            "players": ["2"]
        },
        {
            "_id": "3",
            "story": "1",
            "name": "Diamond of the west",
            "type": "accessory",
            "workingWith": ["shield"],
            "skills": [{"mana": 12}],
            "players": ["2"]
        },
        {
            "_id": "4",
            "story": "1",
            "name": "Card of the East Land",
            "type": "card",
            "workingWith": ["Characters"],
            "skills": [],
            "players": ["1", "2"]
        },
        {
            "_id": "5",
            "story": "1",
            "name": "George Goodmann",
            "type": "characters",
            "workingWith": [],
            "skills": [],
        }
    ]
}