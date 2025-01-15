import cv2
import numpy as np

def preprocess_image(image):
    """Convert to grayscale and apply Gaussian blur."""
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    blurred = cv2.GaussianBlur(gray, (5, 5), 1.5)  # Adjust kernel size for noise level
    return blurred

def extract_edges(image, low_threshold, high_threshold):
    """Apply Canny edge detection."""
    edges = cv2.Canny(image, low_threshold, high_threshold)
    return edges

def calculate_edge_ratio(edges):
    """Calculate edge ratio as the proportion of edge pixels to total pixels."""
    edge_pixels = np.sum(edges > 0)
    total_pixels = edges.size
    return edge_pixels / total_pixels

def validate_kidney_ct_scan(image, low_threshold=50, high_threshold=150, edge_threshold=0.1):
    """Validate if the image is a kidney CT scan based on edge density."""
    blurred = preprocess_image(image)
    edges = extract_edges(blurred, low_threshold, high_threshold)
    edge_ratio = calculate_edge_ratio(edges)

    print(f"Edge Ratio: {edge_ratio:.4f}")
    is_kidney_ct = edge_ratio > edge_threshold
    return is_kidney_ct, edges

# Load and test a kidney CT scan image
image_path = "kidney_ct_scan.jpg"  # Replace with your CT scan image path
image = cv2.imread(image_path)

low_threshold = 50
high_threshold = 150
edge_threshold = 0.1  # Adjust based on dataset analysis

is_kidney_ct, edge_map = validate_kidney_ct_scan(image, low_threshold, high_threshold, edge_threshold)

print("Is Kidney CT Scan:", is_kidney_ct)

# Display results
cv2.imshow("Original Image", image)
cv2.imshow("Edge Map", edge_map)
cv2.waitKey(0)
cv2.destroyAllWindows()
