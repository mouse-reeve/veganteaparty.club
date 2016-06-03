''' misc views '''
from flask import render_template
from teaparty import app

@app.route('/')
def index():
    ''' render the home page '''
    return render_template('index.html')
