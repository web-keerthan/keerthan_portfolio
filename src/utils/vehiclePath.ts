export function straightPath(
    x: number, 
    y1: number, 
    y2: number, 
    color: string = '#FF0055', // Vibrant color for high visibility
    strokeWidth: number = 3
): string {
    const d = `M ${x} ${y1} L ${x} ${y2}`;
    return `<path d="${d}" stroke="${color}" stroke-width="${strokeWidth}" fill="none" />`;
}

export function curvedPathRight(
    x: number, 
    y1: number, 
    cardX: number, 
    cardY: number, 
    scale: number = 1,
    color: string = '#FF0055',
    strokeWidth: number = 3
): string {
    const turnRadius = Math.min(25 * scale, Math.abs(cardY - y1), Math.abs(cardX - x));
    const startTurnY = cardY - turnRadius;
    const endTurnX = x + turnRadius;
    const d = `M ${x} ${y1} L ${x} ${startTurnY} Q ${x} ${cardY} ${endTurnX} ${cardY} L ${cardX} ${cardY}`;
    return `<path d="${d}" stroke="${color}" stroke-width="${strokeWidth}" fill="none" />`;
}

export function curvedPathLeft(
    x: number, 
    y1: number, 
    cardX: number, 
    cardY: number, 
    scale: number = 1,
    color: string = '#FF0055',
    strokeWidth: number = 3
): string {
    const turnRadius = Math.min(25 * scale, Math.abs(cardY - y1), Math.abs(x - cardX));
    const startTurnY = cardY - turnRadius;
    const endTurnX = x - turnRadius;
    const d = `M ${x} ${y1} L ${x} ${startTurnY} Q ${x} ${cardY} ${endTurnX} ${cardY} L ${cardX} ${cardY}`;
    return `<path d="${d}" stroke="${color}" stroke-width="${strokeWidth}" fill="none" />`;
}
