''' webserver for maximum tea parties '''
from flask import Flask

app = Flask(__name__)
app.config.from_object('config')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

import teaparty.views
