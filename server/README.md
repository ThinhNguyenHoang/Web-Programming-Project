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
# Thanh toán
```
BANK ACCOUNT:
    GET: /bank_account
        {
            "message": "Read material:result in success",
            "data": [
                {
                "id": "",
                "bank_account_number": "",
                "bank_account_owner": "",
                "bank_account_type":"",
                "balance":"",
                "valid_start":"",
                "valid_end":"",
                },
                {
                "id": "",
                "bank_account_number": "",
                "bank_account_owner": "",
                "bank_account_type":"",
                "balance":"",
                "valid_start":"",
                "valid_end":"",
                }
            ]
        }
        
        /bank_account/:id

    POST: /bank_account
        body: {
                "bank_account_number": "",
                "bank_account_owner": "",
                "bank_account_type":"",
                "balance":"",
                "valid_start":"",
                "valid_end":"",
                }
    
    PUT: /bank_account/:id
        body: {
                "bank_account_number": "",
                "bank_account_owner": "",
                "bank_account_type":"",
                "balance":"",
                "valid_start":"",
                "valid_end":"",
        }
        reponse_body: {
            list_account đã update 
        }
    DELETE: /bank_account/:id
        reponse_body: {
            list_account đã update 
        }

```



```
    GET: /transaction
        {
            "message": "Read transaction:result in success",
            "data": [
                {
                "id": "",
                "time": "",
                "description": "",
                "amount":"",
                "order_id":"",
                Nếu là manager thì trả thêm: 
                "user_id":"",
                "userName":""
                },
                {
                "id": "",
                "time": "",
                "description": "",
                "amount":"",
                "order_id":"",
                Nếu là manager thì trả thêm: 
                "user_id":"",
                "userName":""
                }
            ]
        }
        
        /transaction/:id

    POST: /transaction
        body: {
                "bank_account_number": "",
                "user_id": "",
                "order_id":"",
                "amount":"",
                "description":"",
                }
```

#CART
```
    GET: /cart
    {
        "message": "Read cart:result in success",
        "data": {
            "UserID": "",
            "FoodList": [
                {
                    "FoodID": "",
                    "FoodName": "",
                    "Picture": ,
                    "Price": "",
                    "Sale": "",
                    "Quantity": ""
                },
                {
                    "FoodID": "",
                    "FoodName": "",
                    "Picture": ,
                    "Price": "",
                    "Sale": "",
                    "Quantity": ""
                }
            ],
            "ComboList": [
                {
                    "ComboID": "",
                    "ComboName": "",
                    "Price": "",
                    "FoodList": [
                        {
                            "FoodID": "",
                            "FoodName": "",
                            "Picture": ,
                            "Price": "",
                            "Sale": ""
                        },
                        {
                            "FoodID": "",
                            "FoodName": "",
                            "Picture": ,
                            "Price": "",
                            "Sale": ""
                        }
                    ],
                    "Quantity": ""
                },
                {
                    "ComboID": "",
                    "ComboName": "",
                    "Price": "",
                    "FoodList": [
                        {
                            "FoodID": "",
                            "FoodName": "",
                            "Picture": ,
                            "Price": "",
                            "Sale": ""
                        },
                        {
                            "FoodID": "",
                            "FoodName": "",
                            "Picture": ,
                            "Price": "",
                            "Sale": ""
                        }
                    ],
                    "Quantity": ""
                }
            ]
        }
    }

    PUT: /cart
        body: {
            "FoodList":[
                {
                    "FoodID": , 
                    "Quantity": 
                },
                {
                    "FoodID": , 
                    "Quantity":
                }
            ],
            "ComboList": [
                {
                    "ComboID":,
                    "Quantity":
                },
                {
                    "ComboID":,
                    "Quantity":
                }
            ]
        }
```
