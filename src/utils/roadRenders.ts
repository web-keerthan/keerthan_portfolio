export function renderStraightsegment(x: number, y1: number, y2: number, scale: number = 1): string {
    const mainWidth = 44 * scale;
    const yOffset = 22 * scale;
    const strokeW = 3.5 * scale;
    const dash = `${12 * scale} ${14 * scale}`;

    const leftYellow = x - yOffset;
    const rightYellow = x + yOffset;

    return `
        <!-- Asphalt Base Surface -->
        <line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" stroke="#2B2B2B" stroke-width="${mainWidth}" />

        <!-- Left Yellow Outer Stripe -->
        <line x1="${leftYellow}" y1="${y1}" x2="${leftYellow}" y2="${y2}" stroke="#FFD100" stroke-width="${strokeW}" />

        <!-- Right Yellow Outer Stripe -->
        <line x1="${rightYellow}" y1="${y1}" x2="${rightYellow}" y2="${y2}" stroke="#FFD100" stroke-width="${strokeW}" />

        <!-- White Dashed Center Line -->
        <line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" stroke="#FFFFFF" stroke-width="${strokeW}" stroke-dasharray="${dash}" stroke-linecap="round" />
    `;
}

export function renderRightOffRamp(x: number, y1: number, y2: number, cardX: number, cardY: number, scale: number = 1): string {
    const mainWidth = 44 * scale;
    const yOffset = 22 * scale;
    const strokeW = 3.5 * scale;
    const dashMain = `${12 * scale} ${14 * scale}`;
    const dashBranch = `${8 * scale} ${10 * scale}`;

    const mainRightYellow = x + yOffset;
    const mainLeftYellow = x - yOffset;
    const bHalf = 20 * scale; 
    const R = 10 * scale;     

    const sideAsphalt = `
        M ${x + 14 * scale} ${cardY - bHalf - R} 
        Q ${x + 14 * scale} ${cardY - bHalf} ${x + 14 * scale + R} ${cardY - bHalf} 
        L ${cardX} ${cardY - bHalf} 
        L ${cardX} ${cardY + bHalf} 
        L ${x + 14 * scale + R} ${cardY + bHalf} 
        Q ${x + 14 * scale} ${cardY + bHalf} ${x + 14 * scale} ${cardY + bHalf + R} Z
    `;

    const rightYellowTop = `
        M ${mainRightYellow} ${y1} 
        L ${mainRightYellow} ${cardY - bHalf - R} 
        Q ${mainRightYellow} ${cardY - bHalf + 2 * scale} ${mainRightYellow + R} ${cardY - bHalf + 2 * scale} 
        L ${cardX} ${cardY - bHalf + 2 * scale}
    `;

    const rightYellowBottom = `
        M ${mainRightYellow} ${y2} 
        L ${mainRightYellow} ${cardY + bHalf + R} 
        Q ${mainRightYellow} ${cardY + bHalf - 2 * scale} ${mainRightYellow + R} ${cardY + bHalf - 2 * scale} 
        L ${cardX} ${cardY + bHalf - 2 * scale}
    `;

    return `
        <!-- Main Continuing Highway Asphalt Surface -->
        <line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" stroke="#2B2B2B" stroke-width="${mainWidth}" />

        <!-- Side Road Extension Asphalt -->
        <path d="${sideAsphalt}" fill="#2B2B2B" stroke="none" />

        <!-- Left Main Yellow Edge Line -->
        <line x1="${mainLeftYellow}" y1="${y1}" x2="${mainLeftYellow}" y2="${y2}" stroke="#FFD100" stroke-width="${strokeW}" />

        <!-- Right Top Corner Yellow Line -->
        <path d="${rightYellowTop}" stroke="#FFD100" stroke-width="${strokeW}" fill="none" stroke-linejoin="round" />

        <!-- Right Bottom Corner Yellow Line -->
        <path d="${rightYellowBottom}" stroke="#FFD100" stroke-width="${strokeW}" fill="none" stroke-linejoin="round" />

        <!-- Main Continuous Center Dashed Line -->
        <line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" stroke="#FFFFFF" stroke-width="${strokeW}" stroke-dasharray="${dashMain}" stroke-linecap="round" />

        <!-- Side Branch Center Dashed Line -->
        <line x1="${mainRightYellow}" y1="${cardY}" x2="${cardX}" y2="${cardY}" stroke="#FFFFFF" stroke-width="${strokeW}" stroke-dasharray="${dashBranch}" stroke-linecap="round" />
    `;
}

export function renderLeftOffRamp(x: number, y1: number, y2: number, cardX: number, cardY: number, scale: number = 1): string {
    const mainWidth = 44 * scale;
    const yOffset = 22 * scale;
    const strokeW = 3.5 * scale;
    const dashMain = `${12 * scale} ${14 * scale}`;
    const dashBranch = `${8 * scale} ${10 * scale}`;

    const mainRightYellow = x + yOffset;
    const mainLeftYellow = x - yOffset;
    const bHalf = 20 * scale;
    const R = 10 * scale;

    const sideAsphalt = `
        M ${x - 14 * scale} ${cardY - bHalf - R} 
        Q ${x - 14 * scale} ${cardY - bHalf} ${x - 14 * scale - R} ${cardY - bHalf} 
        L ${cardX} ${cardY - bHalf} 
        L ${cardX} ${cardY + bHalf} 
        L ${x - 14 * scale - R} ${cardY + bHalf} 
        Q ${x - 14 * scale} ${cardY + bHalf} ${x - 14 * scale} ${cardY + bHalf + R} Z
    `;

    const leftYellowTop = `
        M ${mainLeftYellow} ${y1} 
        L ${mainLeftYellow} ${cardY - bHalf - R} 
        Q ${mainLeftYellow} ${cardY - bHalf + 2 * scale} ${mainLeftYellow - R} ${cardY - bHalf + 2 * scale} 
        L ${cardX} ${cardY - bHalf + 2 * scale}
    `;

    const leftYellowBottom = `
        M ${mainLeftYellow} ${y2} 
        L ${mainLeftYellow} ${cardY + bHalf + R} 
        Q ${mainLeftYellow} ${cardY + bHalf - 2 * scale} ${mainLeftYellow - R} ${cardY + bHalf - 2 * scale} 
        L ${cardX} ${cardY + bHalf - 2 * scale}
    `;

    return `
        <!-- Main Continuing Highway Asphalt Surface -->
        <line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" stroke="#2B2B2B" stroke-width="${mainWidth}" />

        <!-- Side Road Extension Asphalt -->
        <path d="${sideAsphalt}" fill="#2B2B2B" stroke="none" />

        <!-- Right Main Yellow Edge Line -->
        <line x1="${mainRightYellow}" y1="${y1}" x2="${mainRightYellow}" y2="${y2}" stroke="#FFD100" stroke-width="${strokeW}" />

        <!-- Left Top Corner Yellow Line -->
        <path d="${leftYellowTop}" stroke="#FFD100" stroke-width="${strokeW}" fill="none" stroke-linejoin="round" />

        <!-- Left Bottom Corner Yellow Line -->
        <path d="${leftYellowBottom}" stroke="#FFD100" stroke-width="${strokeW}" fill="none" stroke-linejoin="round" />

        <!-- Main Continuous Center Dashed Line -->
        <line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" stroke="#FFFFFF" stroke-width="${strokeW}" stroke-dasharray="${dashMain}" stroke-linecap="round" />

        <!-- Side Branch Center Dashed Line -->
        <line x1="${mainLeftYellow}" y1="${cardY}" x2="${cardX}" y2="${cardY}" stroke="#FFFFFF" stroke-width="${strokeW}" stroke-dasharray="${dashBranch}" stroke-linecap="round" />
    `;
}
