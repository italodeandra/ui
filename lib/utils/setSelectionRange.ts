/* eslint-disable @typescript-eslint/ban-ts-comment */
// noinspection JSUnresolvedReference

function getTextNodesIn(node: Node) {
  const textNodes: Node[] = [];
  if (node.nodeType == 3) {
    textNodes.push(node);
  } else {
    const children = node.childNodes;
    for (let i = 0, len = children.length; i < len; ++i) {
      textNodes.push(...getTextNodesIn(children[i]));
    }
  }
  return textNodes;
}

export default function setSelectionRange(
  el: Element,
  start: number,
  end: number,
) {
  if (document.createRange && window.getSelection) {
    const range = document.createRange();
    range.selectNodeContents(el);
    const textNodes = getTextNodesIn(el);
    let foundStart = false;
    let charCount = 0,
      endCharCount;

    for (let i = 0, textNode; (textNode = textNodes[i++]); ) {
      // @ts-ignore
      endCharCount = charCount + textNode.length;
      if (
        !foundStart &&
        start >= charCount &&
        (start < endCharCount ||
          (start == endCharCount && i <= textNodes.length))
      ) {
        range.setStart(textNode, start - charCount);
        foundStart = true;
      }
      if (foundStart && end <= endCharCount) {
        range.setEnd(textNode, end - charCount);
        break;
      }
      charCount = endCharCount;
    }

    const sel = window.getSelection();
    sel!.removeAllRanges();
    sel!.addRange(range);
  } else {
    // @ts-ignore
    if (document.selection && document.body.createTextRange) {
      // @ts-ignore
      const textRange = document.body.createTextRange();
      textRange.moveToElementText(el);
      textRange.collapse(true);
      textRange.moveEnd("character", end);
      textRange.moveStart("character", start);
      textRange.select();
    }
  }
}
