#!/usr/bin/env python3
"""
Floor Plan Image Optimizer
- Compresses JPGs to 80% quality as progressive JPEGs
- Creates WebP versions at 80% quality
- Keeps images at max 2400px width
- Preserves original filenames for JPGs, adds .webp alongside
"""

import os
import sys
import glob
from PIL import Image

# Configuration
IMAGE_DIR = "/home/z/my-project/public/images/floorplans"
MAX_WIDTH = 2400
JPG_QUALITY = 80
WEBP_QUALITY = 80
TARGET_SIZE_KB = 200
HARD_LIMIT_KB = 300

def get_size_kb(filepath):
    return os.path.getsize(filepath) / 1024

def optimize_image(filepath):
    """Optimize a single image: create progressive JPG and WebP version."""
    results = {
        "filename": os.path.basename(filepath),
        "original_size_kb": get_size_kb(filepath),
        "optimized_jpg_size_kb": None,
        "webp_size_kb": None,
        "dimensions": None,
        "jpg_reduction_pct": None,
        "webp_reduction_pct": None,
        "errors": [],
        "over_limit": False,
    }

    try:
        img = Image.open(filepath)
        original_mode = img.mode
        results["dimensions"] = img.size

        # Convert to RGB if needed (for PNG with alpha, etc.)
        if img.mode in ("RGBA", "P", "LA"):
            # For RGBA, composite on white background
            if img.mode == "RGBA":
                background = Image.new("RGB", img.size, (255, 255, 255))
                background.paste(img, mask=img.split()[3])
                img = background
            elif img.mode == "P":
                img = img.convert("RGB")
            elif img.mode == "LA":
                img = img.convert("RGB")
        elif img.mode != "RGB":
            img = img.convert("RGB")

        # Resize if wider than max width
        if img.width > MAX_WIDTH:
            ratio = MAX_WIDTH / img.width
            new_height = int(img.height * ratio)
            img = img.resize((MAX_WIDTH, new_height), Image.LANCZOS)
            results["dimensions"] = img.size

        # --- Optimize JPG (progressive, 80% quality) ---
        # Save to a temp file first, then replace original
        temp_jpg = filepath + ".optimized.jpg"
        img.save(
            temp_jpg,
            format="JPEG",
            quality=JPG_QUALITY,
            progressive=True,
            optimize=True,
            subsampling=0,  # 4:4:4 chroma for better quality at same size
        )

        results["optimized_jpg_size_kb"] = get_size_kb(temp_jpg)
        results["jpg_reduction_pct"] = round(
            (1 - results["optimized_jpg_size_kb"] / results["original_size_kb"]) * 100, 1
        )

        # If still over hard limit, try with 4:2:0 subsampling and reduce quality
        if results["optimized_jpg_size_kb"] > HARD_LIMIT_KB:
            # Try with 4:2:0 subsampling (smaller file)
            img.save(
                temp_jpg,
                format="JPEG",
                quality=JPG_QUALITY,
                progressive=True,
                optimize=True,
                subsampling=2,  # 4:2:0 - better compression
            )
            results["optimized_jpg_size_kb"] = get_size_kb(temp_jpg)
            results["jpg_reduction_pct"] = round(
                (1 - results["optimized_jpg_size_kb"] / results["original_size_kb"]) * 100, 1
            )

        # If STILL over hard limit, reduce quality progressively
        quality = JPG_QUALITY
        while results["optimized_jpg_size_kb"] > HARD_LIMIT_KB and quality >= 30:
            quality -= 5
            img.save(
                temp_jpg,
                format="JPEG",
                quality=quality,
                progressive=True,
                optimize=True,
                subsampling=2,
            )
            results["optimized_jpg_size_kb"] = get_size_kb(temp_jpg)
            results["jpg_reduction_pct"] = round(
                (1 - results["optimized_jpg_size_kb"] / results["original_size_kb"]) * 100, 1
            )

        if results["optimized_jpg_size_kb"] > HARD_LIMIT_KB:
            results["over_limit"] = True

        # Replace original with optimized version
        os.replace(temp_jpg, filepath)

        # --- Create WebP version ---
        webp_path = os.path.splitext(filepath)[0] + ".webp"
        img.save(
            webp_path,
            format="WEBP",
            quality=WEBP_QUALITY,
            method=4,  # Good balance of speed/compression
        )

        results["webp_size_kb"] = get_size_kb(webp_path)
        results["webp_reduction_pct"] = round(
            (1 - results["webp_size_kb"] / results["original_size_kb"]) * 100, 1
        )

        # If WebP is over hard limit, reduce quality
        webp_quality = WEBP_QUALITY
        while results["webp_size_kb"] > HARD_LIMIT_KB and webp_quality >= 30:
            webp_quality -= 5
            img.save(
                webp_path,
                format="WEBP",
                quality=webp_quality,
                method=4,
            )
            results["webp_size_kb"] = get_size_kb(webp_path)
            results["webp_reduction_pct"] = round(
                (1 - results["webp_size_kb"] / results["original_size_kb"]) * 100, 1
            )

        img.close()

    except Exception as e:
        results["errors"].append(str(e))
        # Clean up temp file if it exists
        temp_jpg = filepath + ".optimized.jpg"
        if os.path.exists(temp_jpg):
            os.remove(temp_jpg)

    return results


def main():
    # Find all JPG files
    jpg_pattern = os.path.join(IMAGE_DIR, "*.jpg")
    jpg_files = sorted(glob.glob(jpg_pattern))
    
    # Also check uppercase
    jpg_pattern_upper = os.path.join(IMAGE_DIR, "*.JPG")
    jpg_files.extend(sorted(glob.glob(jpg_pattern_upper)))
    
    if not jpg_files:
        print("No JPG files found!")
        sys.exit(1)

    print(f"Found {len(jpg_files)} JPG images to optimize")
    print("=" * 70)

    all_results = []
    total_original = 0
    total_optimized_jpg = 0
    total_webp = 0
    errors = []
    over_limit_count = 0

    for i, filepath in enumerate(jpg_files, 1):
        result = optimize_image(filepath)
        all_results.append(result)

        total_original += result["original_size_kb"]
        total_optimized_jpg += result["optimized_jpg_size_kb"] or 0
        total_webp += result["webp_size_kb"] or 0

        if result["errors"]:
            errors.append(result)
        
        if result.get("over_limit"):
            over_limit_count += 1

        # Print progress
        status = "✗" if result["errors"] else "✓"
        limit_flag = " ⚠ OVER LIMIT" if result.get("over_limit") else ""
        print(
            f"[{i:2d}/{len(jpg_files)}] {status} {result['filename']:<40s} "
            f"{result['original_size_kb']:>7.1f}KB → "
            f"JPG:{result['optimized_jpg_size_kb']:>7.1f}KB (-{result['jpg_reduction_pct']}%) "
            f"WebP:{result['webp_size_kb']:>7.1f}KB (-{result['webp_reduction_pct']}%)"
            f"{limit_flag}"
        )

    # Print summary
    print("\n" + "=" * 70)
    print("OPTIMIZATION SUMMARY")
    print("=" * 70)
    print(f"  Images processed:      {len(jpg_files)}")
    print(f"  Errors:                {len(errors)}")
    print(f"  Over 300KB limit:      {over_limit_count}")
    print()
    print(f"  Original JPGs total:   {total_original:>10.1f} KB ({total_original/1024:.2f} MB)")
    print(f"  Optimized JPGs total:  {total_optimized_jpg:>10.1f} KB ({total_optimized_jpg/1024:.2f} MB)")
    print(f"  WebP versions total:   {total_webp:>10.1f} KB ({total_webp/1024:.2f} MB)")
    print()
    
    if total_original > 0:
        jpg_ratio = (1 - total_optimized_jpg / total_original) * 100
        webp_ratio = (1 - total_webp / total_original) * 100
        avg_jpg_reduction = sum(r["jpg_reduction_pct"] for r in all_results if r["jpg_reduction_pct"]) / len([r for r in all_results if r["jpg_reduction_pct"]])
        avg_webp_reduction = sum(r["webp_reduction_pct"] for r in all_results if r["webp_reduction_pct"]) / len([r for r in all_results if r["webp_reduction_pct"]])
        
        print(f"  JPG total reduction:   {jpg_ratio:.1f}% (saved {total_original - total_optimized_jpg:.1f} KB)")
        print(f"  WebP total reduction:  {webp_ratio:.1f}% (saved {total_original - total_webp:.1f} KB)")
        print(f"  Avg JPG compression:   {avg_jpg_reduction:.1f}%")
        print(f"  Avg WebP compression:  {avg_webp_reduction:.1f}%")
    
    # Show over-limit files
    over_limit_files = [r for r in all_results if r.get("over_limit")]
    if over_limit_files:
        print(f"\n  Files over 300KB hard limit ({len(over_limit_files)}):")
        for r in over_limit_files:
            print(f"    - {r['filename']}: JPG={r['optimized_jpg_size_kb']:.1f}KB, WebP={r['webp_size_kb']:.1f}KB")

    # Show errors
    if errors:
        print(f"\n  Files with errors ({len(errors)}):")
        for r in errors:
            print(f"    - {r['filename']}: {', '.join(r['errors'])}")

    print("\nDone! All optimized JPGs are in place, WebP versions created alongside.")


if __name__ == "__main__":
    main()
