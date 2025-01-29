import cv2
import numpy as np

def gaussian_blur(image, kernel_size=5, sigma=1.4):
    """Apply Gaussian blur to reduce noise."""
    kernel = cv2.getGaussianKernel(kernel_size, sigma)
    gaussian_filter = kernel @ kernel.T
    return cv2.filter2D(image, -1, gaussian_filter)

def sobel_filters(image):
    """Calculate gradients using Sobel filters."""
    Kx = np.array([[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]])
    Ky = np.array([[1, 2, 1], [0, 0, 0], [-1, -2, -1]])
    Gx = cv2.filter2D(image, -1, Kx)
    Gy = cv2.filter2D(image, -1, Ky)
    gradient_magnitude = np.sqrt(Gx**2 + Gy**2)
    gradient_direction = np.arctan2(Gy, Gx) * (180 / np.pi) % 180
    return gradient_magnitude, gradient_direction

def non_maximum_suppression(gradient_magnitude, gradient_direction):
    """Thin edges to keep local maxima."""
    rows, cols = gradient_magnitude.shape
    suppressed = np.zeros((rows, cols), dtype=np.float32)
    angle = gradient_direction / 45
    angle = np.round(angle) % 4  # Quantize angles into 4 directions: 0, 45, 90, 135

    for i in range(1, rows - 1):
        for j in range(1, cols - 1):
            try:
                q, r = 255, 255
                if angle[i, j] == 0:  # 0 degrees
                    q = gradient_magnitude[i, j + 1]
                    r = gradient_magnitude[i, j - 1]
                elif angle[i, j] == 1:  # 45 degrees
                    q = gradient_magnitude[i + 1, j - 1]
                    r = gradient_magnitude[i - 1, j + 1]
                elif angle[i, j] == 2:  # 90 degrees
                    q = gradient_magnitude[i + 1, j]
                    r = gradient_magnitude[i - 1, j]
                elif angle[i, j] == 3:  # 135 degrees
                    q = gradient_magnitude[i - 1, j - 1]
                    r = gradient_magnitude[i + 1, j + 1]

                if gradient_magnitude[i, j] >= q and gradient_magnitude[i, j] >= r:
                    suppressed[i, j] = gradient_magnitude[i, j]
            except IndexError:
                pass
    return suppressed

def double_threshold(image, low, high):
    """Apply double threshold to classify pixels."""
    strong = 255
    weak = 75

    strong_i, strong_j = np.where(image >= high)
    weak_i, weak_j = np.where((image >= low) & (image < high))

    thresholded = np.zeros_like(image)
    thresholded[strong_i, strong_j] = strong
    thresholded[weak_i, weak_j] = weak

    return thresholded, weak, strong

def hysteresis(image, weak, strong):
    """Edge tracking by hysteresis."""
    rows, cols = image.shape
    for i in range(1, rows - 1):
        for j in range(1, cols - 1):
            if image[i, j] == weak:
                if strong in [image[i + 1, j - 1], image[i + 1, j], image[i + 1, j + 1],
                              image[i, j - 1], image[i, j + 1],
                              image[i - 1, j - 1], image[i - 1, j], image[i - 1, j + 1]]:
                    image[i, j] = strong
                else:
                    image[i, j] = 0
    return image

def Canny(image, low_threshold, high_threshold):
    """Complete Canny edge detection pipeline."""
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    blurred = gaussian_blur(gray)
    gradient_magnitude, gradient_direction = sobel_filters(blurred)
    non_max_suppressed = non_maximum_suppression(gradient_magnitude, gradient_direction)
    thresholded, weak, strong = double_threshold(non_max_suppressed, low_threshold, high_threshold)
    edges = hysteresis(thresholded, weak, strong)
    return edges

# Test the implementation
# image = cv2.imread(r'C:\Users\Dell\Downloads\download.jpeg')
# edges = Canny(image, 50, 150)
# print(np.sum(edges>0))
# edge_percentage = np.sum(edges > 0) / float(image.size)
# print(edge_percentage)
