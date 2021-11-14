# Web-Programming-Project
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
                    "ComboID": "",
                    "ComboName": "",
                    "Material": [
                        {
                            "MaterialName": ""
                        },
                        {
                            "MaterialName": ""
                        }
                    ]
                }
            ]
        }
    POST: /food/add-food
            body: {
                "FoodID": "",
                "FoodName": "",
                "Picture": "",
                "Price": "",
                "Description": "",
                "Instruct": ""
            }
        /food/add-combo
            body: {
                "FoodID":"",
                "ComboID": "",
                "ComboName": "",
                "Price" : ""
            }
        /food/add-material
            body: {
                "FoodID":"3",
                "MaterialID": "8",
                "MaterialName": "test"
            }