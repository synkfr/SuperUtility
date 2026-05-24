"use client";

import React, { useState, useEffect, useRef } from "react";
import JSZip from "jszip";
import styles from "./ImageEditor.module.css";
import sharedStyles from "./SharedStyles.module.css";

interface EditState {
  resize: {
    mode: "dimensions" | "percentage";
    width: number;
    height: number;
    percentage: number;
    maintainAspectRatio: boolean;
  };
  compress: {
    quality: number; // 0.1 to 1.0
    preset: "low" | "medium" | "high" | "max";
  };
  crop: {
    active: boolean;
    aspectRatio: number | null; // null for free, otherwise ratio (e.g. 1, 1.777)
    x: number; // in image source pixels
    y: number;
    width: number;
    height: number;
  };
  rotate: number; // 0, 90, 180, 270
  flip: {
    horizontal: boolean;
    vertical: boolean;
  };
  format: "JPG" | "PNG" | "WEBP";
}

interface ImageFile {
  id: string;
  file: File;
  name: string;
  originalSize: number;
  originalWidth: number;
  originalHeight: number;
  previewUrl: string; // Object URL for original image
  editState: EditState;
  processed: {
    blob: Blob;
    previewUrl: string; // Object URL for processed image
    size: number;
    width: number;
    height: number;
  } | null;
}

interface ImageEditorProps {
  defaultFocusSection?: "resize" | "compress" | "convert" | "crop" | "rotate";
}

const DEFAULT_EDIT_STATE = (width: number, height: number): EditState => ({
  resize: {
    mode: "dimensions",
    width: width,
    height: height,
    percentage: 100,
    maintainAspectRatio: true,
  },
  compress: {
    quality: 0.8,
    preset: "high",
  },
  crop: {
    active: false,
    aspectRatio: null,
    x: 0,
    y: 0,
    width: width,
    height: height,
  },
  rotate: 0,
  flip: {
    horizontal: false,
    vertical: false,
  },
  format: "WEBP",
});

export default function ImageEditor({ defaultFocusSection = "resize" }: ImageEditorProps) {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [activeImageId, setActiveImageId] = useState<string | null>(null);
  const [selectedImageIds, setSelectedImageIds] = useState<Set<string>>(new Set());
  const [activeTool, setActiveTool] = useState<"resize" | "compress" | "convert" | "crop" | "rotate">(
    defaultFocusSection === "convert" ? "convert" : defaultFocusSection
  );
  const [mobileTab, setMobileTab] = useState<"gallery" | "edit" | "export">("gallery");

  // Editor controls state (bound to the active image's editState)
  const [activeTab, setActiveTab] = useState<"processed" | "original">("processed");
  const [zoom, setZoom] = useState(100);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [zipSuffix, setZipSuffix] = useState("_edited");

  // DOM Refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const previewImgRef = useRef<HTMLImageElement>(null);
  const previewContainerRef = useRef<HTMLDivElement>(null);

  // Crop Drag state
  const [cropDrag, setCropDrag] = useState<{
    active: boolean;
    handle: "move" | "nw" | "n" | "ne" | "e" | "se" | "s" | "sw" | "w" | null;
    startX: number;
    startY: number;
    startCrop: { x: number; y: number; width: number; height: number };
  } | null>(null);

  const activeImage = images.find((img) => img.id === activeImageId) || null;

  // Drag & drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      await handleFileSelection(e.dataTransfer.files);
    }
  };

  const triggerFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      await handleFileSelection(e.target.files);
    }
  };

  // Core file parsing
  const handleFileSelection = async (fileList: FileList) => {
    setIsProcessing(true);
    setProcessingProgress(0);
    const parsedFiles: ImageFile[] = [];

    const fileArray = Array.from(fileList).filter((file) =>
      file.type.match(/image\/(jpeg|jpg|png|webp|gif|avif)/i)
    );

    for (let i = 0; i < fileArray.length; i++) {
      const file = fileArray[i];
      const previewUrl = URL.createObjectURL(file);

      // Load dimensions
      await new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => {
          const w = img.width || 800;
          const h = img.height || 600;

          // Default configuration detection
          let format: "JPG" | "PNG" | "WEBP" = "WEBP";
          if (file.type.includes("png")) format = "PNG";
          else if (file.type.includes("gif")) format = "PNG";
          else if (file.type.includes("webp")) format = "WEBP";
          else format = "JPG";

          const initialEdit = DEFAULT_EDIT_STATE(w, h);
          initialEdit.format = format;

          parsedFiles.push({
            id: Math.random().toString(36).substring(2, 9),
            file: file,
            name: file.name,
            originalSize: file.size,
            originalWidth: w,
            originalHeight: h,
            previewUrl: previewUrl,
            editState: initialEdit,
            processed: null,
          });
          resolve();
        };
        img.onerror = () => {
          parsedFiles.push({
            id: Math.random().toString(36).substring(2, 9),
            file: file,
            name: file.name,
            originalSize: file.size,
            originalWidth: 800,
            originalHeight: 600,
            previewUrl: previewUrl,
            editState: DEFAULT_EDIT_STATE(800, 600),
            processed: null,
          });
          resolve();
        };
        img.src = previewUrl;
      });

      setProcessingProgress(Math.round(((i + 1) / fileArray.length) * 50));
    }

    if (parsedFiles.length > 0) {
      setImages((prev) => {
        const merged = [...prev, ...parsedFiles];
        // Auto set active if none is set
        if (!activeImageId) {
          setActiveImageId(parsedFiles[0].id);
        }
        return merged;
      });

      // Auto check selection for all newly uploaded files
      setSelectedImageIds((prev) => {
        const next = new Set(prev);
        parsedFiles.forEach((f) => next.add(f.id));
        return next;
      });

      // Run sequential compilation on canvas for these images
      await compileImagesPipeline(parsedFiles);
    }
    setIsProcessing(false);
  };

  // Canvas processing pipeline for a single image
  const renderCanvasImage = (imgFile: ImageFile): Promise<{ blob: Blob; size: number; w: number; h: number }> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Could not construct 2D context"));
          return;
        }

        const edit = imgFile.editState;
        
        // Bounding Crop resolution
        const cropX = edit.crop.active ? edit.crop.x : 0;
        const cropY = edit.crop.active ? edit.crop.y : 0;
        const cropW = edit.crop.active ? edit.crop.width : imgFile.originalWidth;
        const cropH = edit.crop.active ? edit.crop.height : imgFile.originalHeight;

        // Custom Resize Dimensions
        let targetW = cropW;
        let targetH = cropH;

        if (edit.resize.mode === "dimensions") {
          targetW = edit.resize.width;
          targetH = edit.resize.height;
        } else {
          // percentage scaling
          const ratio = edit.resize.percentage / 100;
          targetW = Math.round(cropW * ratio);
          targetH = Math.round(cropH * ratio);
        }

        // Keep bounds strictly valid
        targetW = Math.max(1, targetW);
        targetH = Math.max(1, targetH);

        // Rotation bounds calculations
        let canvasW = targetW;
        let canvasH = targetH;
        if (edit.rotate === 90 || edit.rotate === 270) {
          canvasW = targetH;
          canvasH = targetW;
        }

        canvas.width = canvasW;
        canvas.height = canvasH;

        // Apply transformations
        ctx.translate(canvasW / 2, canvasH / 2);
        ctx.rotate((edit.rotate * Math.PI) / 180);

        const scaleX = edit.flip.horizontal ? -1 : 1;
        const scaleY = edit.flip.vertical ? -1 : 1;
        ctx.scale(scaleX, scaleY);

        // Draw image onto canvas
        ctx.drawImage(
          img,
          cropX,
          cropY,
          cropW,
          cropH,
          -targetW / 2,
          -targetH / 2,
          targetW,
          targetH
        );

        // Quality Compression parameters
        let mimeType = "image/jpeg";
        if (edit.format === "PNG") mimeType = "image/png";
        else if (edit.format === "WEBP") mimeType = "image/webp";

        const quality = edit.compress.quality;

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve({
                blob: blob,
                size: blob.size,
                w: canvasW,
                h: canvasH,
              });
            } else {
              reject(new Error("Canvas blob export failed"));
            }
          },
          mimeType,
          quality
        );
      };
      img.onerror = () => reject(new Error("Image failed loading"));
      img.src = imgFile.previewUrl;
    });
  };

  // Compile batch of files sequentially in pipeline (preserves browser event loop)
  const compileImagesPipeline = async (targetList: ImageFile[]) => {
    for (let i = 0; i < targetList.length; i++) {
      const target = targetList[i];
      try {
        const out = await renderCanvasImage(target);
        
        // Free prior object URL if exists to prevent memory leaks
        if (target.processed && target.processed.previewUrl) {
          URL.revokeObjectURL(target.processed.previewUrl);
        }

        const outUrl = URL.createObjectURL(out.blob);

        setImages((prev) =>
          prev.map((img) =>
            img.id === target.id
              ? {
                  ...img,
                  processed: {
                    blob: out.blob,
                    previewUrl: outUrl,
                    size: out.size,
                    width: out.w,
                    height: out.h,
                  },
                }
              : img
          )
        );
      } catch (err) {
        console.error("Canvas compilation error for image: " + target.name, err);
      }
      
      // Allow browser to render layout updates
      await new Promise((resolve) => setTimeout(resolve, 5));
    }
  };

  // Apply changes to edit State
  const updateActiveEditState = (updater: (prev: EditState) => EditState) => {
    if (!activeImageId) return;

    setImages((prev) =>
      prev.map((img) => {
        if (img.id === activeImageId) {
          const nextState = updater(img.editState);
          return { ...img, editState: nextState };
        }
        return img;
      })
    );
  };

  // Trigger processed compilation for the active image immediately
  useEffect(() => {
    if (activeImage && !isProcessing) {
      const delayTimer = setTimeout(() => {
        compileImagesPipeline([activeImage]);
      }, 300); // 300ms debounce
      return () => clearTimeout(delayTimer);
    }
  }, [
    activeImage?.editState.resize,
    activeImage?.editState.compress,
    activeImage?.editState.crop,
    activeImage?.editState.rotate,
    activeImage?.editState.flip,
    activeImage?.editState.format,
  ]);

  // Bulk Apply Configuration Commands
  const applyConfigToBulk = async (target: "current" | "selected" | "all") => {
    if (!activeImage) return;
    setIsProcessing(true);
    setProcessingProgress(0);

    const config = { ...activeImage.editState };
    
    // Determine affected images
    let affectedIds: string[] = [];
    if (target === "current") {
      affectedIds = [activeImage.id];
    } else if (target === "selected") {
      affectedIds = Array.from(selectedImageIds);
    } else {
      affectedIds = images.map((img) => img.id);
    }

    const listToProcess: ImageFile[] = [];

    setImages((prev) => {
      const nextList = prev.map((img) => {
        if (affectedIds.includes(img.id)) {
          // Copy current configurations but adjust width/height proportional to target dimensions!
          const imgConfig = JSON.parse(JSON.stringify(config)) as EditState;
          
          if (config.resize.mode === "dimensions") {
            if (config.resize.maintainAspectRatio) {
              const srcRatio = img.originalWidth / img.originalHeight;
              if (config.resize.width !== activeImage.editState.resize.width) {
                imgConfig.resize.width = config.resize.width;
                imgConfig.resize.height = Math.round(config.resize.width / srcRatio);
              } else {
                imgConfig.resize.width = Math.round(config.resize.height * srcRatio);
                imgConfig.resize.height = config.resize.height;
              }
            } else {
              imgConfig.resize.width = config.resize.width;
              imgConfig.resize.height = config.resize.height;
            }
          }

          // Crop overrides cannot be batch copied unless proportional, so we reset crop or center-crop
          if (img.id !== activeImage.id) {
            imgConfig.crop = {
              active: config.crop.active,
              aspectRatio: config.crop.aspectRatio,
              x: 0,
              y: 0,
              width: img.originalWidth,
              height: img.originalHeight,
            };
            if (config.crop.active && config.crop.aspectRatio) {
              // Proportional center crop box math
              const r = config.crop.aspectRatio;
              if (img.originalWidth / img.originalHeight > r) {
                imgConfig.crop.height = img.originalHeight;
                imgConfig.crop.width = Math.round(img.originalHeight * r);
                imgConfig.crop.x = Math.round((img.originalWidth - imgConfig.crop.width) / 2);
              } else {
                imgConfig.crop.width = img.originalWidth;
                imgConfig.crop.height = Math.round(img.originalWidth / r);
                imgConfig.crop.y = Math.round((img.originalHeight - imgConfig.crop.height) / 2);
              }
            }
          }

          const nextImg = { ...img, editState: imgConfig };
          listToProcess.push(nextImg);
          return nextImg;
        }
        return img;
      });
      return nextList;
    });

    // Run sequential compilation on the queue
    await compileImagesPipeline(listToProcess);
    setIsProcessing(false);
  };

  // Thumbnail checklist selectors
  const toggleSelectImage = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedImageIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSelectAll = () => {
    setSelectedImageIds(new Set(images.map((img) => img.id)));
  };

  const handleDeselectAll = () => {
    setSelectedImageIds(new Set());
  };

  const handleInvertSelection = () => {
    setSelectedImageIds((prev) => {
      const next = new Set<string>();
      images.forEach((img) => {
        if (!prev.has(img.id)) next.add(img.id);
      });
      return next;
    });
  };

  // Undo & Reset controls
  const handleResetActiveImage = () => {
    if (!activeImage) return;
    updateActiveEditState(() => DEFAULT_EDIT_STATE(activeImage.originalWidth, activeImage.originalHeight));
    setZoom(100);
  };

  const handleRemoveImage = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Revoke preview objects
    const img = images.find((i) => i.id === id);
    if (img) {
      URL.revokeObjectURL(img.previewUrl);
      if (img.processed) URL.revokeObjectURL(img.processed.previewUrl);
    }

    setImages((prev) => prev.filter((i) => i.id !== id));
    setSelectedImageIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });

    if (activeImageId === id) {
      const remaining = images.filter((i) => i.id !== id);
      setActiveImageId(remaining.length > 0 ? remaining[0].id : null);
    }
  };

  const handleClearAll = () => {
    images.forEach((img) => {
      URL.revokeObjectURL(img.previewUrl);
      if (img.processed) URL.revokeObjectURL(img.processed.previewUrl);
    });
    setImages([]);
    setSelectedImageIds(new Set());
    setActiveImageId(null);
    setZoom(100);
  };

  // Draggable Crop Box Overlay Event Handlers
  const handleCropMouseDown = (
    handle: "move" | "nw" | "n" | "ne" | "e" | "se" | "s" | "sw" | "w",
    e: React.MouseEvent
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (!activeImage || !previewImgRef.current) return;

    const crop = activeImage.editState.crop;
    setCropDrag({
      active: true,
      handle: handle,
      startX: e.clientX,
      startY: e.clientY,
      startCrop: { x: crop.x, y: crop.y, width: crop.width, height: crop.height },
    });
  };

  // Window-level dragging bindings
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cropDrag || !cropDrag.handle || !activeImage || !previewImgRef.current) return;

      const renderedW = previewImgRef.current.clientWidth;
      const renderedH = previewImgRef.current.clientHeight;

      const scaleX = activeImage.originalWidth / renderedW;
      const scaleY = activeImage.originalHeight / renderedH;

      const deltaX = (e.clientX - cropDrag.startX) * scaleX;
      const deltaY = (e.clientY - cropDrag.startY) * scaleY;

      const imgW = activeImage.originalWidth;
      const imgH = activeImage.originalHeight;
      const start = cropDrag.startCrop;
      const ratio = activeImage.editState.crop.aspectRatio;

      let nextX = start.x;
      let nextY = start.y;
      let nextW = start.width;
      let nextH = start.height;

      if (cropDrag.handle === "move") {
        nextX = Math.max(0, Math.min(imgW - start.width, start.x + deltaX));
        nextY = Math.max(0, Math.min(imgH - start.height, start.y + deltaY));
      } else {
        // Drag bounds corner arithmetic
        if (cropDrag.handle.includes("e")) {
          nextW = Math.max(20, Math.min(imgW - start.x, start.width + deltaX));
        }
        if (cropDrag.handle.includes("w")) {
          const maxLeft = start.x + start.width - 20;
          nextX = Math.max(0, Math.min(maxLeft, start.x + deltaX));
          nextW = start.width + (start.x - nextX);
        }
        if (cropDrag.handle.includes("s")) {
          nextH = Math.max(20, Math.min(imgH - start.y, start.height + deltaY));
        }
        if (cropDrag.handle.includes("n")) {
          const maxTop = start.y + start.height - 20;
          nextY = Math.max(0, Math.min(maxTop, start.y + deltaY));
          nextH = start.height + (start.y - nextY);
        }

        // Lock aspect ratios proportionality
        if (ratio) {
          if (cropDrag.handle === "e" || cropDrag.handle === "w") {
            nextH = Math.round(nextW / ratio);
          } else if (cropDrag.handle === "n" || cropDrag.handle === "s") {
            nextW = Math.round(nextH * ratio);
          } else {
            // Diagonal corner lock
            const scale = Math.max(nextW / start.width, nextH / start.height);
            nextW = Math.round(start.width * scale);
            nextH = Math.round(start.height * scale);
            
            if (cropDrag.handle.includes("w")) {
              nextX = start.x + start.width - nextW;
            }
            if (cropDrag.handle.includes("n")) {
              nextY = start.y + start.height - nextH;
            }
          }
        }

        // Validate final boundaries
        if (nextX + nextW > imgW) nextW = imgW - nextX;
        if (nextY + nextH > imgH) nextH = imgH - nextY;

        if (ratio) {
          const finalRatioW = Math.round(nextH * ratio);
          const finalRatioH = Math.round(nextW / ratio);
          if (nextX + finalRatioW <= imgW) nextW = finalRatioW;
          else if (nextY + finalRatioH <= imgH) nextH = finalRatioH;
        }
      }

      updateActiveEditState((prev) => ({
        ...prev,
        crop: {
          ...prev.crop,
          x: Math.round(nextX),
          y: Math.round(nextY),
          width: Math.round(nextW),
          height: Math.round(nextH),
        },
      }));
    };

    const handleMouseUp = () => {
      if (cropDrag) setCropDrag(null);
    };

    if (cropDrag?.active) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [cropDrag]);

  // Download Trigger Systems
  const downloadSingleProcessedImage = (img: ImageFile) => {
    if (!img.processed) return;

    const ext = img.editState.format.toLowerCase();
    const cleanName = img.name.replace(/\.[^/.]+$/, "");
    const filename = `${cleanName}${zipSuffix}.${ext}`;

    const link = document.createElement("a");
    link.href = img.processed.previewUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadBulkZip = async (scope: "selected" | "all") => {
    setIsProcessing(true);
    setProcessingProgress(0);

    const affected = images.filter((img) =>
      scope === "selected" ? selectedImageIds.has(img.id) : true
    );

    if (affected.length === 0) {
      setIsProcessing(false);
      return;
    }

    const zip = new JSZip();

    for (let i = 0; i < affected.length; i++) {
      const img = affected[i];
      
      // Render canvas if not processed yet
      let blob = img.processed?.blob;
      if (!blob) {
        try {
          const out = await renderCanvasImage(img);
          blob = out.blob;
        } catch (err) {
          console.error("ZIP pipeline compilation failed for " + img.name, err);
          continue;
        }
      }

      const ext = img.editState.format.toLowerCase();
      const cleanName = img.name.replace(/\.[^/.]+$/, "");
      const filename = `${cleanName}${zipSuffix}.${ext}`;

      zip.file(filename, blob);
      setProcessingProgress(Math.round(((i + 1) / affected.length) * 80));
    }

    try {
      const zipBlob = await zip.generateAsync({ type: "blob" }, (metadata) => {
        setProcessingProgress(80 + Math.round(metadata.percent * 0.2));
      });

      const url = URL.createObjectURL(zipBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `superutility_images_${scope}_${Date.now()}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("ZIP Generation error", err);
    }

    setIsProcessing(false);
  };

  // Custom preset scaling bindings
  const applyPresetSize = (w: number, h: number) => {
    updateActiveEditState((prev) => ({
      ...prev,
      resize: {
        ...prev.resize,
        mode: "dimensions",
        width: w,
        height: h,
      },
    }));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* 1. Main Action Top Toolbar */}
      {images.length > 0 && (
        <div className={styles.toolbar}>
          <div className={styles.toolbarGroup}>
            <button onClick={triggerFilePicker} className={`${styles.toolbarBtn} ${styles.toolbarBtnPrimary}`}>
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Add Images
            </button>
            <button onClick={handleSelectAll} className={styles.toolbarBtn}>Select All</button>
            <button onClick={handleDeselectAll} className={styles.toolbarBtn}>Deselect</button>
            <button onClick={handleInvertSelection} className={styles.toolbarBtn}>Invert</button>
          </div>

          <div className={styles.toolbarGroup}>
            <button onClick={handleResetActiveImage} className={styles.toolbarBtn} title="Reset current settings">
              Reset Item
            </button>
            <button onClick={handleClearAll} className={styles.toolbarBtn} style={{ borderColor: "var(--red-400)", color: "var(--red-600)" }}>
              Clear Gallery
            </button>
            <button 
              onClick={() => handleDownloadBulkZip("selected")} 
              disabled={selectedImageIds.size === 0}
              className={`${styles.toolbarBtn} ${styles.toolbarBtnPrimary}`}
            >
              Download Selected ({selectedImageIds.size})
            </button>
          </div>
        </div>
      )}

      {/* Hidden File Picker Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      {/* Empty State Upload Dropzone */}
      {images.length === 0 ? (
        <div
          ref={dropZoneRef}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={triggerFilePicker}
          className={styles.uploadContainer}
        >
          <svg className={styles.uploadIcon} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
          <div className={styles.uploadTitle}>Drag & Drop Images Here</div>
          <div className={styles.uploadDesc}>
            Supports batch uploading and real-time client-side processing for **JPG, JPEG, PNG, WEBP, and GIF** graphics.
          </div>
          <button className={sharedStyles.btnPrimary} style={{ padding: "10px 20px" }}>Browse Local Files</button>
          
          <div className={styles.uploadBadges}>
            <span className={styles.uploadBadge}>100% Free</span>
            <span className={styles.uploadBadge}>Offline Secure</span>
            <span className={styles.uploadBadge}>No Signup Required</span>
            <span className={styles.uploadBadge}>Zero Watermarks</span>
          </div>
        </div>
      ) : (
        /* 2. Three-Panel Dashboard Layout */
        <div className={styles.container}>
          
          {/* LEFT PANEL: Uploaded Gallery */}
          <aside className={`${styles.leftPanel} ${mobileTab === "gallery" ? styles.showMobile : ""}`}>
            <div className={styles.galleryHeader}>
              <div className={styles.galleryTitleRow}>
                <span className={styles.galleryTitle}>Gallery</span>
                <span className={styles.selectionCount}>
                  Selected: {selectedImageIds.size}/{images.length}
                </span>
              </div>
              <div className={styles.galleryControls}>
                <button onClick={handleSelectAll} className={styles.galleryControlBtn}>All</button>
                <button onClick={handleDeselectAll} className={styles.galleryControlBtn}>None</button>
                <button onClick={handleInvertSelection} className={styles.galleryControlBtn}>Invert</button>
              </div>
            </div>

            <div className={styles.thumbnailScrollArea}>
              <div className={styles.thumbnailGrid}>
                {images.map((img) => {
                  const isChecked = selectedImageIds.has(img.id);
                  const isActive = activeImageId === img.id;

                  return (
                    <div
                      key={img.id}
                      onClick={() => {
                        setActiveImageId(img.id);
                        setZoom(100);
                      }}
                      className={`${styles.thumbnailCard} ${isActive ? styles.thumbnailCardActive : ""}`}
                    >
                      <div className={styles.thumbnailCheckboxWrapper} onClick={(e) => toggleSelectImage(img.id, e)}>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className={styles.thumbnailCheckbox}
                        />
                      </div>
                      
                      <img src={img.previewUrl} alt={img.name} className={styles.thumbnailImg} />

                      {/* Remove Button */}
                      <button
                        onClick={(e) => handleRemoveImage(img.id, e)}
                        style={{
                          position: "absolute",
                          top: "4px",
                          right: "4px",
                          background: "rgba(220, 38, 38, 0.8)",
                          border: "none",
                          borderRadius: "50%",
                          width: "18px",
                          height: "18px",
                          color: "#fff",
                          fontSize: "12px",
                          lineHeight: "16px",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          zIndex: 6
                        }}
                        title="Remove image"
                      >
                        &times;
                      </button>

                      <div className={styles.thumbnailBadge}>
                        {img.originalWidth}x{img.originalHeight}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* CENTER PANEL: Main Image Preview */}
          <section className={`${styles.centerPanel} ${mobileTab === "edit" || mobileTab === "export" ? styles.showMobile : ""}`}>
            {activeImage ? (
              <>
                <div className={styles.previewHeader}>
                  <div className={styles.previewTitle} title={activeImage.name}>
                    {activeImage.name}
                  </div>

                  <div className={styles.previewHeaderControls}>
                    <div className={styles.toggleWrapper}>
                      <button
                        onClick={() => setActiveTab("processed")}
                        className={`${styles.toggleBtn} ${activeTab === "processed" ? styles.toggleBtnActive : ""}`}
                      >
                        Processed Preview
                      </button>
                      <button
                        onClick={() => setActiveTab("original")}
                        className={`${styles.toggleBtn} ${activeTab === "original" ? styles.toggleBtnActive : ""}`}
                      >
                        Original
                      </button>
                    </div>
                  </div>
                </div>

                <div className={styles.previewWorkspace} ref={previewContainerRef}>
                  <div 
                    className={styles.previewImgContainer}
                    style={{ transform: `scale(${zoom / 100})` }}
                  >
                    <img
                      ref={previewImgRef}
                      src={activeTab === "processed" && activeImage.processed ? activeImage.processed.previewUrl : activeImage.previewUrl}
                      alt="Active preview"
                      className={styles.previewImg}
                    />

                    {/* Draggable Bounding Crop Box Overlay */}
                    {activeImage.editState.crop.active && activeTab === "processed" && previewImgRef.current && (
                      <div className={styles.cropOverlayContainer}>
                        {(() => {
                          const w = previewImgRef.current.clientWidth;
                          const h = previewImgRef.current.clientHeight;
                          const imgW = activeImage.originalWidth;
                          const imgH = activeImage.originalHeight;

                          const cropLeft = Math.round((activeImage.editState.crop.x / imgW) * w);
                          const cropTop = Math.round((activeImage.editState.crop.y / imgH) * h);
                          const cropW = Math.round((activeImage.editState.crop.width / imgW) * w);
                          const cropH = Math.round((activeImage.editState.crop.height / imgH) * h);

                          return (
                            <>
                              {/* 4 Shaded Backdrop Borders */}
                              <div className={styles.cropShadow} style={{ top: 0, left: 0, right: 0, height: cropTop }} />
                              <div className={styles.cropShadow} style={{ top: cropTop + cropH, left: 0, right: 0, bottom: 0 }} />
                              <div className={styles.cropShadow} style={{ top: cropTop, left: 0, width: cropLeft, height: cropH }} />
                              <div className={styles.cropShadow} style={{ top: cropTop, left: cropLeft + cropW, right: 0, height: cropH }} />

                              {/* Dotted Crop Box Bounding frame */}
                              <div 
                                className={styles.cropBox}
                                style={{ top: cropTop, left: cropLeft, width: cropW, height: cropH }}
                                onMouseDown={(e) => handleCropMouseDown("move", e)}
                              >
                                {/* Rule of Thirds Helper Lines */}
                                <div className={styles.cropGridLineH1} />
                                <div className={styles.cropGridLineH2} />
                                <div className={styles.cropGridLineV1} />
                                <div className={styles.cropGridLineV2} />

                                {/* 8 Corner & Edge Draggable Handles */}
                                <div className={`${styles.cropHandle} ${styles.cropHandleNW}`} onMouseDown={(e) => handleCropMouseDown("nw", e)} />
                                <div className={`${styles.cropHandle} ${styles.cropHandleN}`} onMouseDown={(e) => handleCropMouseDown("n", e)} />
                                <div className={`${styles.cropHandle} ${styles.cropHandleNE}`} onMouseDown={(e) => handleCropMouseDown("ne", e)} />
                                <div className={`${styles.cropHandle} ${styles.cropHandleE}`} onMouseDown={(e) => handleCropMouseDown("e", e)} />
                                <div className={`${styles.cropHandle} ${styles.cropHandleSE}`} onMouseDown={(e) => handleCropMouseDown("se", e)} />
                                <div className={`${styles.cropHandle} ${styles.cropHandleS}`} onMouseDown={(e) => handleCropMouseDown("s", e)} />
                                <div className={`${styles.cropHandle} ${styles.cropHandleSW}`} onMouseDown={(e) => handleCropMouseDown("sw", e)} />
                                <div className={`${styles.cropHandle} ${styles.cropHandleW}`} onMouseDown={(e) => handleCropMouseDown("w", e)} />
                              </div>
                            </>
                          );
                        })()}
                      </div>
                    )}
                  </div>

                  {/* Visual Zoom controls overlay */}
                  <div className={styles.zoomControlBar}>
                    <button onClick={() => setZoom((z) => Math.max(10, z - 10))} className={styles.zoomBtn} title="Zoom Out">-</button>
                    <span className={styles.zoomText}>{zoom}%</span>
                    <button onClick={() => setZoom((z) => Math.min(400, z + 10))} className={styles.zoomBtn} title="Zoom In">+</button>
                    <button onClick={() => setZoom(100)} className={styles.zoomBtn} style={{ fontSize: "0.65rem", padding: "4px 8px" }}>Reset</button>
                  </div>
                </div>

                <div className={styles.previewFooter}>
                  <div className={styles.infoGroup}>
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Input Resolution</span>
                      <span className={styles.infoValue}>
                        {activeImage.originalWidth} x {activeImage.originalHeight}
                      </span>
                    </div>

                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Output Resolution</span>
                      <span className={styles.infoValue}>
                        {activeImage.processed ? `${activeImage.processed.width} x ${activeImage.processed.height}` : "Calculating..."}
                      </span>
                    </div>

                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Original Size</span>
                      <span className={styles.infoValue}>
                        {(activeImage.originalSize / 1024).toFixed(1)} KB
                      </span>
                    </div>

                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Processed Size</span>
                      <span className={styles.infoValue}>
                        {activeImage.processed ? `${(activeImage.processed.size / 1024).toFixed(1)} KB` : "Calculating..."}
                      </span>
                    </div>
                  </div>

                  {activeImage.processed && activeImage.processed.size < activeImage.originalSize && (
                    <div className={styles.savingsBadge}>
                      <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
                      </svg>
                      Saved {((1 - activeImage.processed.size / activeImage.originalSize) * 100).toFixed(0)}%
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div style={{ flex: 1, display: "flex", alignItems: "center", justifyItems: "center", color: "var(--text-muted)", padding: "48px", textAlign: "center" }}>
                Select an image from the gallery to start editing.
              </div>
            )}
          </section>

          {/* RIGHT PANEL: Editing Controls Accordions */}
          {/* RIGHT PANEL: Tool Controls & Export Actions */}
          <aside className={`${styles.rightPanel} ${mobileTab === "edit" ? styles.showMobile + " " + styles.showToolsOnly : ""} ${mobileTab === "export" ? styles.showMobile + " " + styles.showExportOnly : ""}`}>
            
            {/* Tools Container */}
            <div className={styles.toolsContainer}>
              {/* Desktop Tool Selector Tabs */}
              <div className={styles.toolTabsList}>
                <button
                  type="button"
                  onClick={() => setActiveTool("resize")}
                  className={`${styles.toolTabBtn} ${activeTool === "resize" ? styles.toolTabBtnActive : ""}`}
                >
                  Resize
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTool("crop");
                    if (activeImage && !activeImage.editState.crop.active) {
                      updateActiveEditState((prev) => ({
                        ...prev,
                        crop: {
                          ...prev.crop,
                          active: true,
                          x: Math.round(activeImage.originalWidth * 0.1),
                          y: Math.round(activeImage.originalHeight * 0.1),
                          width: Math.round(activeImage.originalWidth * 0.8),
                          height: Math.round(activeImage.originalHeight * 0.8),
                        },
                      }));
                      setActiveTab("processed");
                    }
                  }}
                  className={`${styles.toolTabBtn} ${activeTool === "crop" ? styles.toolTabBtnActive : ""}`}
                >
                  Crop
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTool("rotate")}
                  className={`${styles.toolTabBtn} ${activeTool === "rotate" ? styles.toolTabBtnActive : ""}`}
                >
                  Rotate
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTool("compress")}
                  className={`${styles.toolTabBtn} ${activeTool === "compress" ? styles.toolTabBtnActive : ""}`}
                >
                  Compress
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTool("convert")}
                  className={`${styles.toolTabBtn} ${activeTool === "convert" ? styles.toolTabBtnActive : ""}`}
                >
                  Convert
                </button>
              </div>

              <div className={styles.controlsScrollArea}>
                {/* Active Tool Content */}
                {activeTool === "resize" && activeImage && (
                  <div className={styles.controlContent}>
                    {/* Toggle resize mode */}
                    <div className={styles.toggleWrapper} style={{ width: "100%" }}>
                      <button
                        type="button"
                        onClick={() =>
                          updateActiveEditState((prev) => ({
                            ...prev,
                            resize: { ...prev.resize, mode: "dimensions" },
                          }))
                        }
                        className={`${styles.toggleBtn} ${activeImage.editState.resize.mode === "dimensions" ? styles.toggleBtnActive : ""}`}
                        style={{ flex: 1 }}
                      >
                        Dimensions (px)
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          updateActiveEditState((prev) => ({
                            ...prev,
                            resize: { ...prev.resize, mode: "percentage" },
                          }))
                        }
                        className={`${styles.toggleBtn} ${activeImage.editState.resize.mode === "percentage" ? styles.toggleBtnActive : ""}`}
                        style={{ flex: 1 }}
                      >
                        Percentage (%)
                      </button>
                    </div>

                    {activeImage.editState.resize.mode === "dimensions" ? (
                      <>
                        <div className={styles.grid2}>
                          <div>
                            <label className={styles.inputLabel}>Width (px)</label>
                            <input
                              type="number"
                              value={activeImage.editState.resize.width}
                              onChange={(e) => {
                                const w = parseInt(e.target.value) || 0;
                                updateActiveEditState((prev) => {
                                  let h = prev.resize.height;
                                  if (prev.resize.maintainAspectRatio) {
                                    const srcRatio = activeImage.originalWidth / activeImage.originalHeight;
                                    h = Math.round(w / srcRatio);
                                  }
                                  return {
                                    ...prev,
                                    resize: { ...prev.resize, width: w, height: h },
                                  };
                                });
                              }}
                              className={sharedStyles.input}
                              style={{ padding: "8px 12px", fontSize: "0.85rem" }}
                            />
                          </div>
                          <div>
                            <label className={styles.inputLabel}>Height (px)</label>
                            <input
                              type="number"
                              value={activeImage.editState.resize.height}
                              onChange={(e) => {
                                const h = parseInt(e.target.value) || 0;
                                updateActiveEditState((prev) => {
                                  let w = prev.resize.width;
                                  if (prev.resize.maintainAspectRatio) {
                                    const srcRatio = activeImage.originalWidth / activeImage.originalHeight;
                                    w = Math.round(h * srcRatio);
                                  }
                                  return {
                                    ...prev,
                                    resize: { ...prev.resize, width: w, height: h },
                                  };
                                });
                              }}
                              className={sharedStyles.input}
                              style={{ padding: "8px 12px", fontSize: "0.85rem" }}
                            />
                          </div>
                        </div>

                        <label className={sharedStyles.checkboxLabel} style={{ marginTop: "4px" }}>
                          <input
                            type="checkbox"
                            checked={activeImage.editState.resize.maintainAspectRatio}
                            onChange={(e) =>
                              updateActiveEditState((prev) => ({
                                ...prev,
                                resize: { ...prev.resize, maintainAspectRatio: e.target.checked },
                              }))
                            }
                          />
                          <span>Lock Aspect Ratio</span>
                        </label>

                        {/* Presets */}
                        <div>
                          <label className={styles.inputLabel}>Aspect Ratio Presets</label>
                          <div className={styles.presetGrid}>
                            <button type="button" onClick={() => applyPresetSize(1920, 1080)} className={styles.presetBtn}>1920x1080 (16:9)</button>
                            <button type="button" onClick={() => applyPresetSize(1280, 720)} className={styles.presetBtn}>1280x720 (HD)</button>
                            <button type="button" onClick={() => applyPresetSize(1080, 1080)} className={styles.presetBtn}>1080x1080 (1:1)</button>
                            <button type="button" onClick={() => applyPresetSize(800, 800)} className={styles.presetBtn}>800x800 (Square)</button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                          <label className={styles.inputLabel}>Scaling Ratio</label>
                          <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--lime-600)", fontFamily: "var(--font-mono)" }}>
                            {activeImage.editState.resize.percentage}%
                          </span>
                        </div>
                        <input
                          type="range"
                          min="10"
                          max="100"
                          step="5"
                          value={activeImage.editState.resize.percentage}
                          onChange={(e) => {
                            const val = parseInt(e.target.value);
                            updateActiveEditState((prev) => ({
                              ...prev,
                              resize: { ...prev.resize, percentage: val },
                            }));
                          }}
                          style={{ width: "100%", accentColor: "var(--lime-500)" }}
                        />
                        <div className={styles.presetGrid} style={{ marginTop: "12px" }}>
                          <button
                            type="button"
                            onClick={() =>
                              updateActiveEditState((prev) => ({
                                ...prev,
                                resize: { ...prev.resize, percentage: 75 },
                              }))
                            }
                            className={`${styles.presetBtn} ${activeImage.editState.resize.percentage === 75 ? styles.presetBtnActive : ""}`}
                          >
                            75% Size
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              updateActiveEditState((prev) => ({
                                ...prev,
                                resize: { ...prev.resize, percentage: 50 },
                              }))
                            }
                            className={`${styles.presetBtn} ${activeImage.editState.resize.percentage === 50 ? styles.presetBtnActive : ""}`}
                          >
                            50% Size
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              updateActiveEditState((prev) => ({
                                ...prev,
                                resize: { ...prev.resize, percentage: 25 },
                              }))
                            }
                            className={`${styles.presetBtn} ${activeImage.editState.resize.percentage === 25 ? styles.presetBtnActive : ""}`}
                          >
                            25% Size
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              updateActiveEditState((prev) => ({
                                ...prev,
                                resize: { ...prev.resize, percentage: 10 },
                              }))
                            }
                            className={`${styles.presetBtn} ${activeImage.editState.resize.percentage === 10 ? styles.presetBtnActive : ""}`}
                          >
                            10% Size
                          </button>
                        </div>
                      </div>
                    )}

                    <div className={styles.applyBar}>
                      <span className={styles.inputLabel} style={{ fontSize: "0.65rem" }}>Batch Resize Operations</span>
                      <div className={styles.applyBtnGroup}>
                        <button type="button" onClick={() => applyConfigToBulk("selected")} disabled={selectedImageIds.size === 0} className={styles.applyBtn}>
                          Apply Selected ({selectedImageIds.size})
                        </button>
                        <button type="button" onClick={() => applyConfigToBulk("all")} className={styles.applyBtn}>
                          Apply All ({images.length})
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Active Tool Content: Compress */}
                {activeTool === "compress" && activeImage && (
                  <div className={styles.controlContent}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                      <span className={styles.inputLabel}>Compression Quality</span>
                      <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--lime-600)", fontFamily: "var(--font-mono)" }}>
                        {(activeImage.editState.compress.quality * 100).toFixed(0)}%
                      </span>
                    </div>

                    <input
                      type="range"
                      min="0.1"
                      max="1.0"
                      step="0.05"
                      value={activeImage.editState.compress.quality}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value);
                        updateActiveEditState((prev) => ({
                          ...prev,
                          compress: { ...prev.compress, quality: val, preset: "high" },
                        }));
                      }}
                      style={{ width: "100%", accentColor: "var(--lime-500)" }}
                    />

                    <div>
                      <span className={styles.inputLabel}>Standard presets</span>
                      <div className={styles.presetGrid}>
                        <button
                          type="button"
                          onClick={() =>
                            updateActiveEditState((prev) => ({
                              ...prev,
                              compress: { quality: 0.9, preset: "low" },
                            }))
                          }
                          className={`${styles.presetBtn} ${activeImage.editState.compress.preset === "low" ? styles.presetBtnActive : ""}`}
                        >
                          Low (90% Quality)
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            updateActiveEditState((prev) => ({
                              ...prev,
                              compress: { quality: 0.75, preset: "medium" },
                            }))
                          }
                          className={`${styles.presetBtn} ${activeImage.editState.compress.preset === "medium" ? styles.presetBtnActive : ""}`}
                        >
                          Medium (75% Quality)
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            updateActiveEditState((prev) => ({
                              ...prev,
                              compress: { quality: 0.6, preset: "high" },
                            }))
                          }
                          className={`${styles.presetBtn} ${activeImage.editState.compress.preset === "high" ? styles.presetBtnActive : ""}`}
                        >
                          High (60% Quality)
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            updateActiveEditState((prev) => ({
                              ...prev,
                              compress: { quality: 0.3, preset: "max" },
                            }))
                          }
                          className={`${styles.presetBtn} ${activeImage.editState.compress.preset === "max" ? styles.presetBtnActive : ""}`}
                        >
                          Max Compression
                        </button>
                      </div>
                    </div>

                    <div className={styles.applyBar}>
                      <span className={styles.inputLabel} style={{ fontSize: "0.65rem" }}>Batch Compression Operations</span>
                      <div className={styles.applyBtnGroup}>
                        <button type="button" onClick={() => applyConfigToBulk("selected")} disabled={selectedImageIds.size === 0} className={styles.applyBtn}>
                          Apply Selected ({selectedImageIds.size})
                        </button>
                        <button type="button" onClick={() => applyConfigToBulk("all")} className={styles.applyBtn}>
                          Apply All ({images.length})
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Active Tool Content: Convert */}
                {activeTool === "convert" && activeImage && (
                  <div className={styles.controlContent}>
                    <label className={styles.inputLabel}>Output Image Format</label>
                    <select
                      value={activeImage.editState.format}
                      onChange={(e) => {
                        const val = e.target.value as "JPG" | "PNG" | "WEBP";
                        updateActiveEditState((prev) => ({
                          ...prev,
                          format: val,
                        }));
                      }}
                      className={sharedStyles.select}
                    >
                      <option value="WEBP">WEBP Format (Optimized)</option>
                      <option value="JPG">JPG / JPEG Format</option>
                      <option value="PNG">PNG Format (Lossless)</option>
                    </select>

                    <div className={styles.applyBar}>
                      <span className={styles.inputLabel} style={{ fontSize: "0.65rem" }}>Batch Format Operations</span>
                      <div className={styles.applyBtnGroup}>
                        <button type="button" onClick={() => applyConfigToBulk("selected")} disabled={selectedImageIds.size === 0} className={styles.applyBtn}>
                          Apply Selected ({selectedImageIds.size})
                        </button>
                        <button type="button" onClick={() => applyConfigToBulk("all")} className={styles.applyBtn}>
                          Apply All ({images.length})
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Active Tool Content: Crop */}
                {activeTool === "crop" && activeImage && (
                  <div className={styles.controlContent}>
                    <label className={sharedStyles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={activeImage.editState.crop.active}
                        onChange={(e) => {
                          const val = e.target.checked;
                          updateActiveEditState((prev) => {
                            let nextX = prev.crop.x;
                            let nextY = prev.crop.y;
                            let nextW = prev.crop.width;
                            let nextH = prev.crop.height;

                            if (val && !prev.crop.active) {
                              nextX = Math.round(activeImage.originalWidth * 0.1);
                              nextY = Math.round(activeImage.originalHeight * 0.1);
                              nextW = Math.round(activeImage.originalWidth * 0.8);
                              nextH = Math.round(activeImage.originalHeight * 0.8);
                            }

                            return {
                              ...prev,
                              crop: {
                                ...prev.crop,
                                active: val,
                                x: nextX,
                                y: nextY,
                                width: nextW,
                                height: nextH,
                              },
                            };
                          });
                          setActiveTab("processed");
                        }}
                      />
                      <span>Enable Bounding Crop Grid</span>
                    </label>

                    {activeImage.editState.crop.active && (
                      <>
                        <label className={styles.inputLabel} style={{ marginTop: "4px" }}>Aspect Ratio Constraint</label>
                        <div className={styles.presetGrid}>
                          <button
                            type="button"
                            onClick={() => {
                              updateActiveEditState((prev) => {
                                const nextCrop = { ...prev.crop, aspectRatio: null };
                                return { ...prev, crop: nextCrop };
                              });
                            }}
                            className={`${styles.presetBtn} ${activeImage.editState.crop.aspectRatio === null ? styles.presetBtnActive : ""}`}
                          >
                            Free Crop
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              updateActiveEditState((prev) => {
                                const r = 1;
                                const h = prev.crop.height;
                                const w = Math.round(h * r);
                                return {
                                  ...prev,
                                  crop: { ...prev.crop, aspectRatio: r, width: w },
                                };
                              });
                            }}
                            className={`${styles.presetBtn} ${activeImage.editState.crop.aspectRatio === 1 ? styles.presetBtnActive : ""}`}
                          >
                            1:1 (Square)
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              updateActiveEditState((prev) => {
                                const r = 16 / 9;
                                const w = prev.crop.width;
                                const h = Math.round(w / r);
                                return {
                                  ...prev,
                                  crop: { ...prev.crop, aspectRatio: r, height: h },
                                };
                              });
                            }}
                            className={`${styles.presetBtn} ${activeImage.editState.crop.aspectRatio === 16 / 9 ? styles.presetBtnActive : ""}`}
                          >
                            16:9 (Widescreen)
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              updateActiveEditState((prev) => {
                                const r = 4 / 3;
                                const w = prev.crop.width;
                                const h = Math.round(w / r);
                                return {
                                  ...prev,
                                  crop: { ...prev.crop, aspectRatio: r, height: h },
                                };
                              });
                            }}
                            className={`${styles.presetBtn} ${activeImage.editState.crop.aspectRatio === 4 / 3 ? styles.presetBtnActive : ""}`}
                          >
                            4:3 (Legacy)
                          </button>
                        </div>
                      </>
                    )}

                    <div className={styles.applyBar}>
                      <span className={styles.inputLabel} style={{ fontSize: "0.65rem" }}>Batch Bounding Crop Operations</span>
                      <div className={styles.applyBtnGroup}>
                        <button type="button" onClick={() => applyConfigToBulk("selected")} disabled={selectedImageIds.size === 0} className={styles.applyBtn}>
                          Apply Selected ({selectedImageIds.size})
                        </button>
                        <button type="button" onClick={() => applyConfigToBulk("all")} className={styles.applyBtn}>
                          Apply All ({images.length})
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Active Tool Content: Rotate */}
                {activeTool === "rotate" && activeImage && (
                  <div className={styles.controlContent}>
                    <div>
                      <span className={styles.inputLabel}>Rotation Degrees</span>
                      <div className={styles.presetGrid} style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
                        <button
                          type="button"
                          onClick={() => updateActiveEditState((prev) => ({ ...prev, rotate: 0 }))}
                          className={`${styles.presetBtn} ${activeImage.editState.rotate === 0 ? styles.presetBtnActive : ""}`}
                        >
                          0°
                        </button>
                        <button
                          type="button"
                          onClick={() => updateActiveEditState((prev) => ({ ...prev, rotate: 90 }))}
                          className={`${styles.presetBtn} ${activeImage.editState.rotate === 90 ? styles.presetBtnActive : ""}`}
                        >
                          90°
                        </button>
                        <button
                          type="button"
                          onClick={() => updateActiveEditState((prev) => ({ ...prev, rotate: 180 }))}
                          className={`${styles.presetBtn} ${activeImage.editState.rotate === 180 ? styles.presetBtnActive : ""}`}
                        >
                          180°
                        </button>
                        <button
                          type="button"
                          onClick={() => updateActiveEditState((prev) => ({ ...prev, rotate: 270 }))}
                          className={`${styles.presetBtn} ${activeImage.editState.rotate === 270 ? styles.presetBtnActive : ""}`}
                        >
                          270°
                        </button>
                      </div>
                    </div>

                    <div>
                      <span className={styles.inputLabel}>Flipping Operations</span>
                      <div className={styles.grid2}>
                        <button
                          type="button"
                          onClick={() =>
                            updateActiveEditState((prev) => ({
                              ...prev,
                              flip: { ...prev.flip, horizontal: !prev.flip.horizontal },
                            }))
                          }
                          className={`${styles.presetBtn} ${activeImage.editState.flip.horizontal ? styles.presetBtnActive : ""}`}
                        >
                          Horizontal Flip
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            updateActiveEditState((prev) => ({
                              ...prev,
                              flip: { ...prev.flip, vertical: !prev.flip.vertical },
                            }))
                          }
                          className={`${styles.presetBtn} ${activeImage.editState.flip.vertical ? styles.presetBtnActive : ""}`}
                        >
                          Vertical Flip
                        </button>
                      </div>
                    </div>

                    <div className={styles.applyBar}>
                      <span className={styles.inputLabel} style={{ fontSize: "0.65rem" }}>Batch Transform Operations</span>
                      <div className={styles.applyBtnGroup}>
                        <button type="button" onClick={() => applyConfigToBulk("selected")} disabled={selectedImageIds.size === 0} className={styles.applyBtn}>
                          Apply Selected ({selectedImageIds.size})
                        </button>
                        <button type="button" onClick={() => applyConfigToBulk("all")} className={styles.applyBtn}>
                          Apply All ({images.length})
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Export Container */}
            <div className={styles.exportContainer}>
              {/* MASTER ACTIONS FOOTER PANEL */}
              {activeImage && (
                <div className={styles.actionCard}>
                  <div className={styles.suffixContainer}>
                    <label className={styles.inputLabel} style={{ fontSize: "0.65rem", marginBottom: "2px" }}>Filename Suffix Option</label>
                    <input
                      type="text"
                      value={zipSuffix}
                      onChange={(e) => setZipSuffix(e.target.value)}
                      placeholder="e.g. _edited"
                      className={sharedStyles.input}
                      style={{ padding: "6px 10px", fontSize: "0.75rem" }}
                    />
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginTop: "4px" }}>
                    <button type="button" onClick={() => downloadSingleProcessedImage(activeImage)} className={sharedStyles.btnPrimary} style={{ padding: "8px 12px", fontSize: "0.8rem", width: "100%" }}>
                      Download Current Image
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDownloadBulkZip("all")}
                      className={sharedStyles.btnPrimary}
                      style={{
                        background: "var(--lime-600)",
                        borderColor: "var(--lime-700)",
                        padding: "8px 12px",
                        fontSize: "0.8rem",
                        width: "100%"
                      }}
                    >
                      Download All as ZIP ({images.length})
                    </button>
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      )}

      {/* Mobile Tab Navigation Bar */}
      {images.length > 0 && (
        <div className={styles.mobileTabBar}>
          <button
            type="button"
            onClick={() => setMobileTab("gallery")}
            className={`${styles.mobileTabBtn} ${mobileTab === "gallery" ? styles.mobileTabBtnActive : ""}`}
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            <span>Gallery</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileTab("edit")}
            className={`${styles.mobileTabBtn} ${mobileTab === "edit" ? styles.mobileTabBtnActive : ""}`}
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
            </svg>
            <span>Editor</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileTab("export")}
            className={`${styles.mobileTabBtn} ${mobileTab === "export" ? styles.mobileTabBtnActive : ""}`}
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            <span>Export</span>
          </button>
        </div>
      )}

      {/* 3. Batch Processing Spinner Overlay Indicator */}
      {isProcessing && (
        <div className={styles.processingOverlay}>
          <div className={styles.spinner}></div>
          <div style={{ fontSize: "1.1rem", fontWeight: 700 }}>Processing Batch Images...</div>
          <div className={styles.progressBarContainer}>
            <div className={styles.progressBar} style={{ width: `${processingProgress}%` }}></div>
          </div>
          <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.7)" }}>{processingProgress}% Complete</div>
        </div>
      )}
    </div>
  );
}
