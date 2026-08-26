export function straightPath(x: number, y1: number, y2: number): string {
    return `M ${x} ${y1} L ${x} ${y2}`;
}

export function curvedPathRight(x: number, y1: number, cardX: number, cardY: number, scale: number = 1): string {
    const turnRadius = Math.min(25 * scale, Math.abs(cardY - y1), Math.abs(cardX - x));
    const startTurnY = cardY - turnRadius;
    const endTurnX = x + turnRadius;
    return `M ${x} ${y1} L ${x} ${startTurnY} Q ${x} ${cardY} ${endTurnX} ${cardY} L ${cardX} ${cardY}`;
}

export function curvedPathLeft(x: number, y1: number, cardX: number, cardY: number, scale: number = 1): string {
    const turnRadius = Math.min(25 * scale, Math.abs(cardY - y1), Math.abs(x - cardX));
    const startTurnY = cardY - turnRadius;
    const endTurnX = x - turnRadius;
    return `M ${x} ${y1} L ${x} ${startTurnY} Q ${x} ${cardY} ${endTurnX} ${cardY} L ${cardX} ${cardY}`;
}
