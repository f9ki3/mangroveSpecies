from flask import Flask, render_template, jsonify, request
import os
import hashlib
import time
from inference_sdk import InferenceHTTPClient
from mangrove_species import *
from mangroves import *

app =Flask(__name__) 


# Set the upload folder
UPLOAD_FOLDER = "static/uploads"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

# Initialize the client
CLIENT = InferenceHTTPClient(
    api_url="https://detect.roboflow.com",
    api_key="9FWlBEtixk01aVRdtWAZ"
)

# Set maximum allowed file size (5MB)
MAX_FILE_SIZE = 5 * 1024 * 1024  # 5MB in bytes

@app.route('/infer', methods=['POST'])
def infer_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'}), 400
    
    image = request.files['image']

    # Check file size
    image.seek(0, os.SEEK_END)  # Move to end of file to check size
    file_size = image.tell()  # Get file size
    image.seek(0)  # Reset file pointer

    if file_size > MAX_FILE_SIZE:
        return jsonify({'error': 'File size exceeds 5MB. Please upload a smaller image.'}), 413

    temp_path = "temp_image.jpg"
    image.save(temp_path)  # Save the image temporarily
    
    try:
        # Perform inference
        result = CLIENT.infer(temp_path, model_id="mangrove-species-dcege/3")
        os.remove(temp_path)  # Remove temporary image
        return jsonify(result)
    except Exception as e:
        os.remove(temp_path)  # Ensure cleanup on error
        return jsonify({'error': str(e)}), 500

@app.route('/')
def root():
    return render_template('pages/index.html')

@app.route('/learn_mangrove')
def learn_mangrove():
    return render_template('pages/learn_mangrove.html')


@app.route('/view_species')
def view_species():
    return render_template('pages/view_species.html')

@app.route('/realtime_detect')
def realtime_detect():
    return render_template('pages/realtime_detect.html')

@app.route('/image_detect')
def image_detect():
    return render_template('pages/image_detect.html')

#api endpoints
@app.route("/detect_image", methods=["POST"])
def detect_img():
    return "detected"


@app.route('/get_mangrove', methods=['GET'])
def get_mangrove():
    search_query = request.args.get('search', '').lower()
    
    # Filter species based on search query (e.g., name or description)
    filtered_mangroves = [
        mangrove for mangrove in mangroves 
        if search_query in mangrove['name'].lower() or search_query in mangrove['description'].lower()
    ]
    
    return jsonify({"species": filtered_mangroves})


@app.route("/save_detected", methods=["POST"])
def save_detected():
    try:
        # Get text dataf
        predicted = request.form.get("predicted", "")
        status = request.form.get("status", "")

        if ":" in predicted:
            a, b = predicted.split(":", 1)  # Ensure only one split occurs
            predicted = a.strip()
            percent = b.strip()
        else:
            return jsonify({"success": False, "message": "Invalid format for predicted"}), 400

        # Get the uploaded file
        file = request.files.get("image")
        if not file:
            return jsonify({"success": False, "message": "No file uploaded"}), 400

        # Generate a unique 10-digit hash for the filename
        hash_value = hashlib.sha256(str(time.time()).encode()).hexdigest()[:10]
        file_extension = os.path.splitext(file.filename)[1]  # Get original file extension
        new_filename = f"{hash_value}{file_extension}"
        file_path = os.path.join(app.config["UPLOAD_FOLDER"], new_filename)

        # Save the file
        file.save(file_path)

        # Insert into database
        SpeciesMangrove.insertSpecies(new_filename, predicted, percent, status)

        # Return success response
        return jsonify({
            "success": True,
            "message": "Detection saved successfully!",
            "data": {
                "predicted": predicted,
                "status": status,
                "percent": percent,
                "image_url": file_path  # File path for reference
            }
        })

    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

@app.route('/readSpeciesDetected', methods=['GET'])
def readSpeciesDetected():
    # Get query parameters for pagination, search, and sorting
    page = request.args.get('page', 1, type=int)  # Default to page 1 if not provided
    per_page = request.args.get('per_page', 12, type=int)  # Default to 10 results per page
    search_term = request.args.get('search', '', type=str)  # Default to empty search
    sort_column = request.args.get('sort_column', 'date_time', type=str)  # Default to sorting by date_time
    sort_direction = request.args.get('sort_direction', 'DESC', type=str)  # Default to ascending order

    # Validate sort direction (either 'ASC' or 'DESC')
    if sort_direction not in ['ASC', 'DESC']:
        sort_direction = 'DESC'  # Default to ASC if the direction is invalid
    
    # Validate the sort column (you can specify more allowed columns)
    valid_columns = ['date_time', 'species_filename', 'species_predicted', 'species_percent', 'species_status']
    if sort_column not in valid_columns:
        sort_column = 'date_time'  # Default to sorting by date_time if the column is invalid

    # Call the function with the dynamic parameters
    data = SpeciesMangrove.readAllSpecies(page, per_page, search_term, sort_column, sort_direction)

    return jsonify(data)

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)