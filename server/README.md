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
                }
            ]
        }

        /food/:id

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
                "Material": [
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
    POST: /combo
            body: {
                "FoodID":"",
                "ComboName": "",
                "ComboDescrip": "",
                "Price" : ""
            }
    PUT: /combo
            body: {
                "FoodID":"",
                "ComboName": "",
                "ComboDescrip": "",
                "Price" : ""
            }
MATERIAL:
    GET: /material
        {
        "message": "Read material:result in success",
        "data": [
            {
                "FoodID": "",
                "FoodName": "",
                "Picture": ,
                "Price": "",
                "Description": "",
                "Instruct": ,
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

    POST: /material
            body: {
                "FoodID":"3",
                "MaterialName": "",
                "Picture":
            }