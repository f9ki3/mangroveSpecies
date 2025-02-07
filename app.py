from flask import Flask, render_template

app =Flask(__name__)

#pages route
@app.route('/')
def home():
    return render_template('pages/index.html')

@app.route('/image_detect')
def image_detect():
    return render_template('pages/image_detect.html')

@app.route('/about')
def about():
    return render_template('pages/about.html')

@app.route('/contact')
def contact():
    return render_template('pages/contact.html')

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)


