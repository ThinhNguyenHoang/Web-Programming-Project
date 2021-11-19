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
                "Instruct": ""
            }
    PUT: /food/:id
            body: {
                "FoodName": "",
                "Picture": "",
                "Price": "",
                "Description": "",
                "Instruct": ""
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
                ]
            }

    PUT: /combo/:id

    DELETE: /combo/:id
```
```
MATERIAL:
        /food/add-material
            body: {
                "FoodID":"3",
                "MaterialID": "8",
                "MaterialName": "test"
            }
```
