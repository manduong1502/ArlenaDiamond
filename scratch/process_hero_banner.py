import cv2
import numpy as np
from PIL import Image, ImageEnhance, ImageFilter

def process_banner(input_path, output_path):
    # Load image
    pil_img = Image.open(input_path).convert('RGB')
    img_np = np.array(pil_img)
    
    # Convert to LAB color space for precise luminance and contrast adjustment
    lab = cv2.cvtColor(img_np, cv2.COLOR_RGB2LAB)
    L, A, B = cv2.split(lab)
    
    # 1. Lift shadows slightly on the black dress (shadow region L < 60)
    # Create smooth curve for shadow lifting
    shadow_mask = np.clip((60.0 - L.astype(np.float32)) / 60.0, 0, 1)
    # Gently lift L channel in shadow areas by ~12-15%
    L_shadow_lifted = L.astype(np.float32) + (shadow_mask * 15.0)
    L_shadow_lifted = np.clip(L_shadow_lifted, 0, 255).astype(np.uint8)
    
    # 2. Brighten jewellery / highlights (L > 140) by ~20%
    highlight_mask = np.clip((L.astype(np.float32) - 130.0) / 110.0, 0, 1)
    # Smooth gamma / brightness boost on highlights
    L_brightened = L_shadow_lifted.astype(np.float32) + (highlight_mask * 35.0)
    L_brightened = np.clip(L_brightened, 0, 255).astype(np.uint8)
    
    # 3. Increase contrast on diamonds (high luminance + high frequency details)
    # CLAHE on L channel for diamond sparkle contrast
    clahe = cv2.createCLAHE(clipLimit=2.5, tileGridSize=(8, 8))
    L_clahe = clahe.apply(L_brightened)
    
    # Blend CLAHE selectively on highlight/jewellery areas so skin remains natural
    L_final = (L_brightened.astype(np.float32) * (1 - highlight_mask * 0.6) + 
               L_clahe.astype(np.float32) * (highlight_mask * 0.6))
    L_final = np.clip(L_final, 0, 255).astype(np.uint8)
    
    # Recombine LAB image
    lab_processed = cv2.merge([L_final, A, B])
    img_processed = cv2.cvtColor(lab_processed, cv2.COLOR_LAB2RGB)
    
    # Convert back to PIL
    res_img = Image.fromarray(img_processed)
    
    # Subtle unsharp mask on jewellery to make diamond facets pop
    sharpened = res_img.filter(ImageFilter.UnsharpMask(radius=1.2, percent=130, threshold=3))
    
    # Save output
    sharpened.save(output_path, quality=95)
    print(f"Processed banner saved successfully to {output_path}")

if __name__ == '__main__':
    process_banner('assets/hero_banner.png', 'assets/hero_banner.png')
