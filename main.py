import smtplib
from email.message import EmailMessage

import mysql.connector

from random import randint

from fastapi import FastAPI

from dotenv import load_dotenv
from os import getenv

import bcrypt

load_dotenv()

config = {
    'user': getenv("MYSQL_USER"),
    'password': getenv("MYSQL_PASSWORD"),
    'host': getenv("MYSQL_HOST"),
    'database': getenv("MYSQL_DATABASE"),
    'raise_on_warnings': True
}

app = FastAPI()

@app.get("/register")
def register(cnpInput: int, numeInput: str, prenumeInput: str, serieInput: str, numarInput: int, passwordInput: str):
    try:
        cnx = mysql.connector.connect(**config)
        cursor = cnx.cursor()
        
        hashed_password = bcrypt.hashpw(passwordInput.encode('utf-8'), bcrypt.gensalt())
        hashed_password_str = hashed_password.decode('utf-8')
        
        cursor.execute("INSERT INTO users (CNP, Nume, Prenume, Serie, Numar, Parola, Admin) VALUES (%s, %s, %s, %s, %s, %s, 0)", (cnpInput, numeInput, prenumeInput, serieInput, numarInput, hashed_password_str))
        cnx.commit()
        cursor.close()
        cnx.close()
        
        return {"message": "User registered successfully."}
    
    except mysql.connector.Error as e:
        return {"error": f"DB Error: {str(e)}"}


@app.get("/get_otp")
def get_otp(email: str):
    try:
        cnx = mysql.connector.connect(**config)
        cursor = cnx.cursor()
        
        cursor.execute("SELECT * FROM otp WHERE Email = %s ORDER BY ID DESC LIMIT 1", (email,))
        result = cursor.fetchone()
        cursor.close()
        cnx.close()
        
        if result is None:
            return {"error": "No OTP found for this email."}
        return {"otp": result[2]}

    except mysql.connector.Error as e:
        return {"error": f"DB Error: {str(e)}"}


@app.get("/send_otp")
def send_otp(email: str):
    otp = randint(100000, 999999)
    subject = "OTP from Code4Gov"
    body = f"Your OTP is {otp}\n\nYou have 15 minutes to use this code."
    
    msg = EmailMessage()
    msg.set_content(body)
    msg["Subject"] = subject
    msg["From"] = getenv("SMTP_EMAIL")
    msg["To"] = email
    
    try:
        cnx = mysql.connector.connect(**config)
        cursor = cnx.cursor()
        
        cursor.execute("INSERT INTO otp (Email, OTP) VALUES (%s, %s)", (email, otp))
        cnx.commit()
        cursor.close()
        cnx.close()
        
    except mysql.connector.Error as e:
        return {"error": f"DB Error: {str(e)}"}
    
    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(getenv("SMTP_EMAIL"), getenv("SMTP_PASSWORD"))
            server.send_message(msg)
            
    except Exception as e:
        return {"error": str(e)}
    
    return {"message": f"OTP sent to {email}"}
