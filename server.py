from flask import Flask
from flask_cors import CORS
from flask import request, make_response, jsonify
from flask_mysqldb import MySQL
import json
import hashlib
import jwt
import os
import math

app = Flask(__name__, static_url_path="/static")
CORS(app)

app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'J@rvis005'
app.config['MYSQL_DB'] = 'facebook'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
mysql = MySQL(app)


#Hash

def md5_hash(string):
    hash = hashlib.md5()
    hash.update(string.encode('utf-8'))
    return hash.hexdigest()

#Salt

def generate_salt():
    salt = os.urandom(16)
    return salt.hex()

#Decode Token

def token_decode(token_encoded):
    decode_data = jwt.decode(token_encoded, 'masai', algorithms=['HS256'])
    return decode_data


#Select all

def selectall(query):
    cursor = mysql.connection.cursor()
    cursor.execute(query)
    results = cursor.fetchall()
    cursor.close()
    return results


#Conditional Select

def conditionalselect(query, values):
    cursor = mysql.connection.cursor()
    cursor.execute(query, values)
    results = cursor.fetchall()
    cursor.close()
    return results


#Insert Update Delete

def insert_update_delete(query, values):
    cursor = mysql.connection.cursor()
    cursor.execute(query, values)
    mysql.connection.commit()
    cursor.close()
    return {"Message": "Success"}


#Signup

@app.route("/signup", methods = ["POST"])
def signup():
    user_firstname = request.json["user_firstname"]
    user_surname = request.json["user_surname"]
    user_email = request.json["user_email"]
    user_password = request.json["user_password"]
    user_dob = request.json["user_dob"]
    user_gender = request.json["user_gender"]
    salt = generate_salt()
    password_hash = md5_hash(salt + user_password)
    user_query = """select * from user"""
    users = selectall(user_query)
    for i in users:
        if user_email == i["user_email"]:
            return {"Message": "Email already in use"}
    else:
        add_user = """insert into user(user_firstname, user_surname, user_email, user_password, user_dob, user_gender,salt) values(%s, %s, %s, %s, %s, %s, %s)"""
        values = [user_firstname, user_surname, user_email, password_hash, user_dob, user_gender, salt]
        return insert_update_delete(add_user, values)


#Login

@app.route("/login", methods = ["POST"])
def login():
    user_email = request.json["user_email"]
    user_password = request.json["user_password"]
    user_query = """select * from user"""
    users = selectall(user_query)
    for i in users:
        if user_email == i["user_email"]:
            salt = i["salt"]
            password_hash = md5_hash(salt + user_password)
            if password_hash == i["user_password"]:
                encode_data = jwt.encode({"user_id": i["user_id"]}, "masai", algorithm="HS256").decode("utf-8")
                get_user = """select * from user where user_id=%s"""
                values = [i["user_id"]]
                return {"data": {"token": str(encode_data), "user": conditionalselect(get_user, values)}}
            else:
                return {"Message": "Wrong credentials"}


#Token decode
@app.route("/decode", methods = ["POST"])
def decode():
    auth_header = request.headers.get("Authorization")
    token_encoded = auth_header.split(" ")[1]
    decode_data = token_decode(token_encoded)
    user_id = decode_data["user_id"]
    # print(decode_data)
    if user_id == decode_data["user_id"]:
        user_query = """select * from user where user_id=%s"""
        values = [user_id]
        user = conditionalselect(user_query, values)
        return {"user": user}


#Update user information
@app.route("/updateuser", methods = ["POST"])
def updateuser():
    user_firstname = request.headers.get("user_firstname")
    user_surname = request.headers.get("user_surname")
    user_email = request.headers.get("user_email"),
    user_id = int(request.headers.get("user_id"))
    f = request.files['user_picture']
    Profilelocation = "static/profile/" + f.filename
    f.save(Profilelocation)
    g = request.files['user_cover']
    Coverlocation = "static/cover/" + g.filename
    g.save(Coverlocation)
    query = """update user set user_firstname=%s, user_surname=%s, user_email=%s, user_picture=%s, user_cover=%s where user_id=%s"""
    values = [user_firstname, user_surname, user_email, Profilelocation, Coverlocation, user_id]
    return insert_update_delete(query, values)


#Create a post
@app.route("/createpost", methods = ["POST"])
def createpost():
    post_content = request.headers.get("post_content")
    user_id = int(request.headers.get("user_id"))
    f = request.files["post_image"]
    postImageLocation = "static/statusImage/" + f.filename
    f.save(postImageLocation)
    query = """insert into user_posts(post_content, post_image, user_id) values(%s, %s, %s)"""
    values = [post_content, postImageLocation, user_id]
    return insert_update_delete(query, values)


#All posts
@app.route("/userposts")
def allposts():
    query = """select post_content, post_image, post_time, user_firstname, user_picture from user_posts join user on user.user_id=user_posts.user_id order by  post_time desc"""
    return {"data": selectall(query)}


#Posts of a particular user
@app.route("/particularuserposts", methods = ["POST"])
def particularuserposts():
    user_id = request.headers.get("user_id")
    query = """select post_content, post_time, post_image, user_picture, user_firstname from user_posts join user on user.user_id=user_posts.user_id where user.user_id=%s order by post_time desc"""
    values = [user_id]
    return {"data": conditionalselect(query, values)}


#Pics of a particular user
@app.route("/photos", methods = ["POST"])
def photos():
    user_id = request.headers.get("user_id")
    query = """select post_image from user_posts where user_id=%s limit 0, 5"""
    values = [user_id]
    return {"data":conditionalselect(query, values)}

#List of all users
@app.route("/allusers")
def allUsers():
    query = """Select user_firstname, user_picture, user_id from user"""
    return {"data": selectall(query)}

#sending Requests
@app.route("/sendingfriendrequest", methods = ["POST"])
def friendRequest():
    sender_user_id = request.headers.get("sender_user_id")
    reciever_user_id = request.json["reciever_user_id"]
    query = """insert into request(sender_user_id, reciever_user_id, flag) values(%s, %s, %s)"""
    values = [sender_user_id, reciever_user_id, 0]
    return insert_update_delete(query, values)


#Pending Requests
@app.route("/pendingfriendrequest", methods = ["POST"])
def pendingFriendRequest():
    reciever_user_id = request.json["reciever_user_id"]  #Logged in user
    query = """select distinct user_firstname, user_picture, user_id, req_id from user join request on user_id=sender_user_id where reciever_user_id=%s and flag=0"""
    values = [reciever_user_id]
    return {"data": conditionalselect(query, values)}


#Delete request
@app.route("/deleterequest", methods = ["POST"])
def deleteRequest():
    request_id = request.json["request_id"]
    # reciever_user_id = request.json["reciever_user_id"]
    query = """delete from request where req_id=%s"""
    values = [request_id]
    return insert_update_delete(query, values)


#Confirm request
@app.route("/acceptrequest", methods = ["POST"])
def acceptRequest():
    request_id = request.json["request_id"]
    query = """update request set flag=1 where req_id=%s"""
    values = [request_id]
    return insert_update_delete(query, values)