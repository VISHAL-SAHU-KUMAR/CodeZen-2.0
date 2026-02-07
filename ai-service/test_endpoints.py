import requests
import json

BASE_URL = "http://localhost:8000"

def test_root():
    try:
        response = requests.get(f"{BASE_URL}/")
        print(f"Root: {response.status_code} - {response.json()}")
    except Exception as e:
        print(f"Root failed: {e}")

def test_yield():
    try:
        data = {
            "crop": "wheat",
            "area": 10,
            "rainfall": 120,
            "temperature": 25
        }
        response = requests.post(f"{BASE_URL}/api/yield/predict", json=data)
        print(f"Yield: {response.status_code} - {response.json()}")
    except Exception as e:
        print(f"Yield failed: {e}")

def test_disease():
    try:
        # Create a dummy image
        from PIL import Image
        import io
        img = Image.new('RGB', (100, 100), color = 'red')
        img_byte_arr = io.BytesIO()
        img.save(img_byte_arr, format='JPEG')
        img_byte_arr = img_byte_arr.getvalue()
        
        files = {'file': ('test.jpg', img_byte_arr, 'image/jpeg')}
        response = requests.post(f"{BASE_URL}/api/disease/detect", files=files)
        print(f"Disease: {response.status_code} - {response.json()}")
    except Exception as e:
        print(f"Disease failed: {e}")

if __name__ == "__main__":
    test_root()
    test_yield()
    test_disease()
