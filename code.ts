// src/code.ts — Auto ADA Text Resizer (Hybrid Mode v1.0, Fixed figma redeclare)
figma.showUI(__html__, { visible: true, width: 600, height: 300 });

figma.ui.onmessage = async msg => {
  let fixed = 0;
  let total = 0;

  if (msg.type === 'scan-frame') {
    // Bulk-режим: Фрейм
    const selection = figma.currentPage.selection;
    if (selection.length === 0) {
      figma.closePlugin('Error: Select a frame first!');
      return;
    }
    const frame = selection[0];
    if (frame.type !== 'FRAME') {
      figma.closePlugin('Error: Select a FRAME!');
      return;
    }

    // Рекурсивный поиск TEXT nodes
    function findTexts(node) {
      const texts = [];
      if (node.type === 'TEXT') {
        texts.push(node);
      }
      if ('children' in node && node.children && node.children.length > 0) {
        node.children.forEach(child => {
          texts.push(...findTexts(child));
        });
      }
      return texts;
    }

    const allTexts = findTexts(frame);
    total = allTexts.length;

    // Async фикс с загрузкой шрифтов
    const loadPromises = allTexts.map(async (text) => {
      const font = text.fontSize;
      if (typeof font === 'number' && font < 16) {
        try {
          if (text.fontName !== figma.mixed) {
            await figma.loadFontAsync(text.fontName);
          }
          text.fontSize = 16;
          fixed++;
        } catch (error) {
          console.error('Font load error:', error);
        }
      }
    });

    await Promise.all(loadPromises);

    figma.closePlugin(`Frame Mode: Fixed ${fixed} out of ${total} texts to 16px+ (WCAG AA)`);

  } else if (msg.type === 'fix-selected') {
    // Точечный режим: Выделенные тексты
    const texts = figma.currentPage.selection.filter(n => n.type === 'TEXT');
    if (texts.length === 0) {
      figma.closePlugin('Error: Select text layers first!');
      return;
    }

    total = texts.length;

    // Async фикс с загрузкой шрифтов
    const loadPromises = texts.map(async (text) => {
      const font = text.fontSize;
      if (typeof font === 'number' && font < 16) {
        try {
          if (text.fontName !== figma.mixed) {
            await figma.loadFontAsync(text.fontName);
          }
          text.fontSize = 16;
          fixed++;
        } catch (error) {
          console.error('Font load error:', error);
        }
      }
    });

    await Promise.all(loadPromises);

    figma.closePlugin(`Selected Mode: Fixed ${fixed} out of ${total} texts to 16px+ (WCAG AA)`);
  }

  // Общий UI-обновление
  figma.ui.postMessage({ type: 'done', fixed, total });
};