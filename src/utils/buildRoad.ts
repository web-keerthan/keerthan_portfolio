import { renderStraightsegment, renderRightOffRamp, renderLeftOffRamp } from '../utils/roadRenders';
import {buildPaths} from "../utils/buildPaths";

export function buildRoad(svg:any, cards:any, header:any, content:any, path:any) {

    if (!svg || !header || cards.length === 0) return;
    svg.innerHTML = '';

    const containerRect = svg.getBoundingClientRect();
    const headerRect = header.getBoundingClientRect();
    const contentRect = content.getBoundingClientRect();

    // 1. Main Road ALWAYS passes through the center of the page
    const startPoint = {
        x: headerRect.left + headerRect.width / 2 - containerRect.left,
        y: headerRect.bottom - containerRect.top + 30
    };

    // Screen-size scale factor for SVG road dimensions (Desktop = 1.0, Mobile = ~0.6)
    const scale = Math.min(1, Math.max(0.55, window.innerWidth / 1024));

    const junctionHeight = 160 * scale;
    const segments: any[] = [];

    // 2. Initial Straight Segment from Header to 1st Card Junction (preserving user's offset)
    const firstCardRect = cards[0].getBoundingClientRect();
    const offset = firstCardRect.width * 0.2;
    const firstCardCenter = firstCardRect.top + firstCardRect.height / 2 - containerRect.top + offset;
    
    segments.push({
        type: 'straight',
        y1: startPoint.y,
        y2: firstCardCenter - junctionHeight / 2
    });

    // 3. Loop through cards to push Branch + Straight segments (preserving user's isRight = index % 2 === 0)
    cards.forEach((card:any, index:any) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenterY = cardRect.top + cardRect.height / 2 - containerRect.top + offset;
        const isRight = index % 2 === 0;

        const cardX = isRight 
            ? cardRect.left - containerRect.left 
            : cardRect.right - containerRect.left;

        const jy1 = cardCenterY - junctionHeight / 2;
        const jy2 = cardCenterY + junctionHeight / 2;

        // Push Branch Junction Segment
        segments.push({
            type: isRight ? 'branch-right' : 'branch-left',
            y1: jy1,
            y2: jy2,
            cardY: cardCenterY,
            cardX: cardX
        });

        if (index < cards.length - 1) {
            const nextCardCenter = cards[index + 1].getBoundingClientRect().top + cards[index + 1].getBoundingClientRect().height / 2 - containerRect.top + offset;
            segments.push({
                type: 'straight',
                y1: jy2,
                y2: nextCardCenter - junctionHeight / 2
            });
        }
        else{
            segments.push({
                type: 'straight',
                y1: jy2,
                y2:  contentRect.bottom - containerRect.top
            });
        }
    });

    // 4. Render Segments Sequentially
    let html = '';

    segments.forEach((segment) => {
        if (segment.type === 'straight') {
            html += renderStraightsegment(startPoint.x, segment.y1, segment.y2, scale);
        } 
        else if (segment.type === 'branch-right') {
            html += renderRightOffRamp(startPoint.x, segment.y1, segment.y2, segment.cardX, segment.cardY, scale);
        } 
        else if (segment.type === 'branch-left') {
            html += renderLeftOffRamp(startPoint.x, segment.y1, segment.y2, segment.cardX, segment.cardY, scale);
        }
    });

    svg.innerHTML = html;

    buildPaths(path, cards, header, content, scale , offset);
}