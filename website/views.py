from flask import Blueprint, render_template

views = Blueprint('views', __name__)

@views.route('/')
def home():
    return render_template("index.html")

@views.route('/services')
def services():
    return render_template("services.html")

@views.route('/gallery')
def gallery():
    return render_template("gallery.html")

@views.route('/aboutus')
def aboutus():
    return render_template("aboutus.html")

@views.route('/contactinfo')
def contactinfo():
    return render_template("contactinfo.html")

@views.route('/dogs.html')
def dogs():
    return render_template("dogs.html")

