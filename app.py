from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/tax-gap')
def tax_gap():
    return render_template('tax_gap.html')

@app.route('/test')
def test():
    return render_template('test.html')