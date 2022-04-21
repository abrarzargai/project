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
