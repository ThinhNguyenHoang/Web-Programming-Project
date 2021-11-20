```
FOOD:
    GET: /food
        {
            "message": "Read food:result in success",
            "data": [
                {
                    "FoodID": "",
                    "FoodName": "",
                    "Picture": null,
                    "Price": "",
                    "Description": "",
                    "Instruct": null,
                    "Material": [
                        {
                            "MaterialID": "",
                            "MaterialName": "",
                            "Picture": 
                        },
                        {
                            "MaterialID": "",
                            "MaterialName": "",
                            "Picture": 
                        }
                    ],
                    "Tags": [
                        {
                            "TagID": "",
                            "TagName": ""
                        },
                        {
                            "TagID": "",
                            "TagName": ""
                        }
                    ]
                }
            ]
        }
    POST: /food
            body: {
                "FoodName": "",
                "Picture": "",
                "Price": "",
                "Description": "",
                "Instruct": "",
                "Material": [
                    {
                        "MaterialID":""
                    },
                    {
                        "MaterialID":""
                    }
                ],
                "Tags": [
                    {
                        "TagID": "",
                        "TagName": ""
                    },
                    {
                        "TagID": "",
                        "TagName": ""
                    }
                ]
            }
    PUT: /food/:id
            body: {
                "FoodName": "",
                "Picture": "",
                "Price": "",
                "Description": "",
                "Instruct": "",
                "Material": [
                    {
                        "MaterialID":""
                    },
                    {
                        "MaterialID":""
                    }
                ],
                "Tags": [
                    {
                        "TagID": "",
                        "TagName": ""
                    },
                    {
                        "TagID": "",
                        "TagName": ""
                    }
                ]
            }
    DELETE: /food/:id
```
```
COMBO:
    GET: /combo
        {
            "message": "Read combo:result in success",
            "data": [
                {
                    "ComboID": "",
                    "ComboName": "",
                    "ComboDescrip": "",
                    "Price": "",
                    "Food": [
                        {
                            "FoodID": "",
                            "FoodName": "",
                            "Picture": ,
                            "Price": "",
                            "Description": "",
                            "Instruct": 
                        },
                        {
                            "FoodID": "",
                            "FoodName": "",
                            "Picture": ,
                            "Price": "",
                            "Description": "",
                            "Instruct": 
                        }
                    ],
                    "Tags": [
                        {
                            "TagID": "",
                            "TagName": ""
                        },
                        {
                            "TagID": "",
                            "TagName": ""
                        }
                    ]
                }
        }
        /combo/:id
        
    POST: /combo
            body: {
                "ComboName": "",
                "ComboDescrip": "",
                "Price" : "",
                "Food": [
                    {
                        "FoodID":
                    },
                    {
                        "FoodID":
                    }
                ],
                "Tags": [
                    {
                        "TagID": "",
                        "TagName": ""
                    },
                    {
                        "TagID": "",
                        "TagName": ""
                    }
                ]
            }

    PUT: /combo/:id
            body: {
                "ComboName": "",
                "ComboDescrip": "",
                "Price" : "",
                "Food": [
                    {
                        "FoodID":
                    },
                    {
                        "FoodID":
                    }
                ],
                "Tags": [
                    {
                        "TagID": "",
                        "TagName": ""
                    },
                    {
                        "TagID": "",
                        "TagName": ""
                    }
                ]
            }

    DELETE: /combo/:id
```
```
MATERIAL:
    GET: /material
        {
            "message": "Read material:result in success",
            "data": [
                {
                "MaterialID": "",
                "MaterialName": "",
                "Picture": ""
                }
            ]
        }
        /material/:id

    POST: /material
        body: {
            "MaterialName": "",
            "Picture": 
        }
    
    PUT: /material/:id
        body: {
            "MaterialName": "",
            "Picture": 
        }

    DELETE: /material/:id
```
