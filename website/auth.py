from flask import Blueprint, render_template, request, flash, redirect, url_for, session
from .models import User
from werkzeug.security import generate_password_hash, check_password_hash
from . import db, oauth, GOOGLE_CLIENT_ID, CLIENT_SECRET

auth = Blueprint('auth', __name__)

google = oauth.register(
    'google',
    client_id = GOOGLE_CLIENT_ID,
    client_secret = CLIENT_SECRET,
    access_token_url = 'https://accounts.google.com/o/oauth2/token',
    access_token_params=None,
    authorize_url = 'https://accounts.google.com/o/oauth2/auth',
    authorize_params=None,
    api_base_url='https://www.googleapis.com/oauth2/v1/',
    server_metadata_url='https://accounts.google.com/.well-known/openid-configuration',
    client_kwargs={'scope': 'profile email'}
)

# @auth.route('/login', methods=['GET', 'POST'])
# def login():
#     if request.method == 'POST':
#         email = request.form.get('email')
#         password = request.form.get('password')

#         user = User.query.filter_by(email=email).first()
#         if user:
#             # if check_password_hash(user.password, password):
#             if user.password == password:
#                  flash('Logged in successfully!', category='success')
#             else:
#                 flash('Incorrect Password', category='error')
#         else:
#             flash(' Email doesn\'t exist', category='error')
#     return render_template("login.html", boolen=True)

@auth.route('/login')
def login():
    oauth.create_client('google')
    redirect_uri = url_for('auth.authorize', _external=True)
    return google.authorize_redirect(redirect_uri)

@auth.route('/authorize')
def authorize():
    oauth.create_client('google')
    token = google.authorize_access_token()
    resp = google.get('userinfo')
    resp.raise_for_status()
    profile = resp.json()
    print(profile)
    session['name'] = profile['name']
    # do something with the token and profile
    return redirect('/userprofile')

@auth.route('/callback')
def callback():

    return userprofile()

@auth.route('/logout')
def logout():
    return "<p>logout</p>"

@auth.route('/registration', methods=['GET', 'POST'])
def registration():
    if request.method == 'POST':
        email = request.form.get('email')
        firstName = request.form.get('fname')
        password1 = request.form.get('password1')
        password2 = request.form.get('password2')

        user = User.query.filter_by(email=email).first()

        if user:
            flash('Email already exists', category='error')
        elif len(email) < 4:
            flash('Email must be valid.', category='error')
        elif len(firstName) < 3:
            flash('First Name must be more than two characters.', category='error')
        elif password1 != password2:
            flash('Your passwords don\'t match.', category='error')
        elif len(password1) < 7:
            flash('Password must be at least 7 characters.', category='error')
        else:
            #add user
            newUser = User(email=email, firstName=firstName, password=password1)
            db.session.add(newUser)
            db.session.commit()
            flash('Account Created', category='success')

            #return redirect(url_for('/'))

    return render_template("registration.html")

@auth.route('/userprofile')
def userprofile():
    name = session['name']
    #return render_template("userprofile.html")
    return f'Hello {name}!'