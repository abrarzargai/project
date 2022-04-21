## ##################### User ######

## Signup
- Url : /api/user/signup 
- Method: Post
Body {
    Email (string)
    Password (string)
    LastName (string)
    FirstName (string)
    Gener1 (string)
    Gener2 (string)
    Gener3 (string)
    Age (number) 
}

## Login
- Url : /api/user/login 
- Method: Post
Body {
    Email (string) (Must)
    Password (string) (Must)
}

## updatepassword
- Url : /api/user/updatepassword 
- Method: Patch
Body {
    Email (string) (Must)
    OldPassword (string) (Must)
    NewPassword (string) (Must)
}

## update
- Url : /api/user/update 
- Method: Patch
Body {
    Email (string) (Must)
    Password (string)
    LastName (string)
    FirstName (string)
    Gener1 (string)
    Gener2 (string)
    Gener3 (string)
    Age (number)
}

## delete
- Url : /api/user/delete 
- Method: delete
Body {
    Email (string) (Must)
}

## getOneUser
- Url : /api/user/getone 
- Method: post
Body {
    Email (string) (Must)
}

## getAllUsers
- Url : /api/user/getall 
- Method: Get

## ##################### WatchList ######

## Add
- Url : /api/watchList/add 
- Method: post
Body {
    description (string) (Must)
    movieId (string) (Must)
    title (string) (Must)
    image (string) (Must)
    user (mongoDb Id of user) (Must)
}

## Add
- Url : /api/watchList/delete 
- Method: delete
Body {
    Id (mongoDb Id of watchlist) (Must)
}

## getOneUserWatchList (it will sent you array of all wishlist for a single user)
- Url : /api/watchList/getOneUserWatchList 
- Method: Post
Body {
    user (mongoDb Id of user) (Must)
}

## ##################### SearchHistory ######

## add
- Url : /api/SearchHistory/add 
- Method: Post
Body {
    user (mongoDb Id of user) (Must)
    gener (string) (must) ==> ( it will be like ACTION, ADVANTURE, HORROR, THRILLER ,CRIME etc)
}