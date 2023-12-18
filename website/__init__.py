from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from os import path
from authlib.integrations.flask_client import OAuth

oauth = OAuth()
db = SQLAlchemy()
DB_NAME = "raynbowpaws"
GOOGLE_CLIENT_ID = "1077847252138-rdivo2b2jmrkpmhqnefa5rc79q6odleg.apps.googleusercontent.com"
CLIENT_SECRET = "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"

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = "randomstring"
    app.secret_key = app.config['SECRET_KEY']

    #db connection
    username = 'root'
    password = 'password'
    hostname = 'localhost'
    port = '3306'
    app.config['SQLALCHEMY_DATABASE_URI'] =\
            f'mysql://{username}:{password}@{hostname}:{port}/{DB_NAME}'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)
    
    from .views import views
    from .auth import auth

    from .models import User, Note

    app.register_blueprint(views, url_prefix='/')
    app.register_blueprint(auth, url_prefix='/')

    with app.app_context():
        db.create_all()

    oauth.init_app(app)

    return app