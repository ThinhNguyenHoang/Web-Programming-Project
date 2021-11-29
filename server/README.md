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
                    "Sale": "",
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

        /food/:id

        /food/recommendation
        {
            "message": "Read food:result in success",
            "data": [
                {
                    "FoodID": "",
                    "FoodName": "",
                    "Picture":null,
                    "Price": "",
                    "Description": "",
                    "Instruct": "",
                    "Sale": "",
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
                },
                {
                    "FoodID": "",
                    "FoodName": "",
                    "Picture":null,
                    "Price": "",
                    "Description": "",
                    "Instruct": "",
                    "Sale": "",
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
                "Sale": ,
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
                "Sale": ,
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
                            "Instruct":,
                            "Sale":
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
        
        /combo/recommendation
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
                    "Instruct": "",
                    "Sale": "0"
                },
                {
                    "FoodID": "",
                    "FoodName": "",
                    "Picture": ,
                    "Price": "",
                    "Description": "",
                    "Instruct": "",
                    "Sale": "0"
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
        },
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
                    "Instruct": "",
                    "Sale": "0"
                },
                {
                    "FoodID": "",
                    "FoodName": "",
                    "Picture": ,
                    "Price": "",
                    "Description": "",
                    "Instruct": "",
                    "Sale": "0"
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
                "sale_percent":"",
                "food_list": [],
                "combo_list": [],
                Nếu là manager thì trả thêm: 
                "user_id":"",
                "username":""
                },
                {
                "id": "",
                "time": "",
                "description": "",
                "amount":"",
                "sale_percent":"",
                "food_list": [],
                "combo_list": [],
                Nếu là manager thì trả thêm: 
                "user_id":"",
                "username":""
                }
            ]
        }
        
        /transaction/:id

    POST: /transaction
        body: {
                "bank_account_number": "",
                "user_id": "",
                "amount":"",
                "description":"",
                "voucher_id": ,
                "food_list": [
                    {FoodID: ""},
                    {FoodID: ""}
                ],
                "combo_list": [
                    {ComboID: ""},
                    {ComboID: ""}
                ],
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

#TAG (admin)
```
    GET: /tag
        {
            "message": "Read tag:result in success",
            "data": [
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

        /tag/:id
        {
            "message": "Read tag:result in success",
            "data": {
                "TagID": "1",
                "TagName": "Cay"
            }
        }

    POST: /tag
        body: {
            "TagName":
        }
    
    PUT: /tag/:id
        body: {
            "TagName":
        }

    DELETE: /tag/:id
```

#NEWS
```
    GET: /news
        {
            "message": "Read news:result in success",
            "data": [
                {
                    "NewsID": "",
                    "Title": "",
                    "Picture": "",
                    "Highlight": "",
                    "Content": "",
                    "Author": "",
                    "Comment": [
                        {
                            "CommentID": "",
                            "UserID": "",
                            "Content": "",
                            "UserName": "",
                            "UserAvatar": "",
                            "ImageList": [
                                {
                                    "Image": ""
                                }
                            ],
                            "Reply": []
                        },
                        {
                            "CommentID": "",
                            "UserID": "",
                            "Content": "",
                            "UserName": "",
                            "UserAvatar": "",
                            "ImageList": [
                                {
                                    "Image": ""
                                }
                            ],
                            "Reply": [
                                {
                                    "Content": "",
                                    "UserID": "",
                                    "UserName": "",
                                    "UserAvatar": ""
                                },
                                {
                                    "Content": "",
                                    "UserID": "",
                                    "UserName": "",
                                    "UserAvatar": ""
                                }
                            ]
                        }
                    ]
                },
                {
                    "NewsID": "",
                    "Title": "",
                    "Picture": "",
                    "Highlight": "",
                    "Content": "",
                    "Author": "",
                    "Comment": [
                        {
                            "CommentID": "",
                            "UserID": "",
                            "Content": "",
                            "UserName": "",
                            "UserAvatar": "",
                            "ImageList": [
                                {
                                    "Image": ""
                                }
                            ],
                            "Reply": []
                        },
                        {
                            "CommentID": "",
                            "UserID": "",
                            "Content": "",
                            "UserName": "",
                            "UserAvatar": "",
                            "ImageList": [
                                {
                                    "Image": ""
                                }
                            ],
                            "Reply": [
                                {
                                    "Content": "",
                                    "UserID": "",
                                    "UserName": "",
                                    "UserAvatar": ""
                                },
                                {
                                    "Content": "",
                                    "UserID": "",
                                    "UserName": "",
                                    "UserAvatar": ""
                                }
                            ]
                        }
                    ]
                }
            ]
        }

        /news/:id
    
    POST: /news
        body: {
            "Title":"",
            "Picture":"",
            "Highlight":"",
            "Content":"",
            "Author":""
        }
    
    PUT: /news/:id
        body: {
            "Title":"",
            "Picture":"",
            "Highlight":"",
            "Content":"",
            "Author":""
        }

    DELETE: /news/:id
```

#NEWS COMMENT
```
    POST: /news/comment
        body: {
            NewsID: ,
            Content:"",
            ImageList:[
                {
                    "Image":
                },
                {
                    "Image":
                }
            ]
        }
    
    PUT: /news/comment/:id
        body: {
            Content:"",
            ImageList:[
                {
                    "Image":
                },
                {
                    "Image":
                }
            ],
            Reply: [
                {
                    "UserID":,
                    "Content":
                },
                {
                    "UserID":,
                    "Content":
                }
            ]
        }

    DELETE: /news/comment/:id
```

#FOOD COMMENT
```
    POST: /food/comment
        body: {
            FoodID: ,
            Content:"",
            ImageList:[
                {
                    "Image":
                },
                {
                    "Image":
                }
            ]
        }
    
    PUT: /food/comment/:id
        body: {
            Content:"",
            ImageList:[
                {
                    "Image":
                },
                {
                    "Image":
                }
            ],
            Reply: [
                {
                    "UserID":,
                    "Content":
                },
                {
                    "UserID":,
                    "Content":
                }
            ]
        }

    DELETE: /food/comment/:id
```

#VOUCHER
```
    GET: /voucher
        {
            "message": "Read voucher:result in success",
            "data": [
                {
                    "VoucherID": "",
                    "ExpirationDate": "",
                    "Description": "",
                    "VoucherName": "",
                    "UserID": "",
                    "SalePercent": ""
                },
                {
                    "VoucherID": "",
                    "ExpirationDate": "",
                    "Description": "",
                    "VoucherName": "",
                    "UserID": "",
                    "SalePercent": ""
                }
            ]
        }
        /voucher/:id

    POST: /voucher (admin only)
        body: {
            "ExpirationDate": "2021-01-01",
            "Description": "Voucher description ID 1",
            "VoucherName": "Weeken Voucher",
            "UserID": "2",
            "SalePercent": "10"
        }

    PUT: /voucher/:id (admin only)
        body: {
            "ExpirationDate": "2021-01-01",
            "Description": "Voucher description ID 1",
            "VoucherName": "Weeken Voucher",
            "UserID": "2",
            "SalePercent": "10"
        }

    DELETE: /voucher/:id (admin only)
```

#PAGE SETTING
```
    GET:/page_setting
    {
        "message": "Read page_setting:result in success",
        "data": [
            {
                "banner": "ádkasjdkasjdasdasdasdasd",
                "logo": "test",
                "name": "đasadasdasd",
                "phone": "111111111111111111111111",
                "slogan": "qqqqqqqqqqqqqqqqqqqqq",
                "address": "àasfsafasfs",
                "description": "adsfasdasdfsaf",
                "color": "test",
                "length": "test",
                "lat": "test",
                "facebook": "test",
                "mail": "test",
                "twitter": "tets"
            }
        ]
    }

    PUT: /page_setting
        body: {
            "banner": "ádkasjdkasjdasdasdasdasd",
            "logo": "test",
            "name": "đasadasdasd",
            "phone": "111111111111111111111111",
            "slogan": "qqqqqqqqqqqqqqqqqqqqq",
            "address": "àasfsafasfs",
            "description": "adsfasdasdfsaf",
            "color": "test",
            "length": "test",
            "lat": "test",
            "facebook": "test",
            "mail": "test",
            "twitter": "tets"
        }
```