from boggle import Boggle
from flask import Flask, request, render_template, redirect, flash, jsonify
from random import randint, choice, sample
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)

app.config['SECRET_KEY'] = "chickenzarecool21837"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)

boggle_game = Boggle()
boggle_board = boggle_game.make_board()
score = 0

@app.route('/')
def home_page():
    """Shows home page"""

    return render_template('index.html', board=boggle_board)

@app.route("/verify")
def verify_word():
    """Send a query to see if we can verify if the word is valid"""
    """Return the result, ok / not-on-board / not-a-word"""

    word = request.args["word"]
    response = boggle_game.check_valid_word(boggle_board, word)

    return jsonify({'result': response})