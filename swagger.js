export default {
    "openapi": "3.0.0",
    "info": {
      "version": "1.0.0",
      "title": "Marco Polo role play project API",
      "description": "This is the swagger of Marco Polo role play project"
    },
    "servers": [
        {
            "url": "http://localhost:3800",
            "description": "the main server"
        }
    ],
    "paths": {
      "/gamer/sign-in": {
        "post": {
          "summary": "Signin a gamer",
          "tags": [
            "Gamers"
          ],
          "description": "Sign-in gamer in system",

          "requestBody": {
              "required": true,
              "content": {
                  "application/json": {
                      "schema": {
                            "type": "object",
                            "properties": {
                                "username": {
                                    "type": "string",
                                    "uniqueItems": true
                                },
                                "password": {
                                    "type": "string"
                                }
                            },
                            "example": {
                                "username": "Fidge",
                                "password": "admin"
                            }
                        }
                  }
              }
          },

          "responses": {
            "200": {
              "description": "Sign In Success",
              "content": {
                  "application/json": {
                      "schema": {
                          "$ref": "#/components/schemas/Gamer"
                      }
                  }
              }
            },
            "401":{
              "description": "Login details are not valid!!"
            },
            "404":{
              "description": "Email is not registered!"
            },
            "500":{
              "description": "User login failed!!"
            }
          }
        }
      },
        "/gamer/sign-up": {
            "post": {
                "summary": "Sign up a gamer",
                "tags": [
                    "Gamers"
                ],
                "description": "Sign-up gamer in system",

                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                    "type": "object",
                                    "properties": {
                                        "username": {
                                            "type": "string",
                                            "uniqueItems": true
                                        },
                                        "email": {
                                            "type": "string",
                                            "uniqueItems": true
                                        },
                                        "password": {
                                            "type": "string"
                                        }
                                    },
                                    "example": {
                                        "username": "Fidge",
                                        "email": "fi.aymeric@gmail.com",
                                        "password": "admin"
                                    }
                                }
                        }
                    }
                },

                 "responses": {
                    "200": {
                        "description": "Sign Up Success",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Gamer"
                                }
                            }
                        }
                    },
                    "400":{
                    "description": "Username or password invalid"
                    },
                    "500":{
                    "description": "Sign Up has failed"
                    }
                }
            }
        },
        "/gamer/send-friend-request": {
            "post": {
                "summary": "Send a friend request to another gamer",
                "tags": [
                    "Gamers"
                ],
                "description": "Send friend requestion in system",

                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "gamer": {
                                        "type": "object",
                                        "properties": {
                                            "_id": {
                                                "type": "string"
                                            }
                                        }
                                    },
                                    "friend": {
                                        "type": "object",
                                        "properties": {
                                            "_id": {
                                                "type": "string"
                                            }
                                        }
                                    }
                                },
                                "example": {
                                    "gamer": {
                                        "_id": "6051b8bebb10564df0973171"
                                    },
                                    "friend": {
                                        "_id": "6051c4f8e8db05762879f1f6"
                                    }
                                }
                            }
                        }
                    }
                },

                 "responses": {
                    "200": {
                        "description": "Friend request sent",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "_id": {
                                            "type": "string"
                                        },
                                        "gamerOneId": {
                                            "type": "string"
                                        },
                                        "gamerTwoId": {
                                            "type": "string"
                                        } 
                                    }
                                }
                            }
                        }
                    },
                    "404":{
                    "description": "One or both of the gamers do not exists"
                    },
                    "500":{
                    "description": "Error from server"
                    }
                }
            }
        },
        "/gamer/respond-to-request": {
            "post": {
                "summary": "Respond to a friend request",
                "tags": [
                    "Gamers"
                ],
                "description": "Respond to a friend request in system",

                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "_id": {
                                        "type": "string"
                                    },
                                    "gamerOneId": {
                                        "type": "string"
                                    },
                                    "gamerTwoId": {
                                        "type": "string"
                                    }
                                },
                                "example": {
                                        "_id": "605b0da0903a7f5ce827863c",
                                        "gamerOneId": "6051b8bebb10564df0973171",
                                        "gamerTwoId": "6051c4f8e8db05762879f1f6"
                                }
                            }
                        }
                    }
                },

                "responses": {
                    "200": {
                        "description": "friend request accepted"
                    },
                    "404":{
                        "description": "One or both of the gamers do not exists"
                    },
                    "500":{
                        "description": "Error from server"
                    }
                }
            }
        },

        
        "/gamer/get-friends-list": {
            "get": {
            "summary": "get friend list",
            "tags": [
                "Gamers"
            ],
            "description": "get friend list",
            "parameters": [
                {
                    "name": "gamer_id",
                    "in": "query",
                    "description": "gamer id",
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "string",
                                "example": "605b0da0903a7f5ce827863c"
                            }
                        }
                    }
                }
            ],

            "responses": {
                    "200": {
                        "description": "Sign In Success",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/Gamer"
                                    }
                                }
                            }
                        }
                    },
                    "404":{
                        "description": "Gamer not found"
                    },
                    "500":{
                        "description": "Error from server"
                    }
                }
            }
        },


        "/gamer/get-friend-suggestions": {
            "get": {
            "summary": "get friend suggestions",
            "tags": [
                "Gamers"
            ],
            "description": "get friend suggestions",
            "parameters": [
                {
                    "name": "gamer_id",
                    "in": "query",
                    "description": "gamer id",
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "string",
                                "example": "605b0da0903a7f5ce827863c"
                            }
                        }
                    }
                }
            ],

            "responses": {
                    "200": {
                        "description": "get friend suggestions success",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/Gamer"
                                    }
                                }
                            }
                        }
                    },
                    "404":{
                        "description": "Gamer not found"
                    },
                    "500":{
                        "description": "Error from server"
                    }
                }
            }
        },


        "/gamer/get-friend-requests": {
            "get": {
            "summary": "get friend requests",
            "tags": [
                "Gamers"
            ],
            "description": "get friend requests",
            "parameters": [
                {
                    "name": "gamer_id",
                    "in": "query",
                    "description": "gamer id",
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "string",
                                "example": "605b0da0903a7f5ce827863c"
                            }
                        }
                    }
                }
            ],

            "responses": {
                    "200": {
                        "description": "get friend requests",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/FriendRequest"
                                    }
                                }
                            }
                        }
                    },
                    "404":{
                        "description": "Gamer not found"
                    },
                    "500":{
                        "description": "Error from server"
                    }
                }
            }
        },


        "/gamer/search-for-people": {
            "get": {
            "summary": "search for people",
            "tags": [
                "Gamers"
            ],
            "description": "search for people",
            "parameters": [
                {
                    "name": "gamer_id",
                    "in": "query",
                    "description": "gamer id",
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "gamer_id": {
                                        "type": "string"
                                    },
                                    "match": {
                                        "type": "string"
                                    }
                                },
                                "example": {
                                        "gamer_id": "605b0da0903a7f5ce827863c",
                                        "match": "Mat"
                                }
                            }
                        }
                    }
                }
            ],

            "responses": {
                    "200": {
                        "description": "people from search",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/FriendRequest"
                                    }
                                }
                            }
                        }
                    },
                    "404":{
                        "description": "Gamer not found"
                    },
                    "500":{
                        "description": "Error from server"
                    }
                }
            }
        }
    },

    "components": {
        "schemas": {
            "Gamer": {
                "properties": {
                    "_id": {
                        "type": "string"
                    },
                    "username": {
                        "type": "string",
                        "uniqueItems": true
                    },
                    "email": {
                        "type": "string",
                        "uniqueItems": true
                    },
                    "password": {
                        "type": "string"
                    },
                    "picture": {
                        "type": "string"
                    },
                    "description": {
                        "type": "string"
                    },
                    "friends": {
                        "type": "array",
                        "items": {
                            "$ref": "#/components/schemas/Gamer"
                        }
                    },
                    "accessToken": {
                        "type": "string"
                    }
                }
            },

            "FriendRequest": {
                "properties": {
                    "_id": {
                        "type": "string"
                    },
                    "gamerOneId": {
                        "type": "string"
                    },
                    "gamerTwoId": {
                        "type": "string"
                    }
                }
            }
        }
    }
}


